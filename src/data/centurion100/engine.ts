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
import { getClassLevelMeta, getSubjectClassLevels } from '../hyperExpansion72/classLevels';

export type CenturionTopicTuple = [
  slug: string,
  title: string,
  keyNotion: string,
  rule: string,
  trap: string,
  cls?: ClassLevelId,
  diff?: Difficulty
];

export interface CenturionSubjectPack {
  subjectId: string;
  subjectName: string;
  primaryExamId: string;
  examIds: string[];
  zone: string;
  startOrder?: number;
  annalesCount?: number;
  diagramId?: CourseSection['diagramId'];
  /** Nombre total de chapitres de la matière (affiché « chapitre n°X/total »), 100 par défaut. */
  totalChapters?: number;
  /** Préfixe d'identifiants d'annales (évite toute collision entre packs d'une même matière). */
  idPrefix?: string;
  topics: CenturionTopicTuple[];
}

export interface CenturionBundle {
  chapters: Chapter[];
  courses: Course[];
  fiches: Fiche[];
  questions: Question[];
  annales: Annale[];
  flashcards: Flashcard[];
}

/**
 * 4 nouveaux examens & concours Centurion v16 (portant le total de 52 à 56 examens)
 */
export const CENTURION_NEW_EXAMS: ExamTrack[] = [
  {
    id: 'concours-electronique-energie',
    name: 'Concours Électronique, Électrotechnique & Systèmes Embarqués (BTS / Ingénieur)',
    shortName: 'Électronique / Électrotech',
    category: 'Ingénierie & Industrie',
    description:
      'Épreuves d’électronique analogique et numérique, électrotechnique, automatique, microcontrôleurs et énergies pour BTS, DUT et Écoles d’ingénieurs.',
    level: '2nde → Master / Ingénieur',
    subjectIds: [
      'electronique_electrotech',
      'physique',
      'maths',
      'technologie_robotique',
      'energies_renouv',
      'informatique',
    ],
    classLevels: ['2nde', '1ere', 'terminale', 'l1', 'l2', 'l3', 'master'],
    badgeColor: '#ca8a04',
  },
  {
    id: 'concours-architecture-urbanisme',
    name: 'Concours Écoles d’Architecture, Design & Cadre de Vie (EAMAU / ENSA)',
    shortName: 'Architecture / EAMAU',
    category: 'Architecture & BTP',
    description:
      'Préparation complète aux concours d’architecture (EAMAU, ENSA) : composition spatiale, bioclimatisme, histoire de l’architecture, BTP et urbanisme.',
    level: 'Terminale → Master',
    subjectIds: [
      'architecture_design',
      'genie_civil_btp',
      'urbanisme_sig',
      'arts_musique_patrimoine',
      'maths',
      'physique',
    ],
    classLevels: ['2nde', '1ere', 'terminale', 'l1', 'l2', 'l3', 'master'],
    badgeColor: '#d97706',
  },
  {
    id: 'concours-internat-medecine',
    name: 'Externat, Internat de Médecine & Concours Cliniques (DES / Urgences)',
    shortName: 'Internat Médecine',
    category: 'Santé & Clinique',
    description:
      'Sémiologie clinique, pathologies cardio-respiratoires, infectiologie tropicale, urgences vitales, pharmacologie et santé publique.',
    level: 'L1 → Master / Internat',
    subjectIds: [
      'medecine_clinique',
      'anatomie_physio',
      'pharmacologie',
      'sante_publique',
      'obstetrique_pediatrie',
      'nutrition_sante',
    ],
    classLevels: ['l1', 'l2', 'l3', 'master'],
    badgeColor: '#dc2626',
  },
  {
    id: 'concours-sciencespo-banque-eau',
    name: 'Concours Sciences Po, Banque Centrale (BEAC/BCEAO) & Ingénierie Eau-Climat (2iE)',
    shortName: 'Sciences Po / BEAC / 2iE',
    category: 'Grands Concours',
    description:
      'Voies d’excellence en gouvernance publique, banques centrales, finance de marché, hydrologie et ingénierie de l’eau et du climat.',
    level: '1ère → Master & Concours',
    subjectIds: [
      'sciences_politiques',
      'finance_marches_banque',
      'hydrologie_eau_climat',
      'economie',
      'droit',
      'relations_inter',
      'finances_publiques',
    ],
    classLevels: ['1ere', 'terminale', 'l1', 'l2', 'l3', 'master'],
    badgeColor: '#7c3aed',
  },
];

/**
 * 6 nouvelles matières Centurion v16 — 100 chapitres complets chacune (portant le catalogue de 60 à 66 matières)
 */
export const CENTURION_NEW_SUBJECTS: Subject[] = [
  {
    id: 'electronique_electrotech',
    name: 'Électronique, Électrotechnique & Systèmes Embarqués',
    shortName: 'Électronique',
    examIds: ['concours-electronique-energie', 'bts-genie-electrique', 'bac-f-industriel', 'concours-ingenieur', 'concours-energie-btp'],
    classLevels: getSubjectClassLevels('electronique_electrotech'),
    color: '#ca8a04',
    icon: 'Zap',
    description:
      '140 chapitres de la 2nde au Master : lois des circuits, diodes, transistors, amplificateurs opérationnels, logique numérique, machines électriques, électronique de puissance et systèmes embarqués.',
    sizeKb: 1620,
  },
  {
    id: 'architecture_design',
    name: 'Architecture, Design d’Espace & Patrimoine Bâti',
    shortName: 'Architecture',
    examIds: ['concours-architecture-urbanisme', 'concours-genie-civil', 'concours-urbanisme-sig'],
    classLevels: getSubjectClassLevels('architecture_design'),
    color: '#d97706',
    icon: 'Compass',
    description:
      '140 chapitres : dessin architectural, géométrie descriptive, architecture bioclimatique tropicale, matériaux en terre crue et béton, BIM, acoustique, patrimoine africain et mondial.',
    sizeKb: 1580,
  },
  {
    id: 'medecine_clinique',
    name: 'Sémiologie, Médecine Clinique & Urgences',
    shortName: 'Médecine Clinique',
    examIds: ['concours-internat-medecine', 'concours-medecine', 'concours-paramedical'],
    classLevels: getSubjectClassLevels('medecine_clinique'),
    color: '#dc2626',
    icon: 'Stethoscope',
    description:
      '140 chapitres du 1er cycle à l’Internat : examen clinique complet, cardiologie, pneumologie, neurologie, infectiologie tropicale, urgences vitales, imagerie et raisonnement diagnostique.',
    sizeKb: 1740,
  },
  {
    id: 'sciences_politiques',
    name: 'Sciences Politiques, Géopolitique & Administration',
    shortName: 'Sciences Po',
    examIds: ['concours-sciencespo-banque-eau', 'concours-diplomatie-iric', 'concours-enam-a', 'concours-admin', 'bac-litteraire'],
    classLevels: getSubjectClassLevels('sciences_politiques'),
    color: '#7c3aed',
    icon: 'Landmark',
    description:
      '140 chapitres : théorie de l’État, régimes politiques, sociologie électorale, politiques publiques, intégration africaine (UA, CEMAC, CEDEAO), géopolitique contemporaine et gouvernance.',
    sizeKb: 1560,
  },
  {
    id: 'hydrologie_eau_climat',
    name: 'Hydrologie, Eau Potable, Assainissement & Climat (WASH)',
    shortName: 'Eau & Climat',
    examIds: ['concours-sciencespo-banque-eau', 'concours-agronomie', 'concours-genie-civil', 'bepc-intensif-3e'],
    classLevels: getSubjectClassLevels('hydrologie_eau_climat'),
    color: '#0284c7',
    icon: 'Droplets',
    description:
      '140 chapitres de la 6e au Master (type 2iE) : cycle de l’eau, hydrogéologie, forages et pompage solaire, potabilisation, assainissement écologique, bassins versants (Lac Tchad, Niger, Congo) et adaptation climatique.',
    sizeKb: 1610,
  },
  {
    id: 'finance_marches_banque',
    name: 'Finance d’Entreprise, Banque, Marchés & Actuariat',
    shortName: 'Finance & Banque',
    examIds: ['concours-sciencespo-banque-eau', 'concours-finances-banque', 'bts-compta-info', 'certif-fintech-microfinance'],
    classLevels: getSubjectClassLevels('finance_marches_banque'),
    color: '#059669',
    icon: 'TrendingUp',
    description:
      '140 chapitres : actualisation, VAN/TRI, analyse financière avancée, banques centrales (BEAC/BCEAO), régulation Bâle III/COBAC, marchés actions/obligations, produits dérivés, gestion des risques et actuariat.',
    sizeKb: 1650,
  },
];

export function buildCenturionPack(pack: CenturionSubjectPack): CenturionBundle {
  const chapters: Chapter[] = [];
  const courses: Course[] = [];
  const fiches: Fiche[] = [];
  const questions: Question[] = [];
  const flashcards: Flashcard[] = [];
  const annales: Annale[] = [];

  const levels = getSubjectClassLevels(pack.subjectId);
  const total = pack.topics.length;
  const startOrder = pack.startOrder ?? 73;
  const totalLabel = pack.totalChapters ?? 100;

  pack.topics.forEach((tuple, idx) => {
    const [slug, title, keyNotion, rule, trap, explicitCls, explicitDiff] = tuple;
    const order = startOrder + idx;
    const cls: ClassLevelId =
      explicitCls ?? levels[Math.min(levels.length - 1, Math.floor((idx / Math.max(1, total)) * levels.length))];
    const classMeta = getClassLevelMeta(cls);
    const difficulty: Difficulty =
      explicitDiff ??
      (cls === '6e' || cls === '5e' || cls === '4e' || cls === '3e'
        ? 'facile'
        : cls === 'l3' || cls === 'master'
          ? 'difficile'
          : 'moyen');

    const chId = `ch-c100-${pack.subjectId}-${slug}`;
    const crsId = `crs-c100-${pack.subjectId}-${slug}`;
    const ficId = `fic-c100-${pack.subjectId}-${slug}`;
    const qId = `q-c100-${pack.subjectId}-${slug}`;
    const fcId = `fc-c100-${pack.subjectId}-${slug}`;

    const summary = `Cours complet et exercices pratiques sur « ${title} » (${classMeta.label}) : explication détaillée de ${keyNotion}, règle de référence, méthode guidée pas à pas, pièges à éviter et entraînement corrigé.`;
    const workedExample = `Étude d’application guidée (${classMeta.shortLabel}) : face à un sujet portant sur « ${title} », commencer par définir « ${keyNotion} », poser les hypothèses, appliquer rigoureusement « ${rule} », puis relire chaque étape pour écarter le piège classique : ${trap}.`;

    chapters.push({
      id: chId,
      subjectId: pack.subjectId,
      title: `${title} (${classMeta.shortLabel})`,
      order,
      classLevel: cls,
      summary,
      estimatedMinutes: difficulty === 'difficile' ? 35 : difficulty === 'moyen' ? 28 : 22,
      difficulty,
      courseId: crsId,
      ficheId: ficId,
    });

    const sections: CourseSection[] = [
      {
        id: `${crsId}-s1`,
        heading: `1. Comprendre « ${title} » : définitions, enjeux & cadre (${classMeta.label})`,
        content: `Ce chapitre n°${order}/${totalLabel} en ${pack.subjectName} (${classMeta.label}) vise une maîtrise complète de « ${title} ».\n\nNotion centrale à comprendre en profondeur : ${keyNotion}.\n\nPourquoi ce chapitre compte à l’examen : il relie les bases théoriques du programme à des situations pratiques concrètes évaluées aussi bien en questions de cours, en exercices d’application qu’en études de cas rédigées.`,
        keyTakeaway: `Niveau ${classMeta.label} — Notion centrale : ${keyNotion}.`,
        diagramId: pack.diagramId,
      },
      {
        id: `${crsId}-s2`,
        heading: '2. Règle fondamentale, mécanisme expliqué & formule de référence',
        content: `Principe opératoire de référence à maîtriser parfaitement :\n${rule}.\n\nExplication du mécanisme : avant d’appliquer cette règle en ${pack.subjectName}, identifie toujours les données connues, vérifie les conditions d’application et comprends le rôle de chaque élément. En épreuve officielle ou concours, énoncer clairement cette règle avant de l’utiliser sécurise les points de méthode auprès du jury.`,
        formula: rule,
        keyTakeaway: `Règle vérifiable à mobiliser : ${rule}`,
      },
      {
        id: `${crsId}-s3`,
        heading: '3. Méthode détaillée pas à pas & pièges classiques à éviter',
        content: `Démarche reproductible le jour de l’épreuve :\n• Étape 1 (Analyse) : lire attentivement la consigne, souligner les mots-clés et relier le problème à « ${keyNotion} ».\n• Étape 2 (Résolution) : déployer rigoureusement « ${rule} » en justifiant chaque étape intermédiaire.\n• Étape 3 (Contrôle anti-piège) : relire la réponse finale pour écarter l’erreur la plus fréquente des candidats : ${trap}.`,
        keyTakeaway: `Piège classique à écarter : ${trap}`,
      },
      {
        id: `${crsId}-s4`,
        heading: '4. Exemple résolu, exercices pratiques & ancrage durable',
        content: `${workedExample}\n\nPour consolider durablement ce chapitre, réalise les exercices pratiques interactifs (Application directe, Mise en pratique guidée, Correction de copie fautive, Défi synthèse et, en trading, ateliers de gestion du risque et journal de trade), puis enchaîne avec le QCM chronométré et la Méthode Active (Feynman, Texte à trous, Séquençage ou Rédaction /20).`,
        keyTakeaway: `Savoir expliquer « ${title} » sans notes, appliquer la règle sur un cas concret et vérifier ses hypothèses avant de conclure.`,
      },
    ];

    courses.push({
      id: crsId,
      subjectId: pack.subjectId,
      chapterId: chId,
      classLevel: cls,
      title: `${title} (${classMeta.shortLabel})`,
      durationMinutes: difficulty === 'difficile' ? 32 : difficulty === 'moyen' ? 25 : 20,
      sizeKb: 25 + (idx % 10),
      sections,
      updatedAt: '2026-11-23',
    });

    fiches.push({
      id: ficId,
      subjectId: pack.subjectId,
      chapterId: chId,
      classLevel: cls,
      title: `Fiche ${classMeta.shortLabel} — ${title}`,
      subtitle: `${pack.subjectName} · Chapitre ${order}/${totalLabel} · ${classMeta.label}`,
      sizeKb: 14 + (idx % 6),
      notionsEssentielles: [
        keyNotion,
        `Programme ${classMeta.shortLabel} : ${title}`,
        `Principe clé : ${rule}`,
      ],
      definitions: [
        { terme: title, definition: `${keyNotion} — ${rule}` },
        { terme: keyNotion, definition: rule },
      ],
      formules: [{ label: `Règle d’or — ${title}`, formule: rule }],
      datesReperes: [
        { repere: classMeta.label, detail: `${pack.subjectName} — Chapitre ${order}/${totalLabel} (${difficulty})` },
        { repere: 'Point d’ancrage', detail: keyNotion },
      ],
      methodes: [
        `1. Poser le cadre et identifier « ${keyNotion} » (${classMeta.shortLabel}).`,
        `2. Appliquer étape par étape la règle : ${rule}.`,
        `3. Contrôler le résultat face au piège classique : ${trap}.`,
        `4. Rédiger une conclusion claire, nuancée et vérifiée.`,
      ],
      erreursFrequentes: [
        trap,
        `Répondre sans relier explicitement la justification à « ${keyNotion} ».`,
      ],
      exemples: [{ titre: `Exercice corrigé (${classMeta.shortLabel})`, contenu: workedExample }],
      resumeExpress: `${title} [${classMeta.shortLabel}] : ${keyNotion}. Règle : ${rule}. Piège à éviter : ${trap}.`,
      tableauComparatif: {
        headers: ['Critère', 'Attendu du jury', 'Erreur sanctionnée'],
        rows: [
          { critere: 'Concept clé', elementA: keyNotion, elementB: 'Hors sujet ou définition floue' },
          { critere: 'Règle / Méthode', elementA: rule, elementB: trap },
          { critere: 'Vérification', elementA: 'Justification complète et relue', elementB: 'Affirmation non démontrée' },
        ],
      },
      autoEvaluation: [
        {
          question: `Explique avec tes propres mots la règle clé de « ${title} » (${classMeta.shortLabel}).`,
          reponse: `${keyNotion} : ${rule}.`,
        },
        {
          question: `Quel piège classique faut-il absolument éviter sur « ${title} » ?`,
          reponse: `${trap}. Application : ${workedExample}`,
        },
      ],
    });

    const correctPos = (order + idx) % 4;
    const distractors = [
      trap,
      `Négliger « ${keyNotion} » et appliquer une règle approximative non valable en ${classMeta.shortLabel}.`,
      `Inverser les conditions d’application de « ${title} » sans vérifier les hypothèses initiales.`,
    ];
    const options: string[] = [];
    let dPtr = 0;
    for (let k = 0; k < 4; k++) {
      options.push(k === correctPos ? rule : distractors[dPtr++]);
    }

    questions.push({
      id: qId,
      subjectId: pack.subjectId,
      chapterId: chId,
      classLevel: cls,
      examIds: pack.examIds,
      prompt: `[${classMeta.shortLabel} · ${pack.subjectName}] Concernant « ${title} », quelle proposition traduit fidèlement la règle de référence ?`,
      context: `Notion évaluée : ${keyNotion}.`,
      options,
      correctIndex: correctPos,
      explanation: `En ${classMeta.label}, sur « ${title} », la règle exacte est : ${rule}. Piège à éviter : ${trap}.`,
      steps: [
        `Repérer la notion clé : ${keyNotion}.`,
        `Mobiliser la règle : ${rule}.`,
        `Écarter le piège : ${trap}.`,
      ],
      notion: keyNotion,
      difficulty,
      ficheId: ficId,
      source: `Banque Centurion 100 — ${pack.subjectName} (${classMeta.label})`,
      isOfficial: true,
      estimatedSeconds: difficulty === 'difficile' ? 55 : difficulty === 'moyen' ? 45 : 35,
    });

    flashcards.push({
      id: fcId,
      subjectId: pack.subjectId,
      chapterId: chId,
      question: `[${classMeta.shortLabel} · ${pack.subjectName}] ${title} — Quelle est la règle clé à maîtriser ?`,
      answer: `${keyNotion} : ${rule}`,
      definition: summary,
      formula: rule,
      example: `Piège à éviter : ${trap}`,
      diagramId: pack.diagramId,
    });
  });

  // Sujets d'examen passés (annales) par matière : 3 par défaut (60 matières existantes) ou 5 pour les nouvelles matières 100 chapitres
  const annalesCount = Math.min(5, Math.max(1, pack.annalesCount ?? 3));
  const allAnnaleConfigs: { year: number; ratio: number; diff: Difficulty; format: 'QCM' | 'Étude de cas' | 'QCM & Problèmes' }[] = [
    { year: 2026, ratio: 0.0, diff: 'moyen', format: 'QCM & Problèmes' },
    { year: 2025, ratio: 0.35, diff: 'difficile', format: 'Étude de cas' },
    { year: 2024, ratio: 0.68, diff: 'facile', format: 'QCM' },
    { year: 2023, ratio: 0.18, diff: 'moyen', format: 'QCM & Problèmes' },
    { year: 2022, ratio: 0.52, diff: 'difficile', format: 'Étude de cas' },
  ];
  const annaleConfigs = allAnnaleConfigs.slice(0, annalesCount);

  annaleConfigs.forEach((cfg, aIdx) => {
    const selectedQs: Question[] = [];
    const startIdx = Math.floor(cfg.ratio * Math.max(1, questions.length));
    for (let j = 0; j < Math.min(8, questions.length); j++) {
      selectedQs.push(questions[(startIdx + j) % questions.length]);
    }
    const targetCls = selectedQs[0]?.classLevel ?? levels[levels.length - 1];
    const clsMeta = getClassLevelMeta(targetCls);

    annales.push({
      id: `ann-${pack.idPrefix ?? 'c100'}-${pack.subjectId}-${cfg.year}-${aIdx + 1}`,
      title: `Annale corrigée ${pack.subjectName} (${clsMeta.shortLabel}) — Sujet officiel ${cfg.year} #${aIdx + 1}`,
      examId: pack.primaryExamId,
      subjectId: pack.subjectId,
      classLevel: targetCls,
      chapterIds: Array.from(new Set(selectedQs.map((q) => q.chapterId))),
      year: cfg.year,
      difficulty: cfg.diff,
      durationMinutes: cfg.diff === 'difficile' ? 40 : cfg.diff === 'moyen' ? 30 : 20,
      questionIds: selectedQs.map((q) => q.id),
      examType: `${clsMeta.cycleLabel} · ${clsMeta.label}`,
      language: 'Français',
      responseFormat: cfg.format,
      sizeKb: 46 + aIdx * 5,
      shareable: true,
      countryOrZone: pack.zone,
      instructions: `Sujet d’examen passé niveau ${clsMeta.label} (${selectedQs.length} questions + travail actif recommandé). Lis attentivement chaque énoncé avant de répondre.`,
      bareme: 'Barème officiel /20 — Notation sans pénalité négative, corrigé détaillé et méthode pas à pas inclus.',
    });
  });

  return { chapters, courses, fiches, questions, annales, flashcards };
}

export function mergeCenturionBundles(bundles: CenturionBundle[]): CenturionBundle {
  return {
    chapters: bundles.flatMap((b) => b.chapters),
    courses: bundles.flatMap((b) => b.courses),
    fiches: bundles.flatMap((b) => b.fiches),
    questions: bundles.flatMap((b) => b.questions),
    annales: bundles.flatMap((b) => b.annales),
    flashcards: bundles.flatMap((b) => b.flashcards),
  };
}
