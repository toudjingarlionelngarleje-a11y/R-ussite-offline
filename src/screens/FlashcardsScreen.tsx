import React, { useMemo, useState } from 'react';
import { CheckCircle2, Layers, RotateCcw, Sparkles } from 'lucide-react';
import { PedagogicalDiagram } from '../components/PedagogicalDiagram';
import { FLASHCARDS, SUBJECTS, useApp } from '../context/AppContext';
import { isCardDue, MASTERY_LABELS } from '../lib/sm2';
import { MasteryLevel } from '../types';

export const FlashcardsScreen: React.FC = () => {
  const { state, allFlashcards, rateFlashcard } = useApp();
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [dueOnly, setDueOnly] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const [sessionReviewed, setSessionReviewed] = useState(0);

  const deck = useMemo(() => {
    return allFlashcards.filter((fc) => {
      if (subjectFilter !== 'all' && fc.subjectId !== subjectFilter) return false;
      if (dueOnly && !isCardDue(state.flashcardProgress[fc.id])) return false;
      return true;
    });
  }, [allFlashcards, subjectFilter, dueOnly, state.flashcardProgress]);

  const safeIndex = deck.length > 0 ? index % deck.length : 0;
  const current = deck[safeIndex];
  const progress = current ? state.flashcardProgress[current.id] : undefined;
  const currentSubject = current ? SUBJECTS.find((s) => s.id === current.subjectId) : null;

  const masteredCount = allFlashcards.filter(
    (c) => (state.flashcardProgress[c.id]?.mastery ?? 0) >= 2
  ).length;
  const dueCount = allFlashcards.filter((c) => isCardDue(state.flashcardProgress[c.id])).length;

  const handleRate = (level: MasteryLevel) => {
    if (!current) return;
    rateFlashcard(current.id, level);
    setSessionReviewed((n) => n + 1);
    setFlipped(false);
    setIndex((i) => (i + 1) % Math.max(1, deck.length));
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Cartes mémoire & Répétition espacée
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Algorithme SM-2 100 % hors ligne : les notions difficiles reviennent plus vite, les notions maîtrisées s’espacent.
          </p>
        </div>
        <div className="flex gap-2 text-xs font-bold">
          <span className="rounded-xl bg-amber-100 px-3 py-1.5 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
            À revoir : {dueCount}
          </span>
          <span className="rounded-xl bg-emerald-100 px-3 py-1.5 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
            Maîtrisées : {masteredCount}/{FLASHCARDS.length}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="hc-card flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-3">
          <select
            aria-label="Filtrer les cartes par matière"
            value={subjectFilter}
            onChange={(e) => {
              setSubjectFilter(e.target.value);
              setIndex(0);
              setFlipped(false);
            }}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="all">Toutes les matières ({FLASHCARDS.length})</option>
            {SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold">
            <input
              type="checkbox"
              checked={dueOnly}
              onChange={(e) => {
                setDueOnly(e.target.checked);
                setIndex(0);
                setFlipped(false);
              }}
              className="accent-blue-700"
            />
            Cartes dues aujourd’hui uniquement
          </label>
        </div>
        <span className="text-xs font-semibold text-slate-500">
          Révisées cette session : {sessionReviewed}
        </span>
      </div>

      {/* Card Stage */}
      {!current ? (
        <div className="hc-card rounded-2xl border border-emerald-200 bg-emerald-50/70 p-8 text-center dark:border-emerald-900 dark:bg-emerald-950/30">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
          <h2 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
            Toutes les cartes dues de ce filtre sont révisées !
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Décoche « Cartes dues aujourd’hui » pour réviser librement tout le paquet.
          </p>
          <button
            type="button"
            onClick={() => setDueOnly(false)}
            className="mt-4 rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white"
          >
            Afficher toutes les cartes
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-blue-600" />
              Carte {safeIndex + 1} sur {deck.length} ·{' '}
              <strong style={{ color: currentSubject?.color }}>{currentSubject?.name}</strong>
            </span>
            {progress && (
              <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${MASTERY_LABELS[progress.mastery].colorClass}`}>
                {MASTERY_LABELS[progress.mastery].label} · Prochaine :{' '}
                {new Date(progress.nextReviewAt).toLocaleDateString('fr-FR')}
              </span>
            )}
          </div>

          <div
            onClick={() => setFlipped((f) => !f)}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                setFlipped((f) => !f);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Retourner la carte mémoire"
            className="hc-card cursor-pointer rounded-3xl border-2 border-blue-200 bg-white p-6 shadow-md transition hover:border-blue-400 sm:p-8 dark:border-slate-700 dark:bg-slate-900"
          >
            {!flipped ? (
              <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                  QUESTION — Clique ou appuie sur Espace pour voir la réponse
                </span>
                <p className="mt-5 text-lg font-extrabold leading-relaxed text-slate-900 sm:text-xl dark:text-white">
                  {current.question}
                </p>
              </div>
            ) : (
              <div className="min-h-[220px] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                    <Sparkles className="h-3.5 w-3.5" />
                    RÉPONSE & MÉMO
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                    <RotateCcw className="h-3.5 w-3.5" />
                    Cliquer pour retourner
                  </span>
                </div>

                <p className="text-base font-bold leading-relaxed text-slate-900 sm:text-lg dark:text-white">
                  {current.answer}
                </p>

                {current.formula && (
                  <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 font-mono text-sm font-bold text-blue-900 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-200">
                    {current.formula}
                  </div>
                )}

                {current.example && (
                  <p className="rounded-xl bg-slate-100 p-3 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    <strong>Exemple :</strong> {current.example}
                  </p>
                )}

                {current.diagramId && <PedagogicalDiagram diagramId={current.diagramId} />}
              </div>
            )}
          </div>

          {/* 4 Mastery Level Rating Buttons (Section 9) */}
          <div className="space-y-2">
            <p className="text-center text-xs font-semibold text-slate-500">
              {flipped
                ? 'Évalue ton niveau de maîtrise pour programmer la prochaine révision hors ligne :'
                : 'Retourne la carte puis indique ton niveau de maîtrise'}
            </p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {([0, 1, 2, 3] as MasteryLevel[]).map((lvl) => {
                const meta = MASTERY_LABELS[lvl];
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => handleRate(lvl)}
                    className={`min-h-[54px] rounded-xl border p-2.5 text-center transition hover:scale-[1.01] ${meta.colorClass}`}
                  >
                    <p className="text-xs font-extrabold">{meta.label}</p>
                    <p className="mt-0.5 text-[10px] opacity-80">{meta.nextHint}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
