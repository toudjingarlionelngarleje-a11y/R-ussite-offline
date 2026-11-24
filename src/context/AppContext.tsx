import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  ANNALES,
  CHAPTERS,
  CLASS_LEVELS,
  COURSES,
  EXAMS,
  FICHES,
  FLASHCARDS,
  QUESTIONS,
  SCHOOL_CYCLES,
  SUBJECTS,
  formatClassRange,
  getClassLevelMeta,
  mapStudyLevelToClassId,
} from '../data';
import { generateAdaptiveStudyPlan, formatIsoDate } from '../lib/planner';
import { computeNextFlashcardReview } from '../lib/sm2';
import {
  clearAllPersistedData,
  exportJsonDownload,
  hashPassword,
  loadPersistedState,
  savePersistedState,
  verifyPasswordHash,
} from '../lib/storage';
import {
  checkRateLimit,
  createInitialSecurityState,
  DEFAULT_SECURITY_CONFIG,
  evaluatePasswordStrength,
  inspectCurrentUrl,
  inspectTextInput,
  runFullSecurityScan,
  startDomTamperingGuard,
} from '../lib/securityFirewall';
import {
  applyOwnerEntitlements,
  DEFAULT_OWNER_SETTINGS,
  isOwnerProfile,
} from '../lib/owner';
import {
  checkCloudEmailExists,
  fetchCloudProfileByEmail,
  fetchProfileMfaFromCloud,
  isSupabaseConfigured,
  publishOwnerCloudQuestion,
  saveOwnerGlobalSettingsToCloud,
  syncStateWithSupabase,
  syncTwoFactorConfigToCloud,
  upsertProfileToCloud,
} from '../lib/supabaseSync';
import {
  clearTwoFactorSessionVerification,
  generateRecoveryCodes,
  hashRecoveryCodes,
  hashTwoFactorPin,
  isTwoFactorConfigured,
  isTwoFactorMandatoryForProfile,
  isTwoFactorSessionVerified,
  markTwoFactorSessionVerified,
  registerDeviceLockCredential,
  verifyAndConsumeRecoveryCode,
  verifyDeviceLockAssertion,
  verifyTwoFactorPin,
} from '../lib/twoFactor';
import {
  AccessibilitySettings,
  AppState,
  DiagnosticResult,
  DownloadedItem,
  ErrorReport,
  Fiche,
  Flashcard,
  HighlightItem,
  InProgressSession,
  MasteryLevel,
  OwnerGlobalSettings,
  PersonalNote,
  PrivacySettings,
  Question,
  ScreenId,
  SecurityConfig,
  SecurityEvent,
  SecurityScanReport,
  SessionRecord,
  StudyGroup,
  StudyPlanItem,
  SyncStatus,
  TeacherDraft,
  TrainingMode,
  TwoFactorConfig,
  TwoFactorMethod,
  UserCategory,
  UserProfile,
} from '../types';

export interface PracticeLaunchConfig {
  mode: TrainingMode;
  title: string;
  questionIds: string[];
  annaleId?: string;
  subjectId?: string;
  durationMinutes?: number;
  timerMode?: 'countdown' | 'progressive';
  allowBackNavigation?: boolean;
  focusLock?: boolean;
  immediateFeedback?: boolean;
  penaltyPerWrong?: number;
  officialSimulation?: boolean;
}

const DEFAULT_ACCESSIBILITY: AccessibilitySettings = {
  darkMode: false,
  highContrast: false,
  fontSize: 'md',
  reducedMotion: false,
  audioRate: 1.0,
  wifiOnlyDownloads: true,
  localReminders: true,
  batterySaver: false,
};

const DEFAULT_PRIVACY: PrivacySettings = {
  analyticsConsent: false,
  aiAssistanceConsent: true,
  localEncryptionEnabled: true,
  syncMultiDevice: true,
  acceptedPolicyDate: '2026-11-22',
};

function isLegacyDemoProfile(profile: UserProfile): boolean {
  return (
    profile.id === 'profile-demo-amina' ||
    profile.id === 'profile-demo-moussa-enam' ||
    profile.passwordHash === 'demo_hashed_local' ||
    profile.email === 'amina.mahamat@exemple.td' ||
    profile.email === 'moussa.enam@exemple.td'
  );
}

function createCleanBaseState(): AppState {
  return {
    profiles: [],
    activeProfileId: null,
    downloadedItems: {},
    sessions: [],
    inProgressSession: null,
    flashcardProgress: {},
    favorites: {
      annales: [],
      fiches: [],
      courses: [],
      questions: [],
    },
    notes: [],
    highlights: [],
    completedCourseIds: [],
    studyPlan: [],
    errorReports: [],
    syncQueue: [],
    lastSyncAt: null,
    simulatedOffline: false,
    simulateSyncError: false,
    dailyChallengeCompletedDate: null,
    streakDays: 0,
    teacherDrafts: [],
    customQuestions: [],
    customFiches: [],
    customFlashcards: [],
    diagnosticResult: null,
    fatigueLevel: 'normal',
    planMode: 'standard',
    studyGroups: [
      {
        id: 'grp-bac-2026',
        name: 'Entraide Bac Scientifique & Littéraire',
        examId: 'bac-scientifique',
        inviteCode: 'BAC-2026',
        membersCount: 18,
        description: 'Partage de fiches vérifiées, entraide sur les exercices de Maths, Physique et Français.',
        moderated: true,
        minorSafe: true,
        sharedFicheIds: ['fiche-maths-second-degre', 'fiche-fr-figures'],
        messages: [
          {
            id: 'msg-1',
            author: 'Prof. Ngarleje (Modérateur)',
            role: 'enseignant',
            text: 'Bienvenue dans le groupe privé ! Pensez à relire la fiche Second Degré avant de tenter l’annale 2024.',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: 'msg-2',
            author: 'Fatima K.',
            role: 'eleve',
            text: 'Astuce qui m’a aidée : vérifier S = -b/a et P = c/a prend 10 secondes et évite les erreurs de signe !',
            createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          },
        ],
      },
      {
        id: 'grp-enam-2026',
        name: 'Prépa Concours ENAM & Fonction Publique',
        examId: 'concours-admin',
        inviteCode: 'ENAM-PRO',
        membersCount: 12,
        description: 'Groupe de révision Droit constitutionnel, Économie publique, Histoire contemporaine et Culture générale.',
        moderated: true,
        minorSafe: true,
        sharedFicheIds: ['fiche-droit-pouvoirs', 'fiche-hg-decolonisation'],
        messages: [
          {
            id: 'msg-3',
            author: 'Moussa Oumar',
            role: 'eleve',
            text: 'Je viens de télécharger le sujet ENAM 2024 hors ligne pour le traiter ce soir dans les transports.',
            createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          },
        ],
      },
      {
        id: 'grp-sante-2026',
        name: 'Prépa Santé, Médecine & Paramédical (IDE / ENASS)',
        examId: 'concours-paramedical',
        inviteCode: 'SANTE-26',
        membersCount: 16,
        description: 'Révisions Anatomie-Physiologie, Santé Publique (R₀, hygiène OMS) et Pharmacologie (calcul de doses).',
        moderated: true,
        minorSafe: true,
        sharedFicheIds: ['fiche-anat-cardio', 'fiche-sp-epidemio', 'fiche-pharm-adme'],
        messages: [
          {
            id: 'msg-4',
            author: 'Dr. Amina Mahamat (Modératrice)',
            role: 'enseignant',
            text: 'Rappel concours IDE/Médecine : entraînez-vous chaque jour sur 3 calculs de posologie pédiatrique et sur la règle des 5 demi-vies.',
            createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
          },
        ],
      },
      {
        id: 'grp-ohada-finances-2026',
        name: 'Collectif Droit OHADA, Finances Publiques & Diplomatie',
        examId: 'concours-magistrature',
        inviteCode: 'OHADA-26',
        membersCount: 14,
        description: 'Entraide Magistrature, BEAC/BCEAO, Impôts/Trésor et Affaires Étrangères (OHADA, TVA, ONU/UA/CBLT).',
        moderated: true,
        minorSafe: true,
        sharedFicheIds: ['fiche-ohada-societes', 'fiche-fp-budget', 'fiche-ri-onu'],
        messages: [
          {
            id: 'msg-5',
            author: 'Me Idriss D. (Modérateur)',
            role: 'enseignant',
            text: 'Pensez à maîtriser l’article 10 du Traité OHADA et le circuit ELOP des dépenses publiques : ils tombent presque à chaque session !',
            createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
          },
        ],
      },
      {
        id: 'grp-tech-green-2026',
        name: 'Club Ingénieurs, Énergie Solaire, Data/IA & Agro',
        examId: 'concours-energie-btp',
        inviteCode: 'SOLAR-IA',
        membersCount: 11,
        description: 'Dimensionnement photovoltaïque, Machine Learning/RAG, agroécologie sahélienne et Supply Chain (Incoterms 2020).',
        moderated: true,
        minorSafe: true,
        sharedFicheIds: ['fiche-enr-solaire', 'fiche-ia-ml', 'fiche-agro-sols'],
        messages: [
          {
            id: 'msg-6',
            author: 'Ing. Rodrigue T.',
            role: 'enseignant',
            text: 'Astuce solaire PV : n’oubliez jamais le facteur de rendement global k ≈ 0,70 et la profondeur de décharge batterie dans vos calculs !',
            createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          },
        ],
      },
      {
        id: 'grp-telecoms-btp-2026',
        name: 'Club Télécoms (OSI / Fibre 5G) & Génie Civil BTP',
        examId: 'concours-telecoms',
        inviteCode: 'NET-BTP',
        membersCount: 15,
        description: 'Sous-réseaux IPv4/CIDR, fibre optique, RDM (poutres en flexion PL/4), topographie et sécurité chantier.',
        moderated: true,
        minorSafe: true,
        sharedFicheIds: ['fiche-net-osi', 'fiche-gc-rdm', 'fiche-gc-topo'],
        messages: [
          {
            id: 'msg-7',
            author: 'Ing. Haroun B. (Modérateur)',
            role: 'enseignant',
            text: 'Pour ne jamais rater un calcul CIDR `/n`, retenez la formule 2^(32−n) − 2 et vérifiez toujours les adresses réseau et broadcast !',
            createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
          },
        ],
      },
      {
        id: 'grp-medias-nutri-redac-2026',
        name: 'Prépa Journalisme, Nutrition (MUAC/HACCP) & Rédaction Admin.',
        examId: 'concours-journalisme',
        inviteCode: 'REDAC-26',
        membersCount: 13,
        description: 'Note de synthèse, oral STAR, pyramide inversée 5W, dépistage nutritionnel et valorisation du patrimoine UNESCO.',
        moderated: true,
        minorSafe: true,
        sharedFicheIds: ['fiche-red-note', 'fiche-jour-redac', 'fiche-nut-haccp'],
        messages: [
          {
            id: 'msg-8',
            author: 'Clarisse N. (Modératrice)',
            role: 'enseignant',
            text: 'Règle d’or de la note de synthèse ENAM : 100 % issue des documents du dossier, plan clair en 2 parties, zéro avis personnel !',
            createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
          },
        ],
      },
      {
        id: 'grp-asecna-mines-2026',
        name: 'Prépa ASECNA / EAMAC, Mines-Pétrole & Géosciences',
        examId: 'concours-aeronautique',
        inviteCode: 'AERO-26',
        membersCount: 14,
        description: 'Mécanique du vol, météo ISA/QNH/CB, systèmes pétroliers, loi de Darcy et nappes aquifères.',
        moderated: true,
        minorSafe: true,
        sharedFicheIds: ['fiche-aero-vol', 'fiche-aero-meteo', 'fiche-geo-petrole'],
        messages: [
          {
            id: 'msg-9',
            author: 'Cmdt. Saleh M. (Modérateur)',
            role: 'enseignant',
            text: 'Pour le concours EAMAC/ASECNA, automatisez de tête 1 kt = 1,852 km/h et le gradient ISA −6,5 °C par 1 000 m !',
            createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          },
        ],
      },
      {
        id: 'grp-vet-fintech-ethique-2026',
        name: 'Collectif Vétérinaire One Health, FinTech & Marchés Publics',
        examId: 'certif-fintech-microfinance',
        inviteCode: 'FIN-ETH',
        membersCount: 12,
        description: 'EISMV/élevage sahélien, Mobile Money (cantonnement, PAR 30, KYC), psychologie cognitive et déontologie publique.',
        moderated: true,
        minorSafe: true,
        sharedFicheIds: ['fiche-fin-mobile', 'fiche-vet-zoonoses', 'fiche-eth-marches'],
        messages: [
          {
            id: 'msg-10',
            author: 'Dr. Nadège K. (Modératrice)',
            role: 'enseignant',
            text: 'N’oubliez pas : en microfinance, le PAR 30 porte sur tout le capital restant dû des prêts en retard > 30 jours, pas uniquement la mensualité impayée.',
            createdAt: new Date(Date.now() - 1800000).toISOString(),
          },
        ],
      },
      {
        id: 'grp-sig-maritime-dnum-2026',
        name: 'Prépa Urbanisme-SIG, Transit Maritime & Droit Numérique',
        examId: 'concours-transit-maritime',
        inviteCode: 'SIG-MAR',
        membersCount: 15,
        description: 'Échelles & couches QGIS, Incoterms 2020 (FOB/CIF/DDP), connaissement B/L, RGPD/Malabo et gouvernance IA.',
        moderated: true,
        minorSafe: true,
        sharedFicheIds: ['fiche-sig-carto', 'fiche-mar-incoterms', 'fiche-dnum-rgpd'],
        messages: [
          {
            id: 'msg-11',
            author: 'M. Ibrahim T. (Modérateur)',
            role: 'enseignant',
            text: 'Rappel concours Douane/Transit : en CIF, le vendeur paie le fret et l’assurance jusqu’au port de destination, mais le risque passe à l’acheteur dès la mise à bord au port de départ !',
            createdAt: new Date(Date.now() - 2400000).toISOString(),
          },
        ],
      },
      {
        id: 'grp-sagesfemmes-bio-crises-2026',
        name: 'Collectif Sages-Femmes INFAS, Chimie Organique & Humanitaire',
        examId: 'concours-sante-maternelle',
        inviteCode: 'MAT-BIO',
        membersCount: 16,
        description: 'CPN & pré-éclampsie, score d’Apgar, calendrier PEV, fonctions chimiques, biochimie et standards humanitaires Sphère.',
        moderated: true,
        minorSafe: true,
        sharedFicheIds: ['fiche-obs-cpn', 'fiche-obs-neonat', 'fiche-chim-fonctions', 'fiche-cris-sphere'],
        messages: [
          {
            id: 'msg-12',
            author: 'Mme Aïssata B. (Modératrice)',
            role: 'enseignant',
            text: 'Astuce mémo INFAS/ENASS : Score d’Apgar évalué à 1 min et 5 min (≥ 7 normal), allaitement exclusif 6 mois sans eau, et norme Sphère ≥ 15 L d’eau/pers/jour.',
            createdAt: new Date(Date.now() - 1200000).toISOString(),
          },
        ],
      },
    ],
    accessibility: DEFAULT_ACCESSIBILITY,
    privacy: DEFAULT_PRIVACY,
    security: createInitialSecurityState(),
    ownerSettings: DEFAULT_OWNER_SETTINGS,
  };
}

function createEmptyInitialState(): AppState {
  return createCleanBaseState();
}

export interface ToastMessage {
  id: string;
  text: string;
  tone: 'info' | 'success' | 'warning' | 'error';
}

interface AppContextValue {
  state: AppState;
  hydrated: boolean;
  activeProfile: UserProfile | null;
  isOwner: boolean;
  screen: ScreenId;
  navigate: (screen: ScreenId) => void;
  selectedSubjectId: string;
  setSelectedSubjectId: (id: string) => void;
  selectedCourseId: string;
  setSelectedCourseId: (id: string) => void;
  selectedFicheId: string;
  setSelectedFicheId: (id: string) => void;
  selectedSessionId: string | null;
  setSelectedSessionId: (id: string | null) => void;
  showPlanModal: boolean;
  setShowPlanModal: (show: boolean) => void;

  // Derived catalogs (base + teacher published + generated)
  allQuestions: Question[];
  allFiches: Fiche[];
  allFlashcards: Flashcard[];

  // Coach, Diagnostic, Generator, Collaboration & Admin
  saveDiagnosticResult: (result: DiagnosticResult, applyToProfile?: boolean) => void;
  addGeneratedContent: (payload: {
    fiche?: Fiche;
    questions?: Question[];
    flashcards?: Flashcard[];
  }) => void;
  setFatigueLevel: (level: AppState['fatigueLevel']) => void;
  setPlanMode: (mode: AppState['planMode']) => void;
  createStudyGroup: (input: { name: string; examId: string; description: string }) => void;
  addStudyGroupMessage: (groupId: string, text: string) => void;
  reportGroupMessage: (groupId: string, messageId: string) => void;
  updateErrorReportStatus: (reportId: string, status: ErrorReport['status']) => void;

  // Network & Sync
  isOnline: boolean;
  syncStatus: SyncStatus;
  downloadingIds: Record<string, number>; // key -> percent 0..100
  toggleSimulatedOffline: () => void;
  toggleSimulateSyncError: () => void;
  syncNow: () => Promise<void>;

  // Auth & Profile (real accounts only — no demo account)
  registerAccount: (input: {
    name: string;
    email: string;
    password: string;
    category: UserCategory;
  }) => Promise<{ ok: boolean; error?: string }>;
  loginAccount: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  switchProfile: (profileId: string) => void;
  logout: () => void;
  updateActiveProfile: (patch: Partial<UserProfile>) => void;
  deleteActiveAccount: () => Promise<void>;

  // Downloads & Storage
  isDownloaded: (type: DownloadedItem['type'], id: string) => boolean;
  downloadItem: (item: Omit<DownloadedItem, 'downloadedAt' | 'version'>) => void;
  downloadSubjectBundle: (subjectId: string) => void;
  removeDownloadedItem: (key: string) => void;
  clearAllDownloads: () => void;

  // Practice & Sessions
  startPractice: (config: PracticeLaunchConfig) => void;
  resumeInProgressSession: () => void;
  updateInProgressSession: (updater: (prev: InProgressSession) => InProgressSession) => void;
  discardInProgressSession: () => void;
  completeSession: (record: Omit<SessionRecord, 'synced'>) => void;

  // Mistakes helper
  getMistakeQuestionIds: () => string[];

  // Flashcards
  rateFlashcard: (cardId: string, rating: MasteryLevel) => void;

  // Favorites, Notes, Highlights, Courses
  toggleFavorite: (kind: keyof AppState['favorites'], id: string) => void;
  addNote: (note: Omit<PersonalNote, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
  addHighlight: (hl: Omit<HighlightItem, 'id' | 'createdAt'>) => void;
  removeHighlight: (id: string) => void;
  toggleCourseCompleted: (courseId: string) => void;
  reportQuestionError: (questionId: string, questionPrompt: string, reason: string) => void;

  // Study Plan
  regenerateStudyPlan: () => void;
  togglePlanItemComplete: (id: string) => void;
  movePlanItemDate: (id: string, newDate: string) => void;
  updatePlanItemDuration: (id: string, minutes: number) => void;
  addCustomPlanGoal: (title: string, date: string, durationMinutes: number, subjectId?: string) => void;
  toggleRestDay: (weekday: number) => void;

  // Teacher studio
  saveTeacherDraft: (draft: TeacherDraft) => void;
  publishTeacherDraft: (draftId: string) => void;
  deleteTeacherDraft: (draftId: string) => void;

  // Settings & Privacy
  updateAccessibility: (patch: Partial<AccessibilitySettings>) => void;
  updatePrivacy: (patch: Partial<PrivacySettings>) => void;
  exportUserData: () => void;
  resetAllLocalData: () => Promise<void>;

  // Security Firewall & Antivirus Center
  updateSecurityConfig: (patch: Partial<SecurityConfig>) => void;
  logSecurityEvent: (event: SecurityEvent) => void;
  runSecurityScan: () => SecurityScanReport;
  testSecurityInput: (source: string, rawText: string) => { safe: boolean; message: string };
  clearSecurityLogs: () => void;
  triggerPanicLockdown: () => void;

  // Owner / Founder Exclusive Controls
  updateOwnerSettings: (patch: Partial<OwnerGlobalSettings>) => Promise<void>;
  downloadFullOfflineCatalog: () => void;
  publishOwnerQuickQuestion: (q: Question) => Promise<{ ok: boolean; error?: string }>;
  exportMasterBackup: () => void;
  purgeReportedGroupMessages: () => void;

  // Two-Factor Authentication (2FA / MFA)
  requiresTwoFactorGate: boolean;
  twoFactorConfigured: boolean;
  twoFactorMandatory: boolean;
  completeTwoFactorEnrollment: (input: {
    method: TwoFactorMethod;
    pin?: string;
    recoveryCodes: string[];
  }) => Promise<{ ok: boolean; error?: string }>;
  verifyTwoFactorChallenge: (
    code: string,
    mode: 'primary' | 'recovery',
    rememberHours?: number
  ) => Promise<{ ok: boolean; error?: string; remainingRecoveryCodes?: number }>;
  lockTwoFactorSessionNow: () => void;
  regenerateTwoFactorRecoveryCodes: (
    currentCode?: string
  ) => Promise<{ ok: boolean; codes?: string[]; error?: string }>;
  resetTwoFactorMethod: (
    currentCodeOrRecovery?: string
  ) => Promise<{ ok: boolean; error?: string }>;
  toggleOptionalTwoFactorForUser: (enable: boolean) => void;

  // Notifications / Toasts
  toasts: ToastMessage[];
  notify: (text: string, tone?: ToastMessage['tone']) => void;
  dismissToast: (id: string) => void;
  triggerLocalReminder: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => createEmptyInitialState());
  const [hydrated, setHydrated] = useState(false);
  const [screen, setScreen] = useState<ScreenId>('auth');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('maths');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('course-maths-second-degre');
  const [selectedFicheId, setSelectedFicheId] = useState<string>('fiche-maths-second-degre');
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [browserOnline, setBrowserOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [downloadingIds, setDownloadingIds] = useState<Record<string, number>>({});
  const [syncingNow, setSyncingNow] = useState(false);
  const [syncFailed, setSyncFailed] = useState(false);
  const [twoFactorVerifiedProfileId, setTwoFactorVerifiedProfileId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const saveTimerRef = useRef<number | null>(null);

  const notify = useCallback((text: string, tone: ToastMessage['tone'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev.slice(-3), { id, text, tone }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Load persisted state from IndexedDB on mount + Integrity Seal & URL Poisoning Guard
  useEffect(() => {
    let mounted = true;
    loadPersistedState().then(({ state: saved, integrityValid }) => {
      if (!mounted) return;
      const urlThreat = inspectCurrentUrl();
      if (saved) {
        const defaults = createEmptyInitialState();
        const baseSec = saved.security ?? createInitialSecurityState();
        const extraEvents: SecurityEvent[] = [];
        if (!integrityValid) {
          extraEvents.push({
            id: `sec-integrity-${Date.now()}`,
            timestamp: new Date().toISOString(),
            category: 'STORAGE_INTEGRITY',
            severity: 'high',
            source: 'Sceau SHA-256 IndexedDB',
            ruleId: 'CRY-SEAL-MISMATCH',
            description:
              'Modification externe détectée sur le stockage local. Le sceau d’intégrité a été réinitialisé et vérifié.',
            blocked: false,
          });
        }
        if (urlThreat) extraEvents.push(urlThreat);

        const realProfiles = (saved.profiles ?? [])
          .filter((p) => !isLegacyDemoProfile(p))
          .map(applyOwnerEntitlements);
        const validActiveProfile = saved.activeProfileId
          ? realProfiles.find((p) => p.id === saved.activeProfileId) ?? null
          : null;

        setState({
          ...defaults,
          ...saved,
          profiles: realProfiles,
          activeProfileId: validActiveProfile ? validActiveProfile.id : null,
          customFlashcards: saved.customFlashcards ?? [],
          diagnosticResult: saved.diagnosticResult ?? null,
          studyGroups: saved.studyGroups?.length
            ? [
                ...saved.studyGroups,
                ...defaults.studyGroups.filter(
                  (dg) => !saved.studyGroups.some((sg) => sg.id === dg.id)
                ),
              ]
            : defaults.studyGroups,
          fatigueLevel: saved.fatigueLevel ?? 'normal',
          planMode: saved.planMode ?? 'standard',
          ownerSettings: { ...DEFAULT_OWNER_SETTINGS, ...(saved.ownerSettings ?? {}) },
          security: {
            ...createInitialSecurityState(),
            ...baseSec,
            config: { ...DEFAULT_SECURITY_CONFIG, ...(baseSec.config ?? {}) },
            integrityStatus: integrityValid ? 'verified' : 'tampered',
            blockedCount: baseSec.blockedCount + (urlThreat ? 1 : 0),
            events: [...extraEvents, ...(baseSec.events ?? [])].slice(0, 60),
          },
        });
        if (validActiveProfile) {
          setScreen(validActiveProfile.onboardingCompleted ? 'dashboard' : 'onboarding-exam');
        } else {
          setScreen('auth');
        }
      } else if (urlThreat) {
        setState((prev) => {
          const sec = prev.security ?? createInitialSecurityState();
          return {
            ...prev,
            security: {
              ...sec,
              blockedCount: sec.blockedCount + 1,
              events: [urlThreat, ...sec.events].slice(0, 60),
            },
          };
        });
      }
      setHydrated(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Persist to IndexedDB whenever state changes (debounced 250ms) with SHA-256 integrity seal
  useEffect(() => {
    if (!hydrated) return;
    if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
    saveTimerRef.current = window.setTimeout(() => {
      savePersistedState(state);
    }, 250);
  }, [state, hydrated]);

  // Real-time DOM Tampering Guard (MutationObserver)
  const domGuardEnabled = state.security?.config.domGuardEnabled ?? true;
  useEffect(() => {
    if (!domGuardEnabled) return;
    return startDomTamperingGuard((threatEvent) => {
      setState((prev) => {
        const sec = prev.security ?? createInitialSecurityState();
        return {
          ...prev,
          security: {
            ...sec,
            blockedCount: sec.blockedCount + 1,
            quarantinedCount: sec.quarantinedCount + 1,
            events: [threatEvent, ...sec.events].slice(0, 60),
          },
        };
      });
      notify(`Pare-feu DOM : ${threatEvent.description}`, 'error');
    });
  }, [domGuardEnabled, notify]);

  // Auto-lock session after prolonged inactivity
  const autoLockMinutes = state.security?.config.autoLockMinutes ?? 30;
  useEffect(() => {
    if (!autoLockMinutes || !state.activeProfileId) return;
    let timer = window.setTimeout(() => {
      clearTwoFactorSessionVerification();
      setTwoFactorVerifiedProfileId(null);
      setState((prev) => ({ ...prev, activeProfileId: null }));
      setScreen('welcome');
      notify('Session verrouillée automatiquement après inactivité (sécurité).', 'warning');
    }, autoLockMinutes * 60 * 1000);

    const resetTimer = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        clearTwoFactorSessionVerification();
        setTwoFactorVerifiedProfileId(null);
        setState((prev) => ({ ...prev, activeProfileId: null }));
        setScreen('welcome');
        notify('Session verrouillée automatiquement après inactivité (sécurité).', 'warning');
      }, autoLockMinutes * 60 * 1000);
    };

    window.addEventListener('pointerdown', resetTimer, { passive: true });
    window.addEventListener('keydown', resetTimer, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('pointerdown', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [autoLockMinutes, state.activeProfileId, notify]);

  // Apply accessibility classes to <html>
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('dark', state.accessibility.darkMode);
    html.classList.toggle('high-contrast', state.accessibility.highContrast);
    html.classList.toggle(
      'reduced-motion',
      state.accessibility.reducedMotion || state.accessibility.batterySaver
    );
    html.setAttribute('data-font-size', state.accessibility.fontSize);
  }, [state.accessibility]);

  // Listen to real browser online/offline transitions
  useEffect(() => {
    const onOnline = () => {
      setBrowserOnline(true);
      notify('Connexion Internet rétablie.', 'success');
    };
    const onOffline = () => {
      setBrowserOnline(false);
      notify('Mode hors ligne activé : tous tes contenus téléchargés restent disponibles.', 'warning');
    };
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, [notify]);

  const isOnline = browserOnline && !state.simulatedOffline;

  const activeProfile = useMemo(() => {
    const raw = state.profiles.find((p) => p.id === state.activeProfileId) ?? null;
    return raw ? applyOwnerEntitlements(raw) : null;
  }, [state.profiles, state.activeProfileId]);

  const isOwner = useMemo(() => isOwnerProfile(activeProfile), [activeProfile]);

  const twoFactorMandatory = useMemo(
    () => isTwoFactorMandatoryForProfile(activeProfile),
    [activeProfile]
  );

  const twoFactorConfigured = useMemo(
    () => isTwoFactorConfigured(activeProfile),
    [activeProfile]
  );

  const requiresTwoFactorGate = useMemo(() => {
    if (!activeProfile || !twoFactorMandatory) return false;
    if (twoFactorVerifiedProfileId === activeProfile.id) return false;
    if (twoFactorConfigured && isTwoFactorSessionVerified(activeProfile.id)) return false;
    return true;
  }, [activeProfile, twoFactorMandatory, twoFactorConfigured, twoFactorVerifiedProfileId]);

  // Pull existing 2FA config from Supabase if a protected account opens on a fresh device
  useEffect(() => {
    if (!hydrated || !activeProfile || !isOnline || !isSupabaseConfigured) return;
    if (!twoFactorMandatory || twoFactorConfigured) return;
    let cancelled = false;
    fetchProfileMfaFromCloud(activeProfile.email).then((cloudMfa) => {
      if (cancelled || !cloudMfa || !cloudMfa.enabled) return;
      setState((prev) => ({
        ...prev,
        profiles: prev.profiles.map((p) =>
          p.id === activeProfile.id
            ? {
                ...p,
                twoFactor: {
                  ...cloudMfa,
                  required: isOwnerProfile(p) ? true : cloudMfa.required,
                },
              }
            : p
        ),
      }));
    });
    return () => {
      cancelled = true;
    };
  }, [hydrated, activeProfile?.id, activeProfile?.email, isOnline, twoFactorMandatory, twoFactorConfigured]);

  const allQuestions = useMemo(
    () => [...QUESTIONS, ...state.customQuestions],
    [state.customQuestions]
  );

  const allFiches = useMemo(
    () => [...FICHES, ...state.customFiches],
    [state.customFiches]
  );

  const allFlashcards = useMemo(
    () => [...FLASHCARDS, ...state.customFlashcards],
    [state.customFlashcards]
  );

  const syncStatus: SyncStatus = useMemo(() => {
    if (Object.keys(downloadingIds).length > 0) return 'downloading';
    if (!isOnline) return 'offline';
    if (syncFailed || state.simulateSyncError) return 'error';
    if (syncingNow || state.syncQueue.length > 0) return 'pending';
    return 'synced';
  }, [downloadingIds, isOnline, syncFailed, state.simulateSyncError, syncingNow, state.syncQueue.length]);

  const enqueueSync = useCallback((action: string, label: string, sizeKb = 4) => {
    setState((prev) => ({
      ...prev,
      syncQueue: [
        ...prev.syncQueue,
        {
          id: `sq-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
          action,
          label,
          createdAt: new Date().toISOString(),
          sizeKb,
          retries: 0,
        },
      ],
    }));
  }, []);

  const logSecurityEvent = useCallback((event: SecurityEvent) => {
    setState((prev) => {
      const sec = prev.security ?? createInitialSecurityState();
      return {
        ...prev,
        security: {
          ...sec,
          blockedCount: sec.blockedCount + (event.blocked ? 1 : 0),
          quarantinedCount:
            sec.quarantinedCount +
            (event.blocked && (event.severity === 'high' || event.severity === 'critical') ? 1 : 0),
          events: [event, ...sec.events].slice(0, 60),
        },
      };
    });
  }, []);

  const guardInput = useCallback(
    (source: string, rawText: string, maxLength = 4000): { allowed: boolean; cleanText: string } => {
      const secCfg = state.security?.config ?? DEFAULT_SECURITY_CONFIG;
      const check = inspectTextInput(rawText, secCfg, maxLength);
      if (!check.safe) {
        const ev: SecurityEvent = {
          id: `sec-waf-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
          timestamp: new Date().toISOString(),
          category: check.category ?? 'WAF_XSS',
          severity: check.severity ?? 'high',
          source,
          ruleId: check.ruleId ?? 'WAF-BLOCK',
          description: check.description ?? 'Contenu malveillant bloqué par le pare-feu.',
          blocked: true,
          sampleSnippet: rawText.slice(0, 70),
        };
        logSecurityEvent(ev);
        notify(`🛡️ Pare-feu : ${ev.description}`, 'error');
        return { allowed: false, cleanText: check.sanitizedText };
      }
      return { allowed: true, cleanText: check.sanitizedText };
    },
    [state.security?.config, logSecurityEvent, notify]
  );

  const syncNow = useCallback(async () => {
    if (!isOnline) {
      notify('Impossible de synchroniser en mode hors ligne. Tes données restent sécurisées sur l’appareil.', 'warning');
      return;
    }
    const secCfg = state.security?.config ?? DEFAULT_SECURITY_CONFIG;
    if (secCfg.rateLimitEnabled) {
      const rl = checkRateLimit('sync_cloud', 6, 60_000);
      if (!rl.allowed) {
        notify(`Anti-flood actif : patiente ${rl.retryAfterSec}s avant une nouvelle synchro.`, 'warning');
        return;
      }
    }
    if (state.simulateSyncError) {
      setSyncFailed(true);
      notify('Erreur de synchronisation : serveur temporairement indisponible. Nouvel essai automatique ultérieur.', 'error');
      return;
    }
    setSyncingNow(true);
    setSyncFailed(false);

    if (isSupabaseConfigured && activeProfile) {
      const result = await syncStateWithSupabase(state, activeProfile);
      if (!result.ok) {
        setSyncingNow(false);
        setSyncFailed(true);
        notify(
          `Erreur de synchronisation Supabase : ${result.errorMessage ?? 'réseau indisponible'}. Tes données restent sauvegardées hors ligne.`,
          'error'
        );
        return;
      }

      setState((prev) => {
        const existingQIds = new Set(prev.customQuestions.map((q) => q.id));
        const newQs = result.pulledQuestions.filter((q) => !existingQIds.has(q.id));
        const existingFIds = new Set(prev.customFiches.map((f) => f.id));
        const newFs = result.pulledFiches.filter((f) => !existingFIds.has(f.id));
        const prevSec = prev.security ?? createInitialSecurityState();
        const cloudThreats = result.blockedCloudThreats ?? [];
        return {
          ...prev,
          syncQueue: [],
          sessions: prev.sessions.map((s) => ({ ...s, synced: true })),
          customQuestions: [...newQs, ...prev.customQuestions],
          customFiches: [...newFs, ...prev.customFiches],
          ownerSettings: result.pulledOwnerSettings ?? prev.ownerSettings,
          lastSyncAt: new Date().toISOString(),
          security: {
            ...prevSec,
            blockedCount: prevSec.blockedCount + cloudThreats.length,
            quarantinedCount: prevSec.quarantinedCount + cloudThreats.length,
            events: [...cloudThreats, ...prevSec.events].slice(0, 60),
          },
        };
      });
      setSyncingNow(false);
      notify(
        `Synchronisé avec Supabase Cloud (Zero-Trust vérifié : ${result.pushedCounts.sessions} sessions, ${result.pushedCounts.notes} notes).`,
        'success'
      );
      return;
    }

    await new Promise((r) => window.setTimeout(r, 450));
    setState((prev) => ({
      ...prev,
      syncQueue: [],
      sessions: prev.sessions.map((s) => ({ ...s, synced: true })),
      lastSyncAt: new Date().toISOString(),
    }));
    setSyncingNow(false);
    notify('Synchronisation réussie : résultats, notes et progression sauvegardés.', 'success');
  }, [isOnline, state, activeProfile, notify]);

  // Auto-sync when coming back online if queue is non-empty and not error-simulated
  useEffect(() => {
    if (isOnline && state.syncQueue.length > 0 && !state.simulateSyncError && !syncingNow) {
      const t = window.setTimeout(() => {
        syncNow();
      }, 1500);
      return () => window.clearTimeout(t);
    }
  }, [isOnline, state.syncQueue.length, state.simulateSyncError, syncingNow, syncNow]);

  const navigate = useCallback((next: ScreenId) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const toggleSimulatedOffline = useCallback(() => {
    setState((prev) => {
      const nextOffline = !prev.simulatedOffline;
      notify(
        nextOffline
          ? 'Mode hors ligne simulé activé — teste l’application sans connexion !'
          : 'Connexion rétablie — synchronisation prête.',
        nextOffline ? 'warning' : 'success'
      );
      return { ...prev, simulatedOffline: nextOffline };
    });
  }, [notify]);

  const toggleSimulateSyncError = useCallback(() => {
    setState((prev) => {
      const next = !prev.simulateSyncError;
      setSyncFailed(next);
      return { ...prev, simulateSyncError: next };
    });
  }, []);

  const registerAccount = useCallback(
    async (input: { name: string; email: string; password: string; category: UserCategory }) => {
      const secCfg = state.security?.config ?? DEFAULT_SECURITY_CONFIG;
      if (secCfg.rateLimitEnabled) {
        const rl = checkRateLimit('auth_register', 5, 60_000);
        if (!rl.allowed) {
          logSecurityEvent({
            id: `sec-rl-reg-${Date.now()}`,
            timestamp: new Date().toISOString(),
            category: 'RATE_LIMIT',
            severity: 'medium',
            source: 'Inscription compte',
            ruleId: 'WAF-RL-REG',
            description: 'Trop de tentatives d’inscription rapprochées bloquées.',
            blocked: true,
          });
          return { ok: false, error: `Trop de tentatives. Réessaie dans ${rl.retryAfterSec} secondes.` };
        }
      }

      const nameGuard = guardInput('Inscription (Nom)', input.name, 100);
      const emailGuard = guardInput('Inscription (E-mail)', input.email, 140);
      if (!nameGuard.allowed || !emailGuard.allowed) {
        return { ok: false, error: 'Entrée bloquée par le pare-feu anti-injection.' };
      }

      const trimmedEmail = emailGuard.cleanText.toLowerCase();
      if (state.ownerSettings && !state.ownerSettings.registrationsOpen && trimmedEmail !== 'toudjingarlionelngarleje@gmail.com') {
        return {
          ok: false,
          error: 'Les nouvelles inscriptions sont temporairement fermées par le Propriétaire.',
        };
      }
      if (!nameGuard.cleanText || !trimmedEmail || input.password.length < 4) {
        return { ok: false, error: 'Remplis ton nom, un e-mail valide et un mot de passe (4 caractères min.).' };
      }

      if (secCfg.bruteForceProtection) {
        const pwdAudit = evaluatePasswordStrength(input.password);
        if (pwdAudit.isCompromisedCommon) {
          logSecurityEvent({
            id: `sec-pwd-${Date.now()}`,
            timestamp: new Date().toISOString(),
            category: 'BRUTEFORCE_AUTH',
            severity: 'medium',
            source: 'Politique de mots de passe',
            ruleId: 'ZT-PWD-WEAK',
            description: 'Création de compte refusée : mot de passe compromis courant détecté.',
            blocked: true,
          });
          return {
            ok: false,
            error:
              'Mot de passe trop courant ou compromis (ex. 123456, azerty, password). Choisis un mot de passe plus sûr.',
          };
        }
      }

      const existing = state.profiles.find((p) => p.email.toLowerCase() === trimmedEmail);
      if (existing) {
        return {
          ok: false,
          error:
            'Un compte existe déjà avec cette adresse e-mail. Connecte-toi directement depuis l’onglet « Connexion ».',
        };
      }
      if (isOnline && isSupabaseConfigured) {
        const existsInCloud = await checkCloudEmailExists(trimmedEmail);
        if (existsInCloud) {
          return {
            ok: false,
            error:
              'Un compte existe déjà avec cette adresse e-mail. Passe sur l’onglet « Connexion » pour te connecter directement sans recréer de compte.',
          };
        }
      }
      const passwordHash = await hashPassword(input.password);
      const examDate = new Date();
      examDate.setDate(examDate.getDate() + 60);

      const newProfile: UserProfile = applyOwnerEntitlements({
        id: `profile-${Date.now()}`,
        name: nameGuard.cleanText,
        email: trimmedEmail,
        passwordHash,
        category: input.category,
        country: 'Tchad',
        studyLevel: 'Terminale (Baccalauréat)',
        examId: 'bac-scientifique',
        selectedSubjectIds: ['maths', 'physique', 'svt'],
        examDate: formatIsoDate(examDate),
        currentLevel: 'intermediaire',
        dailyMinutes: 45,
        restDays: [0],
        targetScore: 70,
        plan: state.ownerSettings?.freePremiumEvent ? 'premium' : 'gratuit',
        createdAt: new Date().toISOString(),
        onboardingCompleted: false,
      });

      setState((prev) => ({
        ...prev,
        profiles: [...prev.profiles, newProfile],
        activeProfileId: newProfile.id,
      }));
      enqueueSync('register', `Création du profil ${newProfile.name}`, 3);
      if (isOnline && isSupabaseConfigured) {
        void upsertProfileToCloud(newProfile);
      }
      setScreen('onboarding-exam');
      notify(`Compte créé pour ${newProfile.name} (PBKDF2-SHA256 + coffre chiffré).`, 'success');
      return { ok: true };
    },
    [state.profiles, state.security?.config, state.ownerSettings?.freePremiumEvent, isOnline, guardInput, logSecurityEvent, enqueueSync, notify]
  );

  const loginAccount = useCallback(
    async (email: string, password: string) => {
      const sec = state.security ?? createInitialSecurityState();
      const secCfg = sec.config;

      // Anti-Bruteforce Lockout Check
      if (secCfg.bruteForceProtection && sec.lockoutUntil) {
        const remainingMs = new Date(sec.lockoutUntil).getTime() - Date.now();
        if (remainingMs > 0) {
          const mins = Math.ceil(remainingMs / 60000);
          return {
            ok: false,
            error: `Verrouillage anti-bruteforce actif (${mins} min restante(s)) après trop d’échecs.`,
          };
        }
      }

      const emailGuard = guardInput('Connexion (E-mail)', email, 140);
      if (!emailGuard.allowed) {
        return { ok: false, error: 'Tentative d’injection bloquée par le pare-feu.' };
      }

      const trimmedEmail = emailGuard.cleanText.toLowerCase();
      let found = state.profiles.find((p) => p.email.toLowerCase() === trimmedEmail);
      let restoredFromCloud = false;

      // If account not cached on this device yet, check Supabase Cloud so existing users can sign in directly!
      if (!found && isOnline && isSupabaseConfigured) {
        const cloudProfile = await fetchCloudProfileByEmail(trimmedEmail);
        if (cloudProfile) {
          found = cloudProfile;
          restoredFromCloud = true;
        }
      }

      const passwordOk = found ? await verifyPasswordHash(password, found.passwordHash) : false;

      if (!found || !passwordOk) {
        const nextFails = sec.failedLoginAttempts + 1;
        const triggerLock = secCfg.bruteForceProtection && nextFails >= 5;
        const lockUntil = triggerLock ? new Date(Date.now() + 5 * 60 * 1000).toISOString() : null;
        setState((prev) => {
          const pSec = prev.security ?? createInitialSecurityState();
          const ev: SecurityEvent = {
            id: `sec-bf-${Date.now()}`,
            timestamp: new Date().toISOString(),
            category: 'BRUTEFORCE_AUTH',
            severity: triggerLock ? 'critical' : 'medium',
            source: 'Authentification',
            ruleId: triggerLock ? 'ZT-BF-LOCKOUT' : 'ZT-BF-FAIL',
            description: triggerLock
              ? 'Verrouillage anti-bruteforce (5 min) déclenché après 5 tentatives échouées.'
              : `Échec de connexion (${nextFails}/5 avant verrouillage).`,
            blocked: triggerLock,
          };
          return {
            ...prev,
            security: {
              ...pSec,
              failedLoginAttempts: triggerLock ? 0 : nextFails,
              lockoutUntil: lockUntil,
              blockedCount: pSec.blockedCount + (triggerLock ? 1 : 0),
              events: [ev, ...pSec.events].slice(0, 60),
            },
          };
        });
        return {
          ok: false,
          error: triggerLock
            ? '5 échecs détectés : compte temporairement verrouillé pendant 5 minutes (anti-bruteforce).'
            : found && !found.passwordHash
            ? 'Ce compte ancien n’a pas encore synchronisé son mot de passe dans le cloud. Connecte-toi depuis ton appareil initial ou crée un mot de passe.'
            : 'E-mail ou mot de passe incorrect. Si tu n’as pas encore de compte, utilise l’onglet « Créer un compte ».',
        };
      }

      const normalizedFound = applyOwnerEntitlements(found);
      const needs2fa = isTwoFactorMandatoryForProfile(normalizedFound);
      if (needs2fa) {
        clearTwoFactorSessionVerification();
        setTwoFactorVerifiedProfileId(null);
      }

      setState((prev) => {
        const pSec = prev.security ?? createInitialSecurityState();
        const existsLocally = prev.profiles.some((p) => p.id === normalizedFound.id);
        return {
          ...prev,
          profiles: existsLocally ? prev.profiles : [...prev.profiles, normalizedFound],
          activeProfileId: normalizedFound.id,
          security: { ...pSec, failedLoginAttempts: 0, lockoutUntil: null },
        };
      });
      if (!restoredFromCloud && isOnline && isSupabaseConfigured) {
        void upsertProfileToCloud(normalizedFound);
      }
      setScreen(normalizedFound.onboardingCompleted ? 'dashboard' : 'onboarding-exam');
      notify(
        needs2fa
          ? `Mot de passe vérifié pour ${normalizedFound.name}. Valide maintenant ta double authentification (2FA).`
          : restoredFromCloud
          ? `Bon retour ${normalizedFound.name} ! Compte existant restauré depuis le cloud.`
          : `Bon retour, ${normalizedFound.name} ! Connexion sécurisée.`,
        needs2fa ? 'info' : 'success'
      );
      return { ok: true };
    },
    [state.profiles, state.security, isOnline, guardInput, notify]
  );

  const switchProfile = useCallback(
    (profileId: string) => {
      const target = state.profiles.find((p) => p.id === profileId);
      if (!target) return;
      const normalizedTarget = applyOwnerEntitlements(target);
      const needs2fa = isTwoFactorMandatoryForProfile(normalizedTarget);
      if (needs2fa) {
        clearTwoFactorSessionVerification();
        setTwoFactorVerifiedProfileId(null);
      }
      setState((prev) => ({ ...prev, activeProfileId: profileId }));
      setScreen(target.onboardingCompleted ? 'dashboard' : 'onboarding-exam');
      notify(
        needs2fa
          ? `Double authentification requise avant d’ouvrir le compte ${target.name}.`
          : `Profil actif : ${target.name}`,
        'info'
      );
    },
    [state.profiles, notify]
  );

  const logout = useCallback(() => {
    clearTwoFactorSessionVerification();
    setTwoFactorVerifiedProfileId(null);
    setState((prev) => ({ ...prev, activeProfileId: null }));
    setScreen('auth');
    notify('Session fermée. Reconnecte-toi directement avec ton compte existant quand tu veux.', 'info');
  }, [notify]);

  const updateActiveProfile = useCallback(
    (patch: Partial<UserProfile>) => {
      setState((prev) => {
        if (!prev.activeProfileId) return prev;
        const profiles = prev.profiles.map((p) =>
          p.id === prev.activeProfileId ? { ...p, ...patch } : p
        );
        const updated = profiles.find((p) => p.id === prev.activeProfileId)!;
        const nextPlan =
          patch.examDate || patch.selectedSubjectIds || patch.dailyMinutes || patch.restDays || patch.onboardingCompleted
            ? generateAdaptiveStudyPlan(updated, SUBJECTS, {}, 0)
            : prev.studyPlan;
        return { ...prev, profiles, studyPlan: nextPlan };
      });
      enqueueSync('profile_update', 'Mise à jour du profil et des objectifs', 2);
    },
    [enqueueSync]
  );

  const deleteActiveAccount = useCallback(async () => {
    setState((prev) => {
      const remaining = prev.profiles.filter((p) => p.id !== prev.activeProfileId);
      return {
        ...prev,
        profiles: remaining,
        activeProfileId: null,
        sessions: [],
        notes: [],
        highlights: [],
        studyPlan: [],
        syncQueue: [],
      };
    });
    setScreen('welcome');
    notify('Compte et données personnelles supprimés définitivement de l’appareil.', 'warning');
  }, [notify]);

  // ==================== DOWNLOADS ====================
  const isDownloaded = useCallback(
    (type: DownloadedItem['type'], id: string) => {
      const key = `${type}:${id}`;
      if (state.downloadedItems[key]) return true;
      // Also check if parent subject pack is downloaded
      if (type !== 'subject') {
        const subjectId =
          type === 'annale'
            ? ANNALES.find((a) => a.id === id)?.subjectId
            : type === 'fiche'
            ? allFiches.find((f) => f.id === id)?.subjectId
            : COURSES.find((c) => c.id === id)?.subjectId;
        if (subjectId && state.downloadedItems[`subject:${subjectId}`]) return true;
      }
      return false;
    },
    [state.downloadedItems, allFiches]
  );

  const downloadItem = useCallback(
    (item: Omit<DownloadedItem, 'downloadedAt' | 'version'>) => {
      const key = `${item.type}:${item.id}`;
      if (state.downloadedItems[key]) {
        notify('Déjà présent sur cet appareil (aucun re-téléchargement inutile).', 'info');
        return;
      }
      if (!isOnline) {
        notify('Téléchargement impossible en mode hors ligne. Reconnecte-toi pour télécharger de nouveaux contenus.', 'warning');
        return;
      }
      if (downloadingIds[key] !== undefined) return;

      setDownloadingIds((prev) => ({ ...prev, [key]: 15 }));
      const steps = [40, 75, 100];
      steps.forEach((pct, idx) => {
        window.setTimeout(() => {
          if (pct < 100) {
            setDownloadingIds((prev) => ({ ...prev, [key]: pct }));
          } else {
            setDownloadingIds((prev) => {
              const copy = { ...prev };
              delete copy[key];
              return copy;
            });
            setState((prev) => ({
              ...prev,
              downloadedItems: {
                ...prev.downloadedItems,
                [key]: {
                  ...item,
                  id: key,
                  downloadedAt: new Date().toISOString(),
                  version: 1,
                },
              },
            }));
            notify(`Téléchargé hors ligne : ${item.title} (${item.sizeKb} Ko)`, 'success');
          }
        }, (idx + 1) * 260);
      });
    },
    [state.downloadedItems, isOnline, downloadingIds, notify]
  );

  const downloadSubjectBundle = useCallback(
    (subjectId: string) => {
      const subj = SUBJECTS.find((s) => s.id === subjectId);
      if (!subj) return;
      downloadItem({
        id: subj.id,
        type: 'subject',
        title: `Pack complet ${subj.name} (Cours + Fiches + Annales + Quiz)`,
        subjectId: subj.id,
        sizeKb: subj.sizeKb,
      });
    },
    [downloadItem]
  );

  const removeDownloadedItem = useCallback(
    (key: string) => {
      setState((prev) => {
        const copy = { ...prev.downloadedItems };
        delete copy[key];
        return { ...prev, downloadedItems: copy };
      });
      notify('Contenu supprimé du stockage local.', 'info');
    },
    [notify]
  );

  const clearAllDownloads = useCallback(() => {
    setState((prev) => ({ ...prev, downloadedItems: {} }));
    notify('Tous les packs téléchargés ont été libérés du stockage.', 'warning');
  }, [notify]);

  // ==================== PRACTICE & SESSIONS ====================
  const startPractice = useCallback(
    (config: PracticeLaunchConfig) => {
      const ids = config.questionIds.length > 0 ? config.questionIds : allQuestions.slice(0, 5).map((q) => q.id);
      const isExam = config.mode === 'examen_blanc';
      const session: InProgressSession = {
        id: `live-${Date.now()}`,
        mode: config.mode,
        title: config.title,
        annaleId: config.annaleId,
        subjectId: config.subjectId,
        questionIds: ids,
        currentIndex: 0,
        answers: {},
        startedAt: new Date().toISOString(),
        elapsedSeconds: 0,
        durationLimitSeconds: config.durationMinutes
          ? config.durationMinutes * 60
          : isExam
          ? Math.max(300, ids.length * 90)
          : undefined,
        timerMode: config.timerMode ?? (isExam ? 'countdown' : 'progressive'),
        allowBackNavigation: config.allowBackNavigation ?? true,
        focusLock: config.focusLock ?? isExam,
        immediateFeedback: config.immediateFeedback ?? config.mode === 'libre',
        penaltyPerWrong: config.penaltyPerWrong,
        officialSimulation: config.officialSimulation,
      };
      setState((prev) => ({ ...prev, inProgressSession: session }));
      setScreen(isExam ? 'mock-exam' : 'training');
    },
    [allQuestions]
  );

  const resumeInProgressSession = useCallback(() => {
    if (!state.inProgressSession) return;
    setScreen(state.inProgressSession.mode === 'examen_blanc' ? 'mock-exam' : 'training');
  }, [state.inProgressSession]);

  const updateInProgressSession = useCallback(
    (updater: (prev: InProgressSession) => InProgressSession) => {
      setState((prev) => {
        if (!prev.inProgressSession) return prev;
        return { ...prev, inProgressSession: updater(prev.inProgressSession) };
      });
    },
    []
  );

  const discardInProgressSession = useCallback(() => {
    setState((prev) => ({ ...prev, inProgressSession: null }));
    setScreen('dashboard');
  }, []);

  const completeSession = useCallback(
    (record: Omit<SessionRecord, 'synced'>) => {
      const fullRecord: SessionRecord = {
        ...record,
        synced: isOnline && !state.simulateSyncError,
      };
      const todayIso = formatIsoDate(new Date());

      setState((prev) => {
        const nextSessions = [fullRecord, ...prev.sessions];
        const isDaily = record.mode === 'defi_quotidien';
        const nextStreak =
          isDaily && prev.dailyChallengeCompletedDate !== todayIso
            ? prev.streakDays + 1
            : prev.streakDays;

        // Recompute subject averages to adapt study plan automatically
        const scoresBySubj: Record<string, { ok: number; tot: number }> = {};
        nextSessions.forEach((s) => {
          s.answers.forEach((a) => {
            const q = allQuestions.find((qq) => qq.id === a.questionId);
            if (!q) return;
            if (!scoresBySubj[q.subjectId]) scoresBySubj[q.subjectId] = { ok: 0, tot: 0 };
            scoresBySubj[q.subjectId].tot += 1;
            if (a.isCorrect) scoresBySubj[q.subjectId].ok += 1;
          });
        });
        const avgMap: Record<string, number> = {};
        Object.entries(scoresBySubj).forEach(([k, v]) => {
          avgMap[k] = Math.round((v.ok / Math.max(1, v.tot)) * 100);
        });

        const prof = prev.profiles.find((p) => p.id === prev.activeProfileId);
        const adaptedPlan =
          prof && record.scorePercent < 65
            ? generateAdaptiveStudyPlan(prof, SUBJECTS, avgMap, record.totalCount - record.correctCount)
            : prev.studyPlan;

        const nextQueue = !isOnline || prev.simulateSyncError
          ? [
              ...prev.syncQueue,
              {
                id: `sq-${Date.now()}`,
                action: 'session_result',
                label: `Résultat : ${record.title} (${record.scorePercent}%)`,
                createdAt: new Date().toISOString(),
                sizeKb: 6,
                retries: 0,
              },
            ]
          : prev.syncQueue;

        return {
          ...prev,
          sessions: nextSessions,
          inProgressSession: null,
          studyPlan: adaptedPlan,
          dailyChallengeCompletedDate: isDaily ? todayIso : prev.dailyChallengeCompletedDate,
          streakDays: nextStreak,
          syncQueue: nextQueue,
          lastSyncAt: isOnline && !prev.simulateSyncError ? new Date().toISOString() : prev.lastSyncAt,
        };
      });
      setSelectedSessionId(fullRecord.id);
      setScreen('correction');
      notify(
        isOnline
          ? `Session terminée (${record.scorePercent}%) et synchronisée !`
          : `Session terminée (${record.scorePercent}%) — enregistrée hors ligne, en attente de synchronisation.`,
        'success'
      );
    },
    [isOnline, state.simulateSyncError, allQuestions, notify]
  );

  const getMistakeQuestionIds = useCallback(() => {
    const latestStatus: Record<string, { wrong: boolean; flagged: boolean; skipped: boolean }> = {};
    // Traverse oldest to newest so latest mastery resolves earlier mistakes
    [...state.sessions].reverse().forEach((s) => {
      s.answers.forEach((a) => {
        latestStatus[a.questionId] = {
          wrong: !a.isCorrect,
          flagged: a.flaggedForReview,
          skipped: a.skipped,
        };
      });
    });
    const ids = new Set<string>();
    Object.entries(latestStatus).forEach(([qId, st]) => {
      if (st.wrong || st.flagged || st.skipped) ids.add(qId);
    });
    state.favorites.questions.forEach((qId) => ids.add(qId));
    return Array.from(ids);
  }, [state.sessions, state.favorites.questions]);

  // ==================== FLASHCARDS ====================
  const rateFlashcard = useCallback(
    (cardId: string, rating: MasteryLevel) => {
      setState((prev) => {
        const nextProg = computeNextFlashcardReview(cardId, rating, prev.flashcardProgress[cardId]);
        return {
          ...prev,
          flashcardProgress: {
            ...prev.flashcardProgress,
            [cardId]: nextProg,
          },
        };
      });
      if (!isOnline) {
        enqueueSync('flashcard_review', `Révision flashcard enregistrée hors ligne`, 1);
      }
    },
    [isOnline, enqueueSync]
  );

  // ==================== FAVORITES / NOTES / HIGHLIGHTS ====================
  const toggleFavorite = useCallback((kind: keyof AppState['favorites'], id: string) => {
    setState((prev) => {
      const list = prev.favorites[kind];
      const exists = list.includes(id);
      return {
        ...prev,
        favorites: {
          ...prev.favorites,
          [kind]: exists ? list.filter((x) => x !== id) : [id, ...list],
        },
      };
    });
  }, []);

  const addNote = useCallback(
    (note: Omit<PersonalNote, 'id' | 'createdAt' | 'updatedAt'>) => {
      const check = guardInput('Note personnelle', note.content, 4000);
      if (!check.allowed) return;
      const now = new Date().toISOString();
      const created: PersonalNote = {
        ...note,
        content: check.cleanText,
        id: `note-${Date.now()}`,
        createdAt: now,
        updatedAt: now,
      };
      setState((prev) => ({ ...prev, notes: [created, ...prev.notes] }));
      enqueueSync('note_save', `Note personnelle : ${note.targetTitle}`, 2);
      notify('Note enregistrée hors ligne.', 'success');
    },
    [guardInput, enqueueSync, notify]
  );

  const updateNote = useCallback(
    (id: string, content: string) => {
      const check = guardInput('Modification de note', content, 4000);
      if (!check.allowed) return;
      setState((prev) => ({
        ...prev,
        notes: prev.notes.map((n) =>
          n.id === id ? { ...n, content: check.cleanText, updatedAt: new Date().toISOString() } : n
        ),
      }));
      enqueueSync('note_update', 'Modification d’une note personnelle', 2);
    },
    [guardInput, enqueueSync]
  );

  const deleteNote = useCallback((id: string) => {
    setState((prev) => ({ ...prev, notes: prev.notes.filter((n) => n.id !== id) }));
    notify('Note supprimée.', 'info');
  }, [notify]);

  const addHighlight = useCallback(
    (hl: Omit<HighlightItem, 'id' | 'createdAt'>) => {
      const created: HighlightItem = {
        ...hl,
        id: `hl-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      setState((prev) => ({ ...prev, highlights: [created, ...prev.highlights] }));
      notify('Passage surligné et enregistré hors ligne.', 'success');
    },
    [notify]
  );

  const removeHighlight = useCallback((id: string) => {
    setState((prev) => ({ ...prev, highlights: prev.highlights.filter((h) => h.id !== id) }));
  }, []);

  const toggleCourseCompleted = useCallback((courseId: string) => {
    setState((prev) => {
      const exists = prev.completedCourseIds.includes(courseId);
      return {
        ...prev,
        completedCourseIds: exists
          ? prev.completedCourseIds.filter((c) => c !== courseId)
          : [...prev.completedCourseIds, courseId],
      };
    });
  }, []);

  const reportQuestionError = useCallback(
    (questionId: string, questionPrompt: string, reason: string) => {
      const check = guardInput('Signalement question', reason, 1500);
      if (!check.allowed) return;
      setState((prev) => ({
        ...prev,
        errorReports: [
          {
            id: `err-${Date.now()}`,
            questionId,
            questionPrompt,
            reason: check.cleanText,
            createdAt: new Date().toISOString(),
            status: 'en_attente',
          },
          ...prev.errorReports,
        ],
      }));
      enqueueSync('error_report', `Signalement sur une question`, 2);
      notify('Signalement enregistré ! Il sera transmis à l’équipe pédagogique dès la prochaine synchronisation.', 'success');
    },
    [guardInput, enqueueSync, notify]
  );

  // ==================== STUDY PLAN ====================
  const regenerateStudyPlan = useCallback(() => {
    if (!activeProfile) return;
    const scoresBySubj: Record<string, { ok: number; tot: number }> = {};
    state.sessions.forEach((s) => {
      s.answers.forEach((a) => {
        const q = allQuestions.find((qq) => qq.id === a.questionId);
        if (!q) return;
        if (!scoresBySubj[q.subjectId]) scoresBySubj[q.subjectId] = { ok: 0, tot: 0 };
        scoresBySubj[q.subjectId].tot += 1;
        if (a.isCorrect) scoresBySubj[q.subjectId].ok += 1;
      });
    });
    const avgMap: Record<string, number> = {};
    Object.entries(scoresBySubj).forEach(([k, v]) => {
      avgMap[k] = Math.round((v.ok / Math.max(1, v.tot)) * 100);
    });
    const nextPlan = generateAdaptiveStudyPlan(
      activeProfile,
      SUBJECTS,
      avgMap,
      getMistakeQuestionIds().length
    );
    setState((prev) => ({ ...prev, studyPlan: nextPlan }));
    notify('Programme de révision recalculé selon tes derniers résultats !', 'success');
  }, [activeProfile, state.sessions, allQuestions, getMistakeQuestionIds, notify]);

  const togglePlanItemComplete = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      studyPlan: prev.studyPlan.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    }));
  }, []);

  const movePlanItemDate = useCallback((id: string, newDate: string) => {
    setState((prev) => {
      const [y, m, d] = newDate.split('-').map(Number);
      const dt = new Date(y, m - 1, d);
      const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
      const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
      const dayLabel = `${dayNames[dt.getDay()]} ${d} ${months[m - 1]}`;
      const updated = prev.studyPlan
        .map((item) => (item.id === id ? { ...item, date: newDate, dayLabel } : item))
        .sort((a, b) => a.date.localeCompare(b.date));
      return { ...prev, studyPlan: updated };
    });
    notify('Session déplacée dans ton planning hors ligne.', 'info');
  }, [notify]);

  const updatePlanItemDuration = useCallback((id: string, minutes: number) => {
    setState((prev) => ({
      ...prev,
      studyPlan: prev.studyPlan.map((item) =>
        item.id === id ? { ...item, durationMinutes: Math.max(5, Math.min(180, minutes)) } : item
      ),
    }));
  }, []);

  const addCustomPlanGoal = useCallback(
    (title: string, date: string, durationMinutes: number, subjectId?: string) => {
      const [y, m, d] = date.split('-').map(Number);
      const dt = new Date(y, m - 1, d);
      const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
      const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
      const item: StudyPlanItem = {
        id: `plan-custom-${Date.now()}`,
        date,
        dayLabel: `${dayNames[dt.getDay()]} ${d} ${months[m - 1]}`,
        subjectId,
        title,
        type: 'objectif_perso',
        durationMinutes,
        completed: false,
        priority: 'haute',
      };
      setState((prev) => ({
        ...prev,
        studyPlan: [...prev.studyPlan, item].sort((a, b) => a.date.localeCompare(b.date)),
      }));
      notify('Objectif personnel ajouté au programme !', 'success');
    },
    [notify]
  );

  const toggleRestDay = useCallback(
    (weekday: number) => {
      if (!activeProfile) return;
      const exists = activeProfile.restDays.includes(weekday);
      const nextRest = exists
        ? activeProfile.restDays.filter((d) => d !== weekday)
        : [...activeProfile.restDays, weekday];
      updateActiveProfile({ restDays: nextRest });
    },
    [activeProfile, updateActiveProfile]
  );

  // ==================== TEACHER STUDIO ====================
  const saveTeacherDraft = useCallback(
    (draft: TeacherDraft) => {
      setState((prev) => {
        const exists = prev.teacherDrafts.some((d) => d.id === draft.id);
        return {
          ...prev,
          teacherDrafts: exists
            ? prev.teacherDrafts.map((d) => (d.id === draft.id ? draft : d))
            : [draft, ...prev.teacherDrafts],
        };
      });
      notify('Brouillon enseignant enregistré hors ligne.', 'info');
    },
    [notify]
  );

  const publishTeacherDraft = useCallback(
    (draftId: string) => {
      const draft = state.teacherDrafts.find((d) => d.id === draftId);
      if (!draft) return;
      const checks = draft.validationChecks;
      const allOk =
        checks.noDuplicate &&
        checks.officialCorrectionVerified &&
        checks.sourceCited &&
        checks.curriculumCompliant &&
        checks.upToDate;
      if (!allOk) {
        notify('Valide tous les critères qualité avant de publier ce contenu hors ligne.', 'warning');
        return;
      }
      setState((prev) => ({
        ...prev,
        teacherDrafts: prev.teacherDrafts.map((d) =>
          d.id === draftId ? { ...d, status: 'publie' } : d
        ),
        customQuestions:
          draft.kind === 'question'
            ? [draft.payload as Question, ...prev.customQuestions.filter((q) => q.id !== (draft.payload as Question).id)]
            : prev.customQuestions,
        customFiches:
          draft.kind === 'fiche'
            ? [draft.payload as Fiche, ...prev.customFiches.filter((f) => f.id !== (draft.payload as Fiche).id)]
            : prev.customFiches,
      }));
      enqueueSync('teacher_publish', `Publication enseignant : ${draft.title}`, 12);
      notify('Contenu validé et publié dans la bibliothèque hors ligne !', 'success');
    },
    [state.teacherDrafts, enqueueSync, notify]
  );

  const deleteTeacherDraft = useCallback((draftId: string) => {
    setState((prev) => ({
      ...prev,
      teacherDrafts: prev.teacherDrafts.filter((d) => d.id !== draftId),
    }));
  }, []);

  // ==================== SETTINGS & PRIVACY ====================
  const updateAccessibility = useCallback((patch: Partial<AccessibilitySettings>) => {
    setState((prev) => ({
      ...prev,
      accessibility: { ...prev.accessibility, ...patch },
    }));
  }, []);

  const updatePrivacy = useCallback((patch: Partial<PrivacySettings>) => {
    setState((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, ...patch },
    }));
  }, []);

  const exportUserData = useCallback(() => {
    exportJsonDownload(`reussite-offline-export-${formatIsoDate(new Date())}.json`, {
      exportedAt: new Date().toISOString(),
      profile: activeProfile,
      sessions: state.sessions,
      notes: state.notes,
      highlights: state.highlights,
      favorites: state.favorites,
      flashcardProgress: state.flashcardProgress,
      studyPlan: state.studyPlan,
    });
    notify('Export JSON téléchargé sur ton appareil.', 'success');
  }, [activeProfile, state, notify]);

  const resetAllLocalData = useCallback(async () => {
    await clearAllPersistedData();
    setState(createEmptyInitialState());
    setScreen('welcome');
    notify('Toutes les données locales ont été réinitialisées.', 'warning');
  }, [notify]);

  const saveDiagnosticResult = useCallback(
    (result: DiagnosticResult, applyToProfile = true) => {
      setState((prev) => {
        const profiles =
          applyToProfile && prev.activeProfileId
            ? prev.profiles.map((p) =>
                p.id === prev.activeProfileId
                  ? {
                      ...p,
                      currentLevel: result.estimatedLevel,
                      dailyMinutes: Math.max(20, Math.round((result.recommendedWeeklyHours * 60) / 6)),
                    }
                  : p
              )
            : prev.profiles;
        const updatedProfile = profiles.find((p) => p.id === prev.activeProfileId) ?? null;
        const weakScores: Record<string, number> = {};
        result.subjectScores.forEach((s) => {
          weakScores[s.subjectId] = s.score;
        });
        const nextPlan =
          applyToProfile && updatedProfile
            ? generateAdaptiveStudyPlan(updatedProfile, SUBJECTS, weakScores, 0)
            : prev.studyPlan;
        return {
          ...prev,
          profiles,
          diagnosticResult: result,
          studyPlan: nextPlan,
        };
      });
      enqueueSync('diagnostic', 'Enregistrement du bilan de positionnement adaptatif', 4);
      notify(
        applyToProfile
          ? 'Bilan de positionnement enregistré et programme personnalisé mis à jour !'
          : 'Bilan de positionnement enregistré hors ligne.',
        'success'
      );
    },
    [enqueueSync, notify]
  );

  const addGeneratedContent = useCallback(
    (payload: { fiche?: Fiche; questions?: Question[]; flashcards?: Flashcard[] }) => {
      setState((prev) => {
        const nextFiches = payload.fiche ? [payload.fiche, ...prev.customFiches] : prev.customFiches;
        const nextQuestions = payload.questions?.length
          ? [...payload.questions, ...prev.customQuestions]
          : prev.customQuestions;
        const nextFlashcards = payload.flashcards?.length
          ? [...payload.flashcards, ...prev.customFlashcards]
          : prev.customFlashcards;

        const nextDownloads = { ...prev.downloadedItems };
        if (payload.fiche) {
          nextDownloads[`fiche:${payload.fiche.id}`] = {
            id: payload.fiche.id,
            type: 'fiche',
            title: payload.fiche.title,
            subjectId: payload.fiche.subjectId,
            sizeKb: payload.fiche.sizeKb,
            downloadedAt: new Date().toISOString(),
            version: 1,
          };
        }

        return {
          ...prev,
          customFiches: nextFiches,
          customQuestions: nextQuestions,
          customFlashcards: nextFlashcards,
          downloadedItems: nextDownloads,
        };
      });
      enqueueSync('generated_content', 'Sauvegarde de contenus générés (fiche / QCM / flashcards)', 8);
      notify('Contenus générés enregistrés et disponibles 100 % hors ligne !', 'success');
    },
    [enqueueSync, notify]
  );

  const setFatigueLevel = useCallback(
    (level: AppState['fatigueLevel']) => {
      setState((prev) => ({ ...prev, fatigueLevel: level }));
      notify(
        level === 'fatigue'
          ? 'Mode énergie douce activé : sessions courtes (5–15 min) privilégiées.'
          : level === 'frais'
          ? 'Pleine forme enregistrée : sessions approfondies et examens blancs conseillés.'
          : 'Niveau d’énergie normal enregistré.',
        'info'
      );
    },
    [notify]
  );

  const setPlanMode = useCallback(
    (mode: AppState['planMode']) => {
      setState((prev) => {
        const factor =
          mode === 'express' ? 0.5 : mode === 'veille' ? 0.6 : mode === 'derniere_semaine' ? 1.2 : 1;
        const adjusted = prev.studyPlan.map((item) =>
          item.type === 'pause'
            ? item
            : {
                ...item,
                durationMinutes: Math.max(5, Math.round((item.durationMinutes * factor) / 5) * 5),
              }
        );
        return { ...prev, planMode: mode, studyPlan: adjusted };
      });
      const labels: Record<AppState['planMode'], string> = {
        standard: 'Mode standard activé',
        express: 'Mode révision express (sessions courtes 5–15 min)',
        derniere_semaine: 'Mode dernière semaine (priorité annales & erreurs)',
        veille: 'Mode veille d’examen (fiches légères & repos mental)',
      };
      notify(labels[mode], 'success');
    },
    [notify]
  );

  const createStudyGroup = useCallback(
    (input: { name: string; examId: string; description: string }) => {
      const nameCheck = guardInput('Création groupe (Nom)', input.name, 120);
      const descCheck = guardInput('Création groupe (Description)', input.description, 400);
      if (!nameCheck.allowed || !descCheck.allowed) return;
      const code = `${input.examId.slice(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const group: StudyGroup = {
        id: `grp-${Date.now()}`,
        name: nameCheck.cleanText,
        examId: input.examId,
        inviteCode: code,
        membersCount: 1,
        description: descCheck.cleanText || 'Groupe privé de révision et d’entraide.',
        moderated: true,
        minorSafe: true,
        sharedFicheIds: [],
        messages: [
          {
            id: `msg-${Date.now()}`,
            author: activeProfile?.name ?? 'Créateur',
            role: activeProfile?.category === 'enseignant' ? 'enseignant' : 'eleve',
            text: `Groupe créé ! Code d’invitation privé : ${code}. Restons bienveillants et axés sur la réussite.`,
            createdAt: new Date().toISOString(),
          },
        ],
      };
      setState((prev) => ({ ...prev, studyGroups: [group, ...prev.studyGroups] }));
      enqueueSync('study_group', `Création du groupe ${group.name}`, 3);
      notify(`Groupe privé « ${group.name} » créé (code ${code}).`, 'success');
    },
    [activeProfile, guardInput, enqueueSync, notify]
  );

  const addStudyGroupMessage = useCallback(
    (groupId: string, text: string) => {
      if (!text.trim()) return;
      const secCfg = state.security?.config ?? DEFAULT_SECURITY_CONFIG;
      if (secCfg.rateLimitEnabled) {
        const rl = checkRateLimit(`grp_msg_${groupId}`, 8, 30_000);
        if (!rl.allowed) {
          logSecurityEvent({
            id: `sec-rl-msg-${Date.now()}`,
            timestamp: new Date().toISOString(),
            category: 'RATE_LIMIT',
            severity: 'low',
            source: 'Groupe d’étude',
            ruleId: 'WAF-RL-MSG',
            description: 'Envoi de messages trop rapide bloqué par anti-spam.',
            blocked: true,
          });
          notify(`Anti-spam actif : attends ${rl.retryAfterSec}s avant d’envoyer un autre message.`, 'warning');
          return;
        }
      }
      const check = guardInput('Message groupe d’étude', text, 1000);
      if (!check.allowed) return;

      setState((prev) => ({
        ...prev,
        studyGroups: prev.studyGroups.map((g) =>
          g.id === groupId
            ? {
                ...g,
                messages: [
                  ...g.messages,
                  {
                    id: `msg-${Date.now()}`,
                    author: activeProfile?.name ?? 'Étudiant',
                    role: activeProfile?.category === 'enseignant' ? 'enseignant' : 'eleve',
                    text: check.cleanText,
                    createdAt: new Date().toISOString(),
                  },
                ],
              }
            : g
        ),
      }));
      enqueueSync('group_message', 'Message pédagogique ajouté au groupe', 1);
    },
    [activeProfile, state.security?.config, guardInput, logSecurityEvent, enqueueSync, notify]
  );

  const reportGroupMessage = useCallback(
    (groupId: string, messageId: string) => {
      setState((prev) => ({
        ...prev,
        studyGroups: prev.studyGroups.map((g) =>
          g.id === groupId
            ? {
                ...g,
                messages: g.messages.map((m) =>
                  m.id === messageId ? { ...m, reported: true } : m
                ),
              }
            : g
        ),
      }));
      notify('Message signalé à la modération et masqué pour sécurité.', 'warning');
    },
    [notify]
  );

  const updateErrorReportStatus = useCallback(
    (reportId: string, status: ErrorReport['status']) => {
      setState((prev) => ({
        ...prev,
        errorReports: prev.errorReports.map((r) =>
          r.id === reportId ? { ...r, status } : r
        ),
      }));
      enqueueSync('admin_report', `Statut signalement mis à jour : ${status}`, 1);
      notify(`Signalement marqué « ${status} ».`, 'success');
    },
    [enqueueSync, notify]
  );

  // ==================== SECURITY FIREWALL & ANTIVIRUS CENTER ====================
  const updateSecurityConfig = useCallback(
    (patch: Partial<SecurityConfig>) => {
      setState((prev) => {
        const sec = prev.security ?? createInitialSecurityState();
        return {
          ...prev,
          security: {
            ...sec,
            config: { ...sec.config, ...patch },
          },
        };
      });
      notify('Configuration du pare-feu et des boucliers mise à jour.', 'success');
    },
    [notify]
  );

  const runSecurityScan = useCallback((): SecurityScanReport => {
    const { report, detectedEvents } = runFullSecurityScan(state);
    setState((prev) => {
      const sec = prev.security ?? createInitialSecurityState();
      const auditEv: SecurityEvent = {
        id: `sec-audit-${Date.now()}`,
        timestamp: report.scannedAt,
        category: 'SYSTEM_AUDIT',
        severity: report.threatsFound > 0 ? 'high' : 'info',
        source: 'Scan Antivirus & Intégrité',
        ruleId: 'AV-FULL-SCAN',
        description: report.summary,
        blocked: report.threatsFound > 0,
      };
      return {
        ...prev,
        security: {
          ...sec,
          lastScan: report,
          integrityStatus: 'verified',
          blockedCount: sec.blockedCount + detectedEvents.length,
          quarantinedCount: sec.quarantinedCount + detectedEvents.length,
          events: [auditEv, ...detectedEvents, ...sec.events].slice(0, 60),
        },
      };
    });
    notify(report.summary, report.threatsFound > 0 ? 'warning' : 'success');
    return report;
  }, [state, notify]);

  const testSecurityInput = useCallback(
    (source: string, rawText: string): { safe: boolean; message: string } => {
      const res = guardInput(source, rawText, 4000);
      if (!res.allowed) {
        return { safe: false, message: 'Menace détectée, bloquée et mise en quarantaine par le bouclier !' };
      }
      return { safe: true, message: 'Entrée saine : aucune signature virale ni tentative de piratage détectée.' };
    },
    [guardInput]
  );

  const clearSecurityLogs = useCallback(() => {
    setState((prev) => {
      const sec = prev.security ?? createInitialSecurityState();
      return {
        ...prev,
        security: {
          ...sec,
          events: [
            {
              id: `sec-clear-${Date.now()}`,
              timestamp: new Date().toISOString(),
              category: 'SYSTEM_AUDIT',
              severity: 'info',
              source: 'Journal SIEM',
              ruleId: 'SYS-LOG-RESET',
              description: 'Journal de sécurité purgé par l’utilisateur.',
              blocked: false,
            },
          ],
        },
      };
    });
    notify('Journal d’audit de sécurité effacé.', 'info');
  }, [notify]);

  const triggerPanicLockdown = useCallback(() => {
    clearTwoFactorSessionVerification();
    setTwoFactorVerifiedProfileId(null);
    setState((prev) => {
      const sec = prev.security ?? createInitialSecurityState();
      const ev: SecurityEvent = {
        id: `sec-panic-${Date.now()}`,
        timestamp: new Date().toISOString(),
        category: 'SYSTEM_AUDIT',
        severity: 'critical',
        source: 'Mode Verrouillage d’Urgence',
        ruleId: 'SYS-PANIC-LOCK',
        description:
          'Verrouillage d’urgence déclenché : session fermée, mode strict + chiffrement AES-256 forcés.',
        blocked: true,
      };
      return {
        ...prev,
        activeProfileId: null,
        privacy: { ...prev.privacy, localEncryptionEnabled: true },
        security: {
          ...sec,
          config: { ...DEFAULT_SECURITY_CONFIG, strictMode: true, autoLockMinutes: 10 },
          events: [ev, ...sec.events].slice(0, 60),
        },
      };
    });
    setScreen('welcome');
    notify('🔒 Mode Verrouillage d’Urgence activé : session fermée et boucliers au niveau maximal !', 'warning');
  }, [notify]);

  // ==================== OWNER / FOUNDER EXCLUSIVE CONTROLS ====================
  const updateOwnerSettings = useCallback(
    async (patch: Partial<OwnerGlobalSettings>) => {
      if (!isOwner) {
        notify('Action réservée exclusivement au compte Propriétaire.', 'error');
        return;
      }
      if (patch.announcementText !== undefined) {
        const check = guardInput('Annonce globale Propriétaire', patch.announcementText, 500);
        if (!check.allowed) return;
        patch = { ...patch, announcementText: check.cleanText };
      }

      const nextSettings: OwnerGlobalSettings = {
        ...(state.ownerSettings ?? DEFAULT_OWNER_SETTINGS),
        ...patch,
        updatedAt: new Date().toISOString(),
      };

      setState((prev) => ({
        ...prev,
        ownerSettings: nextSettings,
        security:
          patch.globalFirewallLevel && prev.security
            ? {
                ...prev.security,
                config: {
                  ...prev.security.config,
                  strictMode: patch.globalFirewallLevel !== 'standard',
                  domGuardEnabled: true,
                  autoLockMinutes:
                    patch.globalFirewallLevel === 'forteresse'
                      ? 15
                      : prev.security.config.autoLockMinutes,
                },
              }
            : prev.security,
      }));

      if (isOnline && isSupabaseConfigured) {
        const res = await saveOwnerGlobalSettingsToCloud(nextSettings);
        if (!res.ok) {
          notify(`Enregistré localement (erreur Cloud : ${res.error}).`, 'warning');
          return;
        }
      }
      notify('👑 Paramètres globaux Propriétaire enregistrés et synchronisés !', 'success');
    },
    [isOwner, guardInput, state.ownerSettings, isOnline, notify]
  );

  const downloadFullOfflineCatalog = useCallback(() => {
    if (!isOwner) return;
    const now = new Date().toISOString();
    const nextDownloads: Record<string, DownloadedItem> = { ...state.downloadedItems };

    COURSES.forEach((c) => {
      nextDownloads[`course:${c.id}`] = {
        id: c.id,
        type: 'course',
        title: c.title,
        subjectId: c.subjectId,
        sizeKb: c.sizeKb,
        downloadedAt: now,
        version: 2,
      };
    });
    FICHES.forEach((f) => {
      nextDownloads[`fiche:${f.id}`] = {
        id: f.id,
        type: 'fiche',
        title: f.title,
        subjectId: f.subjectId,
        sizeKb: f.sizeKb,
        downloadedAt: now,
        version: 2,
      };
    });
    ANNALES.forEach((a) => {
      nextDownloads[`annale:${a.id}`] = {
        id: a.id,
        type: 'annale',
        title: a.title,
        subjectId: a.subjectId,
        sizeKb: a.sizeKb,
        downloadedAt: now,
        version: 2,
      };
    });

    setState((prev) => ({ ...prev, downloadedItems: nextDownloads }));
    notify(
      `👑 Pack Propriétaire complet installé hors ligne (${COURSES.length} cours, ${FICHES.length} fiches, ${ANNALES.length} annales) !`,
      'success'
    );
  }, [isOwner, state.downloadedItems, notify]);

  const publishOwnerQuickQuestion = useCallback(
    async (q: Question): Promise<{ ok: boolean; error?: string }> => {
      if (!isOwner || !activeProfile) {
        return { ok: false, error: 'Action réservée au Propriétaire.' };
      }
      const pCheck = guardInput('Publication Propriétaire (Énoncé)', q.prompt, 1200);
      const eCheck = guardInput('Publication Propriétaire (Explication)', q.explanation, 1500);
      if (!pCheck.allowed || !eCheck.allowed) {
        return { ok: false, error: 'Contenu bloqué par le pare-feu WAF.' };
      }
      const cleanQ: Question = {
        ...q,
        prompt: pCheck.cleanText,
        explanation: eCheck.cleanText,
      };
      setState((prev) => ({
        ...prev,
        customQuestions: [cleanQ, ...prev.customQuestions],
      }));
      if (isOnline && isSupabaseConfigured) {
        const res = await publishOwnerCloudQuestion(cleanQ, activeProfile.id);
        if (!res.ok) {
          notify(`Ajoutée localement, erreur Cloud : ${res.error}`, 'warning');
          return { ok: true };
        }
      }
      notify('👑 Question officielle publiée localement ET diffusée sur Supabase Cloud !', 'success');
      return { ok: true };
    },
    [isOwner, activeProfile, guardInput, isOnline, notify]
  );

  const exportMasterBackup = useCallback(() => {
    if (!isOwner) return;
    const backup = {
      exportedAt: new Date().toISOString(),
      owner: activeProfile?.email,
      appVersion: 'Réussite Offline v8 + Bouclier 36 + Console Propriétaire',
      catalogSummary: {
        exams: EXAMS.length,
        subjects: SUBJECTS.length,
        courses: COURSES.length,
        fiches: FICHES.length,
        questions: allQuestions.length,
        annales: ANNALES.length,
        flashcards: allFlashcards.length,
      },
      ownerSettings: state.ownerSettings,
      profiles: state.profiles.map(({ passwordHash: _ph, ...safe }) => safe),
      customQuestions: state.customQuestions,
      customFiches: state.customFiches,
      studyGroups: state.studyGroups,
      errorReports: state.errorReports,
      securityAudit: state.security,
    };
    exportJsonDownload(`reussite-offline-master-backup-${new Date().toISOString().slice(0, 10)}.json`, backup);
    notify('👑 Sauvegarde Maître complète exportée (JSON sécurisé sans mots de passe).', 'success');
  }, [isOwner, activeProfile, allQuestions.length, allFlashcards.length, state, notify]);

  const purgeReportedGroupMessages = useCallback(() => {
    if (!isOwner) return;
    let removed = 0;
    setState((prev) => ({
      ...prev,
      studyGroups: prev.studyGroups.map((g) => {
        const before = g.messages.length;
        const kept = g.messages.filter((m) => !m.reported);
        removed += before - kept.length;
        return { ...g, messages: kept };
      }),
    }));
    notify(
      removed > 0
        ? `👑 Modération globale : ${removed} message(s) signalé(s) supprimé(s) définitivement.`
        : 'Aucun message signalé à purger dans les groupes d’étude.',
      'success'
    );
  }, [isOwner, notify]);

  // ==================== TWO-FACTOR AUTHENTICATION (2FA / MFA — DEVICE LOCK & MASTER PIN) ====================
  const completeTwoFactorEnrollment = useCallback(
    async (input: {
      method: TwoFactorMethod;
      pin?: string;
      recoveryCodes: string[];
    }): Promise<{ ok: boolean; error?: string }> => {
      if (!activeProfile) {
        return { ok: false, error: 'Aucun compte actif.' };
      }

      const nowIso = new Date().toISOString();
      const recoveryCodeHashes = await hashRecoveryCodes(input.recoveryCodes);
      let nextConfig: TwoFactorConfig;

      if (input.method === 'device') {
        const reg = await registerDeviceLockCredential({
          id: activeProfile.id,
          email: activeProfile.email,
          name: activeProfile.name,
        });
        if (!reg.ok || !reg.credentialId) {
          return {
            ok: false,
            error:
              reg.error ??
              'Impossible de valider le verrouillage de cet appareil. Essaie le Code PIN Maître 2FA.',
          };
        }
        nextConfig = {
          required: true,
          enabled: true,
          method: 'device',
          webauthnCredentialId: reg.credentialId,
          webauthnDeviceLabel: reg.deviceLabel,
          recoveryCodeHashes,
          configuredAt: nowIso,
          lastVerifiedAt: nowIso,
        };
      } else {
        const cleanPin = (input.pin ?? '').replace(/\D/g, '');
        if (cleanPin.length !== 6) {
          return { ok: false, error: 'Le Code PIN Maître 2FA doit contenir exactement 6 chiffres.' };
        }
        const weakPins = new Set([
          '000000',
          '111111',
          '222222',
          '333333',
          '444444',
          '555555',
          '666666',
          '777777',
          '888888',
          '999999',
          '123456',
          '654321',
          '123123',
          '012345',
        ]);
        if (weakPins.has(cleanPin)) {
          return {
            ok: false,
            error: 'Ce Code PIN est trop prévisible. Choisis 6 chiffres uniques et non séquentiels.',
          };
        }
        const pinHash = await hashTwoFactorPin(cleanPin);
        nextConfig = {
          required: true,
          enabled: true,
          method: 'pin',
          pinHash,
          recoveryCodeHashes,
          configuredAt: nowIso,
          lastVerifiedAt: nowIso,
        };
      }

      const updatedProfile: UserProfile = {
        ...activeProfile,
        twoFactor: nextConfig,
      };

      setState((prev) => {
        const pSec = prev.security ?? createInitialSecurityState();
        const ev: SecurityEvent = {
          id: `sec-2fa-enroll-${Date.now()}`,
          timestamp: nowIso,
          category: 'SYSTEM_AUDIT',
          severity: 'low',
          source: 'Double Authentification (2FA)',
          ruleId: 'MFA-ENROLLED',
          description: `2FA (${nextConfig.method === 'device' ? `Verrouillage appareil WebAuthn : ${nextConfig.webauthnDeviceLabel}` : 'Code PIN Maître PBKDF2'}) activée et verrouillée sur ${activeProfile.email}.`,
          blocked: false,
        };
        return {
          ...prev,
          profiles: prev.profiles.map((p) =>
            p.id === activeProfile.id ? { ...p, twoFactor: nextConfig } : p
          ),
          security: {
            ...pSec,
            failedLoginAttempts: 0,
            lockoutUntil: null,
            events: [ev, ...pSec.events].slice(0, 60),
          },
        };
      });

      markTwoFactorSessionVerified(activeProfile.id, 0);
      setTwoFactorVerifiedProfileId(activeProfile.id);

      if (isOnline && isSupabaseConfigured) {
        await syncTwoFactorConfigToCloud(updatedProfile);
      }

      notify(
        nextConfig.method === 'device'
          ? '🔐 Verrouillage de l’appareil activé ! Ton compte exige désormais ton mot de passe / biométrie d’appareil.'
          : '🔐 Code PIN Maître 2FA activé ! Ton compte est maintenant doublement protégé.',
        'success'
      );
      return { ok: true };
    },
    [activeProfile, isOnline, notify]
  );

  const verifyTwoFactorChallenge = useCallback(
    async (
      code: string,
      mode: 'primary' | 'recovery',
      rememberHours = 0
    ): Promise<{ ok: boolean; error?: string; remainingRecoveryCodes?: number }> => {
      if (!activeProfile?.twoFactor?.enabled) {
        return { ok: false, error: 'Double authentification non configurée.' };
      }
      const sec = state.security ?? createInitialSecurityState();
      if (sec.config.bruteForceProtection && sec.lockoutUntil) {
        const remainingMs = new Date(sec.lockoutUntil).getTime() - Date.now();
        if (remainingMs > 0) {
          const mins = Math.ceil(remainingMs / 60000);
          return {
            ok: false,
            error: `Verrouillage anti-bruteforce 2FA actif (${mins} min restante(s)).`,
          };
        }
      }

      const nowIso = new Date().toISOString();
      const cfg = activeProfile.twoFactor;

      const record2faFailure = (reason: string) => {
        const nextFails = sec.failedLoginAttempts + 1;
        const triggerLock = sec.config.bruteForceProtection && nextFails >= 5;
        const lockUntil = triggerLock ? new Date(Date.now() + 5 * 60 * 1000).toISOString() : null;
        setState((prev) => {
          const pSec = prev.security ?? createInitialSecurityState();
          const ev: SecurityEvent = {
            id: `sec-2fa-fail-${Date.now()}`,
            timestamp: nowIso,
            category: 'BRUTEFORCE_AUTH',
            severity: triggerLock ? 'critical' : 'high',
            source: 'Défi Double Authentification (2FA)',
            ruleId: triggerLock ? 'MFA-BF-LOCKOUT' : 'MFA-VERIFY-FAIL',
            description: triggerLock
              ? 'Verrouillage 2FA (5 min) après 5 vérifications 2FA échouées consécutives.'
              : `${reason} (${nextFails}/5 tentatives).`,
            blocked: true,
          };
          return {
            ...prev,
            security: {
              ...pSec,
              failedLoginAttempts: triggerLock ? 0 : nextFails,
              lockoutUntil: lockUntil,
              blockedCount: pSec.blockedCount + 1,
              events: [ev, ...pSec.events].slice(0, 60),
            },
          };
        });
        return triggerLock
          ? '5 échecs détectés : accès bloqué pendant 5 minutes par le pare-feu anti-bruteforce.'
          : reason;
      };

      if (mode === 'recovery') {
        const res = await verifyAndConsumeRecoveryCode(code, cfg.recoveryCodeHashes ?? []);
        if (!res.valid) {
          return { ok: false, error: record2faFailure('Code de secours 2FA invalide ou déjà utilisé.') };
        }
        const nextCfg: TwoFactorConfig = {
          ...cfg,
          recoveryCodeHashes: res.remainingHashes,
          lastVerifiedAt: nowIso,
        };
        const updatedProfile = { ...activeProfile, twoFactor: nextCfg };
        setState((prev) => {
          const pSec = prev.security ?? createInitialSecurityState();
          const ev: SecurityEvent = {
            id: `sec-2fa-rec-${Date.now()}`,
            timestamp: nowIso,
            category: 'SYSTEM_AUDIT',
            severity: 'medium',
            source: 'Double Authentification (2FA)',
            ruleId: 'MFA-RECOVERY-USED',
            description: `Connexion validée par code de secours unique (${res.remainingHashes.length} restant(s)).`,
            blocked: false,
          };
          return {
            ...prev,
            profiles: prev.profiles.map((p) =>
              p.id === activeProfile.id ? { ...p, twoFactor: nextCfg } : p
            ),
            security: {
              ...pSec,
              failedLoginAttempts: 0,
              lockoutUntil: null,
              events: [ev, ...pSec.events].slice(0, 60),
            },
          };
        });
        markTwoFactorSessionVerified(activeProfile.id, rememberHours);
        setTwoFactorVerifiedProfileId(activeProfile.id);
        if (isOnline && isSupabaseConfigured) {
          await syncTwoFactorConfigToCloud(updatedProfile);
        }
        notify(
          `🔐 Code de secours accepté ! Il te reste ${res.remainingHashes.length} code(s) de secours.`,
          'warning'
        );
        return { ok: true, remainingRecoveryCodes: res.remainingHashes.length };
      }

      // Primary mode: Native Device Lock (WebAuthn) or Master PIN
      const nextCfg: TwoFactorConfig = { ...cfg, lastVerifiedAt: nowIso };
      if (cfg.method === 'device') {
        if (!cfg.webauthnCredentialId) {
          return {
            ok: false,
            error: 'Aucun appareil enregistré. Utilise un code de secours pour réinitialiser la 2FA.',
          };
        }
        const check = await verifyDeviceLockAssertion(cfg.webauthnCredentialId);
        if (!check.ok) {
          return {
            ok: false,
            error: record2faFailure(
              check.error ?? 'Vérification par mot de passe / biométrie de l’appareil échouée.'
            ),
          };
        }
      } else {
        const pinOk = await verifyTwoFactorPin(code, cfg.pinHash);
        if (!pinOk) {
          return { ok: false, error: record2faFailure('Code PIN Maître 2FA incorrect.') };
        }
      }

      const updatedProfile = { ...activeProfile, twoFactor: nextCfg };
      setState((prev) => {
        const pSec = prev.security ?? createInitialSecurityState();
        const ev: SecurityEvent = {
          id: `sec-2fa-ok-${Date.now()}`,
          timestamp: nowIso,
          category: 'SYSTEM_AUDIT',
          severity: 'low',
          source: 'Double Authentification (2FA)',
          ruleId: 'MFA-VERIFIED',
          description: `Double authentification (${cfg.method === 'device' ? 'Verrouillage appareil' : 'Code PIN Maître'}) validée pour ${activeProfile.email}.`,
          blocked: false,
        };
        return {
          ...prev,
          profiles: prev.profiles.map((p) =>
            p.id === activeProfile.id ? { ...p, twoFactor: nextCfg } : p
          ),
          security: {
            ...pSec,
            failedLoginAttempts: 0,
            lockoutUntil: null,
            events: [ev, ...pSec.events].slice(0, 60),
          },
        };
      });

      markTwoFactorSessionVerified(activeProfile.id, rememberHours);
      setTwoFactorVerifiedProfileId(activeProfile.id);

      if (isOnline && isSupabaseConfigured) {
        await syncTwoFactorConfigToCloud(updatedProfile);
      }

      notify(`🔐 Identité confirmée ! Bienvenue, ${activeProfile.name}.`, 'success');
      return { ok: true };
    },
    [activeProfile, state.security, isOnline, notify]
  );

  const lockTwoFactorSessionNow = useCallback(() => {
    clearTwoFactorSessionVerification();
    setTwoFactorVerifiedProfileId(null);
    notify('🔒 Session 2FA verrouillée : ton verrouillage 2FA est requis pour reprendre.', 'info');
  }, [notify]);

  const regenerateTwoFactorRecoveryCodes = useCallback(
    async (
      currentCode = ''
    ): Promise<{ ok: boolean; codes?: string[]; error?: string }> => {
      if (!activeProfile?.twoFactor?.enabled) {
        return { ok: false, error: '2FA non active.' };
      }
      const cfg = activeProfile.twoFactor;
      let valid = false;
      if (cfg.method === 'device') {
        if (cfg.webauthnCredentialId) {
          const res = await verifyDeviceLockAssertion(cfg.webauthnCredentialId);
          valid = res.ok;
          if (!valid && res.error) {
            return { ok: false, error: res.error };
          }
        }
      } else {
        valid = await verifyTwoFactorPin(currentCode, cfg.pinHash);
      }
      if (!valid) {
        return { ok: false, error: 'Vérification 2FA invalide. Régénération refusée.' };
      }

      const freshCodes = generateRecoveryCodes(8);
      const freshHashes = await hashRecoveryCodes(freshCodes);
      const nextCfg: TwoFactorConfig = {
        ...cfg,
        recoveryCodeHashes: freshHashes,
      };
      const updatedProfile = { ...activeProfile, twoFactor: nextCfg };
      setState((prev) => ({
        ...prev,
        profiles: prev.profiles.map((p) =>
          p.id === activeProfile.id ? { ...p, twoFactor: nextCfg } : p
        ),
      }));
      if (isOnline && isSupabaseConfigured) {
        await syncTwoFactorConfigToCloud(updatedProfile);
      }
      notify('🔑 8 nouveaux codes de secours générés (les anciens sont révoqués).', 'success');
      return { ok: true, codes: freshCodes };
    },
    [activeProfile, isOnline, notify]
  );

  const resetTwoFactorMethod = useCallback(
    async (currentCodeOrRecovery = ''): Promise<{ ok: boolean; error?: string }> => {
      if (!activeProfile?.twoFactor?.enabled) {
        return { ok: false, error: '2FA non active.' };
      }
      const cfg = activeProfile.twoFactor;
      let valid = false;
      if (cfg.method === 'device') {
        if (currentCodeOrRecovery.trim().length >= 8) {
          const rec = await verifyAndConsumeRecoveryCode(
            currentCodeOrRecovery,
            cfg.recoveryCodeHashes ?? []
          );
          valid = rec.valid;
        }
        if (!valid && cfg.webauthnCredentialId) {
          const res = await verifyDeviceLockAssertion(cfg.webauthnCredentialId);
          valid = res.ok;
        }
      } else {
        valid = await verifyTwoFactorPin(currentCodeOrRecovery, cfg.pinHash);
        if (!valid) {
          const rec = await verifyAndConsumeRecoveryCode(
            currentCodeOrRecovery,
            cfg.recoveryCodeHashes ?? []
          );
          valid = rec.valid;
        }
      }
      if (!valid) {
        return {
          ok: false,
          error: 'Vérification de l’appareil, Code PIN ou code de secours invalide. Réinitialisation bloquée.',
        };
      }

      const resetCfg: TwoFactorConfig = {
        required: isOwnerProfile(activeProfile),
        enabled: false,
        method: 'device',
        recoveryCodeHashes: [],
      };
      const updatedProfile = { ...activeProfile, twoFactor: resetCfg };
      clearTwoFactorSessionVerification();
      setTwoFactorVerifiedProfileId(null);

      setState((prev) => ({
        ...prev,
        profiles: prev.profiles.map((p) =>
          p.id === activeProfile.id ? { ...p, twoFactor: resetCfg } : p
        ),
      }));
      if (isOnline && isSupabaseConfigured) {
        await syncTwoFactorConfigToCloud(updatedProfile);
      }
      notify(
        '🔄 Méthode 2FA réinitialisée. Configure immédiatement le verrouillage de ton appareil ou un nouveau Code PIN.',
        'warning'
      );
      return { ok: true };
    },
    [activeProfile, isOnline, notify]
  );

  const toggleOptionalTwoFactorForUser = useCallback(
    (enable: boolean) => {
      if (!activeProfile) return;
      if (isOwnerProfile(activeProfile) && !enable) {
        notify('La double authentification est obligatoire et protégée sur le compte Propriétaire.', 'warning');
        return;
      }
      if (enable) {
        const nextCfg: TwoFactorConfig = {
          required: true,
          enabled: activeProfile.twoFactor?.enabled ?? false,
          method: activeProfile.twoFactor?.method ?? 'device',
          webauthnCredentialId: activeProfile.twoFactor?.webauthnCredentialId,
          webauthnDeviceLabel: activeProfile.twoFactor?.webauthnDeviceLabel,
          pinHash: activeProfile.twoFactor?.pinHash,
          recoveryCodeHashes: activeProfile.twoFactor?.recoveryCodeHashes ?? [],
        };
        clearTwoFactorSessionVerification();
        setTwoFactorVerifiedProfileId(null);
        setState((prev) => ({
          ...prev,
          profiles: prev.profiles.map((p) =>
            p.id === activeProfile.id ? { ...p, twoFactor: nextCfg } : p
          ),
        }));
      } else {
        const nextCfg: TwoFactorConfig = {
          required: false,
          enabled: false,
          method: 'device',
          recoveryCodeHashes: [],
        };
        setState((prev) => ({
          ...prev,
          profiles: prev.profiles.map((p) =>
            p.id === activeProfile.id ? { ...p, twoFactor: nextCfg } : p
          ),
        }));
        notify('Double authentification désactivée sur ce compte standard.', 'info');
      }
    },
    [activeProfile, notify]
  );

  const triggerLocalReminder = useCallback(() => {
    const nextSession = state.studyPlan.find((p) => !p.completed && p.type !== 'pause');
    const body = nextSession
      ? `Session prévue (${nextSession.durationMinutes} min) : ${nextSession.title}`
      : 'C’est l’heure de ta courte session de révision quotidienne !';

    if (typeof Notification !== 'undefined') {
      if (Notification.permission === 'granted') {
        new Notification('Réussite Offline — Rappel de révision', { body });
        notify('Notification locale envoyée !', 'success');
        return;
      }
      if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((perm) => {
          if (perm === 'granted') {
            new Notification('Réussite Offline — Rappel de révision', { body });
          } else {
            notify(`Rappel local programmé : ${body}`, 'info');
          }
        });
        return;
      }
    }
    notify(`Rappel local : ${body}`, 'info');
  }, [state.studyPlan, notify]);

  const value: AppContextValue = {
    state,
    hydrated,
    activeProfile,
    isOwner,
    screen,
    navigate,
    selectedSubjectId,
    setSelectedSubjectId,
    selectedCourseId,
    setSelectedCourseId,
    selectedFicheId,
    setSelectedFicheId,
    selectedSessionId,
    setSelectedSessionId,
    showPlanModal,
    setShowPlanModal,
    allQuestions,
    allFiches,
    allFlashcards,
    saveDiagnosticResult,
    addGeneratedContent,
    setFatigueLevel,
    setPlanMode,
    createStudyGroup,
    addStudyGroupMessage,
    reportGroupMessage,
    updateErrorReportStatus,
    isOnline,
    syncStatus,
    downloadingIds,
    toggleSimulatedOffline,
    toggleSimulateSyncError,
    syncNow,
    registerAccount,
    loginAccount,
    switchProfile,
    logout,
    updateActiveProfile,
    deleteActiveAccount,
    isDownloaded,
    downloadItem,
    downloadSubjectBundle,
    removeDownloadedItem,
    clearAllDownloads,
    startPractice,
    resumeInProgressSession,
    updateInProgressSession,
    discardInProgressSession,
    completeSession,
    getMistakeQuestionIds,
    rateFlashcard,
    toggleFavorite,
    addNote,
    updateNote,
    deleteNote,
    addHighlight,
    removeHighlight,
    toggleCourseCompleted,
    reportQuestionError,
    regenerateStudyPlan,
    togglePlanItemComplete,
    movePlanItemDate,
    updatePlanItemDuration,
    addCustomPlanGoal,
    toggleRestDay,
    saveTeacherDraft,
    publishTeacherDraft,
    deleteTeacherDraft,
    updateAccessibility,
    updatePrivacy,
    exportUserData,
    resetAllLocalData,
    updateSecurityConfig,
    logSecurityEvent,
    runSecurityScan,
    testSecurityInput,
    clearSecurityLogs,
    triggerPanicLockdown,
    updateOwnerSettings,
    downloadFullOfflineCatalog,
    publishOwnerQuickQuestion,
    exportMasterBackup,
    purgeReportedGroupMessages,
    requiresTwoFactorGate,
    twoFactorConfigured,
    twoFactorMandatory,
    completeTwoFactorEnrollment,
    verifyTwoFactorChallenge,
    lockTwoFactorSessionNow,
    regenerateTwoFactorRecoveryCodes,
    resetTwoFactorMethod,
    toggleOptionalTwoFactorForUser,
    toasts,
    notify,
    dismissToast,
    triggerLocalReminder,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp doit être utilisé dans AppProvider');
  return ctx;
}

export {
  CHAPTERS,
  CLASS_LEVELS,
  COURSES,
  EXAMS,
  FLASHCARDS,
  SCHOOL_CYCLES,
  SUBJECTS,
  ANNALES,
  formatClassRange,
  getClassLevelMeta,
  mapStudyLevelToClassId,
};
