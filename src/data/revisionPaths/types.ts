import {
  Annale,
  Chapter,
  Flashcard,
  Fiche,
  Question,
  RevisionPath,
  RevisionPathDay,
  RevisionStepKind,
} from '../../types';

export type RevisionPhaseId =
  | 'diagnostic'
  | 'fondations'
  | 'coeur'
  | 'methode'
  | 'entrainement'
  | 'simulation'
  | 'consolidation';

/** v34.0 — journées du parcours express (J-3, J-2, J-1). */
export type ExpressPhaseId = 'filet-securite' | 'notions-tombables' | 'veille-epreuve';

export type RevisionPhaseKey = RevisionPhaseId | ExpressPhaseId;

export interface RevisionPhaseMeta {
  id: RevisionPhaseKey;
  index: number;
  title: string;
  objective: string;
  minutes: number;
  /** Conseils affichés sous l’objectif du jour. */
  advice: string;
}

/** Les sept journées d’un parcours guidé, dans l’ordre. */
export const REVISION_PHASES: RevisionPhaseMeta[] = [
  {
    id: 'diagnostic',
    index: 1,
    title: 'Diagnostic et repères',
    objective:
      'Mesure ton point de départ sur les chapitres d’ouverture du programme, puis note précisément ce que tu dois revoir.',
    minutes: 65,
    advice: 'Ne consulte pas la correction pendant le QCM : c’est le seul moyen de savoir où tu en es vraiment.',
  },
  {
    id: 'fondations',
    index: 2,
    title: 'Fondations solides',
    objective:
      'Installe les définitions et les mécanismes de base : un cours lu activement, une fiche reconstituée, un premier entraînement.',
    minutes: 65,
    advice: 'Après chaque section de cours, ferme l’écran et redis la notion à voix haute en une phrase.',
  },
  {
    id: 'coeur',
    index: 3,
    title: 'Cœur du programme',
    objective:
      'Attaque les notions centrales les plus tombables, celles qui reviennent dans presque tous les sujets.',
    minutes: 65,
    advice: 'Sur chaque notion, écris la question type que l’examinateur peut poser.',
  },
  {
    id: 'methode',
    index: 4,
    title: 'Méthode et rédaction',
    objective:
      'Apprends à traiter un sujet : méthode de réponse, pièges classiques, formulation attendue par le correcteur.',
    minutes: 60,
    advice: 'Rédige tes réponses comme sur la copie : introduction courte, étapes numérotées, conclusion explicite.',
  },
  {
    id: 'entrainement',
    index: 5,
    title: 'Entraînement ciblé',
    objective:
      'Enchaîne les QCM sur les notions charnières et vérifie tes automatismes avant la simulation.',
    minutes: 60,
    advice: 'Chronomètre chaque série : une question mal lue coûte plus cher qu’une question non sue.',
  },
  {
    id: 'simulation',
    index: 6,
    title: 'Simulation d’examen',
    objective:
      'Passe une annale en conditions réelles, puis corrige question par question pour transformer les erreurs en réflexes.',
    minutes: 65,
    advice: 'Téléphone en mode avion, minuteur visible, aucune pause : la simulation doit ressembler au jour J.',
  },
  {
    id: 'consolidation',
    index: 7,
    title: 'Consolidation et bilan',
    objective:
      'Récupère de mémoire, révise les cartes et boucle le parcours avec un bilan noté pour mesurer ta progression.',
    minutes: 55,
    advice: 'Ce que tu restitues sans support est acquis ; ce qui bloque retourne au programme personnalisé.',
  },
];

/** Les trois journées du parcours express, à activer à J-3, J-2 et J-1. */
export const EXPRESS_PHASES: RevisionPhaseMeta[] = [
  {
    id: 'filet-securite',
    index: 1,
    title: 'Filet de sécurité',
    objective:
      'Sécurise les notions qui rapportent le plus de points : une fiche relue, un cours ciblé, un QCM de calibrage et les cartes du chapitre.',
    minutes: 60,
    advice: 'Coche chaque question réussie : ce que tu sais déjà n’a plus besoin d’être révisé demain.',
  },
  {
    id: 'notions-tombables',
    index: 2,
    title: 'Notions tombables',
    objective:
      'Travaille les notions qui reviennent le plus souvent dans les sujets et vérifie-les avec un QCM court puis un bilan noté.',
    minutes: 70,
    advice: 'Pour chaque notion, récite la définition puis donne un exemple : c’est ce que le correcteur attend.',
  },
  {
    id: 'veille-epreuve',
    index: 3,
    title: 'Veille d’épreuve',
    objective:
      'Dernière ligne droite : relis la fiche mémo, passe une annale en conditions réelles et termine par un bilan pour doser ta confiance.',
    minutes: 75,
    advice: 'Couche-toi tôt : une nuit complète vaut mieux qu’une heure de révision supplémentaire.',
  },
];

export const ALL_REVISION_PHASES: RevisionPhaseMeta[] = [...REVISION_PHASES, ...EXPRESS_PHASES];

export const REVISION_PHASE_BY_ID: Record<string, RevisionPhaseMeta> = Object.fromEntries(
  ALL_REVISION_PHASES.map((phase) => [phase.id, phase])
);

export interface RevisionDayStep {
  id: string;
  kind: RevisionStepKind;
  label: string;
  detail: string;
  minutes: number;
  chapterId?: string;
  courseId?: string;
  ficheId?: string;
  annaleId?: string;
  questionIds: string[];
}

export interface RevisionDayPlan {
  id: string;
  index: number;
  phase: RevisionPhaseKey;
  title: string;
  objective: string;
  advice: string;
  minutes: number;
  chapters: { id: string; title: string }[];
  steps: RevisionDayStep[];
}

export interface RevisionPathPlan {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  goal: string;
  days: RevisionDayPlan[];
  totalMinutes: number;
  stepCount: number;
  questionCount: number;
  coveragePercent: number;
}

export interface RevisionPathSources {
  chapters: Chapter[];
  questions: Question[];
  flashcards: Flashcard[];
  fiches: Fiche[];
  annales: Annale[];
  /** Couverture facultative : nombre total de chapitres de la matière. */
  totalChapterCount: number;
}

export type RevisionPathCatalog = RevisionPath[];
