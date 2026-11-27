import { SecurityState } from '../types';

/**
 * ============================================================================
 * GARDE ANTI-ESCALADE « Admin__ » (v17.6)
 * ----------------------------------------------------------------------------
 * Toute saisie contenant la commande privilégiée « Admin__ » (et ses variantes
 * obfusquées : pleine largeur, caractères invisibles, leet speak, underscores
 * combinants, forme inversée « __Admin ») déclenche :
 *   1. le blocage immédiat de l'entrée (aucune écriture, aucun rôle accordé) ;
 *   2. la coupure de la session en cours ;
 *   3. le bannissement définitif de l'identité (e-mail / nom) qui a tenté ;
 *   4. un verrouillage progressif de l'application : 5 min → 30 min → 3 h → 24 h.
 *
 * Principe non négociable : aucun rôle, privilège ou accès Propriétaire ne peut
 * être obtenu par une chaîne de caractères saisie. Le rôle vient uniquement du
 * compte vérifié (PBKDF2 + 2FA) et de la RLS Supabase.
 * ============================================================================
 */

export const ADMIN_COMMAND_LABEL = 'Admin__';

/** Fenêtre de réhabilitation : au-delà de 24 h sans tentative, le compteur repart à 1. */
export const ADMIN_REHABILITATION_MS = 24 * 60 * 60 * 1000;

/** Nombre maximum d'identités bannies conservées localement. */
export const ADMIN_BANNED_IDENTITIES_LIMIT = 12;

export type AdminCommandRuleId = 'ADM-001' | 'ADM-002' | 'ADM-003' | 'ADM-004';

export interface AdminCommandHit {
  ruleId: AdminCommandRuleId;
  signature: string;
  description: string;
  /** Extrait neutralisé et tronqué (jamais de secret en clair). */
  excerpt: string;
}

/** Caractères invisibles utilisés pour contourner un filtre naïf (ZWSP, BOM, bidi...). */
const INVISIBLE_CHARS = /[\u00AD\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u206A-\u206F\uFEFF]/g;

/** Faux underscores : pleine largeur, combinants, guillemets bas, etc. */
const LOOKALIKE_UNDERSCORES = /[\uFF3F\u0332\u0331\u2017\u2018\u02CD]/g;

/** Normalisation Unicode : NFKD + suppression des caractères invisibles + faux underscores. */
export function normalizeAdminCommandText(raw: string): string {
  if (!raw) return '';
  let text = raw;
  try {
    text = text.normalize('NFKD');
  } catch {
    /* environnement sans normalisation Unicode */
  }
  return text
    .replace(INVISIBLE_CHARS, '')
    .replace(LOOKALIKE_UNDERSCORES, '_')
    .toLowerCase();
}

/**
 * Vue compacte : accents et séparateurs supprimés, leet speak replié.
 * « Ａｄｍｉｎ ＿ ＿ » → « admin__ »  ·  « 4dm1n__ » → « admin__ »
 */
export function compactAdminCommandView(raw: string): string {
  return normalizeAdminCommandText(raw)
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[4@]/g, 'a')
    .replace(/[1!|]/g, 'i')
    .replace(/0/g, 'o')
    .replace(/[^a-z_]/g, '');
}

/**
 * Détecte la commande privilégiée « Admin__ » et ses variantes.
 * Retourne `null` pour toute saisie légitime (aucun faux positif sur
 * « administrateur », « administratif », « admin panel », « badminton »...).
 */
export function detectAdminCommand(raw: string): AdminCommandHit | null {
  if (!raw || typeof raw !== 'string') return null;
  const input = raw.length > 5000 ? raw.slice(0, 5000) : raw;
  const compact = compactAdminCommandView(input);
  if (!compact) return null;

  const doubleUnderscore = /admin_{2,}/.test(compact);
  const reversed = /_{2,}admin/.test(compact);
  const truncated = /admin_(?![a-z])/.test(compact);
  if (!doubleUnderscore && !reversed && !truncated) return null;

  // Saisie littérale (sans obfuscation) : on teste la chaîne BRUTE, sans normalisation Unicode,
  // pour distinguer « Admin__ » de ses variantes pleine largeur / caractères invisibles / leet.
  const directLiteral = /admin_{2,}/.test(input.toLowerCase().replace(/[\s\u00A0]+/g, ''));

  const excerpt = input.replace(INVISIBLE_CHARS, '').trim().slice(0, 80);

  if (doubleUnderscore && reversed) {
    return {
      ruleId: 'ADM-003',
      signature: '__Admin__',
      description:
        'Variante encadrée « __Admin__ » détectée : tentative d’escalade de privilèges bloquée, session coupée et identité bannie.',
      excerpt,
    };
  }

  if (doubleUnderscore && !directLiteral) {
    return {
      ruleId: 'ADM-002',
      signature: 'Admin__ (obfusquée)',
      description:
        'Commande « Admin__ » obfusquée détectée (caractères invisibles, pleine largeur ou leet speak) : tentative de contournement bloquée.',
      excerpt,
    };
  }

  if (doubleUnderscore) {
    return {
      ruleId: 'ADM-001',
      signature: 'Admin__',
      description:
        'Commande privilégiée « Admin__ » détectée : tentative de prise de contrôle bloquée, aucun rôle accordé, session coupée et identité bannie.',
      excerpt,
    };
  }

  return {
    ruleId: 'ADM-004',
    signature: 'Admin_',
    description:
      'Commande tronquée « Admin_ » détectée : tentative d’escalade bloquée par précaution (variante probable de « Admin__ »).',
    excerpt,
  };
}

/** Retourne la règle déclenchée, sans effet de bord (utilisé par les simulations à blanc). */
export function previewAdminCommand(raw: string): { blocked: boolean; ruleId?: string; description?: string } {
  const hit = detectAdminCommand(raw);
  if (!hit) return { blocked: false };
  return { blocked: true, ruleId: hit.ruleId, description: hit.description };
}

// ============================================================================
// ÉCHELLE DE BLOCAGE PROGRESSIF
// ============================================================================

export const ADMIN_LOCKDOWN_LADDER = [
  { level: 1, minutes: 5 },
  { level: 2, minutes: 30 },
  { level: 3, minutes: 180 },
  { level: 4, minutes: 1440 },
] as const;

export interface AdminLockdownPolicy {
  level: number;
  minutes: number;
  until: string;
  untilMs: number;
  /** L'identité qui a tenté est bannie définitivement (sauf session Propriétaire). */
  identityBan: boolean;
}

export function formatAdminDuration(minutes: number): string {
  if (!Number.isFinite(minutes) || minutes <= 0) return '0 min';
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const hours = Math.floor(minutes / 60);
  const rest = Math.round(minutes % 60);
  if (hours < 24) return rest > 0 ? `${hours} h ${rest} min` : `${hours} h`;
  const days = Math.floor(hours / 24);
  const restHours = hours % 24;
  return restHours > 0 ? `${days} j ${restHours} h` : `${days} j`;
}

/** Compte à rebours lisible : « 4 min 12 s », « 2 h 05 min ». */
export function formatAdminRemaining(ms: number): string {
  if (!Number.isFinite(ms) || ms <= 0) return '0 s';
  const totalSec = Math.ceil(ms / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  if (days > 0) return `${days} j ${hours} h`;
  if (hours > 0) return `${hours} h ${String(minutes).padStart(2, '0')} min`;
  if (minutes > 0) return `${minutes} min ${String(seconds).padStart(2, '0')} s`;
  return `${seconds} s`;
}

export function computeAdminLockdown(attempts: number, now: number = Date.now()): AdminLockdownPolicy {
  const safeAttempts = Math.max(1, Math.floor(Number.isFinite(attempts) ? attempts : 1));
  const index = Math.min(safeAttempts, ADMIN_LOCKDOWN_LADDER.length) - 1;
  const step = ADMIN_LOCKDOWN_LADDER[index];
  const untilMs = now + step.minutes * 60_000;
  return {
    level: step.level,
    minutes: step.minutes,
    until: new Date(untilMs).toISOString(),
    untilMs,
    identityBan: true,
  };
}

/** Millisecondes restantes avant la fin du verrouillage (0 si aucun verrou actif). */
export function adminLockRemainingMs(
  sec?: Pick<SecurityState, 'adminLockdownUntil'> | null,
  now: number = Date.now()
): number {
  const until = sec?.adminLockdownUntil;
  if (!until) return 0;
  const untilMs = Date.parse(until);
  if (Number.isNaN(untilMs)) return 0;
  return Math.max(0, untilMs - now);
}

export function isAdminLockActive(
  sec?: Pick<SecurityState, 'adminLockdownUntil'> | null,
  now: number = Date.now()
): boolean {
  return adminLockRemainingMs(sec, now) > 0;
}

export function normalizeIdentityKey(value?: string | null): string {
  if (!value) return '';
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** L'identité (e-mail, pseudo ou id) a-t-elle été bannie pour tentative d'escalade ? */
export function isIdentityBanned(
  sec?: Pick<SecurityState, 'adminBlockedIdentities'> | null,
  identity?: string | null
): boolean {
  const key = normalizeIdentityKey(identity);
  if (!key) return false;
  const banned = sec?.adminBlockedIdentities ?? [];
  return banned.some((entry) => normalizeIdentityKey(entry) === key);
}

/** Ajoute une identité à la liste de bannissement (sans doublon, liste plafonnée). */
export function addBannedIdentity(list: string[] | undefined, identity?: string | null): string[] {
  const current = [...(list ?? [])];
  const key = normalizeIdentityKey(identity);
  if (!key) return current;
  if (current.some((entry) => normalizeIdentityKey(entry) === key)) return current;
  current.push(key);
  return current.slice(-ADMIN_BANNED_IDENTITIES_LIMIT);
}

/**
 * Garde de dernier recours : même si un composant oubliait `guardInput`,
 * cette fonction refuse toute valeur contenant la commande privilégiée.
 */
export function assertNoAdminCommand(value: string): string {
  if (detectAdminCommand(value)) {
    throw new Error('Commande privilégiée « Admin__ » refusée par la garde anti-escalade.');
  }
  return value;
}
