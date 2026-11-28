/**
 * v19.0 — Extension universelle du catalogue : 10 nouveaux chapitres
 * d’approfondissement pour chacune des 107 matières existantes (1 070 chapitres).
 *
 * Chaque matière reçoit un module curaté (thème d’approfondissement, concept
 * central, règle de référence, piège d’examen, cas pratique) décliné en 10
 * étapes pédagogiques : diagnostic, fondements, règles, méthode, exercice guidé,
 * étude de cas, pièges, fiche mémo, entraînement chronométré, synthèse.
 *
 * Aucun appel réseau : tout le contenu est embarqué dans le bundle.
 */

export type ExtensionModuleTuple = [
  slug: string,
  title: string,
  coreConcept: string,
  keyRule: string,
  examTrap: string,
  practicalCase: string,
];

export type ExtensionSubjectModules = Record<string, ExtensionModuleTuple[]>;
