import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ANNALES, CHAPTERS, COURSES, EXAMS, FICHES, FLASHCARDS, QUESTIONS, SUBJECTS } from '../data';
import { generateAdaptiveStudyPlan, formatIsoDate } from '../lib/planner';
import { computeNextFlashcardReview } from '../lib/sm2';
import {
  clearAllPersistedData,
  exportJsonDownload,
  hashPassword,
  loadPersistedState,
  savePersistedState,
} from '../lib/storage';
import { isSupabaseConfigured, syncStateWithSupabase } from '../lib/supabaseSync';
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
  PersonalNote,
  PrivacySettings,
  Question,
  ScreenId,
  SessionRecord,
  StudyGroup,
  StudyPlanItem,
  SyncStatus,
  TeacherDraft,
  TrainingMode,
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

function createDemoState(): AppState {
  const examDate = new Date();
  examDate.setDate(examDate.getDate() + 45);
  const demoProfile: UserProfile = {
    id: 'profile-demo-amina',
    name: 'Amina Mahamat',
    email: 'amina.mahamat@exemple.td',
    passwordHash: 'demo_hashed_local',
    category: 'lyceen',
    country: 'Tchad',
    studyLevel: 'Terminale (Baccalauréat)',
    examId: 'bac-scientifique',
    selectedSubjectIds: ['maths', 'physique', 'svt', 'philo'],
    examDate: formatIsoDate(examDate),
    currentLevel: 'intermediaire',
    dailyMinutes: 45,
    restDays: [0], // Dimanche
    targetScore: 75,
    plan: 'gratuit',
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    onboardingCompleted: true,
  };

  const past1 = new Date(Date.now() - 3 * 86400000).toISOString();
  const past2 = new Date(Date.now() - 1 * 86400000).toISOString();

  const initialSessions: SessionRecord[] = [
    {
      id: 'sess-demo-1',
      mode: 'rapide',
      title: 'Révision rapide — Mathématiques (Second degré)',
      subjectId: 'maths',
      startedAt: past1,
      completedAt: past1,
      totalTimeSeconds: 235,
      scorePercent: 50,
      correctCount: 2,
      totalCount: 4,
      answers: [
        { questionId: 'q-m-1', selectedIndex: 0, isCorrect: true, timeSpentSeconds: 52, modifiedCount: 0, flaggedForReview: false, skipped: false },
        { questionId: 'q-m-2', selectedIndex: 1, isCorrect: false, timeSpentSeconds: 78, modifiedCount: 1, flaggedForReview: true, skipped: false },
        { questionId: 'q-m-3', selectedIndex: 1, isCorrect: false, timeSpentSeconds: 65, modifiedCount: 0, flaggedForReview: true, skipped: false },
        { questionId: 'q-m-4', selectedIndex: 1, isCorrect: true, timeSpentSeconds: 40, modifiedCount: 0, flaggedForReview: false, skipped: false },
      ],
      synced: true,
    },
    {
      id: 'sess-demo-2',
      mode: 'examen_blanc',
      title: 'Baccalauréat Physique-Chimie — Dipôle RC & Mécanique',
      annaleId: 'annale-bac-phys-2024',
      subjectId: 'physique',
      startedAt: past2,
      completedAt: past2,
      durationLimitSeconds: 900,
      totalTimeSeconds: 310,
      remainingSeconds: 590,
      scorePercent: 75,
      correctCount: 3,
      totalCount: 4,
      answers: [
        { questionId: 'q-p-1', selectedIndex: 0, isCorrect: true, timeSpentSeconds: 70, modifiedCount: 0, flaggedForReview: false, skipped: false },
        { questionId: 'q-p-2', selectedIndex: 1, isCorrect: false, timeSpentSeconds: 95, modifiedCount: 1, flaggedForReview: true, skipped: false },
        { questionId: 'q-p-3', selectedIndex: 0, isCorrect: true, timeSpentSeconds: 85, modifiedCount: 0, flaggedForReview: false, skipped: false },
        { questionId: 'q-p-4', selectedIndex: 0, isCorrect: true, timeSpentSeconds: 60, modifiedCount: 0, flaggedForReview: false, skipped: false },
      ],
      synced: true,
    },
  ];

  const downloadedItems: Record<string, DownloadedItem> = {
    'subject:maths': {
      id: 'subject:maths',
      type: 'subject',
      title: 'Pack complet Mathématiques',
      subjectId: 'maths',
      sizeKb: 680,
      downloadedAt: past1,
      version: 1,
    },
    'annale:annale-bac-maths-2024': {
      id: 'annale:annale-bac-maths-2024',
      type: 'annale',
      title: 'Baccalauréat Scientifique — Mathématiques (Série D & C)',
      subjectId: 'maths',
      sizeKb: 245,
      downloadedAt: past1,
      version: 1,
    },
    'annale:annale-bac-phys-2024': {
      id: 'annale:annale-bac-phys-2024',
      type: 'annale',
      title: 'Baccalauréat Physique-Chimie — Dipôle RC & Mécanique',
      subjectId: 'physique',
      sizeKb: 210,
      downloadedAt: past2,
      version: 1,
    },
    'fiche:fiche-maths-second-degre': {
      id: 'fiche:fiche-maths-second-degre',
      type: 'fiche',
      title: 'Équations et fonctions du second degré',
      subjectId: 'maths',
      sizeKb: 64,
      downloadedAt: past1,
      version: 1,
    },
    'fiche:fiche-phys-rc': {
      id: 'fiche:fiche-phys-rc',
      type: 'fiche',
      title: 'Dipôle RC — Charge et décharge',
      subjectId: 'physique',
      sizeKb: 68,
      downloadedAt: past2,
      version: 1,
    },
    'course:course-maths-second-degre': {
      id: 'course:course-maths-second-degre',
      type: 'course',
      title: 'Maîtriser les équations du second degré',
      subjectId: 'maths',
      sizeKb: 145,
      downloadedAt: past1,
      version: 1,
    },
  };

  const studyPlan = generateAdaptiveStudyPlan(
    demoProfile,
    SUBJECTS,
    { maths: 50, physique: 75 },
    3
  );

  return {
    profiles: [demoProfile],
    activeProfileId: demoProfile.id,
    downloadedItems,
    sessions: initialSessions,
    inProgressSession: null,
    flashcardProgress: {},
    favorites: {
      annales: ['annale-bac-maths-2024'],
      fiches: ['fiche-maths-second-degre', 'fiche-phys-rc'],
      courses: ['course-maths-second-degre'],
      questions: ['q-m-2', 'q-p-2'],
    },
    notes: [
      {
        id: 'note-demo-1',
        targetType: 'fiche',
        targetId: 'fiche-maths-second-degre',
        targetTitle: 'Équations et fonctions du second degré',
        subjectId: 'maths',
        content: 'Penser à vérifier les signes de b et c avant de calculer Δ = b² − 4ac. Ne pas oublier le facteur a dans a(x − x₁)(x − x₂).',
        createdAt: past1,
        updatedAt: past1,
      },
      {
        id: 'note-demo-2',
        targetType: 'question',
        targetId: 'q-p-2',
        targetTitle: 'Charge condensateur à t = τ',
        subjectId: 'physique',
        content: 'Charge à t = τ → 63% de E. Décharge à t = τ → 37% de E. Ne plus inverser !',
        createdAt: past2,
        updatedAt: past2,
      },
    ],
    highlights: [
      {
        id: 'hl-demo-1',
        targetType: 'fiche',
        targetId: 'fiche-maths-second-degre',
        text: 'Le trinôme est du signe de a à l’extérieur des racines et du signe de (−a) entre les racines.',
        color: 'yellow',
        createdAt: past1,
      },
    ],
    completedCourseIds: ['course-maths-second-degre'],
    studyPlan,
    errorReports: [],
    syncQueue: [],
    lastSyncAt: past2,
    simulatedOffline: false,
    simulateSyncError: false,
    dailyChallengeCompletedDate: null,
    streakDays: 4,
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
    ],
    accessibility: DEFAULT_ACCESSIBILITY,
    privacy: DEFAULT_PRIVACY,
  };
}

function createEmptyInitialState(): AppState {
  const demo = createDemoState();
  return {
    ...demo,
    activeProfileId: null, // Start on Welcome screen so user can either Sign up OR 1-click launch Demo!
  };
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
  launchEnamDemoScenario: () => void;

  // Network & Sync
  isOnline: boolean;
  syncStatus: SyncStatus;
  downloadingIds: Record<string, number>; // key -> percent 0..100
  toggleSimulatedOffline: () => void;
  toggleSimulateSyncError: () => void;
  syncNow: () => Promise<void>;

  // Auth & Profile
  loginDemo: (examId?: string) => void;
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
  const [screen, setScreen] = useState<ScreenId>('welcome');
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

  // Load persisted state from IndexedDB on mount
  useEffect(() => {
    let mounted = true;
    loadPersistedState().then((saved) => {
      if (!mounted) return;
      if (saved) {
        const defaults = createEmptyInitialState();
        setState({
          ...defaults,
          ...saved,
          customFlashcards: saved.customFlashcards ?? [],
          diagnosticResult: saved.diagnosticResult ?? null,
          studyGroups: saved.studyGroups?.length ? saved.studyGroups : defaults.studyGroups,
          fatigueLevel: saved.fatigueLevel ?? 'normal',
          planMode: saved.planMode ?? 'standard',
        });
        if (saved.activeProfileId) {
          const prof = saved.profiles.find((p) => p.id === saved.activeProfileId);
          if (prof) {
            setScreen(prof.onboardingCompleted ? 'dashboard' : 'onboarding-exam');
          }
        }
      }
      setHydrated(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Persist to IndexedDB whenever state changes (debounced 250ms)
  useEffect(() => {
    if (!hydrated) return;
    if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
    saveTimerRef.current = window.setTimeout(() => {
      savePersistedState(state);
    }, 250);
  }, [state, hydrated]);

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

  const activeProfile = useMemo(
    () => state.profiles.find((p) => p.id === state.activeProfileId) ?? null,
    [state.profiles, state.activeProfileId]
  );

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

  const syncNow = useCallback(async () => {
    if (!isOnline) {
      notify('Impossible de synchroniser en mode hors ligne. Tes données restent sécurisées sur l’appareil.', 'warning');
      return;
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
        return {
          ...prev,
          syncQueue: [],
          sessions: prev.sessions.map((s) => ({ ...s, synced: true })),
          customQuestions: [...newQs, ...prev.customQuestions],
          customFiches: [...newFs, ...prev.customFiches],
          lastSyncAt: new Date().toISOString(),
        };
      });
      setSyncingNow(false);
      notify(
        `Synchronisé avec Supabase Cloud (${result.pushedCounts.sessions} sessions, ${result.pushedCounts.notes} notes sauvegardées).`,
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

  const loginDemo = useCallback(
    (examId?: string) => {
      const demo = createDemoState();
      if (examId) {
        const track = EXAMS.find((e) => e.id === examId);
        if (track && demo.profiles[0]) {
          demo.profiles[0].examId = track.id;
          demo.profiles[0].selectedSubjectIds = track.subjectIds;
          demo.studyPlan = generateAdaptiveStudyPlan(
            demo.profiles[0],
            SUBJECTS,
            { maths: 50, physique: 75 },
            3
          );
        }
      }
      setState((prev) => {
        const existingDemo = prev.profiles.find((p) => p.id === demo.profiles[0].id);
        if (existingDemo) {
          return {
            ...prev,
            activeProfileId: existingDemo.id,
          };
        }
        return demo;
      });
      setScreen('dashboard');
      notify('Bienvenue sur Réussite Offline ! Tes contenus de démonstration sont prêts hors ligne.', 'success');
    },
    [notify]
  );

  const registerAccount = useCallback(
    async (input: { name: string; email: string; password: string; category: UserCategory }) => {
      const trimmedEmail = input.email.trim().toLowerCase();
      if (!input.name.trim() || !trimmedEmail || input.password.length < 4) {
        return { ok: false, error: 'Remplis ton nom, un e-mail valide et un mot de passe (4 caractères min.).' };
      }
      const existing = state.profiles.find((p) => p.email.toLowerCase() === trimmedEmail);
      if (existing) {
        return { ok: false, error: 'Un compte existe déjà avec cette adresse e-mail sur cet appareil.' };
      }
      const passwordHash = await hashPassword(input.password);
      const examDate = new Date();
      examDate.setDate(examDate.getDate() + 60);

      const newProfile: UserProfile = {
        id: `profile-${Date.now()}`,
        name: input.name.trim(),
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
        plan: 'gratuit',
        createdAt: new Date().toISOString(),
        onboardingCompleted: false,
      };

      setState((prev) => ({
        ...prev,
        profiles: [...prev.profiles, newProfile],
        activeProfileId: newProfile.id,
      }));
      enqueueSync('register', `Création du profil ${newProfile.name}`, 3);
      setScreen('onboarding-exam');
      notify(`Compte créé pour ${newProfile.name} (stockage local sécurisé).`, 'success');
      return { ok: true };
    },
    [state.profiles, enqueueSync, notify]
  );

  const loginAccount = useCallback(
    async (email: string, password: string) => {
      const trimmedEmail = email.trim().toLowerCase();
      const found = state.profiles.find((p) => p.email.toLowerCase() === trimmedEmail);
      if (!found) {
        return { ok: false, error: 'Aucun compte local trouvé avec cet e-mail.' };
      }
      const hashed = await hashPassword(password);
      if (found.passwordHash !== hashed && found.passwordHash !== 'demo_hashed_local') {
        return { ok: false, error: 'Mot de passe incorrect.' };
      }
      setState((prev) => ({ ...prev, activeProfileId: found.id }));
      setScreen(found.onboardingCompleted ? 'dashboard' : 'onboarding-exam');
      notify(`Bon retour, ${found.name} !`, 'success');
      return { ok: true };
    },
    [state.profiles, notify]
  );

  const switchProfile = useCallback(
    (profileId: string) => {
      const target = state.profiles.find((p) => p.id === profileId);
      if (!target) return;
      setState((prev) => ({ ...prev, activeProfileId: profileId }));
      setScreen(target.onboardingCompleted ? 'dashboard' : 'onboarding-exam');
      notify(`Profil actif : ${target.name}`, 'info');
    },
    [state.profiles, notify]
  );

  const logout = useCallback(() => {
    setState((prev) => ({ ...prev, activeProfileId: null }));
    setScreen('welcome');
    notify('Session fermée. Tes fichiers hors ligne restent conservés sur cet appareil.', 'info');
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
      const now = new Date().toISOString();
      const created: PersonalNote = {
        ...note,
        id: `note-${Date.now()}`,
        createdAt: now,
        updatedAt: now,
      };
      setState((prev) => ({ ...prev, notes: [created, ...prev.notes] }));
      enqueueSync('note_save', `Note personnelle : ${note.targetTitle}`, 2);
      notify('Note enregistrée hors ligne.', 'success');
    },
    [enqueueSync, notify]
  );

  const updateNote = useCallback(
    (id: string, content: string) => {
      setState((prev) => ({
        ...prev,
        notes: prev.notes.map((n) =>
          n.id === id ? { ...n, content, updatedAt: new Date().toISOString() } : n
        ),
      }));
      enqueueSync('note_update', 'Modification d’une note personnelle', 2);
    },
    [enqueueSync]
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
      setState((prev) => ({
        ...prev,
        errorReports: [
          {
            id: `err-${Date.now()}`,
            questionId,
            questionPrompt,
            reason,
            createdAt: new Date().toISOString(),
            status: 'en_attente',
          },
          ...prev.errorReports,
        ],
      }));
      enqueueSync('error_report', `Signalement sur une question`, 2);
      notify('Signalement enregistré ! Il sera transmis à l’équipe pédagogique dès la prochaine synchronisation.', 'success');
    },
    [enqueueSync, notify]
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
      const code = `${input.examId.slice(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const group: StudyGroup = {
        id: `grp-${Date.now()}`,
        name: input.name.trim(),
        examId: input.examId,
        inviteCode: code,
        membersCount: 1,
        description: input.description.trim() || 'Groupe privé de révision et d’entraide.',
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
    [activeProfile, enqueueSync, notify]
  );

  const addStudyGroupMessage = useCallback(
    (groupId: string, text: string) => {
      if (!text.trim()) return;
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
                    text: text.trim(),
                    createdAt: new Date().toISOString(),
                  },
                ],
              }
            : g
        ),
      }));
      enqueueSync('group_message', 'Message pédagogique ajouté au groupe', 1);
    },
    [activeProfile, enqueueSync]
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

  const launchEnamDemoScenario = useCallback(() => {
    const examDate = new Date();
    examDate.setDate(examDate.getDate() + 35);
    const enamProfile: UserProfile = {
      id: 'profile-demo-moussa-enam',
      name: 'Moussa Oumar',
      email: 'moussa.enam@exemple.td',
      passwordHash: 'demo_hashed_local',
      category: 'concours_admin',
      country: 'Tchad',
      studyLevel: 'Candidat libre / Concours administratif',
      examId: 'concours-admin',
      selectedSubjectIds: ['droit', 'economie', 'culture_gen', 'histoire_geo'],
      examDate: formatIsoDate(examDate),
      currentLevel: 'intermediaire',
      dailyMinutes: 45,
      restDays: [0],
      targetScore: 80,
      plan: 'gratuit',
      createdAt: new Date().toISOString(),
      onboardingCompleted: true,
    };

    const plan = generateAdaptiveStudyPlan(
      enamProfile,
      SUBJECTS,
      { droit: 50, economie: 65, culture_gen: 75, histoire_geo: 60 },
      2
    );

    setState((prev) => {
      const exists = prev.profiles.some((p) => p.id === enamProfile.id);
      return {
        ...prev,
        profiles: exists ? prev.profiles : [...prev.profiles, enamProfile],
        activeProfileId: enamProfile.id,
        studyPlan: plan,
        downloadedItems: {
          ...prev.downloadedItems,
          'subject:droit': {
            id: 'droit',
            type: 'subject',
            title: 'Pack complet Droit Constitutionnel & Administratif',
            subjectId: 'droit',
            sizeKb: 540,
            downloadedAt: new Date().toISOString(),
            version: 1,
          },
          'annale:ann-enam-hg-2024': {
            id: 'ann-enam-hg-2024',
            type: 'annale',
            title: 'Concours ENAM & Douanes 2024 — Histoire Contemporaine & Intégration Africaine',
            subjectId: 'histoire_geo',
            sizeKb: 172,
            downloadedAt: new Date().toISOString(),
            version: 1,
          },
        },
      };
    });
    setScreen('diagnostic');
    notify(
      'Scénario ENAM activé pour Moussa Oumar : commence par ton test de positionnement adaptatif !',
      'success'
    );
  }, [notify]);

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
    launchEnamDemoScenario,
    isOnline,
    syncStatus,
    downloadingIds,
    toggleSimulatedOffline,
    toggleSimulateSyncError,
    syncNow,
    loginDemo,
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

export { CHAPTERS, COURSES, EXAMS, FLASHCARDS, SUBJECTS, ANNALES };
