import { Chapter, Course, ExamTrack, Subject, UserCategory } from '../types';

export const COUNTRIES = [
  'Tchad',
  'Sénégal',
  "Côte d'Ivoire",
  'Cameroun',
  'France',
  'Mali',
  'Burkina Faso',
  'Bénin',
  'Togo',
  'Niger',
  'Gabon',
  'Congo',
  'RDC',
  'Maroc',
  'Tunisie',
  'Algérie',
  'Madagascar',
  'Belgique',
  'Suisse',
  'Canada',
  'Autre',
];

export const STUDY_LEVELS = [
  'Seconde / 2nde',
  'Première S / 1ère C-D (scientifique)',
  'Première L / 1ère A4-A5 (littéraire)',
  'Terminale (Baccalauréat)',
  'Licence 1 / BTS 1',
  'Licence 2 / BTS 2',
  'Licence 3 / Bachelor',
  'Master 1 / Master 2',
  'Candidat libre / Concours administratif',
  'Professionnel en activité / Reconversion',
];

export const USER_CATEGORIES: {
  id: UserCategory;
  label: string;
  description: string;
}[] = [
  {
    id: 'lyceen',
    label: 'Élève du secondaire',
    description: 'Baccalauréat, BEPC, devoirs surveillés',
  },
  {
    id: 'etudiant',
    label: 'Étudiant à l’université',
    description: 'Licence, BTS, DUT, Master, partiels',
  },
  {
    id: 'concours_admin',
    label: 'Candidat concours administratif',
    description: 'ENAM, Fonction Publique, Douanes, Trésor',
  },
  {
    id: 'grandes_ecoles',
    label: 'Candidat grandes écoles',
    description: 'Écoles d’ingénieurs, médecine, commerce',
  },
  {
    id: 'certification_pro',
    label: 'Certification professionnelle',
    description: 'Gestion de projet, numérique, cybersécurité',
  },
  {
    id: 'reconversion',
    label: 'Adulte en reconversion',
    description: 'Reprise d’études ou titre professionnel',
  },
  {
    id: 'enseignant',
    label: 'Enseignant / Formateur',
    description: 'Création de sujets, fiches et suivi de classe',
  },
  {
    id: 'etablissement',
    label: 'Établissement / Organisme',
    description: 'Déploiement hors ligne pour un centre de formation',
  },
];

export const EXAMS: ExamTrack[] = [
  {
    id: 'bac-scientifique',
    name: 'Baccalauréat Scientifique (Séries C, D & S)',
    shortName: 'Bac Scientifique',
    category: 'Secondaire',
    description:
      'Préparation complète aux épreuves scientifiques et littéraires du Baccalauréat : Maths, Physique-Chimie, SVT et Philosophie.',
    level: 'Terminale',
    subjectIds: ['maths', 'physique', 'svt', 'philo'],
    badgeColor: '#1D4ED8',
  },
  {
    id: 'concours-admin',
    name: 'Concours Administratif (ENAM & Fonction Publique)',
    shortName: 'Concours ENAM / FP',
    category: 'Concours',
    description:
      'Droit constitutionnel, culture générale, économie publique et logique pour réussir les concours de catégorie A et B.',
    level: 'Bac+2 à Master',
    subjectIds: ['droit', 'culture_gen', 'economie', 'maths'],
    badgeColor: '#059669',
  },
  {
    id: 'licence-droit-eco',
    name: 'Examen Universitaire — Licence Droit & Économie',
    shortName: 'Licence Droit-Éco',
    category: 'Université',
    description:
      'Révision des fondamentaux de licence : institutions publiques, microéconomie, macroéconomie et méthodologie.',
    level: 'Licence 1 à 3',
    subjectIds: ['droit', 'economie', 'culture_gen'],
    badgeColor: '#7C3AED',
  },
  {
    id: 'certif-pro',
    name: 'Certification Professionnelle — Projet & Numérique',
    shortName: 'Certif. Projet & IT',
    category: 'Certification Pro',
    description:
      'Gestion de projet Agile/Cycle en V, cybersécurité, protection des données et pilotage de la performance.',
    level: 'Professionnel',
    subjectIds: ['gestion_projet', 'cybersecurite', 'economie'],
    isPremium: true,
    badgeColor: '#D97706',
  },
];

export const SUBJECTS: Subject[] = [
  {
    id: 'maths',
    name: 'Mathématiques',
    shortName: 'Maths',
    examIds: ['bac-scientifique', 'concours-admin'],
    color: '#1D4ED8',
    icon: 'Calculator',
    description:
      'Équations du second degré, dérivées, limites, probabilités et suites numériques.',
    sizeKb: 680,
  },
  {
    id: 'physique',
    name: 'Physique-Chimie',
    shortName: 'Physique',
    examIds: ['bac-scientifique'],
    color: '#0284C7',
    icon: 'Atom',
    description:
      'Mécanique de Newton, circuits électriques RC, acides-bases et cinétique chimique.',
    sizeKb: 740,
  },
  {
    id: 'svt',
    name: 'Sciences de la Vie et de la Terre',
    shortName: 'SVT',
    examIds: ['bac-scientifique'],
    color: '#059669',
    icon: 'Dna',
    description:
      'Génétique et mitose, immunologie, tectonique des plaques et métabolisme cellulaire.',
    sizeKb: 620,
  },
  {
    id: 'philo',
    name: 'Philosophie',
    shortName: 'Philo',
    examIds: ['bac-scientifique'],
    color: '#7C3AED',
    icon: 'BookOpen',
    description:
      'Conscience et liberté, État et justice, vérité scientifique et méthodologie de dissertation.',
    sizeKb: 410,
  },
  {
    id: 'droit',
    name: 'Droit Constitutionnel & Administratif',
    shortName: 'Droit',
    examIds: ['concours-admin', 'licence-droit-eco'],
    color: '#B45309',
    icon: 'Scale',
    description:
      'Séparation des pouvoirs, hiérarchie des normes, service public et acte administratif.',
    sizeKb: 540,
  },
  {
    id: 'culture_gen',
    name: 'Culture Générale & Institutions',
    shortName: 'Culture Gén.',
    examIds: ['concours-admin', 'licence-droit-eco'],
    color: '#0F766E',
    icon: 'Globe',
    description:
      'Institutions africaines et internationales (UA, CEMAC, CEDEAO, ONU), histoire contemporaine et enjeux civiques.',
    sizeKb: 490,
  },
  {
    id: 'economie',
    name: 'Économie Générale',
    shortName: 'Économie',
    examIds: ['concours-admin', 'licence-droit-eco', 'certif-pro'],
    color: '#047857',
    icon: 'TrendingUp',
    description:
      'Marché, offre et demande, PIB, inflation, politique budgétaire et commerce international.',
    sizeKb: 530,
  },
  {
    id: 'gestion_projet',
    name: 'Gestion de Projet (Agile & Classique)',
    shortName: 'Gestion Projet',
    examIds: ['certif-pro'],
    color: '#D97706',
    icon: 'Kanban',
    description:
      'Cycle en V, méthode Scrum, diagramme de Gantt, gestion des risques et budget.',
    sizeKb: 460,
    isPremium: true,
  },
  {
    id: 'cybersecurite',
    name: 'Cybersécurité & Protection des Données',
    shortName: 'Cybersécurité',
    examIds: ['certif-pro'],
    color: '#DC2626',
    icon: 'ShieldCheck',
    description:
      'Chiffrement, authentification forte, phishing, RGPD et hygiène numérique.',
    sizeKb: 420,
    isPremium: true,
  },
];

export const CHAPTERS: Chapter[] = [
  // Maths
  {
    id: 'ch-maths-second-degre',
    subjectId: 'maths',
    title: 'Équations et fonctions du second degré',
    order: 1,
    summary: 'Discriminant Δ, racines, factorisation, signe du trinôme et parabole.',
    estimatedMinutes: 35,
    difficulty: 'moyen',
    courseId: 'course-maths-second-degre',
    ficheId: 'fiche-maths-second-degre',
  },
  {
    id: 'ch-maths-derivees',
    subjectId: 'maths',
    title: 'Dérivation et étude de fonctions',
    order: 2,
    summary: 'Nombre dérivé, règles de dérivation, tangente et tableau de variations.',
    estimatedMinutes: 40,
    difficulty: 'moyen',
    courseId: 'course-maths-derivees',
    ficheId: 'fiche-maths-derivees',
  },
  {
    id: 'ch-maths-probas',
    subjectId: 'maths',
    title: 'Probabilités conditionnelles et loi binomiale',
    order: 3,
    summary: 'Arbres pondérés, formule des probabilités totales, espérance et variance.',
    estimatedMinutes: 35,
    difficulty: 'difficile',
    courseId: 'course-maths-probas',
    ficheId: 'fiche-maths-probas',
  },
  // Physique
  {
    id: 'ch-phys-rc',
    subjectId: 'physique',
    title: 'Dipôle RC et circuits électriques',
    order: 1,
    summary: 'Loi d’Ohm, charge/décharge d’un condensateur, constante de temps τ = RC.',
    estimatedMinutes: 35,
    difficulty: 'moyen',
    courseId: 'course-phys-rc',
    ficheId: 'fiche-phys-rc',
  },
  {
    id: 'ch-phys-meca',
    subjectId: 'physique',
    title: 'Lois de Newton et chute libre',
    order: 2,
    summary: 'Principe d’inertie, seconde loi de Newton, énergie cinétique et potentielle.',
    estimatedMinutes: 40,
    difficulty: 'moyen',
    courseId: 'course-phys-meca',
    ficheId: 'fiche-phys-meca',
  },
  // SVT
  {
    id: 'ch-svt-mitose',
    subjectId: 'svt',
    title: 'Division cellulaire : Mitose et Méiose',
    order: 1,
    summary: 'Cycle cellulaire, réplication de l’ADN, phases de la mitose et brassage génétique.',
    estimatedMinutes: 30,
    difficulty: 'facile',
    courseId: 'course-svt-mitose',
    ficheId: 'fiche-svt-mitose',
  },
  // Philo
  {
    id: 'ch-philo-liberte',
    subjectId: 'philo',
    title: 'La conscience, la liberté et le devoir',
    order: 1,
    summary: 'Descartes, Kant, Sartre : sujet conscient, autonomie morale et responsabilité.',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-philo-liberte',
    ficheId: 'fiche-philo-liberte',
  },
  // Droit
  {
    id: 'ch-droit-pouvoirs',
    subjectId: 'droit',
    title: 'Séparation des pouvoirs et hiérarchie des normes',
    order: 1,
    summary: 'Montesquieu, pyramide de Kelsen, régimes présidentiel et parlementaire.',
    estimatedMinutes: 35,
    difficulty: 'moyen',
    courseId: 'course-droit-pouvoirs',
    ficheId: 'fiche-droit-pouvoirs',
  },
  // Culture Générale
  {
    id: 'ch-cg-institutions',
    subjectId: 'culture_gen',
    title: 'Institutions africaines et internationales',
    order: 1,
    summary: 'Union Africaine, CEMAC, CEDEAO, ONU : missions, sièges et organes clés.',
    estimatedMinutes: 25,
    difficulty: 'facile',
    courseId: 'course-cg-institutions',
    ficheId: 'fiche-cg-institutions',
  },
  // Économie
  {
    id: 'ch-eco-marche',
    subjectId: 'economie',
    title: 'Offre, demande et équilibre de marché',
    order: 1,
    summary: 'Loi de la demande, élasticité-prix, PIB et lutte contre l’inflation.',
    estimatedMinutes: 30,
    difficulty: 'moyen',
    courseId: 'course-eco-marche',
    ficheId: 'fiche-eco-marche',
  },
  // Gestion de projet
  {
    id: 'ch-gp-agile',
    subjectId: 'gestion_projet',
    title: 'Méthodes Agile (Scrum) vs Cycle en V',
    order: 1,
    summary: 'Sprints, Product Backlog, rôles Scrum et triangle Qualité-Coût-Délai.',
    estimatedMinutes: 30,
    difficulty: 'facile',
    courseId: 'course-gp-agile',
    ficheId: 'fiche-gp-agile',
  },
  // Cybersécurité
  {
    id: 'ch-cyber-bases',
    subjectId: 'cybersecurite',
    title: 'Fondamentaux de la sécurité et chiffrement',
    order: 1,
    summary: 'Triade DIC, phishing, authentification multifacteur et protection des données.',
    estimatedMinutes: 25,
    difficulty: 'facile',
    courseId: 'course-cyber-bases',
    ficheId: 'fiche-cyber-bases',
  },
];

export const COURSES: Course[] = [
  {
    id: 'course-maths-second-degre',
    subjectId: 'maths',
    chapterId: 'ch-maths-second-degre',
    title: 'Maîtriser les équations du second degré',
    durationMinutes: 25,
    sizeKb: 145,
    updatedAt: '2026-10-15',
    sections: [
      {
        id: 'sec-m1',
        heading: '1. Forme générale et discriminant Δ',
        content:
          'Une équation du second degré s’écrit ax² + bx + c = 0 avec a ≠ 0. Pour déterminer le nombre de solutions réelles sans tâtonner, on calcule le discriminant Δ = b² − 4ac. C’est la clé qui commande tout le chapitre : nombre de racines, factorisation et signe du trinôme.',
        formula: 'Δ = b² − 4ac',
        keyTakeaway:
          'Vérifie toujours les signes de a, b et c avant de remplacer dans Δ = b² − 4ac.',
        diagramId: 'parabole',
      },
      {
        id: 'sec-m2',
        heading: '2. Les trois cas selon le signe de Δ',
        content:
          '• Si Δ > 0 : deux racines réelles distinctes x₁ = (−b − √Δ) / (2a) et x₂ = (−b + √Δ) / (2a). Le trinôme se factorise en a(x − x₁)(x − x₂).\n• Si Δ = 0 : une racine double x₀ = −b / (2a). Factorisation : a(x − x₀)².\n• Si Δ < 0 : aucune racine réelle. Le trinôme garde toujours le signe de a sur ℝ.',
        formula: 'x₁,₂ = (−b ± √Δ) / (2a)',
        keyTakeaway:
          'Lorsque Δ > 0, le trinôme est du signe de a à l’extérieur des racines et du signe de (−a) entre les racines.',
      },
      {
        id: 'sec-m3',
        heading: '3. Somme, produit et sommet de la parabole',
        content:
          'Si x₁ et x₂ existent, leur somme vaut S = x₁ + x₂ = −b/a et leur produit vaut P = x₁·x₂ = c/a. Cette astuce permet souvent de trouver une deuxième racine de tête quand une racine évidente (comme 1 ou −1) apparaît. Le sommet de la parabole a pour abscisse α = −b/(2a).',
        formula: 'S = −b/a   |   P = c/a   |   α = −b/(2a)',
        keyTakeaway:
          'Avant de calculer Δ, teste mentalement x = 1 et x = −1 pour gagner du temps le jour de l’examen.',
      },
    ],
  },
  {
    id: 'course-maths-derivees',
    subjectId: 'maths',
    chapterId: 'ch-maths-derivees',
    title: 'Dérivation, tangentes et variations',
    durationMinutes: 30,
    sizeKb: 152,
    updatedAt: '2026-10-18',
    sections: [
      {
        id: 'sec-md1',
        heading: '1. Interprétation géométrique',
        content:
          'Le nombre dérivé f’(a) représente le coefficient directeur (la pente) de la tangente à la courbe de f au point d’abscisse a. L’équation réduite de cette tangente est y = f’(a)(x − a) + f(a).',
        formula: 'T : y = f’(a)(x − a) + f(a)',
        keyTakeaway: 'Si f’(a) = 0, la tangente au point d’abscisse a est horizontale.',
      },
      {
        id: 'sec-md2',
        heading: '2. Règles opératoires indispensables',
        content:
          'Pour deux fonctions dérivables u et v : (u + v)’ = u’ + v’, (u·v)’ = u’v + uv’, et (u/v)’ = (u’v − uv’) / v² (avec v ≠ 0). Pour les puissances : (xⁿ)’ = n·xⁿ⁻¹. Pour le logarithme et l’exponentielle : (ln x)’ = 1/x et (eˣ)’ = eˣ.',
        formula: '(u/v)’ = (u’v − uv’) / v²',
        keyTakeaway:
          'Attention au signe MOINS dans la dérivée d’un quotient ! Ne confonds jamais u’v − uv’ avec u’v + uv’.',
      },
    ],
  },
  {
    id: 'course-maths-probas',
    subjectId: 'maths',
    chapterId: 'ch-maths-probas',
    title: 'Probabilités conditionnelles et loi binomiale',
    durationMinutes: 25,
    sizeKb: 138,
    updatedAt: '2026-10-12',
    sections: [
      {
        id: 'sec-mp1',
        heading: '1. Probabilité conditionnelle et indépendance',
        content:
          'La probabilité de B sachant A (avec P(A) > 0) vaut P_A(B) = P(A ∩ B) / P(A). Deux événements A et B sont indépendants si et seulement si P(A ∩ B) = P(A) × P(B).',
        formula: 'P_A(B) = P(A ∩ B) / P(A)',
        keyTakeaway:
          'Sur un arbre pondéré, la somme des probabilités issues d’un même nœud vaut toujours 1.',
      },
      {
        id: 'sec-mp2',
        heading: '2. Loi binomiale B(n, p)',
        content:
          'Lorsqu’on répète n épreuves de Bernoulli identiques et indépendantes de probabilité de succès p, la variable aléatoire X comptant le nombre de succès suit la loi B(n, p). Son espérance est E(X) = n·p et sa variance V(X) = n·p·(1 − p).',
        formula: 'E(X) = n·p   |   P(X = k) = C(n,k) · pᵏ · (1 − p)ⁿ⁻ᵏ',
        keyTakeaway:
          'Cite toujours les trois mots-clés pour justifier une loi binomiale : répétition, identiques, indépendantes.',
      },
    ],
  },
  {
    id: 'course-phys-rc',
    subjectId: 'physique',
    chapterId: 'ch-phys-rc',
    title: 'Charge et décharge d’un dipôle RC',
    durationMinutes: 25,
    sizeKb: 168,
    updatedAt: '2026-10-20',
    sections: [
      {
        id: 'sec-p1',
        heading: '1. Loi d’Ohm et relation courant-charge',
        content:
          'Aux bornes d’un conducteur ohmique de résistance R, u_R = R·i. Pour un condensateur de capacité C (en Farads), la charge stockée vaut q = C·u_C et l’intensité vaut i = dq/dt = C·(du_C/dt). La tension aux bornes d’un condensateur est toujours une fonction continue du temps.',
        formula: 'u_R = R·i   |   q = C·u_C   |   i = C·du_C/dt',
        keyTakeaway:
          'Un condensateur ne peut pas subir de saut brusque de tension à l’instant t = 0.',
        diagramId: 'circuit_rc',
      },
      {
        id: 'sec-p2',
        heading: '2. Constante de temps τ et régime permanent',
        content:
          'Lors de la charge sous une tension E, la solution de l’équation différentielle τ·(du_C/dt) + u_C = E est u_C(t) = E·(1 − e^(−t/τ)), avec τ = R·C (en secondes). À t = τ, le condensateur est chargé à 63 % de E. On considère la charge terminée au bout de 5τ (99,3 %).',
        formula: 'τ = R·C   |   u_C(t) = E(1 − e⁻ᵗ/ᵀ)',
        keyTakeaway:
          'Graphiquement, la tangente à l’origine coupe l’asymptote horizontale y = E à l’abscisse t = τ.',
      },
    ],
  },
  {
    id: 'course-phys-meca',
    subjectId: 'physique',
    chapterId: 'ch-phys-meca',
    title: 'Les trois lois de Newton et mécanique',
    durationMinutes: 30,
    sizeKb: 140,
    updatedAt: '2026-10-10',
    sections: [
      {
        id: 'sec-pm1',
        heading: '1. Seconde loi de Newton',
        content:
          'Dans un référentiel galiléen, la somme vectorielle des forces extérieures appliquées à un système de masse m constante est égale au produit de sa masse par le vecteur accélération de son centre d’inertie : ΣF_ext = m·a.',
        formula: 'ΣF_ext = m · a',
        keyTakeaway:
          'Précise toujours le système étudié, le référentiel galiléen et le bilan des forces avant d’écrire ΣF = m·a.',
      },
      {
        id: 'sec-pm2',
        heading: '2. Conservation de l’énergie mécanique',
        content:
          'L’énergie mécanique vaut E_m = E_c + E_p = ½mv² + mgz. En l’absence de frottements (forces non conservatives), E_m reste constante au cours du mouvement.',
        formula: 'E_m = ½mv² + mgz = constante (sans frottements)',
        keyTakeaway:
          'En chute libre sans vitesse initiale sur une hauteur h, la vitesse atteinte vaut v = √(2gh), indépendamment de la masse !',
      },
    ],
  },
  {
    id: 'course-svt-mitose',
    subjectId: 'svt',
    chapterId: 'ch-svt-mitose',
    title: 'Mitose, Méiose et transmission génétique',
    durationMinutes: 20,
    sizeKb: 155,
    updatedAt: '2026-10-14',
    sections: [
      {
        id: 'sec-s1',
        heading: '1. La mitose : reproduction conforme (PMAT)',
        content:
          'La mitose produit à partir d’une cellule mère (2n) deux cellules filles génétiquement identiques (2n). Elle se déroule en 4 phases mémorisables par l’acronyme PMAT : Prophase (condensation), Métaphase (alignement sur la plaque équatoriale), Anaphase (séparation des chromatides sœurs), Télophase (formation de deux noyaux).',
        keyTakeaway:
          'La réplication semi-conservative de l’ADN a lieu pendant la phase S de l’interphase, AVANT la mitose.',
        diagramId: 'mitose',
      },
      {
        id: 'sec-s2',
        heading: '2. La méiose : formation des gamètes',
        content:
          'La méiose comporte deux divisions successives (réductionnelle puis équationnelle) aboutissant à 4 cellules haploïdes (n chromosomes) génétiquement différentes grâce aux brassages intrachromosomique (crossing-over) et interchromosomique.',
        keyTakeaway:
          'Mitose = 1 division → 2 cellules diploïdes identiques. Méiose = 2 divisions → 4 gamètes haploïdes uniques.',
      },
    ],
  },
  {
    id: 'course-philo-liberte',
    subjectId: 'philo',
    chapterId: 'ch-philo-liberte',
    title: 'Conscience, liberté et responsabilité morale',
    durationMinutes: 20,
    sizeKb: 112,
    updatedAt: '2026-10-08',
    sections: [
      {
        id: 'sec-ph1',
        heading: '1. La conscience comme fondement du sujet',
        content:
          'Chez René Descartes (« Je pense, donc je suis »), la conscience est la première certitude qui résiste au doute méthodique. Être conscient, c’est se savoir exister et pouvoir réfléchir sur ses actes, ce qui fonde notre responsabilité morale.',
        keyTakeaway:
          'Distingue toujours la conscience immédiate (percevoir) de la conscience réflexive (se regarder penser) et de la conscience morale (juger le bien et le mal).',
      },
      {
        id: 'sec-ph2',
        heading: '2. Liberté et autonomie',
        content:
          'La liberté n’est pas le caprice de faire tout ce qui nous passe par la tête. Pour Rousseau et Kant, être libre c’est obéir à la loi que l’on s’est prescrite par la raison (autonomie). Pour Spinoza, le libre arbitre absolu est une illusion : nous sommes libres lorsque nous comprenons les causes qui nous déterminent.',
        keyTakeaway:
          'En dissertation, confronte toujours une thèse (liberté = autonomie rationnelle) avec son objection (déterminisme social ou psychique).',
      },
    ],
  },
  {
    id: 'course-droit-pouvoirs',
    subjectId: 'droit',
    chapterId: 'ch-droit-pouvoirs',
    title: 'Séparation des pouvoirs et État de droit',
    durationMinutes: 25,
    sizeKb: 134,
    updatedAt: '2026-10-21',
    sections: [
      {
        id: 'sec-d1',
        heading: '1. La théorie de Montesquieu',
        content:
          'Dans De l’esprit des lois (1748), Montesquieu formule le principe fondamental : « Pour qu’on ne puisse abuser du pouvoir, il faut que, par la disposition des choses, le pouvoir arrête le pouvoir. » Il distingue trois fonctions : législative (faire la loi), exécutive (appliquer la loi) et judiciaire (trancher les litiges).',
        keyTakeaway:
          'La séparation peut être souple (régime parlementaire, collaboration et responsabilité politique) ou stricte (régime présidentiel).',
        diagramId: 'separation_pouvoirs',
      },
      {
        id: 'sec-d2',
        heading: '2. La hiérarchie des normes (Pyramide de Kelsen)',
        content:
          'Dans un État de droit, chaque norme tire sa validité de sa conformité à la norme supérieure : Bloc de constitutionnalité (sommet) > Traités internationaux ratifiés > Lois (organiques puis ordinaires) > Règlements (décrets, arrêtés). Le Conseil ou la Cour constitutionnelle contrôle la constitutionnalité des lois.',
        keyTakeaway:
          'Un décret administratif ne peut jamais contredire une loi, qui elle-même doit respecter la Constitution.',
      },
    ],
  },
  {
    id: 'course-cg-institutions',
    subjectId: 'culture_gen',
    chapterId: 'ch-cg-institutions',
    title: 'Institutions africaines et internationales clés',
    durationMinutes: 20,
    sizeKb: 120,
    updatedAt: '2026-10-19',
    sections: [
      {
        id: 'sec-cg1',
        heading: '1. Union Africaine et intégration régionale',
        content:
          'L’Union Africaine (UA), lancée en 2002 pour succéder à l’OUA (1963), siège à Addis-Abeba (Éthiopie) et regroupe 55 États membres. En Afrique centrale, la CEMAC (Communauté Économique et Monétaire de l’Afrique Centrale) regroupe 6 pays (Cameroun, Centrafrique, Congo, Gabon, Guinée équatoriale, Tchad) partageant le franc CFA (XAF) émis par la BEAC (siège à Yaoundé).',
        keyTakeaway:
          'Ne confonds pas la CEMAC (6 États, BEAC, zone XAF) avec l’UEMOA (8 États d’Afrique de l’Ouest, BCEAO, zone XOF).',
      },
      {
        id: 'sec-cg2',
        heading: '2. L’ONU et ses organes principaux',
        content:
          'Créée par la Charte de San Francisco en 1945, l’ONU siège à New York. Elle compte 6 organes principaux dont l’Assemblée générale, le Conseil de sécurité (15 membres dont 5 permanents avec droit de veto : Chine, États-Unis, France, Royaume-Uni, Russie) et la Cour internationale de justice (La Haye).',
        keyTakeaway:
          'Seules les résolutions du Conseil de sécurité prises au titre du Chapitre VII ont force juridiquement contraignante.',
      },
    ],
  },
  {
    id: 'course-eco-marche',
    subjectId: 'economie',
    chapterId: 'ch-eco-marche',
    title: 'Mécanismes du marché, PIB et inflation',
    durationMinutes: 25,
    sizeKb: 136,
    updatedAt: '2026-10-17',
    sections: [
      {
        id: 'sec-e1',
        heading: '1. Loi de l’offre, de la demande et équilibre',
        content:
          'Sur un marché concurrentiel, la demande est une fonction décroissante du prix (quand le prix baisse, les consommateurs achètent plus) et l’offre est une fonction croissante du prix (un prix plus élevé incite à produire davantage). Le prix d’équilibre égalise la quantité offerte et la quantité demandée.',
        keyTakeaway:
          'Un prix plafond fixé en dessous du prix d’équilibre crée une pénurie (demande > offre).',
        diagramId: 'offre_demande',
      },
      {
        id: 'sec-e2',
        heading: '2. PIB et inflation',
        content:
          'Le Produit Intérieur Brut (PIB) mesure la somme des valeurs ajoutées créées sur un territoire pendant une période donnée (généralement un an). L’inflation correspond à une hausse générale, durable et auto-entretenue du niveau des prix, réduisant le pouvoir d’achat de la monnaie.',
        formula: 'PIB = Σ Valeurs Ajoutées + Impôts sur produits − Subventions',
        keyTakeaway:
          'Pour mesurer la croissance réelle, on utilise toujours le PIB réel (corrigé de l’inflation), jamais le PIB nominal seul.',
      },
    ],
  },
  {
    id: 'course-gp-agile',
    subjectId: 'gestion_projet',
    chapterId: 'ch-gp-agile',
    title: 'Piloter un projet : Cycle en V et Scrum',
    durationMinutes: 20,
    sizeKb: 128,
    updatedAt: '2026-10-22',
    sections: [
      {
        id: 'sec-gp1',
        heading: '1. Approche prédictive (Cycle en V) vs Agile',
        content:
          'Le Cycle en V planifie toutes les spécifications en amont avant de développer et tester ; il convient aux projets très normés (BTP, aéronautique). L’approche Agile (cadre Scrum) livre de la valeur par itérations courtes appelées Sprints (1 à 4 semaines), permettant de s’adapter rapidement aux retours utilisateurs.',
        keyTakeaway:
          'Les 3 rôles officiels de Scrum sont : Product Owner (quoi/valeur), Scrum Master (méthode/obstacles) et l’équipe de développement (comment).',
        diagramId: 'cycle_projet',
      },
    ],
  },
  {
    id: 'course-cyber-bases',
    subjectId: 'cybersecurite',
    chapterId: 'ch-cyber-bases',
    title: 'Sécurité de l’information et protection des données',
    durationMinutes: 20,
    sizeKb: 118,
    updatedAt: '2026-10-22',
    sections: [
      {
        id: 'sec-cy1',
        heading: '1. La triade DIC et l’authentification forte',
        content:
          'La sécurité informatique repose sur 3 piliers (triade DIC) : Disponibilité (système accessible quand on en a besoin), Intégrité (données non altérées) et Confidentialité (accès réservé aux personnes autorisées). L’authentification multifacteur (MFA) combine au moins deux preuves distinctes : ce que l’on sait (mot de passe), ce que l’on possède (téléphone/clé), ce que l’on est (biométrie).',
        keyTakeaway:
          'Un mot de passe long (12+ caractères) et unique par service + MFA bloque plus de 99 % des attaques automatisées.',
      },
    ],
  },
];
