/**
 * v23.0 — Quatrième vague d’extension : 10 nouveaux chapitres
 * supplémentaires pour chacune des 107 matières (1 070 chapitres de plus).
 *
 * Chaque matière reçoit un module curaté (thème d’ouverture, concept central,
 * règle de référence, piège d’examen, cas de terrain) décliné en 10 étapes
 * pédagogiques inédites : rappels express, carte mentale, vocabulaire,
 * règle d’or, exemple commenté, erreurs & parades, exercices progressifs,
 * cas de terrain, synthèse, défi final.
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
