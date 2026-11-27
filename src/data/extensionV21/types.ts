/**
 * v21.0 — Troisième vague d’extension : 10 nouveaux chapitres
 * supplémentaires pour chacune des 107 matières (1 070 chapitres de plus).
 *
 * Chaque matière reçoit un module curaté (thème d’approfondissement, concept
 * central, règle de référence, piège d’examen, cas pratique) décliné en 10
 * étapes pédagogiques : mise en situation, concepts, démonstration, application, atelier corrigé,
 * contexte professionnel, auto-évaluation, consolidation, épreuve type, bilan.
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
