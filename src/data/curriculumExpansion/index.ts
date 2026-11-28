import { mergeBundles } from './engine';
import { GROUP_A_SCIENCES } from './groupA_Sciences';
import { GROUP_B_LETTRES_DROIT } from './groupB_LettresDroit';
import { GROUP_C_ECO_GESTION } from './groupC_EcoGestion';
import { GROUP_D_SANTE_TERRAIN } from './groupD_SanteTerrain';

const ALL_CURRICULUM_EXPANSION = mergeBundles([
  GROUP_A_SCIENCES,
  GROUP_B_LETTRES_DROIT,
  GROUP_C_ECO_GESTION,
  GROUP_D_SANTE_TERRAIN,
]);

export const EXPANDED_CHAPTERS = ALL_CURRICULUM_EXPANSION.chapters;
export const EXPANDED_COURSES = ALL_CURRICULUM_EXPANSION.courses;
export const EXPANDED_FICHES = ALL_CURRICULUM_EXPANSION.fiches;
