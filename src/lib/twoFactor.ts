import { TwoFactorConfig, UserProfile } from '../types';
import { isOwnerProfile } from './owner';
import { hashPasswordPBKDF2, verifyPasswordPBKDF2 } from './securityFirewall';

const RECOVERY_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const SESSION_2FA_KEY = 'reussite_offline_2fa_session_v1';
const TRUSTED_DEVICE_2FA_KEY = 'reussite_offline_2fa_trusted_v1';

interface TwoFactorSessionToken {
  profileId: string;
  verifiedAt: number;
  expiresAt: number;
}

function getCryptoObj(): Crypto | null {
  if (typeof globalThis !== 'undefined' && globalThis.crypto) {
    return globalThis.crypto;
  }
  return null;
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export function base64UrlEncode(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function base64UrlDecode(str: string): Uint8Array {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((str.length + 3) % 4);
  const binary = atob(padded);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    out[i] = binary.charCodeAt(i);
  }
  return out;
}

export function detectFriendlyDeviceLabel(): string {
  if (typeof navigator === 'undefined') return 'Cet appareil';
  const ua = navigator.userAgent || '';
  if (/Android/i.test(ua)) return 'Téléphone / Tablette Android (Verrouillage écran)';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iPhone / iPad (Face ID / Touch ID / Code)';
  if (/Windows/i.test(ua)) return 'PC Windows (Windows Hello / Mot de passe)';
  if (/Macintosh|Mac OS X/i.test(ua)) return 'Mac (Touch ID / Mot de passe macOS)';
  if (/Linux/i.test(ua)) return 'Appareil Linux (Mot de passe système)';
  return 'Cet appareil (Verrouillage natif)';
}

export interface DeviceLockSupportInfo {
  available: boolean;
  inIframe: boolean;
  reason?: string;
}

/**
 * Checks whether the browser & OS expose a native platform authenticator
 * (device password / screen PIN / fingerprint / Face ID / Windows Hello).
 */
export async function checkDeviceLockAvailability(): Promise<DeviceLockSupportInfo> {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return { available: false, inIframe: false, reason: 'Navigateur indisponible.' };
  }

  let inIframe = false;
  try {
    inIframe = window.self !== window.top;
  } catch {
    inIframe = true;
  }

  if (!window.isSecureContext) {
    return {
      available: false,
      inIframe,
      reason: 'Le verrouillage natif nécessite une connexion HTTPS sécurisée.',
    };
  }

  if (
    typeof window.PublicKeyCredential === 'undefined' ||
    !navigator.credentials ||
    typeof navigator.credentials.create !== 'function'
  ) {
    return {
      available: false,
      inIframe,
      reason: 'Ce navigateur ne prend pas en charge WebAuthn. Utilise le Code PIN Maître 2FA.',
    };
  }

  try {
    const platformOk =
      typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function'
        ? await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
        : true;
    if (!platformOk) {
      return {
        available: false,
        inIframe,
        reason:
          'Aucun verrouillage système (empreinte, Face ID, Windows Hello ou PIN écran) n’est détecté sur cet appareil.',
      };
    }
    return { available: true, inIframe };
  } catch {
    return { available: true, inIframe };
  }
}

/**
 * Enrolls the device's native lock screen / OS password / biometrics via WebAuthn
 * with strict userVerification='required' (zero QR code, zero external app).
 */
export async function registerDeviceLockCredential(profile: {
  id: string;
  email: string;
  name: string;
}): Promise<{ ok: boolean; credentialId?: string; deviceLabel?: string; error?: string }> {
  const c = getCryptoObj();
  if (!c || typeof navigator === 'undefined' || !navigator.credentials?.create) {
    return {
      ok: false,
      error: 'Verrouillage natif non supporté par ce navigateur. Choisis le Code PIN Maître 2FA.',
    };
  }

  try {
    const challenge = new Uint8Array(32);
    c.getRandomValues(challenge);
    const userIdBytes = new TextEncoder().encode(profile.id).slice(0, 64);

    const credential = (await navigator.credentials.create({
      publicKey: {
        challenge: challenge.buffer as ArrayBuffer,
        rp: {
          name: 'Réussite Offline',
        },
        user: {
          id: userIdBytes.buffer as ArrayBuffer,
          name: profile.email,
          displayName: profile.name,
        },
        pubKeyCredParams: [
          { type: 'public-key', alg: -7 }, // ES256
          { type: 'public-key', alg: -257 }, // RS256
        ],
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          userVerification: 'required',
          residentKey: 'preferred',
        },
        timeout: 60_000,
        attestation: 'none',
      },
    })) as PublicKeyCredential | null;

    if (!credential || !credential.rawId) {
      return {
        ok: false,
        error: 'Enregistrement annulé avant validation du verrouillage de l’appareil.',
      };
    }

    const credentialId = base64UrlEncode(new Uint8Array(credential.rawId));
    return {
      ok: true,
      credentialId,
      deviceLabel: detectFriendlyDeviceLabel(),
    };
  } catch (err) {
    const name = err instanceof Error ? err.name : '';
    if (name === 'NotAllowedError') {
      return {
        ok: false,
        error:
          'Vérification annulée ou bloquée dans cette fenêtre. Si tu es dans un aperçu intégré, ouvre le site directement ou utilise le Code PIN Maître 2FA.',
      };
    }
    if (name === 'SecurityError') {
      return {
        ok: false,
        error:
          'Le navigateur restreint le verrouillage de l’appareil dans un cadre intégré. Ouvre https://reussite-offline.vercel.app directement ou utilise le Code PIN Maître 2FA.',
      };
    }
    return {
      ok: false,
      error:
        'Impossible d’activer le verrouillage de l’appareil sur ce navigateur. Utilise le Code PIN Maître 2FA juste à côté.',
    };
  }
}

/**
 * Validates WebAuthn assertion payload (challenge + UP/UV user-verified flags).
 * Exported separately for unit testing.
 */
export function verifyAssertionPayload(
  clientDataBytes: Uint8Array,
  authenticatorDataBytes: Uint8Array,
  signatureBytes: Uint8Array,
  expectedChallengeBase64Url: string
): { valid: boolean; reason?: string } {
  if (signatureBytes.length === 0) {
    return { valid: false, reason: 'Signature cryptographique de l’appareil manquante.' };
  }
  if (authenticatorDataBytes.length < 37) {
    return { valid: false, reason: 'Données d’authentification de l’appareil incomplètes.' };
  }

  // Byte 32 holds authenticator flags: bit 0 = UP (User Present), bit 2 = UV (User Verified)
  const flags = authenticatorDataBytes[32];
  const userPresent = (flags & 0x01) !== 0;
  const userVerified = (flags & 0x04) !== 0;
  if (!userPresent || !userVerified) {
    return {
      valid: false,
      reason: 'Le mot de passe ou la biométrie de l’appareil n’a pas été confirmé (drapeau UV absent).',
    };
  }

  try {
    const decoded = new TextDecoder().decode(clientDataBytes);
    const parsed = JSON.parse(decoded) as { type?: string; challenge?: string };
    if (parsed.type !== 'webauthn.get') {
      return { valid: false, reason: 'Type de défi WebAuthn invalide.' };
    }
    if (!parsed.challenge || !constantTimeEqual(parsed.challenge, expectedChallengeBase64Url)) {
      return { valid: false, reason: 'Défi cryptographique non concordant (protection anti-rejeu).' };
    }
    return { valid: true };
  } catch {
    return { valid: false, reason: 'Réponse clientDataJSON illisible.' };
  }
}

/**
 * Prompts the OS native device password / PIN / fingerprint / Face ID / Windows Hello
 * to verify ownership before unlocking the account.
 */
export async function verifyDeviceLockAssertion(
  credentialIdBase64Url: string
): Promise<{ ok: boolean; error?: string }> {
  const c = getCryptoObj();
  if (!c || typeof navigator === 'undefined' || !navigator.credentials?.get) {
    return {
      ok: false,
      error: 'Verrouillage natif indisponible sur ce navigateur. Utilise un code de secours.',
    };
  }

  try {
    const challenge = new Uint8Array(32);
    c.getRandomValues(challenge);
    const expectedChallenge = base64UrlEncode(challenge);
    const credIdBytes = base64UrlDecode(credentialIdBase64Url);

    const assertion = (await navigator.credentials.get({
      publicKey: {
        challenge: challenge.buffer as ArrayBuffer,
        allowCredentials: [
          {
            id: credIdBytes.buffer as ArrayBuffer,
            type: 'public-key',
            transports: ['internal'],
          },
        ],
        userVerification: 'required',
        timeout: 60_000,
      },
    })) as PublicKeyCredential | null;

    if (!assertion) {
      return { ok: false, error: 'Déverrouillage de l’appareil annulé.' };
    }

    const response = assertion.response as AuthenticatorAssertionResponse;
    const check = verifyAssertionPayload(
      new Uint8Array(response.clientDataJSON),
      new Uint8Array(response.authenticatorData),
      new Uint8Array(response.signature),
      expectedChallenge
    );
    if (!check.valid) {
      return { ok: false, error: check.reason ?? 'Signature de l’appareil refusée.' };
    }

    return { ok: true };
  } catch (err) {
    const name = err instanceof Error ? err.name : '';
    if (name === 'NotAllowedError') {
      return {
        ok: false,
        error:
          'Vérification de l’appareil annulée ou appareil différent. Réessaie ou utilise un code de secours.',
      };
    }
    if (name === 'SecurityError') {
      return {
        ok: false,
        error:
          'Vérification bloquée dans un cadre intégré. Ouvre le site directement ou utilise un code de secours.',
      };
    }
    return {
      ok: false,
      error: 'Échec de la vérification par verrouillage de l’appareil. Utilise un code de secours si tu as changé d’appareil.',
    };
  }
}

/**
 * Generates 8 one-time recovery codes formatted as XXXX-XXXX.
 */
export function generateRecoveryCodes(count = 8): string[] {
  const c = getCryptoObj();
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const bytes = new Uint8Array(8);
    if (c && c.getRandomValues) {
      c.getRandomValues(bytes);
    } else {
      for (let j = 0; j < 8; j++) bytes[j] = Math.floor(Math.random() * 256);
    }
    let raw = '';
    for (let j = 0; j < 8; j++) {
      raw += RECOVERY_ALPHABET[bytes[j] % RECOVERY_ALPHABET.length];
    }
    codes.push(`${raw.slice(0, 4)}-${raw.slice(4, 8)}`);
  }
  return codes;
}

export function normalizeRecoveryCode(code: string): string {
  const clean = code.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (clean.length === 8) {
    return `${clean.slice(0, 4)}-${clean.slice(4, 8)}`;
  }
  return clean;
}

export async function hashRecoveryCodes(codes: string[]): Promise<string[]> {
  return Promise.all(codes.map((c) => hashPasswordPBKDF2(normalizeRecoveryCode(c))));
}

export async function verifyAndConsumeRecoveryCode(
  inputCode: string,
  hashes: string[]
): Promise<{ valid: boolean; remainingHashes: string[] }> {
  const normalized = normalizeRecoveryCode(inputCode);
  if (normalized.length < 8) {
    return { valid: false, remainingHashes: hashes };
  }
  for (let i = 0; i < hashes.length; i++) {
    const matched = await verifyPasswordPBKDF2(normalized, hashes[i]);
    if (matched) {
      const remainingHashes = hashes.filter((_, idx) => idx !== i);
      return { valid: true, remainingHashes };
    }
  }
  return { valid: false, remainingHashes: hashes };
}

export async function hashTwoFactorPin(pin: string): Promise<string> {
  return hashPasswordPBKDF2(`2fa-pin::${pin.trim()}`);
}

export async function verifyTwoFactorPin(pin: string, pinHash?: string): Promise<boolean> {
  if (!pinHash) return false;
  return verifyPasswordPBKDF2(`2fa-pin::${pin.trim()}`, pinHash);
}

/**
 * Determines whether a profile requires 2FA verification (mandatory for Owner account).
 */
export function isTwoFactorMandatoryForProfile(profile?: UserProfile | null): boolean {
  if (!profile) return false;
  if (isOwnerProfile(profile)) return true;
  return Boolean(profile.twoFactor?.required || profile.twoFactor?.enabled);
}

export function isTwoFactorConfigured(profile?: UserProfile | null): boolean {
  if (!profile?.twoFactor?.enabled) return false;
  if (profile.twoFactor.method === 'device') {
    return Boolean(profile.twoFactor.webauthnCredentialId);
  }
  return Boolean(profile.twoFactor.pinHash);
}

// ==================== SESSION 2FA GATE TOKENS ====================

export function markTwoFactorSessionVerified(
  profileId: string,
  rememberHours = 0
): void {
  const now = Date.now();
  const sessionToken: TwoFactorSessionToken = {
    profileId,
    verifiedAt: now,
    expiresAt: now + 4 * 60 * 60 * 1000, // 4h active tab session
  };
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(SESSION_2FA_KEY, JSON.stringify(sessionToken));
    }
  } catch {
    // ignore storage errors
  }

  try {
    if (typeof localStorage !== 'undefined') {
      if (rememberHours > 0) {
        const trustedToken: TwoFactorSessionToken = {
          profileId,
          verifiedAt: now,
          expiresAt: now + rememberHours * 60 * 60 * 1000,
        };
        localStorage.setItem(TRUSTED_DEVICE_2FA_KEY, JSON.stringify(trustedToken));
      } else {
        localStorage.removeItem(TRUSTED_DEVICE_2FA_KEY);
      }
    }
  } catch {
    // ignore
  }
}

export function isTwoFactorSessionVerified(profileId?: string | null): boolean {
  if (!profileId) return false;
  const now = Date.now();

  const checkRaw = (raw: string | null): boolean => {
    if (!raw) return false;
    try {
      const parsed = JSON.parse(raw) as TwoFactorSessionToken;
      return parsed.profileId === profileId && typeof parsed.expiresAt === 'number' && parsed.expiresAt > now;
    } catch {
      return false;
    }
  };

  try {
    if (typeof sessionStorage !== 'undefined' && checkRaw(sessionStorage.getItem(SESSION_2FA_KEY))) {
      return true;
    }
  } catch {
    // ignore
  }

  try {
    if (typeof localStorage !== 'undefined' && checkRaw(localStorage.getItem(TRUSTED_DEVICE_2FA_KEY))) {
      return true;
    }
  } catch {
    // ignore
  }

  return false;
}

export function clearTwoFactorSessionVerification(): void {
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(SESSION_2FA_KEY);
    }
  } catch {
    // ignore
  }
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(TRUSTED_DEVICE_2FA_KEY);
    }
  } catch {
    // ignore
  }
}
