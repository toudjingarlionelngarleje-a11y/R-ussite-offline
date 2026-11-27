export { LYCEE_NEW_EXAMS } from './metadata';
export {
  LYCEE_SUBJECT_SPECS,
  SECONDE_L_SUBJECTS,
  SECONDE_S_SUBJECTS,
  TERMINALE_L_SUBJECTS,
  TERMINALE_S_SUBJECTS,
} from './content';
export type { LyceeModule, LyceeStream, LyceeSubjectSpec } from './content';
export { LYCEE_STREAMS_PACK } from './pack';

import { LYCEE_STREAMS_PACK } from './pack';

export const LYCEE_CHAPTERS = LYCEE_STREAMS_PACK.chapters;
export const LYCEE_COURSES = LYCEE_STREAMS_PACK.courses;
export const LYCEE_FICHES = LYCEE_STREAMS_PACK.fiches;
export const LYCEE_QUESTIONS = LYCEE_STREAMS_PACK.questions;
export const LYCEE_ANNALES = LYCEE_STREAMS_PACK.annales;
export const LYCEE_FLASHCARDS = LYCEE_STREAMS_PACK.flashcards;
