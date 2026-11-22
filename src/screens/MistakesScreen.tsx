import React from 'react';
import { AlertCircle, BookMarked, CheckCircle2, Play, Sparkles } from 'lucide-react';
import { SUBJECTS, useApp } from '../context/AppContext';

export const MistakesScreen: React.FC = () => {
  const {
    allQuestions,
    getMistakeQuestionIds,
    startPractice,
    setSelectedFicheId,
    navigate,
  } = useApp();

  const mistakeIds = getMistakeQuestionIds();
  const mistakeQuestions = mistakeIds
    .map((id) => allQuestions.find((q) => q.id === id))
    .filter((q): q is NonNullable<typeof q> => Boolean(q));

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Mode révision des erreurs
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Rassemble automatiquement tes questions mal répondues, abandonnées ou marquées difficiles pour transformer tes points faibles en acquis.
          </p>
        </div>

        {mistakeQuestions.length > 0 && (
          <button
            type="button"
            onClick={() =>
              startPractice({
                mode: 'erreurs',
                title: `Session anti-erreurs (${mistakeQuestions.length} questions)`,
                questionIds: mistakeQuestions.map((q) => q.id),
                immediateFeedback: true,
              })
            }
            className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-amber-700"
          >
            <Play className="h-4 w-4" />
            Lancer une session ciblée ({mistakeQuestions.length} q.)
          </button>
        )}
      </div>

      {mistakeQuestions.length === 0 ? (
        <div className="hc-card rounded-2xl border border-emerald-200 bg-emerald-50/70 p-8 text-center dark:border-emerald-900 dark:bg-emerald-950/30">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
          <h2 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
            Aucune erreur en attente !
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Félicitations ! Lance un examen blanc ou une révision rapide pour continuer à tester tes connaissances.
          </p>
          <button
            type="button"
            onClick={() => navigate('training')}
            className="mt-4 rounded-xl bg-blue-700 px-5 py-2.5 text-xs font-bold text-white"
          >
            Aller aux modes d’entraînement
          </button>
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
            <p className="flex items-center gap-1.5 font-bold">
              <Sparkles className="h-4 w-4 text-amber-600" />
              Astuce pédagogique :
            </p>
            <p className="mt-1">
              Dès que tu réponds correctement à une question lors d’une nouvelle session, elle disparaît automatiquement de cette liste d’erreurs !
            </p>
          </div>

          <div className="space-y-3">
            {mistakeQuestions.map((q) => {
              const subj = SUBJECTS.find((s) => s.id === q.subjectId);
              return (
                <article
                  key={q.id}
                  className="hc-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 font-bold">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <span style={{ color: subj?.color }}>{subj?.name}</span> · {q.notion}
                    </span>
                    <span className="rounded bg-slate-100 px-2 py-0.5 capitalize font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {q.difficulty}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">{q.prompt}</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    <strong>Indice clé :</strong> {q.steps[0] ?? q.explanation}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        startPractice({
                          mode: 'erreurs',
                          title: `Reprise — ${q.notion}`,
                          subjectId: q.subjectId,
                          questionIds: [q.id],
                          immediateFeedback: true,
                        })
                      }
                      className="inline-flex items-center gap-1 rounded-xl bg-blue-700 px-3 py-1.5 text-xs font-bold text-white"
                    >
                      <Play className="h-3.5 w-3.5" />
                      Refaire cette question
                    </button>
                    {q.ficheId && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFicheId(q.ficheId!);
                          navigate('fiche-viewer');
                        }}
                        className="inline-flex items-center gap-1 rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200"
                      >
                        <BookMarked className="h-3.5 w-3.5 text-emerald-600" />
                        Revoir la fiche
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
