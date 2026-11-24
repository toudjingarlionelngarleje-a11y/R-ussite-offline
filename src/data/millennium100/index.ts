import { mergeCenturionBundles } from '../centurion100/engine';
import { M100_P1 } from './pack1_MecaThermoChimieMatAuto';
import { M100_P2 } from './pack2_DevDbWebUxIot';
import { M100_P3 } from './pack3_InfirmierMicroChirOdontoPsy';
import { M100_P4 } from './pack4_FiscalFoncierDiCrimCima';
import { M100_P5 } from './pack5_AuditEconometrieDevVenteQhse';
import { M100_P6 } from './pack6_PortugaisChinoisLittHistGeo';
import { M100_P7 } from './pack7_ForetAgroAquaAudio';

export { MILLENNIUM_NEW_EXAMS, MILLENNIUM_NEW_SUBJECTS } from './metadata';

export const MILLENNIUM_BUNDLE = mergeCenturionBundles([
  M100_P1,
  M100_P2,
  M100_P3,
  M100_P4,
  M100_P5,
  M100_P6,
  M100_P7,
]);

export const MILLENNIUM_CHAPTERS = MILLENNIUM_BUNDLE.chapters;
export const MILLENNIUM_COURSES = MILLENNIUM_BUNDLE.courses;
export const MILLENNIUM_FICHES = MILLENNIUM_BUNDLE.fiches;
export const MILLENNIUM_QUESTIONS = MILLENNIUM_BUNDLE.questions;
export const MILLENNIUM_ANNALES = MILLENNIUM_BUNDLE.annales;
export const MILLENNIUM_FLASHCARDS = MILLENNIUM_BUNDLE.flashcards;
