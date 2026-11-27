export { buildExtensionV20 } from './builder';
export type { ExtensionBundle } from './builder';
export { ALL_X20_MODULES } from './modules';
export type { ExtensionModuleTuple, ExtensionSubjectModules } from './types';

import { ExtensionSubjectModules } from './types';

/** Diagnostic statique de couverture de la deuxième vague. */
export function extensionCoverage(modules: ExtensionSubjectModules, chaptersPerModule = 10) {
  const subjects = Object.keys(modules);
  const duplicateSubjects = subjects.filter((id, idx) => subjects.indexOf(id) !== idx);
  const chapters = subjects.reduce((sum, id) => sum + modules[id].length * chaptersPerModule, 0);
  return { subjects: subjects.length, chapters, duplicateSubjects };
}
