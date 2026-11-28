import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Brain,
  CheckCircle2,
  Clock,
  Flag,
  GraduationCap,
  Lock,
  Pause,
  Play,
  ShieldAlert,
  StickyNote,
  Target,
  Unlock,
  XCircle,
  Zap,
} from 'lucide-react';
import { ANNALES, CHAPTERS, SUBJECTS, useApp } from '../context/AppContext';
import { Difficulty, QuestionAnswerRecord } from '../types';

function formatTimer(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export const PracticeScreen: React.FC = () => {
  const {
    state,
    screen,
    navigate,
    allQuestions,
    startPractice,
    updateInProgressSession,
    discardInProgressSession,
    completeSession,
    addNote,
    reportQuestionError,
    getMistakeQuestionIds,
    notify,
  } = useApp();

  // Launcher configuration state (when no active session is running)
  const [launcherMode, setLauncherMode] = useState<'rapide' | 'libre' | 'examen_blanc' | 'defi_quotidien'>(
    screen === 'mock-exam' ? 'examen_blanc' : 'rapide'
  );
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [questionCount, setQuestionCount] = useState<5 | 10 | 20>(5);
  const [difficulty, setDifficulty] = useState<'all' | Difficulty>('all');
  const [timerMode, setTimerMode] = useState<'countdown' | 'progressive'>('countdown');
  const [durationMinutes, setDurationMinutes] = useState(15);
  const [allowBack, setAllowBack] = useState(true);
  const [focusLock, setFocusLock] = useState(screen === 'mock-exam');
  const [penaltyPerWrong, setPenaltyPerWrong] = useState<0 | 0.25 | 0.5>(0);
  const [officialSimulation, setOfficialSimulation] = useState(false);

  // Active session UI state
  const [paused, setPaused] = useState(false);
  const [showNoteBox, setShowNoteBox] = useState(false);
  const [noteDraft, setNoteDraft] = useState('');
  const [showReportBox, setShowReportBox] = useState(false);
  const [reportDraft, setReportDraft] = useState('');
  const [alertBanner, setAlertBanner] = useState<string | null>(null);
  const alertedMarksRef = useRef<Set<string>>(new Set());

  const session = state.inProgressSession;
  const isMockExam = session?.mode === 'examen_blanc';

  useEffect(() => {
    if (!session) {
      setLauncherMode(screen === 'mock-exam' ? 'examen_blanc' : 'rapide');
      setFocusLock(screen === 'mock-exam');
    }
  }, [screen, session]);

  // Real offline timer tick (1s) tracking total elapsed + per-question time + alerts (halfway, 10/5/1 min)
  useEffect(() => {
    if (!session || paused) return;
    const interval = window.setInterval(() => {
      updateInProgressSession((prev) => {
        const qId = prev.questionIds[prev.currentIndex];
        const prevAns = prev.answers[qId] ?? {
          selectedIndex: null,
          timeSpentSeconds: 0,
          modifiedCount: 0,
          flaggedForReview: false,
        };
        const nextElapsed = prev.elapsedSeconds + 1;

        // Check countdown alerts
        if (prev.timerMode === 'countdown' && prev.durationLimitSeconds) {
          const remaining = prev.durationLimitSeconds - nextElapsed;
          const half = Math.floor(prev.durationLimitSeconds / 2);
          if (remaining === half && !alertedMarksRef.current.has('half')) {
            alertedMarksRef.current.add('half');
            setAlertBanner('Mi-parcours atteint ! Vérifie ton rythme.');
          } else if (remaining === 600 && !alertedMarksRef.current.has('10m')) {
            alertedMarksRef.current.add('10m');
            setAlertBanner('Il reste 10 minutes avant la fin de l’épreuve.');
          } else if (remaining === 300 && !alertedMarksRef.current.has('5m')) {
            alertedMarksRef.current.add('5m');
            setAlertBanner('Il reste 5 minutes — pense à vérifier tes questions marquées.');
          } else if (remaining === 60 && !alertedMarksRef.current.has('1m')) {
            alertedMarksRef.current.add('1m');
            setAlertBanner('Dernière minute ! Finalise tes dernières réponses.');
          }
        }

        return {
          ...prev,
          elapsedSeconds: nextElapsed,
          answers: {
            ...prev.answers,
            [qId]: {
              ...prevAns,
              timeSpentSeconds: prevAns.timeSpentSeconds + 1,
            },
          },
        };
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [session?.id, paused, updateInProgressSession]);

  // Auto-submit if countdown reaches 0
  useEffect(() => {
    if (
      session &&
      session.timerMode === 'countdown' &&
      session.durationLimitSeconds &&
      session.elapsedSeconds >= session.durationLimitSeconds
    ) {
      handleFinishSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.elapsedSeconds]);

  const handleFinishSession = () => {
    if (!session) return;
    const records: QuestionAnswerRecord[] = session.questionIds.map((qId) => {
      const q = allQuestions.find((qq) => qq.id === qId);
      const ans = session.answers[qId];
      const selectedIndex = ans?.selectedIndex ?? null;
      const isCorrect = q ? selectedIndex === q.correctIndex : false;
      return {
        questionId: qId,
        selectedIndex,
        isCorrect,
        timeSpentSeconds: ans?.timeSpentSeconds ?? 0,
        modifiedCount: ans?.modifiedCount ?? 0,
        flaggedForReview: ans?.flaggedForReview ?? false,
        skipped: selectedIndex === null,
      };
    });
    const correctCount = records.filter((r) => r.isCorrect).length;
    const wrongCount = records.filter((r) => !r.isCorrect && !r.skipped).length;
    const scorePercent = Math.round((correctCount / Math.max(1, records.length)) * 100);
    const penalty = session.penaltyPerWrong ?? 0;
    const rawPenalized = Math.max(0, correctCount - wrongCount * penalty);
    const penalizedScorePercent =
      penalty > 0 ? Math.round((rawPenalized / Math.max(1, records.length)) * 100) : undefined;
    const remainingSeconds =
      session.timerMode === 'countdown' && session.durationLimitSeconds
        ? Math.max(0, session.durationLimitSeconds - session.elapsedSeconds)
        : undefined;

    completeSession({
      id: `sess-${Date.now()}`,
      mode: session.mode,
      title: session.title,
      annaleId: session.annaleId,
      subjectId: session.subjectId,
      startedAt: session.startedAt,
      completedAt: new Date().toISOString(),
      durationLimitSeconds: session.durationLimitSeconds,
      totalTimeSeconds: session.elapsedSeconds,
      remainingSeconds,
      scorePercent,
      penalizedScorePercent,
      penaltyPerWrong: penalty > 0 ? penalty : undefined,
      officialSimulation: session.officialSimulation,
      correctCount,
      totalCount: records.length,
      answers: records,
      allowBackNavigation: session.allowBackNavigation,
    });
  };

  // ==================== LAUNCHER VIEW ====================
  if (!session) {
    const filteredChapters = CHAPTERS.filter(
      (c) => selectedSubject === 'all' || c.subjectId === selectedSubject
    );
    const matchingQuestions = allQuestions.filter((q) => {
      if (selectedSubject !== 'all' && q.subjectId !== selectedSubject) return false;
      if (selectedChapter !== 'all' && q.chapterId !== selectedChapter) return false;
      if (difficulty !== 'all' && q.difficulty !== difficulty) return false;
      return true;
    });

    const handleStartConfigured = () => {
      const pool = matchingQuestions.length > 0 ? matchingQuestions : allQuestions;
      const count = launcherMode === 'defi_quotidien' ? 5 : Math.min(questionCount, pool.length);
      const chosenIds = pool.slice(0, count).map((q) => q.id);
      const subjName =
        selectedSubject === 'all'
          ? 'Multi-matières'
          : SUBJECTS.find((s) => s.id === selectedSubject)?.name ?? '';

      alertedMarksRef.current.clear();
      setAlertBanner(null);
      setPaused(false);

      startPractice({
        mode: launcherMode,
        title:
          launcherMode === 'examen_blanc'
            ? `Examen blanc chronométré — ${subjName}`
            : launcherMode === 'libre'
            ? `Entraînement libre — ${subjName}`
            : launcherMode === 'defi_quotidien'
            ? 'Défi quotidien — 5 questions'
            : `Révision rapide (${count} q.) — ${subjName}`,
        subjectId: selectedSubject === 'all' ? undefined : selectedSubject,
        questionIds: chosenIds,
        durationMinutes: timerMode === 'countdown' ? durationMinutes : undefined,
        timerMode,
        allowBackNavigation: launcherMode === 'examen_blanc' ? allowBack : true,
        focusLock: officialSimulation ? true : focusLock,
        immediateFeedback: launcherMode === 'libre',
        penaltyPerWrong: launcherMode === 'examen_blanc' ? penaltyPerWrong : 0,
        officialSimulation: launcherMode === 'examen_blanc' && officialSimulation,
      });
    };

    const mistakeIds = getMistakeQuestionIds();

    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {screen === 'mock-exam' ? 'Examen blanc chronométré' : 'Modes d’entraînement hors ligne'}
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Configure ta session et ton chronomètre : tout fonctionne sans connexion Internet et sauvegarde automatiquement en cas d’interruption.
          </p>
        </div>

        {/* New v16 Active Method complement banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4 dark:border-indigo-900 dark:bg-indigo-950/40">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-indigo-950 dark:text-indigo-100">
                Envie de travailler autrement qu’en QCM ?
              </p>
              <p className="text-xs text-indigo-800/80 dark:text-indigo-300">
                Alterne avec la Méthode Active 4-en-1 : Feynman, Texte à trous, Séquençage et Rédaction /20 (100 % hors ligne).
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('active-method')}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-extrabold text-white hover:bg-indigo-700"
          >
            <Brain className="h-3.5 w-3.5" />
            Ouvrir Méthode Active
          </button>
        </div>

        {/* Mode Selector Cards */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              id: 'rapide' as const,
              title: 'Révision rapide',
              desc: '5, 10 ou 20 questions ciblées par chapitre',
              icon: Zap,
            },
            {
              id: 'examen_blanc' as const,
              title: 'Examen blanc',
              desc: 'Conditions réelles, chrono strict, correction à la fin',
              icon: GraduationCap,
            },
            {
              id: 'libre' as const,
              title: 'Entraînement libre',
              desc: 'Correction immédiate, modification & notes',
              icon: Play,
            },
            {
              id: 'defi_quotidien' as const,
              title: 'Défi quotidien',
              desc: '5 questions express pour la régularité',
              icon: Target,
            },
          ].map((m) => {
            const Icon = m.icon;
            const active = launcherMode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setLauncherMode(m.id);
                  if (m.id === 'examen_blanc') {
                    setTimerMode('countdown');
                    setFocusLock(true);
                  } else {
                    setFocusLock(false);
                  }
                }}
                className={`hc-card rounded-2xl border-2 p-4 text-left transition ${
                  active
                    ? 'border-blue-600 bg-blue-50/70 dark:border-blue-400 dark:bg-blue-950/50'
                    : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? 'text-blue-700 dark:text-blue-300' : 'text-slate-500'}`} />
                <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">{m.title}</p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{m.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Configuration Form */}
        <div className="hc-card space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Paramètres de la session & du chronomètre
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300">
                Matière
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  setSelectedChapter('all');
                }}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="all">Toutes les matières</option>
                {SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300">
                Chapitre
              </label>
              <select
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="all">Tous les chapitres</option>
                {filteredChapters.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300">
                Difficulté
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as 'all' | Difficulty)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="all">Tous niveaux</option>
                <option value="facile">Facile</option>
                <option value="moyen">Moyen</option>
                <option value="difficile">Difficile</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Nombre de questions
              </p>
              <div className="mt-1.5 flex gap-2">
                {([5, 10, 20] as const).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setQuestionCount(n)}
                    className={`flex-1 rounded-xl border py-2 text-xs font-bold ${
                      questionCount === n
                        ? 'border-blue-600 bg-blue-700 text-white'
                        : 'border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {n} q.
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Type de chronomètre
              </p>
              <div className="mt-1.5 flex gap-2">
                <button
                  type="button"
                  onClick={() => setTimerMode('countdown')}
                  className={`flex-1 rounded-xl border py-2 text-xs font-bold ${
                    timerMode === 'countdown'
                      ? 'border-blue-600 bg-blue-700 text-white'
                      : 'border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                  }`}
                >
                  Compte à rebours
                </button>
                <button
                  type="button"
                  onClick={() => setTimerMode('progressive')}
                  className={`flex-1 rounded-xl border py-2 text-xs font-bold ${
                    timerMode === 'progressive'
                      ? 'border-blue-600 bg-blue-700 text-white'
                      : 'border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                  }`}
                >
                  Progressif
                </button>
              </div>
            </div>

            {timerMode === 'countdown' && (
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300">
                  Durée imposée : {durationMinutes} min
                </label>
                <input
                  type="range"
                  min={5}
                  max={60}
                  step={5}
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="mt-3 w-full accent-blue-700"
                />
              </div>
            )}
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4 text-xs dark:border-slate-800">
            {launcherMode === 'examen_blanc' && (
              <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3.5 dark:border-blue-900 dark:bg-blue-950/30">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="inline-flex cursor-pointer items-center gap-2 font-extrabold text-blue-950 dark:text-blue-100">
                    <input
                      type="checkbox"
                      checked={officialSimulation}
                      onChange={(e) => {
                        setOfficialSimulation(e.target.checked);
                        if (e.target.checked) {
                          setFocusLock(true);
                          setTimerMode('countdown');
                        }
                      }}
                      className="accent-blue-700"
                    />
                    Mode Simulation Officielle (chronomètre non interruptible, sans indice, conditions concours)
                  </label>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-600 dark:text-slate-300">Pénalité mauvaise réponse :</span>
                    {([0, 0.25, 0.5] as const).map((pen) => (
                      <button
                        key={pen}
                        type="button"
                        onClick={() => setPenaltyPerWrong(pen)}
                        className={`rounded-lg px-2 py-1 text-[11px] font-bold ${
                          penaltyPerWrong === pen
                            ? 'bg-blue-700 text-white'
                            : 'bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {pen === 0 ? 'Aucune' : `−${pen} pt`}
                      </button>
                    ))}
                  </div>
                </div>
                {officialSimulation && (
                  <p className="mt-2 text-[11px] text-blue-900 dark:text-blue-200">
                    <strong>Briefing officiel :</strong> durée {durationMinutes} min · {questionCount} questions · aucun document ni indice autorisé · pause désactivée · correction différée après remise définitive.
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              {launcherMode === 'examen_blanc' && (
                <label className="inline-flex cursor-pointer items-center gap-2 font-semibold">
                  <input
                    type="checkbox"
                    checked={allowBack}
                    onChange={(e) => setAllowBack(e.target.checked)}
                    className="accent-blue-700"
                  />
                  Autoriser le retour en arrière entre questions
                </label>
              )}
              <label className="inline-flex cursor-pointer items-center gap-2 font-semibold">
                <input
                  type="checkbox"
                  checked={focusLock}
                  onChange={(e) => setFocusLock(e.target.checked)}
                  className="accent-blue-700"
                />
                Verrouillage des distractions (mode plein focus)
              </label>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span className="text-xs font-semibold text-slate-500">
              {matchingQuestions.length} question(s) disponible(s) hors ligne pour ces critères
            </span>
            <div className="flex flex-wrap gap-2">
              {mistakeIds.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    startPractice({
                      mode: 'erreurs',
                      title: `Révision ciblée de mes erreurs (${mistakeIds.length} q.)`,
                      questionIds: mistakeIds,
                      immediateFeedback: true,
                    })
                  }
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-amber-400 bg-amber-50 px-4 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-200"
                >
                  Réviser mes erreurs ({mistakeIds.length})
                </button>
              )}
              <button
                type="button"
                onClick={handleStartConfigured}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-blue-700 px-6 py-2.5 text-sm font-bold text-white shadow hover:bg-blue-800"
              >
                <Play className="h-4 w-4" />
                Démarrer la session hors ligne
              </button>
            </div>
          </div>
        </div>

        {/* Quick Mock Exam Presets from Annales */}
        {launcherMode === 'examen_blanc' && (
          <div className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Ou lancer directement une annale officielle en conditions d’examen blanc
            </h3>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {ANNALES.slice(0, 4).map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() =>
                    startPractice({
                      mode: 'examen_blanc',
                      title: a.title,
                      annaleId: a.id,
                      subjectId: a.subjectId,
                      questionIds: a.questionIds,
                      durationMinutes: a.durationMinutes,
                      timerMode: 'countdown',
                      allowBackNavigation: allowBack,
                      focusLock: true,
                    })
                  }
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-3 text-left hover:border-blue-400 dark:border-slate-700"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{a.title}</p>
                    <p className="text-[11px] text-slate-500">
                      {a.durationMinutes} min · {a.questionIds.length} questions · {a.year}
                    </p>
                  </div>
                  <Play className="h-4 w-4 shrink-0 text-blue-600" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==================== ACTIVE LIVE SESSION VIEW ====================
  const currentQId = session.questionIds[session.currentIndex];
  const question = allQuestions.find((q) => q.id === currentQId) ?? allQuestions[0];
  const currentAns = session.answers[question.id] ?? {
    selectedIndex: null,
    timeSpentSeconds: 0,
    modifiedCount: 0,
    flaggedForReview: false,
  };

  const remainingSeconds =
    session.timerMode === 'countdown' && session.durationLimitSeconds
      ? Math.max(0, session.durationLimitSeconds - session.elapsedSeconds)
      : null;

  const isLowTime = remainingSeconds !== null && remainingSeconds <= 60;
  const showImmediate = session.immediateFeedback && currentAns.selectedIndex !== null;

  const handleSelectOption = (optionIdx: number) => {
    if (paused) return;
    updateInProgressSession((prev) => {
      const existing = prev.answers[question.id] ?? {
        selectedIndex: null,
        timeSpentSeconds: 0,
        modifiedCount: 0,
        flaggedForReview: false,
      };
      const isChanging =
        existing.selectedIndex !== null && existing.selectedIndex !== optionIdx;
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [question.id]: {
            ...existing,
            selectedIndex: optionIdx,
            modifiedCount: existing.modifiedCount + (isChanging ? 1 : 0),
          },
        },
      };
    });
  };

  const handleToggleFlag = () => {
    updateInProgressSession((prev) => {
      const existing = prev.answers[question.id] ?? {
        selectedIndex: null,
        timeSpentSeconds: 0,
        modifiedCount: 0,
        flaggedForReview: false,
      };
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [question.id]: {
            ...existing,
            flaggedForReview: !existing.flaggedForReview,
          },
        },
      };
    });
  };

  const goToIndex = (target: number) => {
    if (target < 0 || target >= session.questionIds.length) return;
    if (!session.allowBackNavigation && target < session.currentIndex) {
      notify('Retour en arrière verrouillé pour cet examen blanc.', 'warning');
      return;
    }
    setShowNoteBox(false);
    setShowReportBox(false);
    updateInProgressSession((prev) => ({ ...prev, currentIndex: target }));
  };

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      {/* Sticky Timer & Control Header */}
      <div className="hc-card sticky top-2 z-20 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-md backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                {isMockExam ? 'EXAMEN BLANC' : session.mode.replace('_', ' ').toUpperCase()}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Question {session.currentIndex + 1} / {session.questionIds.length}
              </span>
            </div>
            <h1 className="mt-0.5 text-sm font-bold text-slate-900 sm:text-base dark:text-white">
              {session.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Timer Pill */}
            <div
              className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 font-mono text-sm font-extrabold ${
                isLowTime
                  ? 'border-red-400 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-200'
                  : 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200'
              }`}
              aria-label="Chronomètre de session"
            >
              <Clock className="h-4 w-4" />
              <span>
                {remainingSeconds !== null
                  ? formatTimer(remainingSeconds)
                  : formatTimer(session.elapsedSeconds)}
              </span>
              <span className="text-[11px] font-sans font-semibold opacity-75">
                (Q: {formatTimer(currentAns.timeSpentSeconds)})
              </span>
            </div>

            {!isMockExam && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="inline-flex h-10 items-center gap-1 rounded-xl border border-slate-300 px-3 text-xs font-bold dark:border-slate-700"
              >
                {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                {paused ? 'Reprendre' : 'Pause'}
              </button>
            )}

            {session.officialSimulation && (
              <span className="inline-flex items-center gap-1 rounded-xl bg-rose-100 px-2.5 py-1.5 text-[11px] font-extrabold text-rose-800 dark:bg-rose-950 dark:text-rose-200">
                <Lock className="h-3.5 w-3.5" />
                Simulation officielle
              </span>
            )}

            {!session.officialSimulation && (
              <button
                type="button"
                onClick={() =>
                  updateInProgressSession((p) => ({ ...p, focusLock: !p.focusLock }))
                }
                className="inline-flex h-10 items-center gap-1 rounded-xl border border-slate-300 px-2.5 text-xs font-bold dark:border-slate-700"
                title="Verrouillage des distractions"
              >
              {session.focusLock ? <Lock className="h-4 w-4 text-amber-600" /> : <Unlock className="h-4 w-4" />}
              <span className="hidden sm:inline">{session.focusLock ? 'Focus actif' : 'Focus'}</span>
            </button>
            )}

            <button
              type="button"
              onClick={discardInProgressSession}
              className="rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
            >
              Quitter
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-blue-700 transition-all"
            style={{
              width: `${((session.currentIndex + 1) / session.questionIds.length) * 100}%`,
            }}
          />
        </div>

        {alertBanner && (
          <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-amber-100 px-3.5 py-2 text-xs font-bold text-amber-950 dark:bg-amber-950 dark:text-amber-100">
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" />
              {alertBanner}
            </span>
            <button type="button" onClick={() => setAlertBanner(null)} className="underline">
              OK
            </button>
          </div>
        )}
      </div>

      {/* Question Card */}
      {paused ? (
        <div className="hc-card rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
          <Pause className="mx-auto h-10 w-10 text-blue-600" />
          <h2 className="mt-3 text-lg font-bold">Session en pause</h2>
          <p className="mt-1 text-sm text-slate-500">
            Ton avancement est enregistré hors ligne. Reprends quand tu es prêt.
          </p>
          <button
            type="button"
            onClick={() => setPaused(false)}
            className="mt-4 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-bold text-white"
          >
            Reprendre le chronomètre
          </button>
        </div>
      ) : (
        <div className="hc-card rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold text-blue-700 dark:text-blue-300">
              {SUBJECTS.find((s) => s.id === question.subjectId)?.name} · {question.notion}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="rounded-md bg-slate-100 px-2 py-0.5 capitalize font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {question.difficulty}
              </span>
              <button
                type="button"
                onClick={handleToggleFlag}
                className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 font-bold ${
                  currentAns.flaggedForReview
                    ? 'border-amber-400 bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
                    : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'
                }`}
              >
                <Bookmark className="h-3.5 w-3.5" />
                {currentAns.flaggedForReview ? 'Marquée à revoir' : 'Mettre de côté'}
              </button>
            </div>
          </div>

          <h2 className="mt-4 text-lg font-bold leading-relaxed text-slate-900 dark:text-white">
            {question.prompt}
          </h2>

          {/* Answer Options */}
          <div className="mt-5 space-y-3">
            {question.options.map((opt, idx) => {
              const selected = currentAns.selectedIndex === idx;
              const isCorrectOpt = idx === question.correctIndex;
              let style =
                'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/40 dark:border-slate-700 dark:bg-slate-800/70';
              if (showImmediate) {
                if (isCorrectOpt) {
                  style =
                    'border-emerald-500 bg-emerald-50 text-emerald-950 dark:border-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-100';
                } else if (selected && !isCorrectOpt) {
                  style =
                    'border-red-500 bg-red-50 text-red-950 dark:border-red-600 dark:bg-red-950/60 dark:text-red-100';
                }
              } else if (selected) {
                style =
                  'border-blue-600 bg-blue-50 ring-2 ring-blue-200 dark:border-blue-400 dark:bg-blue-950/60 dark:ring-blue-900';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  className={`flex min-h-[54px] w-full items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition ${style}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-current/25 text-xs font-extrabold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </span>
                  {showImmediate && isCorrectOpt && (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                  )}
                  {showImmediate && selected && !isCorrectOpt && (
                    <XCircle className="h-5 w-5 shrink-0 text-red-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Immediate Feedback (Mode Entraînement libre) */}
          {showImmediate && (
            <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs dark:border-emerald-900 dark:bg-emerald-950/40">
              <p className="font-extrabold text-emerald-900 dark:text-emerald-200">
                Correction immédiate (Officielle — {question.source})
              </p>
              <p className="mt-1 text-slate-800 dark:text-slate-200">{question.explanation}</p>
              <ol className="mt-2 list-decimal space-y-1 pl-4 text-slate-700 dark:text-slate-300">
                {question.steps.map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Free Training Tools: Personal Note & Report Error */}
          <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4 text-xs dark:border-slate-800">
            <button
              type="button"
              onClick={() => setShowNoteBox((v) => !v)}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
            >
              <StickyNote className="h-3.5 w-3.5" />
              Ajouter une note
            </button>
            <button
              type="button"
              onClick={() => setShowReportBox((v) => !v)}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
            >
              <Flag className="h-3.5 w-3.5" />
              Signaler une erreur
            </button>
          </div>

          {showNoteBox && (
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                placeholder="Ta note personnelle sur cette question..."
                className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
              />
              <button
                type="button"
                onClick={() => {
                  if (!noteDraft.trim()) return;
                  addNote({
                    targetType: 'question',
                    targetId: question.id,
                    targetTitle: question.notion,
                    subjectId: question.subjectId,
                    content: noteDraft.trim(),
                  });
                  setNoteDraft('');
                  setShowNoteBox(false);
                }}
                className="rounded-xl bg-blue-700 px-3 py-2 text-xs font-bold text-white"
              >
                Enregistrer
              </button>
            </div>
          )}

          {showReportBox && (
            <div className="mt-3 space-y-2 rounded-xl border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/40">
              <p className="flex items-center gap-1 text-xs font-bold text-amber-900 dark:text-amber-200">
                <ShieldAlert className="h-4 w-4" />
                Signaler une imprécision dans l’énoncé ou le corrigé
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={reportDraft}
                  onChange={(e) => setReportDraft(e.target.value)}
                  placeholder="Explique brièvement le problème repéré..."
                  className="flex-1 rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs dark:border-amber-800 dark:bg-slate-900"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!reportDraft.trim()) return;
                    reportQuestionError(question.id, question.prompt, reportDraft.trim());
                    setReportDraft('');
                    setShowReportBox(false);
                  }}
                  className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-bold text-white"
                >
                  Envoyer
                </button>
              </div>
            </div>
          )}

          {/* Question Navigator Dots */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {session.questionIds.map((id, i) => {
              const a = session.answers[id];
              const isCur = i === session.currentIndex;
              const answered = a?.selectedIndex !== null && a?.selectedIndex !== undefined;
              const flagged = a?.flaggedForReview;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => goToIndex(i)}
                  className={`h-8 w-8 rounded-lg text-xs font-bold transition ${
                    isCur
                      ? 'bg-blue-700 text-white'
                      : flagged
                      ? 'bg-amber-200 text-amber-950 dark:bg-amber-800 dark:text-amber-100'
                      : answered
                      ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          {/* Bottom Prev / Next / Finish */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => goToIndex(session.currentIndex - 1)}
              disabled={session.currentIndex === 0 || !session.allowBackNavigation}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Précédente
            </button>

            {session.currentIndex < session.questionIds.length - 1 ? (
              <button
                type="button"
                onClick={() => goToIndex(session.currentIndex + 1)}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-blue-700 px-5 py-2 text-xs font-bold text-white hover:bg-blue-800"
              >
                Question suivante
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishSession}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-emerald-600 px-6 py-2 text-xs font-bold text-white hover:bg-emerald-700"
              >
                <CheckCircle2 className="h-4 w-4" />
                Terminer & voir la correction détaillée
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
