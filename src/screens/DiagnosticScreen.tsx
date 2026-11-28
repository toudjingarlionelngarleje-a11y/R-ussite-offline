import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  Brain,
  CheckCircle2,
  Clock,
  Compass,
  Play,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';
import { CHAPTERS, EXAMS, SUBJECTS, useApp } from '../context/AppContext';
import { DiagnosticResult, Difficulty, Question } from '../types';

const TOTAL_DIAG_QUESTIONS = 6;

export const DiagnosticScreen: React.FC = () => {
  const {
    state,
    activeProfile,
    allQuestions,
    saveDiagnosticResult,
    navigate,
    startPractice,
    setSelectedFicheId,
  } = useApp();

  const exam = EXAMS.find((e) => e.id === activeProfile?.examId) ?? EXAMS[0];
  const candidateSubjectIds = activeProfile?.selectedSubjectIds.length
    ? activeProfile.selectedSubjectIds
    : exam.subjectIds;

  const pool = useMemo(() => {
    const matching = allQuestions.filter((q) => candidateSubjectIds.includes(q.subjectId));
    return matching.length >= TOTAL_DIAG_QUESTIONS ? matching : allQuestions;
  }, [allQuestions, candidateSubjectIds]);

  const [started, setStarted] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>('moyen');
  const [askedIds, setAskedIds] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [responses, setResponses] = useState<
    { question: Question; isCorrect: boolean; difficulty: Difficulty }[]
  >([]);
  const [finishedResult, setFinishedResult] = useState<DiagnosticResult | null>(
    state.diagnosticResult
  );

  const pickNextQuestion = (
    targetDiff: Difficulty,
    alreadyAsked: string[],
    usedSubjects: string[]
  ): Question | null => {
    const remaining = pool.filter((q) => !alreadyAsked.includes(q.id));
    if (remaining.length === 0) return null;

    // Prefer an untested subject first so every exam subject is sampled
    const unseenSubject = remaining.filter((q) => !usedSubjects.includes(q.subjectId));
    const bucket = unseenSubject.length > 0 ? unseenSubject : remaining;

    const exactDiff = bucket.filter((q) => q.difficulty === targetDiff);
    if (exactDiff.length > 0) return exactDiff[0];
    return bucket[0];
  };

  const handleStart = () => {
    const first = pickNextQuestion('moyen', [], []);
    setStarted(true);
    setFinishedResult(null);
    setCurrentDifficulty('moyen');
    setResponses([]);
    setSelectedOption(null);
    if (first) {
      setCurrentQuestion(first);
      setAskedIds([first.id]);
    }
  };

  const handleValidate = () => {
    if (!currentQuestion || selectedOption === null) return;
    const isCorrect = selectedOption === currentQuestion.correctIndex;
    const nextResponses = [
      ...responses,
      { question: currentQuestion, isCorrect, difficulty: currentQuestion.difficulty },
    ];
    setResponses(nextResponses);
    setSelectedOption(null);

    // Adaptive difficulty transition
    const nextDiff: Difficulty = isCorrect
      ? currentDifficulty === 'facile'
        ? 'moyen'
        : 'difficile'
      : currentDifficulty === 'difficile'
      ? 'moyen'
      : 'facile';
    setCurrentDifficulty(nextDiff);

    if (nextResponses.length >= TOTAL_DIAG_QUESTIONS) {
      // Build full competency diagnosis
      const bySubj = new Map<string, { ok: number; total: number }>();
      const wrongChapters = new Set<string>();

      for (const r of nextResponses) {
        const cur = bySubj.get(r.question.subjectId) ?? { ok: 0, total: 0 };
        cur.total += 1;
        if (r.isCorrect) cur.ok += 1;
        else wrongChapters.add(r.question.chapterId);
        bySubj.set(r.question.subjectId, cur);
      }

      const subjectScores = Array.from(bySubj.entries()).map(([subjectId, v]) => ({
        subjectId,
        score: Math.round((v.ok / v.total) * 100),
        answered: v.total,
      }));

      const totalCorrect = nextResponses.filter((r) => r.isCorrect).length;
      const overallScore = Math.round((totalCorrect / nextResponses.length) * 100);
      const estimatedLevel: DiagnosticResult['estimatedLevel'] =
        overallScore >= 75 ? 'avance' : overallScore >= 45 ? 'intermediaire' : 'debutant';
      const recommendedWeeklyHours =
        estimatedLevel === 'debutant' ? 6 : estimatedLevel === 'intermediaire' ? 4.5 : 3;

      const strongSubjectIds = subjectScores.filter((s) => s.score >= 70).map((s) => s.subjectId);
      const weakSubjectIds = subjectScores.filter((s) => s.score < 70).map((s) => s.subjectId);

      const result: DiagnosticResult = {
        completedAt: new Date().toISOString(),
        examId: exam.id,
        estimatedLevel,
        overallScore,
        recommendedWeeklyHours,
        subjectScores,
        strongSubjectIds,
        weakSubjectIds,
        priorityChapterIds: Array.from(wrongChapters),
      };

      setFinishedResult(result);
      setStarted(false);
      setCurrentQuestion(null);
      saveDiagnosticResult(result, false);
      return;
    }

    const usedSubjects = nextResponses.map((r) => r.question.subjectId);
    const nextQ = pickNextQuestion(nextDiff, askedIds, usedSubjects);
    if (nextQ) {
      setCurrentQuestion(nextQ);
      setAskedIds((prev) => [...prev, nextQ.id]);
    }
  };

  // Active adaptive question screen
  if (started && currentQuestion) {
    const subj = SUBJECTS.find((s) => s.id === currentQuestion.subjectId);
    const step = responses.length + 1;

    return (
      <div className="mx-auto max-w-3xl space-y-5">
        <div className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-200">
              <Brain className="h-3.5 w-3.5" />
              Test adaptatif · Question {step} / {TOTAL_DIAG_QUESTIONS}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold capitalize text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              Difficulté calibrée : {currentQuestion.difficulty}
            </span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-blue-700 transition-all"
              style={{ width: `${(step / TOTAL_DIAG_QUESTIONS) * 100}%` }}
            />
          </div>
          <p className="mt-3 text-xs font-semibold text-slate-500">
            Matière évaluée :{' '}
            <span className="font-bold text-slate-800 dark:text-slate-100">{subj?.name}</span> ·{' '}
            {currentQuestion.notion}
          </p>
        </div>

        <div className="hc-card rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {currentQuestion.context && (
            <div className="mb-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {currentQuestion.context}
            </div>
          )}
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
            {currentQuestion.prompt}
          </h2>

          <div className="mt-5 space-y-2.5">
            {currentQuestion.options.map((opt, idx) => {
              const active = selectedOption === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedOption(idx)}
                  className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left text-sm font-semibold transition ${
                    active
                      ? 'border-blue-700 bg-blue-50 text-blue-950 dark:border-blue-400 dark:bg-blue-950/60 dark:text-blue-100'
                      : 'border-slate-200 hover:border-blue-300 dark:border-slate-700 dark:hover:border-blue-500'
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold ${
                      active
                        ? 'bg-blue-700 text-white'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {['A', 'B', 'C', 'D'][idx]}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStarted(false)}
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-700 dark:border-slate-700 dark:text-slate-300"
            >
              Interrompre
            </button>
            <button
              type="button"
              disabled={selectedOption === null}
              onClick={handleValidate}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-800 disabled:opacity-50"
            >
              {step === TOTAL_DIAG_QUESTIONS ? 'Voir mon bilan' : 'Question suivante'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Évaluation initiale intelligente (Test de positionnement)
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Un diagnostic adaptatif rapide ({TOTAL_DIAG_QUESTIONS} questions) qui ajuste sa difficulté à chaque réponse pour calibrer ton programme sur mesure.
          </p>
        </div>
        <button
          type="button"
          onClick={handleStart}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-bold text-white shadow hover:bg-blue-800"
        >
          {finishedResult ? <RotateCcw className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {finishedResult ? 'Refaire un positionnement' : 'Démarrer le test (5 min)'}
        </button>
      </div>

      {/* Introductory Explanation Card */}
      {!finishedResult && (
        <section className="hc-card rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/80 to-white p-6 dark:border-blue-900 dark:from-blue-950/40 dark:to-slate-900">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900">
              <Compass className="h-6 w-6 text-blue-700 dark:text-blue-400" />
              <h2 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                1. Adaptatif en temps réel
              </h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Démarre au niveau moyen, monte vers difficile si tu réussis, ou ajuste vers facile pour cibler exactement tes lacunes.
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900">
              <Target className="h-6 w-6 text-emerald-700 dark:text-emerald-400" />
              <h2 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                2. Profil de compétences
              </h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Identifie tes matières fortes, matières faibles et chapitres prioritaires sur ton examen ({exam.shortName}).
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900">
              <Sparkles className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              <h2 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                3. Programme prêt en 1 clic
              </h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Calcule un volume hebdomadaire réaliste et génère automatiquement tes premières séances hors ligne.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Results Dashboard */}
      {finishedResult && (
        <div className="space-y-5">
          {/* Non-judgmental transparency banner */}
          <div className="flex items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-blue-950 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-100">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-blue-700 dark:text-blue-400" />
            <p>
              <strong>Repère pédagogique bienveillant :</strong> ce résultat n’est jamais un jugement définitif ni une garantie d’examen. Il s’agit d’une estimation ponctuelle destinée uniquement à personnaliser ton programme et concentrer ton temps sur les notions les plus rentables.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-bold uppercase text-slate-500">Niveau estimé</p>
              <p className="mt-1 text-2xl font-extrabold capitalize text-blue-700 dark:text-blue-400">
                {finishedResult.estimatedLevel === 'debutant'
                  ? 'Fondations'
                  : finishedResult.estimatedLevel === 'intermediaire'
                  ? 'Intermédiaire'
                  : 'Avancé'}
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Score diagnostic : {finishedResult.overallScore} %
              </p>
            </div>
            <div className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-bold uppercase text-slate-500">Temps conseillé</p>
              <p className="mt-1 flex items-center gap-1.5 text-2xl font-extrabold text-emerald-700 dark:text-emerald-400">
                <Clock className="h-5 w-5" />
                {finishedResult.recommendedWeeklyHours} h / sem.
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Rythme réaliste avec jour de repos préservé
              </p>
            </div>
            <div className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-bold uppercase text-slate-500">Objectif réaliste (30 j)</p>
              <p className="mt-1 flex items-center gap-1.5 text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                <TrendingUp className="h-5 w-5" />
                {Math.min(95, Math.max(70, finishedResult.overallScore + 20))} %
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                En révisant tes chapitres prioritaires
              </p>
            </div>
          </div>

          {/* Strong vs Weak subjects */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="hc-card rounded-2xl border border-emerald-200 bg-white p-5 dark:border-emerald-900 dark:bg-slate-900">
              <h2 className="flex items-center gap-2 text-sm font-extrabold text-emerald-800 dark:text-emerald-300">
                <Award className="h-4 w-4" />
                Points forts repérés
              </h2>
              <div className="mt-3 space-y-2">
                {finishedResult.strongSubjectIds.length === 0 ? (
                  <p className="text-xs text-slate-500">
                    Toutes les matières ont une belle marge de progression : c’est parfait pour démarrer sur de bonnes bases !
                  </p>
                ) : (
                  finishedResult.strongSubjectIds.map((id) => {
                    const subj = SUBJECTS.find((s) => s.id === id);
                    const sc = finishedResult.subjectScores.find((x) => x.subjectId === id)?.score ?? 0;
                    return (
                      <div key={id} className="flex items-center justify-between rounded-xl bg-emerald-50/70 px-3 py-2 text-xs font-bold dark:bg-emerald-950/40">
                        <span>{subj?.name ?? id}</span>
                        <span className="text-emerald-700 dark:text-emerald-300">{sc} %</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="hc-card rounded-2xl border border-amber-200 bg-white p-5 dark:border-amber-900 dark:bg-slate-900">
              <h2 className="flex items-center gap-2 text-sm font-extrabold text-amber-800 dark:text-amber-300">
                <Target className="h-4 w-4" />
                Matières & chapitres prioritaires
              </h2>
              <div className="mt-3 space-y-2">
                {finishedResult.priorityChapterIds.length === 0 ? (
                  <p className="text-xs text-slate-500">
                    Aucune lacune critique détectée ! Passe directement aux examens blancs chronométrés pour viser l’excellence.
                  </p>
                ) : (
                  finishedResult.priorityChapterIds.map((chId) => {
                    const ch = CHAPTERS.find((c) => c.id === chId);
                    if (!ch) return null;
                    return (
                      <div key={chId} className="flex items-center justify-between gap-2 rounded-xl bg-amber-50/70 px-3 py-2 text-xs dark:bg-amber-950/30">
                        <span className="font-bold text-slate-800 dark:text-slate-100">{ch.title}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFicheId(ch.ficheId);
                            navigate('fiche-viewer');
                          }}
                          className="shrink-0 rounded-lg bg-white px-2.5 py-1 font-bold text-blue-700 shadow-sm dark:bg-slate-800 dark:text-blue-300"
                        >
                          Voir fiche
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="hc-card flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                Premières actions recommandées
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Applique ce bilan pour régénérer automatiquement ton programme personnalisé sur 14 jours.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  saveDiagnosticResult(finishedResult, true);
                  navigate('planner');
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700"
              >
                <CheckCircle2 className="h-4 w-4" />
                Appliquer à mon programme
              </button>
              <button
                type="button"
                onClick={() => {
                  const targetQs = allQuestions
                    .filter((q) => finishedResult.priorityChapterIds.includes(q.chapterId))
                    .slice(0, 5)
                    .map((q) => q.id);
                  startPractice({
                    mode: 'libre',
                    title: 'Session ciblée post-diagnostic',
                    questionIds: targetQs.length > 0 ? targetQs : pool.slice(0, 5).map((q) => q.id),
                    immediateFeedback: true,
                  });
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-800"
              >
                <Play className="h-4 w-4" />
                Lancer la 1re séance ciblée
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
