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
    id: '2nde',
    label: 'Seconde (2nde)',
    shortLabel: '2nde',
    cycle: 'lycee',
    cycleLabel: 'Lycée',
    order: 5,
    description: 'Tronc commun du lycée et découverte des filières scientifiques, littéraires et techniques.',
  },
  {
    id: '1ere',
    label: 'Première (1ère)',
    shortLabel: '1ère',
    cycle: 'lycee',
    cycleLabel: 'Lycée',
    order: 6,
    description: 'Spécialisation des séries A, C, D, F, G et préparation anticipée du Baccalauréat.',
  },
  {
    id: 'terminale',
    label: 'Terminale (Tle · Bac)',
    shortLabel: 'Tle',
    cycle: 'lycee',
    cycleLabel: 'Lycée',
    order: 7,
    description: 'Maîtrise complète des programmes du Baccalauréat et passerelle vers l’université.',
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
  { id: 'lycee', label: 'Lycée', rangeLabel: '2nde → Tle', levels: ['2nde', '1ere', 'terminale'] },
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
  medecine_clinique: UNIV_L1_MASTER,
};

const CLASS_LEVEL_MAP: Record<ClassLevelId, ClassLevelMeta> = Object.fromEntries(
  CLASS_LEVELS.map((c) => [c.id, c])
) as Record<ClassLevelId, ClassLevelMeta>;

export function getClassLevelMeta(id?: ClassLevelId): ClassLevelMeta {
  if (!id || !CLASS_LEVEL_MAP[id]) return CLASS_LEVELS[6]; // Terminale fallback
  return CLASS_LEVEL_MAP[id];
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
  const sorted = [...levels].sort((a, b) => getClassLevelMeta(a).order - getClassLevelMeta(b).order);
  const first = getClassLevelMeta(sorted[0]).shortLabel;
  const last = getClassLevelMeta(sorted[sorted.length - 1]).shortLabel;
  return first === last ? first : `${first} → ${last}`;
}
