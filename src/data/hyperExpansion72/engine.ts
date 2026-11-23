import {
  Annale,
  Chapter,
  ClassLevelId,
  Course,
  CourseSection,
  Difficulty,
  ExamTrack,
  Fiche,
  Flashcard,
  Question,
  Subject,
} from '../../types';
import { getClassLevelMeta, getSubjectClassLevels } from './classLevels';

/**
 * Tuple compact pour générer un chapitre complet, un cours détaillé (4 sections),
 * une fiche 6 formats, un exercice QCM corrigé et une flashcard SM-2.
 */
export type HyperTopicTuple = [
  slug: string,
  title: string,
  summary: string,
  keyNotion: string,
  formulaOrRule: string,
  classicTrap: string,
  workedExample: string,
  difficulty: Difficulty,
  classLevel?: ClassLevelId,
];

export interface HyperSubjectPack {
  subjectId: string;
  subjectName: string;
  examIds: string[];
  primaryExamId: string;
  zone: string;
  startOrder: number;
  diagramId?: CourseSection['diagramId'];
  annalesCount?: number;
  topics: HyperTopicTuple[];
}

export interface HyperBundle {
  chapters: Chapter[];
  courses: Course[];
  fiches: Fiche[];
  questions: Question[];
  annales: Annale[];
  flashcards: Flashcard[];
}

/**
 * 12 nouveaux examens & concours couvrant tout le continuum 6e → Université & Grands Concours
 */
export const HYPER72_EXAMS: ExamTrack[] = [
  {
    id: 'examen-entree-6e',
    name: 'Examen d’Entrée en 6e / CEPE–CEP',
    shortName: 'Entrée 6e / CEP',
    category: 'Collège (6e)',
    description:
      'Consolidation calcul, français, éveil scientifique, éducation civique et culture générale pour réussir la transition Primaire → Collège (6e).',
    level: '6e (Cycle d’observation)',
    subjectIds: [
      'maths',
      'francais',
      'svt',
      'histoire_geo',
      'educ_civique',
      'anglais',
      'technologie_robotique',
      'arts_musique_patrimoine',
      'eps_sciences_sport',
      'linguistique_oralite',
    ],
    classLevels: ['6e'],
    badgeColor: '#0284c7',
  },
  {
    id: 'olympiades-college-5e-4e',
    name: 'Évaluations & Olympiades Collège (5e – 4e)',
    shortName: 'Collège 5e–4e',
    category: 'Collège (5e–4e)',
    description:
      'Entraînement structuré en 5e et 4e : mathématiques, physique-chimie, SVT, langues vivantes, informatique, technologie et astronomie.',
    level: '5e – 4e (Cycle central)',
    subjectIds: [
      'maths',
      'physique',
      'svt',
      'francais',
      'histoire_geo',
      'anglais',
      'espagnol',
      'allemand',
      'arabe',
      'informatique',
      'technologie_robotique',
      'astronomie_spatial',
      'educ_civique',
    ],
    classLevels: ['5e', '4e'],
    badgeColor: '#0d9488',
  },
  {
    id: 'bepc-intensif-3e',
    name: 'BEPC / DEF / BFEM — Parcours Complet 3e',
    shortName: 'BEPC 3e',
    category: 'Collège (3e)',
    description:
      'Toutes les épreuves officielles de 3e : Maths, Français, Physique-Chimie, SVT, Histoire-Géo, Langues, Éducation Civique et Technologie.',
    level: 'Troisième (3e)',
    subjectIds: [
      'maths',
      'francais',
      'physique',
      'svt',
      'histoire_geo',
      'anglais',
      'espagnol',
      'allemand',
      'arabe',
      'educ_civique',
      'technologie_robotique',
      'informatique',
      'eps_sciences_sport',
      'genetique_biotech',
    ],
    classLevels: ['3e'],
    badgeColor: '#2563eb',
  },
  {
    id: 'bac-a4-lettres',
    name: 'Baccalauréat Série A4 (Lettres, Langues & Philo)',
    shortName: 'Bac A4',
    category: 'Lycée (Bac)',
    description:
      'Spécialité littéraire, philosophie, langues vivantes (anglais, espagnol, allemand, arabe), histoire-géographie, sociologie et linguistique.',
    level: 'Première – Terminale A4',
    subjectIds: [
      'francais',
      'philo',
      'histoire_geo',
      'anglais',
      'espagnol',
      'allemand',
      'arabe',
      'sociologie_anthropo',
      'linguistique_oralite',
      'arts_musique_patrimoine',
      'culture_gen',
    ],
    classLevels: ['2nde', '1ere', 'terminale'],
    badgeColor: '#7c3aed',
  },
  {
    id: 'bac-c-maths-physique',
    name: 'Baccalauréat Série C (Maths & Sciences Physiques)',
    shortName: 'Bac C',
    category: 'Lycée (Bac)',
    description:
      'Filière d’excellence mathématique et physique-chimie, complétée par l’informatique, l’astronomie et les statistiques.',
    level: 'Première – Terminale C',
    subjectIds: [
      'maths',
      'physique',
      'informatique',
      'statistiques',
      'svt',
      'astronomie_spatial',
      'francais',
      'philo',
      'anglais',
    ],
    classLevels: ['2nde', '1ere', 'terminale'],
    badgeColor: '#1d4ed8',
  },
  {
    id: 'bac-d-sciences-nat',
    name: 'Baccalauréat Série D (SVT, Chimie & Maths)',
    shortName: 'Bac D',
    category: 'Lycée (Bac)',
    description:
      'Voie royale vers la médecine, la pharmacie et l’agronomie : SVT, génétique, chimie organique, physique-chimie, maths et nutrition.',
    level: 'Première – Terminale D',
    subjectIds: [
      'svt',
      'genetique_biotech',
      'chimie_bio',
      'chimie_organique',
      'physique',
      'maths',
      'nutrition_sante',
      'agronomie_env',
      'francais',
      'philo',
    ],
    classLevels: ['2nde', '1ere', 'terminale'],
    badgeColor: '#059669',
  },
  {
    id: 'bac-f-industriel',
    name: 'Baccalauréat Technique Industriel (F1, F2, F3, F4)',
    shortName: 'Bac F1–F4',
    category: 'Lycée Technique',
    description:
      'Filières industrielles : génie civil (F4), électrotechnique (F3), électronique (F2), mécanique & robotique (F1), physique appliquée et maths.',
    level: 'Seconde – Terminale F',
    subjectIds: [
      'technologie_robotique',
      'energies_renouv',
      'genie_civil_btp',
      'reseaux_telecoms',
      'physique',
      'maths',
      'informatique',
      'gestion_projet',
    ],
    classLevels: ['2nde', '1ere', 'terminale'],
    badgeColor: '#d97706',
  },
  {
    id: 'licence-l1-l2-lmd',
    name: 'Université — Licence 1 & Licence 2 (Système LMD)',
    shortName: 'Licence L1–L2',
    category: 'Université (LMD)',
    description:
      'Partiels semestriels L1–L2 (S1 à S4) en sciences, droit, économie, informatique, lettres, sociologie, STAPS et santé.',
    level: 'Bac+1 / Bac+2 (L1–L2)',
    subjectIds: [
      'maths',
      'physique',
      'informatique',
      'statistiques',
      'droit',
      'droit_penal_proc',
      'economie',
      'comptabilite',
      'sociologie_anthropo',
      'genetique_biotech',
      'astronomie_spatial',
      'eps_sciences_sport',
      'linguistique_oralite',
      'psychologie_cog',
    ],
    classLevels: ['l1', 'l2'],
    badgeColor: '#0f766e',
  },
  {
    id: 'licence-l3-master-lmd',
    name: 'Université — Licence 3 & Admission Master (LMD)',
    shortName: 'Licence L3 / M1',
    category: 'Université (LMD)',
    description:
      'Unités d’enseignement de spécialité L3, méthodologie de mémoire, recherche et sélection en Master 1 & 2.',
    level: 'Bac+3 / Bac+4 (L3–M1)',
    subjectIds: [
      'data_ia',
      'cybersecurite',
      'droit_ohada',
      'droit_penal_proc',
      'droit_numerique',
      'finances_publiques',
      'genetique_biotech',
      'sociologie_anthropo',
      'astronomie_spatial',
      'pharmacologie',
      'urbanisme_sig',
      'fintech_microfinance',
      'relations_inter',
      'gestion_crises',
    ],
    classLevels: ['l3', 'master'],
    badgeColor: '#4f46e5',
  },
  {
    id: 'concours-eni-ens-prof',
    name: 'Concours ENI / ENS — Professorat & Sciences de l’Éducation',
    shortName: 'ENI / ENS',
    category: 'Concours Enseignement',
    description:
      'Recrutement des professeurs de collège et lycée (CAPES/CPEG) : pédagogie APC, psychologie cognitive, didactique disciplinaire et EPS.',
    level: 'Licence 3 – Master',
    subjectIds: [
      'pedagogie',
      'psychologie_cog',
      'francais',
      'maths',
      'svt',
      'physique',
      'histoire_geo',
      'eps_sciences_sport',
      'linguistique_oralite',
      'arts_musique_patrimoine',
    ],
    classLevels: ['l3', 'master'],
    badgeColor: '#16a34a',
  },
  {
    id: 'concours-diplomatie-iric',
    name: 'Concours Diplomatie & Relations Internationales (IRIC / MAE)',
    shortName: 'Diplomatie / IRIC',
    category: 'Grands Concours',
    description:
      'Préparation aux carrières diplomatiques et organisations internationales (ONU, UA, CEMAC, CEDEAO) : géopolitique, droit, langues et note de synthèse.',
    level: 'Licence 3 – Master',
    subjectIds: [
      'relations_inter',
      'droit',
      'methodo_redaction',
      'culture_gen',
      'economie',
      'anglais',
      'allemand',
      'espagnol',
      'arabe',
      'sociologie_anthropo',
      'ethique_gouvernance',
    ],
    classLevels: ['l3', 'master'],
    badgeColor: '#9333ea',
  },
  {
    id: 'concours-magistrature-enm',
    name: 'Concours Magistrature, Greffes & Barreau (ENM / CAPA)',
    shortName: 'Magistrature / CAPA',
    category: 'Grands Concours',
    description:
      'Voie judiciaire d’excellence : droit pénal et procédure pénale, droit constitutionnel/administratif, droit OHADA, éthique et dissertation juridique.',
    level: 'Master 1 – Master 2',
    subjectIds: [
      'droit_penal_proc',
      'droit',
      'droit_ohada',
      'droit_numerique',
      'methodo_redaction',
      'culture_gen',
      'ethique_gouvernance',
      'grh_travail',
      'finances_publiques',
    ],
    classLevels: ['l3', 'master'],
    badgeColor: '#b91c1c',
  },
];

/**
 * 9 nouvelles matières complètes (portant le catalogue de 51 à 60 matières)
 */
export const HYPER72_NEW_SUBJECTS: Subject[] = [
  {
    id: 'technologie_robotique',
    name: 'Technologie, Design & Robotique Éducative',
    shortName: 'Techno & Robotique',
    examIds: ['examen-entree-6e', 'olympiades-college-5e-4e', 'bepc-intensif-3e', 'bac-f-industriel', 'concours-ingenieur'],
    classLevels: getSubjectClassLevels('technologie_robotique'),
    color: '#ea580c',
    icon: 'Cpu',
    description: 'Objets techniques, CAO/DAO, impression 3D, capteurs, Arduino, automatismes et robotique de la 6e à l’université.',
    sizeKb: 640,
  },
  {
    id: 'allemand',
    name: 'Allemand LV2 & LV3 (Grammaire, Civilisation & Expression)',
    shortName: 'Allemand',
    examIds: ['olympiades-college-5e-4e', 'bepc-intensif-3e', 'bac-a4-lettres', 'concours-diplomatie-iric'],
    classLevels: getSubjectClassLevels('allemand'),
    color: '#ca8a04',
    icon: 'Languages',
    description: 'Déclinaisons, syntaxe verbale, compréhension écrite/orale, culture germanophone et traduction de la 4e au Master.',
    sizeKb: 590,
  },
  {
    id: 'astronomie_spatial',
    name: 'Astronomie, Astrophysique & Sciences Spatiales',
    shortName: 'Astronomie',
    examIds: ['olympiades-college-5e-4e', 'bac-c-maths-physique', 'licence-l1-l2-lmd', 'licence-l3-master-lmd', 'concours-ingenieur'],
    classLevels: getSubjectClassLevels('astronomie_spatial'),
    color: '#312e81',
    icon: 'Compass',
    description: 'Système solaire, mécanique céleste, étoiles, galaxies, satellites, télédétection et cosmologie de la 6e au Master.',
    sizeKb: 660,
  },
  {
    id: 'sociologie_anthropo',
    name: 'Sociologie, Anthropologie & Dynamiques Sociales',
    shortName: 'Sociologie',
    examIds: ['bac-a4-lettres', 'licence-l1-l2-lmd', 'licence-l3-master-lmd', 'concours-diplomatie-iric', 'concours-enam-a'],
    classLevels: getSubjectClassLevels('sociologie_anthropo'),
    color: '#be185d',
    icon: 'Users',
    description: 'Socialisation, stratification, méthodes d’enquête, anthropologie culturelle et mutations contemporaines (2nde → Master).',
    sizeKb: 620,
  },
  {
    id: 'arts_musique_patrimoine',
    name: 'Arts Plastiques, Musique, Cinéma & Patrimoine Culturel',
    shortName: 'Arts & Musique',
    examIds: ['examen-entree-6e', 'bac-a4-lettres', 'concours-eni-ens-prof'],
    classLevels: getSubjectClassLevels('arts_musique_patrimoine'),
    color: '#db2777',
    icon: 'Palette',
    description: 'Histoire de l’art, solfège, rythmes africains et classiques, analyse filmique et valorisation du patrimoine (6e → Master).',
    sizeKb: 580,
  },
  {
    id: 'eps_sciences_sport',
    name: 'Éducation Physique, Sport & Sciences Motrices (STAPS)',
    shortName: 'EPS & STAPS',
    examIds: ['examen-entree-6e', 'bepc-intensif-3e', 'licence-l1-l2-lmd', 'concours-eni-ens-prof'],
    classLevels: getSubjectClassLevels('eps_sciences_sport'),
    color: '#16a34a',
    icon: 'Activity',
    description: 'Physiologie de l’effort, biomécanique, entraînement sportif, règles fédérales et secourisme de la 6e au Master STAPS.',
    sizeKb: 610,
  },
  {
    id: 'genetique_biotech',
    name: 'Génétique, Biologie Moléculaire & Biotechnologies',
    shortName: 'Génétique & Biotech',
    examIds: ['bepc-intensif-3e', 'bac-d-sciences-nat', 'licence-l1-l2-lmd', 'licence-l3-master-lmd', 'concours-medecine', 'concours-pharmacie-odonto'],
    classLevels: getSubjectClassLevels('genetique_biotech'),
    color: '#0d9488',
    icon: 'Dna',
    description: 'ADN, lois de Mendel, PCR, séquençage, CRISPR-Cas9, génie génétique et bioéthique de la 3e au Master.',
    sizeKb: 680,
  },
  {
    id: 'droit_penal_proc',
    name: 'Droit Pénal, Procédure Pénale & Criminologie',
    shortName: 'Droit Pénal',
    examIds: ['licence-l1-l2-lmd', 'licence-l3-master-lmd', 'concours-magistrature-enm', 'concours-police-officiers', 'concours-police-douanes'],
    classLevels: getSubjectClassLevels('droit_penal_proc'),
    color: '#991b1b',
    icon: 'Scale',
    description: 'Infraction, responsabilité pénale, enquête, instruction, droits de la défense, peines et criminologie (Tle → Master).',
    sizeKb: 670,
  },
  {
    id: 'linguistique_oralite',
    name: 'Linguistique Générale, Oralité & Langues Africaines',
    shortName: 'Linguistique',
    examIds: ['examen-entree-6e', 'bac-a4-lettres', 'licence-l1-l2-lmd', 'concours-eni-ens-prof'],
    classLevels: getSubjectClassLevels('linguistique_oralite'),
    color: '#0369a1',
    icon: 'BookOpen',
    description: 'Phonétique, morphosyntaxe, sémantique, sociolinguistique, traditions orales et multilinguisme (6e → Master).',
    sizeKb: 600,
  },
];

export function buildSubjectHyper72(pack: HyperSubjectPack): HyperBundle {
  const chapters: Chapter[] = [];
  const courses: Course[] = [];
  const fiches: Fiche[] = [];
  const questions: Question[] = [];
  const flashcards: Flashcard[] = [];
  const annales: Annale[] = [];

  const levels = getSubjectClassLevels(pack.subjectId);
  const totalCount = pack.topics.length;

  pack.topics.forEach((tuple, idx) => {
    const [
      slug,
      title,
      summary,
      keyNotion,
      formulaOrRule,
      classicTrap,
      workedExample,
      difficulty,
      explicitClass,
    ] = tuple;

    const order = pack.startOrder + idx;
    const assignedClass: ClassLevelId =
      explicitClass ??
      levels[Math.min(levels.length - 1, Math.floor((idx / Math.max(1, totalCount)) * levels.length))];
    const classMeta = getClassLevelMeta(assignedClass);

    const chId = `ch-h72-${pack.subjectId}-${slug}`;
    const crsId = `crs-h72-${pack.subjectId}-${slug}`;
    const ficId = `fic-h72-${pack.subjectId}-${slug}`;
    const qId = `q-h72-${pack.subjectId}-${slug}`;
    const fcId = `fc-h72-${pack.subjectId}-${slug}`;

    chapters.push({
      id: chId,
      subjectId: pack.subjectId,
      title,
      order,
      classLevel: assignedClass,
      summary,
      estimatedMinutes: difficulty === 'difficile' ? 35 : difficulty === 'moyen' ? 28 : 22,
      difficulty,
      courseId: crsId,
      ficheId: ficId,
    });

    const sections: CourseSection[] = [
      {
        id: `${crsId}-s1`,
        heading: `1. Objectifs du programme (${classMeta.label}) et cadre conceptuel`,
        content: `${summary} En ${classMeta.label} (${pack.subjectName}), la maîtrise de « ${title} » repose sur l’identification rigoureuse de la notion centrale : ${keyNotion}. Commence toujours par situer les données du problème dans leur contexte disciplinaire avant d’engager une démonstration ou un calcul.`,
        keyTakeaway: `${keyNotion} constitue le socle attendu en ${classMeta.shortLabel} sur « ${title} ».`,
        diagramId: idx % 3 === 0 ? pack.diagramId : undefined,
      },
      {
        id: `${crsId}-s2`,
        heading: '2. Règles, propriétés fondamentales et formule clé',
        content: `Pour traiter efficacement les exercices et sujets d’examen sur « ${title} », applique systématiquement le principe directeur suivant : ${formulaOrRule}. Vérifie toujours les hypothèses d’application, les unités ou le cadre normatif avant de conclure.`,
        keyTakeaway: formulaOrRule,
        formula: formulaOrRule,
      },
      {
        id: `${crsId}-s3`,
        heading: '3. Application guidée pas à pas (niveau examen & concours)',
        content: `Cas pratique corrigé : ${workedExample}. Décompose la résolution en 3 étapes vérifiables : (1) relevé des données et reformulation ; (2) mobilisation explicite de la règle (${formulaOrRule}) ; (3) vérification de la cohérence et rédaction structurée de la réponse finale.`,
        keyTakeaway: workedExample,
      },
      {
        id: `${crsId}-s4`,
        heading: '4. Erreurs classiques à éviter et réflexes de réussite',
        content: `Attention au piège le plus fréquent observé dans les copies d’examen (${classMeta.label}) : ${classicTrap}. Avant de rendre ta copie, relis ta conclusion pour contrôler les signes, la terminologie exacte et la réponse précise à la consigne.`,
        keyTakeaway: `Piège à éviter : ${classicTrap}`,
      },
    ];

    courses.push({
      id: crsId,
      subjectId: pack.subjectId,
      chapterId: chId,
      classLevel: assignedClass,
      title: `${title} (${classMeta.shortLabel})`,
      durationMinutes: difficulty === 'difficile' ? 32 : difficulty === 'moyen' ? 25 : 20,
      sizeKb: 26 + (idx % 12),
      sections,
      updatedAt: '2026-11-22',
    });

    fiches.push({
      id: ficId,
      subjectId: pack.subjectId,
      chapterId: chId,
      classLevel: assignedClass,
      title: `Fiche ${classMeta.shortLabel} — ${title}`,
      subtitle: `${pack.subjectName} · ${classMeta.label} · Synthèse complète 6 formats`,
      sizeKb: 15 + (idx % 6),
      notionsEssentielles: [
        keyNotion,
        `Cadre du programme (${classMeta.label}) : ${summary}`,
        `Principe opératoire : ${formulaOrRule}`,
      ],
      definitions: [
        { terme: title, definition: summary },
        { terme: keyNotion, definition: formulaOrRule },
      ],
      formules: [{ label: `Règle clé — ${title}`, formule: formulaOrRule }],
      datesReperes: [
        { repere: classMeta.label, detail: `${pack.subjectName} — Chapitre ${order} (${difficulty})` },
        { repere: 'Point de contrôle', detail: keyNotion },
      ],
      methodes: [
        `1. Identifier le niveau et les hypothèses de « ${title} » (${classMeta.shortLabel}).`,
        `2. Appliquer la règle clé : ${formulaOrRule}.`,
        `3. Contrôler le résultat face au piège classique : ${classicTrap}.`,
      ],
      erreursFrequentes: [
        classicTrap,
        `Omettre de justifier explicitement le lien avec « ${keyNotion} » lors de la rédaction.`,
      ],
      exemples: [{ titre: `Application type (${classMeta.shortLabel})`, contenu: workedExample }],
      resumeExpress: `${title} [${classMeta.shortLabel}] : ${keyNotion}. Règle : ${formulaOrRule}. Piège : ${classicTrap}.`,
      tableauComparatif: {
        headers: ['Critère', 'Bonne pratique examen', 'Erreur fréquente'],
        rows: [
          { critere: 'Notion centrale', elementA: keyNotion, elementB: 'Réponse hors cadre ou imprécise' },
          { critere: 'Méthode / Règle', elementA: formulaOrRule, elementB: classicTrap },
          { critere: 'Application', elementA: workedExample, elementB: 'Résultat non vérifié ni justifié' },
        ],
      },
      autoEvaluation: [
        {
          question: `Quelle est la règle essentielle à maîtriser sur « ${title} » (${classMeta.shortLabel}) ?`,
          reponse: `${keyNotion} : ${formulaOrRule}.`,
        },
        {
          question: `Quel piège classique faut-il éviter dans un exercice sur « ${title} » ?`,
          reponse: `Éviter de ${classicTrap.charAt(0).toLowerCase()}${classicTrap.slice(1)}. Exemple : ${workedExample}.`,
        },
      ],
    });

    const correctPos = idx % 4;
    const distractors = [
      classicTrap,
      `Ignorer les hypothèses de « ${title} » et répondre par approximation sans mobiliser ${keyNotion}.`,
      `Confondre « ${title} » avec une règle hors programme non vérifiée en ${classMeta.shortLabel}.`,
    ];
    const options: string[] = [];
    let dPtr = 0;
    for (let k = 0; k < 4; k++) {
      if (k === correctPos) {
        options.push(formulaOrRule);
      } else {
        options.push(distractors[dPtr++]);
      }
    }

    questions.push({
      id: qId,
      subjectId: pack.subjectId,
      chapterId: chId,
      classLevel: assignedClass,
      examIds: pack.examIds,
      prompt: `[${classMeta.shortLabel} · ${pack.subjectName}] Sur le thème « ${title} », quelle proposition applique correctement la règle fondamentale attendue ?`,
      context: summary,
      options,
      correctIndex: correctPos,
      explanation: `En ${classMeta.label}, la règle exacte sur « ${title} » est : ${formulaOrRule}. Exemple d’application : ${workedExample}. Piège à écarter : ${classicTrap}.`,
      steps: [
        `Identifier la notion clé (${classMeta.shortLabel}) : ${keyNotion}.`,
        `Appliquer la règle de référence : ${formulaOrRule}.`,
        `Écarter le piège classique : ${classicTrap}.`,
      ],
      notion: keyNotion,
      difficulty,
      ficheId: ficId,
      source: `Banque officielle ${pack.subjectName} (${classMeta.label}) — Réussite Offline v15`,
      isOfficial: true,
      estimatedSeconds: difficulty === 'difficile' ? 60 : difficulty === 'moyen' ? 45 : 35,
    });

    flashcards.push({
      id: fcId,
      subjectId: pack.subjectId,
      chapterId: chId,
      question: `[${classMeta.shortLabel} · ${pack.subjectName}] ${title} — Quelle est la règle ou notion essentielle à retenir ?`,
      answer: `${keyNotion} — ${formulaOrRule}.`,
      definition: summary,
      formula: formulaOrRule,
      example: `${workedExample} (Piège à éviter : ${classicTrap})`,
      diagramId: pack.diagramId,
    });
  });

  // Générer 4 (existants) ou 6 (nouvelles matières) annales chronométrées & téléchargeables
  const annalesWanted = pack.annalesCount ?? 4;
  const years = [2026, 2025, 2024, 2023, 2022, 2021];
  const chunkSize = Math.max(4, Math.floor(questions.length / annalesWanted));

  for (let a = 0; a < annalesWanted; a++) {
    const start = (a * chunkSize) % questions.length;
    const selectedQs: Question[] = [];
    for (let j = 0; j < Math.min(8, questions.length); j++) {
      selectedQs.push(questions[(start + j) % questions.length]);
    }
    const year = years[a % years.length];
    const targetClass = selectedQs[0]?.classLevel ?? levels[levels.length - 1];
    const targetClassMeta = getClassLevelMeta(targetClass);
    const diff: Difficulty = a === 0 ? 'moyen' : a === 1 ? 'difficile' : a % 2 === 0 ? 'facile' : 'moyen';

    annales.push({
      id: `ann-h72-${pack.subjectId}-${year}-${a + 1}`,
      title: `Sujet officiel ${pack.subjectName} (${targetClassMeta.shortLabel}) — Session ${year} n°${a + 1}`,
      examId: pack.primaryExamId,
      subjectId: pack.subjectId,
      classLevel: targetClass,
      chapterIds: Array.from(new Set(selectedQs.map((q) => q.chapterId))),
      year,
      difficulty: diff,
      durationMinutes: diff === 'difficile' ? 35 : diff === 'moyen' ? 25 : 20,
      questionIds: selectedQs.map((q) => q.id),
      examType: `${targetClassMeta.cycleLabel} · ${targetClassMeta.label}`,
      language: 'Français',
      responseFormat: a % 3 === 0 ? 'Étude de cas' : a % 2 === 0 ? 'QCM & Problèmes' : 'QCM',
      sizeKb: 42 + a * 6,
      shareable: true,
      countryOrZone: pack.zone,
      instructions: `Épreuve chronométrée niveau ${targetClassMeta.label} (${selectedQs.length} questions corrigées). Lisez chaque énoncé attentivement avant de valider.`,
      bareme: 'Barème sur 20 points — Chaque bonne réponse rapporte des points sans pénalité négative.',
    });
  }

  return { chapters, courses, fiches, questions, annales, flashcards };
}

export function mergeHyperBundles(bundles: HyperBundle[]): HyperBundle {
  return {
    chapters: bundles.flatMap((b) => b.chapters),
    courses: bundles.flatMap((b) => b.courses),
    fiches: bundles.flatMap((b) => b.fiches),
    questions: bundles.flatMap((b) => b.questions),
    annales: bundles.flatMap((b) => b.annales),
    flashcards: bundles.flatMap((b) => b.flashcards),
  };
}
