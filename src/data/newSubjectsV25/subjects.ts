import { Subject } from '../../types';

/**
 * v25.0 — Huit nouvelles matières professionnelles et transversales.
 * Chacune reçoit 80 chapitres dédiés (8 modules × 10 étapes illustrées), puis
 * 10 chapitres de consolidation v25.0, soit 90 chapitres et un jeu de schémas SVG.
 */
export const NEW_SUBJECTS_V25: Subject[] = [
  {
    id: 'bibliotheconomie',
    name: 'Bibliothéconomie & sciences de l’information',
    shortName: 'Bibliothéconomie',
    examIds: ['concours-admin', 'concours-enam-a', 'licence-l1-l2-lmd'],
    classLevels: ['3e', '2nde', '1ere', 'terminale', 'l1', 'l2', 'l3', 'master'],
    color: '#B45309',
    icon: 'Library',
    description:
      '100 chapitres : chaîne du document, classification et indexation, catalogage, recherche d’information, numérisation du patrimoine, médiation culturelle, droit d’auteur et SIGB.',
    sizeKb: 355,
  },
  {
    id: 'demographie',
    name: 'Démographie & études de population',
    shortName: 'Démographie',
    examIds: ['concours-statistique-publique', 'concours-ena-territorial', 'concours-sciencespo-banque-eau'],
    classLevels: ['2nde', '1ere', 'terminale', 'l1', 'l2', 'l3', 'master'],
    color: '#0F766E',
    icon: 'Users',
    description:
      '100 chapitres : sources et qualité des données, structure par âge, fécondité, mortalité, migrations, projections, transition démographique et politiques de population.',
    sizeKb: 360,
  },
  {
    id: 'economie_sante',
    name: 'Économie de la santé & systèmes de soins',
    shortName: 'Économie de la santé',
    examIds: ['concours-paramedical', 'concours-sciences-infirmieres-labo', 'concours-admin'],
    classLevels: ['terminale', 'l1', 'l2', 'l3', 'master'],
    color: '#BE123C',
    icon: 'Activity',
    description:
      '100 chapitres : demande et offre de soins, financement des systèmes, coût-efficacité, économie du médicament, prévention, inégalités sociales et gouvernance sanitaire.',
    sizeKb: 350,
  },
  {
    id: 'esthetique_cosmetologie',
    name: 'Esthétique & cosmétologie',
    shortName: 'Esthétique',
    examIds: ['certif-pro', 'concours-paramedical', 'certif-metiers-creatifs-digital'],
    classLevels: ['3e', '2nde', '1ere', 'terminale', 'l1', 'l2'],
    color: '#DB2777',
    icon: 'Sparkles',
    description:
      '100 chapitres : physiologie de la peau, hygiène et asepsie, soins du visage, cosmétologie et formulation, épilation, onglerie, coloration et réglementation des instituts.',
    sizeKb: 345,
  },
  {
    id: 'securite_privee',
    name: 'Sécurité privée & sûreté des sites',
    shortName: 'Sécurité privée',
    examIds: ['concours-police-officiers', 'concours-police-douanes', 'certif-cybersecurite-ot'],
    classLevels: ['3e', '2nde', '1ere', 'terminale', 'l1', 'l2'],
    color: '#334155',
    icon: 'ShieldCheck',
    description:
      '100 chapitres : cadre légal, analyse des risques, contrôle d’accès, vidéosurveillance, gestion des incidents, sécurité incendie, protection des personnes et prévention de la malveillance.',
    sizeKb: 350,
  },
  {
    id: 'mobilite_urbaine',
    name: 'Mobilité urbaine & transports publics',
    shortName: 'Mobilité urbaine',
    examIds: ['concours-transports-logistique', 'concours-urbanisme-sig', 'concours-genie-civil'],
    classLevels: ['2nde', '1ere', 'terminale', 'l1', 'l2', 'l3', 'master'],
    color: '#1D4ED8',
    icon: 'Bus',
    description:
      '100 chapitres : diagnostic des déplacements, transports collectifs, intermodalité, mobilités actives, gestion du trafic, stationnement, plans de mobilité et évaluation des projets.',
    sizeKb: 365,
  },
  {
    id: 'fle_didactique',
    name: 'Français langue étrangère & didactique',
    shortName: 'FLE & didactique',
    examIds: ['concours-ens-enseignement', 'concours-eni-ens-prof', 'concours-langues-lettres-afrique'],
    classLevels: ['terminale', 'l1', 'l2', 'l3', 'master'],
    color: '#7C3AED',
    icon: 'Languages',
    description:
      '100 chapitres : cadres de référence, quatre compétences langagières, progression, grammaire explicite, phonétique corrective, évaluation et certifications, interculturel et classe hybride.',
    sizeKb: 355,
  },
  {
    id: 'traduction_professionnelle',
    name: 'Traduction & interprétation professionnelles',
    shortName: 'Traduction',
    examIds: ['concours-langues-lettres-afrique', 'concours-diplomatie', 'licence-l1-l2-lmd'],
    classLevels: ['terminale', 'l1', 'l2', 'l3', 'master'],
    color: '#0369A1',
    icon: 'Languages',
    description:
      '100 chapitres : analyse du texte source, terminologie, traduction spécialisée, révision et assurance qualité, localisation, interprétation, outils CAT et déontologie du traducteur.',
    sizeKb: 360,
  },
];
