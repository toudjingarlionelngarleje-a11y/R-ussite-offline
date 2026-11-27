import { ClassLevelId, ClassLevelMeta, SchoolCycleId } from '../../types';

export const CLASS_LEVELS: ClassLevelMeta[] = [
  {
    id: '6e',
    label: 'Sixième (6e)',
    shortLabel: '6e',
    cycle: 'college',
    cycleLabel: 'Collège',
    order: 1,
    description: 'Consolidation des bases du cycle d’observation et entrée au collège.',
  },
  {
    id: '5e',
    label: 'Cinquième (5e)',
    shortLabel: '5e',
    cycle: 'college',
    cycleLabel: 'Collège',
    order: 2,
    description: 'Approfondissement des fondamentaux scientifiques, littéraires et méthodologiques.',
  },
  {
    id: '4e',
    label: 'Quatrième (4e)',
    shortLabel: '4e',
    cycle: 'college',
    cycleLabel: 'Collège',
    order: 3,
    description: 'Développement du raisonnement déductif, langues vivantes et sciences expérimentales.',
  },
  {
    id: '3e',
    label: 'Troisième (3e · BEPC)',
    shortLabel: '3e',
    cycle: 'college',
    cycleLabel: 'Collège',
    order: 4,
    description: 'Préparation complète au BEPC, DEF, BFEM et orientation lycée.',
  },
  {
    id: '2nde-s',
    label: 'Seconde Scientifique (2nde S / C)',
    shortLabel: '2nde S',
    cycle: 'lycee',
    cycleLabel: 'Lycée',
    order: 5.1,
    premiereStream: 'science',
    description:
      'Filière scientifique de Seconde : mathématiques, physique-chimie, sciences de la vie et de la Terre, informatique et sciences de l’ingénieur — détermination du choix de série C ou D.',
  },
  {
    id: '2nde-l',
    label: 'Seconde Littéraire (2nde L / A)',
    shortLabel: '2nde L',
    cycle: 'lycee',
    cycleLabel: 'Lycée',
    order: 5.2,
    premiereStream: 'litteraire',
    description:
      'Filière littéraire de Seconde : français, littérature, histoire-géographie, langues vivantes, culture générale et sciences humaines — détermination du choix de série A4 ou A5.',
  },
  {
    id: '2nde',
    label: 'Seconde — Tronc commun (2nde S & L)',
    shortLabel: '2nde S/L',
    cycle: 'lycee',
    cycleLabel: 'Lycée',
    order: 5,
    hidden: true,
    premiereStream: 'commun',
    description:
      'Tronc commun national de Seconde (français, histoire-géographie, langues vivantes, EPS, éducation civique, mathématiques) suivi par les élèves des filières scientifique et littéraire.',
  },
  {
    id: '1ere-s',
    label: 'Première Scientifique (1ère S / C / D)',
    shortLabel: '1ère S',
    cycle: 'lycee',
    cycleLabel: 'Lycée',
    order: 6.1,
    premiereStream: 'science',
    description:
      'Filière scientifique : mathématiques, physique-chimie, sciences de la vie et de la Terre, informatique et sciences de l’ingénieur — spécialisation et préparation anticipée du Baccalauréat séries C et D.',
  },
  {
    id: '1ere-l',
    label: 'Première Littéraire (1ère L / A4 / A5)',
    shortLabel: '1ère L',
    cycle: 'lycee',
    cycleLabel: 'Lycée',
    order: 6.2,
    premiereStream: 'litteraire',
    description:
      'Filière littéraire : français et littérature, philosophie, histoire-géographie, langues vivantes, littérature africaine et culture générale — spécialisation et préparation anticipée du Baccalauréat série A.',
  },
  {
    id: '1ere',
    label: 'Première — Tronc commun (1ère S & L)',
    shortLabel: '1ère S/L',
    cycle: 'lycee',
    cycleLabel: 'Lycée',
    order: 6,
    hidden: true,
    premiereStream: 'commun',
    description:
      'Tronc commun national de Première (français, histoire-géographie, langues vivantes, EPS, éducation civique) suivi par les élèves des filières scientifique et littéraire.',
  },
  {
    id: 'terminale-s',
    label: 'Terminale Scientifique (Tle S / C / D / E)',
    shortLabel: 'Tle S',
    cycle: 'lycee',
    cycleLabel: 'Lycée',
    order: 7.1,
    premiereStream: 'science',
    description:
      'Filière scientifique de Terminale : mathématiques, physique-chimie, SVT, informatique et sciences de l’ingénieur — préparation du Baccalauréat séries C, D et E et des concours scientifiques.',
  },
  {
    id: 'terminale-l',
    label: 'Terminale Littéraire (Tle L / A · B · G)',
    shortLabel: 'Tle L',
    cycle: 'lycee',
    cycleLabel: 'Lycée',
    order: 7.2,
    premiereStream: 'litteraire',
    description:
      'Filière littéraire et tertiaire de Terminale : philosophie, français et littérature, histoire-géographie, langues, sciences humaines, économie, droit et gestion — préparation du Baccalauréat séries A, B et G.',
  },
  {
    id: 'terminale',
    label: 'Terminale — Tronc commun (Tle S & L)',
    shortLabel: 'Tle S/L',
    cycle: 'lycee',
    cycleLabel: 'Lycée',
    order: 7,
    hidden: true,
    premiereStream: 'commun',
    description:
      'Tronc commun national de Terminale (philosophie, français, histoire-géographie, langues vivantes, EPS, éducation civique) suivi par les élèves des filières scientifique et littéraire.',
  },
  {
    id: 'l1',
    label: 'Université — Licence 1 (L1 / BTS 1)',
    shortLabel: 'L1',
    cycle: 'universite',
    cycleLabel: 'Université',
    order: 8,
    description: 'Premier cycle universitaire LMD, BTS 1ère année et classes préparatoires.',
  },
  {
    id: 'l2',
    label: 'Université — Licence 2 (L2 / BTS 2)',
    shortLabel: 'L2',
    cycle: 'universite',
    cycleLabel: 'Université',
    order: 9,
    description: 'Approfondissement disciplinaire LMD, BTS 2e année et DUT.',
  },
  {
    id: 'l3',
    label: 'Université — Licence 3 (L3)',
    shortLabel: 'L3',
    cycle: 'universite',
    cycleLabel: 'Université',
    order: 10,
    description: 'Spécialisation finale de Licence, mémoire et concours directs niveau Bac+3.',
  },
  {
    id: 'master',
    label: 'Master & Grands Concours (M1–M2)',
    shortLabel: 'Master',
    cycle: 'universite',
    cycleLabel: 'Université',
    order: 11,
    description: 'Expertise avancée Master, Écoles d’ingénieurs, Médecine, ENAM/ENA, Magistrature & Certifications.',
  },
];

export const SCHOOL_CYCLES: {
  id: SchoolCycleId;
  label: string;
  rangeLabel: string;
  levels: ClassLevelId[];
}[] = [
  { id: 'college', label: 'Collège', rangeLabel: '6e → 3e', levels: ['6e', '5e', '4e', '3e'] },
  {
    id: 'lycee',
    label: 'Lycée',
    rangeLabel: '2nde → Tle',
    levels: ['2nde-s', '2nde-l', '1ere-s', '1ere-l', 'terminale-s', 'terminale-l'],
  },
  {
    id: 'universite',
    label: 'Université & Concours',
    rangeLabel: 'L1 → Master',
    levels: ['l1', 'l2', 'l3', 'master'],
  },
];

const ALL_CLASSES: ClassLevelId[] = [
  '6e',
  '5e',
  '4e',
  '3e',
  '2nde',
  '1ere',
  'terminale',
  'l1',
  'l2',
  'l3',
  'master',
];
const FROM_5E: ClassLevelId[] = ['5e', '4e', '3e', '2nde', '1ere', 'terminale', 'l1', 'l2', 'l3', 'master'];
const FROM_4E: ClassLevelId[] = ['4e', '3e', '2nde', '1ere', 'terminale', 'l1', 'l2', 'l3', 'master'];
const FROM_3E: ClassLevelId[] = ['3e', '2nde', '1ere', 'terminale', 'l1', 'l2', 'l3', 'master'];
const LYCEE_TO_MASTER: ClassLevelId[] = ['2nde', '1ere', 'terminale', 'l1', 'l2', 'l3', 'master'];
const PREM_TO_MASTER: ClassLevelId[] = ['1ere', 'terminale', 'l1', 'l2', 'l3', 'master'];
const TLE_TO_MASTER: ClassLevelId[] = ['terminale', 'l1', 'l2', 'l3', 'master'];
const UNIV_L1_MASTER: ClassLevelId[] = ['l1', 'l2', 'l3', 'master'];

export const SUBJECT_CLASS_PROFILES: Record<string, ClassLevelId[]> = {
  // Collège (6e) → Université (Master)
  maths: ALL_CLASSES,
  francais: ALL_CLASSES,
  svt: ALL_CLASSES,
  histoire_geo: ALL_CLASSES,
  anglais: ALL_CLASSES,
  educ_civique: ALL_CLASSES,
  informatique: ALL_CLASSES,
  arabe: ALL_CLASSES,
  culture_gen: ALL_CLASSES,
  technologie_robotique: ALL_CLASSES,
  astronomie_spatial: ALL_CLASSES,
  arts_musique_patrimoine: ALL_CLASSES,
  eps_sciences_sport: ALL_CLASSES,
  linguistique_oralite: ALL_CLASSES,

  // Collège (5e/4e/3e) → Université
  physique: FROM_5E,
  espagnol: FROM_4E,
  allemand: FROM_4E,
  statistiques: FROM_3E,
  psychotechnique: FROM_3E,
  genetique_biotech: FROM_3E,

  // Lycée (2nde / 1ère) → Université
  economie: LYCEE_TO_MASTER,
  comptabilite: LYCEE_TO_MASTER,
  sociologie_anthropo: LYCEE_TO_MASTER,
  marketing_entrep: LYCEE_TO_MASTER,
  agronomie_env: LYCEE_TO_MASTER,
  energies_renouv: LYCEE_TO_MASTER,
  nutrition_sante: LYCEE_TO_MASTER,
  tourisme_hotel: LYCEE_TO_MASTER,
  journalisme_comm: LYCEE_TO_MASTER,
  chimie_bio: PREM_TO_MASTER,
  chimie_organique: PREM_TO_MASTER,
  philo: PREM_TO_MASTER,
  droit: PREM_TO_MASTER,
  gestion_projet: PREM_TO_MASTER,
  methodo_redaction: PREM_TO_MASTER,
  psychologie_cog: PREM_TO_MASTER,

  // Terminale / Prépa & Université L1 → Master
  droit_penal_proc: TLE_TO_MASTER,
  droit_ohada: TLE_TO_MASTER,
  finances_publiques: TLE_TO_MASTER,
  relations_inter: TLE_TO_MASTER,
  anatomie_physio: TLE_TO_MASTER,
  sante_publique: TLE_TO_MASTER,
  genie_civil_btp: TLE_TO_MASTER,
  reseaux_telecoms: TLE_TO_MASTER,
  cybersecurite: TLE_TO_MASTER,
  data_ia: TLE_TO_MASTER,
  geologie_mines: TLE_TO_MASTER,
  veterinaire_elevage: TLE_TO_MASTER,

  // Université L1 → Master & Concours spécialisés
  pharmacologie: UNIV_L1_MASTER,
  obstetrique_pediatrie: UNIV_L1_MASTER,
  logistique_ci: UNIV_L1_MASTER,
  commerce_maritime: UNIV_L1_MASTER,
  grh_travail: UNIV_L1_MASTER,
  pedagogie: UNIV_L1_MASTER,
  aeronautique_meteo: UNIV_L1_MASTER,
  fintech_microfinance: UNIV_L1_MASTER,
  ethique_gouvernance: UNIV_L1_MASTER,
  urbanisme_sig: UNIV_L1_MASTER,
  droit_numerique: UNIV_L1_MASTER,
  gestion_crises: UNIV_L1_MASTER,

  // Centurion v16 — 6 nouvelles matières complètes (100 chapitres chacune)
  hydrologie_eau_climat: ALL_CLASSES,
  electronique_electrotech: LYCEE_TO_MASTER,
  architecture_design: LYCEE_TO_MASTER,
  sciences_politiques: PREM_TO_MASTER,
  finance_marches_banque: PREM_TO_MASTER,
  // v17.4 — Trading & Marchés Financiers (101e matière du catalogue)
  trading_marches: PREM_TO_MASTER,
  medecine_clinique: UNIV_L1_MASTER,

  // Millennium v17 — 34 nouvelles matières (total 100 matières × 100 chapitres = 10 000 chapitres)
  genie_mecanique: LYCEE_TO_MASTER,
  thermodynamique_froid: LYCEE_TO_MASTER,
  genie_chimique_procedes: PREM_TO_MASTER,
  science_materiaux: PREM_TO_MASTER,
  automatique_controle: UNIV_L1_MASTER,
  genie_logiciel_devops: LYCEE_TO_MASTER,
  bases_donnees_bigdata: LYCEE_TO_MASTER,
  developpement_mobile_web: ALL_CLASSES,
  design_ux_infographie: ALL_CLASSES,
  iot_systemes_embarques: LYCEE_TO_MASTER,
  soins_infirmiers: PREM_TO_MASTER,
  microbiologie_biomed: PREM_TO_MASTER,
  chirurgie_traumatologie: UNIV_L1_MASTER,
  odontologie_stomato: UNIV_L1_MASTER,
  sante_mentale_psychiatrie: PREM_TO_MASTER,
  droit_fiscal_douanes: PREM_TO_MASTER,
  droit_foncier_environnement: PREM_TO_MASTER,
  droit_international_public: PREM_TO_MASTER,
  criminologie_securite: PREM_TO_MASTER,
  droit_assurances_cima: UNIV_L1_MASTER,
  audit_controle_interne: UNIV_L1_MASTER,
  econometrie_prevision: UNIV_L1_MASTER,
  economie_developpement: PREM_TO_MASTER,
  negociation_commerce_b2b: LYCEE_TO_MASTER,
  qualite_hse_iso: LYCEE_TO_MASTER,
  portugais_lusophone: ALL_CLASSES,
  chinois_mandarin: ALL_CLASSES,
  litterature_africaine: ALL_CLASSES,
  archeologie_histoire_afrique: ALL_CLASSES,
  geographie_amenagement: ALL_CLASSES,
  foresterie_biodiversite: ALL_CLASSES,
  agroalimentaire_transformation: LYCEE_TO_MASTER,
  peche_aquaculture: LYCEE_TO_MASTER,
  audiovisuel_cinema_podcast: ALL_CLASSES,

  // v17.9 — Matières strictement scolaires (collège et/ou lycée)
  latin_grec: ['6e', '5e', '4e', '3e', '2nde', '1ere', 'terminale'],
  arts_plastiques: ['6e', '5e', '4e', '3e', '2nde', '1ere', 'terminale'],
  methodes_travail: ['6e', '5e', '4e', '3e', '2nde', '1ere', 'terminale'],
  technologie_college: ['6e', '5e', '4e', '3e'],
  sciences_ingenieur: ['2nde', '1ere', 'terminale'],
  preparation_bac: ['2nde', '1ere', 'terminale'],
};

import {
  SECONDE_SCIENCE_SUBJECT_IDS,
  SECONDE_LITTERAIRE_SUBJECT_IDS,
  PREMIERE_SCIENCE_SUBJECT_IDS,
  PREMIERE_LITTERAIRE_SUBJECT_IDS,
  TERMINALE_SCIENCE_SUBJECT_IDS,
  TERMINALE_LITTERAIRE_SUBJECT_IDS,
} from './streamSubjects';

export {
  SECONDE_SCIENCE_SUBJECT_IDS,
  SECONDE_LITTERAIRE_SUBJECT_IDS,
  PREMIERE_SCIENCE_SUBJECT_IDS,
  PREMIERE_LITTERAIRE_SUBJECT_IDS,
  TERMINALE_SCIENCE_SUBJECT_IDS,
  TERMINALE_LITTERAIRE_SUBJECT_IDS,
} from './streamSubjects';

/** Niveaux techniques (tronc commun) partagés par les deux filières du lycée. */
export const STREAM_BASE_LEVELS: ClassLevelId[] = ['2nde', '1ere', 'terminale'];

/** Niveau technique du tronc commun de Première (compatibilité v17.7). */
export const PREMIERE_CORE_LEVEL: ClassLevelId = '1ere';

/** Filières dérivées d'un niveau technique, dans l'ordre scientifique puis littéraire. */
export const STREAM_LEVELS_BY_BASE: Partial<Record<ClassLevelId, [ClassLevelId, ClassLevelId]>> = {
  '2nde': ['2nde-s', '2nde-l'],
  '1ere': ['1ere-s', '1ere-l'],
  terminale: ['terminale-s', 'terminale-l'],
};

/** Les deux filières explicites de Première (compatibilité v17.7). */
export const PREMIERE_STREAM_LEVELS: ClassLevelId[] = ['1ere-s', '1ere-l'];

/** Les six filières du lycée (2nde, 1ère, Terminale). */
export const LYCEE_STREAM_LEVELS: ClassLevelId[] = [
  '2nde-s',
  '2nde-l',
  '1ere-s',
  '1ere-l',
  'terminale-s',
  'terminale-l',
];

/** Niveau technique d'origine d'une filière (2nde-s → 2nde). */
export const STREAM_BASE_BY_LEVEL: Partial<Record<ClassLevelId, ClassLevelId>> = Object.entries(
  STREAM_LEVELS_BY_BASE
).reduce((acc, [base, streams]) => {
  for (const stream of streams) acc[stream] = base as ClassLevelId;
  return acc;
}, {} as Partial<Record<ClassLevelId, ClassLevelId>>);

/** Niveaux affichés dans les sélecteurs (les troncs communs techniques restent masqués). */
export const SELECTABLE_CLASS_LEVELS: ClassLevelMeta[] = CLASS_LEVELS.filter((c) => !c.hidden);

/** Matières enseignées dans chaque filière du lycée. */
export const STREAM_SUBJECTS: Partial<Record<ClassLevelId, string[]>> = {
  '2nde-s': SECONDE_SCIENCE_SUBJECT_IDS,
  '2nde-l': SECONDE_LITTERAIRE_SUBJECT_IDS,
  '1ere-s': PREMIERE_SCIENCE_SUBJECT_IDS,
  '1ere-l': PREMIERE_LITTERAIRE_SUBJECT_IDS,
  'terminale-s': TERMINALE_SCIENCE_SUBJECT_IDS,
  'terminale-l': TERMINALE_LITTERAIRE_SUBJECT_IDS,
};

/** La matière est-elle enseignée dans cette filière du lycée ? */
export function isSubjectInStream(subjectId: string, stream: ClassLevelId): boolean {
  const subjects = STREAM_SUBJECTS[stream];
  return subjects ? subjects.includes(subjectId) : false;
}

/** Compatibilité v17.7 : filière de Première. */
export function isSubjectInPremiereStream(
  subjectId: string,
  stream: '1ere-s' | '1ere-l'
): boolean {
  return isSubjectInStream(subjectId, stream);
}

/**
 * Un chapitre appartient à une filière s'il porte explicitement son niveau,
 * ou s'il relève du tronc commun d'une matière enseignée dans cette filière.
 */
export function chapterMatchesLevel(
  chapterLevel: ClassLevelId | undefined,
  selectedLevel: ClassLevelId,
  subjectId?: string
): boolean {
  if (!chapterLevel) return false;
  if (chapterLevel === selectedLevel) return true;
  const base = STREAM_BASE_BY_LEVEL[selectedLevel];
  if (base && chapterLevel === base) {
    return subjectId ? isSubjectInStream(subjectId, selectedLevel) : true;
  }
  return false;
}

/**
 * Remplace chaque niveau technique du lycée (2nde, 1ere, terminale) par les
 * filières réellement enseignées pour la matière concernée.
 */
export function expandStreamLevels(levels: ClassLevelId[], subjectId?: string): ClassLevelId[] {
  const out: ClassLevelId[] = [];
  for (const level of levels) {
    const streams = STREAM_LEVELS_BY_BASE[level];
    if (!streams) {
      out.push(level);
      continue;
    }
    const relevant = subjectId ? streams.filter((s) => isSubjectInStream(subjectId, s)) : streams;
    if (relevant.length === 0) continue; // matière non enseignée à ce niveau
    out.push(...relevant);
  }
  return Array.from(new Set(out));
}

/** Compatibilité v17.7 : ancien nom de `expandStreamLevels`. */
export const expandPremiereStreamLevels = expandStreamLevels;

/** Liste de classes d'une matière, filières du lycée incluses et filtrées. */
export function getSubjectClassLevelsExpanded(subjectId: string): ClassLevelId[] {
  return expandStreamLevels(getSubjectClassLevels(subjectId), subjectId);
}

const CLASS_LEVEL_MAP: Record<ClassLevelId, ClassLevelMeta> = Object.fromEntries(
  CLASS_LEVELS.map((c) => [c.id, c])
) as Record<ClassLevelId, ClassLevelMeta>;

export function getClassLevelMeta(id?: ClassLevelId): ClassLevelMeta {
  if (id && CLASS_LEVEL_MAP[id]) return CLASS_LEVEL_MAP[id];
  return CLASS_LEVEL_MAP['terminale']; // Terminale fallback
}

export function getSubjectClassLevels(subjectId: string): ClassLevelId[] {
  return SUBJECT_CLASS_PROFILES[subjectId] ?? TLE_TO_MASTER;
}

export function assignClassLevelForOrder(
  subjectId: string,
  zeroBasedIndex: number,
  totalChapters: number
): ClassLevelId {
  const levels = getSubjectClassLevels(subjectId);
  if (levels.length === 0) return 'terminale';
  const safeTotal = Math.max(1, totalChapters);
  const ratio = Math.min(0.9999, Math.max(0, zeroBasedIndex / safeTotal));
  const idx = Math.floor(ratio * levels.length);
  return levels[Math.min(levels.length - 1, idx)];
}

export function formatClassRange(levels?: ClassLevelId[]): string {
  if (!levels || levels.length === 0) return 'Tle → Master';
  const visible = levels.filter((l) => !getClassLevelMeta(l).hidden);
  if (visible.length === 0) return 'Tle → Master';
  const sorted = [...visible].sort((a, b) => getClassLevelMeta(a).order - getClassLevelMeta(b).order);
  const first = getClassLevelMeta(sorted[0]).shortLabel;
  const last = getClassLevelMeta(sorted[sorted.length - 1]).shortLabel;
  return first === last ? first : `${first} → ${last}`;
}
