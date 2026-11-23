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
  SUBJECT_CLASS_PROFILES,
  getClassLevelMeta,
  getSubjectClassLevels,
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
