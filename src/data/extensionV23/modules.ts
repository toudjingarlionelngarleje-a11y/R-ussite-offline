import { ExtensionSubjectModules } from './types';
import { GROUP_A_SCIENCES } from './groupA_Sciences';
import { GROUP_B_DROIT_ECO } from './groupB_DroitEco';
import { GROUP_C_SANTE_TECH } from './groupC_SanteTech';
import { GROUP_D_LETTRES_ARTS } from './groupD_LettresArts';

/** Modules de la quatrième vague v23.0, par matière. */
export const ALL_X23_MODULES: ExtensionSubjectModules = {
  ...GROUP_A_SCIENCES,
  ...GROUP_B_DROIT_ECO,
  ...GROUP_C_SANTE_TECH,
  ...GROUP_D_LETTRES_ARTS,
};
