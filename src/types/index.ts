export type ScreenId =
  | 'welcome'
  | 'auth'
  | 'onboarding-exam'
  | 'onboarding-goals'
  | 'dashboard'
  | 'library'
  | 'subject-detail'
  | 'chapters'
  | 'annales'
  | 'downloads'
  | 'course-reader'
  | 'fiche-viewer'
  | 'flashcards'
  | 'training'
  | 'mock-exam'
  | 'correction'
  | 'mistakes'
  | 'planner'
  | 'stats'
  | 'favorites'
  | 'notes'
  | 'storage'
  | 'sync'
  | 'teacher'
  | 'privacy';

export type UserCategory =
  | 'lyceen'
  | 'etudiant'
  | 'concours_admin'
  | 'grandes_ecoles'
  | 'certification_pro'
  | 'reconversion'
  | 'enseignant'
  | 'etablissement';

export type Difficulty = 'facile' | 'moyen' | 'difficile';

export type SyncStatus =
  | 'synced'
  | 'pending'
  | 'downloading'
  | 'offline'
  | 'error';

export type FontSizeScale = 'sm' | 'md' | 'lg' | 'xl';

export interface AccessibilitySettings {
  darkMode: boolean;
  highContrast: boolean;
  fontSize: FontSizeScale;
  reducedMotion: boolean;
  audioRate: number;
  wifiOnlyDownloads: boolean;
  localReminders: boolean;
  batterySaver: boolean;
}

export interface PrivacySettings {
  analyticsConsent: boolean;
  aiAssistanceConsent: boolean;
  localEncryptionEnabled: boolean;
  syncMultiDevice: boolean;
  acceptedPolicyDate: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  category: UserCategory;
  country: string;
  studyLevel: string;
  examId: string;
  selectedSubjectIds: string[];
  examDate: string; // YYYY-MM-DD
  currentLevel: 'debutant' | 'intermediaire' | 'avance';
  dailyMinutes: number;
  restDays: number[]; // 0 = Sun, 1 = Mon ... 6 = Sat
  targetScore: number; // out of 100
  plan: 'gratuit' | 'premium';
  createdAt: string;
  onboardingCompleted: boolean;
}

export interface ExamTrack {
  id: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  level: string;
  subjectIds: string[];
  isPremium?: boolean;
  badgeColor: string;
}

export interface Subject {
  id: string;
  name: string;
  shortName: string;
  examIds: string[];
  color: string;
  icon: string;
  description: string;
  sizeKb: number;
  isPremium?: boolean;
}

export interface Chapter {
  id: string;
  subjectId: string;
  title: string;
  order: number;
  summary: string;
  estimatedMinutes: number;
  difficulty: Difficulty;
  courseId: string;
  ficheId: string;
}

export interface CourseSection {
  id: string;
  heading: string;
  content: string;
  keyTakeaway: string;
  formula?: string;
  diagramId?:
    | 'parabole'
    | 'circuit_rc'
    | 'separation_pouvoirs'
    | 'mitose'
    | 'offre_demande'
    | 'cycle_projet';
}

export interface Course {
  id: string;
  subjectId: string;
  chapterId: string;
  title: string;
  durationMinutes: number;
  sizeKb: number;
  sections: CourseSection[];
  updatedAt: string;
}

export interface Question {
  id: string;
  subjectId: string;
  chapterId: string;
  examIds: string[];
  prompt: string;
  context?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  steps: string[];
  notion: string;
  difficulty: Difficulty;
  ficheId?: string;
  source: string;
  isOfficial: boolean;
  disputable?: boolean;
  disputableNote?: string;
  estimatedSeconds: number;
  createdByTeacher?: boolean;
}

export interface Annale {
  id: string;
  title: string;
  examId: string;
  subjectId: string;
  chapterIds: string[];
  year: number;
  difficulty: Difficulty;
  durationMinutes: number;
  questionIds: string[];
  examType: string;
  language: string;
  responseFormat: 'QCM' | 'QCM & Problèmes' | 'Étude de cas';
  sizeKb: number;
  isPremium?: boolean;
  shareable: boolean;
}

export interface FicheTableRow {
  critere: string;
  elementA: string;
  elementB: string;
}

export interface Fiche {
  id: string;
  subjectId: string;
  chapterId: string;
  title: string;
  subtitle: string;
  sizeKb: number;
  isPremium?: boolean;
  notionsEssentielles: string[];
  definitions: { terme: string; definition: string }[];
  formules: { label: string; formule: string; unite?: string }[];
  datesReperes: { repere: string; detail: string }[];
  methodes: string[];
  erreursFrequentes: string[];
  exemples: { titre: string; contenu: string }[];
  resumeExpress: string;
  tableauComparatif: {
    headers: [string, string, string];
    rows: FicheTableRow[];
  };
  autoEvaluation: { question: string; reponse: string }[];
}

export type MasteryLevel = 0 | 1 | 2 | 3; // 0: non maîtrisée, 1: à revoir bientôt, 2: maîtrisée, 3: parfaitement maîtrisée

export interface Flashcard {
  id: string;
  subjectId: string;
  chapterId: string;
  question: string;
  answer: string;
  definition?: string;
  formula?: string;
  example?: string;
  diagramId?: CourseSection['diagramId'];
}

export interface FlashcardProgress {
  cardId: string;
  mastery: MasteryLevel;
  intervalDays: number;
  easeFactor: number;
  repetitions: number;
  nextReviewAt: string; // ISO date
  lastReviewedAt: string;
}

export type TrainingMode =
  | 'rapide'
  | 'examen_blanc'
  | 'libre'
  | 'erreurs'
  | 'defi_quotidien';

export interface QuestionAnswerRecord {
  questionId: string;
  selectedIndex: number | null;
  isCorrect: boolean;
  timeSpentSeconds: number;
  modifiedCount: number;
  flaggedForReview: boolean;
  skipped: boolean;
}

export interface SessionRecord {
  id: string;
  mode: TrainingMode;
  title: string;
  annaleId?: string;
  subjectId?: string;
  startedAt: string;
  completedAt: string;
  durationLimitSeconds?: number;
  totalTimeSeconds: number;
  remainingSeconds?: number;
  scorePercent: number;
  correctCount: number;
  totalCount: number;
  answers: QuestionAnswerRecord[];
  allowBackNavigation?: boolean;
  synced: boolean;
}

export interface InProgressSession {
  id: string;
  mode: TrainingMode;
  title: string;
  annaleId?: string;
  subjectId?: string;
  questionIds: string[];
  currentIndex: number;
  answers: Record<
    string,
    {
      selectedIndex: number | null;
      timeSpentSeconds: number;
      modifiedCount: number;
      flaggedForReview: boolean;
    }
  >;
  startedAt: string;
  elapsedSeconds: number;
  durationLimitSeconds?: number;
  timerMode: 'countdown' | 'progressive';
  allowBackNavigation: boolean;
  focusLock: boolean;
  immediateFeedback: boolean;
}

export interface DownloadedItem {
  id: string;
  type: 'subject' | 'annale' | 'fiche' | 'course';
  title: string;
  subjectId: string;
  sizeKb: number;
  downloadedAt: string;
  version: number;
}

export interface PersonalNote {
  id: string;
  targetType: 'course' | 'fiche' | 'question' | 'general';
  targetId: string;
  targetTitle: string;
  subjectId?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface HighlightItem {
  id: string;
  targetType: 'course' | 'fiche';
  targetId: string;
  text: string;
  color: 'yellow' | 'green' | 'blue';
  createdAt: string;
}

export interface ErrorReport {
  id: string;
  questionId: string;
  questionPrompt: string;
  reason: string;
  createdAt: string;
  status: 'en_attente' | 'examine' | 'corrige';
}

export interface StudyPlanItem {
  id: string;
  date: string; // YYYY-MM-DD
  dayLabel: string;
  subjectId?: string;
  title: string;
  type:
    | 'fiche'
    | 'exercices'
    | 'examen_blanc'
    | 'erreurs'
    | 'bilan'
    | 'pause'
    | 'revision_finale'
    | 'objectif_perso';
  durationMinutes: number;
  completed: boolean;
  targetId?: string;
  priority?: 'haute' | 'normale';
}

export interface SyncQueueItem {
  id: string;
  action: string;
  label: string;
  createdAt: string;
  sizeKb: number;
  retries: number;
}

export interface TeacherDraft {
  id: string;
  kind: 'question' | 'fiche';
  subjectId: string;
  chapterId: string;
  title: string;
  difficulty: Difficulty;
  payload: Question | Fiche;
  validationChecks: {
    noDuplicate: boolean;
    officialCorrectionVerified: boolean;
    sourceCited: boolean;
    curriculumCompliant: boolean;
    upToDate: boolean;
  };
  status: 'brouillon' | 'valide' | 'publie';
  createdAt: string;
}

export interface AppState {
  profiles: UserProfile[];
  activeProfileId: string | null;
  downloadedItems: Record<string, DownloadedItem>;
  sessions: SessionRecord[];
  inProgressSession: InProgressSession | null;
  flashcardProgress: Record<string, FlashcardProgress>;
  favorites: {
    annales: string[];
    fiches: string[];
    courses: string[];
    questions: string[];
  };
  notes: PersonalNote[];
  highlights: HighlightItem[];
  completedCourseIds: string[];
  studyPlan: StudyPlanItem[];
  errorReports: ErrorReport[];
  syncQueue: SyncQueueItem[];
  lastSyncAt: string | null;
  simulatedOffline: boolean;
  simulateSyncError: boolean;
  dailyChallengeCompletedDate: string | null;
  streakDays: number;
  teacherDrafts: TeacherDraft[];
  customQuestions: Question[];
  customFiches: Fiche[];
  accessibility: AccessibilitySettings;
  privacy: PrivacySettings;
}
