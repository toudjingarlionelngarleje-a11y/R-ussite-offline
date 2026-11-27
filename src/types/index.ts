export type ScreenId =
  | 'welcome'
  | 'auth'
  | 'onboarding-exam'
  | 'onboarding-goals'
  | 'dashboard'
  | 'diagnostic'
  | 'coach'
  | 'generator'
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
  | 'active-method'
  | 'correction'
  | 'mistakes'
  | 'planner'
  | 'stats'
  | 'favorites'
  | 'notes'
  | 'storage'
  | 'sync'
  | 'community'
  | 'teacher'
  | 'admin'
  | 'owner-hub'
  | 'security'
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

export type SchoolCycleId = 'college' | 'lycee' | 'universite';

export type ClassLevelId =
  | '6e'
  | '5e'
  | '4e'
  | '3e'
  | '2nde'
  | '1ere'
  | '1ere-s'
  | '1ere-l'
  | 'terminale'
  | 'l1'
  | 'l2'
  | 'l3'
  | 'master';

export interface ClassLevelMeta {
  id: ClassLevelId;
  label: string;
  shortLabel: string;
  cycle: SchoolCycleId;
  cycleLabel: string;
  order: number;
  description: string;
  /** Niveau technique (tronc commun de Première) masqué des sélecteurs de classe. */
  hidden?: boolean;
  /** Filière de la Première : scientifique, littéraire ou tronc commun partagé. */
  premiereStream?: 'science' | 'litteraire' | 'commun';
}

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

export type AccountRole = 'user' | 'teacher' | 'admin' | 'owner';

export type TwoFactorMethod = 'device' | 'pin';

export interface TwoFactorConfig {
  required: boolean;
  enabled: boolean;
  method: TwoFactorMethod;
  /** WebAuthn Passkey / Device Lock Credential ID (Base64URL, when method === 'device') */
  webauthnCredentialId?: string;
  /** Human-readable enrolled device label (e.g. "Appareil Android / Windows Hello") */
  webauthnDeviceLabel?: string;
  /** PBKDF2-SHA256 hash of secondary 6-digit Master PIN (when method === 'pin') */
  pinHash?: string;
  /** PBKDF2-SHA256 hashes of one-time 8-char recovery codes */
  recoveryCodeHashes: string[];
  configuredAt?: string;
  lastVerifiedAt?: string;
}

export interface OwnerGlobalSettings {
  announcementEnabled: boolean;
  announcementText: string;
  announcementTone: 'info' | 'success' | 'warning';
  maintenanceMode: boolean;
  registrationsOpen: boolean;
  freePremiumEvent: boolean;
  globalFirewallLevel: 'standard' | 'renforce' | 'forteresse';
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role?: AccountRole;
  twoFactor?: TwoFactorConfig;
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
  classLevels?: ClassLevelId[];
  isPremium?: boolean;
  badgeColor: string;
}

export interface Subject {
  id: string;
  name: string;
  shortName: string;
  examIds: string[];
  classLevels?: ClassLevelId[];
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
  classLevel?: ClassLevelId;
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
    | 'cycle_projet'
    | 'sql_relations'
    | 'bilan_syscohada'
    | 'reaction_chimique'
    | 'loi_normale'
    | 'cycle_cardiaque'
    | 'architecture_ia'
    | 'pyramide_normes'
    | 'photovoltaique'
    | 'cycle_azote'
    | 'pharmacocinetique'
    | 'incoterms_chaine'
    | 'modele_osi'
    | 'poutre_flexion'
    | 'pyramide_alimentaire'
    | 'pyramide_inversee'
    | 'forces_vol'
    | 'couches_geologiques'
    | 'pyramide_maslow'
    | 'flux_fintech'
    | 'couches_sig'
    | 'score_apgar'
    | 'cycle_crise'
    | 'fonctions_chimie'
    // v17.4 — Schémas & illustrations (anatomie humaine, biologie, trading, terrain, électricité)
    | 'corps_humain'
    | 'appareil_digestif'
    | 'appareil_respiratoire'
    | 'systeme_nerveux'
    | 'squelette'
    | 'cellule'
    | 'adn_helice'
    | 'chandeliers_japonais'
    | 'support_resistance'
    | 'gestion_risque_trading'
    | 'coupe_sol'
    | 'circuit_electrique_serie';
}

export interface Course {
  id: string;
  subjectId: string;
  chapterId: string;
  classLevel?: ClassLevelId;
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
  classLevel?: ClassLevelId;
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
  classLevel?: ClassLevelId;
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
  countryOrZone?: string;
  instructions?: string;
  bareme?: string;
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
  classLevel?: ClassLevelId;
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

export type ActiveMethodMode = 'feynman' | 'cloze' | 'sequencing' | 'essay';

export interface ActiveMethodSessionRecord {
  id: string;
  mode: ActiveMethodMode;
  subjectId: string;
  chapterId: string;
  chapterTitle: string;
  scorePercent: number;
  gradeOutOf20?: number;
  durationSeconds: number;
  completedAt: string;
  notesPreview?: string;
}

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
  penalizedScorePercent?: number;
  penaltyPerWrong?: number;
  officialSimulation?: boolean;
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
  penaltyPerWrong?: number;
  officialSimulation?: boolean;
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

export interface DiagnosticResult {
  completedAt: string;
  examId: string;
  estimatedLevel: 'debutant' | 'intermediaire' | 'avance';
  overallScore: number;
  recommendedWeeklyHours: number;
  subjectScores: { subjectId: string; score: number; answered: number }[];
  strongSubjectIds: string[];
  weakSubjectIds: string[];
  priorityChapterIds: string[];
}

export interface StudyGroupMessage {
  id: string;
  author: string;
  role: 'eleve' | 'enseignant';
  text: string;
  createdAt: string;
  reported?: boolean;
}

export interface StudyGroup {
  id: string;
  name: string;
  examId: string;
  inviteCode: string;
  membersCount: number;
  description: string;
  moderated: boolean;
  minorSafe: boolean;
  messages: StudyGroupMessage[];
  sharedFicheIds: string[];
}

export type SecurityThreatCategory =
  | 'WAF_XSS'
  | 'WAF_SQLI'
  | 'WAF_CMD_TRAVERSAL'
  | 'WAF_PROTOTYPE_POLLUTION'
  | 'WAF_COMMAND_RCE'
  | 'WAF_XXE'
  | 'WAF_SSRF'
  | 'WAF_LDAP_NOSQL'
  | 'WAF_TEMPLATE_INJECTION'
  | 'WAF_HEADER_INJECTION'
  | 'WAF_TOKEN'
  | 'WAF_UPLOAD'
  | 'WAF_SECRET_LEAK'
  | 'WAF_ENCODING_EVASION'
  | 'WAF_PROMPT_INJECTION'
  | 'WAF_BOT'
  | 'WAF_CSRF'
  | 'WAF_DESERIALIZATION'
  | 'ANTIVIRUS_SIGNATURE'
  | 'ANTIVIRUS_HEURISTIC'
  | 'ANTIVIRUS_FILE'
  | 'BRUTEFORCE_AUTH'
  | 'RATE_LIMIT'
  | 'DOM_TAMPERING'
  | 'URL_POISONING'
  | 'STORAGE_INTEGRITY'
  | 'ZERO_TRUST_CLOUD'
  | 'PRIVILEGE_ESCALATION'
  | 'SYSTEM_AUDIT';

export type SecuritySeverity = 'info' | 'low' | 'medium' | 'high' | 'critical';

export interface SecurityEvent {
  id: string;
  timestamp: string;
  category: SecurityThreatCategory;
  severity: SecuritySeverity;
  source: string;
  ruleId: string;
  description: string;
  blocked: boolean;
  sampleSnippet?: string;
}

export interface SecurityConfig {
  firewallEnabled: boolean;
  antivirusEnabled: boolean;
  strictMode: boolean;
  domGuardEnabled: boolean;
  rateLimitEnabled: boolean;
  bruteForceProtection: boolean;
  zeroTrustCloudValidation: boolean;
  integrityCheckEnabled: boolean;
  adminCommandGuard: boolean; // garde anti-escalade « Admin__ » (default true)
  autoLockMinutes: number; // 0 = disabled, default 30
}

export interface SecurityScanReport {
  scannedAt: string;
  itemsScanned: number;
  threatsFound: number;
  threatsQuarantined: number;
  integrityValid: boolean;
  securityScore: number; // 0..100
  checksPassed: number;
  totalChecks: number;
  summary: string;
}

export interface SecurityState {
  config: SecurityConfig;
  events: SecurityEvent[];
  quarantinedCount: number;
  blockedCount: number;
  lastScan: SecurityScanReport | null;
  integrityHash: string | null;
  integrityStatus: 'verified' | 'tampered' | 'unchecked';
  failedLoginAttempts: number;
  lockoutUntil: string | null;
  /** Nombre de tentatives d'escalade « Admin__ » dans la fenêtre de réhabilitation. */
  adminCommandAttempts: number;
  /** Niveau du verrouillage progressif (0 = aucun, 1→4 = 5 min / 30 min / 3 h / 24 h). */
  adminLockdownLevel: number;
  /** Fin du blocage total de l'application (ISO 8601) ou null. */
  adminLockdownUntil: string | null;
  /** Date de la dernière tentative d'escalade (ISO 8601). */
  adminLastAttemptAt: string | null;
  /** Identités (e-mail / pseudo / id) bannies pour tentative d'escalade. */
  adminBlockedIdentities: string[];
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
  customFlashcards: Flashcard[];
  diagnosticResult: DiagnosticResult | null;
  studyGroups: StudyGroup[];
  fatigueLevel: 'frais' | 'normal' | 'fatigue';
  planMode: 'standard' | 'express' | 'derniere_semaine' | 'veille';
  accessibility: AccessibilitySettings;
  privacy: PrivacySettings;
  security?: SecurityState;
  ownerSettings?: OwnerGlobalSettings;
}
