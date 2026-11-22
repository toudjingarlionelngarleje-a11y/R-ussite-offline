import React, { useMemo } from 'react';
import {
  AlertCircle,
  ArrowRight,
  BookMarked,
  Calendar,
  CheckCircle2,
  Clock,
  DownloadCloud,
  Flame,
  GraduationCap,
  Layers,
  Play,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';
import { CHAPTERS, EXAMS, SUBJECTS, useApp } from '../context/AppContext';
import { daysUntil, formatIsoDate } from '../lib/planner';
import { isCardDue } from '../lib/sm2';
import { FLASHCARDS } from '../data';

export const DashboardScreen: React.FC = () => {
  const {
    state,
    activeProfile,
    allQuestions,
    allFiches,
    navigate,
    setSelectedSubjectId,
    setSelectedFicheId,
    startPractice,
    resumeInProgressSession,
    getMistakeQuestionIds,
  } = useApp();

  const exam = EXAMS.find((e) => e.id === activeProfile?.examId) ?? EXAMS[0];
  const countdown = activeProfile?.examDate ? daysUntil(activeProfile.examDate) : 45;
  const mistakeIds = getMistakeQuestionIds();
  const todayIso = formatIsoDate(new Date());
  const dailyDone = state.dailyChallengeCompletedDate === todayIso;

  const stats = useMemo(() => {
    const totalSessions = state.sessions.length;
    const totalSeconds = state.sessions.reduce((acc, s) => acc + s.totalTimeSeconds, 0);
    const totalQ = state.sessions.reduce((acc, s) => acc + s.totalCount, 0);
    const totalCorrect = state.sessions.reduce((acc, s) => acc + s.correctCount, 0);
    const avgRate = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;

    // Identify weakest chapter from answered questions
    const chapterStats: Record<string, { ok: number; tot: number }> = {};
    state.sessions.forEach((s) => {
      s.answers.forEach((a) => {
        const q = allQuestions.find((qq) => qq.id === a.questionId);
        if (!q) return;
        if (!chapterStats[q.chapterId]) chapterStats[q.chapterId] = { ok: 0, tot: 0 };
        chapterStats[q.chapterId].tot += 1;
        if (a.isCorrect) chapterStats[q.chapterId].ok += 1;
      });
    });

    let weakChapterId: string | null = null;
    let lowestRate = 101;
    Object.entries(chapterStats).forEach(([chId, val]) => {
      const rate = Math.round((val.ok / val.tot) * 100);
      if (rate < lowestRate) {
        lowestRate = rate;
        weakChapterId = chId;
      }
    });

    const weakChapter = CHAPTERS.find((c) => c.id === weakChapterId) ?? CHAPTERS[0];
    return { totalSessions, totalMinutes: Math.max(1, Math.round(totalSeconds / 60)), avgRate, weakChapter, lowestRate };
  }, [state.sessions, allQuestions]);

  const dueFlashcardsCount = useMemo(
    () => FLASHCARDS.filter((fc) => isCardDue(state.flashcardProgress[fc.id])).length,
    [state.flashcardProgress]
  );

  const nextPlan = state.studyPlan.find((p) => !p.completed && p.type !== 'pause');
  const downloadedCount = Object.keys(state.downloadedItems).length;
  const weakSubject = SUBJECTS.find((s) => s.id === stats.weakChapter.subjectId) ?? SUBJECTS[0];

  const handleLaunchDailyChallenge = () => {
    const subjFilter = activeProfile?.selectedSubjectIds ?? [];
    const pool = allQuestions.filter((q) => subjFilter.length === 0 || subjFilter.includes(q.subjectId));
    const chosen = (pool.length >= 5 ? pool : allQuestions).slice(0, 5).map((q) => q.id);
    startPractice({
      mode: 'defi_quotidien',
      title: 'Défi quotidien — 5 questions express',
      questionIds: chosen,
      durationMinutes: 6,
      timerMode: 'countdown',
      immediateFeedback: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Greeting & Exam Banner */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-800 via-blue-700 to-emerald-700 p-5 text-white shadow-md sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              <GraduationCap className="h-3.5 w-3.5" />
              {exam.name}
            </span>
            <h1 className="mt-2.5 text-2xl font-extrabold sm:text-3xl">
              Bonjour {activeProfile?.name.split(' ')[0] ?? 'Étudiant'} 👋
            </h1>
            <p className="mt-1 text-sm text-blue-100">
              Objectif : {activeProfile?.targetScore ?? 75} % · {downloadedCount} packs/contenus prêts hors ligne
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
            <div className="text-center">
              <p className="text-2xl font-extrabold leading-none">J-{countdown}</p>
              <p className="mt-1 text-[11px] font-medium text-blue-100">avant l’épreuve</p>
            </div>
            <div className="h-9 w-px bg-white/25" />
            <div className="text-center">
              <p className="flex items-center justify-center gap-1 text-2xl font-extrabold leading-none text-amber-300">
                <Flame className="h-5 w-5" />
                {state.streakDays}
              </p>
              <p className="mt-1 text-[11px] font-medium text-blue-100">jours réguliers</p>
            </div>
          </div>
        </div>

        {/* Resume interrupted session alert */}
        {state.inProgressSession && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-amber-400/20 px-4 py-3 ring-1 ring-amber-300/50">
            <div className="text-xs sm:text-sm">
              <span className="font-bold">Session interrompue sauvegardée hors ligne :</span>{' '}
              {state.inProgressSession.title} (Question {state.inProgressSession.currentIndex + 1}/
              {state.inProgressSession.questionIds.length})
            </div>
            <button
              type="button"
              onClick={resumeInProgressSession}
              className="inline-flex items-center gap-1.5 rounded-lg bg-amber-400 px-3.5 py-2 text-xs font-extrabold text-slate-950 hover:bg-amber-300"
            >
              <Play className="h-3.5 w-3.5" />
              Reprendre maintenant
            </button>
          </div>
        )}
      </section>

      {/* Pedagogical Recommendation Card (Section 11 example) */}
      <section className="hc-card rounded-2xl border border-blue-200 bg-blue-50/70 p-5 dark:border-blue-900 dark:bg-blue-950/35">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                Prochaine action recommandée
              </p>
              <p className="mt-1 text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-100">
                Tu progresses en <strong>{weakSubject.name}</strong>. Ton principal axe d’amélioration concerne{' '}
                <strong>« {stats.weakChapter.title} »</strong>
                {stats.lowestRate <= 100 ? ` (${stats.lowestRate} % de réussite)` : ''}. Nous te recommandons sa fiche synthétique suivie d’une courte série de questions ciblées.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setSelectedFicheId(stats.weakChapter.ficheId);
                navigate('fiche-viewer');
              }}
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800"
            >
              <BookMarked className="h-4 w-4" />
              Lire la fiche
            </button>
            <button
              type="button"
              onClick={() => {
                const qs = allQuestions
                  .filter((q) => q.chapterId === stats.weakChapter.id || q.subjectId === weakSubject.id)
                  .slice(0, 6)
                  .map((q) => q.id);
                startPractice({
                  mode: 'rapide',
                  title: `Ciblage — ${stats.weakChapter.title}`,
                  subjectId: weakSubject.id,
                  questionIds: qs,
                  immediateFeedback: true,
                });
              }}
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-blue-300 bg-white px-4 py-2 text-xs font-bold text-blue-800 hover:bg-blue-50 dark:border-blue-700 dark:bg-slate-900 dark:text-blue-200"
            >
              <Play className="h-3.5 w-3.5" />
              S’entraîner
            </button>
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          {
            label: 'Taux de réussite',
            value: `${stats.avgRate} %`,
            sub: `${stats.totalSessions} session(s) réalisée(s)`,
            icon: TrendingUp,
            tone: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300',
            onClick: () => navigate('stats'),
          },
          {
            label: 'Temps de révision',
            value: `${stats.totalMinutes} min`,
            sub: `Objectif : ${activeProfile?.dailyMinutes ?? 45} min/jour`,
            icon: Clock,
            tone: 'text-blue-700 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300',
            onClick: () => navigate('stats'),
          },
          {
            label: 'Questions à revoir',
            value: `${mistakeIds.length}`,
            sub: 'Erreurs & marquées difficiles',
            icon: AlertCircle,
            tone: 'text-amber-700 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300',
            onClick: () => navigate('mistakes'),
          },
          {
            label: 'Flashcards du jour',
            value: `${dueFlashcardsCount}`,
            sub: 'Répétition espacée hors ligne',
            icon: Layers,
            tone: 'text-purple-700 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-300',
            onClick: () => navigate('flashcards'),
          },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <button
              key={kpi.label}
              type="button"
              onClick={kpi.onClick}
              className="hc-card rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {kpi.label}
                </span>
                <span className={`rounded-lg p-1.5 ${kpi.tone}`}>
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                {kpi.value}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{kpi.sub}</p>
            </button>
          );
        })}
      </section>

      {/* Main 2-column grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Daily Challenge + Selected Subjects */}
        <div className="space-y-5 lg:col-span-7">
          {/* Daily Challenge */}
          <div className="hc-card flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-200 bg-amber-50/60 p-5 dark:border-amber-900 dark:bg-amber-950/30">
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-200/80 px-2.5 py-0.5 text-[11px] font-bold text-amber-950 dark:bg-amber-900 dark:text-amber-100">
                <Target className="h-3 w-3" />
                Défi quotidien (sans pression)
              </span>
              <h2 className="mt-1.5 text-base font-bold text-slate-900 dark:text-white">
                {dailyDone
                  ? 'Bravo ! Ton défi du jour est validé'
                  : '5 minutes pour entretenir ta régularité'}
              </h2>
              <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
                {dailyDone
                  ? 'La régularité compte plus que la vitesse. Tu peux rejouer librement ou lire une fiche.'
                  : 'Une courte série de 5 questions adaptées à ton examen, faisable dans les transports.'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLaunchDailyChallenge}
              className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold ${
                dailyDone
                  ? 'border border-emerald-400 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              {dailyDone ? <CheckCircle2 className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {dailyDone ? 'Rejouer le défi' : 'Lancer le défi (5 q.)'}
            </button>
          </div>

          {/* Mes matières */}
          <div className="hc-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Tes matières prioritaires
              </h2>
              <button
                type="button"
                onClick={() => navigate('library')}
                className="text-xs font-bold text-blue-700 hover:underline dark:text-blue-400"
              >
                Tout voir →
              </button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {SUBJECTS.filter(
                (s) =>
                  !activeProfile?.selectedSubjectIds.length ||
                  activeProfile.selectedSubjectIds.includes(s.id)
              ).map((subj) => {
                const isPackDown = Boolean(state.downloadedItems[`subject:${subj.id}`]);
                const fichesCount = allFiches.filter((f) => f.subjectId === subj.id).length;
                return (
                  <button
                    key={subj.id}
                    type="button"
                    onClick={() => {
                      setSelectedSubjectId(subj.id);
                      navigate('subject-detail');
                    }}
                    className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 p-3.5 text-left transition hover:border-blue-400 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/70"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: subj.color }}
                        />
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {subj.name}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {fichesCount} fiche(s) · {subj.sizeKb} Ko
                      </p>
                      <span
                        className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          isPackDown
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        <DownloadCloud className="h-3 w-3" />
                        {isPackDown ? 'Disponible hors ligne' : 'Téléchargeable'}
                      </span>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 text-slate-400" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Next Study Plan + Quick Offline Access */}
        <div className="space-y-5 lg:col-span-5">
          {/* Next scheduled session */}
          <div className="hc-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                <Calendar className="h-4 w-4 text-blue-600" />
                Prochaine session prévue
              </h2>
              <button
                type="button"
                onClick={() => navigate('planner')}
                className="text-xs font-bold text-blue-700 hover:underline dark:text-blue-400"
              >
                Planning →
              </button>
            </div>
            {nextPlan ? (
              <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-blue-700 dark:text-blue-300">
                    {nextPlan.dayLabel}
                  </span>
                  <span>{nextPlan.durationMinutes} min</span>
                </div>
                <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                  {nextPlan.title}
                </p>
                <button
                  type="button"
                  onClick={() => navigate('planner')}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:underline dark:text-blue-400"
                >
                  Ouvrir mon programme personnalisé →
                </button>
              </div>
            ) : (
              <p className="mt-3 text-xs text-slate-500">
                Toutes tes sessions planifiées sont terminées ! Bravo.
              </p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="hc-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Accès rapides hors ligne
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {[
                { label: 'Examen blanc', sub: 'Chrono réel', screen: 'mock-exam' as const },
                { label: 'Annales', sub: 'Banque filtrable', screen: 'annales' as const },
                { label: 'Téléchargements', sub: `${downloadedCount} prêts`, screen: 'downloads' as const },
                { label: 'Mes notes', sub: `${state.notes.length} note(s)`, screen: 'notes' as const },
              ].map((qa) => (
                <button
                  key={qa.label}
                  type="button"
                  onClick={() => navigate(qa.screen)}
                  className="rounded-xl border border-slate-200 p-3 text-left transition hover:border-blue-400 hover:bg-blue-50/40 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{qa.label}</p>
                  <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{qa.sub}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
