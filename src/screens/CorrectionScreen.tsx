import React, { useState } from 'react';
import {
  AlertTriangle,
  BookMarked,
  CheckCircle2,
  Clock,
  Flag,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { SUBJECTS, useApp } from '../context/AppContext';
import { AiExplanationLevel, generateOfflineQuestionExplanation } from '../lib/aiHelper';

export const CorrectionScreen: React.FC = () => {
  const {
    state,
    selectedSessionId,
    allQuestions,
    navigate,
    setSelectedFicheId,
    startPractice,
    reportQuestionError,
  } = useApp();

  const [aiOpenFor, setAiOpenFor] = useState<Record<string, AiExplanationLevel>>({});
  const [reportingId, setReportingId] = useState<string | null>(null);
  const [reportText, setReportText] = useState('');

  const session =
    state.sessions.find((s) => s.id === selectedSessionId) ?? state.sessions[0];

  if (!session) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
        <p className="text-sm text-slate-600">Aucune session terminée à corriger pour le moment.</p>
        <button
          type="button"
          onClick={() => navigate('training')}
          className="mt-4 rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white"
        >
          Lancer une session
        </button>
      </div>
    );
  }

  const avgTimePerQ = Math.round(session.totalTimeSeconds / Math.max(1, session.totalCount));
  const totalModified = session.answers.reduce((acc, a) => acc + a.modifiedCount, 0);
  const slowest = [...session.answers]
    .sort((a, b) => b.timeSpentSeconds - a.timeSpentSeconds)
    .slice(0, 2);

  const timeAdvice =
    avgTimePerQ > 80
      ? 'Tu passes en moyenne plus de 80 s par question. En examen blanc, marque les questions longues pour y revenir après avoir sécurisé les points rapides.'
      : totalModified >= 2
      ? 'Tu as modifié plusieurs réponses en cours de route. Fais confiance à ta première analyse lorsque tu as vérifié la formule.'
      : 'Très bonne gestion du temps ! Ton rythme est régulier et laisse une marge de relecture confortable.';

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Score & Time Analytics Hero */}
      <section className="hc-card rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-200">
              Correction détaillée hors ligne
            </span>
            <h1 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
              {session.title}
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Réalisée le {new Date(session.completedAt).toLocaleString('fr-FR')} ·{' '}
              {session.synced ? 'Synchronisée' : 'Enregistrée hors ligne (en attente de sync)'}
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-blue-700 to-emerald-600 px-5 py-3 text-center text-white">
            <p className="text-3xl font-extrabold">{session.scorePercent} %</p>
            <p className="text-xs font-semibold text-blue-100">
              {session.correctCount} / {session.totalCount} bonnes réponses
            </p>
          </div>
        </div>

        {/* Time Analytics (Section 6) */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
            <p className="text-[11px] font-semibold text-slate-500">Temps total</p>
            <p className="mt-1 text-base font-extrabold text-slate-900 dark:text-white">
              {Math.floor(session.totalTimeSeconds / 60)}m {session.totalTimeSeconds % 60}s
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
            <p className="text-[11px] font-semibold text-slate-500">Moyenne / question</p>
            <p className="mt-1 text-base font-extrabold text-slate-900 dark:text-white">
              {avgTimePerQ} sec
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
            <p className="text-[11px] font-semibold text-slate-500">Réponses modifiées</p>
            <p className="mt-1 text-base font-extrabold text-slate-900 dark:text-white">
              {totalModified}
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
            <p className="text-[11px] font-semibold text-slate-500">Temps restant</p>
            <p className="mt-1 text-base font-extrabold text-slate-900 dark:text-white">
              {session.remainingSeconds !== undefined
                ? `${Math.floor(session.remainingSeconds / 60)}m ${session.remainingSeconds % 60}s`
                : 'Libre'}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/70 p-3.5 text-xs text-blue-950 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200">
          <p className="flex items-center gap-1.5 font-bold">
            <Clock className="h-4 w-4 text-blue-700" />
            Conseil de gestion du temps :
          </p>
          <p className="mt-1">{timeAdvice}</p>
          {slowest.length > 0 && (
            <p className="mt-1.5 text-[11px] opacity-85">
              Questions les plus longues :{' '}
              {slowest
                .map((s) => {
                  const q = allQuestions.find((qq) => qq.id === s.questionId);
                  return `${q?.notion ?? 'Question'} (${s.timeSpentSeconds}s)`;
                })
                .join(' · ')}
            </p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              startPractice({
                mode: session.mode,
                title: session.title,
                annaleId: session.annaleId,
                subjectId: session.subjectId,
                questionIds: session.answers.map((a) => a.questionId),
              })
            }
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800"
          >
            <RotateCcw className="h-4 w-4" />
            Refaire cette session
          </button>
          <button
            type="button"
            onClick={() => navigate('planner')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
          >
            Voir mon programme adapté →
          </button>
        </div>
      </section>

      {/* Question-by-Question Detailed Correction (Section 7) */}
      <div className="space-y-4">
        {session.answers.map((ans, idx) => {
          const q = allQuestions.find((qq) => qq.id === ans.questionId);
          if (!q) return null;
          const subj = SUBJECTS.find((s) => s.id === q.subjectId);
          const aiLevel = aiOpenFor[q.id];
          const aiPayload = aiLevel
            ? generateOfflineQuestionExplanation(q, ans.selectedIndex, aiLevel)
            : null;
          const similarQs = allQuestions.filter(
            (other) => other.id !== q.id && (other.chapterId === q.chapterId || other.subjectId === q.subjectId)
          );

          return (
            <article
              key={`${q.id}-${idx}`}
              className="hc-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-bold ${
                      ans.isCorrect
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200'
                    }`}
                  >
                    {ans.isCorrect ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Bonne réponse
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3.5 w-3.5" />
                        {ans.skipped ? 'Sans réponse' : 'À revoir'}
                      </>
                    )}
                  </span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    Q{idx + 1} · {subj?.shortName} · {q.notion}
                  </span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 capitalize text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {q.difficulty}
                  </span>
                </div>
                <span className="text-slate-500">Temps : {ans.timeSpentSeconds} s</span>
              </div>

              <h2 className="mt-2.5 text-base font-bold text-slate-900 dark:text-white">
                {q.prompt}
              </h2>

              <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
                <div
                  className={`rounded-xl border p-3 ${
                    ans.isCorrect
                      ? 'border-emerald-300 bg-emerald-50/70 dark:border-emerald-800 dark:bg-emerald-950/40'
                      : 'border-red-300 bg-red-50/70 dark:border-red-800 dark:bg-red-950/40'
                  }`}
                >
                  <p className="font-bold opacity-75">Ta réponse :</p>
                  <p className="mt-0.5 font-bold">
                    {ans.selectedIndex !== null ? q.options[ans.selectedIndex] : 'Aucune réponse sélectionnée'}
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-300 bg-emerald-50/70 p-3 dark:border-emerald-800 dark:bg-emerald-950/40">
                  <p className="font-bold text-emerald-900 dark:text-emerald-200">
                    Bonne réponse officielle :
                  </p>
                  <p className="mt-0.5 font-bold text-emerald-950 dark:text-emerald-100">
                    {q.options[q.correctIndex]}
                  </p>
                </div>
              </div>

              {/* Official Pedagogical Explanation */}
              <div className="mt-4 rounded-xl bg-slate-50 p-4 text-xs dark:bg-slate-800/70">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 font-extrabold text-blue-800 dark:text-blue-300">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    Correction officielle vérifiée
                  </span>
                  <span className="text-[11px] text-slate-500">{q.source}</span>
                </div>
                <p className="mt-2 text-sm text-slate-800 dark:text-slate-200">{q.explanation}</p>
                <ol className="mt-2 list-decimal space-y-1 pl-4 text-slate-700 dark:text-slate-300">
                  {q.steps.map((step, sIdx) => (
                    <li key={sIdx}>{step}</li>
                  ))}
                </ol>
              </div>

              {/* Disputable Warning if applicable */}
              {q.disputable && (
                <div className="mt-3 flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <div>
                    <p className="font-bold">Correction nuancée / discutable</p>
                    <p className="mt-0.5">{q.disputableNote}</p>
                  </div>
                </div>
              )}

              {/* Action Row: Fiche link, Similar questions, Responsible AI, Report */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {q.ficheId && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFicheId(q.ficheId!);
                      navigate('fiche-viewer');
                    }}
                    className="inline-flex items-center gap-1 rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-800 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200"
                  >
                    <BookMarked className="h-3.5 w-3.5" />
                    Voir la fiche associée
                  </button>
                )}

                {similarQs.length > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      startPractice({
                        mode: 'rapide',
                        title: `Questions similaires — ${q.notion}`,
                        subjectId: q.subjectId,
                        questionIds: similarQs.slice(0, 4).map((x) => x.id),
                        immediateFeedback: true,
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
                  >
                    <Play className="h-3.5 w-3.5" />
                    Questions similaires ({Math.min(4, similarQs.length)})
                  </button>
                )}

                <button
                  type="button"
                  onClick={() =>
                    setAiOpenFor((p) => ({
                      ...p,
                      [q.id]: p[q.id] ? (undefined as unknown as AiExplanationLevel) : 'simplifie',
                    }))
                  }
                  className="inline-flex items-center gap-1 rounded-xl border border-purple-300 bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-800 hover:bg-purple-100 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-200"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Explication IA personnalisée (hors ligne)
                </button>

                <button
                  type="button"
                  onClick={() => setReportingId(reportingId === q.id ? null : q.id)}
                  className="inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:text-amber-700"
                >
                  <Flag className="h-3.5 w-3.5" />
                  Signaler
                </button>
              </div>

              {/* Responsible Offline AI Box */}
              {aiPayload && (
                <div className="mt-3 rounded-xl border border-purple-200 bg-purple-50/60 p-4 text-xs dark:border-purple-900 dark:bg-purple-950/30">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-extrabold text-purple-900 dark:text-purple-200">
                      Assistant IA responsable (distinct de la correction officielle)
                    </span>
                    <div className="flex gap-1">
                      {(['simplifie', 'standard', 'approfondi'] as AiExplanationLevel[]).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setAiOpenFor((p) => ({ ...p, [q.id]: lvl }))}
                          className={`rounded-lg px-2 py-1 text-[11px] font-bold capitalize ${
                            aiLevel === lvl
                              ? 'bg-purple-700 text-white'
                              : 'bg-white text-purple-800 dark:bg-slate-800 dark:text-purple-200'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 whitespace-pre-line leading-relaxed text-slate-800 dark:text-slate-200">
                    {aiPayload.text}
                  </p>
                  <p className="mt-2 font-semibold text-purple-900 dark:text-purple-200">
                    Conseil : {aiPayload.keyTip}
                  </p>
                  <p className="mt-2 rounded-lg bg-white/80 p-2 text-[11px] text-slate-600 dark:bg-slate-900 dark:text-slate-400">
                    <strong>Fiabilité :</strong> {aiPayload.confidenceLabel}. {aiPayload.disclaimer}
                  </p>
                </div>
              )}

              {reportingId === q.id && (
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    placeholder="Décris l’erreur ou la source à vérifier..."
                    className="flex-1 rounded-xl border border-amber-300 px-3 py-1.5 text-xs dark:border-amber-800 dark:bg-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!reportText.trim()) return;
                      reportQuestionError(q.id, q.prompt, reportText.trim());
                      setReportText('');
                      setReportingId(null);
                    }}
                    className="rounded-xl bg-amber-600 px-3 py-1.5 text-xs font-bold text-white"
                  >
                    Signaler
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
