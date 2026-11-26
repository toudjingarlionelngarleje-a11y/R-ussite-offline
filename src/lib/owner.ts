import { AccountRole, OwnerGlobalSettings, UserProfile } from '../types';

/**
 * Official Owner identity for Réussite Offline.
 * Automatically grants Owner / Founder privileges (role='owner', plan='premium')
 * both offline in IndexedDB and online in Supabase.
 */
export const OWNER_EMAILS = ['toudjingarlionelngarleje@gmail.com'];
export const OWNER_PROFILE_IDS = ['profile-1795361028411'];

export const DEFAULT_OWNER_SETTINGS: OwnerGlobalSettings = {
  announcementEnabled: false,
  announcementText:
    'Bienvenue sur Réussite Offline ! Prépare tes examens et concours 2026 avec 65 concours, 101 matières, 10 100 chapitres et 100 pare-feux WAF (128 systèmes de sécurité actifs).',
  announcementTone: 'info',
  maintenanceMode: false,
  registrationsOpen: true,
  freePremiumEvent: false,
  globalFirewallLevel: 'renforce',
  updatedAt: new Date().toISOString(),
};

export function isOwnerEmail(email?: string | null): boolean {
  if (!email) return false;
  return OWNER_EMAILS.includes(email.trim().toLowerCase());
}

export function isOwnerProfile(profile?: UserProfile | null): boolean {
  if (!profile) return false;
  if (profile.role === 'owner') return true;
  if (OWNER_PROFILE_IDS.includes(profile.id)) return true;
  return isOwnerEmail(profile.email);
}

/**
 * Normalizes a profile so the official owner always has role='owner' and unlimited 'premium' access.
 */
export function applyOwnerEntitlements(profile: UserProfile): UserProfile {
  if (isOwnerProfile(profile)) {
    const rawMethod = profile.twoFactor?.method;
    const normalizedMethod = rawMethod === 'pin' ? 'pin' : 'device';
    return {
      ...profile,
      role: 'owner',
      plan: 'premium',
      twoFactor: {
        required: true,
        enabled: profile.twoFactor?.enabled ?? false,
        method: normalizedMethod,
        webauthnCredentialId: profile.twoFactor?.webauthnCredentialId,
        webauthnDeviceLabel: profile.twoFactor?.webauthnDeviceLabel,
        pinHash: profile.twoFactor?.pinHash,
        recoveryCodeHashes: profile.twoFactor?.recoveryCodeHashes ?? [],
        configuredAt: profile.twoFactor?.configuredAt,
        lastVerifiedAt: profile.twoFactor?.lastVerifiedAt,
      },
    };
  }
  return {
    ...profile,
    role: profile.role ?? (profile.category === 'enseignant' ? 'teacher' : 'user'),
  };
}

export function getRoleLabel(role?: AccountRole): string {
  switch (role) {
    case 'owner':
      return 'Propriétaire / Fondateur';
    case 'admin':
      return 'Administrateur';
    case 'teacher':
      return 'Enseignant';
    default:
      return 'Candidat';
  }
}
