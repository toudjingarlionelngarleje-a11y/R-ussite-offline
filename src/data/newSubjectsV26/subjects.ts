import { Subject } from '../../types';

/**
 * v26.0 — Huit nouvelles matières professionnelles, techniques et de services.
 * Chacune reçoit 80 chapitres dédiés (8 modules × 10 étapes illustrées), puis
 * 10 chapitres d'approfondissement v26.0, soit 90 chapitres et sa galerie SVG.
 */
export const NEW_SUBJECTS_V26: Subject[] = [
  {
    id: 'droit_notarial',
    name: 'Droit notarial & actes authentiques',
    shortName: 'Droit notarial',
    examIds: ['concours-magistrature', 'concours-admin', 'licence-droit-eco'],
    classLevels: ['terminale', 'l1', 'l2', 'l3', 'master'],
    color: '#7C2D12',
    icon: 'Stamp',
    description:
      '100 chapitres : office notarial, actes authentiques, vente immobilière et publicité foncière, successions, donations, sociétés, sûretés, fiscalité de l’acte et déontologie.',
    sizeKb: 360,
  },
  {
    id: 'kinesitherapie_reeducation',
    name: 'Kinésithérapie & rééducation fonctionnelle',
    shortName: 'Kinésithérapie',
    examIds: ['concours-paramedical', 'concours-sciences-infirmieres-labo', 'concours-internat-medecine'],
    classLevels: ['terminale', 'l1', 'l2', 'l3', 'master'],
    color: '#0D9488',
    icon: 'Activity',
    description:
      '100 chapitres : bilan kinésithérapique, anatomie palpatoire, mobilisations, renforcement, réadaptation post-opératoire, rééducation respiratoire, neuro-rééducation et prévention.',
    sizeKb: 365,
  },
  {
    id: 'immobilier_transaction',
    name: 'Gestion immobilière & transaction',
    shortName: 'Immobilier',
    examIds: ['concours-architecture-urbanisme', 'concours-ena-territorial', 'certif-pro'],
    classLevels: ['terminale', 'l1', 'l2', 'l3', 'master'],
    color: '#92400E',
    icon: 'Building2',
    description:
      '100 chapitres : marché immobilier, estimation, mandat, dossier de vente et diagnostics, financement, gestion locative, copropriété et investissement locatif.',
    sizeKb: 355,
  },
  {
    id: 'blockchain_actifs_numeriques',
    name: 'Blockchain & actifs numériques',
    shortName: 'Blockchain',
    examIds: ['certif-fintech-microfinance', 'certif-droit-numerique', 'certif-cloud-devops'],
    classLevels: ['terminale', 'l1', 'l2', 'l3', 'master'],
    color: '#4338CA',
    icon: 'Blocks',
    description:
      '100 chapitres : registre distribué, cryptographie et clés, smart contracts, tokenisation, DeFi et stablecoins, conformité LBC/FT, conservation et tokenomics.',
    sizeKb: 370,
  },
  {
    id: 'orthophonie_langage',
    name: 'Orthophonie & troubles du langage',
    shortName: 'Orthophonie',
    examIds: ['concours-paramedical', 'concours-sciences-infirmieres-labo', 'licence-l1-l2-lmd'],
    classLevels: ['terminale', 'l1', 'l2', 'l3', 'master'],
    color: '#BE185D',
    icon: 'MessageCircle',
    description:
      '100 chapitres : développement du langage, bilan orthophonique, articulation, langage écrit, bégaiement, voix et déglutition, communication alternative et accompagnement des familles.',
    sizeKb: 360,
  },
  {
    id: 'horticulture_paysage',
    name: 'Horticulture & aménagement paysager',
    shortName: 'Horticulture',
    examIds: ['concours-agronomie', 'concours-eaux-forets-environnement', 'concours-foresterie-agroalimentaire'],
    classLevels: ['3e', '2nde', '1ere', 'terminale', 'l1', 'l2'],
    color: '#15803D',
    icon: 'Sprout',
    description:
      '100 chapitres : sols et substrats, multiplication, irrigation et fertilisation, arbres et arbustes, gazons, plan paysager, protection intégrée et entretien de chantier.',
    sizeKb: 350,
  },
  {
    id: 'menuiserie_ebenisterie',
    name: 'Menuiserie, ébénisterie & agencement',
    shortName: 'Menuiserie',
    examIds: ['bepc', 'bac-f-industriel', 'certif-pro'],
    classLevels: ['3e', '2nde', '1ere', 'terminale', 'l1'],
    color: '#A16207',
    icon: 'Hammer',
    description:
      '100 chapitres : lecture de plans, essences et séchage, assemblages, machines et sécurité, placage et finition, agencement sur mesure, menuiserie du bâtiment et devis.',
    sizeKb: 345,
  },
  {
    id: 'jeu_video_esport',
    name: 'Conception de jeux vidéo & e-sport',
    shortName: 'Jeu vidéo',
    examIds: ['certif-metiers-creatifs-digital', 'certif-cloud-devops', 'certif-data-ia'],
    classLevels: ['3e', '2nde', '1ere', 'terminale', 'l1', 'l2', 'l3'],
    color: '#6D28D9',
    icon: 'Gamepad2',
    description:
      '100 chapitres : game design et boucles, level design, narration et univers, moteur et optimisation, production d’assets, économie et éthique, e-sport et playtest.',
    sizeKb: 365,
  },
];
