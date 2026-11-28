import { Subject } from '../../types';

/**
 * v31.0 — Neuf nouvelles matières professionnelles et techniques.
 * Chacune reçoit 80 chapitres dédiés (8 modules × 10 étapes illustrées),
 * puis les vagues d'approfondissement, soit 120 chapitres et sa galerie SVG.
 */
export const NEW_SUBJECTS_V31: Subject[] = [
  {
    id: 'imagerie_medicale',
    name: 'Imagerie médicale & radiologie',
    shortName: 'Imagerie médicale',
    examIds: ['concours-medecine', 'concours-paramedical', 'concours-internat-medecine'],
    classLevels: ['terminale', 'l1', 'l2', 'l3', 'master'],
    color: '#1D4ED8',
    icon: 'Scan',
    description:
      '80 chapitres : physique des rayons X, radioprotection, incidences et positionnement, scanner, IRM, échographie, contraste, contrôle qualité et relation patient.',
    sizeKb: 340,
  },
  {
    id: 'optometrie_optique',
    name: 'Optique professionnelle & optométrie',
    shortName: 'Optométrie',
    examIds: ['concours-paramedical', 'certif-pro', 'concours-sciences-infirmieres-labo'],
    classLevels: ['terminale', 'l1', 'l2', 'l3', 'master'],
    color: '#7C3AED',
    icon: 'Glasses',
    description:
      '80 chapitres : optique géométrique, réfraction, acuité visuelle, réfractométrie, verres correcteurs, montage, contactologie, basse vision et conseil client.',
    sizeKb: 330,
  },
  {
    id: 'appareillage_orthopedie',
    name: 'Appareillage orthopédique & prothèses',
    shortName: 'Orthopédie',
    examIds: ['concours-paramedical', 'certif-pro', 'concours-sciences-infirmieres-labo'],
    classLevels: ['terminale', 'l1', 'l2', 'l3'],
    color: '#B45309',
    icon: 'Bone',
    description:
      '80 chapitres : anatomie appliquée, biomécanique, prise de mesure, plâtre et résines, orthèses, prothèses de membre, adaptation, réglage et suivi du patient.',
    sizeKb: 335,
  },
  {
    id: 'pharmacie_officine',
    name: 'Pharmacie d’officine & galénique',
    shortName: 'Pharmacie',
    examIds: ['concours-pharmacie-odonto', 'concours-medecine', 'certif-pro'],
    classLevels: ['terminale', 'l1', 'l2', 'l3', 'master'],
    color: '#15803D',
    icon: 'Pill',
    description:
      '80 chapitres : formes galéniques, préparation, posologie, interactions, délivrance, conseil au comptoir, stockage, stupéfiants et gestion de l’officine.',
    sizeKb: 345,
  },
  {
    id: 'mode_stylisme',
    name: 'Mode, couture & stylisme',
    shortName: 'Mode & couture',
    examIds: ['certif-metiers-creatifs-digital', 'certif-pro', 'bepc'],
    classLevels: ['3e', '2nde', '1ere', 'terminale', 'l1', 'l2'],
    color: '#DB2777',
    icon: 'Shirt',
    description:
      '80 chapitres : dessin de mode, prise de mesures, patronage, coupe, montage, finitions, tissus et textiles, collections, défilé et gestion d’atelier.',
    sizeKb: 340,
  },
  {
    id: 'arts_culinaires',
    name: 'Arts culinaires & cuisine professionnelle',
    shortName: 'Arts culinaires',
    examIds: ['concours-restauration-hotellerie', 'certif-pro', 'concours-nutrition'],
    classLevels: ['3e', '2nde', '1ere', 'terminale', 'l1', 'l2'],
    color: '#EA580C',
    icon: 'ChefHat',
    description:
      '80 chapitres : hygiène HACCP, techniques de base, cuissons, sauces et fonds, pâtisserie, menus et coûts, brigade, service et gastronomie locale.',
    sizeKb: 350,
  },
  {
    id: 'machinisme_agricole',
    name: 'Machinisme agricole & motoculture',
    shortName: 'Machinisme',
    examIds: ['concours-agronomie', 'certif-pro', 'bac-f-industriel'],
    classLevels: ['3e', '2nde', '1ere', 'terminale', 'l1', 'l2'],
    color: '#4D7C0F',
    icon: 'Tractor',
    description:
      '80 chapitres : moteurs agricoles, transmission, hydraulique, attelages, entretien préventif, sécurité, pulvérisation, irrigation motorisée et gestion du parc.',
    sizeKb: 345,
  },
  {
    id: 'imprimerie_graphique',
    name: 'Industries graphiques & imprimerie',
    shortName: 'Imprimerie',
    examIds: ['certif-metiers-creatifs-digital', 'certif-pro', 'bac-f-industriel'],
    classLevels: ['3e', '2nde', '1ere', 'terminale', 'l1'],
    color: '#475569',
    icon: 'Printer',
    description:
      '80 chapitres : prépresse, mise en page, colorimétrie, offset, numérique, sérigraphie, façonnage, reliure, papier et devis d’impression.',
    sizeKb: 330,
  },
  {
    id: 'bureautique_secretariat',
    name: 'Bureautique, secrétariat & assistance de direction',
    shortName: 'Bureautique',
    examIds: ['concours-admin', 'certif-pro', 'bts-compta-info'],
    classLevels: ['3e', '2nde', '1ere', 'terminale', 'l1', 'l2'],
    color: '#0E7490',
    icon: 'Keyboard',
    description:
      '80 chapitres : traitement de texte, tableur, présentation, courrier administratif, accueil, agenda, classement, réunion, confidentialité et outils collaboratifs.',
    sizeKb: 325,
  },
];
