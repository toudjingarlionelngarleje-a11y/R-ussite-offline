import QRCode from 'qrcode';
import { TwoFactorConfig, UserProfile } from '../types';
import { isOwnerProfile } from './owner';
import {
  decryptVaultString,
  encryptVaultString,
  hashPasswordPBKDF2,
  verifyPasswordPBKDF2,
} from './securityFirewall';

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
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

/**
 * Generates a cryptographically strong 160-bit Base32 TOTP secret (32 chars).
 */
export function generateTotpSecret(byteLength = 20): string {
  const bytes = new Uint8Array(byteLength);
  const c = getCryptoObj();
  if (c && c.getRandomValues) {
    c.getRandomValues(bytes);
  } else {
    for (let i = 0; i < byteLength; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  return base32Encode(bytes);
}

export function base32Encode(bytes: Uint8Array): string {
  let bits = 0;
  let value = 0;
  let output = '';
  for (let i = 0; i < bytes.length; i++) {
    value = (value << 8) | bytes[i];
    bits += 8;
    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  }
  return output;
}

export function base32Decode(input: string): Uint8Array {
  const cleaned = input.toUpperCase().replace(/[^A-Z2-7]/g, '');
  let bits = 0;
  let value = 0;
  const out: number[] = [];
  for (let i = 0; i < cleaned.length; i++) {
    const idx = BASE32_ALPHABET.indexOf(cleaned[i]);
    if (idx === -1) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return new Uint8Array(out);
}

export function formatSecretForDisplay(secret: string): string {
  return secret.replace(/[^A-Z2-7]/gi, '').toUpperCase().replace(/(.{4})/g, '$1 ').trim();
}

export function buildOtpAuthUri(
  email: string,
  secret: string,
  issuer = 'Reussite Offline'
): string {
  const cleanSecret = secret.replace(/[^A-Z2-7]/gi, '').toUpperCase();
  const label = `${encodeURIComponent(issuer)}:${encodeURIComponent(email.trim().toLowerCase())}`;
  return `otpauth://totp/${label}?secret=${cleanSecret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`;
}

export async function generateQrDataUrl(otpAuthUri: string): Promise<string> {
  return QRCode.toDataURL(otpAuthUri, {
    errorCorrectionLevel: 'M',
    width: 220,
    margin: 2,
    color: {
      dark: '#0f172a',
      light: '#ffffff',
    },
  });
}

/**
 * RFC 6238 TOTP generator using Web Crypto HMAC-SHA1 (100% offline-capable).
 */
export async function computeTotpAtStep(
  secretBase32: string,
  timeStep: number
): Promise<string> {
  const c = getCryptoObj();
  if (!c || !c.subtle) {
    throw new Error('Web Crypto API indisponible pour la génération TOTP.');
  }
  const keyBytes = base32Decode(secretBase32);
  const counterBuf = new ArrayBuffer(8);
  const view = new DataView(counterBuf);
  const high = Math.floor(timeStep / 0x100000000);
  const low = timeStep >>> 0;
  view.setUint32(0, high, false);
  view.setUint32(4, low, false);

  const cryptoKey = await c.subtle.importKey(
    'raw',
    keyBytes.buffer as ArrayBuffer,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );
  const sig = new Uint8Array(await c.subtle.sign('HMAC', cryptoKey, counterBuf));
  const offset = sig[sig.length - 1] & 0x0f;
  const binary =
    ((sig[offset] & 0x7f) << 24) |
    ((sig[offset + 1] & 0xff) << 16) |
    ((sig[offset + 2] & 0xff) << 8) |
    (sig[offset + 3] & 0xff);
  return String(binary % 1_000_000).padStart(6, '0');
}

export async function computeCurrentTotp(
  secretBase32: string,
  nowMs = Date.now(),
  periodSec = 30
): Promise<{ code: string; timeStep: number; remainingSec: number }> {
  const epochSec = Math.floor(nowMs / 1000);
  const timeStep = Math.floor(epochSec / periodSec);
  const remainingSec = periodSec - (epochSec % periodSec);
  const code = await computeTotpAtStep(secretBase32, timeStep);
  return { code, timeStep, remainingSec };
}

export async function verifyTotpCode(
  secretBase32: string,
  inputCode: string,
  lastUsedTimeStep?: number,
  nowMs = Date.now(),
  windowSteps = 1
): Promise<{ valid: boolean; matchedTimeStep?: number; replayed?: boolean }> {
  const normalized = inputCode.replace(/\D/g, '');
  if (normalized.length !== 6) {
    return { valid: false };
  }
  const currentStep = Math.floor(nowMs / 1000 / 30);
  for (let delta = -windowSteps; delta <= windowSteps; delta++) {
    const step = currentStep + delta;
    const expected = await computeTotpAtStep(secretBase32, step);
    if (constantTimeEqual(normalized, expected)) {
      if (typeof lastUsedTimeStep === 'number' && step <= lastUsedTimeStep) {
        return { valid: false, replayed: true };
      }
      return { valid: true, matchedTimeStep: step };
    }
  }
  return { valid: false };
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

export async function encryptTotpSecret(secretBase32: string): Promise<string> {
  return encryptVaultString(secretBase32.replace(/[^A-Z2-7]/gi, '').toUpperCase());
}

export async function decryptTotpSecret(encrypted?: string): Promise<string | null> {
  if (!encrypted) return null;
  const plain = await decryptVaultString(encrypted);
  if (!plain) return null;
  const cleaned = plain.replace(/[^A-Z2-7]/gi, '').toUpperCase();
  return cleaned.length >= 16 ? cleaned : null;
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
  if (profile.twoFactor.method === 'totp') {
    return Boolean(profile.twoFactor.secretEncrypted);
  }
  return Boolean(profile.twoFactor.pinHash);
}

export function normalizeTwoFactorProfile(profile: UserProfile): UserProfile {
  if (isOwnerProfile(profile)) {
    const existing: TwoFactorConfig = profile.twoFactor ?? {
      required: true,
      enabled: false,
      method: 'totp',
      recoveryCodeHashes: [],
    };
    return {
      ...profile,
      twoFactor: {
        ...existing,
        required: true,
      },
    };
  }
  return profile;
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
