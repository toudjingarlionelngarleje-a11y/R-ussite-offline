export { buildExtensionV19 } from './builder';
export type { ExtensionBundle } from './builder';
export { ALL_X19_MODULES } from './modules';
export type { ExtensionModuleTuple, ExtensionSubjectModules } from './types';

import { ExtensionSubjectModules } from './types';

/**
 * Diagnostic statique : nombre de matières couvertes et de chapitres générés.
 * Utilisé par les harnais de données pour garantir qu’aucune matière n’est oubliée.
 */
export function extensionCoverage(modules: ExtensionSubjectModules, chaptersPerModule = 10) {
  const subjects = Object.keys(modules);
  const duplicateSubjects = subjects.filter((id, idx) => subjects.indexOf(id) !== idx);
  const chapters = subjects.reduce((sum, id) => sum + modules[id].length * chaptersPerModule, 0);
  return { subjects: subjects.length, chapters, duplicateSubjects };
}
