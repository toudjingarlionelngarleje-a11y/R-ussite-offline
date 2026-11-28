import { Chapter, Course, ExamTrack, Subject } from '../types';

export const EXTRA_EXAMS: ExamTrack[] = [
  {
    id: 'bepc',
    name: 'BEPC / Brevet des Collèges (Classe de 3e)',
    shortName: 'BEPC / Brevet',
    category: 'Collège',
    description:
      'Préparation complète aux épreuves du BEPC : Français, Mathématiques, Histoire-Géographie, Anglais et SVT avec anciens sujets corrigés.',
    level: 'Troisième (3e)',
    subjectIds: ['francais', 'maths', 'histoire_geo', 'anglais', 'svt'],
    badgeColor: '#0D9488',
  },
  {
    id: 'bac-litteraire',
    name: 'Baccalauréat Littéraire & Sciences Sociales (Séries A & B)',
    shortName: 'Bac A / B',
    category: 'Secondaire',
    description:
      'Maîtrise des épreuves littéraires et économiques du Bac : Français, Philosophie, Histoire-Géographie, Anglais et Économie.',
    level: 'Terminale A & B',
    subjectIds: ['francais', 'philo', 'histoire_geo', 'anglais', 'economie'],
    badgeColor: '#9333EA',
  },
  {
    id: 'concours-medecine',
    name: 'Concours Médecine, Pharmacie & Sciences de la Santé',
    shortName: 'Concours Santé',
    category: 'Grandes Écoles',
    description:
      'Entraînement intensif aux QCM de sélection santé : Biochimie & Chimie Organique, SVT, Physique-Chimie, Maths et Anglais.',
    level: 'Terminale / Bac+1',
    subjectIds: ['chimie_bio', 'svt', 'physique', 'maths', 'anglais'],
    badgeColor: '#E11D48',
  },
  {
    id: 'bts-compta-info',
    name: 'BTS / Licence Comptabilité, Gestion & Informatique',
    shortName: 'BTS Gestion & Info',
    category: 'Université / BTS',
    description:
      'Double compétence technique et financière : Comptabilité SYSCOHADA, Informatique & SQL, Économie, Droit et Anglais pro.',
    level: 'Bac+1 à Bac+3',
    subjectIds: ['comptabilite', 'informatique', 'economie', 'droit', 'anglais'],
    badgeColor: '#2563EB',
  },
];

export const EXTRA_SUBJECTS: Subject[] = [
  {
    id: 'francais',
    name: 'Français & Littérature',
    shortName: 'Français',
    examIds: ['bepc', 'bac-litteraire', 'bac-scientifique'],
    color: '#9333EA',
    icon: 'Feather',
    description:
      'Figures de style, registres littéraires, grammaire, méthodologie du commentaire composé et de la dissertation.',
    sizeKb: 510,
  },
  {
    id: 'histoire_geo',
    name: 'Histoire-Géographie',
    shortName: 'Hist.-Géo',
    examIds: ['bepc', 'bac-litteraire', 'concours-admin'],
    color: '#B45309',
    icon: 'Map',
    description:
      'Décolonisations en Afrique, construction des États, mondialisation, démographie et enjeux du développement durable.',
    sizeKb: 580,
  },
  {
    id: 'anglais',
    name: 'Anglais (Grammaire & Compréhension)',
    shortName: 'Anglais',
    examIds: ['bepc', 'bac-litteraire', 'bac-scientifique', 'concours-medecine', 'bts-compta-info'],
    color: '#0369A1',
    icon: 'Languages',
    description:
      'Temps verbaux, modaux, voix passive, conditionnels, connecteurs logiques et compréhension d’examens.',
    sizeKb: 470,
  },
  {
    id: 'informatique',
    name: 'Informatique, Algorithmique & SQL',
    shortName: 'Informatique',
    examIds: ['bts-compta-info', 'certif-pro'],
    color: '#1E40AF',
    icon: 'Code',
    description:
      'Structures de données, complexité algorithmique, modélisation relationnelle et requêtes SQL d’examen.',
    sizeKb: 640,
  },
  {
    id: 'comptabilite',
    name: 'Comptabilité & Finance (SYSCOHADA)',
    shortName: 'Comptabilité',
    examIds: ['bts-compta-info', 'licence-droit-eco'],
    color: '#047857',
    icon: 'Landmark',
    description:
      'Partie double, bilan et compte de résultat SYSCOHADA, TVA, amortissements linéaires et ratios financiers.',
    sizeKb: 560,
  },
  {
    id: 'chimie_bio',
    name: 'Chimie Organique & Biochimie',
    shortName: 'Biochimie',
    examIds: ['concours-medecine', 'bac-scientifique'],
    color: '#BE123C',
    icon: 'FlaskConical',
    description:
      'Fonctions organiques, estérification/saponification, glucides, acides aminés et cinétique enzymatique.',
    sizeKb: 610,
  },
];

export const EXTRA_CHAPTERS: Chapter[] = [
  // Français
  {
    id: 'ch-fr-figures',
    subjectId: 'francais',
    title: 'Figures de style, registres et analyse littéraire',
    order: 1,
    summary: 'Métaphore, métonymie, antithèse, ironie, registres tragique, lyrique, satirique et procédés d’analyse.',
    estimatedMinutes: 30,
    difficulty: 'facile',
    courseId: 'course-fr-figures',
    ficheId: 'fiche-fr-figures',
  },
  {
    id: 'ch-fr-methode',
    subjectId: 'francais',
    title: 'Méthodologie de la dissertation et du commentaire composé',
    order: 2,
    summary: 'Problématique, plan dialectique/thématique, paragraphe argumentatif et citation intégrée.',
    estimatedMinutes: 35,
    difficulty: 'moyen',
    courseId: 'course-fr-methode',
    ficheId: 'fiche-fr-methode',
  },
  // Histoire-Géographie
  {
    id: 'ch-hg-decolonisation',
    subjectId: 'histoire_geo',
    title: 'Décolonisations en Afrique et indépendances (1945–1975)',
    order: 1,
    summary: 'Facteurs internes et externes, Conférence de Bandung (1955), Loi-cadre Defferre (1956) et indépendances de 1960.',
    estimatedMinutes: 35,
    difficulty: 'moyen',
    courseId: 'course-hg-decolonisation',
    ficheId: 'fiche-hg-decolonisation',
  },
  {
    id: 'ch-hg-mondialisation',
    subjectId: 'histoire_geo',
    title: 'Mondialisation, démographie et développement durable',
    order: 2,
    summary: 'Flux commerciaux, transition démographique, urbanisation en Afrique et Objectifs de Développement Durable.',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-hg-mondialisation',
    ficheId: 'fiche-hg-mondialisation',
  },
  // Anglais
  {
    id: 'ch-en-tenses',
    subjectId: 'anglais',
    title: 'Temps verbaux, modaux et voix passive',
    order: 1,
    summary: 'Present Perfect vs Past Simple, conditionnels (0, 1, 2, 3), modaux et transformation passive.',
    estimatedMinutes: 30,
    difficulty: 'facile',
    courseId: 'course-en-tenses',
    ficheId: 'fiche-en-tenses',
  },
  {
    id: 'ch-en-essay',
    subjectId: 'anglais',
    title: 'Connecteurs logiques, compréhension et essai argumentatif',
    order: 2,
    summary: 'Link words (however, although, despite), lecture rapide de texte et structure d’un essai en anglais.',
    estimatedMinutes: 25,
    difficulty: 'moyen',
    courseId: 'course-en-essay',
    ficheId: 'fiche-en-essay',
  },
  // Informatique
  {
    id: 'ch-info-algo',
    subjectId: 'informatique',
    title: 'Algorithmique, structures de données et complexité',
    order: 1,
    summary: 'Boucles, récursivité, recherche dichotomique O(log n), piles (LIFO) et files (FIFO).',
    estimatedMinutes: 40,
    difficulty: 'moyen',
    courseId: 'course-info-algo',
    ficheId: 'fiche-info-algo',
  },
  {
    id: 'ch-info-sql',
    subjectId: 'informatique',
    title: 'Bases de données relationnelles et requêtes SQL',
    order: 2,
    summary: 'Clé primaire, clé étrangère, normalisation, SELECT, JOIN, GROUP BY et HAVING.',
    estimatedMinutes: 35,
    difficulty: 'moyen',
    courseId: 'course-info-sql',
    ficheId: 'fiche-info-sql',
  },
  // Comptabilité
  {
    id: 'ch-compta-bilan',
    subjectId: 'comptabilite',
    title: 'Bilan, compte de résultat et partie double (SYSCOHADA)',
    order: 1,
    summary: 'Classes 1 à 8 du SYSCOHADA révisé, équilibre Débit = Crédit, Actif = Passif et résultat net.',
    estimatedMinutes: 35,
    difficulty: 'moyen',
    courseId: 'course-compta-bilan',
    ficheId: 'fiche-compta-bilan',
  },
  {
    id: 'ch-compta-amort',
    subjectId: 'comptabilite',
    title: 'TVA, amortissements linéaires et ratios financiers',
    order: 2,
    summary: 'Calcul HT/TTC, TVA à décaisser, annuité d’amortissement, VNC et Fonds de Roulement (FRNG).',
    estimatedMinutes: 40,
    difficulty: 'difficile',
    courseId: 'course-compta-amort',
    ficheId: 'fiche-compta-amort',
  },
  // Chimie Organique & Biochimie
  {
    id: 'ch-bio-orga',
    subjectId: 'chimie_bio',
    title: 'Fonctions organiques, estérification et saponification',
    order: 1,
    summary: 'Groupes caractéristiques (-OH, -COOH, -COO-, -NH2), nomenclature IUPAC et rendement d’estérification.',
    estimatedMinutes: 35,
    difficulty: 'moyen',
    courseId: 'course-bio-orga',
    ficheId: 'fiche-bio-orga',
  },
  {
    id: 'ch-bio-enzymes',
    subjectId: 'chimie_bio',
    title: 'Glucides, acides aminés et catalyse enzymatique',
    order: 2,
    summary: 'Liaison peptidique, structure des protéines, équation de Michaelis-Menten (Km, Vmax) et inhibition.',
    estimatedMinutes: 40,
    difficulty: 'difficile',
    courseId: 'course-bio-enzymes',
    ficheId: 'fiche-bio-enzymes',
  },
];

export const EXTRA_COURSES: Course[] = [
  {
    id: 'course-fr-figures',
    subjectId: 'francais',
    chapterId: 'ch-fr-figures',
    title: 'Figures de style, registres et analyse littéraire',
    durationMinutes: 30,
    sizeKb: 112,
    updatedAt: '2026-10-12',
    sections: [
      {
        id: 'sec-fr-1',
        heading: '1. Les grandes familles de figures de style',
        content:
          'Une figure de style crée un effet de sens ou d’émotion en s’écartant de l’usage ordinaire. On distingue les figures d’analogie (comparaison avec outil comparatif comme « tel », métaphore sans outil, personnification), les figures d’opposition (antithèse, oxymore, antiphrase), les figures d’amplification ou d’atténuation (hyperbole, gradation, euphémisme, litote) et les figures de substitution (métonymie, synecdoque, périphrase).',
        keyTakeaway:
          'Ne te contente jamais de nommer une figure : explique toujours l’effet qu’elle produit dans le texte.',
      },
      {
        id: 'sec-fr-2',
        heading: '2. Identifier le registre (tonalité) d’un passage',
        content:
          'Le registre correspond à l’émotion ou à l’intention dominante du texte : lyrique (expression des sentiments personnels, pronoms « je », exclamations), tragique (fatalité, souffrance inéluctable), épique (exploits amplifiés, hyperboles), satirique ou polémique (critique moqueuse ou virulente, ironie), didactique (volonté d’instruire ou de convaincre).',
        keyTakeaway:
          'Un même extrait peut combiner deux registres (ex. ironique et polémique dans un pamphlet).',
      },
    ],
  },
  {
    id: 'course-fr-methode',
    subjectId: 'francais',
    chapterId: 'ch-fr-methode',
    title: 'Méthodologie de la dissertation et du commentaire composé',
    durationMinutes: 35,
    sizeKb: 118,
    updatedAt: '2026-10-12',
    sections: [
      {
        id: 'sec-fr-m1',
        heading: '1. Construire une introduction irréprochable',
        content:
          'L’introduction comporte quatre étapes obligatoires : l’accroche (contexte littéraire ou historique), la présentation du sujet ou du texte, la formulation de la problématique (une question précise qui guide toute la copie) et l’annonce du plan sans lourdeur.',
        keyTakeaway:
          'Une bonne problématique évite une réponse par simple « oui » ou « non » et met en tension deux idées.',
      },
      {
        id: 'sec-fr-m2',
        heading: '2. Rédiger un paragraphe argumentatif efficace (A-E-I)',
        content:
          'Chaque sous-partie suit la logique Argument → Exemple / Citation précise → Interprétation. En commentaire composé, on cite le texte entre guillemets et on analyse les procédés (temps verbaux, champs lexicaux, figures de style) avant de conclure sur le sens.',
        keyTakeaway:
          'Évite la paraphrase : expliquer un texte, ce n’est pas le redire avec d’autres mots, c’est montrer COMMENT l’auteur construit le sens.',
      },
    ],
  },
  {
    id: 'course-hg-decolonisation',
    subjectId: 'histoire_geo',
    chapterId: 'ch-hg-decolonisation',
    title: 'Décolonisations en Afrique et indépendances (1945–1975)',
    durationMinutes: 35,
    sizeKb: 126,
    updatedAt: '2026-10-14',
    sections: [
      {
        id: 'sec-hg-1',
        heading: '1. Les facteurs favorables à l’émancipation après 1945',
        content:
          'La Seconde Guerre mondiale affaiblit durablement les puissances coloniales européennes et brise le mythe de leur invincibilité. Les soldats africains (tirailleurs) reviennent avec la conscience de leurs droits. Sur le plan international, la Charte de l’ONU (1945) proclame le droit des peuples à disposer d’eux-mêmes, tandis que les États-Unis et l’URSS se montrent hostiles aux empires coloniaux. La Conférence de Bandung (avril 1955) donne une voix unie au Tiers-Monde.',
        keyTakeaway:
          'Retiens la double dynamique : essor des mouvements nationalistes africains + contexte international anticolonial.',
      },
      {
        id: 'sec-hg-2',
        heading: '2. De la Loi-cadre (1956) à l’année des indépendances (1960)',
        content:
          'En Afrique francophone, la Conférence de Brazzaville (1944) ouvre des réformes, puis la Loi-cadre Defferre (1956) instaure le suffrage universel et une autonomie interne. En 1958, la Guinée de Sékou Touré vote « Non » au référendum et devient indépendante immédiatement. En 1960, 17 pays africains — dont le Tchad (11 août 1960), le Sénégal, la Côte d’Ivoire, le Cameroun et le Mali — accèdent à la souveraineté internationale. En Afrique lusophone (Angola, Mozambique), l’indépendance n’intervient qu’en 1975 après des luttes armées.',
        keyTakeaway:
          '1960 est « l’année de l’Afrique » avec 17 indépendances ; l’OUA est ensuite fondée le 25 mai 1963 à Addis-Abeba.',
      },
    ],
  },
  {
    id: 'course-hg-mondialisation',
    subjectId: 'histoire_geo',
    chapterId: 'ch-hg-mondialisation',
    title: 'Mondialisation, démographie et développement durable',
    durationMinutes: 30,
    sizeKb: 118,
    updatedAt: '2026-10-14',
    sections: [
      {
        id: 'sec-hg-m1',
        heading: '1. Acteurs et flux de la mondialisation',
        content:
          'La mondialisation désigne l’intensification des échanges de marchandises, de capitaux, d’informations et d’humains à l’échelle planétaire. Ses principaux acteurs sont les firmes transnationales (FTN), les États, les organisations régionales (ZLECAf, CEMAC, CEDEAO, UE) et les institutions internationales (OMC, FMI, Banque mondiale). Le transport maritime conteneurisé assure plus de 80 % du commerce mondial en volume.',
        keyTakeaway:
          'La ZLECAf (Zone de Libre-Échange Continentale Africaine) vise à stimuler le commerce intra-africain et l’industrialisation locale.',
      },
      {
        id: 'sec-hg-m2',
        heading: '2. Transition démographique et développement durable',
        content:
          'La transition démographique décrit le passage d’un régime de forte natalité et forte mortalité à un régime de faible natalité et faible mortalité. L’Afrique possède la population la plus jeune du monde (dividende démographique potentiel si l’éducation et l’emploi suivent). Le développement durable (Rapport Brundtland, 1987) repose sur 3 piliers : efficacité économique, équité sociale et préservation de l’environnement.',
        keyTakeaway:
          'Un développement est durable s’il répond aux besoins du présent sans compromettre ceux des générations futures.',
      },
    ],
  },
  {
    id: 'course-en-tenses',
    subjectId: 'anglais',
    chapterId: 'ch-en-tenses',
    title: 'Temps verbaux, modaux et voix passive',
    durationMinutes: 30,
    sizeKb: 105,
    updatedAt: '2026-10-15',
    sections: [
      {
        id: 'sec-en-1',
        heading: '1. Past Simple vs Present Perfect',
        content:
          'On utilise le Past Simple (V-ed / 2e colonne) pour une action terminée et datée dans le passé (yesterday, in 2020, last week, ago). On utilise le Present Perfect (have/has + participe passé) pour un bilan présent, une expérience de vie (ever, never, already, yet) ou une action commencée dans le passé qui dure encore (since + point de départ, for + durée).',
        formula: 'Present Perfect = have/has + V3   |   Past Simple = V2 (action datée)',
        keyTakeaway:
          'Présence de « ago », « yesterday » ou « in 2019 » ⇒ Past Simple obligatoire ! « Since / for / already / yet » ⇒ Present Perfect.',
      },
      {
        id: 'sec-en-2',
        heading: '2. Conditionnels et voix passive',
        content:
          'Conditionnel 1 (probable) : If + Present Simple, will + BV. Conditionnel 2 (irréel du présent) : If + Past Simple, would + BV. Conditionnel 3 (regret passé) : If + Past Perfect, would have + V3. À la voix passive, on conjugue BE au temps de la phrase active suivi du participe passé (V3) : « The students wrote the exam » → « The exam was written by the students ».',
        formula: 'Passif : Sujet + BE (conjugué) + Participe passé (V3)',
        keyTakeaway:
          'Ne mets jamais « will » juste après « if » dans une proposition conditionnelle standard !',
      },
    ],
  },
  {
    id: 'course-en-essay',
    subjectId: 'anglais',
    chapterId: 'ch-en-essay',
    title: 'Connecteurs logiques, compréhension et essai argumentatif',
    durationMinutes: 25,
    sizeKb: 98,
    updatedAt: '2026-10-15',
    sections: [
      {
        id: 'sec-en-e1',
        heading: '1. Maîtriser les link words (connecteurs) sans erreur',
        content:
          'Pour exprimer la concession : « Although / Even though » sont suivis d’une proposition (sujet + verbe), tandis que « Despite / In spite of » sont suivis d’un nom ou d’un verbe en -ing. Exemple : « Although it rained, we studied » = « Despite the rain, we studied ». Pour conclure : « To sum up », « In conclusion », « Therefore ».',
        keyTakeaway:
          'Piège classique d’examen : on ne dit JAMAIS « Despite of » ni « Although + nom ».',
      },
      {
        id: 'sec-en-e2',
        heading: '2. Structurer un essai en 4 paragraphes',
        content:
          'Introduction (contexte + thèse), Paragraphe 1 (arguments pour + exemple concret), Paragraphe 2 (nuance ou contre-arguments + exemple), Conclusion (synthèse + ouverture). Utilise des phrases claires, évite les traductions mot-à-mot du français.',
        keyTakeaway:
          'Relis toujours l’accord sujet-verbe à la 3e personne du singulier (-s) et les verbes irréguliers.',
      },
    ],
  },
  {
    id: 'course-info-algo',
    subjectId: 'informatique',
    chapterId: 'ch-info-algo',
    title: 'Algorithmique, structures de données et complexité',
    durationMinutes: 40,
    sizeKb: 132,
    updatedAt: '2026-10-18',
    sections: [
      {
        id: 'sec-info-1',
        heading: '1. Complexité temporelle et notation Grand O',
        content:
          'La complexité mesure le nombre d’opérations élémentaires en fonction de la taille n de l’entrée. Accès à un tableau par indice : O(1). Recherche dichotomique dans un tableau trié : O(log n). Parcours linéaire d’une liste : O(n). Tri fusion (Merge Sort) : O(n log n). Deux boucles imbriquées (tri à bulles ou par sélection) : O(n²).',
        formula: 'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)',
        keyTakeaway:
          'La recherche dichotomique divise l’espace de recherche par 2 à chaque étape, mais exige impérativement un tableau TRIÉ.',
      },
      {
        id: 'sec-info-2',
        heading: '2. Piles (LIFO), Files (FIFO) et récursivité',
        content:
          'Une Pile (Stack) fonctionne en LIFO (Last In, First Out : le dernier empilé sort en premier, ex. bouton Annuler Ctrl+Z ou pile d’appels). Une File (Queue) fonctionne en FIFO (First In, First Out : le premier arrivé est servi en premier, ex. file d’impression). Toute fonction récursive doit posséder un cas de base (condition d’arrêt) pour éviter un débordement de pile (Stack Overflow).',
        keyTakeaway:
          'Pile = LIFO (assiettes empilées) ; File = FIFO (file d’attente au guichet).',
      },
    ],
  },
  {
    id: 'course-info-sql',
    subjectId: 'informatique',
    chapterId: 'ch-info-sql',
    title: 'Bases de données relationnelles et requêtes SQL',
    durationMinutes: 35,
    sizeKb: 128,
    updatedAt: '2026-10-18',
    sections: [
      {
        id: 'sec-sql-1',
        heading: '1. Clés primaires, clés étrangères et intégrité référentielle',
        content:
          'Dans une base relationnelle, chaque table possède une clé primaire (PRIMARY KEY) unique et non nulle identifiant chaque ligne. Une clé étrangère (FOREIGN KEY) référence la clé primaire d’une autre table pour relier les entités et garantir l’intégrité référentielle.',
        diagramId: 'sql_relations',
        keyTakeaway:
          'En relation 1-N, la clé étrangère se place toujours dans la table côté N (ex. id_etudiant dans NOTES).',
      },
      {
        id: 'sec-sql-2',
        heading: '2. Ordre des clauses SQL : WHERE vs HAVING',
        content:
          'L’ordre d’écriture d’une requête SQL est : SELECT ... FROM ... JOIN ... WHERE ... GROUP BY ... HAVING ... ORDER BY ... LIMIT. La clause WHERE filtre les lignes AVANT le regroupement, tandis que HAVING filtre les groupes APRÈS GROUP BY (sur des fonctions d’agrégation comme COUNT, AVG, SUM).',
        formula: 'SELECT col, COUNT(*) FROM table WHERE cond GROUP BY col HAVING COUNT(*) > 5;',
        keyTakeaway:
          'Ne mets jamais COUNT(*) ou AVG() dans WHERE : utilise toujours HAVING avec GROUP BY.',
      },
    ],
  },
  {
    id: 'course-compta-bilan',
    subjectId: 'comptabilite',
    chapterId: 'ch-compta-bilan',
    title: 'Bilan, compte de résultat et partie double (SYSCOHADA)',
    durationMinutes: 35,
    sizeKb: 122,
    updatedAt: '2026-10-19',
    sections: [
      {
        id: 'sec-compta-1',
        heading: '1. Le principe de la partie double et les classes SYSCOHADA',
        content:
          'Toute opération comptable touche au moins deux comptes : un compte débité (emploi) et un compte crédité (ressource), de sorte que Total Débit = Total Crédit. Dans le plan comptable SYSCOHADA révisé : Classes 1 à 5 = Comptes de Bilan (1 : Ressources durables, 2 : Actif immobilisé, 3 : Stocks, 4 : Tiers, 5 : Trésorerie) ; Classe 6 = Charges ; Classe 7 = Produits ; Classe 8 = Autres charges/produits HAO.',
        diagramId: 'bilan_syscohada',
        keyTakeaway:
          'Les comptes d’Actif et de Charges augmentent au DÉBIT ; les comptes de Passif et de Produits augmentent au CRÉDIT.',
      },
      {
        id: 'sec-compta-2',
        heading: '2. Détermination du résultat net de l’exercice',
        content:
          'Le compte de résultat mesure la performance sur une période : Résultat Net = Total Produits (Cl. 7 + 8 pairs) − Total Charges (Cl. 6 + 8 impairs). Si le résultat est positif, c’est un bénéfice (inscrit au Passif du bilan dans les capitaux propres) ; s’il est négatif, c’est une perte.',
        formula: 'Résultat Net = Produits − Charges   |   Actif = Passif',
        keyTakeaway:
          'Le Bilan est une photographie du patrimoine à une date donnée ; le Compte de Résultat est le film de l’activité sur l’année.',
      },
    ],
  },
  {
    id: 'course-compta-amort',
    subjectId: 'comptabilite',
    chapterId: 'ch-compta-amort',
    title: 'TVA, amortissements linéaires et ratios financiers',
    durationMinutes: 40,
    sizeKb: 130,
    updatedAt: '2026-10-19',
    sections: [
      {
        id: 'sec-compta-a1',
        heading: '1. Calcul de la TVA et TVA due à l’État',
        content:
          'La Taxe sur la Valeur Ajoutée (ex. 18 % en zone CEMAC/UEMOA) est supportée par le consommateur final. L’entreprise collecte la TVA sur ses ventes (TVA facturée) et déduit la TVA payée sur ses achats (TVA récupérable). TVA à décaisser = TVA facturée − TVA récupérable. Pour retrouver le HT à partir du TTC : HT = TTC / (1 + taux).',
        formula: 'TTC = HT × (1 + t)   |   TVA due = TVA facturée − TVA récupérable',
        keyTakeaway:
          'Erreur classique : pour passer du TTC au HT avec TVA 18 %, on DIVISE par 1,18 (on ne soustrait pas 18 % du TTC).',
      },
      {
        id: 'sec-compta-a2',
        heading: '2. Amortissement linéaire et Valeur Nette Comptable (VNC)',
        content:
          'L’amortissement constate la dépréciation irréversible d’une immobilisation. En mode linéaire sur N années, le taux est t = 100 / N, l’annuité complète est A = Vo × t, et en cas d’acquisition en cours d’année on applique le prorata temporis (en jours sur base 360). La VNC vaut Vo − cumul des amortissements.',
        formula: 'Annuité linéaire = Vo × (1 / N) × (j / 360)   |   VNC = Vo − Σ Amortissements',
        keyTakeaway:
          'Un terrain ne s’amortit jamais en comptabilité car sa durée d’utilité n’est pas limitée.',
      },
    ],
  },
  {
    id: 'course-bio-orga',
    subjectId: 'chimie_bio',
    chapterId: 'ch-bio-orga',
    title: 'Fonctions organiques, estérification et saponification',
    durationMinutes: 35,
    sizeKb: 124,
    updatedAt: '2026-10-20',
    sections: [
      {
        id: 'sec-bio-1',
        heading: '1. Reconnaître les groupes fonctionnels essentiels',
        content:
          'Alcool : -OH (suffixe -ol). Aldéhyde : -CHO (suffixe -al). Cétone : -CO- (suffixe -one). Acide carboxylique : -COOH (acide ...-oïque). Ester : -COO- (...-oate de ...-yle). Amine : -NH₂. Amide : -CONH₂. La classe d’un alcool (primaire, secondaire, tertiaire) dépend du nombre d’atomes de carbone liés au carbone fonctionnel.',
        keyTakeaway:
          'Un alcool primaire oxydé en défaut donne un aldéhyde, puis en excès un acide carboxylique ; un alcool tertiaire ne subit pas d’oxydation ménagée.',
      },
      {
        id: 'sec-bio-2',
        heading: '2. Estérification directe vs Saponification',
        content:
          'L’estérification (Acide carboxylique + Alcool ⇌ Ester + Eau) est lente, limitée (rendement ≈ 67 % pour un mélange équimolaire avec alcool primaire) et athermique. On accélère la réaction par chauffage et ajout d’un catalyseur (H₂SO₄), et on augmente le rendement en retirant l’eau ou en mettant un réactif en excès. À l’inverse, la saponification (Ester + OH⁻ → Ion carboxylate + Alcool) est une réaction TOTALE et lente.',
        diagramId: 'reaction_chimique',
        formula: 'R-COOH + R’-OH ⇌ R-COO-R’ + H₂O   (rendement ≈ 67 % alcool I)',
        keyTakeaway:
          'Retiens le contraste : Estérification = limitée & réversible ; Saponification = TOTALE (fabrication du savon).',
      },
    ],
  },
  {
    id: 'course-bio-enzymes',
    subjectId: 'chimie_bio',
    chapterId: 'ch-bio-enzymes',
    title: 'Glucides, acides aminés et catalyse enzymatique',
    durationMinutes: 40,
    sizeKb: 132,
    updatedAt: '2026-10-20',
    sections: [
      {
        id: 'sec-bio-e1',
        heading: '1. Acides aminés et liaison peptidique',
        content:
          'Un acide α-aminé possède un carbone α portant une fonction amine (-NH₂), une fonction acide carboxylique (-COOH), un atome H et une chaîne latérale R. Les acides aminés se relient par une liaison peptidique (liaison amide -CO-NH-) avec élimination d’une molécule d’eau (condensation). Le glucose (C₆H₁₂O₆) est un aldohexose, source énergétique majeure des cellules.',
        formula: 'Acide aminé 1 + Acide aminé 2 → Dipeptide + H₂O',
        keyTakeaway:
          'Une protéine perd son activité biologique si sa structure tridimensionnelle (site actif) est dénaturée par une chaleur excessive ou un pH extrême.',
      },
      {
        id: 'sec-bio-e2',
        heading: '2. Cinétique enzymatique de Michaelis-Menten',
        content:
          'Une enzyme est un biocatalyseur protéique qui abaisse l’énergie d’activation sans être consommé. Selon Michaelis-Menten : v = (Vmax · [S]) / (Km + [S]). Km est la concentration en substrat pour laquelle v = Vmax / 2 : plus Km est FAIBLE, plus l’affinité de l’enzyme pour son substrat est FORTE. Un inhibiteur compétitif se fixe sur le site actif : il augmente le Km apparent sans modifier Vmax.',
        formula: 'v = (Vmax × [S]) / (Km + [S])   ⇒   pour [S] = Km, v = Vmax / 2',
        keyTakeaway:
          'Inhibition compétitive : Vmax inchangée, Km apparent augmente (affinité apparente diminue).',
      },
    ],
  },
];
