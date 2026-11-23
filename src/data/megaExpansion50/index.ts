import { MegaBundle, mergeMegaBundles, MEGA50_EXAMS, buildMissingChapterExercises } from './engine';
import { PACK_1A_SCIENCES_FOND } from './pack1a_SciencesFond';
import { PACK_1B_TECH_INGENIEUR } from './pack1b_TechIngenieur';
import { PACK_2A_LETTRES_LANGUES } from './pack2a_LettresLangues';
import { PACK_2B_DROIT_CITOYEN } from './pack2b_DroitCitoyen';
import { PACK_3A_ECO_FINANCE } from './pack3a_EcoFinance';
import { PACK_3B_GESTION_METIERS } from './pack3b_GestionMetiers';
import { PACK_4A_SANTE_MEDECINE } from './pack4a_SanteMedecine';
import { PACK_4B_TERRAIN_MONDE } from './pack4b_TerrainMonde';

const COMBINED_MEGA50: MegaBundle = mergeMegaBundles([
  PACK_1A_SCIENCES_FOND,
  PACK_1B_TECH_INGENIEUR,
  PACK_2A_LETTRES_LANGUES,
  PACK_2B_DROIT_CITOYEN,
  PACK_3A_ECO_FINANCE,
  PACK_3B_GESTION_METIERS,
  PACK_4A_SANTE_MEDECINE,
  PACK_4B_TERRAIN_MONDE,
]);

export { MEGA50_EXAMS, buildMissingChapterExercises };

export const MEGA50_CHAPTERS = COMBINED_MEGA50.chapters;
export const MEGA50_COURSES = COMBINED_MEGA50.courses;
export const MEGA50_FICHES = COMBINED_MEGA50.fiches;
export const MEGA50_QUESTIONS = COMBINED_MEGA50.questions;
export const MEGA50_ANNALES = COMBINED_MEGA50.annales;
export const MEGA50_FLASHCARDS = COMBINED_MEGA50.flashcards;
