import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Award,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  FileEdit,
  Flame,
  HelpCircle,
  Layers,
  ListOrdered,
  Pause,
  Play,
  RotateCcw,
  Save,
  Shuffle,
  Sparkles,
  Target,
  XCircle,
} from 'lucide-react';
import {
  CHAPTERS,
  COURSES,
  SELECTABLE_CLASS_LEVELS,
  SUBJECTS,
  chapterMatchesLevel,
  useApp,
} from '../context/AppContext';
import { saveActiveMethodSessionToCloud } from '../lib/supabaseSync';
import { ActiveMethodMode, ActiveMethodSessionRecord, ClassLevelId, Fiche } from '../types';

const STORAGE_KEY = 'reussite_active_method_history_v16';

const STOP_WORDS = new Set([
  'dans', 'pour', 'avec', 'sans', 'sous', 'vers', 'chez', 'entre', 'contre', 'depuis',
  'pendant', 'avant', 'apres', 'mais', 'donc', 'alors', 'ainsi', 'comme', 'plus', 'moins',
  'tres', 'bien', 'tout', 'tous', 'toute', 'toutes', 'cette', 'ceux', 'celles', 'leur',
  'leurs', 'notre', 'votre', 'elle', 'elles', 'nous', 'vous', 'sont', 'etre', 'avoir',
  'fait', 'faire', 'peut', 'doit', 'dont', 'quoi', 'quand', 'quel', 'quelle', 'quels',
  'quelles', 'afin', 'aussi', 'meme', 'autre', 'autres', 'chaque', 'selon', 'grace',
  'etre', 'etait', 'sera', 'etant', 'cela', 'ceci', 'soit', 'entre', 'cest', 'dune',
  'dun', 'des', 'les', 'une', 'aux', 'par', 'sur', 'est', 'qui', 'que', 'pas',
]);

function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractKeywords(fiche: Fiche | undefined, chapterTitle: string, summary: string): string[] {
  const rawPool: string[] = [chapterTitle, summary];
  if (fiche) {
    rawPool.push(...fiche.notionsEssentielles);
    rawPool.push(...fiche.definitions.map((d) => `${d.terme} ${d.definition}`));
    rawPool.push(...fiche.formules.map((f) => `${f.label} ${f.formule}`));
    rawPool.push(...fiche.erreursFrequentes);
    rawPool.push(fiche.resumeExpress);
  }
  const counts = new Map<string, { display: string; norm: string; score: number }>();
  for (const chunk of rawPool) {
    const tokens = chunk.split(/[^a-zA-ZÀ-ÿ0-9]+/).filter(Boolean);
    for (const tok of tokens) {
      const norm = normalizeText(tok);
      if (norm.length < 4 || STOP_WORDS.has(norm) || /^\d+$/.test(norm)) continue;
      const existing = counts.get(norm);
      if (existing) {
        existing.score += 1;
      } else {
        counts.set(norm, { display: tok, norm, score: 1 });
      }
    }
  }
  return Array.from(counts.values())
    .sort((a, b) => b.score - a.score || b.norm.length - a.norm.length)
    .slice(0, 12)
    .map((item) => item.display);
}

interface ClozeChallenge {
  id: string;
  label: string;
  before: string;
  after: string;
  answer: string;
  hint: string;
}

function buildClozeChallenges(
  fiche: Fiche | undefined,
  chapterTitle: string,
  summary: string
): ClozeChallenge[] {
  const sources: { label: string; text: string }[] = [];
  if (fiche?.resumeExpress) {
    sources.push({ label: 'Résumé express', text: fiche.resumeExpress });
  }
  if (fiche?.definitions?.length) {
    fiche.definitions.slice(0, 2).forEach((d, idx) => {
      sources.push({ label: `Définition ${idx + 1} (${d.terme})`, text: d.definition });
    });
  }
  if (fiche?.notionsEssentielles?.length) {
    fiche.notionsEssentielles.slice(0, 2).forEach((n, idx) => {
      sources.push({ label: `Notion clé ${idx + 1}`, text: n });
    });
  }
  if (fiche?.erreursFrequentes?.length) {
    sources.push({ label: 'Piège à éviter', text: fiche.erreursFrequentes[0] });
  }
  if (sources.length < 3) {
    sources.push({ label: 'Synthèse du chapitre', text: `${chapterTitle} : ${summary}` });
  }

  const result: ClozeChallenge[] = [];
  sources.slice(0, 5).forEach((src, idx) => {
    const words = src.text.match(/[a-zA-ZÀ-ÿ]{5,}/g) ?? [];
    const candidate = words.find((w) => !STOP_WORDS.has(normalizeText(w))) ?? words[0];
    if (!candidate) return;
    const pos = src.text.indexOf(candidate);
    if (pos < 0) return;
    result.push({
      id: `cloze-${idx}`,
      label: src.label,
      before: src.text.slice(0, pos),
      after: src.text.slice(pos + candidate.length),
      answer: candidate,
      hint: `${candidate[0]}… (${candidate.length} lettres)`,
    });
  });
  return result;
}

function loadHistory(): ActiveMethodSessionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHistory(items: ActiveMethodSessionRecord[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, 80)));
  } catch {
    // Ignore storage quota errors
  }
}

function formatClock(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
}

export const ActiveMethodScreen: React.FC = () => {
  const {
    activeProfile,
    allFiches,
    allQuestions,
    selectedSubjectId,
    setSelectedSubjectId,
    setSelectedCourseId,
    setSelectedFicheId,
    navigate,
    addNote,
    notify,
    isOnline,
  } = useApp();

  const [mode, setMode] = useState<ActiveMethodMode>('feynman');
  const [subjectId, setSubjectId] = useState<string>(selectedSubjectId || SUBJECTS[0].id);
  const [classFilter, setClassFilter] = useState<'all' | ClassLevelId>('all');
  const [history, setHistory] = useState<ActiveMethodSessionRecord[]>(() => loadHistory());

  const subjectChapters = useMemo(() => {
    const base = CHAPTERS.filter((c) => c.subjectId === subjectId).sort((a, b) => a.order - b.order);
    if (classFilter === 'all') return base;
    const filtered = base.filter((c) => chapterMatchesLevel(c.classLevel, classFilter, c.subjectId));
    return filtered.length > 0 ? filtered : base;
  }, [subjectId, classFilter]);

  const [chapterId, setChapterId] = useState<string>(() => subjectChapters[0]?.id ?? CHAPTERS[0].id);

  useEffect(() => {
    if (!subjectChapters.some((c) => c.id === chapterId) && subjectChapters[0]) {
      setChapterId(subjectChapters[0].id);
    }
  }, [subjectChapters, chapterId]);

  const subject = useMemo(
    () => SUBJECTS.find((s) => s.id === subjectId) ?? SUBJECTS[0],
    [subjectId]
  );
  const chapter = useMemo(
    () => subjectChapters.find((c) => c.id === chapterId) ?? subjectChapters[0] ?? CHAPTERS[0],
    [subjectChapters, chapterId]
  );
  const course = useMemo(
    () => COURSES.find((c) => c.id === chapter.courseId || c.chapterId === chapter.id),
    [chapter]
  );
  const fiche = useMemo(
    () => allFiches.find((f) => f.id === chapter.ficheId || f.chapterId === chapter.id),
    [allFiches, chapter]
  );
  const chapterQuestion = useMemo(
    () => allQuestions.find((q) => q.chapterId === chapter.id),
    [allQuestions, chapter]
  );

  // --- Mode 1: Feynman state ---
  const [feynmanText, setFeynmanText] = useState('');
  const [feynmanEvaluated, setFeynmanEvaluated] = useState(false);
  const [showModelSummary, setShowModelSummary] = useState(false);
  const [feynmanStartTs, setFeynmanStartTs] = useState<number>(() => Date.now());

  const keywords = useMemo(
    () => extractKeywords(fiche, chapter.title, chapter.summary),
    [fiche, chapter.title, chapter.summary]
  );

  const feynmanAnalysis = useMemo(() => {
    const normInput = normalizeText(feynmanText);
    const matched: string[] = [];
    const missed: string[] = [];
    for (const kw of keywords) {
      const normKw = normalizeText(kw);
      const stem = normKw.length > 6 ? normKw.slice(0, normKw.length - 2) : normKw;
      if (normInput.includes(stem)) {
        matched.push(kw);
      } else {
        missed.push(kw);
      }
    }
    const wordCount = feynmanText.trim() ? feynmanText.trim().split(/\s+/).length : 0;
    const kwScore = keywords.length > 0 ? Math.round((matched.length / keywords.length) * 100) : 0;
    const depthBonus = wordCount >= 45 ? 15 : wordCount >= 25 ? 8 : 0;
    const score = Math.min(100, Math.round(kwScore * 0.85 + depthBonus));
    return { matched, missed, wordCount, score };
  }, [feynmanText, keywords]);

  // --- Mode 2: Cloze Recall state ---
  const clozeItems = useMemo(
    () => buildClozeChallenges(fiche, chapter.title, chapter.summary),
    [fiche, chapter.title, chapter.summary]
  );
  const [clozeInputs, setClozeInputs] = useState<Record<string, string>>({});
  const [clozeHintsShown, setClozeHintsShown] = useState<Record<string, boolean>>({});
  const [clozeChecked, setClozeChecked] = useState(false);

  // --- Mode 3: Step Sequencing state ---
  const orderedSteps = useMemo(() => {
    if (fiche?.methodes && fiche.methodes.length >= 3) {
      return fiche.methodes.slice(0, 5);
    }
    if (course?.sections && course.sections.length >= 3) {
      return course.sections.slice(0, 5).map((s) => `${s.heading} — ${s.keyTakeaway}`);
    }
    if (chapterQuestion?.steps && chapterQuestion.steps.length >= 3) {
      return chapterQuestion.steps.slice(0, 5);
    }
    return [
      `1. Identifier le cadre et la problématique de « ${chapter.title} »`,
      `2. Mobiliser la définition et la règle clé du chapitre`,
      `3. Appliquer sur un cas concret ou un calcul vérifié`,
      `4. Vérifier les pièges classiques et conclure rigoureusement`,
    ];
  }, [fiche, course, chapterQuestion, chapter.title]);

  const [seqOrder, setSeqOrder] = useState<number[]>([]);
  const [seqChecked, setSeqChecked] = useState(false);

  useEffect(() => {
    // Deterministic-then-shuffled initial order that is not already sorted
    const indices = orderedSteps.map((_, idx) => idx);
    if (indices.length > 1) {
      const rotated = [...indices.slice(1), indices[0]].reverse();
      setSeqOrder(rotated);
    } else {
      setSeqOrder(indices);
    }
    setSeqChecked(false);
  }, [orderedSteps]);

  // --- Mode 4: Exam Essay + Pomodoro + /20 Rubric ---
  const [essayText, setEssayText] = useState('');
  const [pomoDurationMin, setPomoDurationMin] = useState<15 | 25 | 40>(25);
  const [pomoSecondsLeft, setPomoSecondsLeft] = useState(25 * 60);
  const [pomoRunning, setPomoRunning] = useState(false);
  const [rubricPlan, setRubricPlan] = useState(3); // /5
  const [rubricNotions, setRubricNotions] = useState(4); // /6
  const [rubricExamples, setRubricExamples] = useState(3); // /5
  const [rubricTraps, setRubricTraps] = useState(3); // /4
  const [essaySaved, setEssaySaved] = useState(false);

  // Reset per-chapter interactive inputs when chapter changes
  useEffect(() => {
    setFeynmanText('');
    setFeynmanEvaluated(false);
    setShowModelSummary(false);
    setFeynmanStartTs(Date.now());
    setClozeInputs({});
    setClozeHintsShown({});
    setClozeChecked(false);
    setEssayText('');
    setEssaySaved(false);
  }, [chapter.id]);

  // Pomodoro tick
  useEffect(() => {
    if (!pomoRunning) return;
    const t = window.setInterval(() => {
      setPomoSecondsLeft((prev) => {
        if (prev <= 1) {
          setPomoRunning(false);
          notify('⏰ Pomodoro terminé ! Auto-évalue maintenant ta copie avec la grille /20.', 'success');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [pomoRunning, notify]);

  const recordSession = (
    sessionMode: ActiveMethodMode,
    scorePercent: number,
    durationSeconds: number,
    options?: { gradeOutOf20?: number; notesPreview?: string }
  ) => {
    const rec: ActiveMethodSessionRecord = {
      id: `am-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      mode: sessionMode,
      subjectId: subject.id,
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      scorePercent,
      gradeOutOf20: options?.gradeOutOf20,
      durationSeconds,
      completedAt: new Date().toISOString(),
      notesPreview: options?.notesPreview,
    };
    const next = [rec, ...history];
    setHistory(next);
    saveHistory(next);
    if (isOnline) {
      void saveActiveMethodSessionToCloud(activeProfile?.id, rec);
    }
  };

  const handleEvaluateFeynman = () => {
    if (feynmanAnalysis.wordCount < 8) {
      notify('Écris au moins une phrase complète (8 mots) avant de lancer l’analyse Feynman.', 'warning');
      return;
    }
    setFeynmanEvaluated(true);
    const elapsed = Math.max(10, Math.round((Date.now() - feynmanStartTs) / 1000));
    recordSession('feynman', feynmanAnalysis.score, elapsed, {
      notesPreview: feynmanText.slice(0, 180),
    });
    notify(`Méthode Feynman évaluée : ${feynmanAnalysis.score} % de couverture active !`, 'success');
  };

  const handleSaveFeynmanToNotes = () => {
    if (!feynmanText.trim()) return;
    addNote({
      targetType: 'fiche',
      targetId: fiche?.id ?? chapter.id,
      targetTitle: `[Feynman ${feynmanAnalysis.score}%] ${chapter.title}`,
      subjectId: subject.id,
      content: `${feynmanText.trim()}\n\n— Notions à renforcer : ${
        feynmanAnalysis.missed.length > 0 ? feynmanAnalysis.missed.join(', ') : 'Aucune, excellente restitution !'
      }`,
    });
    notify('Restitution Feynman enregistrée dans tes Notes personnelles (hors ligne).', 'success');
  };

  const clozeResults = useMemo(() => {
    let ok = 0;
    const flags = clozeItems.map((item) => {
      const userVal = normalizeText(clozeInputs[item.id] ?? '');
      const targetVal = normalizeText(item.answer);
      const isMatch =
        userVal.length > 0 &&
        (userVal === targetVal ||
          (targetVal.length >= 6 && userVal.startsWith(targetVal.slice(0, targetVal.length - 1))));
      if (isMatch) ok += 1;
      return isMatch;
    });
    const pct = clozeItems.length > 0 ? Math.round((ok / clozeItems.length) * 100) : 0;
    return { ok, total: clozeItems.length, pct, flags };
  }, [clozeItems, clozeInputs]);

  const handleCheckCloze = () => {
    setClozeChecked(true);
    recordSession('cloze', clozeResults.pct, 90);
    notify(`Texte à trous corrigé : ${clozeResults.ok}/${clozeResults.total} (${clozeResults.pct} %).`, 'info');
  };

  const moveStep = (pos: number, dir: -1 | 1) => {
    const nextPos = pos + dir;
    if (nextPos < 0 || nextPos >= seqOrder.length) return;
    const copy = [...seqOrder];
    const tmp = copy[pos];
    copy[pos] = copy[nextPos];
    copy[nextPos] = tmp;
    setSeqOrder(copy);
    setSeqChecked(false);
  };

  const seqCorrectCount = useMemo(
    () => seqOrder.filter((origIdx, currentPos) => origIdx === currentPos).length,
    [seqOrder]
  );

  const handleCheckSequence = () => {
    setSeqChecked(true);
    const pct = seqOrder.length > 0 ? Math.round((seqCorrectCount / seqOrder.length) * 100) : 0;
    recordSession('sequencing', pct, 75);
    notify(
      pct === 100
        ? 'Parfait ! Séquence logique maîtrisée à 100 %.'
        : `Séquence vérifiée : ${seqCorrectCount}/${seqOrder.length} étapes bien placées (${pct} %).`,
      pct === 100 ? 'success' : 'info'
    );
  };

  const essayGrade20 = rubricPlan + rubricNotions + rubricExamples + rubricTraps;
  const essayWordCount = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;

  const handleSaveEssay = () => {
    const pct = Math.round((essayGrade20 / 20) * 100);
    const elapsed = Math.max(60, pomoDurationMin * 60 - pomoSecondsLeft);
    recordSession('essay', pct, elapsed, {
      gradeOutOf20: essayGrade20,
      notesPreview: essayText.slice(0, 180),
    });
    if (essayText.trim()) {
      addNote({
        targetType: 'course',
        targetId: course?.id ?? chapter.id,
        targetTitle: `[Rédaction ${essayGrade20}/20] ${chapter.title}`,
        subjectId: subject.id,
        content: `Auto-évaluation : ${essayGrade20}/20 (Plan ${rubricPlan}/5, Notions ${rubricNotions}/6, Exemples ${rubricExamples}/5, Pièges ${rubricTraps}/4)\n\n${essayText.trim()}`,
      });
    }
    setEssaySaved(true);
    notify(`Copie enregistrée (${essayGrade20}/20) dans ton historique et tes Notes !`, 'success');
  };

  const handleRandomChapter = () => {
    if (subjectChapters.length <= 1) return;
    const pick = subjectChapters[Math.floor(Math.random() * subjectChapters.length)];
    setChapterId(pick.id);
  };

  const avgHistoryScore = useMemo(() => {
    if (history.length === 0) return 0;
    return Math.round(history.reduce((acc, h) => acc + h.scorePercent, 0) / history.length);
  }, [history]);

  const tabs: { id: ActiveMethodMode; label: string; subtitle: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'feynman', label: 'Méthode Feynman', subtitle: 'Expliquer sans notes', icon: Brain },
    { id: 'cloze', label: 'Texte à trous actif', subtitle: 'Rappel de mémoire', icon: FileEdit },
    { id: 'sequencing', label: 'Séquençage logique', subtitle: 'Remettre en ordre', icon: ListOrdered },
    { id: 'essay', label: 'Rédaction & /20', subtitle: 'Pomodoro + Grille', icon: Award },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <section className="rounded-2xl bg-gradient-to-r from-indigo-900 via-violet-800 to-fuchsia-800 p-5 text-white shadow-md sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Méthode de Travail Active · 100 % Hors Ligne
            </span>
            <h1 className="mt-2.5 text-2xl font-extrabold sm:text-3xl">
              Atelier Méthode Active (au-delà du QCM)
            </h1>
            <p className="mt-1.5 text-sm text-indigo-100">
              Ancre durablement tes {CHAPTERS.length.toLocaleString('fr-FR')} chapitres ({SUBJECTS.length} matières) grâce à 4 techniques éprouvées par les sciences cognitives :
              rappel libre Feynman, texte à trous actif, séquençage logique et rédaction d’examen chronométrée avec grille /20.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <div className="rounded-xl bg-white/15 px-4 py-2.5 text-center backdrop-blur">
              <p className="text-xl font-extrabold">{history.length}</p>
              <p className="text-[11px] text-indigo-100">Séances actives</p>
            </div>
            <div className="rounded-xl bg-white/15 px-4 py-2.5 text-center backdrop-blur">
              <p className="text-xl font-extrabold">{avgHistoryScore}%</p>
              <p className="text-[11px] text-indigo-100">Maîtrise moyenne</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subject + Class + Chapter Picker */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 md:grid-cols-12">
          <div className="md:col-span-4">
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Matière ({SUBJECTS.length} disponibles)
            </label>
            <select
              value={subjectId}
              onChange={(e) => {
                setSubjectId(e.target.value);
                setSelectedSubjectId(e.target.value);
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Classe
            </label>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value as 'all' | ClassLevelId)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="all">Toutes les classes</option>
              {SELECTABLE_CLASS_LEVELS.map((cl) => (
                <option key={cl.id} value={cl.id}>
                  {cl.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-4">
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Chapitre cible ({subjectChapters.length} chapitres)
            </label>
            <select
              value={chapter.id}
              onChange={(e) => setChapterId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {subjectChapters.map((c) => (
                <option key={c.id} value={c.id}>
                  Ch. {c.order} — {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-2 md:col-span-2">
            <button
              type="button"
              onClick={handleRandomChapter}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2.5 text-xs font-bold text-indigo-800 hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-200"
              title="Tirer un chapitre au hasard dans cette matière"
            >
              <Shuffle className="h-4 w-4" />
              Aléatoire
            </button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
              Chapitre {chapter.order}/{subjectChapters.length}
            </span>
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              Niveau : {chapter.classLevel?.toUpperCase() ?? 'Général'}
            </span>
            <span className="truncate font-medium">{chapter.title}</span>
          </div>
          <div className="flex items-center gap-2">
            {course && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCourseId(course.id);
                  navigate('course-reader');
                }}
                className="inline-flex items-center gap-1 font-bold text-blue-700 hover:underline dark:text-blue-400"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Relire le cours
              </button>
            )}
            {fiche && (
              <button
                type="button"
                onClick={() => {
                  setSelectedFicheId(fiche.id);
                  navigate('fiche-viewer');
                }}
                className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:underline dark:text-emerald-400"
              >
                <Layers className="h-3.5 w-3.5" />
                Voir la fiche
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 4 Method Tabs */}
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = mode === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setMode(t.id)}
              className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition ${
                active
                  ? 'border-indigo-600 bg-indigo-50 shadow-sm ring-1 ring-indigo-600 dark:border-indigo-400 dark:bg-indigo-950/60'
                  : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  active
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold text-slate-900 dark:text-white">
                  {t.label}
                </p>
                <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                  {t.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* MODE 1: FEYNMAN ACTIVE RECALL */}
      {mode === 'feynman' && (
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900 dark:text-white">
                <Brain className="h-5 w-5 text-indigo-600" />
                Méthode Feynman — Explique « {chapter.title} » simplement
              </h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Ferme tes notes et explique ce chapitre avec tes propres mots comme si tu l’enseignais à un camarade :
                définition, règle/formule clé, exemple concret et piège à éviter.
              </p>
            </div>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              {feynmanAnalysis.wordCount} mots rédigés
            </span>
          </div>

          <textarea
            value={feynmanText}
            onChange={(e) => {
              setFeynmanText(e.target.value);
              if (feynmanEvaluated) setFeynmanEvaluated(false);
            }}
            rows={7}
            placeholder={`Explique de mémoire : qu’est-ce que « ${chapter.title} » ? Quelle est la règle ou formule essentielle ? Quel piège faut-il absolument éviter à l’examen ?`}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/70 dark:text-white dark:focus:bg-slate-800"
          />

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleEvaluateFeynman}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-700"
            >
              <Target className="h-4 w-4" />
              Analyser ma restitution hors ligne
            </button>
            <button
              type="button"
              onClick={() => setShowModelSummary((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {showModelSummary ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showModelSummary ? 'Masquer le corrigé modèle' : 'Comparer avec la synthèse modèle'}
            </button>
            <button
              type="button"
              onClick={handleSaveFeynmanToNotes}
              disabled={!feynmanText.trim()}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 disabled:opacity-40 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200"
            >
              <Save className="h-4 w-4" />
              Sauvegarder dans mes Notes
            </button>
          </div>

          {feynmanEvaluated && (
            <div className="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4 dark:border-indigo-900 dark:bg-indigo-950/40">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-extrabold text-indigo-950 dark:text-indigo-100">
                  Score de rappel actif Feynman : {feynmanAnalysis.score} %
                </p>
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                  {feynmanAnalysis.matched.length}/{keywords.length} mots-clés essentiels détectés
                </span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-indigo-200/70 dark:bg-indigo-900">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all"
                  style={{ width: `${feynmanAnalysis.score}%` }}
                />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="mb-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    ✅ Notions bien restituées ({feynmanAnalysis.matched.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {feynmanAnalysis.matched.length > 0 ? (
                      feynmanAnalysis.matched.map((kw) => (
                        <span
                          key={kw}
                          className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-100"
                        >
                          {kw}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">Aucun mot-clé détecté pour l’instant.</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="mb-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
                    ⚠️ Notions oubliées à ré-intégrer ({feynmanAnalysis.missed.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {feynmanAnalysis.missed.length > 0 ? (
                      feynmanAnalysis.missed.map((kw) => (
                        <span
                          key={kw}
                          className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900 dark:bg-amber-900/60 dark:text-amber-100"
                        >
                          {kw}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-emerald-700 font-semibold">Couverture complète !</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {showModelSummary && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200">
              <p className="font-extrabold text-slate-900 dark:text-white">
                Synthèse officielle de référence :
              </p>
              <p className="mt-1">{fiche?.resumeExpress ?? chapter.summary}</p>
              {fiche?.erreursFrequentes?.[0] && (
                <p className="mt-2 font-semibold text-amber-800 dark:text-amber-300">
                  Piège classique : {fiche.erreursFrequentes[0]}
                </p>
              )}
            </div>
          )}
        </section>
      )}

      {/* MODE 2: CLOZE ACTIVE RECALL */}
      {mode === 'cloze' && (
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900 dark:text-white">
                <FileEdit className="h-5 w-5 text-indigo-600" />
                Texte à trous actif (Cloze Recall)
              </h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Retrouve de mémoire chaque concept clé masqué dans la fiche du chapitre (insensible aux accents et majuscules).
              </p>
            </div>
            {clozeChecked && (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-100">
                Score : {clozeResults.ok}/{clozeResults.total} ({clozeResults.pct} %)
              </span>
            )}
          </div>

          <div className="space-y-3">
            {clozeItems.map((item, idx) => {
              const isRight = clozeChecked && clozeResults.flags[idx];
              const isWrong = clozeChecked && !clozeResults.flags[idx];
              return (
                <div
                  key={item.id}
                  className={`rounded-xl border p-4 ${
                    isRight
                      ? 'border-emerald-300 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-950/30'
                      : isWrong
                      ? 'border-red-300 bg-red-50/60 dark:border-red-800 dark:bg-red-950/30'
                      : 'border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-800/40'
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
                      {item.label}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setClozeHintsShown((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                      }
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-indigo-600"
                    >
                      <HelpCircle className="h-3.5 w-3.5" />
                      {clozeHintsShown[item.id] ? `Indice : ${item.hint}` : 'Indice'}
                    </button>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-100">
                    {item.before}
                    <input
                      type="text"
                      value={clozeInputs[item.id] ?? ''}
                      onChange={(e) => {
                        setClozeInputs((prev) => ({ ...prev, [item.id]: e.target.value }));
                        if (clozeChecked) setClozeChecked(false);
                      }}
                      placeholder="Mot clé..."
                      className="mx-1 inline-block w-40 rounded-lg border-2 border-indigo-300 bg-white px-2.5 py-0.5 text-sm font-bold text-indigo-900 focus:border-indigo-600 focus:outline-none dark:border-indigo-700 dark:bg-slate-900 dark:text-indigo-200"
                    />
                    {item.after}
                  </p>
                  {clozeChecked && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs font-bold">
                      {isRight ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                          <CheckCircle2 className="h-4 w-4" /> Exact ! ({item.answer})
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-700 dark:text-red-400">
                          <XCircle className="h-4 w-4" /> Réponse attendue : « {item.answer} »
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={handleCheckCloze}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700"
            >
              <CheckCircle2 className="h-4 w-4" />
              Vérifier mes réponses
            </button>
            <button
              type="button"
              onClick={() => {
                setClozeInputs({});
                setClozeChecked(false);
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
            >
              <RotateCcw className="h-4 w-4" />
              Réinitialiser
            </button>
          </div>
        </section>
      )}

      {/* MODE 3: STEP SEQUENCING */}
      {mode === 'sequencing' && (
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900 dark:text-white">
                <ListOrdered className="h-5 w-5 text-indigo-600" />
                Séquençage & Raisonnement étape par étape
              </h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Remets les étapes méthodologiques de ce chapitre dans le bon ordre logique avec les flèches Monter / Descendre.
              </p>
            </div>
            {seqChecked && (
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-extrabold text-indigo-900 dark:bg-indigo-900/60 dark:text-indigo-100">
                {seqCorrectCount}/{seqOrder.length} étapes en bonne position
              </span>
            )}
          </div>

          <div className="space-y-2.5">
            {seqOrder.map((origIdx, pos) => {
              const text = orderedSteps[origIdx] ?? '';
              const isOk = seqChecked && origIdx === pos;
              const isBad = seqChecked && origIdx !== pos;
              return (
                <div
                  key={`${origIdx}-${pos}`}
                  className={`flex items-center justify-between gap-3 rounded-xl border p-3.5 ${
                    isOk
                      ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40'
                      : isBad
                      ? 'border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40'
                      : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-xs font-extrabold text-white">
                      {pos + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{text}</p>
                      {isBad && (
                        <p className="mt-1 text-[11px] font-bold text-amber-800 dark:text-amber-300">
                          Position attendue : étape #{origIdx + 1}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      disabled={pos === 0}
                      onClick={() => moveStep(pos, -1)}
                      className="rounded-lg border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-100 disabled:opacity-30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                      aria-label="Monter cette étape"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      disabled={pos === seqOrder.length - 1}
                      onClick={() => moveStep(pos, 1)}
                      className="rounded-lg border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-100 disabled:opacity-30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                      aria-label="Descendre cette étape"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={handleCheckSequence}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700"
            >
              <CheckCircle2 className="h-4 w-4" />
              Vérifier l’ordre logique
            </button>
            <button
              type="button"
              onClick={() => {
                setSeqOrder(orderedSteps.map((_, i) => i));
                setSeqChecked(true);
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
            >
              Afficher l’ordre officiel
            </button>
          </div>
        </section>
      )}

      {/* MODE 4: EXAM ESSAY + POMODORO + /20 RUBRIC */}
      {mode === 'essay' && (
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-900 p-4 text-white dark:bg-slate-950">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                Chronomètre Pomodoro d’épreuve écrite
              </p>
              <p className="mt-0.5 text-2xl font-black tracking-tight tabular-nums">
                {formatClock(pomoSecondsLeft)}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {([15, 25, 40] as const).map((min) => (
                <button
                  key={min}
                  type="button"
                  onClick={() => {
                    setPomoDurationMin(min);
                    setPomoSecondsLeft(min * 60);
                    setPomoRunning(false);
                  }}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-bold ${
                    pomoDurationMin === min
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white/10 text-slate-200 hover:bg-white/20'
                  }`}
                >
                  {min} min
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPomoRunning((r) => !r)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-1.5 text-xs font-extrabold text-slate-950 hover:bg-emerald-400"
              >
                {pomoRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {pomoRunning ? 'Pause' : 'Démarrer'}
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-4 dark:border-indigo-900 dark:bg-indigo-950/40">
            <p className="text-xs font-bold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
              Sujet de rédaction / cas pratique ({subject.shortName} · Ch. {chapter.order})
            </p>
            <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
              « En vous appuyant sur le programme de {subject.name}, présentez de manière structurée les enjeux,
              règles fondamentales, applications concrètes et limites/pièges autour de : {chapter.title}. »
            </p>
            <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300">
              Plan conseillé : Introduction (définition + problématique) → I. Fondements & mécanismes clés → II.
              Applications pratiques & maîtrise des pièges → Conclusion synthétique.
            </p>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold">Ta copie rédigée (hors ligne)</span>
              <span>{essayWordCount} mots</span>
            </div>
            <textarea
              value={essayText}
              onChange={(e) => {
                setEssayText(e.target.value);
                setEssaySaved(false);
              }}
              rows={8}
              placeholder="Introduction : ...&#10;&#10;I. Principes fondamentaux et définitions...&#10;&#10;II. Mise en pratique, exemple chiffré ou cas réel, et pièges à éviter...&#10;&#10;Conclusion : ..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/70 dark:text-white"
            />
          </div>

          {/* Interactive /20 Self-Grading Rubric */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Grille d’auto-correction officielle sur 20
              </h3>
              <span className="rounded-full bg-indigo-600 px-3 py-1 text-sm font-black text-white">
                {essayGrade20} / 20
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block rounded-xl bg-white p-3 dark:bg-slate-900">
                <div className="flex justify-between text-xs font-bold">
                  <span>Problématique & Plan structuré</span>
                  <span className="text-indigo-600">{rubricPlan}/5</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={5}
                  value={rubricPlan}
                  onChange={(e) => setRubricPlan(Number(e.target.value))}
                  className="mt-2 w-full accent-indigo-600"
                />
              </label>

              <label className="block rounded-xl bg-white p-3 dark:bg-slate-900">
                <div className="flex justify-between text-xs font-bold">
                  <span>Exactitude des notions & formules</span>
                  <span className="text-indigo-600">{rubricNotions}/6</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={6}
                  value={rubricNotions}
                  onChange={(e) => setRubricNotions(Number(e.target.value))}
                  className="mt-2 w-full accent-indigo-600"
                />
              </label>

              <label className="block rounded-xl bg-white p-3 dark:bg-slate-900">
                <div className="flex justify-between text-xs font-bold">
                  <span>Argumentation & Exemples concrets</span>
                  <span className="text-indigo-600">{rubricExamples}/5</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={5}
                  value={rubricExamples}
                  onChange={(e) => setRubricExamples(Number(e.target.value))}
                  className="mt-2 w-full accent-indigo-600"
                />
              </label>

              <label className="block rounded-xl bg-white p-3 dark:bg-slate-900">
                <div className="flex justify-between text-xs font-bold">
                  <span>Pièges évités & Clarté rédactionnelle</span>
                  <span className="text-indigo-600">{rubricTraps}/4</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={4}
                  value={rubricTraps}
                  onChange={(e) => setRubricTraps(Number(e.target.value))}
                  className="mt-2 w-full accent-indigo-600"
                />
              </label>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleSaveEssay}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700"
              >
                <Save className="h-4 w-4" />
                Enregistrer ma note ({essayGrade20}/20) et ma copie
              </button>
              {essaySaved && (
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  ✅ Enregistré localement{isOnline ? ' + synchronisé Supabase' : ''} !
                </span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Recent Active Method History */}
      {history.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
              <Flame className="h-4 w-4 text-amber-500" />
              Historique de tes séances Méthode Active ({history.length})
            </h3>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <Clock className="h-3.5 w-3.5" />
              Sauvegarde 100 % hors ligne
            </span>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {history.slice(0, 6).map((item) => {
              const modeLabel =
                item.mode === 'feynman'
                  ? 'Feynman'
                  : item.mode === 'cloze'
                  ? 'Texte à trous'
                  : item.mode === 'sequencing'
                  ? 'Séquençage'
                  : 'Rédaction /20';
              return (
                <div key={item.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-xs">
                  <div className="min-w-0">
                    <span className="mr-2 rounded-md bg-indigo-50 px-2 py-0.5 font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {modeLabel}
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                      {item.chapterTitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-bold">
                    <span className="text-emerald-700 dark:text-emerald-400">
                      {item.gradeOutOf20 !== undefined ? `${item.gradeOutOf20}/20` : `${item.scorePercent} %`}
                    </span>
                    <span className="text-slate-400">
                      {new Date(item.completedAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
