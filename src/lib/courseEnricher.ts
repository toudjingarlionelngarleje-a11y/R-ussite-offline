import { Chapter, Course, CourseSection, Fiche, Flashcard, Question, Subject } from '../types';
import { getClassLevelMeta } from '../data/hyperExpansion72/classLevels';
import { getChapterDiagram, getSubjectDiagramGallery } from './subjectDiagrams';

export type DisciplineFamily =
  | 'exact_sciences'
  | 'tech_engineering'
  | 'life_health'
  | 'law_public'
  | 'econ_management'
  | 'letters_langs'
  | 'humanities_social'
  | 'earth_agro'
  | 'finance_trading';

export interface EnrichedCourseSection extends CourseSection {
  deepExplanation: string;
  stepByStepBreakdown: string[];
  concreteIllustration: string;
  commonMistakeWarning?: {
    mistake: string;
    fix: string;
  };
}

export interface WorkedCaseStudy {
  title: string;
  contextBadge: string;
  scenario: string;
  givenData: string[];
  methodChoice: string;
  steps: { stepTitle: string; detail: string }[];
  finalAnswer: string;
  verificationCheck: string;
}

export interface PracticalExercise {
  id: string;
  number: number;
  title: string;
  kind: 'application' | 'pratique' | 'erreur' | 'synthese';
  difficultyLabel: 'Fondamental' | 'Intermédiaire' | 'Approfondi';
  stars: 1 | 2 | 3;
  estimatedMinutes: number;
  prompt: string;
  studentFlawedCopy?: string;
  tasks: string[];
  hint: string;
  solutionSteps: string[];
  modelAnswer: string;
  gradingRubric: string[];
}

export interface DetailedCourseExperience {
  disciplineFamily: DisciplineFamily;
  disciplineLabel: string;
  classLabel: string;
  estimatedReadMinutes: number;
  estimatedPracticeMinutes: number;
  learningObjectives: string[];
  prerequisites: string[];
  glossary: { term: string; definition: string }[];
  enrichedSections: EnrichedCourseSection[];
  /** Schémas illustrés (SVG hors ligne) pertinents pour la matière du chapitre. */
  diagramGallery: NonNullable<CourseSection['diagramId']>[];
  workedCaseStudy: WorkedCaseStudy;
  practicalExercises: PracticalExercise[];
  quickRecapChecklist: string[];
}

interface DisciplineProfile {
  label: string;
  analogyLead: string;
  methodVerb: string;
  verificationHabit: string;
  caseFraming: string;
  examExpectation: string;
  exerciseContext: string;
}

const DISCIPLINE_PROFILES: Record<DisciplineFamily, DisciplineProfile> = {
  exact_sciences: {
    label: 'Sciences exactes & Modélisation',
    analogyLead:
      'En sciences exactes, une formule n’est jamais une simple suite de lettres : elle relie des grandeurs mesurables dont les unités et le domaine de validité garantissent la justesse du résultat.',
    methodVerb: 'modéliser, poser les hypothèses, calculer et contrôler l’ordre de grandeur',
    verificationHabit:
      'Vérifie systématiquement les signes, les unités SI, le domaine de définition et la cohérence numérique du résultat final.',
    caseFraming: 'Situation-problème scientifique et résolution analytique guidée',
    examExpectation:
      'Le jury note autant la rigueur de la démonstration (hypothèses nommées, théorème cité, étapes intermédiaires) que la valeur finale encadrée.',
    exerciseContext: 'résolution chiffrée, démonstration guidée et contrôle d’homogénéité',
  },
  tech_engineering: {
    label: 'Ingénierie, Numérique & Systèmes',
    analogyLead:
      'En ingénierie et en informatique, chaque concept répond à une contrainte opérationnelle précise (performance, fiabilité, sécurité, coût ou norme technique).',
    methodVerb: 'analyser le cahier des charges, choisir l’architecture/algorithme, dimensionner et tester les cas limites',
    verificationHabit:
      'Teste toujours un cas nominal, un cas limite (valeur nulle, surcharge ou panne) et vérifie la conformité aux normes techniques.',
    caseFraming: 'Étude technique de dimensionnement / conception pas à pas',
    examExpectation:
      'On attend une démarche structurée : spécification claire, choix technologique justifié, calcul ou pseudo-code propre et validation des contraintes.',
    exerciseContext: 'conception technique, diagnostic de panne et mise en œuvre opérationnelle',
  },
  life_health: {
    label: 'Sciences de la Vie, Santé & Clinique',
    analogyLead:
      'En biologie et en santé, la structure explique toujours la fonction : comprendre le mécanisme physiologique permet de déduire les signes cliniques, les risques et la conduite à tenir.',
    methodVerb: 'observer les signes/données biologiques, relier au mécanisme physiopathologique et justifier la décision',
    verificationHabit:
      'Contrôle toujours les valeurs normales de référence, les contre-indications, les mesures d’hygiène/prévention et la cohérence biologique.',
    caseFraming: 'Cas biologique ou clinique commenté étape par étape',
    examExpectation:
      'Le correcteur évalue la précision du vocabulaire scientifique, l’enchaînement cause → mécanisme → conséquence et la sécurité des décisions.',
    exerciseContext: 'analyse de données biologiques/cliniques, mécanisme expliqué et conduite pratique',
  },
  law_public: {
    label: 'Droit, Institutions & Action Publique',
    analogyLead:
      'En droit et en administration publique, tout raisonnement suit le syllogisme juridique : faits qualifiés → règle de droit applicable (texte, principe, jurisprudence) → solution motivée.',
    methodVerb: 'qualifier juridiquement les faits, citer la règle pertinente, confronter au cas d’espèce et conclure',
    verificationHabit:
      'Vérifie la hiérarchie des normes, la compétence de l’autorité concernée, les délais légaux et la distinction entre principe et exceptions.',
    caseFraming: 'Cas pratique juridique / administratif résolu au syllogisme',
    examExpectation:
      'Un raisonnement juridique convaincant énonce d’abord la règle générale exacte avant de l’appliquer strictement aux faits, sans jamais donner d’avis personnel gratuit.',
    exerciseContext: 'qualification de faits, syllogisme juridique et note d’analyse administrative',
  },
  econ_management: {
    label: 'Économie, Finance, Gestion & Stratégie',
    analogyLead:
      'En économie et en gestion, chaque indicateur ou décision arbitrée traduit un équilibre entre ressources limitées, création de valeur, risque et horizon temporel.',
    methodVerb: 'identifier les acteurs et flux, calculer ou interpréter l’indicateur clé et formuler une recommandation chiffrée',
    verificationHabit:
      'Compare toujours l’indicateur à un seuil de référence (rentabilité, solvabilité, inflation, équilibre) et précise les limites de l’hypothèse retenue.',
    caseFraming: 'Étude de cas économique / financière & aide à la décision',
    examExpectation:
      'Le jury attend un diagnostic clair appuyé sur des mécanismes théoriques précis, des calculs justes (ratios, variations, soldes) et des recommandations réalistes.',
    exerciseContext: 'diagnostic chiffré, arbitrage de gestion et interprétation économique',
  },
  letters_langs: {
    label: 'Lettres, Langues & Communication',
    analogyLead:
      'En lettres, langues et communication, la forme sert toujours le sens : un procédé, un temps verbal ou une structure argumentative produit un effet précis sur le destinataire.',
    methodVerb: 'observer le texte ou l’énoncé, nommer le procédé/règle linguistique, interpréter l’effet produit et rédiger avec clarté',
    verificationHabit:
      'Relis toujours l’orthographe, les accords, la concordance des temps, la progression logique des paragraphes et la pertinence des citations.',
    caseFraming: 'Analyse méthodique et exercice de rédaction guidée',
    examExpectation:
      'On valorise la maîtrise précise du vocabulaire d’analyse, l’appui sur des exemples exacts et une expression fluide, nuancée et sans contresens.',
    exerciseContext: 'analyse d’énoncé, réécriture ciblée et production écrite structurée',
  },
  humanities_social: {
    label: 'Sciences Humaines, Histoire-Géo & Philosophie',
    analogyLead:
      'En sciences humaines, aucun fait ou concept ne s’explique isolément : il s’inscrit dans un contexte spatial, historique, social ou conceptuel qu’il faut problématiser.',
    methodVerb: 'définir les termes, contextualiser dans le temps/l’espace, problématiser et argumenter avec des repères précis',
    verificationHabit:
      'Vérifie l’exactitude des dates, lieux, auteurs et concepts, et assure-toi que chaque paragraphe répond explicitement à la problématique posée.',
    caseFraming: 'Analyse problématisée et étude de document / situation',
    examExpectation:
      'Le correcteur attend une problématique claire, des arguments illustrés par des repères vérifiés et une capacité à nuancer sans tomber dans le hors-sujet.',
    exerciseContext: 'contextualisation, problématisation et argumentation illustrée',
  },
  finance_trading: {
    label: 'Trading, Marchés Financiers & Gestion du Risque',
    analogyLead:
      'En trading, aucune décision ne se prend « au feeling » : chaque position doit être justifiée par une structure de marché lisible, un scénario écrit, un stop-loss défini et une taille de position calculée en fonction du risque accepté. Le prix est l’unique vérité ; les indicateurs ne sont que des filtres.',
    methodVerb:
      'identifier la structure et la tendance, localiser la zone de décision, définir l’entrée, le stop-loss, l’objectif et la taille de position, puis journaliser le trade',
    verificationHabit:
      'Vérifie toujours le ratio risque/récompense (≥ 1:2), la taille de position calculée à partir du risque en pourcentage, le contexte multi-timeframes et l’absence de news majeure à venir.',
    caseFraming: 'Étude de cas de trading simulée (analyse, scénario, exécution et gestion du risque)',
    examExpectation:
      'Le correcteur valorise un raisonnement reproductible : biais directionnel justifié par la structure, entrée/stop/objectif chiffrés, taille de position calculée et risque total maîtrisé.',
    exerciseContext:
      'lecture de graphique, scénario chiffré, calcul de la taille de position et débriefing du trade',
  },
  earth_agro: {
    label: 'Géosciences, Eau, Climat & Agronomie',
    analogyLead:
      'En géosciences, environnement et agronomie, les phénomènes résultent d’interactions mesurables entre le sol, l’eau, le climat, le vivant et les activités humaines.',
    methodVerb: 'caractériser le milieu, identifier les facteurs limitants, appliquer la loi/technique adaptée et évaluer la durabilité',
    verificationHabit:
      'Contrôle les bilans (hydrique, minéral, énergétique), les échelles spatiales et temporelles, ainsi que l’impact environnemental et agronomique.',
    caseFraming: 'Étude de terrain & diagnostic environnemental / agronomique',
    examExpectation:
      'On évalue la capacité à relier observations de terrain, processus physiques/biologiques et solutions techniques durables adaptées au contexte local.',
    exerciseContext: 'diagnostic de terrain, calcul de bilan et préconisation technique durable',
  },
};

export function classifyDisciplineFamily(subject?: Subject): DisciplineFamily {
  const key = `${subject?.id ?? ''} ${subject?.name ?? ''}`.toLowerCase();
  if (
    /(math|physiq|chim|stat|proba|mecan|optiq|thermo|astro|calcul|algebr|geometr|nucleair|quant)/.test(
      key
    )
  ) {
    return 'exact_sciences';
  }
  if (
    /(info|algo|cyber|reseau|telecom|electr|robot|ia|intell|data|cloud|devops|logiciel|web|btp|genie|civil|archit|aero|energ|automat|industr|sig|materiau|mecatron)/.test(
      key
    )
  ) {
    return 'tech_engineering';
  }
  if (
    /(svt|biolog|medec|anat|physio|pharm|sante|obstet|pediat|nutri|microb|genet|immun|vet|neuro|epidem|infirm|biochim)/.test(
      key
    )
  ) {
    return 'life_health';
  }
  if (
    /(droit|jurid|constit|admin|polit|diplom|relat.*inter|finances_pub|marche.*pub|deontol|penal|fiscal|institution|gouvern|civique|ecjs)/.test(
      key
    )
  ) {
    return 'law_public';
  }
  if (/(trading|forex|scalping|crypto.*trad|analyse.*technique|price.?action)/.test(key)) {
    return 'finance_trading';
  }
  if (
    /(econ|compta|syscohada|financ|banq|gestion|projet|entrep|market|logist|comm.*inter|fintech|audit|rh|ressources_hum|assur|bourse|microfin)/.test(
      key
    )
  ) {
    return 'econ_management';
  }
  if (
    /(franc|litter|angl|arab|espag|allem|langu|lingu|redac|journal|communi|rh[eé]tor|traduc|express)/.test(
      key
    )
  ) {
    return 'letters_langs';
  }
  if (
    /(geol|mine|petrol|hydrol|eau|climat|agron|agric|ecol|envir|forest|elev|pedol|ocean|meteo)/.test(
      key
    )
  ) {
    return 'earth_agro';
  }
  return 'humanities_social';
}

function cleanSentence(text?: string | null): string {
  if (!text) return '';
  return text.replace(/\s+/g, ' ').trim();
}

function stripClassSuffix(title: string): string {
  return title.replace(/\s*\([^)]{2,24}\)\s*$/, '').trim();
}

/**
 * Dynamically builds a deep, well-explained course + worked example + 4 interactive practical exercises
 * for ANY of the 10,000 chapters across all 100 subjects — 100% offline with zero startup RAM bloat.
 */
export function buildDetailedCourseExperience(params: {
  course: Course;
  chapter?: Chapter;
  subject?: Subject;
  fiche?: Fiche;
  chapterQuestions: Question[];
  chapterFlashcards: Flashcard[];
}): DetailedCourseExperience {
  const { course, chapter, subject, fiche, chapterQuestions, chapterFlashcards } = params;

  const disciplineFamily = classifyDisciplineFamily(subject);
  const profile = DISCIPLINE_PROFILES[disciplineFamily];
  const classMeta = getClassLevelMeta(course.classLevel ?? chapter?.classLevel ?? 'terminale');
  const subjectName = subject?.name ?? 'Discipline générale';
  const cleanTitle = stripClassSuffix(course.title);
  const chapterOrder = chapter?.order ?? 1;

  // Extract authoritative pedagogical anchors from the chapter's real fiche, course, questions & flashcards
  const primaryNotion =
    cleanSentence(fiche?.notionsEssentielles?.[0]) ||
    cleanSentence(chapterQuestions[0]?.notion) ||
    cleanSentence(course.sections[0]?.keyTakeaway) ||
    cleanTitle;

  const primaryFormula =
    cleanSentence(fiche?.formules?.[0]?.formule) ||
    cleanSentence(course.sections.find((s) => s.formula)?.formula) ||
    cleanSentence(fiche?.notionsEssentielles?.[2]) ||
    cleanSentence(course.sections[1]?.keyTakeaway) ||
    `Règle fondamentale de « ${cleanTitle} »`;

  const primaryTrap =
    cleanSentence(fiche?.erreursFrequentes?.[0]) ||
    cleanSentence(
      course.sections
        .find((s) => /piège|erreur|éviter/i.test(`${s.heading} ${s.keyTakeaway}`))
        ?.keyTakeaway.replace(/^Piège classique à écarter\s*:\s*/i, '')
    ) ||
    `Confondre les conditions d’application de « ${cleanTitle} » ou conclure sans justifier les étapes.`;

  const secondaryTrap =
    cleanSentence(fiche?.erreursFrequentes?.[1]) ||
    `Oublier de relier la réponse à la notion clé (« ${primaryNotion} ») et de vérifier la cohérence finale.`;

  const ficheWorkedExample = cleanSentence(fiche?.exemples?.[0]?.contenu);
  const ficheMethodSteps =
    fiche?.methodes && fiche.methodes.length > 0
      ? fiche.methodes.map((m) => cleanSentence(m))
      : [
          `1. Lire attentivement l’énoncé et rattacher la question à « ${primaryNotion} ».`,
          `2. Poser explicitement la règle ou le cadre de référence : ${primaryFormula}.`,
          `3. Dérouler l’application étape par étape sans sauter de justification intermédiaire.`,
          `4. Contrôler le résultat face au piège classique : ${primaryTrap}.`,
        ];

  // Build deduplicated glossary from fiche definitions, flashcards, and section takeaways
  const glossaryMap = new Map<string, string>();
  if (fiche?.definitions) {
    for (const d of fiche.definitions) {
      const t = cleanSentence(d.terme);
      const def = cleanSentence(d.definition);
      if (t && def && !glossaryMap.has(t.toLowerCase())) {
        glossaryMap.set(t.toLowerCase(), `${t}:::${def}`);
      }
    }
  }
  if (!glossaryMap.has(cleanTitle.toLowerCase())) {
    glossaryMap.set(
      cleanTitle.toLowerCase(),
      `${cleanTitle}:::Chapitre n°${chapterOrder} de ${subjectName} (${classMeta.label}) centré sur ${primaryNotion}.`
    );
  }
  if (fiche?.formules) {
    for (const f of fiche.formules.slice(0, 3)) {
      const label = cleanSentence(f.label);
      const form = cleanSentence(f.formule);
      if (label && form && !glossaryMap.has(label.toLowerCase())) {
        glossaryMap.set(
          label.toLowerCase(),
          `${label}:::${form}${f.unite ? ` (Unité / repère : ${f.unite})` : ''}`
        );
      }
    }
  }
  if (glossaryMap.size < 3 && chapterFlashcards.length > 0) {
    for (const fc of chapterFlashcards.slice(0, 2)) {
      const q = cleanSentence(fc.question);
      const a = cleanSentence(fc.answer);
      if (q && a && !glossaryMap.has(q.toLowerCase())) {
        glossaryMap.set(q.toLowerCase(), `${q}:::${a}`);
      }
    }
  }
  const glossary = Array.from(glossaryMap.values())
    .slice(0, 6)
    .map((raw) => {
      const [term, definition] = raw.split(':::');
      return { term, definition };
    });

  // Learning objectives (4 progressive Bloom levels)
  const learningObjectives = [
    `Définir avec précision les concepts fondamentaux de « ${cleanTitle} » (${classMeta.label}) et situer la notion centrale : ${primaryNotion}.`,
    `Comprendre en profondeur le mécanisme et le champ d’application de la règle clé : ${primaryFormula}.`,
    `Savoir ${profile.methodVerb} dans un exercice pratique complet sur « ${cleanTitle} ».`,
    `Détecter et corriger immédiatement l’erreur la plus sanctionnée en examen : ${primaryTrap}.`,
  ];

  // Prerequisites
  const prerequisites = [
    `Programme ${subjectName} — Niveau ${classMeta.label} (Chapitre ${chapterOrder}).`,
    `Maîtrise du vocabulaire de base en ${profile.label.toLowerCase()}.`,
    `Capacité à lire une consigne, identifier les données utiles et rédiger une justification structurée.`,
  ];

  // Enrich EVERY section of the course with deep explanations, step-by-step reasoning, concrete illustrations & mistake guards
  const enrichedSections: EnrichedCourseSection[] = course.sections.map((sec, idx) => {
    const isIntro = idx === 0;
    const isRule = Boolean(sec.formula) || idx === 1;
    const isMethod = idx === 2 || /méthode|piège|étape/i.test(sec.heading);

    let deepExplanation: string;
    let stepByStepBreakdown: string[];
    let concreteIllustration: string;
    let commonMistakeWarning: { mistake: string; fix: string } | undefined;

    if (isIntro) {
      deepExplanation = `${profile.analogyLead} Dans ce chapitre consacré à « ${cleanTitle} », l’enjeu pédagogique consiste à dépasser la simple mémorisation mécanique : il faut comprendre comment « ${primaryNotion} » s’articule avec l’ensemble du programme de ${subjectName} (${classMeta.label}). ${profile.examExpectation}`;
      stepByStepBreakdown = [
        `Repérer le thème exact : dès que l’énoncé évoque « ${cleanTitle} » ou « ${primaryNotion} », mobilise immédiatement ce cadre de cours.`,
        `Identifier les données et conditions initiales fournies par le sujet avant d’écrire la moindre conclusion.`,
        `Relier le concept à son utilité concrète en ${subjectName} pour donner du sens à chaque étape de résolution.`,
      ];
      concreteIllustration = `En situation d’examen (${classMeta.shortLabel}), lorsqu’un sujet porte sur « ${cleanTitle} », commence toujours par poser en 1 à 2 phrases la définition opérationnelle de « ${primaryNotion} » : cela sécurise d’emblée les premiers points du barème et oriente toute la suite de ta copie.`;
    } else if (isRule) {
      deepExplanation = `La règle « ${sec.formula ?? primaryFormula} » représente le cœur opérationnel du chapitre. Pour la maîtriser durablement, demande-toi toujours trois choses : (1) À quelles conditions précises s’applique-t-elle ? (2) Que signifie chaque terme ou élément qu’elle relie ? (3) Que se passe-t-il si l’une des hypothèses change ? C’est cette compréhension active qui distingue une copie moyenne d’une copie excellente.`;
      stepByStepBreakdown = [
        `Énoncer la règle exacte sans l’abréger : ${sec.formula ?? primaryFormula}.`,
        `Vérifier que toutes les conditions d’application sont bien réunies dans l’exercice étudié.`,
        `Appliquer la règle de manière progressive en détaillant chaque transformation ou argument intermédiaire.`,
        `Relire le résultat obtenu : ${profile.verificationHabit}`,
      ];
      concreteIllustration = `Mise en application type : si un sujet te demande de démontrer, calculer ou justifier un résultat lié à « ${cleanTitle} », écris d’abord explicitement la règle « ${sec.formula ?? primaryFormula} », puis substitue les éléments propres à l’énoncé ligne par ligne.`;
      commonMistakeWarning = {
        mistake: primaryTrap,
        fix: `Avant de valider ta réponse, vérifie que tu as cité la règle exacte (« ${sec.formula ?? primaryFormula} ») et contrôlé ses conditions de validité.`,
      };
    } else if (isMethod) {
      deepExplanation = `La réussite aux examens et concours repose sur une méthode reproductible même sous pression du chronomètre. Sur « ${cleanTitle} », la majorité des points perdus ne vient pas d’un manque de connaissances mais d’une étape sautée ou d’une erreur d’inattention. Appliquer systématiquement une grille en 4 temps élimine près de 80 % des erreurs évitables.`;
      stepByStepBreakdown = ficheMethodSteps.slice(0, 4);
      concreteIllustration = `Astuce de copie : découpe visuellement ta résolution en 3 blocs courts — (1) « Données / Cadre », (2) « Application de la règle », (3) « Conclusion vérifiée ». Un correcteur repère immédiatement ta rigueur et attribue les points d’étape.`;
      commonMistakeWarning = {
        mistake: primaryTrap,
        fix: `Fais une pause de 10 secondes avant de conclure : ${profile.verificationHabit}`,
      };
    } else {
      deepExplanation = `Une notion n’est réellement acquise que lorsqu’on est capable de la transférer sur un cas inédit, de l’expliquer simplement à voix haute (méthode Feynman) et de résister aux pièges de formulation. En combinant ce cours avec les exercices pratiques ci-dessous, tu transformes une lecture passive en automatisme fiable le jour de l’épreuve.`;
      stepByStepBreakdown = [
        `Traiter l’exemple résolu ci-dessous en cachant d’abord le corrigé pour tester tes réflexes.`,
        `Réaliser les exercices pratiques progressifs (Application → Pratique → Erreur à corriger → Synthèse).`,
        `Compléter par la série QCM du chapitre puis par un rappel libre sans notes dans l’Atelier Méthode Active.`,
      ];
      concreteIllustration =
        ficheWorkedExample ||
        `Transfert pratique : dans un sujet complet de ${subjectName} (${classMeta.shortLabel}), « ${cleanTitle} » peut apparaître sous forme de question directe, d’étude de document ou d’étape intermédiaire dans un problème plus vaste.`;
      commonMistakeWarning = {
        mistake: secondaryTrap,
        fix: `Termine toujours par une phrase-bilan claire qui répond exactement à la question posée en réutilisant les mots-clés du chapitre.`,
      };
    }

    return {
      ...sec,
      deepExplanation,
      stepByStepBreakdown,
      concreteIllustration,
      commonMistakeWarning,
    };
  });

  // v17.4 — Illustration : toute matière à schéma (anatomie, biologie, trading, géologie…)
  // reçoit automatiquement un graphique SVG hors ligne, même si le cours source n'en declare aucun.
  const subjectDiagramGallery = getSubjectDiagramGallery(subject);
  if (!enrichedSections.some((s) => s.diagramId)) {
    const autoDiagram = getChapterDiagram(subject, chapterOrder);
    if (autoDiagram && enrichedSections.length > 0) {
      enrichedSections[0] = { ...enrichedSections[0], diagramId: autoDiagram };
    }
  }

  // Worked Case Study (fully solved step-by-step example)
  const firstQ = chapterQuestions[0];
  const workedCaseStudy: WorkedCaseStudy = {
    title: `Exemple résolu pas à pas — ${cleanTitle}`,
    contextBadge: `${profile.caseFraming} · ${classMeta.shortLabel}`,
    scenario:
      ficheWorkedExample ||
      (firstQ
        ? `Situation d’épreuve (${subjectName}) : ${firstQ.prompt}${firstQ.context ? ` (${firstQ.context})` : ''}`
        : `On te soumet un cas d’application officiel en ${subjectName} (${classMeta.label}) portant sur « ${cleanTitle} ». Tu dois identifier la notion mobilisée, appliquer la règle de référence et rédiger une réponse complète sans tomber dans le piège habituel.`),
    givenData: [
      `Discipline & niveau : ${subjectName} — ${classMeta.label} (Chapitre ${chapterOrder})`,
      `Notion centrale identifiée : ${primaryNotion}`,
      `Règle / principe de référence : ${primaryFormula}`,
      `Point de vigilance annoncé : ${primaryTrap}`,
    ],
    methodChoice: `Pour traiter ce cas sans erreur, on applique la démarche en 4 étapes propre à « ${profile.label} » : ${profile.methodVerb}.`,
    steps: [
      {
        stepTitle: 'Étape 1 — Analyse de la consigne & repérage des données',
        detail: `On souligne les mots-clés de l’énoncé et on identifie immédiatement le thème : « ${cleanTitle} ». On rattache la situation à la notion fondamentale « ${primaryNotion} » afin d’éviter tout hors-sujet.`,
      },
      {
        stepTitle: 'Étape 2 — Mobilisation de la règle / formule exacte',
        detail: `On énonce clairement le principe opératoire à appliquer : ${primaryFormula}. On vérifie que toutes les hypothèses et conditions d’utilisation sont respectées dans le cas présenté.`,
      },
      {
        stepTitle: 'Étape 3 — Déploiement détaillé de la résolution',
        detail: firstQ
          ? `${firstQ.explanation} ${firstQ.steps?.length ? `Enchaînement logique : ${firstQ.steps.join(' → ')}.` : ''}`
          : `On applique rigoureusement « ${primaryFormula} » aux données du sujet en détaillant chaque lien logique (cause → mécanisme → conséquence ou calcul intermédiaire).`,
      },
      {
        stepTitle: 'Étape 4 — Contrôle anti-piège & rédaction finale',
        detail: `Avant de clore la réponse, on vérifie qu’on n’a pas commis l’erreur classique (« ${primaryTrap} »), puis on formule une conclusion concise, précise et directement exploitable par le correcteur.`,
      },
    ],
    finalAnswer: firstQ
      ? `Conclusion rédigée : ${firstQ.options[firstQ.correctIndex]} — Justifié par « ${primaryNotion} » et la règle « ${primaryFormula} ».`
      : `Conclusion rédigée : En appliquant « ${primaryFormula} » dans le cadre de « ${primaryNotion} », la solution est rigoureusement démontrée et exempte du piège (« ${primaryTrap} »).`,
    verificationCheck: profile.verificationHabit,
  };

  // 4 Interactive Practical Exercises per chapter (Progressive: ★☆☆ → ★★☆ → ★★★ → ★★★)
  const autoEval0 = fiche?.autoEvaluation?.[0];
  const autoEval1 = fiche?.autoEvaluation?.[1];
  const sampleQ = chapterQuestions[0];
  const sampleQ2 = chapterQuestions[1];

  const practicalExercises: PracticalExercise[] = [
    {
      id: `${course.id}-ex-1`,
      number: 1,
      title: `Application directe — Maîtriser les fondements de « ${cleanTitle} »`,
      kind: 'application',
      difficultyLabel: 'Fondamental',
      stars: 1,
      estimatedMinutes: 5,
      prompt:
        autoEval0?.question ||
        `Sans regarder le cours, explique clairement la notion centrale de « ${cleanTitle} » (${classMeta.shortLabel}) et énonce la règle de référence à mobiliser en ${subjectName}.`,
      tasks: [
        `a) Définis avec tes propres mots la notion clé : « ${primaryNotion} ».`,
        `b) Restitue intégralement la règle ou formule de référence du chapitre.`,
        `c) Cite une condition indispensable pour que cette règle reste valable.`,
      ],
      hint: `Appuie-toi sur les deux piliers de la section 1 et de la section 2 : identifie d’abord le concept (« ${primaryNotion.slice(0, 65)}${primaryNotion.length > 65 ? '…' : ''} »), puis formule le principe opératoire exact.`,
      solutionSteps: [
        `1. Définition précise : « ${cleanTitle} » s’articule autour de ${primaryNotion}.`,
        `2. Règle de référence : ${primaryFormula}.`,
        `3. Condition de validité : vérifier le cadre d’application avant toute utilisation afin d’écarter le piège (« ${primaryTrap} »).`,
      ],
      modelAnswer:
        autoEval0?.reponse ||
        `En ${subjectName} (${classMeta.label}), « ${cleanTitle} » repose sur la notion centrale suivante : ${primaryNotion}. La règle fondamentale à appliquer est : ${primaryFormula}. Elle s’utilise toujours après vérification des hypothèses de départ.`,
      gradingRubric: [
        'Définition claire et exacte de la notion centrale (2 pts)',
        'Règle / formule restituée sans omission (2 pts)',
        'Condition d’application ou précision méthodologique mentionnée (1 pt)',
      ],
    },
    {
      id: `${course.id}-ex-2`,
      number: 2,
      title: `Mise en pratique guidée — Résoudre un cas concret (${classMeta.shortLabel})`,
      kind: 'pratique',
      difficultyLabel: 'Intermédiaire',
      stars: 2,
      estimatedMinutes: 10,
      prompt: `Atelier pratique (${profile.exerciseContext}) : on te demande de traiter un exercice d’application portant sur « ${cleanTitle} » en mobilisant la méthode complète du cours.`,
      tasks: [
        `a) Identifie les données d’entrée et le problème précis lié à « ${primaryNotion} ».`,
        `b) Applique étape par étape la règle « ${primaryFormula} » en justifiant chaque transition.`,
        `c) Rédige la conclusion finale et précise le contrôle qualité que tu effectues avant de rendre ta copie.`,
      ],
      hint: `Reprends la grille en 4 étapes : ${ficheMethodSteps[0]} → ${ficheMethodSteps[1] ?? primaryFormula}. N’écris jamais le résultat final sans la ligne de justification qui y mène.`,
      solutionSteps: ficheMethodSteps.slice(0, 4),
      modelAnswer: `${ficheWorkedExample || `Face à ce cas pratique sur « ${cleanTitle} », on pose d’abord « ${primaryNotion} », puis on applique méthodiquement « ${primaryFormula} ».`} Vérification finale : ${profile.verificationHabit}`,
      gradingRubric: [
        'Données correctement identifiées et problématique bien posée (1,5 pt)',
        'Application rigoureuse et justifiée de la règle (2,5 pts)',
        'Conclusion claire et contrôle de cohérence effectué (1 pt)',
      ],
    },
    {
      id: `${course.id}-ex-3`,
      number: 3,
      title: 'Diagnostic critique — Trouve et corrige le piège d’examen',
      kind: 'erreur',
      difficultyLabel: 'Approfondi',
      stars: 3,
      estimatedMinutes: 8,
      prompt: `Un candidat en ${classMeta.label} a rendu l’extrait de copie ci-dessous lors d’une épreuve de ${subjectName} sur « ${cleanTitle} ». Sa réponse contient une erreur classique très pénalisée par les correcteurs. Joue le rôle du professeur correcteur !`,
      studentFlawedCopy: `« Sur le sujet "${cleanTitle}", il suffit d’appliquer directement une règle générale sans vérifier les conditions : ${primaryTrap}. Donc la réponse est forcément exacte sans autre justification. »`,
      tasks: [
        `a) Repère et nomme précisément l’erreur commise dans cette copie d’élève.`,
        `b) Explique en 2 à 3 lignes pourquoi ce raisonnement conduit à une réponse fausse ou incomplète.`,
        `c) Réécris une réponse modèle irréprochable en mobilisant la vraie règle du cours.`,
      ],
      hint: `Compare l’affirmation du candidat avec le point de vigilance du cours : vérifie les hypothèses initiales et la formulation exacte de « ${primaryFormula} ».`,
      solutionSteps: [
        `1. Erreur identifiée : le candidat tombe exactement dans le piège classique du chapitre — ${primaryTrap}.`,
        `2. Pourquoi c’est sanctionné : en ${subjectName}, appliquer une règle sans vérifier ses hypothèses ou en déformant « ${primaryNotion} » invalide toute la conclusion.`,
        `3. Correction attendue : poser le cadre (« ${primaryNotion} »), appliquer fidèlement « ${primaryFormula} », puis contrôler la cohérence finale.`,
      ],
      modelAnswer:
        autoEval1?.reponse ||
        `L’erreur du candidat consiste à ${primaryTrap.charAt(0).toLowerCase() + primaryTrap.slice(1)}. La démarche correcte impose de relier d’abord l’énoncé à « ${primaryNotion} », d’appliquer exactement « ${primaryFormula} » et de vérifier chaque hypothèse avant de conclure.`,
      gradingRubric: [
        'Piège classique identifié avec précision (2 pts)',
        'Explication claire de la cause de l’erreur (1,5 pt)',
        'Réécriture rigoureuse de la bonne solution (1,5 pt)',
      ],
    },
    {
      id: `${course.id}-ex-4`,
      number: 4,
      title: `Défi de synthèse type Examen / Concours — ${subjectName}`,
      kind: 'synthese',
      difficultyLabel: 'Approfondi',
      stars: 3,
      estimatedMinutes: 12,
      prompt: sampleQ
        ? `Mise en situation officielle (${sampleQ.source}) : « ${sampleQ.prompt} » ${sampleQ2 ? `Question complémentaire : « ${sampleQ2.prompt} »` : ''} Traite ce sujet comme le jour de l’épreuve en rédigeant une réponse complète et argumentée.`
        : `Sujet de synthèse (${classMeta.label}) : rédige une mini-réponse structurée (Introduction / Développement avec règle et exemple / Conclusion vérifiée) expliquant comment mobiliser « ${cleanTitle} » pour résoudre un problème officiel de ${subjectName}.`,
      tasks: [
        `a) Introduis le sujet en définissant « ${cleanTitle} » et son lien avec « ${primaryNotion} ».`,
        `b) Développe la démonstration ou l’argumentation en t’appuyant sur « ${primaryFormula} » et un exemple concret.`,
        `c) Conclus de manière synthétique en montrant comment tu écartes le piège (« ${primaryTrap} »).`,
      ],
      hint: `${profile.examExpectation} Structure ta réponse en 3 paragraphes courts et lisibles.`,
      solutionSteps: sampleQ?.steps?.length
        ? [
            ...sampleQ.steps.map((st, i) => `${i + 1}. ${st}`),
            `${sampleQ.steps.length + 1}. Synthèse finale : ${sampleQ.explanation}`,
          ]
        : [
            `1. Accroche & définition : situer « ${cleanTitle} » dans ${subjectName} (${classMeta.shortLabel}) via « ${primaryNotion} ».`,
            `2. Cœur de réponse : déployer la règle « ${primaryFormula} » avec rigueur et l’illustrer par un cas concret.`,
            `3. Vérification & conclusion : contrôler l’absence du piège (« ${primaryTrap} ») et formuler une conclusion nette.`,
          ],
      modelAnswer: sampleQ
        ? `Réponse attendue : ${sampleQ.options[sampleQ.correctIndex]}. Explication complète : ${sampleQ.explanation}`
        : `Synthèse modèle : En ${subjectName} (${classMeta.label}), la maîtrise de « ${cleanTitle} » passe par la compréhension de « ${primaryNotion} » et l’application rigoureuse de « ${primaryFormula} ». En suivant la méthode en 4 étapes et en vérifiant systématiquement qu’on évite « ${primaryTrap} », la copie répond pleinement aux exigences du jury.`,
      gradingRubric: [
        'Structure claire (introduction, développement justifié, conclusion) (1,5 pt)',
        'Exactitude scientifique/disciplinaire et maîtrise de la règle (2 pts)',
        'Illustration concrète et recul critique face au piège d’examen (1,5 pt)',
      ],
    },
  ];

  // v17.4 — Trading : 2 ateliers supplémentaires (gestion du risque chiffrée & journal de trade)
  if (disciplineFamily === 'finance_trading') {
    practicalExercises.push(
      {
        id: `${course.id}-ex-5`,
        number: 5,
        title: 'Atelier chiffré — Taille de position, stop-loss & ratio Risque/Récompense',
        kind: 'pratique',
        difficultyLabel: 'Approfondi',
        stars: 3,
        estimatedMinutes: 12,
        prompt: `Mise en situation réelle de trading sur « ${cleanTitle} ». Capital = 1 000 000 FCFA. Risque maximal accepté par trade = 1 %. Le setup sur ${subjectName} donne une entrée à 1,0900, un stop-loss à 1,0860 et un objectif à 1,0980 (EUR/USD, 1 lot standard = 100 000 unités, 1 pip = 10 $ par lot).`,
        tasks: [
          'a) Calcule la distance du stop en pips puis le risque monétaire accepté.',
          'b) Détermine la taille de position (en lots) compatible avec ce risque.',
          'c) Calcule le ratio Risque/Récompense exact et conclus : ce trade doit-il être pris ?',
        ],
        hint:
          'Risque monétaire = 1 000 000 × 1 % = 10 000 FCFA. Distance du stop = 1,0900 − 1,0860 = 40 pips. Taille (lots) = risque ÷ (pips de stop × valeur du pip par lot).',
        solutionSteps: [
          '1. Risque accepté : 1 000 000 × 0,01 = 10 000 FCFA.',
          '2. Stop = 1,0900 − 1,0860 = 0,0040 soit 40 pips.',
          '3. Valeur du pip pour 1 lot = 10 $ ≈ 6 000 FCFA (parité indicative). Risque par lot = 40 × 6 000 = 240 000 FCFA.',
          '4. Taille = 10 000 ÷ 240 000 ≈ 0,04 lot (soit 4 micro-lots).',
          '5. Objectif : 1,0980 − 1,0900 = 80 pips = 2 × le risque ⇒ R:R = 1:2, trade valide.',
        ],
        modelAnswer:
          'Le trade respecte le plan : risque plafonné à 1 % (10 000 FCFA), stop de 40 pips, taille arrondie à 0,04 lot pour ne jamais dépasser le risque, objectif à 80 pips soit un R:R de 1:2. Le trade est donc pris, avec un stop ferme et sans élargissement ultérieur.',
        gradingRubric: [
          'Risque monétaire et distance du stop correctement calculés (1,5 pt)',
          'Taille de position exacte et arrondie à la baisse (2 pts)',
          'Ratio R:R calculé et décision argumentée (1,5 pt)',
        ],
      },
      {
        id: `${course.id}-ex-6`,
        number: 6,
        title: 'Journal de trading & débriefing psychologique du trade',
        kind: 'synthese',
        difficultyLabel: 'Approfondi',
        stars: 3,
        estimatedMinutes: 10,
        prompt: `Le trade précédent est clôturé : il a été gagnant à +2R, mais tu avais hésité et failli déplacer ton stop pendant le mouvement. Rédige la fiche de journal complète de ce trade sur « ${cleanTitle} » et le débriefing de tes biais.`,
        tasks: [
          `a) Renseigne la fiche : marché, unité de temps, setup, entrée, stop, objectif, résultat en R et durée.`,
          `b) Identifie le biais psychologique vécu (peur, FOMO, trading de revanche, excès de confiance) et son impact chiffré.`,
          `c) Formule une règle écrite à ajouter au plan de trading pour neutraliser ce biais sur « ${primaryNotion} ».`,
        ],
        hint:
          'Un journal utile est factuel et chiffré : résultat en R (et non en FCFA), respect ou non du plan (oui/non), émotion dominante, puis une seule action corrective concrète.',
        solutionSteps: [
          '1. Fiche factuelle : entrée 1,0900 / stop 1,0860 / objectif 1,0980 / sortie 1,0980 ⇒ +2R, durée 6 h.',
          '2. Respect du plan : oui pour l’entrée et la taille, non pour l’hésitation (risque de sortie anticipée).',
          '3. Biais identifié : peur de perdre le gain (aversion à la perte) ayant failli provoquer une clôture à +0,5R au lieu de +2R.',
          '4. Action corrective : interdiction de modifier le stop avant +1R, et trailing uniquement selon la règle ATR écrite.',
        ],
        modelAnswer:
          `Journal du trade : ${subjectName}, setup « ${cleanTitle} », entrée 1,0900, stop 1,0860, objectif 1,0980, sortie 1,0980 ⇒ +2R, plan respecté sauf hésitation émotionnelle. Biais : aversion à la perte (peur de rendre le gain). Règle ajoutée au plan : « aucun déplacement de stop avant +1R ; trailing ATR uniquement ; aucune décision sous émotion ».`,
        gradingRubric: [
          'Fiche de journal complète et chiffrée en R (2 pts)',
          'Biais psychologique correctement nommé et quantifié (1,5 pt)',
          'Règle corrective concrète et applicable au plan de trading (1,5 pt)',
        ],
      }
    );
  }

  const quickRecapChecklist = [
    `Je sais définir clairement « ${cleanTitle} » et « ${primaryNotion} » sans regarder mes notes.`,
    `Je maîtrise la règle de référence (« ${primaryFormula} ») et ses conditions d’application.`,
    `J’ai résolu au moins ${Math.max(3, practicalExercises.length - 1)} des ${practicalExercises.length} exercices pratiques en justifiant chaque étape.`,
    `Je sais repérer et éviter immédiatement le piège : ${primaryTrap}.`,
  ];

  return {
    disciplineFamily,
    disciplineLabel: profile.label,
    classLabel: classMeta.label,
    estimatedReadMinutes: Math.max(course.durationMinutes, 20),
    estimatedPracticeMinutes: 35,
    learningObjectives,
    prerequisites,
    glossary,
    enrichedSections,
    diagramGallery: subjectDiagramGallery,
    workedCaseStudy,
    practicalExercises,
    quickRecapChecklist,
  };
}
