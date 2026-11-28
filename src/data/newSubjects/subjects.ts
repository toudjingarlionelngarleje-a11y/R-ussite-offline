import { Subject } from '../../types';

/**
 * v24.0 — Dix nouvelles matières transversales, absentes du catalogue historique.
 * Chacune reçoit 80 chapitres dédiés (8 modules × 10 étapes) puis 10 chapitres
 * de la vague v24.0 commune, soit 90 chapitres.
 */
export const NEW_SUBJECTS_V24: Subject[] = [
  {
    id: 'education_financiere',
    name: 'Éducation financière & budget personnel',
    shortName: 'Éducation financière',
    examIds: ['certif-entrepreneuriat', 'concours-finances-banque'],
    classLevels: ['3e', '2nde', '1ere', 'terminale', 'l1', 'l2'],
    color: '#0D9488',
    icon: 'Wallet',
    description:
      '120 chapitres : budget personnel, épargne, crédit et endettement, assurances, fiscalité du quotidien, banque mobile, premiers investissements et prévention des arnaques financières.',
    sizeKb: 340,
  },
  {
    id: 'entrepreneuriat',
    name: 'Entrepreneuriat & création d’entreprise',
    shortName: 'Entrepreneuriat',
    examIds: ['certif-entrepreneuriat', 'certif-supply-rh'],
    classLevels: ['terminale', 'l1', 'l2', 'l3', 'master'],
    color: '#EA580C',
    icon: 'Rocket',
    description:
      '120 chapitres : idée et problème client, étude de marché express, business model, statuts juridiques, financement de démarrage, marketing de lancement, opérations et plan d’affaires.',
    sizeKb: 360,
  },
  {
    id: 'sciences_forensiques',
    name: 'Sciences forensiques & criminalistique',
    shortName: 'Sciences forensiques',
    examIds: ['concours-police-officiers', 'concours-police-douanes', 'concours-magistrature'],
    classLevels: ['terminale', 'l1', 'l2', 'l3', 'master'],
    color: '#475569',
    icon: 'Fingerprint',
    description:
      '120 chapitres : scène de crime, empreintes, ADN, toxicologie, balistique, entomologie, documents falsifiés, traces numériques et rapport d’expertise.',
    sizeKb: 350,
  },
  {
    id: 'mediation_conflits',
    name: 'Médiation & résolution des conflits',
    shortName: 'Médiation',
    examIds: ['concours-diplomatie', 'concours-ena-territorial', 'certif-supply-rh'],
    classLevels: ['l1', 'l2', 'l3', 'master'],
    color: '#7E22CE',
    icon: 'Handshake',
    description:
      '120 chapitres : analyse des conflits, négociation raisonnée, médiation, arbitrage, dialogue social, médiations scolaire et communautaire, accords et éthique du médiateur.',
    sizeKb: 330,
  },
  {
    id: 'langues_nationales',
    name: 'Langues nationales & patrimoine oral',
    shortName: 'Langues nationales',
    examIds: ['concours-langues-lettres-afrique', 'concours-eni-ens-prof'],
    classLevels: ['6e', '5e', '4e', '3e', '2nde', '1ere', 'terminale', 'l1', 'l2'],
    color: '#B45309',
    icon: 'Languages',
    description:
      '120 chapitres : transcription et orthographes, contes et épopées, proverbes, chants, terminologie scolaire, traduction, enseignement bilingue et patrimoine immatériel.',
    sizeKb: 355,
  },
  {
    id: 'inclusion_handicap',
    name: 'Éducation inclusive & langue des signes',
    shortName: 'Inclusion & LSF',
    examIds: ['concours-paramedical', 'concours-eni-ens-prof', 'concours-sciences-infirmieres-labo'],
    classLevels: ['3e', '2nde', '1ere', 'terminale', 'l1', 'l2', 'l3'],
    color: '#0891B2',
    icon: 'Accessibility',
    description:
      '120 chapitres : cadre légal, types de handicap, langue des signes, braille, accessibilité, différenciation pédagogique, technologies d’assistance et projet de vie.',
    sizeKb: 345,
  },
  {
    id: 'ia_societe',
    name: 'Intelligence artificielle, éthique & société',
    shortName: 'IA & société',
    examIds: ['certif-data-ia', 'concours-ingenieur-logiciel-cloud', 'certif-cloud-devops'],
    classLevels: ['2nde', '1ere', 'terminale', 'l1', 'l2', 'l3', 'master'],
    color: '#4F46E5',
    icon: 'BrainCircuit',
    description:
      '120 chapitres : histoire de l’IA, données et biais, apprentissage automatique, IA générative, vie privée, usages éducatifs, travail, régulation et évaluation critique.',
    sizeKb: 365,
  },
  {
    id: 'climat_adaptation',
    name: 'Climat & adaptation des territoires',
    shortName: 'Climat & adaptation',
    examIds: ['concours-eaux-forets-environnement', 'concours-agronomie', 'concours-urbanisme-sig'],
    classLevels: ['3e', '2nde', '1ere', 'terminale', 'l1', 'l2', 'l3', 'master'],
    color: '#059669',
    icon: 'CloudSun',
    description:
      '120 chapitres : climat et variabilité, scénarios, aléas et vulnérabilité, adaptation agricole, eau, villes, santé, financement climat et plans locaux de résilience.',
    sizeKb: 370,
  },
  {
    id: 'economie_circulaire',
    name: 'Économie circulaire & gestion des ressources',
    shortName: 'Économie circulaire',
    examIds: ['concours-eaux-forets-environnement', 'certif-entrepreneuriat', 'certif-supply-rh'],
    classLevels: ['2nde', '1ere', 'terminale', 'l1', 'l2', 'l3', 'master'],
    color: '#65A30D',
    icon: 'Recycle',
    description:
      '120 chapitres : limites planétaires, analyse de cycle de vie, écoconception, réemploi, recyclage, déchets, chaînes d’approvisionnement et modèles d’affaires circulaires.',
    sizeKb: 350,
  },
  {
    id: 'gerontologie',
    name: 'Gérontologie & accompagnement du grand âge',
    shortName: 'Gérontologie',
    examIds: ['concours-paramedical', 'concours-sante-maternelle', 'concours-sciences-infirmieres-labo'],
    classLevels: ['terminale', 'l1', 'l2', 'l3', 'master'],
    color: '#9D174D',
    icon: 'HeartHandshake',
    description:
      '120 chapitres : vieillissement, perte d’autonomie, maladies neurodégénératives, nutrition, mobilité, soins à domicile, aidants, protection juridique et fin de vie.',
    sizeKb: 340,
  },
];
