/**
 * v20.0 — Deuxième vague d’extension : 10 nouveaux chapitres
 * supplémentaires pour chacune des 107 matières (1 070 chapitres de plus).
 *
 * Chaque matière reçoit un module curaté (thème d’approfondissement, concept
 * central, règle de référence, piège d’examen, cas pratique) décliné en 10
 * étapes pédagogiques : prérequis, modélisation, outils, atelier, protocole, cas de terrain,
 * diagnostic des erreurs, mémo express, concours blanc, ouverture.
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
