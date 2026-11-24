import { CENTURION_NEW_EXAMS, CENTURION_NEW_SUBJECTS, mergeCenturionBundles } from './engine';
import { CENTURION_PACK_1 } from './pack1_SciencesFondamentales';
import { CENTURION_PACK_2 } from './pack2_LettresLanguesHumaines';
import { CENTURION_PACK_3 } from './pack3_DroitEcoGestion';
import { CENTURION_PACK_4 } from './pack4_SanteTerrainIngenieur';
import { CENTURION_PACK_5 } from './pack5_NewTechArchiMed';
import {
  C100_P6_ANNALES,
  C100_P6_CHAPTERS,
  C100_P6_COURSES,
  C100_P6_FICHES,
  C100_P6_FLASHCARDS,
  C100_P6_QUESTIONS,
} from './pack6_NewSciPoEauFinance';

const MERGED = mergeCenturionBundles([
  CENTURION_PACK_1,
  CENTURION_PACK_2,
  CENTURION_PACK_3,
  CENTURION_PACK_4,
  CENTURION_PACK_5,
  {
    chapters: C100_P6_CHAPTERS,
    courses: C100_P6_COURSES,
    fiches: C100_P6_FICHES,
    questions: C100_P6_QUESTIONS,
    annales: C100_P6_ANNALES,
    flashcards: C100_P6_FLASHCARDS,
  },
]);

export { CENTURION_NEW_EXAMS, CENTURION_NEW_SUBJECTS };

export const CENTURION100_CHAPTERS = MERGED.chapters;
export const CENTURION100_COURSES = MERGED.courses;
export const CENTURION100_FICHES = MERGED.fiches;
export const CENTURION100_QUESTIONS = MERGED.questions;
export const CENTURION100_ANNALES = MERGED.annales;
export const CENTURION100_FLASHCARDS = MERGED.flashcards;
