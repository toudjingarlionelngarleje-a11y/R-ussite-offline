import { Annale, Chapter, Course, ExamTrack, Fiche, Flashcard, Question, Subject } from '../types';

export const MEGA_EXAMS: ExamTrack[] = [
  {
    id: 'concours-police-douanes',
    name: 'Concours Douanes, Impôts, Police & Gendarmerie',
    shortName: 'Douanes & Police',
    category: 'Concours',
    description:
      'Tests psychotechniques, logique numérique, éducation civique, droit public et culture générale pour les concours directs et professionnels.',
    level: 'Bac à Licence',
    subjectIds: ['psychotechnique', 'educ_civique', 'droit', 'culture_gen', 'francais'],
    badgeColor: '#0F766E',
  },
  {
    id: 'concours-ingenieur',
    name: 'Concours Écoles d’Ingénieurs & Classes Préparatoires',
    shortName: 'Écoles Ingénieurs',
    category: 'Grandes Écoles',
    description:
      'Mathématiques avancées, statistiques & probabilités, physique-chimie, informatique algorithmique et anglais scientifique.',
    level: 'Terminale C/S à Bac+2',
    subjectIds: ['maths', 'statistiques', 'physique', 'informatique', 'anglais'],
    badgeColor: '#1E3A8A',
  },
  {
    id: 'concours-ens-enseignement',
    name: 'Concours ENS / CAFOP — Professeurs & Instituteurs',
    shortName: 'Concours ENS / CAFOP',
    category: 'Enseignement',
    description:
      'Pédagogie active (APC), didactique, évaluation des apprentissages, français, histoire-géographie et mathématiques.',
    level: 'Bac à Master',
    subjectIds: ['pedagogie', 'francais', 'maths', 'histoire_geo', 'educ_civique'],
    badgeColor: '#C2410C',
  },
  {
    id: 'certif-entrepreneuriat',
    name: 'Certification Entrepreneuriat, Marketing Digital & Gestion',
    shortName: 'Entrepreneuriat & Digital',
    category: 'Certification Pro',
    description:
      'Business Model Canvas, marketing digital (4P, SEO, conversion), gestion de projet Agile, comptabilité et cybersécurité.',
    level: 'Professionnel / Reconversion',
    subjectIds: ['marketing_entrep', 'gestion_projet', 'comptabilite', 'informatique', 'cybersecurite'],
    badgeColor: '#B45309',
  },
];

export const MEGA_SUBJECTS: Subject[] = [
  {
    id: 'psychotechnique',
    name: 'Logique & Tests Psychotechniques',
    shortName: 'Logique / Tests',
    examIds: ['concours-police-douanes', 'concours-admin', 'concours-ingenieur'],
    color: '#0F766E',
    icon: 'Brain',
    description:
      'Suites logiques, dominos, syllogismes, pourcentages rapides, vitesses moyennes et raisonnement verbal.',
    sizeKb: 490,
  },
  {
    id: 'statistiques',
    name: 'Statistiques & Probabilités',
    shortName: 'Stats & Probas',
    examIds: ['concours-ingenieur', 'bac-scientifique', 'concours-medecine', 'bts-compta-info'],
    color: '#1D4ED8',
    icon: 'BarChart3',
    description:
      'Moyenne, médiane, variance, écart-type, probabilités conditionnelles, formule de Bayes et loi binomiale.',
    sizeKb: 550,
  },
  {
    id: 'pedagogie',
    name: 'Pédagogie & Didactique (APC)',
    shortName: 'Pédagogie',
    examIds: ['concours-ens-enseignement'],
    color: '#C2410C',
    icon: 'GraduationCap',
    description:
      'Approche par compétences, taxonomie de Bloom, différenciation pédagogique et évaluation formative/sommative.',
    sizeKb: 460,
  },
  {
    id: 'marketing_entrep',
    name: 'Entrepreneuriat & Marketing Digital',
    shortName: 'Marketing / Entrep.',
    examIds: ['certif-entrepreneuriat', 'bts-compta-info', 'certif-pro'],
    color: '#D97706',
    icon: 'Megaphone',
    description:
      'Business Model Canvas, seuil de rentabilité, marketing mix 4P, SEO, KPI digitaux et stratégie client.',
    sizeKb: 520,
  },
  {
    id: 'educ_civique',
    name: 'Éducation Civique & Droits Humains',
    shortName: 'Éduc. Civique',
    examIds: ['bepc', 'concours-police-douanes', 'concours-admin', 'concours-ens-enseignement'],
    color: '#047857',
    icon: 'Scale',
    description:
      'État de droit, citoyenneté, décentralisation, DUDH 1948, Charte africaine des droits de l’homme et éthique publique.',
    sizeKb: 430,
  },
  {
    id: 'espagnol',
    name: 'Espagnol LV2 (Grammaire & Expression)',
    shortName: 'Espagnol',
    examIds: ['bepc', 'bac-litteraire', 'bac-scientifique'],
    color: '#DC2626',
    icon: 'Globe',
    description:
      'Ser vs Estar, Por vs Para, temps du passé, subjonctif présent, connecteurs logiques et compréhension.',
    sizeKb: 440,
  },
];

export const MEGA_CHAPTERS: Chapter[] = [
  // Psychotechnique
  {
    id: 'ch-psy-suites',
    subjectId: 'psychotechnique',
    title: 'Suites numériques, matrices et syllogismes',
    order: 1,
    summary: 'Identifier les raisons arithmétiques, géométriques, alternées et valider un raisonnement déductif.',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-psy-suites',
    ficheId: 'fiche-psy-suites',
  },
  {
    id: 'ch-psy-calcul',
    subjectId: 'psychotechnique',
    title: 'Calcul rapide : pourcentages, proportions et vitesses',
    order: 2,
    summary: 'Variations successives, règle de trois inversée, vitesse moyenne et conversion d’unités sans calculatrice.',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-psy-calcul',
    ficheId: 'fiche-psy-calcul',
  },
  // Statistiques & Probabilités
  {
    id: 'ch-stat-desc',
    subjectId: 'statistiques',
    title: 'Statistique descriptive : moyenne, médiane et dispersion',
    order: 1,
    summary: 'Indicateurs de position (moyenne, médiane, quartiles) et de dispersion (étendue, variance, écart-type).',
    estimatedMinutes: 35,
    difficulty: 'facile',
    courseId: 'course-stat-desc',
    ficheId: 'fiche-stat-desc',
  },
  {
    id: 'ch-stat-probas',
    subjectId: 'statistiques',
    title: 'Probabilités conditionnelles, Bayes et loi binomiale',
    order: 2,
    summary: 'P(A∩B), indépendance, formule des probabilités totales, théorème de Bayes et espérance B(n, p).',
    estimatedMinutes: 40,
    difficulty: 'difficile',
    courseId: 'course-stat-probas',
    ficheId: 'fiche-stat-probas',
  },
  // Pédagogie
  {
    id: 'ch-ped-apc',
    subjectId: 'pedagogie',
    title: 'Approche par compétences (APC) et taxonomie de Bloom',
    order: 1,
    summary: 'Formuler un objectif opérationnel, situations-problèmes et niveaux cognitifs de Bloom.',
    estimatedMinutes: 30,
    difficulty: 'facile',
    courseId: 'course-ped-apc',
    ficheId: 'fiche-ped-apc',
  },
  {
    id: 'ch-ped-eval',
    subjectId: 'pedagogie',
    title: 'Évaluation diagnostique, formative et sommative',
    order: 2,
    summary: 'Fonctions de l’évaluation, remédiation différenciée et construction d’une grille critériée.',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-ped-eval',
    ficheId: 'fiche-ped-eval',
  },
  // Marketing & Entrepreneuriat
  {
    id: 'ch-mkt-bmc',
    subjectId: 'marketing_entrep',
    title: 'Business Model Canvas et seuil de rentabilité',
    order: 1,
    summary: 'Les 9 blocs du BMC, proposition de valeur, charges fixes/variables et calcul du point mort.',
    estimatedMinutes: 35,
    difficulty: 'moyen',
    courseId: 'course-mkt-bmc',
    ficheId: 'fiche-mkt-bmc',
  },
  {
    id: 'ch-mkt-digital',
    subjectId: 'marketing_entrep',
    title: 'Marketing Mix (4P) et acquisition digitale (SEO / KPI)',
    order: 2,
    summary: 'Produit, Prix, Distribution, Promotion, tunnel AARRR, CAC, LTV et référencement naturel.',
    estimatedMinutes: 30,
    difficulty: 'facile',
    courseId: 'course-mkt-digital',
    ficheId: 'fiche-mkt-digital',
  },
  // Éducation Civique
  {
    id: 'ch-civ-etat',
    subjectId: 'educ_civique',
    title: 'État de droit, citoyenneté et décentralisation',
    order: 1,
    summary: 'Droits et devoirs du citoyen, suffrage universel, collectivités territoriales et intérêt général.',
    estimatedMinutes: 25,
    difficulty: 'facile',
    courseId: 'course-civ-etat',
    ficheId: 'fiche-civ-etat',
  },
  {
    id: 'ch-civ-droits',
    subjectId: 'educ_civique',
    title: 'Droits humains (DUDH 1948) et éthique publique',
    order: 2,
    summary: 'Déclaration universelle de 1948, Charte africaine (1981), égalité et intégrité dans le service public.',
    estimatedMinutes: 25,
    difficulty: 'facile',
    courseId: 'course-civ-droits',
    ficheId: 'fiche-civ-droits',
  },
  // Espagnol
  {
    id: 'ch-esp-base',
    subjectId: 'espagnol',
    title: 'Ser vs Estar et Por vs Para sans erreur',
    order: 1,
    summary: 'Règles claires pour distinguer essence/état (ser/estar) et cause/but (por/para) en examen.',
    estimatedMinutes: 25,
    difficulty: 'facile',
    courseId: 'course-esp-base',
    ficheId: 'fiche-esp-base',
  },
  {
    id: 'ch-esp-subj',
    subjectId: 'espagnol',
    title: 'Subjonctif présent et connecteurs d’argumentation',
    order: 2,
    summary: 'Formation croisée du subjonctif, emplois obligatoires (ojalá, para que, cuando + futur) et expression de l’opinion.',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-esp-subj',
    ficheId: 'fiche-esp-subj',
  },
];

export const MEGA_COURSES: Course[] = [
  {
    id: 'course-psy-suites',
    subjectId: 'psychotechnique',
    chapterId: 'ch-psy-suites',
    title: 'Suites numériques, matrices et syllogismes',
    durationMinutes: 30,
    sizeKb: 108,
    updatedAt: '2026-11-10',
    sections: [
      {
        id: 'sec-psy-1',
        heading: '1. Décrypter une suite numérique en 20 secondes',
        content:
          'Calcule toujours d’abord les écarts entre termes consécutifs (différences). Si les écarts sont constants : suite arithmétique. Si les rapports sont constants : suite géométrique. Si les écarts grandissent régulièrement (+2, +4, +6, +8) : suite à écarts progressifs. Pense aussi aux suites imbriquées (un terme sur deux) et à Fibonacci (chaque terme = somme des deux précédents).',
        formula: 'Écarts constants ⇒ +r | Rapports constants ⇒ ×q | Fibonacci ⇒ uₙ = uₙ₋₁ + uₙ₋₂',
        keyTakeaway:
          'En test chronométré, teste toujours dans l’ordre : 1) écarts, 2) multiplications, 3) 1 terme sur 2.',
      },
      {
        id: 'sec-psy-2',
        heading: '2. Syllogismes et pièges de logique formelle',
        content:
          'Un syllogisme relie deux prémisses pour obtenir une conclusion nécessaire. Attention aux inversions abusives : de « Tous les A sont B », on ne peut PAS déduire « Tous les B sont A », mais uniquement « Certains B sont A » et la contraposée « Aucun non-B n’est A ».',
        keyTakeaway:
          'Dessine mentalement deux cercles concentriques (A dans B) pour ne jamais tomber dans le piège de la réciproque.',
      },
    ],
  },
  {
    id: 'course-psy-calcul',
    subjectId: 'psychotechnique',
    chapterId: 'ch-psy-calcul',
    title: 'Calcul rapide : pourcentages, proportions et vitesses',
    durationMinutes: 30,
    sizeKb: 104,
    updatedAt: '2026-11-10',
    sections: [
      {
        id: 'sec-psy-c1',
        heading: '1. Variations successives en pourcentage',
        content:
          'Les pourcentages successifs NE S’ADDITIONNENT JAMAIS : on multiplie les coefficients multiplicateurs. Une hausse de +20 % (×1,20) suivie d’une baisse de −20 % (×0,80) donne 1,20 × 0,80 = 0,96, soit une baisse globale de −4 % (et non 0 % !).',
        formula: 'CM global = CM₁ × CM₂   |   +t % ⇒ ×(1 + t/100)   |   −t % ⇒ ×(1 − t/100)',
        keyTakeaway:
          '+20 % puis −20 % = −4 % ! Utilise toujours les coefficients multiplicateurs.',
      },
      {
        id: 'sec-psy-c2',
        heading: '2. Vitesse moyenne et proportionnalité inverse',
        content:
          'La vitesse moyenne vaut toujours Distance totale / Temps total (et jamais la moyenne arithmétique de deux vitesses sur un aller-retour !). Pour des ouvriers réalisant une même tâche, le temps est inversement proportionnel au nombre d’ouvriers : 2 fois plus d’ouvriers = 2 fois moins de temps.',
        formula: 'v_moy = d_totale / t_total   |   Aller-retour à v₁ et v₂ : v_moy = 2v₁v₂ / (v₁ + v₂)',
        keyTakeaway:
          'Si un trajet aller se fait à 60 km/h et le retour à 40 km/h, la moyenne est 48 km/h (pas 50 km/h).',
      },
    ],
  },
  {
    id: 'course-stat-desc',
    subjectId: 'statistiques',
    chapterId: 'ch-stat-desc',
    title: 'Statistique descriptive : moyenne, médiane et dispersion',
    durationMinutes: 35,
    sizeKb: 116,
    updatedAt: '2026-11-12',
    sections: [
      {
        id: 'sec-st-1',
        heading: '1. Moyenne vs Médiane : quel indicateur choisir ?',
        content:
          'La moyenne arithmétique est sensible aux valeurs extrêmes (aberrantes). La médiane partage la série ORDONNÉE en deux groupes de même effectif (50 % en dessous, 50 % au-dessus) : elle est robuste aux valeurs extrêmes, ce qui la rend idéale pour les salaires ou les notes très dispersées.',
        formula: 'x̄ = (Σ nᵢxᵢ) / N   |   Écart interquartile = Q₃ − Q₁',
        keyTakeaway:
          'Ordonne TOUJOURS la série par ordre croissant avant de chercher la médiane ou les quartiles.',
      },
      {
        id: 'sec-st-2',
        heading: '2. Variance et écart-type',
        content:
          'La variance V mesure la moyenne des carrés des écarts à la moyenne (toujours positive ou nulle). L’écart-type σ = √V s’exprime dans la même unité que les données et quantifie la dispersion autour de la moyenne.',
        formula: 'V = (1/N) Σ (xᵢ − x̄)² = (1/N) Σ xᵢ² − x̄²   |   σ = √V',
        keyTakeaway:
          'Plus l’écart-type σ est petit, plus les résultats d’une classe sont homogènes autour de la moyenne.',
      },
    ],
  },
  {
    id: 'course-stat-probas',
    subjectId: 'statistiques',
    chapterId: 'ch-stat-probas',
    title: 'Probabilités conditionnelles, Bayes et loi binomiale',
    durationMinutes: 40,
    sizeKb: 126,
    updatedAt: '2026-11-12',
    sections: [
      {
        id: 'sec-sp-1',
        heading: '1. Probabilité conditionnelle et indépendance',
        content:
          'La probabilité de B sachant A réalisé vaut P_A(B) = P(A ∩ B) / P(A) (avec P(A) > 0). Deux événements A et B sont indépendants si et seulement si P(A ∩ B) = P(A) × P(B). Attention : ne confonds pas événements indépendants et événements incompatibles (disjoints : A ∩ B = ∅).',
        formula: 'P_A(B) = P(A ∩ B) / P(A)   |   Indépendance ⇔ P(A ∩ B) = P(A)·P(B)',
        keyTakeaway:
          'La formule de Bayes permet d’inverser le conditionnement : P_B(A) = [P(A)·P_A(B)] / P(B).',
      },
      {
        id: 'sec-sp-2',
        heading: '2. Loi binomiale B(n, p)',
        content:
          'On obtient une loi binomiale B(n, p) en répétant n fois de façon identique et indépendante une épreuve de Bernoulli de probabilité de succès p. L’espérance (nombre moyen de succès) vaut E(X) = n·p et la variance vaut V(X) = n·p·(1 − p).',
        formula: 'P(X = k) = C(n, k) pᵏ (1 − p)ⁿ⁻ᵏ   |   E(X) = np   |   V(X) = np(1 − p)',
        keyTakeaway:
          'Vérifie toujours les 3 conditions : 2 issues (succès/échec), répétitions identiques et indépendantes.',
      },
    ],
  },
  {
    id: 'course-ped-apc',
    subjectId: 'pedagogie',
    chapterId: 'ch-ped-apc',
    title: 'Approche par compétences (APC) et taxonomie de Bloom',
    durationMinutes: 30,
    sizeKb: 108,
    updatedAt: '2026-11-14',
    sections: [
      {
        id: 'sec-ped-1',
        heading: '1. Principes clés de l’Approche par Compétences (APC)',
        content:
          'L’APC place l’apprenant au centre de ses apprentissages : il ne s’agit plus seulement de mémoriser des savoirs isolés, mais de mobiliser un ensemble intégré de savoirs, savoir-faire et savoir-être pour résoudre une situation-problème complexe issue de la vie courante.',
        keyTakeaway:
          'Dans l’APC, l’enseignant devient médiateur/guide et l’erreur est considérée comme un levier d’apprentissage.',
      },
      {
        id: 'sec-ped-2',
        heading: '2. Les 6 niveaux de la taxonomie de Bloom révisée',
        content:
          'Du plus simple au plus complexe : 1. Mémoriser (citer, définir) · 2. Comprendre (expliquer, résumer) · 3. Appliquer (calculer, résoudre) · 4. Analyser (comparer, distinguer) · 5. Évaluer (critiquer, justifier) · 6. Créer (concevoir, produire). Un bon objectif pédagogique utilise toujours un verbe d’action observable.',
        formula: 'Mémoriser → Comprendre → Appliquer → Analyser → Évaluer → Créer',
        keyTakeaway:
          'Évite les verbes vagues comme « connaître » ou « savoir » dans un objectif : préfère « calculer », « expliquer » ou « comparer ».',
      },
    ],
  },
  {
    id: 'course-ped-eval',
    subjectId: 'pedagogie',
    chapterId: 'ch-ped-eval',
    title: 'Évaluation diagnostique, formative et sommative',
    durationMinutes: 30,
    sizeKb: 104,
    updatedAt: '2026-11-14',
    sections: [
      {
        id: 'sec-pe-1',
        heading: '1. Les trois moments de l’évaluation pédagogique',
        content:
          'L’évaluation diagnostique intervient AVANT la séquence pour identifier les prérequis et les lacunes. L’évaluation formative a lieu PENDANT l’apprentissage (sans sanction de note définitive) pour réguler et remédier immédiatement. L’évaluation sommative (ou certificative) intervient EN FIN de période pour dresser un bilan et attribuer une note ou un diplôme.',
        keyTakeaway:
          'Diagnostique = avant (situer) · Formative = pendant (aider à progresser) · Sommative = après (certifier).',
      },
    ],
  },
  {
    id: 'course-mkt-bmc',
    subjectId: 'marketing_entrep',
    chapterId: 'ch-mkt-bmc',
    title: 'Business Model Canvas et seuil de rentabilité',
    durationMinutes: 35,
    sizeKb: 118,
    updatedAt: '2026-11-15',
    sections: [
      {
        id: 'sec-mk-1',
        heading: '1. Les 9 blocs du Business Model Canvas (Osterwalder)',
        content:
          'Le Business Model Canvas résume sur une seule page comment une entreprise crée, délivre et capture de la valeur : Segments clients, Proposition de valeur (au centre), Canaux, Relations clients, Sources de revenus, Ressources clés, Activités clés, Partenaires clés et Structure de coûts.',
        keyTakeaway:
          'Commence toujours par la paire Segments clients ↔ Proposition de valeur (quel problème réel résous-tu ?).',
      },
      {
        id: 'sec-mk-2',
        heading: '2. Seuil de rentabilité (Point mort)',
        content:
          'Le seuil de rentabilité (SR) est le chiffre d’affaires minimum à réaliser pour couvrir l’ensemble des charges (résultat = 0). On calcule d’abord la Marge sur Coût Variable (MCV = CA − CV) et le taux de MCV (t_MCV = MCV / CA). Alors SR = Charges Fixes / t_MCV.',
        formula: 'SR = Charges Fixes / Taux de MCV   |   SR en quantités = CF / (Prix unitaire − CV unitaire)',
        keyTakeaway:
          'Au-delà du seuil de rentabilité, chaque vente supplémentaire génère un bénéfice net égal à sa marge unitaire.',
      },
    ],
  },
  {
    id: 'course-mkt-digital',
    subjectId: 'marketing_entrep',
    chapterId: 'ch-mkt-digital',
    title: 'Marketing Mix (4P) et acquisition digitale (SEO / KPI)',
    durationMinutes: 30,
    sizeKb: 112,
    updatedAt: '2026-11-15',
    sections: [
      {
        id: 'sec-md-1',
        heading: '1. Le Mix Marketing (4P) et ses indicateurs digitaux',
        content:
          'Les 4P de McCarthy structurent toute stratégie commerciale : Product (Produit), Price (Prix), Place (Distribution) et Promotion (Communication). En marketing digital, on distingue le SEO (référencement naturel gratuit et durable sur les moteurs de recherche) du SEA (publicité payante au clic). Les KPI essentiels sont le Taux de conversion, le CAC (Coût d’Acquisition Client) et la LTV (Valeur Vie Client).',
        formula: 'Modèle sain : LTV > 3 × CAC   |   Taux de conversion = (Conversions / Visiteurs) × 100',
        keyTakeaway:
          'SEO = trafic organique durable ; SEA = trafic payant immédiat. Une entreprise rentable garde toujours une LTV nettement supérieure au CAC.',
      },
    ],
  },
  {
    id: 'course-civ-etat',
    subjectId: 'educ_civique',
    chapterId: 'ch-civ-etat',
    title: 'État de droit, citoyenneté et décentralisation',
    durationMinutes: 25,
    sizeKb: 96,
    updatedAt: '2026-11-16',
    sections: [
      {
        id: 'sec-civ-1',
        heading: '1. État de droit et citoyenneté active',
        content:
          'Dans un État de droit, la puissance publique elle-même est soumise à la loi, les normes respectent une hiérarchie au sommet de laquelle figure la Constitution, et une justice indépendante protège les libertés. Le citoyen bénéficie de droits civils, politiques (vote, éligibilité) et sociaux, et assume des devoirs civiques (respect des lois, contribution fiscale, protection du bien commun).',
        keyTakeaway:
          'La décentralisation transfère des compétences et des ressources de l’État central vers des collectivités locales élues (communes, régions) pour rapprocher la décision des citoyens.',
      },
    ],
  },
  {
    id: 'course-civ-droits',
    subjectId: 'educ_civique',
    chapterId: 'ch-civ-droits',
    title: 'Droits humains (DUDH 1948) et éthique publique',
    durationMinutes: 25,
    sizeKb: 98,
    updatedAt: '2026-11-16',
    sections: [
      {
        id: 'sec-civ-2',
        heading: '1. Textes fondateurs et intégrité du service public',
        content:
          'Adoptée par l’Assemblée générale de l’ONU le 10 décembre 1948 à Paris, la Déclaration Universelle des Droits de l’Homme (DUDH) proclame dans son article 1er que tous les êtres humains naissent libres et égaux en dignité et en droits. Sur le continent africain, la Charte africaine des droits de l’homme et des peuples a été adoptée en 1981 à Nairobi. Tout agent public doit respecter neutralité, probité et refus de la corruption.',
        keyTakeaway:
          'Dates repères incontournables : 10 décembre 1948 (DUDH) et juin 1981 (Charte africaine des droits de l’homme et des peuples).',
      },
    ],
  },
  {
    id: 'course-esp-base',
    subjectId: 'espagnol',
    chapterId: 'ch-esp-base',
    title: 'Ser vs Estar et Por vs Para sans erreur',
    durationMinutes: 25,
    sizeKb: 94,
    updatedAt: '2026-11-16',
    sections: [
      {
        id: 'sec-esp-1',
        heading: '1. Choisir entre SER et ESTAR',
        content:
          'SER exprime une caractéristique essentielle, l’identité, la nationalité, la profession, l’heure ou la matière (« Soy estudiante », « Son las tres »). ESTAR exprime la localisation géographique (même permanente ! « París está en Francia »), un état temporaire, une émotion ou l’action en cours (estar + gérondif).',
        formula: 'SER = Identité, heure, origine  |  ESTAR = Lieu (toujours!), état passager, gérondif',
        keyTakeaway:
          'Piège n°1 au Bac : pour situer un lieu géographique, on utilise TOUJOURS ESTAR (« El museo está en el centro »).',
      },
      {
        id: 'sec-esp-2',
        heading: '2. Choisir entre POR et PARA',
        content:
          'POR exprime la cause (« gracias por tu ayuda »), le lieu de passage, le moyen ou le prix. PARA exprime le but (« estudio para aprobar »), le destinataire (« un regalo para ti ») et une date limite (« para mañana »).',
        keyTakeaway:
          'Cause / moyen / échange ⇒ POR ; But / destinataire / échéance ⇒ PARA.',
      },
    ],
  },
  {
    id: 'course-esp-subj',
    subjectId: 'espagnol',
    chapterId: 'ch-esp-subj',
    title: 'Subjonctif présent et connecteurs d’argumentation',
    durationMinutes: 30,
    sizeKb: 100,
    updatedAt: '2026-11-16',
    sections: [
      {
        id: 'sec-esp-2',
        heading: '1. Formation croisée et emplois obligatoires du subjonctif',
        content:
          'Au subjonctif présent, les verbes en -AR prennent les terminaisons en -E (hablar → hable) et les verbes en -ER / -IR prennent les terminaisons en -A (comer → coma, vivir → viva). Le subjonctif est obligatoire après le souhait (« ojalá », « quiero que »), le but (« para que ») et surtout après « cuando » lorsqu’on évoque une action FUTURE (« Cuando termines el examen, descansarás »).',
        formula: '-AR → -e, -es, -e, -emos, -éis, -en  |  -ER/-IR → -a, -as, -a, -amos, -áis, -an',
        keyTakeaway:
          'Règle en or d’examen : « Cuando » + futur en français = « Cuando » + SUBJONCTIF PRÉSENT en espagnol !',
      },
    ],
  },
];

export const MEGA_QUESTIONS: Question[] = [
  // ==================== LOGIQUE & TESTS PSYCHOTECHNIQUES ====================
  {
    id: 'q-psy-1',
    subjectId: 'psychotechnique',
    chapterId: 'ch-psy-suites',
    examIds: ['concours-police-douanes', 'concours-admin', 'concours-ingenieur'],
    prompt: 'Quel nombre complète logiquement la suite suivante : 3 — 6 — 11 — 18 — 27 — ?',
    options: ['34', '36', '38', '40'],
    correctIndex: 2,
    explanation:
      'Les écarts entre termes consécutifs augmentent de 2 à chaque étape : +3, +5, +7, +9, donc le prochain écart est +11 : 27 + 11 = 38.',
    steps: [
      'Calculer les différences : 6−3 = 3 ; 11−6 = 5 ; 18−11 = 7 ; 27−18 = 9.',
      'Identifier la progression des écarts : nombres impairs consécutifs (+3, +5, +7, +9, +11).',
      'Ajouter 11 au dernier terme : 27 + 11 = 38.',
    ],
    notion: 'Suites à écarts progressifs',
    difficulty: 'facile',
    ficheId: 'fiche-psy-suites',
    source: 'Concours Douanes & Impôts — Tests Psychotechniques 2025',
    isOfficial: true,
    estimatedSeconds: 45,
  },
  {
    id: 'q-psy-2',
    subjectId: 'psychotechnique',
    chapterId: 'ch-psy-suites',
    examIds: ['concours-police-douanes', 'concours-admin'],
    prompt: 'Si « Tous les contrôleurs sont assermentés » et « Certains fonctionnaires sont contrôleurs », quelle conclusion est logiquement CERTAINE ?',
    options: [
      'Tous les fonctionnaires sont assermentés',
      'Tous les agents assermentés sont contrôleurs',
      'Certains fonctionnaires sont assermentés',
      'Aucun fonctionnaire n’est assermenté',
    ],
    correctIndex: 2,
    explanation:
      'Les fonctionnaires qui sont contrôleurs appartiennent nécessairement à l’ensemble des personnes assermentées : donc certains fonctionnaires sont assermentés.',
    steps: [
      'Représenter les ensembles : Contrôleurs ⊂ Assermentés.',
      'Comme l’intersection Fonctionnaires ∩ Contrôleurs est non vide, ces mêmes personnes sont aussi dans Assermentés.',
      'Éliminer les généralisations abusives (« Tous »).',
    ],
    notion: 'Syllogismes et logique déductive',
    difficulty: 'moyen',
    ficheId: 'fiche-psy-suites',
    source: 'Concours ENAM & Police — Raisonnement logique 2024',
    isOfficial: true,
    estimatedSeconds: 55,
  },
  {
    id: 'q-psy-3',
    subjectId: 'psychotechnique',
    chapterId: 'ch-psy-calcul',
    examIds: ['concours-police-douanes', 'concours-admin'],
    prompt: 'Un article coûtant 10 000 FCFA subit une hausse de 20 %, puis une réduction de 20 %. Quel est son prix final ?',
    options: ['10 000 FCFA', '9 600 FCFA', '9 800 FCFA', '10 400 FCFA'],
    correctIndex: 1,
    explanation:
      'On multiplie les coefficients : 10 000 × 1,20 × 0,80 = 10 000 × 0,96 = 9 600 FCFA (soit −4 % au global).',
    steps: [
      'Après +20 % : 10 000 × 1,20 = 12 000 FCFA.',
      'Après −20 % sur 12 000 : 12 000 × 0,80 = 9 600 FCFA.',
      'Vérification rapide : 1,2 × 0,8 = 0,96 ⇒ −4 %.',
    ],
    notion: 'Variations successives en pourcentage',
    difficulty: 'facile',
    ficheId: 'fiche-psy-calcul',
    source: 'Concours Douanes & Trésor — Calcul rapide 2025',
    isOfficial: true,
    estimatedSeconds: 45,
  },
  {
    id: 'q-psy-4',
    subjectId: 'psychotechnique',
    chapterId: 'ch-psy-calcul',
    examIds: ['concours-police-douanes', 'concours-admin', 'concours-ingenieur'],
    prompt: 'Un véhicule effectue un aller de 120 km à 60 km/h et revient par le même trajet (120 km) à 40 km/h. Quelle est sa vitesse moyenne sur l’aller-retour ?',
    options: ['50 km/h', '48 km/h', '45 km/h', '52 km/h'],
    correctIndex: 1,
    explanation:
      'Temps aller = 120/60 = 2 h ; temps retour = 120/40 = 3 h. Distance totale = 240 km en 5 h ⇒ v_moy = 240 / 5 = 48 km/h.',
    steps: [
      'Calculer la distance totale : 120 + 120 = 240 km.',
      'Calculer le temps total : (120/60) + (120/40) = 2 h + 3 h = 5 h.',
      'Diviser : 240 / 5 = 48 km/h (ou formule harmonique 2×60×40 / (60+40) = 4800/100 = 48).',
    ],
    notion: 'Vitesse moyenne (moyenne harmonique)',
    difficulty: 'moyen',
    ficheId: 'fiche-psy-calcul',
    source: 'Concours Douanes & Écoles d’Ingénieurs 2024',
    isOfficial: true,
    estimatedSeconds: 65,
  },
  {
    id: 'q-psy-5',
    subjectId: 'psychotechnique',
    chapterId: 'ch-psy-calcul',
    examIds: ['concours-police-douanes', 'concours-admin'],
    prompt: '6 agents traitent un lot de dossiers en 10 heures. Combien de temps faudra-t-il à 15 agents travaillant au même rythme ?',
    options: ['25 heures', '4 heures', '5 heures', '6 heures'],
    correctIndex: 1,
    explanation:
      'Le temps est inversement proportionnel au nombre d’agents : charge totale = 6 × 10 = 60 heures-agents. Avec 15 agents : 60 / 15 = 4 heures.',
    steps: [
      'Calculer la charge totale de travail : 6 agents × 10 h = 60 heures-agents.',
      'Diviser par 15 agents : 60 / 15 = 4 heures.',
    ],
    notion: 'Proportionnalité inverse',
    difficulty: 'facile',
    ficheId: 'fiche-psy-calcul',
    source: 'Concours Fonction Publique Catégorie B — 2024',
    isOfficial: true,
    estimatedSeconds: 45,
  },

  // ==================== STATISTIQUES & PROBABILITÉS ====================
  {
    id: 'q-st-1',
    subjectId: 'statistiques',
    chapterId: 'ch-stat-desc',
    examIds: ['concours-ingenieur', 'bac-scientifique', 'concours-medecine', 'bts-compta-info'],
    prompt: 'Quelle est la médiane de la série de notes suivante : 14 ; 8 ; 19 ; 10 ; 12 ?',
    options: ['10', '12', '12,6', '14'],
    correctIndex: 1,
    explanation:
      'Après avoir ordonné la série (8 ; 10 ; 12 ; 14 ; 19), la valeur centrale (3e sur 5) est 12.',
    steps: [
      'Ranger par ordre croissant : 8 ; 10 ; 12 ; 14 ; 19.',
      'L’effectif est impair (N = 5) : la médiane est la (5+1)/2 = 3e valeur.',
      'La 3e valeur est 12 (12,6 est la moyenne, piège classique).',
    ],
    notion: 'Médiane d’une série statistique',
    difficulty: 'facile',
    ficheId: 'fiche-stat-desc',
    source: 'Annales Baccalauréat & Biostatistiques Santé 2024',
    isOfficial: true,
    estimatedSeconds: 45,
  },
  {
    id: 'q-st-2',
    subjectId: 'statistiques',
    chapterId: 'ch-stat-desc',
    examIds: ['concours-ingenieur', 'bac-scientifique', 'bts-compta-info'],
    prompt: 'Si la variance d’une série de mesures vaut V = 16, que vaut son écart-type σ ?',
    options: ['2', '4', '8', '256'],
    correctIndex: 1,
    explanation:
      'L’écart-type est la racine carrée positive de la variance : σ = √16 = 4.',
    steps: [
      'Appliquer la définition : σ = √V.',
      'Calculer √16 = 4.',
    ],
    notion: 'Relation entre variance et écart-type',
    difficulty: 'facile',
    ficheId: 'fiche-stat-desc',
    source: 'Annales Bac C/D & BTS Statistiques 2024',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-st-3',
    subjectId: 'statistiques',
    chapterId: 'ch-stat-probas',
    examIds: ['concours-ingenieur', 'bac-scientifique', 'concours-medecine'],
    prompt: 'On sait que P(A) = 0,4 et P(A ∩ B) = 0,12. Que vaut la probabilité conditionnelle P_A(B) (probabilité de B sachant A) ?',
    options: ['0,048', '0,28', '0,30', '0,52'],
    correctIndex: 2,
    explanation:
      'Par définition, P_A(B) = P(A ∩ B) / P(A) = 0,12 / 0,4 = 0,30 (soit 30 %).',
    steps: [
      'Écrire la formule : P_A(B) = P(A ∩ B) / P(A).',
      'Remplacer : 0,12 / 0,40 = 12 / 40 = 3 / 10 = 0,30.',
    ],
    notion: 'Probabilité conditionnelle',
    difficulty: 'moyen',
    ficheId: 'fiche-stat-probas',
    source: 'Annales Baccalauréat Scientifique & Concours Ingénieurs 2025',
    isOfficial: true,
    estimatedSeconds: 50,
  },
  {
    id: 'q-st-4',
    subjectId: 'statistiques',
    chapterId: 'ch-stat-probas',
    examIds: ['concours-ingenieur', 'bac-scientifique', 'concours-medecine'],
    prompt: 'Une variable aléatoire X suit une loi binomiale B(n = 20 ; p = 0,25). Que vaut son espérance E(X) ?',
    options: ['4', '5', '3,75', '15'],
    correctIndex: 1,
    explanation:
      'Pour une loi binomiale B(n, p), l’espérance vaut simplement E(X) = n × p = 20 × 0,25 = 5.',
    steps: [
      'Identifier les paramètres : n = 20 et p = 0,25.',
      'Appliquer E(X) = n · p = 20 × 0,25 = 5.',
    ],
    notion: 'Espérance de la loi binomiale',
    difficulty: 'facile',
    ficheId: 'fiche-stat-probas',
    source: 'Annales Bac Série C/D & Concours Ingénieurs 2024',
    isOfficial: true,
    estimatedSeconds: 40,
  },
  {
    id: 'q-st-5',
    subjectId: 'statistiques',
    chapterId: 'ch-stat-probas',
    examIds: ['concours-ingenieur', 'concours-medecine'],
    prompt: 'Deux événements A et B de probabilités non nulles sont indépendants. Quelle égalité est TOUJOURS vraie ?',
    options: [
      'P(A ∩ B) = 0',
      'P(A ∩ B) = P(A) × P(B)',
      'P(A ∪ B) = P(A) + P(B)',
      'P_A(B) = 1 − P(B)',
    ],
    correctIndex: 1,
    explanation:
      'L’indépendance stochastique se définit par P(A ∩ B) = P(A) × P(B) (ce qui équivaut à P_A(B) = P(B)). P(A ∩ B) = 0 caractérise l’incompatibilité, pas l’indépendance.',
    steps: [
      'Distinguer indépendance (P(A∩B) = P(A)P(B)) et incompatibilité (P(A∩B) = 0).',
      'Valider la deuxième option.',
    ],
    notion: 'Indépendance vs incompatibilité',
    difficulty: 'moyen',
    ficheId: 'fiche-stat-probas',
    source: 'Concours Écoles d’Ingénieurs & Médecine 2025',
    isOfficial: true,
    estimatedSeconds: 50,
  },

  // ==================== PÉDAGOGIE & DIDACTIQUE ====================
  {
    id: 'q-ped-1',
    subjectId: 'pedagogie',
    chapterId: 'ch-ped-apc',
    examIds: ['concours-ens-enseignement'],
    prompt: 'Dans l’Approche par Compétences (APC), quel est le statut principal de l’erreur de l’élève pendant l’apprentissage ?',
    options: [
      'Une faute à sanctionner immédiatement par une mauvaise note',
      'Un indicateur précieux des obstacles cognitifs servant de levier de remédiation',
      'La preuve que l’élève ne peut pas réussir la discipline',
      'Un élément à ignorer totalement',
    ],
    correctIndex: 1,
    explanation:
      'En pédagogie active et en APC, l’erreur révèle les représentations de l’élève et permet à l’enseignant d’adapter son explication et sa remédiation.',
    steps: [
      'Rappeler le principe constructiviste (Piaget, Bachelard, Astolfi) : on apprend en dépassant ses erreurs.',
      'Éliminer les approches purement punitives ou passives.',
    ],
    notion: 'Statut constructif de l’erreur en APC',
    difficulty: 'facile',
    ficheId: 'fiche-ped-apc',
    source: 'Concours ENS & CAFOP — Psychopédagogie 2025',
    isOfficial: true,
    estimatedSeconds: 45,
  },
  {
    id: 'q-ped-2',
    subjectId: 'pedagogie',
    chapterId: 'ch-ped-apc',
    examIds: ['concours-ens-enseignement'],
    prompt: 'Dans la taxonomie de Bloom révisée, quel niveau cognitif est le PLUS élevé ?',
    options: ['Comprendre', 'Appliquer', 'Analyser', 'Créer'],
    correctIndex: 3,
    explanation:
      'La hiérarchie de Bloom révisée va de Mémoriser → Comprendre → Appliquer → Analyser → Évaluer → Créer (niveau supérieur).',
    steps: [
      'Remonter l’échelle : 1. Mémoriser, 2. Comprendre, 3. Appliquer, 4. Analyser, 5. Évaluer, 6. Créer.',
      'Confirmer « Créer ».',
    ],
    notion: 'Taxonomie de Bloom révisée',
    difficulty: 'facile',
    ficheId: 'fiche-ped-apc',
    source: 'Concours ENS — Didactique Générale 2024',
    isOfficial: true,
    estimatedSeconds: 40,
  },
  {
    id: 'q-ped-3',
    subjectId: 'pedagogie',
    chapterId: 'ch-ped-apc',
    examIds: ['concours-ens-enseignement'],
    prompt: 'Parmi ces verbes, lequel permet de formuler un objectif pédagogique réellement OBSERVABLE et mesurable ?',
    options: ['Comprendre', 'Savoir', 'Calculer', 'Apprécier'],
    correctIndex: 2,
    explanation:
      '« Calculer » décrit un comportement observable et évaluable (contrairement aux verbes internes vagues comme « comprendre » ou « savoir »).',
    steps: [
      'Tester chaque verbe : peut-on observer directement un élève en train de « calculer » ? Oui.',
      'Les verbes mentaux (« savoir », « comprendre ») doivent être traduits en verbes d’action.',
    ],
    notion: 'Formulation d’objectifs opérationnels',
    difficulty: 'moyen',
    ficheId: 'fiche-ped-apc',
    source: 'Concours CAFOP / ENI — Pédagogie 2024',
    isOfficial: true,
    estimatedSeconds: 45,
  },
  {
    id: 'q-ped-4',
    subjectId: 'pedagogie',
    chapterId: 'ch-ped-eval',
    examIds: ['concours-ens-enseignement'],
    prompt: 'Quelle évaluation est réalisée PENDANT la séquence d’apprentissage afin d’ajuster l’enseignement sans attribuer de note certificative ?',
    options: [
      'L’évaluation sommative',
      'L’évaluation formative',
      'L’évaluation certificative',
      'L’évaluation normative',
    ],
    correctIndex: 1,
    explanation:
      'L’évaluation formative accompagne l’apprentissage en cours pour fournir un feedback immédiat et organiser la remédiation.',
    steps: [
      'Associer les moments : Avant = diagnostique ; Pendant = formative ; Après = sommative/certificative.',
    ],
    notion: 'Types d’évaluation pédagogique',
    difficulty: 'facile',
    ficheId: 'fiche-ped-eval',
    source: 'Concours ENS / CAFOP — Session 2025',
    isOfficial: true,
    estimatedSeconds: 40,
  },
  {
    id: 'q-ped-5',
    subjectId: 'pedagogie',
    chapterId: 'ch-ped-eval',
    examIds: ['concours-ens-enseignement'],
    prompt: 'À quoi sert principalement une évaluation diagnostique en début d’année ou de chapitre ?',
    options: [
      'Classer définitivement les élèves par ordre de mérite',
      'Vérifier les prérequis et repérer les difficultés initiales avant de démarrer',
      'Remplacer l’examen de fin d’année',
      'Sanctionner les absences',
    ],
    correctIndex: 1,
    explanation:
      'L’évaluation diagnostique photographie les acquis antérieurs et les lacunes au départ afin d’adapter le rythme et les groupes de besoin.',
    steps: [
      'Rappeler la fonction d’orientation et de positionnement de l’évaluation diagnostique.',
    ],
    notion: 'Rôle de l’évaluation diagnostique',
    difficulty: 'facile',
    ficheId: 'fiche-ped-eval',
    source: 'Concours ENS — Psychopédagogie 2024',
    isOfficial: true,
    estimatedSeconds: 40,
  },

  // ==================== ENTREPRENEURIAT & MARKETING DIGITAL ====================
  {
    id: 'q-mkt-1',
    subjectId: 'marketing_entrep',
    chapterId: 'ch-mkt-bmc',
    examIds: ['certif-entrepreneuriat', 'bts-compta-info', 'certif-pro'],
    prompt: 'Une PME a des charges fixes mensuelles de 1 200 000 FCFA. Elle vend un produit 10 000 FCFA avec un coût variable unitaire de 4 000 FCFA. Combien d’unités doit-elle vendre pour atteindre son seuil de rentabilité ?',
    options: ['120 unités', '200 unités', '300 unités', '150 unités'],
    correctIndex: 1,
    explanation:
      'Marge unitaire sur coût variable = 10 000 − 4 000 = 6 000 FCFA. Seuil de rentabilité = 1 200 000 / 6 000 = 200 unités.',
    steps: [
      'Calculer la marge sur coût variable unitaire : MCVu = 10 000 − 4 000 = 6 000 FCFA.',
      'Diviser les charges fixes par MCVu : 1 200 000 / 6 000 = 200 unités.',
      'Vérification : CA = 2 000 000 ; CV = 800 000 ; MCV = 1 200 000 = CF ⇒ Résultat = 0.',
    ],
    notion: 'Calcul du seuil de rentabilité',
    difficulty: 'moyen',
    ficheId: 'fiche-mkt-bmc',
    source: 'Certification Entrepreneuriat & BTS Gestion 2025',
    isOfficial: true,
    estimatedSeconds: 65,
  },
  {
    id: 'q-mkt-2',
    subjectId: 'marketing_entrep',
    chapterId: 'ch-mkt-bmc',
    examIds: ['certif-entrepreneuriat', 'certif-pro'],
    prompt: 'Dans le Business Model Canvas (9 blocs), quel bloc se situe au CENTRE et répond à la question « Quel problème résolvons-nous pour nos clients ? » ?',
    options: [
      'La structure de coûts',
      'La proposition de valeur',
      'Les partenaires clés',
      'Les canaux de distribution',
    ],
    correctIndex: 1,
    explanation:
      'La proposition de valeur est le cœur du Business Model Canvas : elle explique pourquoi le client choisit notre solution plutôt qu’une alternative.',
    steps: [
      'Visualiser la matrice BMC : Proposition de valeur au centre, reliant l’infrastructure (gauche) aux clients (droite).',
    ],
    notion: 'Business Model Canvas',
    difficulty: 'facile',
    ficheId: 'fiche-mkt-bmc',
    source: 'Certification Entrepreneuriat Digital 2025',
    isOfficial: true,
    estimatedSeconds: 40,
  },
  {
    id: 'q-mkt-3',
    subjectId: 'marketing_entrep',
    chapterId: 'ch-mkt-digital',
    examIds: ['certif-entrepreneuriat', 'bts-compta-info'],
    prompt: 'Quels sont les quatre éléments classiques du Marketing Mix (les 4P) ?',
    options: [
      'Produit, Prix, Distribution (Place), Communication (Promotion)',
      'Profit, Publicité, Personnel, Partenariat',
      'Planification, Production, Paiement, Partage',
      'Positionnement, Prospection, Performance, Politique',
    ],
    correctIndex: 0,
    explanation:
      'Les 4P définis par McCarthy sont : Product (Produit), Price (Prix), Place (Distribution) et Promotion (Communication).',
    steps: [
      'Traduire les 4P de l’anglais : Product, Price, Place (= distribution), Promotion (= communication).',
    ],
    notion: 'Marketing Mix (4P)',
    difficulty: 'facile',
    ficheId: 'fiche-mkt-digital',
    source: 'BTS Commerce & Certification Marketing Digital 2024',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-mkt-4',
    subjectId: 'marketing_entrep',
    chapterId: 'ch-mkt-digital',
    examIds: ['certif-entrepreneuriat', 'certif-pro'],
    prompt: 'Quelle est la différence principale entre le SEO et le SEA en marketing digital ?',
    options: [
      'Le SEO est le référencement naturel organique, tandis que le SEA correspond aux annonces publicitaires payantes sur les moteurs de recherche',
      'Le SEO ne concerne que les réseaux sociaux',
      'Le SEA est toujours gratuit et illimité',
      'Il n’existe aucune différence entre les deux',
    ],
    correctIndex: 0,
    explanation:
      'SEO (Search Engine Optimization) optimise la visibilité gratuite et durable ; SEA (Search Engine Advertising) achète des mots-clés pour un affichage sponsorisé immédiat.',
    steps: [
      'Relier O (Optimization) au référencement naturel, et A (Advertising) à la publicité payante.',
    ],
    notion: 'SEO vs SEA',
    difficulty: 'facile',
    ficheId: 'fiche-mkt-digital',
    source: 'Certification Marketing Digital 2025',
    isOfficial: true,
    estimatedSeconds: 40,
  },
  {
    id: 'q-mkt-5',
    subjectId: 'marketing_entrep',
    chapterId: 'ch-mkt-digital',
    examIds: ['certif-entrepreneuriat', 'bts-compta-info'],
    prompt: 'Un site reçoit 2 000 visiteurs et enregistre 60 inscriptions. Quel est son taux de conversion ?',
    options: ['0,3 %', '3 %', '30 %', '12 %'],
    correctIndex: 1,
    explanation:
      'Taux de conversion = (60 / 2 000) × 100 = 0,03 × 100 = 3 %.',
    steps: [
      'Appliquer la formule : (Conversions / Visiteurs) × 100.',
      '(60 / 2 000) × 100 = 60 / 20 = 3 %.',
    ],
    notion: 'Calcul du taux de conversion (KPI)',
    difficulty: 'facile',
    ficheId: 'fiche-mkt-digital',
    source: 'Certification Marketing Digital & E-commerce 2025',
    isOfficial: true,
    estimatedSeconds: 40,
  },

  // ==================== ÉDUCATION CIVIQUE & DROITS HUMAINS ====================
  {
    id: 'q-civ-1',
    subjectId: 'educ_civique',
    chapterId: 'ch-civ-etat',
    examIds: ['bepc', 'concours-police-douanes', 'concours-admin', 'concours-ens-enseignement'],
    prompt: 'Qu’est-ce qui caractérise principalement la décentralisation administrative ?',
    options: [
      'La concentration de toutes les décisions dans un seul ministère',
      'Le transfert de compétences et de ressources de l’État vers des collectivités locales élues (communes, régions)',
      'La suppression des conseils municipaux',
      'La privatisation de la justice',
    ],
    correctIndex: 1,
    explanation:
      'La décentralisation donne une autonomie administrative et financière à des collectivités territoriales dotées d’organes élus localement.',
    steps: [
      'Distinguer déconcentration (agents nommés par l’État, ex. préfet) et décentralisation (autorités élues localement, ex. maire).',
    ],
    notion: 'Décentralisation vs déconcentration',
    difficulty: 'moyen',
    ficheId: 'fiche-civ-etat',
    source: 'Concours Police, Douanes & BEPC Éducation Civique 2024',
    isOfficial: true,
    estimatedSeconds: 45,
  },
  {
    id: 'q-civ-2',
    subjectId: 'educ_civique',
    chapterId: 'ch-civ-etat',
    examIds: ['bepc', 'concours-police-douanes', 'concours-admin'],
    prompt: 'Dans un État de droit, quelle affirmation est exacte ?',
    options: [
      'Les gouvernants sont au-dessus des lois',
      'La puissance publique elle-même est soumise à la Constitution et au contrôle de juges indépendants',
      'Seuls les citoyens ordinaires doivent respecter la loi',
      'Les décrets peuvent contredire librement la Constitution',
    ],
    correctIndex: 1,
    explanation:
      'L’État de droit impose que gouvernants et gouvernés respectent tous la hiérarchie des normes garantie par une justice indépendante.',
    steps: [
      'Rappeler les 3 piliers : hiérarchie des normes, égalité devant la loi, indépendance de la justice.',
    ],
    notion: 'Principes de l’État de droit',
    difficulty: 'facile',
    ficheId: 'fiche-civ-etat',
    source: 'Annales BEPC & Concours Administratifs 2025',
    isOfficial: true,
    estimatedSeconds: 40,
  },
  {
    id: 'q-civ-3',
    subjectId: 'educ_civique',
    chapterId: 'ch-civ-droits',
    examIds: ['bepc', 'concours-police-douanes', 'concours-admin', 'concours-ens-enseignement'],
    prompt: 'À quelle date l’Assemblée générale des Nations Unies a-t-elle adopté la Déclaration Universelle des Droits de l’Homme (DUDH) ?',
    options: ['14 juillet 1789', '10 décembre 1948', '25 mai 1963', '24 octobre 1945'],
    correctIndex: 1,
    explanation:
      'La DUDH a été adoptée le 10 décembre 1948 à Paris (le 10 décembre est depuis la Journée internationale des droits de l’homme).',
    steps: [
      'Distinguer les dates : 1789 (DDHC France), 24 oct. 1945 (ONU), 10 déc. 1948 (DUDH), 25 mai 1963 (OUA).',
    ],
    notion: 'Déclaration Universelle des Droits de l’Homme (1948)',
    difficulty: 'facile',
    ficheId: 'fiche-civ-droits',
    source: 'Annales BEPC & Concours Police 2024',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-civ-4',
    subjectId: 'educ_civique',
    chapterId: 'ch-civ-droits',
    examIds: ['concours-police-douanes', 'concours-admin'],
    prompt: 'En quelle année la Charte africaine des droits de l’homme et des peuples a-t-elle été adoptée à Nairobi ?',
    options: ['1960', '1981', '1999', '2002'],
    correctIndex: 1,
    explanation:
      'Adoptée en juin 1981 à Nairobi (Kenya) par l’OUA, elle est entrée en vigueur en 1986 et associe droits individuels, droits des peuples et devoirs.',
    steps: [
      'Associer Charte africaine de Banjul / Nairobi à l’année 1981.',
    ],
    notion: 'Charte africaine des droits de l’homme (1981)',
    difficulty: 'moyen',
    ficheId: 'fiche-civ-droits',
    source: 'Concours ENAM & Police — Droits Humains 2024',
    isOfficial: true,
    estimatedSeconds: 45,
  },
  {
    id: 'q-civ-5',
    subjectId: 'educ_civique',
    chapterId: 'ch-civ-droits',
    examIds: ['concours-police-douanes', 'concours-admin', 'concours-ens-enseignement'],
    prompt: 'Quelle obligation déontologique interdit à un agent public d’accepter un cadeau ou une somme d’argent pour favoriser un usager ?',
    options: [
      'Le devoir de probité et de désintéressement',
      'La liberté d’association',
      'Le droit de grève',
      'La déconcentration',
    ],
    correctIndex: 0,
    explanation:
      'L’obligation de probité (intégrité) impose à tout agent public d’exercer ses fonctions avec honnêteté, sans jamais utiliser son autorité à des fins personnelles.',
    steps: [
      'Relier refus de la corruption et conflit d’intérêts au devoir de probité.',
    ],
    notion: 'Déontologie et intégrité publique',
    difficulty: 'facile',
    ficheId: 'fiche-civ-droits',
    source: 'Concours Douanes, Police & ENAM 2025',
    isOfficial: true,
    estimatedSeconds: 40,
  },

  // ==================== ESPAGNOL LV2 ====================
  {
    id: 'q-esp-1',
    subjectId: 'espagnol',
    chapterId: 'ch-esp-base',
    examIds: ['bepc', 'bac-litteraire', 'bac-scientifique'],
    prompt: 'Complète correctement : « La biblioteca _____ cerca de la universidad. »',
    options: ['es', 'está', 'son', 'están'],
    correctIndex: 1,
    explanation:
      'Pour situer un lieu géographique en espagnol, on utilise TOUJOURS le verbe ESTAR (ici à la 3e personne du singulier : « está »).',
    steps: [
      'Identifier l’idée exprimée : localisation spatiale (« cerca de » = près de).',
      'Appliquer la règle absolue : localisation ⇒ ESTAR.',
      'Accorder au singulier (« la biblioteca ») ⇒ « está ».',
    ],
    notion: 'Ser vs Estar (localisation)',
    difficulty: 'facile',
    ficheId: 'fiche-esp-base',
    source: 'Annales BEPC & Baccalauréat Espagnol LV2 — 2025',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-esp-2',
    subjectId: 'espagnol',
    chapterId: 'ch-esp-base',
    examIds: ['bepc', 'bac-litteraire', 'bac-scientifique'],
    prompt: 'Choisis la bonne préposition : « Estudio todos los días _____ aprobar mi examen. »',
    options: ['por', 'para', 'desde', 'sobre'],
    correctIndex: 1,
    explanation:
      '« Aprobar mi examen » (réussir mon examen) exprime un BUT (objectif) : on emploie donc « para » + infinitif.',
    steps: [
      'Distinguer cause (por) et but/objectif (para).',
      '« Pour réussir » exprime le but ⇒ « para aprobar ».',
    ],
    notion: 'Por vs Para (expression du but)',
    difficulty: 'facile',
    ficheId: 'fiche-esp-base',
    source: 'Annales BEPC Espagnol LV2 — 2025',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-esp-3',
    subjectId: 'espagnol',
    chapterId: 'ch-esp-base',
    examIds: ['bepc', 'bac-litteraire'],
    prompt: 'Quelle phrase signifie « Merci pour ton aide » en espagnol ?',
    options: [
      'Gracias para tu ayuda.',
      'Gracias por tu ayuda.',
      'Gracias en tu ayuda.',
      'Gracias con tu ayuda.',
    ],
    correctIndex: 1,
    explanation:
      'On remercie pour une CAUSE (l’aide reçue) : l’expression figée est toujours « Gracias por... ».',
    steps: [
      'Rappeler la règle : cause / motif de remerciement ⇒ POR.',
    ],
    notion: 'Por vs Para (cause)',
    difficulty: 'facile',
    ficheId: 'fiche-esp-base',
    source: 'Annales BEPC & Bac Espagnol 2024',
    isOfficial: true,
    estimatedSeconds: 35,
  },
  {
    id: 'q-esp-4',
    subjectId: 'espagnol',
    chapterId: 'ch-esp-subj',
    examIds: ['bac-litteraire', 'bac-scientifique'],
    prompt: 'Complète avec le temps correct : « Cuando _____ (terminar, tú) tus estudios, viajarás. »',
    options: ['terminas', 'termines', 'terminarás', 'terminaste'],
    correctIndex: 1,
    explanation:
      'Après « cuando » suivi d’une idée de futur (« viajarás »), l’espagnol exige obligatoirement le SUBJONCTIF PRÉSENT : « termines » (verbe en -AR ⇒ terminaison -es).',
    steps: [
      'Repérer le futur dans la principale (« viajarás »).',
      'Appliquer la règle : cuando + action future ⇒ Subjonctif présent.',
      'Conjuguer « terminar » (en -AR) à la 2e pers. sg. au subjonctif ⇒ « termines ».',
    ],
    notion: 'Cuando + Subjonctif présent (futur)',
    difficulty: 'moyen',
    ficheId: 'fiche-esp-subj',
    source: 'Annales Baccalauréat Espagnol LV2 — Session 2025',
    isOfficial: true,
    estimatedSeconds: 45,
  },
  {
    id: 'q-esp-5',
    subjectId: 'espagnol',
    chapterId: 'ch-esp-subj',
    examIds: ['bac-litteraire', 'bac-scientifique'],
    prompt: 'Quel connecteur espagnol signifie « Cependant / Toutefois » pour introduire une nuance dans un essai ?',
    options: ['Además', 'Sin embargo', 'Por lo tanto', 'Es decir'],
    correctIndex: 1,
    explanation:
      '« Sin embargo » (= cependant / toutefois) marque l’opposition, alors que « Además » = de plus, « Por lo tanto » = par conséquent, « Es decir » = c’est-à-dire.',
    steps: [
      'Traduire les 4 connecteurs et retenir « Sin embargo » (synonyme de « No obstante »).',
    ],
    notion: 'Connecteurs logiques en espagnol',
    difficulty: 'facile',
    ficheId: 'fiche-esp-subj',
    source: 'Annales Baccalauréat Séries A & B Espagnol 2024',
    isOfficial: true,
    estimatedSeconds: 40,
  },
];

export const MEGA_ANNALES: Annale[] = [
  {
    id: 'ann-douanes-psy-2025',
    title: 'Concours Douanes & Impôts 2025 — Tests Psychotechniques & Calcul Rapide',
    examId: 'concours-police-douanes',
    subjectId: 'psychotechnique',
    chapterIds: ['ch-psy-suites', 'ch-psy-calcul'],
    year: 2025,
    difficulty: 'moyen',
    durationMinutes: 20,
    questionIds: ['q-psy-1', 'q-psy-2', 'q-psy-3', 'q-psy-4', 'q-psy-5'],
    examType: 'Concours Direct Douanes / Impôts',
    language: 'Français',
    responseFormat: 'QCM',
    sizeKb: 162,
    shareable: true,
    countryOrZone: 'Zone Francophone (CEMAC / UEMOA)',
    instructions: 'Calculatrice strictement interdite. Gère ton rythme (4 min max par exercice).',
    bareme: '4 points par QCM — Total sur 20 points.',
  },
  {
    id: 'ann-police-civ-2024',
    title: 'Concours Police & Gendarmerie 2024 — Éducation Civique, État de droit & Droits Humains',
    examId: 'concours-police-douanes',
    subjectId: 'educ_civique',
    chapterIds: ['ch-civ-etat', 'ch-civ-droits'],
    year: 2024,
    difficulty: 'facile',
    durationMinutes: 20,
    questionIds: ['q-civ-1', 'q-civ-2', 'q-civ-3', 'q-civ-4', 'q-civ-5'],
    examType: 'Concours Police / Gendarmerie',
    language: 'Français',
    responseFormat: 'QCM',
    sizeKb: 148,
    shareable: true,
    countryOrZone: 'Zone Francophone',
    instructions: 'Épreuve officielle de culture civique et déontologie publique.',
    bareme: '4 points par question — Total sur 20 points.',
  },
  {
    id: 'ann-enam-2025',
    title: 'Concours ENAM & Fonction Publique 2025 — Logique, Citoyenneté & Droit Public',
    examId: 'concours-admin',
    subjectId: 'educ_civique',
    chapterIds: ['ch-civ-etat', 'ch-psy-suites'],
    year: 2025,
    difficulty: 'difficile',
    durationMinutes: 25,
    questionIds: ['q-civ-1', 'q-civ-4', 'q-civ-5', 'q-psy-2', 'q-psy-3'],
    examType: 'Concours ENAM Catégorie A',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 170,
    shareable: true,
    countryOrZone: 'ENAM / Fonction Publique',
    instructions: 'Épreuve transversale d’admissibilité. Une seule réponse exacte par item.',
    bareme: '4 points par question — Pénalité conseillée −0,25 pt en entraînement concours.',
  },
  {
    id: 'ann-ing-stat-2025',
    title: 'Concours Écoles d’Ingénieurs 2025 — Statistiques, Probabilités & Loi Binomiale',
    examId: 'concours-ingenieur',
    subjectId: 'statistiques',
    chapterIds: ['ch-stat-desc', 'ch-stat-probas'],
    year: 2025,
    difficulty: 'difficile',
    durationMinutes: 25,
    questionIds: ['q-st-1', 'q-st-2', 'q-st-3', 'q-st-4', 'q-st-5'],
    examType: 'Concours Grandes Écoles d’Ingénieurs',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 175,
    shareable: true,
    countryOrZone: 'Écoles d’Ingénieurs Francophones',
    instructions: 'Justifie chaque formule probabiliste sur ton espace brouillon avant de valider.',
    bareme: '4 points par problème — Total sur 20 points.',
  },
  {
    id: 'ann-ing-mix-2024',
    title: 'Concours Écoles d’Ingénieurs 2024 — Maths, Algorithmique & Logique',
    examId: 'concours-ingenieur',
    subjectId: 'informatique',
    chapterIds: ['ch-info-algo', 'ch-stat-probas'],
    year: 2024,
    difficulty: 'difficile',
    durationMinutes: 25,
    questionIds: ['q-info-1', 'q-info-2', 'q-st-3', 'q-st-5', 'q-psy-4'],
    examType: 'Concours Polytechnique / Ingénieurs',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 180,
    shareable: true,
    countryOrZone: 'Écoles d’Ingénieurs',
    instructions: 'Sujet combiné sans calculatrice ni ordinateur.',
    bareme: '4 points par exercice — Total sur 20 points.',
  },
  {
    id: 'ann-ens-ped-2025',
    title: 'Concours ENS / CAFOP 2025 — Pédagogie Active (APC), Bloom & Évaluation',
    examId: 'concours-ens-enseignement',
    subjectId: 'pedagogie',
    chapterIds: ['ch-ped-apc', 'ch-ped-eval'],
    year: 2025,
    difficulty: 'moyen',
    durationMinutes: 20,
    questionIds: ['q-ped-1', 'q-ped-2', 'q-ped-3', 'q-ped-4', 'q-ped-5'],
    examType: 'Concours d’entrée ENS / CAFOP',
    language: 'Français',
    responseFormat: 'Étude de cas',
    sizeKb: 156,
    shareable: true,
    countryOrZone: 'Écoles Normales Supérieures Francophones',
    instructions: 'Analyse chaque situation de classe selon les principes de l’APC.',
    bareme: '4 points par item — Total sur 20 points.',
  },
  {
    id: 'ann-ens-fr-2024',
    title: 'Concours ENS Enseignement 2024 — Didactique & Maîtrise du Français',
    examId: 'concours-ens-enseignement',
    subjectId: 'francais',
    chapterIds: ['ch-fr-figures', 'ch-ped-apc'],
    year: 2024,
    difficulty: 'moyen',
    durationMinutes: 20,
    questionIds: ['q-fr-1', 'q-fr-4', 'q-fr-5', 'q-ped-1', 'q-ped-4'],
    examType: 'Concours Professeurs — Épreuve écrite',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 158,
    shareable: true,
    countryOrZone: 'Zone Francophone',
    instructions: 'Relie maîtrise disciplinaire en français et posture pédagogique en classe.',
    bareme: '4 points par question — Total sur 20 points.',
  },
  {
    id: 'ann-entrep-mkt-2025',
    title: 'Certification Entrepreneuriat & Marketing Digital 2025 — BMC, 4P, SEO & Rentabilité',
    examId: 'certif-entrepreneuriat',
    subjectId: 'marketing_entrep',
    chapterIds: ['ch-mkt-bmc', 'ch-mkt-digital'],
    year: 2025,
    difficulty: 'moyen',
    durationMinutes: 25,
    questionIds: ['q-mkt-1', 'q-mkt-2', 'q-mkt-3', 'q-mkt-4', 'q-mkt-5'],
    examType: 'Examen de Certification Professionnelle',
    language: 'Français',
    responseFormat: 'Étude de cas',
    sizeKb: 168,
    shareable: true,
    countryOrZone: 'Certification Internationale Francophone',
    instructions: 'Étude de cas PME : vérifie tes calculs de seuil de rentabilité et de taux de conversion.',
    bareme: 'Validation exigée ≥ 75 % (15/20).',
  },
  {
    id: 'ann-bac-esp-2025',
    title: 'Baccalauréat 2025 — Espagnol LV2 : Ser/Estar, Por/Para & Subjonctif',
    examId: 'bac-litteraire',
    subjectId: 'espagnol',
    chapterIds: ['ch-esp-base', 'ch-esp-subj'],
    year: 2025,
    difficulty: 'moyen',
    durationMinutes: 20,
    questionIds: ['q-esp-1', 'q-esp-2', 'q-esp-3', 'q-esp-4', 'q-esp-5'],
    examType: 'Baccalauréat Séries A, B, C & D',
    language: 'Espagnol / Français',
    responseFormat: 'QCM',
    sizeKb: 144,
    shareable: true,
    countryOrZone: 'Zone Francophone',
    instructions: 'Verifica bien el uso de ser/estar, por/para y el subjuntivo después de « cuando ».',
    bareme: '4 points par item — Total sur 20 points.',
  },
  {
    id: 'ann-bepc-esp-2025',
    title: 'BEPC 2025 — Espagnol LV2 : Bases grammaticales & Expression',
    examId: 'bepc',
    subjectId: 'espagnol',
    chapterIds: ['ch-esp-base'],
    year: 2025,
    difficulty: 'facile',
    durationMinutes: 15,
    questionIds: ['q-esp-1', 'q-esp-2', 'q-esp-3', 'q-esp-5'],
    examType: 'BEPC — Sujet officiel LV2',
    language: 'Espagnol / Français',
    responseFormat: 'QCM',
    sizeKb: 126,
    shareable: true,
    countryOrZone: 'Zone Francophone',
    instructions: 'Lis chaque phrase en entier avant de choisir la réponse.',
    bareme: '5 points par question — Total sur 20 points.',
  },
  {
    id: 'ann-bepc-civ-2025',
    title: 'BEPC 2025 — Éducation Civique & Citoyenneté',
    examId: 'bepc',
    subjectId: 'educ_civique',
    chapterIds: ['ch-civ-etat', 'ch-civ-droits'],
    year: 2025,
    difficulty: 'facile',
    durationMinutes: 15,
    questionIds: ['q-civ-1', 'q-civ-2', 'q-civ-3', 'q-civ-5'],
    examType: 'BEPC — Épreuve officielle',
    language: 'Français',
    responseFormat: 'QCM',
    sizeKb: 132,
    shareable: true,
    countryOrZone: 'Zone Francophone',
    instructions: 'Mobilise les notions d’État de droit, décentralisation et droits humains.',
    bareme: '5 points par question — Total sur 20 points.',
  },
  {
    id: 'ann-bac-cd-stat-2025',
    title: 'Baccalauréat Séries C & D 2025 — Probabilités, Statistiques & Second degré',
    examId: 'bac-scientifique',
    subjectId: 'statistiques',
    chapterIds: ['ch-stat-desc', 'ch-stat-probas'],
    year: 2025,
    difficulty: 'moyen',
    durationMinutes: 25,
    questionIds: ['q-st-1', 'q-st-2', 'q-st-3', 'q-st-4', 'q-m-1'],
    examType: 'Baccalauréat Scientifique — Session 2025',
    language: 'Français',
    responseFormat: 'QCM & Problèmes',
    sizeKb: 165,
    shareable: true,
    countryOrZone: 'Tchad / Afrique Francophone',
    instructions: 'Pose tes arbres pondérés et calculs de médiane sur la zone de brouillon.',
    bareme: '4 points par exercice — Total sur 20 points.',
  },
  {
    id: 'ann-med-biostat-2025',
    title: 'Concours Médecine & Pharmacie 2025 — Biostatistiques & Biochimie',
    examId: 'concours-medecine',
    subjectId: 'statistiques',
    chapterIds: ['ch-stat-probas', 'ch-bio-enzymes'],
    year: 2025,
    difficulty: 'difficile',
    durationMinutes: 25,
    questionIds: ['q-st-1', 'q-st-3', 'q-st-5', 'q-bio-4', 'q-bio-5'],
    examType: 'Concours Santé — Épreuve Biostatistiques',
    language: 'Français',
    responseFormat: 'QCM',
    sizeKb: 174,
    shareable: true,
    countryOrZone: 'Facultés des Sciences de la Santé',
    instructions: 'Épreuve sélective chronométrée : précision mathématique et lecture rigoureuse des probabilités.',
    bareme: '4 points par QCM — Total sur 20 points.',
  },
  {
    id: 'ann-bts-gestion-2025',
    title: 'BTS Gestion & Commerce 2025 — Seuil de Rentabilité, TVA & Marketing',
    examId: 'bts-compta-info',
    subjectId: 'marketing_entrep',
    chapterIds: ['ch-mkt-bmc', 'ch-compta-amort'],
    year: 2025,
    difficulty: 'moyen',
    durationMinutes: 25,
    questionIds: ['q-mkt-1', 'q-mkt-3', 'q-mkt-5', 'q-compta-3', 'q-compta-5'],
    examType: 'BTS Gestion Commerciale — Annale 2025',
    language: 'Français',
    responseFormat: 'Étude de cas',
    sizeKb: 170,
    shareable: true,
    countryOrZone: 'Espace OHADA',
    instructions: 'Étude commerciale et financière intégrée (TVA 18 % et seuil de rentabilité).',
    bareme: '4 points par dossier — Total sur 20 points.',
  },
];

export const MEGA_FICHES: Fiche[] = [
  {
    id: 'fiche-psy-suites',
    subjectId: 'psychotechnique',
    chapterId: 'ch-psy-suites',
    title: 'Suites numériques & Syllogismes (Concours)',
    subtitle: 'Méthode éclair en 20 secondes pour réussir les tests psychotechniques',
    sizeKb: 52,
    notionsEssentielles: [
      'Tester d’abord les écarts entre termes consécutifs (+r ou écarts progressifs).',
      'Tester ensuite les rapports (×q) ou deux suites alternées imbriquées.',
      'Syllogisme : « Tous les A sont B » n’implique JAMAIS « Tous les B sont A ».',
    ],
    definitions: [
      { terme: 'Suite alternée', definition: 'Deux suites indépendantes entrelacées (termes de rang pair et impair).' },
      { terme: 'Contraposée', definition: '« Si A alors B » équivaut logiquement à « Si non-B alors non-A ».' },
    ],
    formules: [
      { label: 'Fibonacci', formule: 'uₙ = uₙ₋₁ + uₙ₋₂' },
    ],
    datesReperes: [
      { repere: 'Timing concours', detail: 'Ne dépasse jamais 60 secondes sur une suite bloquante : passe et reviens ensuite.' },
    ],
    methodes: [
      'Écris directement les petits écarts au-dessus des flèches entre chaque nombre.',
    ],
    erreursFrequentes: [
      'Confondre « Certains » avec « Tous » dans un syllogisme.',
    ],
    exemples: [
      { titre: '3 ; 6 ; 11 ; 18 ; 27 ; ?', contenu: 'Écarts : +3, +5, +7, +9 → prochain écart +11 ⇒ 38.' },
    ],
    resumeExpress:
      'Calcule d’abord les écarts (+), puis les produits (×), puis 1 terme sur 2. En syllogisme, dessine des cercles d’ensembles.',
    tableauComparatif: {
      headers: ['Type de suite', 'Indice visuel', 'Exemple'],
      rows: [
        { critere: 'Écarts progressifs', elementA: 'Différences en progression (+3, +5, +7)', elementB: '3, 6, 11, 18, 27, 38' },
        { critere: 'Géométrique', elementA: 'Croissance très rapide (×2, ×3)', elementB: '2, 6, 18, 54, 162' },
      ],
    },
    autoEvaluation: [
      { question: 'Complète : 2 ; 5 ; 10 ; 17 ; ?', reponse: '26 (écarts +3, +5, +7, +9).' },
    ],
  },
  {
    id: 'fiche-psy-calcul',
    subjectId: 'psychotechnique',
    chapterId: 'ch-psy-calcul',
    title: 'Calcul rapide : Pourcentages, Vitesses & Proportions',
    subtitle: 'Déjouer les pièges classiques sans calculatrice',
    sizeKb: 50,
    notionsEssentielles: [
      'Pourcentages successifs : multiplier les coefficients multiplicateurs (jamais additionner).',
      'Vitesse moyenne = Distance totale / Temps total.',
      'Proportionnalité inverse : Ouvriers × Temps = Constante.',
    ],
    definitions: [
      { terme: 'Coefficient multiplicateur', definition: '1 + t/100 pour une hausse, 1 − t/100 pour une baisse.' },
    ],
    formules: [
      { label: 'Aller-retour même distance', formule: 'v_moy = 2v₁v₂ / (v₁ + v₂)' },
      { label: 'Charge constante', formule: 'N₁ × T₁ = N₂ × T₂' },
    ],
    datesReperes: [
      { repere: 'Piège n°1', detail: '+20 % puis −20 % = −4 % (et +10 % puis −10 % = −1 %).' },
    ],
    methodes: [
      'Transforme mentalement 25 % en ÷4, 20 % en ÷5 et 10 % en ÷10 pour calculer en 3 secondes.',
    ],
    erreursFrequentes: [
      'Faire (v₁ + v₂) / 2 pour une vitesse moyenne sur un aller-retour.',
    ],
    exemples: [
      { titre: '6 agents en 10h → 15 agents ?', contenu: '6 × 10 = 60 heures-agents ⇒ 60 / 15 = 4 heures.' },
    ],
    resumeExpress:
      'Pourcentages successifs = produit des CM. Vitesse moyenne = d_tot / t_tot. Plus d’ouvriers = moins de temps (N₁T₁ = N₂T₂).',
    tableauComparatif: {
      headers: ['Piège', 'Réponse fausse intuitive', 'Calcul exact'],
      rows: [
        { critere: '+20 % puis −20 %', elementA: '0 % (inchangé)', elementB: '1,2 × 0,8 = 0,96 (−4 %)' },
        { critere: 'Aller 60 / Retour 40', elementA: '50 km/h', elementB: '240 km / 5 h = 48 km/h' },
      ],
    },
    autoEvaluation: [
      { question: '+10 % puis −10 % sur 1 000 FCFA donne ?', reponse: '990 FCFA (1 000 × 1,1 × 0,9).' },
    ],
  },
  {
    id: 'fiche-stat-desc',
    subjectId: 'statistiques',
    chapterId: 'ch-stat-desc',
    title: 'Statistique descriptive : Moyenne, Médiane & Écart-type',
    subtitle: 'Indicateurs de position et de dispersion essentiels',
    sizeKb: 54,
    notionsEssentielles: [
      'Médiane = valeur centrale de la série ORDONNÉE (insensible aux valeurs extrêmes).',
      'Variance V ≥ 0 ; Écart-type σ = √V (même unité que les données).',
      'Écart interquartile = Q₃ − Q₁ (contient les 50 % centraux de la série).',
    ],
    definitions: [
      { terme: 'Médiane', definition: 'Valeur qui partage une série ordonnée en deux moitiés d’effectifs égaux.' },
      { terme: 'Écart-type (σ)', definition: 'Racine carrée de la variance mesurant la dispersion autour de la moyenne.' },
    ],
    formules: [
      { label: 'Moyenne', formule: 'x̄ = (Σ nᵢxᵢ) / N' },
      { label: 'Écart-type', formule: 'σ = √V' },
    ],
    datesReperes: [
      { repere: 'Réflexe d’examen', detail: 'Toujours trier la série par ordre croissant AVANT de calculer médiane et quartiles.' },
    ],
    methodes: [
      'Si N est impair, la médiane est la valeur de rang (N+1)/2. Si N est pair, moyenne des rangs N/2 et N/2 + 1.',
    ],
    erreursFrequentes: [
      'Prendre le nombre du milieu sans avoir trié la série au préalable.',
    ],
    exemples: [
      { titre: 'Série 8 ; 10 ; 12 ; 14 ; 19', contenu: 'Médiane = 12 ; Moyenne = 12,6.' },
    ],
    resumeExpress:
      'Trie d’abord pour la médiane ! Variance V = moyenne des carrés des écarts ; Écart-type σ = √V.',
    tableauComparatif: {
      headers: ['Indicateur', 'Sensibilité aux extrêmes', 'Rôle'],
      rows: [
        { critere: 'Moyenne', elementA: 'Très sensible', elementB: 'Centre de gravité global' },
        { critere: 'Médiane', elementA: 'Robuste (peu sensible)', elementB: 'Partage 50 % / 50 %' },
      ],
    },
    autoEvaluation: [
      { question: 'Si σ = 3, que vaut la variance V ?', reponse: 'V = σ² = 9.' },
    ],
  },
  {
    id: 'fiche-stat-probas',
    subjectId: 'statistiques',
    chapterId: 'ch-stat-probas',
    title: 'Probabilités conditionnelles, Bayes & Loi binomiale',
    subtitle: 'Arbres pondérés, indépendance et formule de Bayes',
    sizeKb: 58,
    notionsEssentielles: [
      'P_A(B) = P(A ∩ B) / P(A).',
      'Indépendance ⇔ P(A ∩ B) = P(A) × P(B).',
      'Loi binomiale B(n, p) : E(X) = np et V(X) = np(1 − p).',
    ],
    definitions: [
      { terme: 'Événements incompatibles', definition: 'Ne peuvent pas se réaliser ensemble : P(A ∩ B) = 0.' },
      { terme: 'Événements indépendants', definition: 'La réalisation de l’un ne modifie pas la probabilité de l’autre : P_A(B) = P(B).' },
    ],
    formules: [
      { label: 'Probabilité conditionnelle', formule: 'P_A(B) = P(A ∩ B) / P(A)' },
      { label: 'Loi binomiale', formule: 'E(X) = n·p   |   V(X) = n·p·(1 − p)' },
    ],
    datesReperes: [
      { repere: '1763 — Thomas Bayes', detail: 'Publication posthume du théorème de Bayes sur la probabilité inverse.' },
    ],
    methodes: [
      'Dessine un arbre pondéré : la somme des branches issues d’un même nœud vaut toujours 1.',
    ],
    erreursFrequentes: [
      'Confondre événements indépendants et événements incompatibles.',
    ],
    exemples: [
      { titre: 'B(20 ; 0,25)', contenu: 'E(X) = 20 × 0,25 = 5 ; V(X) = 5 × 0,75 = 3,75.' },
    ],
    resumeExpress:
      'P_A(B) = P(A∩B)/P(A). Indépendants ⇔ P(A∩B)=P(A)P(B). Binomiale B(n,p) ⇒ E(X)=np.',
    tableauComparatif: {
      headers: ['Notion', 'Formule caractéristique', 'Signification'],
      rows: [
        { critere: 'Indépendance', elementA: 'P(A ∩ B) = P(A) · P(B)', elementB: 'A n’influence pas B' },
        { critere: 'Incompatibilité', elementA: 'P(A ∩ B) = 0', elementB: 'A et B s’excluent mutuellement' },
      ],
    },
    autoEvaluation: [
      { question: 'Si P(A)=0,5 et P(A∩B)=0,2, que vaut P_A(B) ?', reponse: '0,2 / 0,5 = 0,4.' },
    ],
  },
  {
    id: 'fiche-ped-apc',
    subjectId: 'pedagogie',
    chapterId: 'ch-ped-apc',
    title: 'Approche par Compétences (APC) & Taxonomie de Bloom',
    subtitle: 'Objectifs opérationnels et pédagogie active (ENS / CAFOP)',
    sizeKb: 52,
    notionsEssentielles: [
      'APC : mobiliser savoirs, savoir-faire et savoir-être face à une situation-problème.',
      'Bloom révisé : Mémoriser → Comprendre → Appliquer → Analyser → Évaluer → Créer.',
      'Objectif opérationnel = verbe d’action observable + conditions + critère de réussite.',
    ],
    definitions: [
      { terme: 'Compétence', definition: 'Capacité à mobiliser un ensemble intégré de ressources pour résoudre une situation complexe.' },
    ],
    formules: [
      { label: 'Pyramide de Bloom', formule: 'Mémoriser < Comprendre < Appliquer < Analyser < Évaluer < Créer' },
    ],
    datesReperes: [
      { repere: '1956 / 2001', detail: 'Taxonomie de Benjamin Bloom (1956), révisée par Anderson & Krathwohl (2001).' },
    ],
    methodes: [
      'Remplace toujours « comprendre » ou « savoir » par un verbe mesurable (identifier, calculer, rédiger, comparer).',
    ],
    erreursFrequentes: [
      'Réduire l’APC à une simple transmission magistrale sans activité de l’élève.',
    ],
    exemples: [
      { titre: 'Bon objectif opérationnel', contenu: '« À la fin de la séance, l’élève sera capable de calculer sans erreur le discriminant de 3 équations. »' },
    ],
    resumeExpress:
      'APC = élève acteur face à une situation-problème + erreur constructive. Bloom culmine à « Créer ».',
    tableauComparatif: {
      headers: ['Modèle', 'Rôle de l’élève', 'Statut de l’erreur'],
      rows: [
        { critere: 'Transmissif classique', elementA: 'Récepteur passif', elementB: 'Faute sanctionnée' },
        { critere: 'APC (actif)', elementA: 'Acteur qui résout des situations', elementB: 'Indicateur pour remédier' },
      ],
    },
    autoEvaluation: [
      { question: 'Quel est le sommet de la taxonomie de Bloom révisée ?', reponse: 'Créer.' },
    ],
  },
  {
    id: 'fiche-ped-eval',
    subjectId: 'pedagogie',
    chapterId: 'ch-ped-eval',
    title: 'Les 3 évaluations pédagogiques (Diagnostique, Formative, Sommative)',
    subtitle: 'Quand évaluer, pourquoi et comment remédier',
    sizeKb: 48,
    notionsEssentielles: [
      'Diagnostique : AVANT le cours (repérer prérequis et lacunes).',
      'Formative : PENDANT le cours (réguler, aider sans note sanction).',
      'Sommative / Certificative : APRÈS la séquence (bilan, note, diplôme).',
    ],
    definitions: [
      { terme: 'Remédiation', definition: 'Action ciblée de reprise pédagogique suite au repérage d’une difficulté précise.' },
    ],
    formules: [
      { label: 'Chronologie', formule: 'Diagnostique (Avant) → Formative (Pendant) → Sommative (Après)' },
    ],
    datesReperes: [
      { repere: '1967 — Michael Scriven', detail: 'Distinction fondatrice entre évaluation formative et évaluation sommative.' },
    ],
    methodes: [
      'Associe une grille de critères claire et transparente à chaque évaluation sommative.',
    ],
    erreursFrequentes: [
      'Transformer chaque évaluation formative en contrôle noté punitif.',
    ],
    exemples: [
      { titre: 'Quiz rapide en milieu de séance', contenu: 'Évaluation formative permettant de réexpliquer immédiatement un point mal compris.' },
    ],
    resumeExpress:
      'Diagnostique = avant (situer). Formative = pendant (faire progresser). Sommative = après (valider/noter).',
    tableauComparatif: {
      headers: ['Type', 'Moment', 'Finalité'],
      rows: [
        { critere: 'Diagnostique', elementA: 'Début de séquence', elementB: 'Vérifier les prérequis' },
        { critere: 'Formative', elementA: 'En cours d’apprentissage', elementB: 'Guider et remédier' },
        { critere: 'Sommative', elementA: 'Fin de période', elementB: 'Mesurer et certifier' },
      ],
    },
    autoEvaluation: [
      { question: 'Quelle évaluation intervient pendant le cours sans note définitive ?', reponse: 'L’évaluation formative.' },
    ],
  },
  {
    id: 'fiche-mkt-bmc',
    subjectId: 'marketing_entrep',
    chapterId: 'ch-mkt-bmc',
    title: 'Business Model Canvas & Seuil de rentabilité',
    subtitle: 'Concevoir un projet viable et calculer son point mort',
    sizeKb: 54,
    notionsEssentielles: [
      'BMC : 9 blocs centrés sur la Proposition de valeur.',
      'MCV = Chiffre d’affaires − Charges variables.',
      'Seuil de rentabilité (en quantité) = Charges fixes / (Prix unitaire − CV unitaire).',
    ],
    definitions: [
      { terme: 'Point mort', definition: 'Date ou volume d’activité à partir duquel l’entreprise couvre toutes ses charges et devient rentable.' },
    ],
    formules: [
      { label: 'SR en volume', formule: 'SR_q = Charges Fixes / (P_u − CV_u)' },
      { label: 'SR en CA', formule: 'SR_CA = Charges Fixes / Taux de MCV' },
    ],
    datesReperes: [
      { repere: '2010 — A. Osterwalder', detail: 'Popularisation mondiale du Business Model Canvas.' },
    ],
    methodes: [
      'Vérifie toujours ton résultat de SR : à ce volume exact, CA − CV − CF doit valoir exactement 0.',
    ],
    erreursFrequentes: [
      'Diviser les charges fixes par le prix de vente au lieu de la marge unitaire (P_u − CV_u).',
    ],
    exemples: [
      { titre: 'CF = 1 200 000, Pu = 10 000, CVu = 4 000', contenu: 'MCVu = 6 000 ⇒ SR = 200 unités.' },
    ],
    resumeExpress:
      'BMC = 9 blocs autour de la Proposition de valeur. SR = Charges Fixes / Marge sur coût variable.',
    tableauComparatif: {
      headers: ['Type de charge', 'Comportement', 'Exemples'],
      rows: [
        { critere: 'Charges fixes', elementA: 'Indépendantes du volume vendu', elementB: 'Loyer, salaires fixes, assurance' },
        { critere: 'Charges variables', elementA: 'Proportionnelles aux ventes', elementB: 'Matières premières, livraison, emballage' },
      ],
    },
    autoEvaluation: [
      { question: 'Si CF = 500 000 et MCVu = 2 500, quel est le SR en unités ?', reponse: '200 unités.' },
    ],
  },
  {
    id: 'fiche-mkt-digital',
    subjectId: 'marketing_entrep',
    chapterId: 'ch-mkt-digital',
    title: 'Marketing Mix (4P) & KPI Digitaux (SEO / SEA / Conversion)',
    subtitle: 'Piloter l’acquisition et la rentabilité digitale',
    sizeKb: 50,
    notionsEssentielles: [
      '4P : Produit (Product), Prix (Price), Distribution (Place), Communication (Promotion).',
      'SEO = référencement naturel gratuit ; SEA = publicité payante.',
      'Taux de conversion = (Conversions / Visiteurs) × 100 ; modèle sain : LTV > 3 × CAC.',
    ],
    definitions: [
      { terme: 'CAC', definition: 'Coût d’Acquisition Client : budget marketing total divisé par le nombre de nouveaux clients.' },
      { terme: 'LTV', definition: 'Lifetime Value : revenu total généré par un client sur toute la durée de sa relation.' },
    ],
    formules: [
      { label: 'Conversion', formule: 'Tx = (Conversions / Visiteurs) × 100' },
    ],
    datesReperes: [
      { repere: '1960 — Jerome McCarthy', detail: 'Formalisation du modèle des 4P du Mix Marketing.' },
    ],
    methodes: [
      'Combine SEA (résultats rapides pour tester une offre) et SEO (acquisition durable à faible coût).',
    ],
    erreursFrequentes: [
      'Confondre « Place » (canaux de distribution) avec « emplacement géographique uniquement ».',
    ],
    exemples: [
      { titre: '60 clients pour 2 000 visites', contenu: 'Taux de conversion = 3 %.' },
    ],
    resumeExpress:
      '4P = Produit, Prix, Distribution, Communication. SEO = naturel, SEA = payant. Vise toujours LTV > 3 × CAC.',
    tableauComparatif: {
      headers: ['Levier', 'Coût au clic', 'Horizon d’effet'],
      rows: [
        { critere: 'SEO (Naturel)', elementA: 'Gratuit (investissement contenu)', elementB: 'Moyen / long terme, durable' },
        { critere: 'SEA (Sponsorisé)', elementA: 'Payant au clic (CPC)', elementB: 'Immédiat, s’arrête avec le budget' },
      ],
    },
    autoEvaluation: [
      { question: 'Que signifie CAC en marketing digital ?', reponse: 'Coût d’Acquisition Client.' },
    ],
  },
  {
    id: 'fiche-civ-etat',
    subjectId: 'educ_civique',
    chapterId: 'ch-civ-etat',
    title: 'État de droit, Citoyenneté & Décentralisation',
    subtitle: 'Institutions locales, droits civiques et État de droit',
    sizeKb: 48,
    notionsEssentielles: [
      'État de droit : gouvernants et citoyens soumis à la loi et à une justice indépendante.',
      'Décentralisation : transfert de compétences à des collectivités locales élues (communes, régions).',
      'Déconcentration : représentants nommés par l’État central sur le territoire (préfets, gouverneurs).',
    ],
    definitions: [
      { terme: 'Décentralisation', definition: 'Mode d’organisation confiant la gestion des affaires locales à des assemblées élues.' },
    ],
    formules: [
      { label: 'Repère clé', formule: 'Décentralisation = Élus locaux  |  Déconcentration = Agents nommés par l’État' },
    ],
    datesReperes: [
      { repere: 'Principe démocratique', detail: 'Suffrage universel : chaque citoyen majeur dispose d’une voix égale.' },
    ],
    methodes: [
      'Distingue toujours dans tes réponses droits civils, droits politiques et devoirs civiques.',
    ],
    erreursFrequentes: [
      'Confondre décentralisation et déconcentration.',
    ],
    exemples: [
      { titre: 'Maire vs Préfet', contenu: 'Le maire incarne la commune décentralisée ; le préfet représente l’État déconcentré.' },
    ],
    resumeExpress:
      'État de droit = suprématie de la Constitution + justice indépendante. Décentralisation = autonomie locale avec élus.',
    tableauComparatif: {
      headers: ['Organisation', 'Autorité', 'Autonomie'],
      rows: [
        { critere: 'Décentralisation', elementA: 'Élue (Maire, Conseil)', elementB: 'Personnalité juridique & budget propre' },
        { critere: 'Déconcentration', elementA: 'Nommée par l’État (Préfet)', elementB: 'Soumise au pouvoir hiérarchique central' },
      ],
    },
    autoEvaluation: [
      { question: 'Qui représente la décentralisation : le maire ou le préfet ?', reponse: 'Le maire (autorité élue locale).' },
    ],
  },
  {
    id: 'fiche-civ-droits',
    subjectId: 'educ_civique',
    chapterId: 'ch-civ-droits',
    title: 'Droits humains (DUDH 1948) & Déontologie publique',
    subtitle: 'Textes internationaux, Charte africaine et intégrité',
    sizeKb: 48,
    notionsEssentielles: [
      'DUDH : adoptée le 10 décembre 1948 par l’Assemblée générale de l’ONU.',
      'Charte africaine des droits de l’homme et des peuples : adoptée en juin 1981 à Nairobi.',
      'Déontologie publique : probité, neutralité, continuité et égalité devant le service public.',
    ],
    definitions: [
      { terme: 'Probité', definition: 'Honnêteté stricte interdisant toute corruption, favoritisme ou enrichissement illicite.' },
    ],
    formules: [
      { label: 'Dates repères', formule: '10 déc. 1948 (DUDH)  |  Juin 1981 (Charte africaine)' },
    ],
    datesReperes: [
      { repere: '10 décembre 1948', detail: 'Adoption de la Déclaration Universelle des Droits de l’Homme.' },
      { repere: 'Juin 1981', detail: 'Adoption de la Charte africaine des droits de l’homme et des peuples.' },
    ],
    methodes: [
      'Cite toujours la date exacte et l’institution (ONU / OUA-UA) dans les concours administratifs.',
    ],
    erreursFrequentes: [
      'Confondre 1945 (création de l’ONU) et 1948 (adoption de la DUDH).',
    ],
    exemples: [
      { titre: 'Article 1er DUDH', contenu: '« Tous les êtres humains naissent libres et égaux en dignité et en droits. »' },
    ],
    resumeExpress:
      '10 déc. 1948 = DUDH (ONU). 1981 = Charte africaine. Agent public = probité, neutralité et intérêt général.',
    tableauComparatif: {
      headers: ['Texte', 'Date & Origine', 'Portée'],
      rows: [
        { critere: 'DUDH', elementA: '10 déc. 1948 (ONU)', elementB: 'Universelle — 30 articles fondateurs' },
        { critere: 'Charte africaine', elementA: 'Juin 1981 (OUA / Nairobi)', elementB: 'Droits individuels, des peuples et devoirs' },
      ],
    },
    autoEvaluation: [
      { question: 'Quelle est la date exacte de la DUDH ?', reponse: '10 décembre 1948.' },
    ],
  },
  {
    id: 'fiche-esp-base',
    subjectId: 'espagnol',
    chapterId: 'ch-esp-base',
    title: 'Espagnol : Ser vs Estar & Por vs Para',
    subtitle: 'Les deux distinctions qui rapportent le plus de points en LV2',
    sizeKb: 48,
    notionsEssentielles: [
      'SER : identité, origine, profession, heure, caractéristique durable.',
      'ESTAR : localisation (TOUJOURS!), état passager, émotion, gérondif.',
      'POR : cause, remerciement, moyen, prix. PARA : but, destinataire, date limite.',
    ],
    definitions: [
      { terme: 'Gracias por', definition: 'Cause du remerciement — jamais « gracias para ».' },
    ],
    formules: [
      { label: 'Lieu', formule: 'Localisation géographique = ESTAR (100 % des cas)' },
      { label: 'But vs Cause', formule: 'PARA + but/objectif  |  POR + cause/moyen' },
    ],
    datesReperes: [
      { repere: 'Réflexe Bac', detail: 'Vérifie chaque « être » : est-ce un lieu ou un état ? Si oui ⇒ ESTAR.' },
    ],
    methodes: [
      'Pour Por/Para, demande-toi si on peut remplacer par « afin de » (= PARA) ou « à cause de / en échange de » (= POR).',
    ],
    erreursFrequentes: [
      'Écrire « Madrid es en España » au lieu de « Madrid está en España ».',
    ],
    exemples: [
      { titre: 'Contraste classique', contenu: '« Soy de Chad y estoy en clase para estudiar. »' },
    ],
    resumeExpress:
      'Lieu & état temporaire ⇒ ESTAR. Identité & heure ⇒ SER. But/destinataire ⇒ PARA. Cause/prix ⇒ POR.',
    tableauComparatif: {
      headers: ['Usage', 'Choix correct', 'Exemple'],
      rows: [
        { critere: 'Localisation', elementA: 'ESTAR', elementB: 'La escuela está aquí.' },
        { critere: 'But / Objectif', elementA: 'PARA', elementB: 'Estudio para aprobar.' },
        { critere: 'Cause / Merci', elementA: 'POR', elementB: 'Gracias por tu ayuda.' },
      ],
    },
    autoEvaluation: [
      { question: 'Ser ou Estar dans « Mi casa ___ grande y ___ lejos » ?', reponse: 'Mi casa ES grande y ESTÁ lejos.' },
    ],
  },
  {
    id: 'fiche-esp-subj',
    subjectId: 'espagnol',
    chapterId: 'ch-esp-subj',
    title: 'Subjonctif présent & Connecteurs d’essai en espagnol',
    subtitle: 'Terminaisons croisées, Cuando + futur et link words',
    sizeKb: 48,
    notionsEssentielles: [
      'Terminaisons croisées : -AR → -e ; -ER/-IR → -a.',
      'Cuando + action future ⇒ SUBJONCTIF PRÉSENT obligatoire.',
      'Connecteurs clés : Además (de plus), Sin embargo (cependant), Por lo tanto (donc).',
    ],
    definitions: [
      { terme: 'Sin embargo', definition: 'Connecteur d’opposition équivalent à « cependant / néanmoins ».' },
    ],
    formules: [
      { label: 'Règle Cuando', formule: 'Cuando + Subjonctif présent, Futur simple' },
    ],
    datesReperes: [
      { repere: 'Déclencheurs du subjonctif', detail: 'Ojalá, quiero que, es necesario que, para que, cuando (+ futur).' },
    ],
    methodes: [
      'Repère d’abord le temps de la principale : s’il est au futur ou à l’impératif, « cuando » exige le subjonctif.',
    ],
    erreursFrequentes: [
      'Mettre le futur juste après « cuando » (calque fautif du français « quand tu finiras »).',
    ],
    exemples: [
      { titre: 'Phrase modèle', contenu: '« Cuando termines tus deberes, podrás descansar. »' },
    ],
    resumeExpress:
      '-AR→-e, -ER/-IR→-a. Jamais de futur après « cuando » : toujours subjonctif présent !',
    tableauComparatif: {
      headers: ['Connecteur espagnol', 'Traduction française', 'Rôle'],
      rows: [
        { critere: 'Además', elementA: 'De plus', elementB: 'Addition' },
        { critere: 'Sin embargo', elementA: 'Cependant / Toutefois', elementB: 'Opposition' },
        { critere: 'Por lo tanto', elementA: 'Par conséquent / Donc', elementB: 'Conséquence' },
      ],
    },
    autoEvaluation: [
      { question: 'Traduis : « Quand tu arriveras (llegar) »', reponse: '« Cuando llegues » (subjonctif présent).' },
    ],
  },
];

export const MEGA_FLASHCARDS: Flashcard[] = [
  // Psychotechnique
  {
    id: 'fc-psy-1',
    subjectId: 'psychotechnique',
    chapterId: 'ch-psy-calcul',
    question: 'Un prix augmente de 20 % puis baisse de 20 %. Quelle est la variation globale ?',
    answer: 'Une baisse de −4 % (1,20 × 0,80 = 0,96), et jamais 0 % !',
    formula: 'CM = 1,20 × 0,80 = 0,96',
  },
  {
    id: 'fc-psy-2',
    subjectId: 'psychotechnique',
    chapterId: 'ch-psy-calcul',
    question: 'Comment calculer la vitesse moyenne sur un aller-retour à v₁ et v₂ ?',
    answer: 'On divise la distance totale par le temps total (moyenne harmonique).',
    formula: 'v_moy = 2v₁v₂ / (v₁ + v₂)',
  },
  {
    id: 'fc-psy-3',
    subjectId: 'psychotechnique',
    chapterId: 'ch-psy-suites',
    question: 'Si « Tous les A sont B », peut-on en déduire « Tous les B sont A » ?',
    answer: 'Non ! On peut seulement déduire « Certains B sont A » et « Aucun non-B n’est A » (contraposée).',
  },
  // Statistiques
  {
    id: 'fc-st-1',
    subjectId: 'statistiques',
    chapterId: 'ch-stat-desc',
    question: 'Quelle est la première étape obligatoire avant de déterminer la médiane d’une série ?',
    answer: 'Ordonner toutes les valeurs par ordre croissant.',
  },
  {
    id: 'fc-st-2',
    subjectId: 'statistiques',
    chapterId: 'ch-stat-probas',
    question: 'Quelle formule caractérise deux événements A et B indépendants ?',
    answer: 'P(A ∩ B) = P(A) × P(B) (à ne pas confondre avec incompatibles : P(A ∩ B) = 0).',
    formula: 'P(A ∩ B) = P(A) · P(B)',
  },
  {
    id: 'fc-st-3',
    subjectId: 'statistiques',
    chapterId: 'ch-stat-probas',
    question: 'Que valent l’espérance et la variance d’une loi binomiale B(n, p) ?',
    answer: 'E(X) = n · p  et  V(X) = n · p · (1 − p).',
    formula: 'E(X) = np   |   V(X) = np(1 − p)',
  },
  // Pédagogie
  {
    id: 'fc-ped-1',
    subjectId: 'pedagogie',
    chapterId: 'ch-ped-apc',
    question: 'Cite dans l’ordre les 6 niveaux de la taxonomie de Bloom révisée.',
    answer: '1. Mémoriser · 2. Comprendre · 3. Appliquer · 4. Analyser · 5. Évaluer · 6. Créer.',
  },
  {
    id: 'fc-ped-2',
    subjectId: 'pedagogie',
    chapterId: 'ch-ped-eval',
    question: 'Quelle différence entre évaluation diagnostique, formative et sommative ?',
    answer: 'Diagnostique = AVANT (situer) · Formative = PENDANT (remédier sans sanction) · Sommative = APRÈS (noter/certifier).',
  },
  {
    id: 'fc-ped-3',
    subjectId: 'pedagogie',
    chapterId: 'ch-ped-apc',
    question: 'Quel est le statut de l’erreur dans l’Approche par Compétences (APC) ?',
    answer: 'C’est un indicateur constructif des obstacles cognitifs de l’élève, servant de levier de remédiation.',
  },
  // Marketing & Entrepreneuriat
  {
    id: 'fc-mkt-1',
    subjectId: 'marketing_entrep',
    chapterId: 'ch-mkt-bmc',
    question: 'Comment calculer le seuil de rentabilité en nombre d’unités vendues ?',
    answer: 'On divise les Charges Fixes par la Marge unitaire sur coût variable (Prix unitaire − Coût variable unitaire).',
    formula: 'SR_q = CF / (P_u − CV_u)',
  },
  {
    id: 'fc-mkt-2',
    subjectId: 'marketing_entrep',
    chapterId: 'ch-mkt-digital',
    question: 'Quels sont les 4P du Mix Marketing ?',
    answer: 'Produit (Product), Prix (Price), Distribution (Place) et Communication (Promotion).',
  },
  {
    id: 'fc-mkt-3',
    subjectId: 'marketing_entrep',
    chapterId: 'ch-mkt-digital',
    question: 'SEO vs SEA : quelle différence ?',
    answer: 'SEO = référencement naturel gratuit et durable ; SEA = publicité payante au clic sur les moteurs de recherche.',
  },
  // Éducation Civique
  {
    id: 'fc-civ-1',
    subjectId: 'educ_civique',
    chapterId: 'ch-civ-etat',
    question: 'Quelle différence entre décentralisation et déconcentration ?',
    answer: 'Décentralisation = transfert vers des collectivités locales élues (maire) ; Déconcentration = agents nommés par l’État (préfet).',
  },
  {
    id: 'fc-civ-2',
    subjectId: 'educ_civique',
    chapterId: 'ch-civ-droits',
    question: 'Quelle est la date d’adoption de la DUDH par l’ONU ?',
    answer: 'Le 10 décembre 1948 à Paris.',
  },
  {
    id: 'fc-civ-3',
    subjectId: 'educ_civique',
    chapterId: 'ch-civ-droits',
    question: 'En quelle année a été adoptée la Charte africaine des droits de l’homme et des peuples ?',
    answer: 'En juin 1981 à Nairobi (Kenya).',
  },
  // Espagnol
  {
    id: 'fc-esp-1',
    subjectId: 'espagnol',
    chapterId: 'ch-esp-base',
    question: 'Quel verbe utilise-t-on TOUJOURS pour localiser un lieu en espagnol ?',
    answer: 'ESTAR (ex. « La escuela está en el centro »).',
  },
  {
    id: 'fc-esp-2',
    subjectId: 'espagnol',
    chapterId: 'ch-esp-base',
    question: 'Por ou Para pour exprimer le BUT et pour exprimer la CAUSE ?',
    answer: 'PARA pour le but / destinataire ; POR pour la cause / remerciement (« Gracias por... »).',
  },
  {
    id: 'fc-esp-3',
    subjectId: 'espagnol',
    chapterId: 'ch-esp-subj',
    question: 'Quel mode emploie-t-on après « cuando » lorsqu’on parle d’une action future ?',
    answer: 'Le SUBJONCTIF PRÉSENT (ex. « Cuando termines, descansarás »).',
  },
];
