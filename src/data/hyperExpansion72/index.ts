import { HyperBundle, HYPER72_EXAMS, HYPER72_NEW_SUBJECTS, mergeHyperBundles } from './engine';
import { HYPER72_PACK_A } from './packA_Existing1';
import { HYPER72_PACK_B } from './packB_Existing2';
import { HYPER72_PACK_C1 } from './packC1_GestionMedia';
import { HYPER72_PACK_C2 } from './packC2_SanteTerrain';
import { HYPER72_PACK_D1 } from './packD1_NewTechLangAstro';
import { HYPER72_PACK_D2 } from './packD2_NewSocioArtsEps';
import { HYPER72_PACK_D3 } from './packD3_NewGenetPenalLing';

export {
  CLASS_LEVELS,
  SCHOOL_CYCLES,
  SELECTABLE_CLASS_LEVELS,
  PREMIERE_STREAM_LEVELS,
  PREMIERE_CORE_LEVEL,
  SUBJECT_CLASS_PROFILES,
  PREMIERE_SCIENCE_SUBJECT_IDS,
  PREMIERE_LITTERAIRE_SUBJECT_IDS,
  SECONDE_SCIENCE_SUBJECT_IDS,
  SECONDE_LITTERAIRE_SUBJECT_IDS,
  TERMINALE_SCIENCE_SUBJECT_IDS,
  TERMINALE_LITTERAIRE_SUBJECT_IDS,
  LYCEE_STREAM_LEVELS,
  STREAM_BASE_LEVELS,
  STREAM_LEVELS_BY_BASE,
  STREAM_BASE_BY_LEVEL,
  STREAM_SUBJECTS,
  chapterMatchesLevel,
  expandStreamLevels,
  expandPremiereStreamLevels,
  isSubjectInStream,
  isSubjectInPremiereStream,
  getClassLevelMeta,
  getSubjectClassLevels,
  getSubjectClassLevelsExpanded,
  assignClassLevelForOrder,
  formatClassRange,
} from './classLevels';

export { HYPER72_EXAMS, HYPER72_NEW_SUBJECTS };

export const HYPER72_BUNDLE: HyperBundle = mergeHyperBundles([
  HYPER72_PACK_A,
  HYPER72_PACK_B,
  HYPER72_PACK_C1,
  HYPER72_PACK_C2,
  HYPER72_PACK_D1,
  HYPER72_PACK_D2,
  HYPER72_PACK_D3,
]);

export const HYPER72_CHAPTERS = HYPER72_BUNDLE.chapters;
export const HYPER72_COURSES = HYPER72_BUNDLE.courses;
export const HYPER72_FICHES = HYPER72_BUNDLE.fiches;
export const HYPER72_QUESTIONS = HYPER72_BUNDLE.questions;
export const HYPER72_ANNALES = HYPER72_BUNDLE.annales;
export const HYPER72_FLASHCARDS = HYPER72_BUNDLE.flashcards;
