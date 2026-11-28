import { ClassLevelId } from '../../types';

/**
 * v18.0 — Base de connaissances pédagogiques du Coach IA (100 % hors ligne).
 *
 * Chaque notion est une « fiche de poche » structurée : définition, formule,
 * points clés, exemple, piège classique et moyen mnémotechnique. Le moteur
 * `src/lib/coachEngine.ts` s’appuie sur ces champs (et sur les alias) pour
 * répondre instantanément, sans réseau ni modèle distant.
 */
export type CoachDomain =
  | 'maths'
  | 'physique'
  | 'chimie'
  | 'biologie'
  | 'francais'
  | 'philosophie'
  | 'histoire'
  | 'geographie'
  | 'anglais'
  | 'economie'
  | 'droit'
  | 'informatique'
  | 'sante'
  | 'ingenierie'
  | 'methodologie'
  | 'orientation';

export interface CoachNotion {
  id: string;
  /** Libellé affiché, avec la casse officielle (« Discriminant Δ »). */
  term: string;
  subjectId: string;
  domain: CoachDomain;
  /** Synonymes, abréviations et formulations orales reconnues par le moteur. */
  aliases: string[];
  classLevels: ClassLevelId[];
  definition: string;
  formula?: string;
  /** Points essentiels à retenir (2 à 4). */
  keys: string[];
  example: string;
  /** Erreur classique en contrôle ou à l’examen. */
  pitfall: string;
  mnemonic?: string;
  /** Identifiants de notions complémentaires proposées en relance. */
  related?: string[];
}

export type CoachMethodKind = 'epreuve' | 'revision' | 'organisation' | 'bienetre';

export interface CoachMethod {
  id: string;
  title: string;
  kind: CoachMethodKind;
  aliases: string[];
  summary: string;
  /** Durée ou moment conseillé (« 20 min », « J-7 », « pendant l’épreuve »). */
  durationHint: string;
  steps: string[];
  errors: string[];
  checklist: string[];
}

export const COACH_DOMAIN_LABELS: Record<CoachDomain, string> = {
  maths: 'Mathématiques',
  physique: 'Physique',
  chimie: 'Chimie',
  biologie: 'SVT & Biologie',
  francais: 'Français',
  philosophie: 'Philosophie',
  histoire: 'Histoire',
  geographie: 'Géographie',
  anglais: 'Anglais',
  economie: 'Économie & Gestion',
  droit: 'Droit',
  informatique: 'Informatique',
  sante: 'Santé',
  ingenierie: 'Ingénierie',
  methodologie: 'Méthodes de travail',
  orientation: 'Orientation',
};

export const COACH_METHOD_KIND_LABELS: Record<CoachMethodKind, string> = {
  epreuve: 'Méthode d’épreuve',
  revision: 'Méthode de révision',
  organisation: 'Organisation',
  bienetre: 'Bien-être & concentration',
};
