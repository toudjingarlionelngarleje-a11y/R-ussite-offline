import React, { useMemo } from 'react';
import {
  AlertCircle,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  GraduationCap,
  Info,
  TrendingUp,
} from 'lucide-react';
import { ScoreLineChart, SubjectProgressBars } from '../components/Charts';
import { CHAPTERS, SUBJECTS, useApp } from '../context/AppContext';

export const StatsScreen: React.FC = () => {
  const {
    state,
    activeProfile,
    allQuestions,
    setSelectedSessionId,
    navigate,
  } = useApp();

  const analytics = useMemo(() => {
    const sessions = state.sessions;
    const totalSessions = sessions.length;
    const totalMinutes = Math.round(
      sessions.reduce((acc, s) => acc + s.totalTimeSeconds, 0) / 60
    );
    const totalQ = sessions.reduce((acc, s) => acc + s.totalCount, 0);
    const totalOk = sessions.reduce((acc, s) => acc + s.correctCount, 0);
    const overallRate = totalQ > 0 ? Math.round((totalOk / totalQ) * 100) : 0;
    const mockExamsCompleted = sessions.filter((s) => s.mode === 'examen_blanc').length;

    const bySubj: Record<string, { ok: number; tot: number }> = {};
    const byChap: Record<string, { ok: number; tot: number }> = {};

    sessions.forEach((s) => {
      s.answers.forEach((a) => {
        const q = allQuestions.find((qq) => qq.id === a.questionId);
        if (!q) return;
        if (!bySubj[q.subjectId]) bySubj[q.subjectId] = { ok: 0, tot: 0 };
        bySubj[q.subjectId].tot += 1;
        if (a.isCorrect) bySubj[q.subjectId].ok += 1;

        if (!byChap[q.chapterId]) byChap[q.chapterId] = { ok: 0, tot: 0 };
        byChap[q.chapterId].tot += 1;
        if (a.isCorrect) byChap[q.chapterId].ok += 1;
      });
    });

    const subjectBars = Object.entries(bySubj)
      .map(([id, val]) => {
        const subj = SUBJECTS.find((s) => s.id === id);
        return {
          id,
          name: subj?.name ?? id,
          color: subj?.color ?? '#1D4ED8',
          score: Math.round((val.ok / val.tot) * 100),
          count: val.tot,
        };
      })
      .sort((a, b) => a.score - b.score);

    const masteredChapters = Object.entries(byChap)
      .filter(([, v]) => v.ok / v.tot >= 0.75)
      .map(([id, v]) => ({
        chapter: CHAPTERS.find((c) => c.id === id),
        rate: Math.round((v.ok / v.tot) * 100),
      }))
      .filter((x) => Boolean(x.chapter));

    const weakChapters = Object.entries(byChap)
      .filter(([, v]) => v.ok / v.tot < 0.75)
      .map(([id, v]) => ({
        chapter: CHAPTERS.find((c) => c.id === id),
        rate: Math.round((v.ok / v.tot) * 100),
      }))
      .filter((x) => Boolean(x.chapter))
      .sort((a, b) => a.rate - b.rate);

    const scorePoints = [...sessions]
      .reverse()
      .slice(-8)
      .map((s, idx) => ({
        label: `S${idx + 1}`,
        score: s.scorePercent,
      }));

    // Estimated readiness (pedagogical indicator only, never a guarantee)
    const readiness = Math.min(
      95,
      Math.round(overallRate * 0.65 + Math.min(25, totalSessions * 5) + Math.min(10, state.streakDays * 2))
    );

    return {
      totalSessions,
      totalMinutes,
      overallRate,
      mockExamsCompleted,
      subjectBars,
      masteredChapters,
      weakChapters,
      scorePoints,
      readiness,
    };
  }, [state.sessions, state.streakDays, allQuestions]);

  const nextPlan = state.studyPlan.find((p) => !p.completed && p.type !== 'pause');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Statistiques & Progression pédagogique
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Toutes tes statistiques sont calculées localement hors ligne pour t’aider à cibler tes révisions.
        </p>
      </div>

      {/* Top KPI Grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {[
          { label: 'Sessions réalisées', value: analytics.totalSessions, icon: BarChart3 },
          { label: 'Temps total', value: `${analytics.totalMinutes} min`, icon: Clock },
          { label: 'Réussite globale', value: `${analytics.overallRate} %`, icon: TrendingUp },
          { label: 'Examens blancs', value: analytics.mockExamsCompleted, icon: GraduationCap },
          { label: 'Série active', value: `${state.streakDays} j.`, icon: Flame },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="hc-card rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>{k.label}</span>
                <Icon className="h-4 w-4 text-blue-600" />
              </div>
              <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">{k.value}</p>
            </div>
          );
        })}
      </div>

      {/* Readiness & Next Session */}
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="hc-card rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-7 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Évolution de tes scores
          </h2>
          <div className="mt-3">
            <ScoreLineChart
              points={analytics.scorePoints}
              targetScore={activeProfile?.targetScore ?? 75}
            />
          </div>
        </div>

        <div className="hc-card flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-5 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Niveau de préparation estimé
            </h2>
            <div className="mt-4 flex items-end gap-3">
              <span className="text-4xl font-extrabold text-blue-700 dark:text-blue-400">
                {analytics.readiness} %
              </span>
              <span className="pb-1 text-xs font-semibold text-slate-500">
                (Objectif : {activeProfile?.targetScore ?? 75} %)
              </span>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-700 to-emerald-500"
                style={{ width: `${analytics.readiness}%` }}
              />
            </div>

            {nextPlan && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs dark:bg-slate-800">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>
                  Prochaine session : <strong>{nextPlan.dayLabel}</strong> — {nextPlan.title}
                </span>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-xl border border-blue-200 bg-blue-50/70 p-3 text-[11px] text-blue-950 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
            <span>
              Indicateur pédagogique basé sur ta régularité et tes exercices récents. Il t’aide à orienter tes révisions et ne constitue jamais une garantie de résultat à l’examen officiel.
            </span>
          </div>
        </div>
      </div>

      {/* Subject Mastery & Chapters */}
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="hc-card rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Taux de réussite par matière
          </h2>
          <div className="mt-4">
            <SubjectProgressBars items={analytics.subjectBars} />
          </div>
        </div>

        <div className="hc-card space-y-4 rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-6 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <h2 className="flex items-center gap-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              Chapitres maîtrisés ({analytics.masteredChapters.length})
            </h2>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {analytics.masteredChapters.length === 0 ? (
                <p className="text-xs text-slate-500">Atteins 75 % sur un chapitre pour le valider ici.</p>
              ) : (
                analytics.masteredChapters.map((c) => (
                  <span
                    key={c.chapter!.id}
                    className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
                  >
                    {c.chapter!.title} ({c.rate} %)
                  </span>
                ))
              )}
            </div>
          </div>

          <div>
            <h2 className="flex items-center gap-1.5 text-sm font-bold text-amber-700 dark:text-amber-400">
              <AlertCircle className="h-4 w-4" />
              Chapitres à renforcer ({analytics.weakChapters.length})
            </h2>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {analytics.weakChapters.length === 0 ? (
                <p className="text-xs text-slate-500">Aucun chapitre faible détecté pour l’instant.</p>
              ) : (
                analytics.weakChapters.map((c) => (
                  <span
                    key={c.chapter!.id}
                    className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-950 dark:bg-amber-950 dark:text-amber-200"
                  >
                    {c.chapter!.title} ({c.rate} %)
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Session History */}
      <section className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Historique complet des sessions (disponible hors ligne)
        </h2>
        <div className="mt-3 space-y-2">
          {state.sessions.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setSelectedSessionId(s.id);
                navigate('correction');
              }}
              className="flex w-full flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 p-3.5 text-left hover:border-blue-400 dark:border-slate-800"
            >
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{s.title}</p>
                <p className="text-xs text-slate-500">
                  {new Date(s.completedAt).toLocaleString('fr-FR')} · {Math.round(s.totalTimeSeconds / 60)} min ·{' '}
                  {s.correctCount}/{s.totalCount}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-extrabold text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                  {s.scorePercent} %
                </span>
                <span className="text-xs font-bold text-blue-700 dark:text-blue-400">Corrigé →</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
