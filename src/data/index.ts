import { ClassLevelId, ExamTrack } from '../types';
import {
  CHAPTERS as BASE_CHAPTERS,
  COUNTRIES,
  COURSES as BASE_COURSES,
  EXAMS as BASE_EXAMS,
  STUDY_LEVELS as BASE_STUDY_LEVELS,
  SUBJECTS as BASE_SUBJECTS,
  USER_CATEGORIES,
} from './metadata';
import { ANNALES as BASE_ANNALES, QUESTIONS as BASE_QUESTIONS } from './questions';
import { FICHES as BASE_FICHES, FLASHCARDS as BASE_FLASHCARDS } from './fichesAndCards';
import {
  EXTRA_CHAPTERS,
  EXTRA_COURSES,
  EXTRA_EXAMS,
  EXTRA_SUBJECTS,
} from './extendedMetadata';
import {
  EXTRA_ANNALES,
  EXTRA_FICHES,
  EXTRA_FLASHCARDS,
  EXTRA_QUESTIONS,
} from './extendedContent';
import {
  MEGA_ANNALES,
  MEGA_CHAPTERS,
  MEGA_COURSES,
  MEGA_EXAMS,
  MEGA_FICHES,
  MEGA_FLASHCARDS,
  MEGA_QUESTIONS,
  MEGA_SUBJECTS,
} from './megaCatalog';
import {
  ULTRA_ANNALES,
  ULTRA_CHAPTERS,
  ULTRA_COURSES,
  ULTRA_EXAMS,
  ULTRA_FICHES,
  ULTRA_FLASHCARDS,
  ULTRA_QUESTIONS,
  ULTRA_SUBJECTS,
} from './ultraCatalog';
import {
  APEX_ANNALES,
  APEX_CHAPTERS,
  APEX_COURSES,
  APEX_EXAMS,
  APEX_FICHES,
  APEX_FLASHCARDS,
  APEX_QUESTIONS,
  APEX_SUBJECTS,
} from './apexCatalog';
import {
  ZENITH_ANNALES,
  ZENITH_CHAPTERS,
  ZENITH_COURSES,
  ZENITH_EXAMS,
  ZENITH_FICHES,
  ZENITH_FLASHCARDS,
  ZENITH_QUESTIONS,
  ZENITH_SUBJECTS,
} from './zenithCatalog';
import {
  SUMMIT_ANNALES,
  SUMMIT_CHAPTERS,
  SUMMIT_COURSES,
  SUMMIT_EXAMS,
  SUMMIT_FICHES,
  SUMMIT_FLASHCARDS,
  SUMMIT_QUESTIONS,
  SUMMIT_SUBJECTS,
} from './summitCatalog';
import {
  HORIZON_ANNALES,
  HORIZON_CHAPTERS,
  HORIZON_COURSES,
  HORIZON_EXAMS,
  HORIZON_FICHES,
  HORIZON_FLASHCARDS,
  HORIZON_QUESTIONS,
  HORIZON_SUBJECTS,
} from './horizonCatalog';
import {
  EXPANDED_CHAPTERS,
  EXPANDED_COURSES,
  EXPANDED_FICHES,
} from './curriculumExpansion';
import {
  MEGA50_ANNALES,
  MEGA50_CHAPTERS,
  MEGA50_COURSES,
  MEGA50_EXAMS,
  MEGA50_FICHES,
  MEGA50_FLASHCARDS,
  MEGA50_QUESTIONS,
  buildMissingChapterExercises,
} from './megaExpansion50';
import {
  PREMIERE_ANNALES,
  PREMIERE_CHAPTERS,
  PREMIERE_COURSES,
  PREMIERE_FICHES,
  PREMIERE_FLASHCARDS,
  PREMIERE_NEW_EXAMS,
  PREMIERE_QUESTIONS,
} from './premiereStreams';
import {
  LYCEE_ANNALES,
  LYCEE_CHAPTERS,
  LYCEE_COURSES,
  LYCEE_FICHES,
  LYCEE_FLASHCARDS,
  LYCEE_NEW_EXAMS,
  LYCEE_QUESTIONS,
} from './lyceeStreams';
import {
  COLLEGE_LYCEE_ANNALES,
  COLLEGE_LYCEE_CHAPTERS,
  COLLEGE_LYCEE_COURSES,
  COLLEGE_LYCEE_FICHES,
  COLLEGE_LYCEE_FLASHCARDS,
  COLLEGE_LYCEE_NEW_SUBJECTS,
  COLLEGE_LYCEE_QUESTIONS,
} from './collegeLycee';
import {
  CLASS_LEVELS,
  HYPER72_ANNALES,
  HYPER72_CHAPTERS,
  HYPER72_COURSES,
  HYPER72_EXAMS,
  HYPER72_FICHES,
  HYPER72_FLASHCARDS,
  HYPER72_NEW_SUBJECTS,
  HYPER72_QUESTIONS,
  SCHOOL_CYCLES,
  SELECTABLE_CLASS_LEVELS,
  PREMIERE_STREAM_LEVELS,
  assignClassLevelForOrder,
  chapterMatchesLevel,
  expandPremiereStreamLevels,
  formatClassRange,
  getClassLevelMeta,
  getSubjectClassLevels,
  getSubjectClassLevelsExpanded,
} from './hyperExpansion72';
import {
  CENTURION100_ANNALES,
  CENTURION100_CHAPTERS,
  CENTURION100_COURSES,
  CENTURION100_FICHES,
  CENTURION100_FLASHCARDS,
  CENTURION100_QUESTIONS,
  CENTURION_NEW_EXAMS,
  CENTURION_NEW_SUBJECTS,
} from './centurion100';
import {
  MILLENNIUM_ANNALES,
  MILLENNIUM_CHAPTERS,
  MILLENNIUM_COURSES,
  MILLENNIUM_FICHES,
  MILLENNIUM_FLASHCARDS,
  MILLENNIUM_NEW_EXAMS,
  MILLENNIUM_NEW_SUBJECTS,
  MILLENNIUM_QUESTIONS,
} from './millennium100';
import {
  buildExtensionV19,
  extensionCoverage,
  ALL_X19_MODULES,
} from './extensionV19';
import {
  buildExtensionV20,
  extensionCoverage as extensionCoverageV20,
  ALL_X20_MODULES,
} from './extensionV20';
import {
  buildExtensionV21,
  extensionCoverage as extensionCoverageV21,
  ALL_X21_MODULES,
} from './extensionV21';
import {
  buildNewSubjectsV25,
  buildBoostV25,
} from './extensionV25/builder';
import { NEW_SUBJECTS_V25 } from './newSubjectsV25/subjects';
import {
  buildNewSubjectsV26,
  buildBoostV26,
} from './extensionV26/builder';
import { NEW_SUBJECTS_V26 } from './newSubjectsV26/subjects';
import {
  buildNewSubjectsV24,
  buildBoostV24,
} from './extensionV24/builder';
import { NEW_SUBJECTS_V24 } from './newSubjects/subjects';
import {
  buildExtensionV23,
  extensionCoverage as extensionCoverageV23,
  ALL_X23_MODULES,
} from './extensionV23';
import { V22_EXAMS, V22_EXAM_LINKS, buildAnnalesV22 } from './extensionV22';
import {
  TRADING_ANNALES,
  TRADING_CHAPTERS,
  TRADING_COURSES,
  TRADING_FICHES,
  TRADING_FLASHCARDS,
  TRADING_NEW_EXAMS,
  TRADING_NEW_SUBJECTS,
  TRADING_QUESTIONS,
} from './trading100';

export {
  COUNTRIES,
  USER_CATEGORIES,
  CLASS_LEVELS,
  SCHOOL_CYCLES,
  SELECTABLE_CLASS_LEVELS,
  PREMIERE_STREAM_LEVELS,
  chapterMatchesLevel,
  expandPremiereStreamLevels,
  getClassLevelMeta,
  getSubjectClassLevels,
  getSubjectClassLevelsExpanded,
  formatClassRange,
};

export const STUDY_LEVELS: string[] = [
  'Sixième / 6e (Collège)',
  'Cinquième / 5e (Collège)',
  'Quatrième / 4e (Collège)',
  'Troisième / 3e (BEPC / Brevet)',
  ...BASE_STUDY_LEVELS,
];

export function mapStudyLevelToClassId(
  studyLevel?: string,
  examId?: string
): ClassLevelId | null {
  if (!studyLevel) return null;
  const s = studyLevel.toLowerCase();
  if (s.includes('6e') || s.includes('sixième')) return '6e';
  if (s.includes('5e') || s.includes('cinquième')) return '5e';
  if (s.includes('4e') || s.includes('quatrième')) return '4e';
  if (s.includes('3e') || s.includes('troisième') || s.includes('bepc')) return '3e';
  if (s.includes('2nde') || s.includes('seconde')) {
    const literary =
      /littéraire|litteraire|série a|serie a|2nde l|2nde a/.test(s);
    const scientific = /scientifique|série c|serie c|2nde s|2nde c/.test(s);
    if (literary) return '2nde-l';
    if (scientific) return '2nde-s';
    if (examId === 'seconde-litteraire' || examId === 'bac-litteraire' || examId === 'bac-a4-lettres') {
      return '2nde-l';
    }
    return '2nde-s';
  }
  if (
    s.includes('première') ||
    s.includes('1ère') ||
    s.includes('1ere') ||
    s.includes('premiere')
  ) {
    const literary =
      /littéraire|litteraire|série a|serie a|1ère l|1ere l|1ère a|1ere a|a4|a5/.test(s);
    const scientific =
      /scientifique|série c|serie c|série d|serie d|1ère s|1ere s|1ère c|1ere c|1ère d|1ere d/.test(
        s
      );
    if (literary) return '1ere-l';
    if (scientific) return '1ere-s';
    if (examId === 'bac-litteraire' || examId === 'bac-a4-lettres' || examId === 'premiere-litteraire') {
      return '1ere-l';
    }
    return '1ere-s';
  }
  if (s.includes('terminale') || s.includes('baccalauréat') || s.includes('tle')) {
    const literary =
      /littéraire|litteraire|série a|serie a|série b|serie b|série g|serie g|tle l|tle a|a4|a5/.test(s);
    const scientific =
      /scientifique|série c|serie c|série d|serie d|série e|serie e|tle s|tle c|tle d|tle e/.test(s);
    if (literary) return 'terminale-l';
    if (scientific) return 'terminale-s';
    if (
      examId === 'terminale-litteraire' ||
      examId === 'bac-litteraire' ||
      examId === 'bac-a4-lettres' ||
      examId === 'bac-b-economie'
    ) {
      return 'terminale-l';
    }
    return 'terminale-s';
  }
  if (s.includes('licence 1') || s.includes('bts 1') || s.includes('l1')) return 'l1';
  if (s.includes('licence 2') || s.includes('bts 2') || s.includes('l2')) return 'l2';
  if (s.includes('licence 3') || s.includes('bachelor') || s.includes('l3')) return 'l3';
  if (s.includes('master') || s.includes('concours') || s.includes('professionnel')) return 'master';
  return null;
}

function inferExamClassLevels(exam: ExamTrack): ClassLevelId[] {
  if (exam.classLevels && exam.classLevels.length > 0) return exam.classLevels;
  const text = `${exam.id} ${exam.name} ${exam.category} ${exam.level}`.toLowerCase();
  if (text.includes('6e')) return ['6e'];
  if (text.includes('5e') || text.includes('4e')) return ['5e', '4e'];
  if (text.includes('bepc') || text.includes('brevet') || text.includes('3e')) return ['3e'];
  if (text.includes('bac')) return ['2nde', '1ere', 'terminale'];
  if (text.includes('bts') || text.includes('dut') || text.includes('l1') || text.includes('l2')) {
    return ['l1', 'l2'];
  }
  if (text.includes('l3') || text.includes('licence')) return ['l1', 'l2', 'l3'];
  if (
    text.includes('medecine') ||
    text.includes('médecine') ||
    text.includes('ingenieur') ||
    text.includes('ingénieur') ||
    text.includes('paramedical') ||
    text.includes('paramédical')
  ) {
    return ['terminale', 'l1', 'l2'];
  }
  return ['l2', 'l3', 'master'];
}

export const EXAMS: ExamTrack[] = [
  ...BASE_EXAMS,
  ...EXTRA_EXAMS,
  ...MEGA_EXAMS,
  ...ULTRA_EXAMS,
  ...APEX_EXAMS,
  ...ZENITH_EXAMS,
  ...SUMMIT_EXAMS,
  ...HORIZON_EXAMS,
  ...MEGA50_EXAMS,
  ...HYPER72_EXAMS,
  ...CENTURION_NEW_EXAMS,
  ...MILLENNIUM_NEW_EXAMS,
  ...TRADING_NEW_EXAMS,
  ...PREMIERE_NEW_EXAMS,
  ...LYCEE_NEW_EXAMS,
  // v22.0 — 6 nouveaux parcours d’examen inédits
  ...V22_EXAMS,
].map((exam) => ({
  ...exam,
  classLevels: inferExamClassLevels(exam),
}));

const EXTRA_EXAM_LINKS: Record<string, string[]> = {
  maths: [
    'bepc',
    'concours-medecine',
    'concours-ingenieur',
    'concours-ens-enseignement',
    'concours-energie-btp',
    'concours-telecoms',
    'concours-genie-civil',
    'concours-aeronautique',
    'concours-mines-petrole',
    'concours-urbanisme-sig',
  ],
  physique: [
    'concours-medecine',
    'concours-ingenieur',
    'concours-paramedical',
    'concours-agronomie',
    'concours-energie-btp',
    'concours-genie-civil',
    'concours-aeronautique',
    'concours-mines-petrole',
  ],
  svt: [
    'bepc',
    'concours-medecine',
    'concours-paramedical',
    'concours-agronomie',
    'concours-nutrition',
    'concours-veterinaire',
  ],
  philo: ['bac-litteraire'],
  droit: [
    'bts-compta-info',
    'concours-police-douanes',
    'concours-magistrature',
    'concours-diplomatie',
    'certif-droit-numerique',
  ],
  culture_gen: [
    'concours-police-douanes',
    'concours-magistrature',
    'concours-diplomatie',
    'concours-journalisme',
  ],
  economie: [
    'bac-litteraire',
    'bts-compta-info',
    'concours-finances-banque',
    'concours-diplomatie',
    'concours-transit-maritime',
  ],
  gestion_projet: [
    'certif-entrepreneuriat',
    'concours-energie-btp',
    'certif-supply-rh',
    'concours-genie-civil',
    'concours-urbanisme-sig',
  ],
  cybersecurite: [
    'certif-entrepreneuriat',
    'certif-data-ia',
    'concours-telecoms',
    'certif-fintech-microfinance',
    'certif-droit-numerique',
  ],
  francais: [
    'concours-police-douanes',
    'concours-ens-enseignement',
    'concours-magistrature',
    'concours-paramedical',
    'concours-journalisme',
  ],
  histoire_geo: ['concours-ens-enseignement'],
  anglais: [
    'concours-ingenieur',
    'certif-data-ia',
    'concours-diplomatie',
    'concours-energie-btp',
    'concours-telecoms',
    'concours-journalisme',
    'concours-aeronautique',
    'concours-transit-maritime',
  ],
  informatique: [
    'concours-ingenieur',
    'certif-entrepreneuriat',
    'certif-data-ia',
    'concours-energie-btp',
    'concours-telecoms',
    'concours-urbanisme-sig',
  ],
  comptabilite: [
    'certif-entrepreneuriat',
    'concours-finances-banque',
    'certif-supply-rh',
    'certif-fintech-microfinance',
    'concours-transit-maritime',
  ],
  psychotechnique: ['concours-magistrature', 'concours-paramedical', 'concours-finances-banque'],
  statistiques: [
    'certif-data-ia',
    'concours-finances-banque',
    'concours-agronomie',
    'concours-nutrition',
  ],
  educ_civique: ['concours-agronomie'],
  marketing_entrep: ['certif-supply-rh'],
  droit_ohada: ['certif-supply-rh', 'certif-fintech-microfinance', 'concours-transit-maritime'],
  finances_publiques: ['certif-fintech-microfinance'],
  arabe: ['concours-diplomatie'],
  energies_renouv: ['concours-telecoms', 'concours-genie-civil', 'concours-mines-petrole'],
  relations_inter: ['concours-journalisme'],
  sante_publique: ['concours-nutrition', 'concours-sante-maternelle'],
  anatomie_physio: ['concours-nutrition', 'concours-veterinaire', 'concours-sante-maternelle'],
  pharmacologie: ['concours-veterinaire', 'concours-sante-maternelle'],
  agronomie_env: [
    'concours-nutrition',
    'concours-mines-petrole',
    'concours-veterinaire',
    'concours-urbanisme-sig',
  ],
  nutrition_sante: ['concours-veterinaire', 'concours-sante-maternelle'],
  reseaux_telecoms: ['concours-aeronautique'],
  genie_civil_btp: ['concours-urbanisme-sig'],
  logistique_ci: ['concours-transit-maritime'],
  data_ia: ['certif-droit-numerique'],
  ethique_gouvernance: ['certif-droit-numerique'],
};

const DYNAMIC_EXAM_LINKS_BY_SUBJECT: Record<string, string[]> = {};
for (const exam of [
  ...MEGA50_EXAMS,
  ...HYPER72_EXAMS,
  ...CENTURION_NEW_EXAMS,
  ...MILLENNIUM_NEW_EXAMS,
  ...TRADING_NEW_EXAMS,
]) {
  for (const sid of exam.subjectIds) {
    DYNAMIC_EXAM_LINKS_BY_SUBJECT[sid] = [
      ...(DYNAMIC_EXAM_LINKS_BY_SUBJECT[sid] ?? []),
      exam.id,
    ];
  }
}

export const SUBJECTS = [
  ...BASE_SUBJECTS,
  ...EXTRA_SUBJECTS,
  ...MEGA_SUBJECTS,
  ...ULTRA_SUBJECTS,
  ...APEX_SUBJECTS,
  ...ZENITH_SUBJECTS,
  ...SUMMIT_SUBJECTS,
  ...HORIZON_SUBJECTS,
  ...HYPER72_NEW_SUBJECTS,
  ...CENTURION_NEW_SUBJECTS,
  ...MILLENNIUM_NEW_SUBJECTS,
  ...TRADING_NEW_SUBJECTS,
  ...COLLEGE_LYCEE_NEW_SUBJECTS,
  // v24.0 — dix nouvelles matières créées (100 chapitres chacune après consolidation)
  ...NEW_SUBJECTS_V24,
  // v25.0 — huit nouvelles matières illustrées (90 chapitres chacune après consolidation)
  ...NEW_SUBJECTS_V25,
  // v26.0 — huit nouvelles matières professionnelles illustrées (90 chapitres chacune)
  ...NEW_SUBJECTS_V26,
].map((s) => ({
  ...s,
  classLevels:
    s.classLevels && s.classLevels.length > 0
      ? expandPremiereStreamLevels(s.classLevels, s.id)
      : getSubjectClassLevelsExpanded(s.id),
  examIds: Array.from(
    new Set([
      ...s.examIds,
      ...(EXTRA_EXAM_LINKS[s.id] ?? []),
      ...(V22_EXAM_LINKS[s.id] ?? []),
      ...(DYNAMIC_EXAM_LINKS_BY_SUBJECT[s.id] ?? []),
    ])
  ),
}));

/**
 * v24.0 — Les vagues v19.0 à v23.0 ne couvrent que le catalogue historique (107 matières).
 * Les nouvelles matières v24.0 reçoivent leur propre programme puis la consolidation v24.0.
 */
const NEW_SUBJECT_IDS_V24 = new Set(NEW_SUBJECTS_V24.map((s) => s.id));
const NEW_SUBJECT_IDS_V25 = new Set(NEW_SUBJECTS_V25.map((s) => s.id));
const NEW_SUBJECT_IDS_V26 = new Set(NEW_SUBJECTS_V26.map((s) => s.id));
const LEGACY_SUBJECTS = SUBJECTS.filter(
  (s) => !NEW_SUBJECT_IDS_V24.has(s.id) && !NEW_SUBJECT_IDS_V25.has(s.id) && !NEW_SUBJECT_IDS_V26.has(s.id)
);
/** Les 117 matières présentes avant v25.0 (vagues v19.0 à v24.0 incluses). */
const SUBJECTS_V24 = SUBJECTS.filter((s) => !NEW_SUBJECT_IDS_V25.has(s.id) && !NEW_SUBJECT_IDS_V26.has(s.id));
/** Les 125 matières présentes avant v26.0 (vagues v19.0 à v25.0 incluses). */
const SUBJECTS_V25 = SUBJECTS.filter((s) => !NEW_SUBJECT_IDS_V26.has(s.id));

const RAW_CHAPTERS_BASE = [
  ...BASE_CHAPTERS,
  ...EXTRA_CHAPTERS,
  ...MEGA_CHAPTERS,
  ...ULTRA_CHAPTERS,
  ...APEX_CHAPTERS,
  ...ZENITH_CHAPTERS,
  ...SUMMIT_CHAPTERS,
  ...HORIZON_CHAPTERS,
  ...EXPANDED_CHAPTERS,
  ...MEGA50_CHAPTERS,
  ...HYPER72_CHAPTERS,
  ...CENTURION100_CHAPTERS,
  ...MILLENNIUM_CHAPTERS,
  ...TRADING_CHAPTERS,
  // v17.7 — 200 chapitres dédiés à la Première (100 scientifique + 100 littéraire)
  ...PREMIERE_CHAPTERS,
  // v17.8 — 400 chapitres dédiés à la Seconde et à la Terminale (S et L)
  ...LYCEE_CHAPTERS,
  // v17.9 — 720 chapitres scolaires (6 matières collège/lycée × 120 chapitres)
  ...COLLEGE_LYCEE_CHAPTERS,
];

/**
 * v19.0 — Extension universelle : 10 chapitres d’approfondissement pour
 * chacune des 107 matières existantes (1 070 chapitres + cours + fiches +
 * QCM + flashcards + annales), numérotés à la suite du programme de la matière.
 */
export const X19_EXTENSION = buildExtensionV19(RAW_CHAPTERS_BASE, LEGACY_SUBJECTS);
export const X19_COVERAGE = extensionCoverage(ALL_X19_MODULES);

const RAW_CHAPTERS_V19 = [...RAW_CHAPTERS_BASE, ...X19_EXTENSION.chapters];

/**
 * v20.0 — Deuxième vague : 10 chapitres de plus pour chacune des 107 matières
 * (prérequis, modélisation, outils, atelier, protocole, cas de terrain,
 * remédiation, mémo express, concours blanc, ouverture), numérotés à la suite
 * de la vague v19.0.
 */
export const X20_EXTENSION = buildExtensionV20(RAW_CHAPTERS_V19, LEGACY_SUBJECTS);
export const X20_COVERAGE = extensionCoverageV20(ALL_X20_MODULES);

const RAW_CHAPTERS_V20 = [...RAW_CHAPTERS_V19, ...X20_EXTENSION.chapters];

/**
 * v21.0 — Troisième vague : 10 chapitres de plus pour chacune des 107 matières
 * (mise en situation, concepts, démonstration, application, atelier corrigé,
 * contexte professionnel, auto-évaluation, consolidation, épreuve type, bilan),
 * numérotés à la suite des vagues v19.0 et v20.0.
 */
export const X21_EXTENSION = buildExtensionV21(RAW_CHAPTERS_V20, LEGACY_SUBJECTS);
export const X21_COVERAGE = extensionCoverageV21(ALL_X21_MODULES);

const RAW_CHAPTERS_V21 = [...RAW_CHAPTERS_V20, ...X21_EXTENSION.chapters];

/** v23.0 — quatrième vague : 10 chapitres inédits dans chacune des 107 matières. */
export const X23_EXTENSION = buildExtensionV23(RAW_CHAPTERS_V21, LEGACY_SUBJECTS);
export const X23_COVERAGE = extensionCoverageV23(ALL_X23_MODULES);

const RAW_CHAPTERS_V23 = [...RAW_CHAPTERS_V21, ...X23_EXTENSION.chapters];

/** v24.0 — dix nouvelles matières, 80 chapitres chacune. */
export const X24_NEW_SUBJECTS_EXTENSION = buildNewSubjectsV24(RAW_CHAPTERS_V23, NEW_SUBJECTS_V24);

const RAW_CHAPTERS_WITH_NEW_SUBJECTS = [
  ...RAW_CHAPTERS_V23,
  ...X24_NEW_SUBJECTS_EXTENSION.chapters,
];

/** v24.0 — consolidation : 10 chapitres supplémentaires dans les 117 matières. */
export const X24_EXTENSION = buildBoostV24(RAW_CHAPTERS_WITH_NEW_SUBJECTS, SUBJECTS_V24);

const RAW_CHAPTERS_V24 = [...RAW_CHAPTERS_WITH_NEW_SUBJECTS, ...X24_EXTENSION.chapters];

/** v25.0 — huit nouvelles matières illustrées, 80 chapitres chacune. */
export const X25_NEW_SUBJECTS_EXTENSION = buildNewSubjectsV25(RAW_CHAPTERS_V24, NEW_SUBJECTS_V25);

const RAW_CHAPTERS_WITH_V25_SUBJECTS = [...RAW_CHAPTERS_V24, ...X25_NEW_SUBJECTS_EXTENSION.chapters];

/** v25.0 — approfondissement illustré : 10 chapitres de plus dans les 125 matières. */
export const X25_EXTENSION = buildBoostV25(RAW_CHAPTERS_WITH_V25_SUBJECTS, SUBJECTS_V25);

const RAW_CHAPTERS_V25 = [...RAW_CHAPTERS_WITH_V25_SUBJECTS, ...X25_EXTENSION.chapters];

/** v26.0 — huit nouvelles matières professionnelles illustrées, 80 chapitres chacune. */
export const X26_NEW_SUBJECTS_EXTENSION = buildNewSubjectsV26(RAW_CHAPTERS_V25, NEW_SUBJECTS_V26);

const RAW_CHAPTERS_WITH_V26_SUBJECTS = [...RAW_CHAPTERS_V25, ...X26_NEW_SUBJECTS_EXTENSION.chapters];

/** v26.0 — approfondissement illustré : 10 chapitres de plus dans les 133 matières. */
export const X26_EXTENSION = buildBoostV26(RAW_CHAPTERS_WITH_V26_SUBJECTS, SUBJECTS);

const RAW_CHAPTERS = [...RAW_CHAPTERS_WITH_V26_SUBJECTS, ...X26_EXTENSION.chapters];

// Attribuer un niveau de classe (6e → Master) à 100% des chapitres sans écraser les attributions explicites
const UNASSIGNED_BY_SUBJECT: Record<string, string[]> = {};
for (const ch of RAW_CHAPTERS) {
  if (!ch.classLevel) {
    UNASSIGNED_BY_SUBJECT[ch.subjectId] = UNASSIGNED_BY_SUBJECT[ch.subjectId] ?? [];
    UNASSIGNED_BY_SUBJECT[ch.subjectId].push(ch.id);
  }
}
const ASSIGNED_CLASS_BY_CHAPTER_ID: Record<string, ClassLevelId> = {};
for (const [sid, ids] of Object.entries(UNASSIGNED_BY_SUBJECT)) {
  ids.forEach((id, idx) => {
    ASSIGNED_CLASS_BY_CHAPTER_ID[id] = assignClassLevelForOrder(sid, idx, ids.length);
  });
}

export const CHAPTERS = RAW_CHAPTERS.map((ch) => ({
  ...ch,
  classLevel: ch.classLevel ?? ASSIGNED_CLASS_BY_CHAPTER_ID[ch.id] ?? getSubjectClassLevels(ch.subjectId)[0],
}));

const CHAPTER_CLASS_MAP: Record<string, ClassLevelId> = Object.fromEntries(
  CHAPTERS.map((ch) => [ch.id, ch.classLevel!])
);

export const COURSES = [
  ...BASE_COURSES,
  ...EXTRA_COURSES,
  ...MEGA_COURSES,
  ...ULTRA_COURSES,
  ...APEX_COURSES,
  ...ZENITH_COURSES,
  ...SUMMIT_COURSES,
  ...HORIZON_COURSES,
  ...EXPANDED_COURSES,
  ...MEGA50_COURSES,
  ...HYPER72_COURSES,
  ...CENTURION100_COURSES,
  ...MILLENNIUM_COURSES,
  ...TRADING_COURSES,
  ...PREMIERE_COURSES,
  // v17.8 — 400 chapitres dédiés à la Seconde et à la Terminale (S et L)
  ...LYCEE_COURSES,
  // v17.9 — 720 chapitres scolaires (6 matières collège/lycée × 120 chapitres)
  ...COLLEGE_LYCEE_COURSES,
  // v19.0 — 1 070 chapitres d’approfondissement (107 matières × 10)
  ...X19_EXTENSION.courses,
  // v20.0 — 1 070 cours supplémentaires (107 matières × 10)
  ...X20_EXTENSION.courses,
  // v21.0 — 1 070 cours supplémentaires (107 matières × 10)
  ...X21_EXTENSION.courses,
  ...X23_EXTENSION.courses,
  // v24.0 — nouvelles matières + consolidation
  ...X24_NEW_SUBJECTS_EXTENSION.courses,
  ...X24_EXTENSION.courses,
  ...X25_NEW_SUBJECTS_EXTENSION.courses,
  ...X25_EXTENSION.courses,
  ...X26_NEW_SUBJECTS_EXTENSION.courses,
  ...X26_EXTENSION.courses,
].map((crs) => ({
  ...crs,
  classLevel: crs.classLevel ?? CHAPTER_CLASS_MAP[crs.chapterId] ?? getSubjectClassLevels(crs.subjectId)[0],
}));

export const FICHES = [
  ...BASE_FICHES,
  ...EXTRA_FICHES,
  ...MEGA_FICHES,
  ...ULTRA_FICHES,
  ...APEX_FICHES,
  ...ZENITH_FICHES,
  ...SUMMIT_FICHES,
  ...HORIZON_FICHES,
  ...EXPANDED_FICHES,
  ...MEGA50_FICHES,
  ...HYPER72_FICHES,
  ...CENTURION100_FICHES,
  ...MILLENNIUM_FICHES,
  ...TRADING_FICHES,
  ...PREMIERE_FICHES,
  // v17.8 — 400 chapitres dédiés à la Seconde et à la Terminale (S et L)
  ...LYCEE_FICHES,
  // v17.9 — 720 chapitres scolaires (6 matières collège/lycée × 120 chapitres)
  ...COLLEGE_LYCEE_FICHES,
  // v19.0 — 1 070 fiches d’approfondissement (107 matières × 10)
  ...X19_EXTENSION.fiches,
  // v20.0 — 1 070 fiches supplémentaires (107 matières × 10)
  ...X20_EXTENSION.fiches,
  // v21.0 — 1 070 fiches supplémentaires (107 matières × 10)
  ...X21_EXTENSION.fiches,
  ...X23_EXTENSION.fiches,
  // v24.0 — nouvelles matières + consolidation
  ...X24_NEW_SUBJECTS_EXTENSION.fiches,
  ...X24_EXTENSION.fiches,
  ...X25_NEW_SUBJECTS_EXTENSION.fiches,
  ...X25_EXTENSION.fiches,
  ...X26_NEW_SUBJECTS_EXTENSION.fiches,
  ...X26_EXTENSION.fiches,
].map((fic) => ({
  ...fic,
  classLevel: fic.classLevel ?? CHAPTER_CLASS_MAP[fic.chapterId] ?? getSubjectClassLevels(fic.subjectId)[0],
}));

const CORE_AND_MEGA_QUESTIONS = [
  ...BASE_QUESTIONS,
  ...EXTRA_QUESTIONS,
  ...MEGA_QUESTIONS,
  ...ULTRA_QUESTIONS,
  ...APEX_QUESTIONS,
  ...ZENITH_QUESTIONS,
  ...SUMMIT_QUESTIONS,
  ...HORIZON_QUESTIONS,
  ...MEGA50_QUESTIONS,
  ...HYPER72_QUESTIONS,
  ...CENTURION100_QUESTIONS,
  ...MILLENNIUM_QUESTIONS,
  ...TRADING_QUESTIONS,
  ...PREMIERE_QUESTIONS,
  // v17.8 — 400 chapitres dédiés à la Seconde et à la Terminale (S et L)
  ...LYCEE_QUESTIONS,
  // v17.9 — 720 chapitres scolaires (6 matières collège/lycée × 120 chapitres)
  ...COLLEGE_LYCEE_QUESTIONS,
  // v19.0 — 1 070 QCM d’approfondissement (107 matières × 10)
  ...X19_EXTENSION.questions,
  // v20.0 — 1 070 QCM supplémentaires (107 matières × 10)
  ...X20_EXTENSION.questions,
  // v21.0 — 1 070 QCM supplémentaires (107 matières × 10)
  ...X21_EXTENSION.questions,
  ...X23_EXTENSION.questions,
  // v24.0 — nouvelles matières + consolidation
  ...X24_NEW_SUBJECTS_EXTENSION.questions,
  ...X24_EXTENSION.questions,
  ...X25_NEW_SUBJECTS_EXTENSION.questions,
  ...X25_EXTENSION.questions,
  ...X26_NEW_SUBJECTS_EXTENSION.questions,
  ...X26_EXTENSION.questions,
];

const SUBJECT_META_MAP: Record<string, { name: string; examIds: string[] }> = Object.fromEntries(
  SUBJECTS.map((s) => [s.id, { name: s.name, examIds: s.examIds }])
);

const CHAPTER_COVERAGE_QUESTIONS = buildMissingChapterExercises(
  CHAPTERS,
  FICHES,
  CORE_AND_MEGA_QUESTIONS,
  SUBJECT_META_MAP
);

export const QUESTIONS = [...CORE_AND_MEGA_QUESTIONS, ...CHAPTER_COVERAGE_QUESTIONS].map((q) => ({
  ...q,
  classLevel: q.classLevel ?? CHAPTER_CLASS_MAP[q.chapterId] ?? getSubjectClassLevels(q.subjectId)[0],
}));

const EXAM_CLASS_MAP: Record<string, ClassLevelId[]> = Object.fromEntries(
  EXAMS.map((e) => [e.id, e.classLevels ?? ['terminale']])
);

export const ANNALES = [
  ...BASE_ANNALES,
  ...EXTRA_ANNALES,
  ...MEGA_ANNALES,
  ...ULTRA_ANNALES,
  ...APEX_ANNALES,
  ...ZENITH_ANNALES,
  ...SUMMIT_ANNALES,
  ...HORIZON_ANNALES,
  ...MEGA50_ANNALES,
  ...HYPER72_ANNALES,
  ...CENTURION100_ANNALES,
  ...MILLENNIUM_ANNALES,
  ...TRADING_ANNALES,
  ...PREMIERE_ANNALES,
  // v17.8 — 400 chapitres dédiés à la Seconde et à la Terminale (S et L)
  ...LYCEE_ANNALES,
  // v17.9 — 720 chapitres scolaires (6 matières collège/lycée × 120 chapitres)
  ...COLLEGE_LYCEE_ANNALES,
  // v19.0 — 321 annales d’approfondissement (107 matières × 3 sujets)
  ...X19_EXTENSION.annales,
  // v20.0 — 321 annales supplémentaires (107 matières × 3 sujets)
  ...X20_EXTENSION.annales,
  // v21.0 — 321 annales supplémentaires (107 matières × 3 sujets)
  ...X21_EXTENSION.annales,
  // v23.0 — 321 annales supplémentaires (107 matières × 3 sujets)
  ...X23_EXTENSION.annales,
  // v24.0 — 381 annales (117 matières × 3 sujets + 30 nouvelles matières)
  ...X24_NEW_SUBJECTS_EXTENSION.annales,
  ...X24_EXTENSION.annales,
  ...X25_NEW_SUBJECTS_EXTENSION.annales,
  ...X25_EXTENSION.annales,
  ...X26_NEW_SUBJECTS_EXTENSION.annales,
  ...X26_EXTENSION.annales,
  // v22.0 — 24 annales inédites (6 nouveaux parcours × 4 sessions)
  ...buildAnnalesV22(QUESTIONS),
].map((a) => {
  const examClasses = EXAM_CLASS_MAP[a.examId];
  const subjectClasses = getSubjectClassLevels(a.subjectId);
  const fallbackClass =
    (examClasses && examClasses[examClasses.length - 1]) ??
    subjectClasses[subjectClasses.length - 1] ??
    'terminale';
  return {
    ...a,
    classLevel: a.classLevel ?? fallbackClass,
  };
});

export const FLASHCARDS = [
  ...BASE_FLASHCARDS,
  ...EXTRA_FLASHCARDS,
  ...MEGA_FLASHCARDS,
  ...ULTRA_FLASHCARDS,
  ...APEX_FLASHCARDS,
  ...ZENITH_FLASHCARDS,
  ...SUMMIT_FLASHCARDS,
  ...HORIZON_FLASHCARDS,
  ...MEGA50_FLASHCARDS,
  ...HYPER72_FLASHCARDS,
  ...CENTURION100_FLASHCARDS,
  ...MILLENNIUM_FLASHCARDS,
  ...TRADING_FLASHCARDS,
  ...PREMIERE_FLASHCARDS,
  // v17.8 — 400 chapitres dédiés à la Seconde et à la Terminale (S et L)
  ...LYCEE_FLASHCARDS,
  // v17.9 — 720 chapitres scolaires (6 matières collège/lycée × 120 chapitres)
  ...COLLEGE_LYCEE_FLASHCARDS,
  // v19.0 — 1 070 flashcards d’approfondissement (107 matières × 10)
  ...X19_EXTENSION.flashcards,
  // v20.0 — 1 070 flashcards supplémentaires (107 matières × 10)
  ...X20_EXTENSION.flashcards,
  // v21.0 — 1 070 flashcards supplémentaires (107 matières × 10)
  ...X21_EXTENSION.flashcards,
  ...X23_EXTENSION.flashcards,
  // v24.0 — nouvelles matières + consolidation
  ...X24_NEW_SUBJECTS_EXTENSION.flashcards,
  ...X24_EXTENSION.flashcards,
  ...X25_NEW_SUBJECTS_EXTENSION.flashcards,
  ...X25_EXTENSION.flashcards,
  ...X26_NEW_SUBJECTS_EXTENSION.flashcards,
  ...X26_EXTENSION.flashcards,
];
