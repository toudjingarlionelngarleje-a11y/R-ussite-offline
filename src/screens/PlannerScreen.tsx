import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { SUBJECTS, useApp } from '../context/AppContext';
import { daysUntil, formatIsoDate } from '../lib/planner';

const WEEKDAYS = [
  { id: 1, label: 'Lun' },
  { id: 2, label: 'Mar' },
  { id: 3, label: 'Mer' },
  { id: 4, label: 'Jeu' },
  { id: 5, label: 'Ven' },
  { id: 6, label: 'Sam' },
  { id: 0, label: 'Dim' },
];

const TYPE_META: Record<string, { label: string; badge: string }> = {
  fiche: { label: 'Fiche & Flashcards', badge: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200' },
  exercices: { label: 'Exercices', badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200' },
  examen_blanc: { label: 'Examen blanc', badge: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200' },
  erreurs: { label: 'Révision erreurs', badge: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200' },
  bilan: { label: 'Bilan', badge: 'bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-200' },
  pause: { label: 'Repos', badge: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
  revision_finale: { label: 'Révision finale', badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200' },
  objectif_perso: { label: 'Objectif perso', badge: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200' },
};

export const PlannerScreen: React.FC = () => {
  const {
    state,
    activeProfile,
    regenerateStudyPlan,
    togglePlanItemComplete,
    movePlanItemDate,
    updatePlanItemDuration,
    addCustomPlanGoal,
    toggleRestDay,
    updateActiveProfile,
    triggerLocalReminder,
    navigate,
  } = useApp();

  const [goalTitle, setGoalTitle] = useState('');
  const [goalDate, setGoalDate] = useState(formatIsoDate(new Date()));
  const [goalMinutes, setGoalMinutes] = useState(30);
  const [goalSubject, setGoalSubject] = useState('');

  const countdown = activeProfile?.examDate ? daysUntil(activeProfile.examDate) : 45;
  const completedCount = state.studyPlan.filter((i) => i.completed).length;

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalTitle.trim()) return;
    addCustomPlanGoal(goalTitle.trim(), goalDate, goalMinutes, goalSubject || undefined);
    setGoalTitle('');
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Programme de révision personnalisé
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Consultable et modifiable 100 % hors ligne. S’adapte automatiquement lorsque tu rencontres des difficultés dans une matière.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={triggerLocalReminder}
            className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <Bell className="h-4 w-4 text-amber-600" />
            Tester le rappel local
          </button>
          <button
            type="button"
            onClick={regenerateStudyPlan}
            className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800"
          >
            <RefreshCw className="h-4 w-4" />
            Adapter à mes résultats
          </button>
        </div>
      </div>

      {/* Parameters Card */}
      <section className="hc-card grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-3 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <label className="block text-xs font-bold text-slate-500">
            Date d’examen (J-{countdown})
          </label>
          <input
            type="date"
            value={activeProfile?.examDate ?? ''}
            onChange={(e) => updateActiveProfile({ examDate: e.target.value })}
            className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500">
            Temps quotidien : {activeProfile?.dailyMinutes ?? 45} min/jour
          </label>
          <input
            type="range"
            min={15}
            max={180}
            step={15}
            value={activeProfile?.dailyMinutes ?? 45}
            onChange={(e) => updateActiveProfile({ dailyMinutes: Number(e.target.value) })}
            className="mt-3 w-full accent-blue-700"
          />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-500">Jours désactivés (repos)</p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {WEEKDAYS.map((d) => {
              const isRest = activeProfile?.restDays.includes(d.id);
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => toggleRestDay(d.id)}
                  className={`rounded-lg px-2 py-1 text-[11px] font-bold ${
                    isRest
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {d.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add Personal Goal */}
      <form
        onSubmit={handleAddGoal}
        className="hc-card flex flex-wrap items-end gap-2.5 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="min-w-[200px] flex-1">
          <label className="block text-[11px] font-bold text-slate-500">
            Ajouter un objectif personnel au planning
          </label>
          <input
            type="text"
            value={goalTitle}
            onChange={(e) => setGoalTitle(e.target.value)}
            placeholder="Ex. Revoir 3 exercices de dérivées avec un ami"
            className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-500">Date</label>
          <input
            type="date"
            value={goalDate}
            onChange={(e) => setGoalDate(e.target.value)}
            className="mt-1 rounded-xl border border-slate-300 bg-white px-2.5 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-500">Durée (min)</label>
          <input
            type="number"
            min={10}
            max={180}
            step={5}
            value={goalMinutes}
            onChange={(e) => setGoalMinutes(Number(e.target.value))}
            className="mt-1 w-20 rounded-xl border border-slate-300 bg-white px-2.5 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-500">Matière</label>
          <select
            value={goalSubject}
            onChange={(e) => setGoalSubject(e.target.value)}
            className="mt-1 rounded-xl border border-slate-300 bg-white px-2.5 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="">Général</option>
            {SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.shortName}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="inline-flex h-9 items-center gap-1 rounded-xl bg-emerald-600 px-4 text-xs font-bold text-white hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4" />
          Ajouter
        </button>
      </form>

      {/* Schedule List */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-blue-600" />
            Prochaines sessions ({state.studyPlan.length})
          </span>
          <span>Terminées : {completedCount}</span>
        </div>

        {state.studyPlan.map((item) => {
          const meta = TYPE_META[item.type] ?? TYPE_META.exercices;
          return (
            <div
              key={item.id}
              className={`hc-card flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4 transition ${
                item.completed
                  ? 'border-emerald-200 bg-emerald-50/40 opacity-80 dark:border-emerald-900 dark:bg-emerald-950/20'
                  : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <button
                  type="button"
                  onClick={() => togglePlanItemComplete(item.id)}
                  className="mt-0.5 shrink-0 text-emerald-600"
                  aria-label="Marquer comme terminé"
                >
                  {item.completed ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5 text-slate-400" />
                  )}
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
                    <span className="text-blue-700 dark:text-blue-300">{item.dayLabel}</span>
                    <span className={`rounded-full px-2 py-0.5 ${meta.badge}`}>{meta.label}</span>
                    {item.priority === 'haute' && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
                        Priorité
                      </span>
                    )}
                  </div>
                  <p
                    className={`mt-1 text-sm font-bold ${
                      item.completed ? 'line-through text-slate-500' : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
              </div>

              {item.type !== 'pause' && (
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <div className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 dark:border-slate-700">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <input
                      aria-label="Modifier la durée en minutes"
                      type="number"
                      min={5}
                      max={180}
                      step={5}
                      value={item.durationMinutes}
                      onChange={(e) => updatePlanItemDuration(item.id, Number(e.target.value))}
                      className="w-12 bg-transparent text-center font-bold"
                    />
                    <span className="text-slate-500">min</span>
                  </div>
                  <input
                    aria-label="Déplacer la date de la session"
                    type="date"
                    value={item.date}
                    onChange={(e) => movePlanItemDate(item.id, e.target.value)}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (item.type === 'fiche') navigate('fiche-viewer');
                      else if (item.type === 'examen_blanc') navigate('mock-exam');
                      else if (item.type === 'erreurs') navigate('mistakes');
                      else if (item.type === 'bilan') navigate('stats');
                      else navigate('training');
                    }}
                    className="rounded-lg bg-blue-50 px-2.5 py-1.5 font-bold text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-200"
                  >
                    Ouvrir
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};
