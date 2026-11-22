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

export { COUNTRIES, USER_CATEGORIES };

export const STUDY_LEVELS: string[] = [
  'Troisième / 3e (BEPC / Brevet)',
  ...BASE_STUDY_LEVELS,
];

export const EXAMS = [...BASE_EXAMS, ...EXTRA_EXAMS];

const EXTRA_EXAM_LINKS: Record<string, string[]> = {
  maths: ['bepc', 'concours-medecine'],
  physique: ['concours-medecine'],
  svt: ['bepc', 'concours-medecine'],
  philo: ['bac-litteraire'],
  droit: ['bts-compta-info'],
  economie: ['bac-litteraire', 'bts-compta-info'],
};

export const SUBJECTS = [
  ...BASE_SUBJECTS.map((s) => ({
    ...s,
    examIds: Array.from(new Set([...s.examIds, ...(EXTRA_EXAM_LINKS[s.id] ?? [])])),
  })),
  ...EXTRA_SUBJECTS,
];

export const CHAPTERS = [...BASE_CHAPTERS, ...EXTRA_CHAPTERS];
export const COURSES = [...BASE_COURSES, ...EXTRA_COURSES];
export const QUESTIONS = [...BASE_QUESTIONS, ...EXTRA_QUESTIONS];
export const ANNALES = [...BASE_ANNALES, ...EXTRA_ANNALES];
export const FICHES = [...BASE_FICHES, ...EXTRA_FICHES];
export const FLASHCARDS = [...BASE_FLASHCARDS, ...EXTRA_FLASHCARDS];
