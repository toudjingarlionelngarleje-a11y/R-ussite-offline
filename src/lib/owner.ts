import { AccountRole, OwnerGlobalSettings, UserProfile } from '../types';
import { COACH_KNOWLEDGE_STATS } from '../data/coachKnowledge';
import { CHAPTERS, SUBJECTS, X19_COVERAGE, X20_COVERAGE, X21_COVERAGE, X23_COVERAGE, X24_EXTENSION } from '../data';

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
    `Bienvenue sur Réussite Offline ! Prépare tes examens et concours 2026 avec 77 examens & concours, ${SUBJECTS.length} matières et ${CHAPTERS.length} chapitres, 100 pare-feux WAF et 134 systèmes de sécurité actifs — dont 6 matières strictement scolaires (latin-grec, technologie du collège, arts plastiques, méthodes & orientation, sciences de l’ingénieur, méthodologie du Bac) désormais à 170 chapitres chacune. Nouveautés v24.0 : 10 nouvelles matières (éducation financière, entrepreneuriat, sciences forensiques, médiation, langues nationales, inclusion & langue des signes, IA & société, climat & adaptation, économie circulaire, gérontologie) dotées de 80 chapitres chacune, plus ${X24_EXTENSION.chapters.length} chapitres de consolidation (10 dans chacune des ${X24_EXTENSION.subjectsCovered} matières, du diagnostic au portfolio). Le catalogue atteint ${CHAPTERS.length} chapitres, avec cours, fiches, QCM, flashcards et annales associées, et un Coach IA de ${COACH_KNOWLEDGE_STATS.notions} notions / ${COACH_KNOWLEDGE_STATS.methods} méthodes, 100 % hors ligne.`,
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

/**
 * Le rôle « owner » porté par les DONNÉES ne suffit JAMAIS : une simple chaîne
 * `role: 'owner'` dans un profil (ou un patch d'interface) ne doit pas donner les
 * pleins pouvoirs. Seul l'e-mail officiel ou l'identifiant historique du fondateur
 * accorde le statut Propriétaire.
 */
export function isOwnerProfile(profile?: UserProfile | null): boolean {
  if (!profile) return false;
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
  // Un profil non-Propriétaire qui prétend être 'owner' est ramené à son rôle réel.
  const fallbackRole = profile.category === 'enseignant' ? 'teacher' : 'user';
  return {
    ...profile,
    role: profile.role === 'owner' ? fallbackRole : profile.role ?? fallbackRole,
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
