export { PREMIERE_NEW_EXAMS } from './metadata';
export {
  PREMIERE_L_SUBJECTS,
  PREMIERE_S_SUBJECTS,
  PREMIERE_SUBJECT_SPECS,
} from './content';
export type { PremiereModule, PremiereSubjectSpec } from './content';
export { PREMIERE_STREAMS_PACK } from './pack';

import { PREMIERE_STREAMS_PACK } from './pack';

export const PREMIERE_CHAPTERS = PREMIERE_STREAMS_PACK.chapters;
export const PREMIERE_COURSES = PREMIERE_STREAMS_PACK.courses;
export const PREMIERE_FICHES = PREMIERE_STREAMS_PACK.fiches;
export const PREMIERE_QUESTIONS = PREMIERE_STREAMS_PACK.questions;
export const PREMIERE_ANNALES = PREMIERE_STREAMS_PACK.annales;
export const PREMIERE_FLASHCARDS = PREMIERE_STREAMS_PACK.flashcards;
