import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  CalendarCheck2,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock,
  Compass,
  FileText,
  Layers,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  Target,
} from 'lucide-react';
import { REVISION_EXPRESS_PATHS, REVISION_PATHS } from '../data';
import { createRevisionEngine } from '../data/revisionPaths/engine';
import { RevisionDayStep, RevisionPathPlan } from '../data/revisionPaths/types';
import { ANNALES, CHAPTERS, FLASHCARDS, SUBJECTS, useApp } from '../context/AppContext';
import { RevisionPathMode, RevisionStepKind } from '../types';
import { buildRevisionSchedule } from '../lib/revisionSchedule';

const STEP_META: Record<
  RevisionStepKind,
  { icon: React.FC<{ className?: string }>; badge: string; action: string }
> = {
  cours: {
    icon: BookOpen,
    badge: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200',
    action: 'Lire le cours',
  },
  fiche: {
    icon: BookMarked,
    badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200',
    action: 'Ouvrir la fiche',
  },
  qcm: {
    icon: Target,
    badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200',
    action: 'Faire le QCM',
  },
  flashcards: {
    icon: Layers,
    badge: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200',
    action: 'Réviser les cartes',
  },
  annale: {
    icon: FileText,
    badge: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200',
    action: 'Passer l’annale',
  },
  bilan: {
    icon: Sparkles,
    badge: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200',
    action: 'Faire le bilan',
  },
};

const KIND_LABEL: Record<RevisionStepKind, string> = {
  cours: 'Cours',
  fiche: 'Fiche',
  qcm: 'QCM',
  flashcards: 'Cartes',
  annale: 'Annale',
  bilan: 'Bilan',
};

function formatMinutes(total: number): string {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  if (hours === 0) return `${minutes} min`;
  return minutes === 0 ? `${hours} h` : `${hours} h ${String(minutes).padStart(2, '0')}`;
}

export const RevisionPathsScreen: React.FC = () => {
  const {
    state,
    activeProfile,
    allQuestions,
    allFiches,
    allFlashcards,
    navigate,
    setSelectedCourseId,
    setSelectedFicheId,
    startPractice,
    openFlashcardsForSubject,
    toggleRevisionStep,
    resetRevisionPath,
    scheduleRevisionPath,
    unscheduleRevisionPath,
    notify,
  } = useApp();

  const defaultSubjectId =
    activeProfile?.selectedSubjectIds?.find((id) => SUBJECTS.some((s) => s.id === id)) ?? 'maths';

  const [subjectId, setSubjectId] = useState(defaultSubjectId);
  const [query, setQuery] = useState('');
  const [openDay, setOpenDay] = useState<number | null>(null);
  const [mode, setMode] = useState<RevisionPathMode>('standard');

  const engine = useMemo(
    () =>
      createRevisionEngine({
        chapters: CHAPTERS,
        questions: allQuestions,
        flashcards: allFlashcards,
        fiches: allFiches,
        annales: ANNALES,
        totalChapterCount: CHAPTERS.length,
      }),
    [allQuestions, allFiches, allFlashcards]
  );

  const plans = useMemo(() => {
    const map = new Map<string, RevisionPathPlan>();
    for (const path of [...REVISION_PATHS, ...REVISION_EXPRESS_PATHS]) map.set(path.id, engine.buildPlan(path));
    return map;
  }, [engine]);

  const activePaths = mode === 'express' ? REVISION_EXPRESS_PATHS : REVISION_PATHS;
  const planIdFor = (id: string) => (mode === 'express' ? `rp-exp-${id}` : `rp-${id}`);

  const progress = state.revisionPathProgress ?? {};

  const statsByPath = useMemo(() => {
    const map = new Map<string, { done: number; total: number }>();
    for (const [pathId, plan] of plans) {
      const doneIds = new Set(progress[pathId] ?? []);
      let done = 0;
      for (const day of plan.days) {
        for (const step of day.steps) if (doneIds.has(step.id)) done += 1;
      }
      map.set(pathId, { done, total: plan.stepCount });
    }
    return map;
  }, [plans, progress]);

  const globalTotals = useMemo(() => {
    let done = 0;
    let total = 0;
    let finishedPaths = 0;
    for (const path of activePaths) {
      const value = statsByPath.get(path.id);
      if (!value) continue;
      done += value.done;
      total += value.total;
      if (value.total > 0 && value.done === value.total) finishedPaths += 1;
    }
    return { done, total, finishedPaths };
  }, [statsByPath, activePaths]);

  const subjectsSorted = useMemo(
    () => [...SUBJECTS].sort((a, b) => a.name.localeCompare(b.name, 'fr')),
    []
  );

  const filteredSubjects = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return subjectsSorted;
    return subjectsSorted.filter(
      (s) =>
        s.name.toLowerCase().includes(needle) ||
        s.shortName.toLowerCase().includes(needle) ||
        s.id.toLowerCase().includes(needle)
    );
  }, [query, subjectsSorted]);

  const plan = plans.get(planIdFor(subjectId)) ?? plans.values().next().value;
  const subject = SUBJECTS.find((s) => s.id === plan?.subjectId);
  const doneIds = new Set(progress[plan?.id ?? ''] ?? []);
  const currentDayIndex =
    plan?.days.find((day) => !day.steps.every((step) => doneIds.has(step.id)))?.index ?? null;
  const scheduledDays = plan
    ? state.studyPlan
        .filter((item) => item.pathId === plan.id && typeof item.pathDay === 'number')
        .sort((a, b) => a.date.localeCompare(b.date))
    : [];
  const scheduleLabel =
    scheduledDays.length > 0
      ? `${scheduledDays[0].dayLabel} → ${scheduledDays[scheduledDays.length - 1].dayLabel}`
      : null;

  const planDone = plan?.days.reduce(
    (sum, day) => sum + day.steps.filter((step) => doneIds.has(step.id)).length,
    0
  ) ?? 0;
  const planTotal = plan?.stepCount ?? 0;
  const planPercent = planTotal > 0 ? Math.round((planDone / planTotal) * 100) : 0;

  const handleSchedule = () => {
    if (!plan) return;
    const slots = buildRevisionSchedule({
      mode,
      dayCount: plan.days.length,
      examDate: activeProfile?.examDate,
      restDays: activeProfile?.restDays,
    });
    scheduleRevisionPath({
      pathId: plan.id,
      pathMode: mode,
      subjectId: plan.subjectId,
      days: plan.days.map((day, index) => ({
        index: day.index,
        date: slots[index].date,
        dayLabel: slots[index].dayLabel,
        title: `${plan.subjectName} — Jour ${day.index} : ${day.title}`,
        minutes: day.minutes,
        stepIds: day.steps.map((step) => step.id),
      })),
    });
    notify(
      `${plan.days.length} journée${plan.days.length > 1 ? 's' : ''} ajoutée${plan.days.length > 1 ? 's' : ''} au programme : ${slots[0].dayLabel} → ${slots[slots.length - 1].dayLabel}.`,
      'success'
    );
  };

  const handleUnschedule = () => {
    if (!plan) return;
    unscheduleRevisionPath(plan.id);
    notify('Parcours retiré du programme personnalisé (ta progression est conservée).', 'info');
  };

  const launchStep = (step: RevisionDayStep) => {
    if (!plan) return;
    if (step.kind === 'cours' && step.courseId) {
      setSelectedCourseId(step.courseId);
      navigate('course-reader');
      return;
    }
    if (step.kind === 'fiche' && step.ficheId) {
      setSelectedFicheId(step.ficheId);
      navigate('fiche-viewer');
      return;
    }
    if (step.kind === 'flashcards') {
      openFlashcardsForSubject(plan.subjectId);
      return;
    }
    if (step.questionIds.length > 0) {
      startPractice({
        mode: step.kind === 'annale' ? 'examen_blanc' : 'rapide',
        title: `${subject?.name ?? plan.subjectName} · ${step.label}`,
        questionIds: step.questionIds,
        annaleId: step.annaleId,
        subjectId: plan.subjectId,
        durationMinutes: step.kind === 'annale' ? step.minutes : undefined,
      });
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-extrabold text-slate-900 dark:text-white">
            <Compass className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
            Parcours de révision guidés
          </h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-600 dark:text-slate-400">
            Deux formats guidés par matière : le parcours complet en sept journées, du diagnostic au
            bilan final, et l’express en trois journées pour la dernière ligne droite. Chaque étape
            ouvre un cours, une fiche, un QCM ou une annale réellement présents dans ton catalogue
            hors ligne : rien à télécharger, rien à improviser.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-lg font-extrabold text-slate-900 dark:text-white">{activePaths.length}</p>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {mode === 'express' ? 'Express' : 'Parcours'}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-lg font-extrabold text-slate-900 dark:text-white">{globalTotals.total}</p>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Étapes
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
              {globalTotals.finishedPaths}
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Terminés
            </p>
          </div>
        </div>
      </header>

      <div className="flex flex-wrap gap-2">
        {[
          {
            id: 'standard' as RevisionPathMode,
            label: 'Parcours complet',
            hint: '7 journées · diagnostic → bilan',
            count: REVISION_PATHS.length,
          },
          {
            id: 'express' as RevisionPathMode,
            label: 'Parcours express',
            hint: '3 journées · J-3, J-2, J-1',
            count: REVISION_EXPRESS_PATHS.length,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setMode(tab.id);
              setOpenDay(null);
            }}
            aria-pressed={mode === tab.id}
            className={`flex-1 rounded-2xl border px-4 py-3 text-left transition ${
              mode === tab.id
                ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
            }`}
          >
            <span className="flex items-center gap-2 text-sm font-extrabold">
              {tab.id === 'express' ? <Sparkles className="h-4 w-4" /> : <Compass className="h-4 w-4" />}
              {tab.label}
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  mode === tab.id
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {tab.count}
              </span>
            </span>
            <span
              className={`mt-1 block text-[11px] font-semibold ${
                mode === tab.id ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {tab.hint}
            </span>
          </button>
        ))}
      </div>

      {mode === 'express' && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-xs font-semibold text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
          Parcours express : trois journées à activer à J-3, J-2 et J-1. Chaque journée tient en une
          heure environ et ne retient que les notions tombables du cœur du programme.
        </div>
      )}

      <div className="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4 dark:border-indigo-900 dark:bg-indigo-950/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-200">
            Progression globale ({mode === 'express' ? 'express' : 'parcours complet'}) :{' '}
            {globalTotals.done} étape{globalTotals.done > 1 ? 's' : ''} validée
            {globalTotals.done > 1 ? 's' : ''} sur {globalTotals.total} ({globalTotals.total > 0
              ? Math.round((globalTotals.done / globalTotals.total) * 100)
              : 0}
            %). Ta progression reste enregistrée sur cet appareil, même hors connexion.
          </p>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-indigo-200 dark:bg-indigo-900">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all dark:bg-indigo-400"
            style={{
              width: `${globalTotals.total > 0 ? Math.round((globalTotals.done / globalTotals.total) * 100) : 0}%`,
            }}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="space-y-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Chercher une matière…"
              aria-label="Chercher une matière"
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-indigo-900"
            />
          </div>
          <div className="max-h-[560px] space-y-1.5 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900">
            {filteredSubjects.length === 0 && (
              <p className="p-3 text-xs text-slate-500 dark:text-slate-400">
                Aucune matière ne correspond à « {query} ».
              </p>
            )}
            {filteredSubjects.map((item) => {
              const itemStats = statsByPath.get(planIdFor(item.id));
              const percent =
                itemStats && itemStats.total > 0
                  ? Math.round((itemStats.done / itemStats.total) * 100)
                  : 0;
              const active = item.id === plan?.subjectId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSubjectId(item.id);
                    setOpenDay(null);
                  }}
                  className={`w-full rounded-lg px-3 py-2 text-left transition ${
                    active
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                  }`}
                  aria-pressed={active}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-bold">{item.name}</span>
                    <span
                      className={`shrink-0 text-[10px] font-bold ${
                        active ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {itemStats ? `${itemStats.done}/${itemStats.total}` : '—'}
                    </span>
                  </span>
                  <span
                    className={`mt-1 block h-1 w-full overflow-hidden rounded-full ${
                      active ? 'bg-indigo-400/50' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`block h-full rounded-full ${
                        active ? 'bg-white' : 'bg-indigo-500 dark:bg-indigo-400'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </span>
                </button>
              );
            })}
          </div>
          <p className="px-1 text-[11px] text-slate-500 dark:text-slate-400">
            {filteredSubjects.length === activePaths.length
              ? `${activePaths.length} parcours ${mode === 'express' ? 'express ' : ''}disponibles, un par matière du programme.`
              : `${filteredSubjects.length} matière${filteredSubjects.length > 1 ? 's' : ''} sur ${activePaths.length} affichée${filteredSubjects.length > 1 ? 's' : ''}.`}
          </p>
        </aside>

        {plan && subject && (
          <section className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
                    {subject.shortName} · {mode === 'express' ? 'express 3 jours' : 'parcours complet 7 jours'} ·{' '}
                    {formatMinutes(plan.totalMinutes)} · {plan.stepCount} étapes
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white">
                    {subject.name}
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
                    {plan.goal}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <CalendarCheck2 className="h-3.5 w-3.5" />
                    {planDone}/{planTotal} étapes
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      resetRevisionPath(plan.id);
                      notify('Parcours réinitialisé : tu peux le reprendre de zéro.', 'info');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Recommencer
                  </button>
                  {scheduleLabel ? (
                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                        <CalendarCheck2 className="h-3.5 w-3.5" />
                        Planifié : {scheduleLabel}
                      </span>
                      <button
                        type="button"
                        onClick={handleSchedule}
                        className="rounded-lg border border-emerald-300 px-2.5 py-1.5 text-[11px] font-bold text-emerald-800 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300"
                      >
                        Replanifier
                      </button>
                      <button
                        type="button"
                        onClick={handleUnschedule}
                        className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
                      >
                        Retirer
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate('planner')}
                        className="rounded-lg bg-slate-900 px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-slate-700 dark:bg-indigo-600"
                      >
                        Voir le programme
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSchedule}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-emerald-700"
                    >
                      <CalendarCheck2 className="h-3.5 w-3.5" />
                      Intégrer au programme
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div
                  className={`h-full rounded-full transition-all ${
                    planPercent === 100 ? 'bg-emerald-500' : 'bg-indigo-600 dark:bg-indigo-400'
                  }`}
                  style={{ width: `${planPercent}%` }}
                />
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                <span>{planPercent} % du parcours validé</span>
                <span>{plan.questionCount} questions corrigées prévues</span>
                <span>{REVISION_PATHS.find((p) => p.id === plan.id)?.anchorChapterCount ?? 0} chapitres pivots</span>
              </div>

              {currentDayIndex !== null && (
                <button
                  type="button"
                  onClick={() => {
                    const day = plan.days.find((d) => d.index === currentDayIndex);
                    if (!day) return;
                    setOpenDay(day.index);
                    document
                      .getElementById(`${plan.id}-j${day.index}`)
                      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700"
                >
                  <Play className="h-4 w-4" />
                  Reprendre au jour {currentDayIndex}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
              {currentDayIndex === null && (
                <p className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" />
                  Parcours terminé : refais le bilan pour ancrer les acquis.
                </p>
              )}
            </div>

            <ol className="space-y-3">
              {plan.days.map((day) => {
                const dayDone = day.steps.filter((step) => doneIds.has(step.id)).length;
                const complete = dayDone === day.steps.length;
                const expanded = openDay === null ? day.index === currentDayIndex : openDay === day.index;
                return (
                  <li
                    key={day.id}
                    id={`${plan.id}-j${day.index}`}
                    className={`overflow-hidden rounded-2xl border bg-white shadow-sm dark:bg-slate-900 ${
                      complete
                        ? 'border-emerald-300 dark:border-emerald-800'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenDay(expanded ? -1 : day.index)}
                      aria-expanded={expanded}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left"
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
                          complete
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {complete ? <CheckCircle2 className="h-5 w-5" /> : day.index}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                            Jour {day.index} — {day.title}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            <Clock className="h-3 w-3" />
                            {formatMinutes(day.minutes)}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            {dayDone}/{day.steps.length} faits
                          </span>
                          {(() => {
                            const slot = scheduledDays.find((item) => item.pathDay === day.index);
                            return slot ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                <CalendarCheck2 className="h-3 w-3" />
                                {slot.dayLabel}
                              </span>
                            ) : null;
                          })()}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-slate-500 dark:text-slate-400">
                          {day.chapters.map((c) => c.title).join(' · ')}
                        </span>
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                          expanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {expanded && (
                      <div className="border-t border-slate-200 px-4 py-4 dark:border-slate-800">
                        <p className="text-sm text-slate-700 dark:text-slate-300">{day.objective}</p>
                        <p className="mt-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                          Conseil : {day.advice}
                        </p>

                        <ul className="mt-3 space-y-2">
                          {day.steps.map((step) => {
                            const meta = STEP_META[step.kind];
                            const Icon = meta.icon;
                            const done = doneIds.has(step.id);
                            return (
                              <li
                                key={step.id}
                                className={`flex flex-wrap items-start gap-3 rounded-xl border p-3 ${
                                  done
                                    ? 'border-emerald-200 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/30'
                                    : 'border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40'
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={() => toggleRevisionStep(plan.id, step.id)}
                                  aria-pressed={done}
                                  aria-label={done ? 'Marquer cette étape comme à refaire' : 'Marquer cette étape comme faite'}
                                  className="mt-0.5 shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                                >
                                  {done ? (
                                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                  ) : (
                                    <Circle className="h-5 w-5 text-slate-400" />
                                  )}
                                </button>

                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span
                                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${meta.badge}`}
                                    >
                                      <Icon className="h-3 w-3" />
                                      {KIND_LABEL[step.kind]}
                                    </span>
                                    <span
                                      className={`text-sm font-bold ${
                                        done
                                          ? 'text-slate-500 line-through dark:text-slate-400'
                                          : 'text-slate-900 dark:text-white'
                                      }`}
                                    >
                                      {step.label}
                                    </span>
                                  </div>
                                  <p className="mt-1 line-clamp-2 text-xs text-slate-600 dark:text-slate-400">
                                    {step.detail}
                                  </p>
                                </div>

                                <div className="flex shrink-0 items-center gap-2">
                                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                    <Clock className="h-3 w-3" />
                                    {step.minutes} min
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => launchStep(step)}
                                    className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-slate-700 dark:bg-indigo-600 dark:hover:bg-indigo-500"
                                  >
                                    {meta.action}
                                    <ArrowRight className="h-3 w-3" />
                                  </button>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        )}
      </div>
    </div>
  );
};
