import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  BookMarked,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ClipboardCheck,
  Eye,
  EyeOff,
  GraduationCap,
  Heart,
  HelpCircle,
  Highlighter,
  Image as ImageIcon,
  Layers,
  Lightbulb,
  PenTool,
  Play,
  Sparkles,
  Star,
  StickyNote,
  Target,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { PedagogicalDiagram } from '../components/PedagogicalDiagram';
import { CHAPTERS, COURSES, SUBJECTS, useApp } from '../context/AppContext';
import { generateOfflineCourseSummary } from '../lib/aiHelper';
import { buildDetailedCourseExperience } from '../lib/courseEnricher';
import { getDiagramMeta } from '../lib/subjectDiagrams';
import { isSpeechSupported, speakFrench, stopSpeaking } from '../lib/speech';

type ReaderViewMode = 'all' | 'course' | 'case' | 'exercises' | 'diagrams' | 'notes';
type ExerciseStatus = 'none' | 'done' | 'review';

const PRACTICAL_STORAGE_KEY = 'reussite_offline_practical_progress_v1';

interface PracticalProgressStore {
  statuses: Record<string, ExerciseStatus>;
  drafts: Record<string, string>;
}

function loadPracticalStore(): PracticalProgressStore {
  try {
    const raw = localStorage.getItem(PRACTICAL_STORAGE_KEY);
    if (!raw) return { statuses: {}, drafts: {} };
    const parsed = JSON.parse(raw) as Partial<PracticalProgressStore>;
    return {
      statuses: parsed.statuses && typeof parsed.statuses === 'object' ? parsed.statuses : {},
      drafts: parsed.drafts && typeof parsed.drafts === 'object' ? parsed.drafts : {},
    };
  } catch {
    return { statuses: {}, drafts: {} };
  }
}

function savePracticalStore(store: PracticalProgressStore) {
  try {
    // Cap drafts to last 120 entries so localStorage stays super lightweight on phones
    const draftEntries = Object.entries(store.drafts).slice(-120);
    localStorage.setItem(
      PRACTICAL_STORAGE_KEY,
      JSON.stringify({
        statuses: store.statuses,
        drafts: Object.fromEntries(draftEntries),
      })
    );
  } catch {
    // ignore storage quota errors
  }
}

export const CourseReaderScreen: React.FC = () => {
  const {
    state,
    selectedCourseId,
    setSelectedCourseId,
    setSelectedFicheId,
    setSelectedSubjectId,
    navigate,
    allQuestions,
    allFiches,
    allFlashcards,
    toggleFavorite,
    toggleCourseCompleted,
    addNote,
    addHighlight,
    startPractice,
    updateAccessibility,
    notify,
  } = useApp();

  const course = useMemo(
    () => COURSES.find((c) => c.id === selectedCourseId) ?? COURSES[0],
    [selectedCourseId]
  );
  const chapter = useMemo(
    () => CHAPTERS.find((c) => c.id === course.chapterId),
    [course.chapterId]
  );
  const subject = useMemo(
    () => SUBJECTS.find((s) => s.id === course.subjectId),
    [course.subjectId]
  );

  // Filter dropdown to ONLY this subject's chapters (~100 instead of 10,000 -> instant mobile performance!)
  const subjectCourses = useMemo(
    () => COURSES.filter((c) => c.subjectId === course.subjectId),
    [course.subjectId]
  );
  const currentCourseIndex = useMemo(
    () => subjectCourses.findIndex((c) => c.id === course.id),
    [subjectCourses, course.id]
  );

  const chapterFiche = useMemo(
    () =>
      allFiches.find(
        (f) => f.id === chapter?.ficheId || f.chapterId === course.chapterId
      ),
    [allFiches, chapter?.ficheId, course.chapterId]
  );

  const chapterQuestions = useMemo(
    () => allQuestions.filter((q) => q.chapterId === course.chapterId),
    [allQuestions, course.chapterId]
  );

  const chapterFlashcards = useMemo(
    () => allFlashcards.filter((fc) => fc.chapterId === course.chapterId),
    [allFlashcards, course.chapterId]
  );

  const detailed = useMemo(
    () =>
      buildDetailedCourseExperience({
        course,
        chapter,
        subject,
        fiche: chapterFiche,
        chapterQuestions,
        chapterFlashcards,
      }),
    [course, chapter, subject, chapterFiche, chapterQuestions, chapterFlashcards]
  );

  const isCompleted = state.completedCourseIds.includes(course.id);
  const isFav = state.favorites.courses.includes(course.id);
  const courseHighlights = state.highlights.filter(
    (h) => h.targetType === 'course' && h.targetId === course.id
  );
  const courseNotes = state.notes.filter(
    (n) => n.targetType === 'course' && n.targetId === course.id
  );

  const [viewMode, setViewMode] = useState<ReaderViewMode>('all');
  const [noteInput, setNoteInput] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [aiResult, setAiResult] = useState<ReturnType<typeof generateOfflineCourseSummary> | null>(
    null
  );
  const [showGlossary, setShowGlossary] = useState(true);
  const [showCaseSolution, setShowCaseSolution] = useState(true);
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});
  const [openSolutions, setOpenSolutions] = useState<Record<string, boolean>>({});
  const [practicalStore, setPracticalStore] = useState<PracticalProgressStore>(() =>
    loadPracticalStore()
  );

  useEffect(() => {
    // Reset transient UI toggles when switching chapter
    setOpenHints({});
    setOpenSolutions({});
    setAiResult(null);
    stopSpeaking();
    setSpeaking(false);
  }, [course.id]);

  const completedExercisesCount = detailed.practicalExercises.filter(
    (ex) => practicalStore.statuses[ex.id] === 'done'
  ).length;
  const exercisesProgressPct = Math.round(
    (completedExercisesCount / Math.max(1, detailed.practicalExercises.length)) * 100
  );

  const setExerciseStatus = (exerciseId: string, status: ExerciseStatus) => {
    setPracticalStore((prev) => {
      const next: PracticalProgressStore = {
        ...prev,
        statuses: { ...prev.statuses, [exerciseId]: status },
      };
      savePracticalStore(next);
      return next;
    });
    if (status === 'done') {
      notify('Exercice pratique validé et sauvegardé hors ligne !', 'success');
    }
  };

  const setExerciseDraft = (exerciseId: string, text: string) => {
    setPracticalStore((prev) => {
      const next: PracticalProgressStore = {
        ...prev,
        drafts: { ...prev.drafts, [exerciseId]: text },
      };
      savePracticalStore(next);
      return next;
    });
  };

  const handleSelectCourse = (nextCourseId: string) => {
    stopSpeaking();
    setSpeaking(false);
    setAiResult(null);
    setSelectedCourseId(nextCourseId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSpeak = () => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    const text = `${course.title}. ${detailed.enrichedSections
      .map(
        (s) =>
          `${s.heading}. ${s.content}. Explication approfondie : ${s.deepExplanation}. Point clé : ${s.keyTakeaway}`
      )
      .join(' ')}`;
    setSpeaking(true);
    speakFrench(text, state.accessibility.audioRate, () => setSpeaking(false));
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    addNote({
      targetType: 'course',
      targetId: course.id,
      targetTitle: course.title,
      subjectId: course.subjectId,
      content: noteInput.trim(),
    });
    setNoteInput('');
  };

  const handleLaunchChapterQuiz = () => {
    const qs =
      chapterQuestions.length > 0
        ? chapterQuestions
        : allQuestions.filter((q) => q.subjectId === course.subjectId).slice(0, 6);
    startPractice({
      mode: 'libre',
      title: `Exercices QCM — ${course.title}`,
      subjectId: course.subjectId,
      questionIds: qs.length > 0 ? qs.map((q) => q.id) : allQuestions.slice(0, 4).map((q) => q.id),
      immediateFeedback: true,
    });
  };

  const prevCourse = currentCourseIndex > 0 ? subjectCourses[currentCourseIndex - 1] : null;
  const nextCourse =
    currentCourseIndex >= 0 && currentCourseIndex < subjectCourses.length - 1
      ? subjectCourses[currentCourseIndex + 1]
      : null;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Top Bar & Subject-Scoped Chapter Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate('chapters')}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-700 dark:text-slate-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux chapitres ({subject?.shortName ?? 'Matière'})
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <select
            aria-label="Changer de chapitre dans cette matière"
            value={course.id}
            onChange={(e) => handleSelectCourse(e.target.value)}
            className="max-w-[260px] rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold sm:max-w-xs dark:border-slate-700 dark:bg-slate-800"
          >
            {subjectCourses.map((c, idx) => (
              <option key={c.id} value={c.id}>
                Ch. {idx + 1} — {c.title}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => {
              const order = ['sm', 'md', 'lg', 'xl'] as const;
              const next = order[(order.indexOf(state.accessibility.fontSize) + 1) % order.length];
              updateAccessibility({ fontSize: next });
            }}
            className="rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-bold dark:border-slate-700"
            title="Changer la taille du texte"
          >
            A±
          </button>

          {isSpeechSupported() && (
            <button
              type="button"
              onClick={handleSpeak}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold ${
                speaking
                  ? 'bg-amber-600 text-white'
                  : 'border border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'
              }`}
            >
              {speaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              {speaking ? 'Arrêter' : 'Écouter'}
            </button>
          )}

          <button
            type="button"
            onClick={() => toggleFavorite('courses', course.id)}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${
              isFav
                ? 'border-rose-300 bg-rose-50 text-rose-600'
                : 'border-slate-300 text-slate-500 dark:border-slate-700'
            }`}
            aria-label="Ajouter aux favoris"
          >
            <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Course Hero Header & View Tabs */}
      <article className="hc-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span
            className="rounded-md px-2.5 py-0.5 text-white"
            style={{ backgroundColor: subject?.color ?? '#1D4ED8' }}
          >
            {subject?.name}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-200">
            <GraduationCap className="h-3.5 w-3.5" />
            {detailed.classLabel}
          </span>
          <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200">
            {detailed.enrichedSections.length} sections détaillées · 1 cas résolu ·{' '}
            {detailed.practicalExercises.length} exercices pratiques
          </span>
          <span className="text-slate-500">
            ~{detailed.estimatedReadMinutes} min cours + {detailed.estimatedPracticeMinutes} min pratique
          </span>
        </div>

        <h1 className="mt-2.5 text-2xl font-extrabold text-slate-900 dark:text-white">
          {course.title}
        </h1>
        <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          Domaine : {detailed.disciplineLabel} · Chapitre{' '}
          {currentCourseIndex >= 0 ? `${currentCourseIndex + 1}/${subjectCourses.length}` : '1'} ·
          100 % disponible hors ligne
        </p>

        {/* Interactive Navigation Tabs */}
        <div className="mt-5 flex flex-wrap gap-1.5 rounded-xl bg-slate-100 p-1.5 dark:bg-slate-800">
          {(
            [
              { id: 'all', label: 'Parcours complet', icon: Layers },
              { id: 'course', label: 'Cours détaillé', icon: BookOpen },
              { id: 'case', label: 'Exemple résolu', icon: Lightbulb },
              {
                id: 'exercises',
                label: `Exercices pratiques (${completedExercisesCount}/${detailed.practicalExercises.length})`,
                icon: PenTool,
              },
              ...(detailed.diagramGallery.length > 0
                ? [
                    {
                      id: 'diagrams' as const,
                      label: `Schémas (${detailed.diagramGallery.length})`,
                      icon: ImageIcon,
                    },
                  ]
                : []),
              { id: 'notes', label: 'Synthèse & Notes', icon: StickyNote },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const active = viewMode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setViewMode(tab.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition ${
                  active
                    ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-900 dark:text-blue-300'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ==================== 1. DETAILED COURSE & DEEP EXPLANATIONS ==================== */}
        {(viewMode === 'all' || viewMode === 'course') && (
          <div className="mt-6 space-y-6">
            {/* Learning Objectives & Prerequisites */}
            <div className="grid gap-4 md:grid-cols-12">
              <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 md:col-span-8 dark:border-blue-900/60 dark:bg-blue-950/30">
                <h2 className="flex items-center gap-2 text-sm font-extrabold text-blue-950 dark:text-blue-100">
                  <Target className="h-4 w-4 text-blue-600" />
                  Objectifs pédagogiques du chapitre
                </h2>
                <ul className="mt-2.5 space-y-1.5 text-xs leading-relaxed text-blue-950/90 dark:text-blue-200">
                  {detailed.learningObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600 dark:text-blue-400" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:col-span-4 dark:border-slate-800 dark:bg-slate-800/60">
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Prérequis & Repères
                </h2>
                <ul className="mt-2.5 space-y-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {detailed.prerequisites.map((pre, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                      <span>{pre}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Glossary / Key Definitions */}
            {detailed.glossary.length > 0 && (
              <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/20">
                <button
                  type="button"
                  onClick={() => setShowGlossary((s) => !s)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="flex items-center gap-2 text-sm font-extrabold text-indigo-950 dark:text-indigo-100">
                    <BookMarked className="h-4 w-4 text-indigo-600" />
                    Définitions & notions indispensables ({detailed.glossary.length})
                  </span>
                  {showGlossary ? (
                    <ChevronUp className="h-4 w-4 text-indigo-600" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-indigo-600" />
                  )}
                </button>
                {showGlossary && (
                  <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {detailed.glossary.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-indigo-200/70 bg-white p-3 text-xs dark:border-indigo-900 dark:bg-slate-900"
                      >
                        <p className="font-extrabold text-indigo-900 dark:text-indigo-200">
                          {item.term}
                        </p>
                        <p className="mt-1 leading-relaxed text-slate-700 dark:text-slate-300">
                          {item.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Enriched Course Sections */}
            {detailed.enrichedSections.map((sec, idx) => (
              <section
                key={sec.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40"
              >
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {sec.heading}
                  </h2>
                  <span className="shrink-0 rounded-full bg-slate-200 px-2.5 py-0.5 text-[11px] font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                    Partie {idx + 1}/{detailed.enrichedSections.length}
                  </span>
                </div>

                {/* Core Course Text */}
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                  {sec.content}
                </p>

                {/* Deep Pedagogical Explanation */}
                <div className="mt-4 rounded-xl border border-blue-200/80 bg-white p-4 dark:border-blue-900/60 dark:bg-slate-900">
                  <p className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                    <Lightbulb className="h-3.5 w-3.5" />
                    Explication approfondie — Comprendre le pourquoi
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                    {sec.deepExplanation}
                  </p>
                </div>

                {/* Formula / Golden Rule */}
                {sec.formula && (
                  <div className="mt-3 rounded-xl border-2 border-blue-300 bg-blue-50 px-4 py-3 font-mono text-sm font-bold text-blue-950 dark:border-blue-700 dark:bg-blue-950/60 dark:text-blue-100">
                    <span className="mb-1 block font-sans text-[11px] font-extrabold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                      Formule / Règle d’or à retenir
                    </span>
                    {sec.formula}
                  </div>
                )}

                {/* Step-by-Step Analytical Breakdown */}
                <div className="mt-4 rounded-xl border border-slate-200 bg-white/90 p-4 dark:border-slate-700 dark:bg-slate-900/70">
                  <p className="text-xs font-extrabold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                    Démarche expliquée étape par étape
                  </p>
                  <ol className="mt-2 space-y-2 text-xs leading-relaxed text-slate-700 dark:text-slate-200">
                    {sec.stepByStepBreakdown.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
                          {sIdx + 1}
                        </span>
                        <span className="pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Concrete Illustration */}
                <div className="mt-3 rounded-xl border border-indigo-200 bg-indigo-50/60 p-3.5 text-xs leading-relaxed text-indigo-950 dark:border-indigo-900/60 dark:bg-indigo-950/30 dark:text-indigo-200">
                  <span className="font-extrabold">Illustration concrète : </span>
                  {sec.concreteIllustration}
                </div>

                {/* Diagram if available */}
                {sec.diagramId && (
                  <div className="mt-4">
                    <PedagogicalDiagram diagramId={sec.diagramId} />
                  </div>
                )}

                {/* Common Mistake Guard */}
                {sec.commonMistakeWarning && (
                  <div className="mt-3 rounded-xl border border-amber-300 bg-amber-50/80 p-3.5 text-xs dark:border-amber-800 dark:bg-amber-950/40">
                    <p className="flex items-center gap-1.5 font-extrabold text-amber-950 dark:text-amber-100">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      Erreur fréquente à éviter
                    </p>
                    <p className="mt-1 text-amber-900 dark:text-amber-200">
                      <span className="font-bold">Piège :</span> {sec.commonMistakeWarning.mistake}
                    </p>
                    <p className="mt-1 text-emerald-900 dark:text-emerald-200">
                      <span className="font-bold">Réflexe correct :</span>{' '}
                      {sec.commonMistakeWarning.fix}
                    </p>
                  </div>
                )}

                {/* Key Takeaway + Highlight */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-xs font-semibold text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                  <span>À retenir : {sec.keyTakeaway}</span>
                  <button
                    type="button"
                    onClick={() =>
                      addHighlight({
                        targetType: 'course',
                        targetId: course.id,
                        text: sec.keyTakeaway,
                        color: 'yellow',
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-lg bg-white/90 px-2.5 py-1 text-[11px] font-bold text-amber-800 hover:bg-white dark:bg-slate-900 dark:text-amber-300"
                  >
                    <Highlighter className="h-3.5 w-3.5" />
                    Surligner
                  </button>
                </div>
              </section>
            ))}
          </div>
        )}

        {/* ==================== 2bis. SCHÉMAS & ILLUSTRATIONS (v17.4) ==================== */}
        {(viewMode === 'all' || viewMode === 'diagrams') && detailed.diagramGallery.length > 0 && (
          <section className="mt-8 rounded-2xl border-2 border-sky-200 bg-sky-50/40 p-5 dark:border-sky-900 dark:bg-sky-950/20">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-base font-extrabold text-sky-950 dark:text-sky-100">
                <ImageIcon className="h-4 w-4 text-sky-600" />
                Schémas & illustrations — {subject?.shortName ?? 'Matière'}
              </h2>
              <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-bold text-sky-800 dark:bg-slate-900 dark:text-sky-300">
                {detailed.diagramGallery.length} schéma{detailed.diagramGallery.length > 1 ? 's' : ''} 100 % hors ligne
              </span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-sky-900/80 dark:text-sky-200/80">
              Ces graphiques vectoriels (SVG) remplacent les images distantes : ils restent nets à tout zoom et
              s’affichent même sans connexion Internet. Utilise-les pour mémoriser les repères visuels clés du
              chapitre « {course.title} ».
            </p>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {detailed.diagramGallery.map((diagramId) => {
                const meta = getDiagramMeta(diagramId);
                return (
                  <div key={diagramId} className="rounded-xl border border-sky-200 bg-white p-3 dark:border-sky-900 dark:bg-slate-900">
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white">{meta.title}</p>
                    <p className="mb-2 text-[11px] leading-snug text-slate-600 dark:text-slate-400">{meta.summary}</p>
                    <PedagogicalDiagram diagramId={diagramId} />
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ==================== 2. FULLY WORKED CASE STUDY ==================== */}
        {(viewMode === 'all' || viewMode === 'case') && (
          <section className="mt-8 rounded-2xl border-2 border-indigo-200 bg-indigo-50/40 p-5 dark:border-indigo-900 dark:bg-indigo-950/20">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2.5 py-0.5 text-[11px] font-bold text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200">
                  <Lightbulb className="h-3.5 w-3.5" />
                  {detailed.workedCaseStudy.contextBadge}
                </span>
                <h2 className="mt-1.5 text-lg font-extrabold text-slate-900 dark:text-white">
                  {detailed.workedCaseStudy.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowCaseSolution((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-300 bg-white px-3 py-1.5 text-xs font-bold text-indigo-800 hover:bg-indigo-50 dark:border-indigo-700 dark:bg-slate-900 dark:text-indigo-200"
              >
                {showCaseSolution ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                {showCaseSolution ? 'Masquer la résolution' : 'Voir la résolution commentée'}
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-indigo-200 bg-white p-4 text-sm leading-relaxed text-slate-800 dark:border-indigo-900 dark:bg-slate-900 dark:text-slate-200">
              <p className="text-xs font-extrabold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
                Énoncé du cas guidé
              </p>
              <p className="mt-1.5">{detailed.workedCaseStudy.scenario}</p>
              <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {detailed.workedCaseStudy.givenData.map((d, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    • {d}
                  </div>
                ))}
              </div>
            </div>

            {showCaseSolution && (
              <div className="mt-4 space-y-3">
                <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-200">
                  <span className="font-extrabold">Choix de la méthode : </span>
                  {detailed.workedCaseStudy.methodChoice}
                </p>

                <div className="space-y-2.5">
                  {detailed.workedCaseStudy.steps.map((st, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-200 bg-white p-3.5 text-xs dark:border-slate-800 dark:bg-slate-900"
                    >
                      <p className="font-extrabold text-blue-800 dark:text-blue-300">
                        {st.stepTitle}
                      </p>
                      <p className="mt-1 leading-relaxed text-slate-700 dark:text-slate-300">
                        {st.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-xs dark:border-emerald-800 dark:bg-emerald-950/40">
                  <p className="font-extrabold text-emerald-950 dark:text-emerald-100">
                    {detailed.workedCaseStudy.finalAnswer}
                  </p>
                  <p className="mt-1.5 text-emerald-900 dark:text-emerald-200">
                    <span className="font-bold">Contrôle qualité : </span>
                    {detailed.workedCaseStudy.verificationCheck}
                  </p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ==================== 3. INTERACTIVE PRACTICAL EXERCISES WORKSHOP (4) ==================== */}
        {(viewMode === 'all' || viewMode === 'exercises') && (
          <section className="mt-8 space-y-5">
            <div className="rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50/60 p-5 dark:border-emerald-900 dark:from-emerald-950/40 dark:to-slate-900">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900 dark:text-white">
                    <PenTool className="h-5 w-5 text-emerald-600" />
                    Atelier d’exercices pratiques guidés ({detailed.practicalExercises.length} exercices progressifs)
                  </h2>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    Rédige tes réponses directement dans le brouillon hors ligne, utilise l’indice si besoin,
                    puis compare avec le corrigé détaillé étape par étape et son barème.
                  </p>
                </div>
                <div className="rounded-xl bg-white px-3.5 py-2 text-right shadow-sm dark:bg-slate-900">
                  <p className="text-[11px] font-bold text-slate-500">Progression pratique</p>
                  <p className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400">
                    {completedExercisesCount}/{detailed.practicalExercises.length} validé(s) ({exercisesProgressPct} %)
                  </p>
                </div>
              </div>

              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/80 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-emerald-600 transition-all duration-300"
                  style={{ width: `${exercisesProgressPct}%` }}
                />
              </div>
            </div>

            {detailed.practicalExercises.map((ex) => {
              const status = practicalStore.statuses[ex.id] ?? 'none';
              const draft = practicalStore.drafts[ex.id] ?? '';
              const hintVisible = Boolean(openHints[ex.id]);
              const solutionVisible = Boolean(openSolutions[ex.id]);

              return (
                <div
                  key={ex.id}
                  className={`rounded-2xl border p-5 shadow-sm transition ${
                    status === 'done'
                      ? 'border-emerald-300 bg-emerald-50/30 dark:border-emerald-800 dark:bg-emerald-950/20'
                      : status === 'review'
                        ? 'border-amber-300 bg-amber-50/30 dark:border-amber-800 dark:bg-amber-950/20'
                        : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
                  }`}
                >
                  {/* Exercise Header */}
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
                        <span className="rounded-full bg-blue-700 px-2.5 py-0.5 text-white">
                          Exercice {ex.number}
                        </span>
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-2 py-0.5 text-amber-900 dark:bg-amber-900/50 dark:text-amber-200">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < ex.stars ? 'fill-amber-500 text-amber-500' : 'text-amber-300'
                              }`}
                            />
                          ))}
                          <span className="ml-1">{ex.difficultyLabel}</span>
                        </span>
                        <span className="text-slate-500">~{ex.estimatedMinutes} min</span>
                        {status === 'done' && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200">
                            <CheckCircle2 className="h-3 w-3" />
                            Réussi
                          </span>
                        )}
                        {status === 'review' && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
                            À retravailler
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2 text-base font-extrabold text-slate-900 dark:text-white">
                        {ex.title}
                      </h3>
                    </div>
                  </div>

                  {/* Prompt */}
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                    {ex.prompt}
                  </p>

                  {/* Flawed student copy for Exercise 3 */}
                  {ex.studentFlawedCopy && (
                    <div className="mt-3 rounded-xl border-l-4 border-rose-500 bg-rose-50 p-3.5 text-xs italic leading-relaxed text-rose-950 dark:bg-rose-950/40 dark:text-rose-100">
                      <p className="mb-1 font-bold not-italic text-rose-800 dark:text-rose-200">
                        Extrait de copie à corriger :
                      </p>
                      {ex.studentFlawedCopy}
                    </div>
                  )}

                  {/* Guided sub-questions */}
                  <div className="mt-3 rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/60">
                    <p className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                      Consignes de travail :
                    </p>
                    <ul className="mt-1.5 space-y-1.5 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                      {ex.tasks.map((task, tIdx) => (
                        <li key={tIdx}>{task}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Offline Scratchpad */}
                  <div className="mt-3">
                    <label
                      htmlFor={`draft-${ex.id}`}
                      className="block text-xs font-bold text-slate-600 dark:text-slate-300"
                    >
                      Ta réponse / brouillon personnel (sauvegardé hors ligne) :
                    </label>
                    <textarea
                      id={`draft-${ex.id}`}
                      rows={3}
                      value={draft}
                      onChange={(e) => setExerciseDraft(ex.id, e.target.value)}
                      placeholder="Rédige ici ta démarche et tes réponses a), b), c) avant d’afficher le corrigé..."
                      className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white p-3 text-xs leading-relaxed text-slate-900 focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

                  {/* Interactive Controls */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenHints((prev) => ({ ...prev, [ex.id]: !prev[ex.id] }))
                        }
                        className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200"
                      >
                        <HelpCircle className="h-3.5 w-3.5" />
                        {hintVisible ? 'Masquer l’indice' : 'Voir l’indice'}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setOpenSolutions((prev) => ({ ...prev, [ex.id]: !prev[ex.id] }))
                        }
                        className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-800"
                      >
                        {solutionVisible ? (
                          <EyeOff className="h-3.5 w-3.5" />
                        ) : (
                          <Eye className="h-3.5 w-3.5" />
                        )}
                        {solutionVisible
                          ? 'Masquer le corrigé'
                          : 'Afficher le corrigé détaillé'}
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setExerciseStatus(ex.id, status === 'done' ? 'none' : 'done')
                        }
                        className={`inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold ${
                          status === 'done'
                            ? 'bg-emerald-600 text-white'
                            : 'border border-emerald-400 text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300'
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {status === 'done' ? 'Validé' : 'Marquer réussi'}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setExerciseStatus(ex.id, status === 'review' ? 'none' : 'review')
                        }
                        className={`rounded-xl px-3 py-2 text-xs font-bold ${
                          status === 'review'
                            ? 'bg-amber-600 text-white'
                            : 'border border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300'
                        }`}
                      >
                        À retravailler
                      </button>
                    </div>
                  </div>

                  {/* Hint Box */}
                  {hintVisible && (
                    <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs leading-relaxed text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
                      <span className="font-extrabold">Indice méthodologique : </span>
                      {ex.hint}
                    </div>
                  )}

                  {/* Full Step-by-Step Correction + Model Answer + Rubric */}
                  {solutionVisible && (
                    <div className="mt-4 space-y-3 rounded-xl border border-emerald-300 bg-emerald-50/70 p-4 text-xs dark:border-emerald-800 dark:bg-emerald-950/30">
                      <p className="flex items-center gap-1.5 font-extrabold text-emerald-950 dark:text-emerald-100">
                        <ClipboardCheck className="h-4 w-4 text-emerald-600" />
                        Corrigé détaillé étape par étape
                      </p>
                      <ol className="space-y-1.5 leading-relaxed text-emerald-950/90 dark:text-emerald-200">
                        {ex.solutionSteps.map((st, sIdx) => (
                          <li key={sIdx}>{st}</li>
                        ))}
                      </ol>

                      <div className="rounded-lg border border-emerald-200 bg-white p-3 dark:border-emerald-900 dark:bg-slate-900">
                        <p className="font-extrabold text-slate-900 dark:text-white">
                          Rédaction modèle attendue :
                        </p>
                        <p className="mt-1 leading-relaxed text-slate-700 dark:text-slate-300">
                          {ex.modelAnswer}
                        </p>
                      </div>

                      <div>
                        <p className="font-extrabold text-emerald-950 dark:text-emerald-100">
                          Barème d’auto-correction (/5 pts) :
                        </p>
                        <ul className="mt-1 space-y-1 text-emerald-900 dark:text-emerald-200">
                          {ex.gradingRubric.map((g, gIdx) => (
                            <li key={gIdx}>✓ {g}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Quick Checklist */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900/60 dark:bg-blue-950/20">
              <h3 className="text-sm font-extrabold text-blue-950 dark:text-blue-100">
                Checklist de maîtrise du chapitre
              </h3>
              <ul className="mt-2 space-y-1.5 text-xs text-blue-900 dark:text-blue-200">
                {detailed.quickRecapChecklist.map((chk, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    <span>{chk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Bottom Course Actions & Chapter Navigation */}
        <div className="mt-6 space-y-4 border-t border-slate-200 pt-5 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => toggleCourseCompleted(course.id)}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold ${
                isCompleted
                  ? 'bg-emerald-600 text-white'
                  : 'border border-emerald-500 text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              {isCompleted ? 'Cours marqué comme terminé' : 'Marquer ce cours comme terminé'}
            </button>

            <div className="flex flex-wrap gap-2">
              {chapter && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFicheId(chapter.ficheId);
                    navigate('fiche-viewer');
                  }}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100"
                >
                  <BookMarked className="h-4 w-4 text-emerald-600" />
                  Fiche synthétique
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setSelectedSubjectId(course.subjectId);
                  navigate('active-method');
                }}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-purple-300 bg-purple-50 px-3.5 py-2 text-xs font-bold text-purple-800 hover:bg-purple-100 dark:border-purple-800 dark:bg-purple-950/40 dark:text-purple-200"
              >
                <Brain className="h-4 w-4" />
                Méthode Active
              </button>
              <button
                type="button"
                onClick={handleLaunchChapterQuiz}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800"
              >
                <Play className="h-4 w-4" />
                QCM du chapitre ({chapterQuestions.length})
              </button>
            </div>
          </div>

          {/* Previous / Next Chapter Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <button
              type="button"
              disabled={!prevCourse}
              onClick={() => prevCourse && handleSelectCourse(prevCourse.id)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"
            >
              <ChevronLeft className="h-4 w-4" />
              Chapitre précédent
            </button>
            <span className="text-xs font-semibold text-slate-500">
              Chapitre {currentCourseIndex + 1} sur {subjectCourses.length}
            </span>
            <button
              type="button"
              disabled={!nextCourse}
              onClick={() => nextCourse && handleSelectCourse(nextCourse.id)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"
            >
              Chapitre suivant
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </article>

      {/* ==================== 4. AI HELPER, PERSONAL NOTES & HIGHLIGHTS ==================== */}
      {(viewMode === 'all' || viewMode === 'notes') && (
        <>
          <section className="hc-card rounded-2xl border border-purple-200 bg-purple-50/50 p-5 dark:border-purple-900 dark:bg-purple-950/20">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="flex items-center gap-2 text-sm font-bold text-purple-950 dark:text-purple-200">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  Assistant pédagogique responsable (hors ligne)
                </h2>
                <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                  Résume ce cours et génère des questions de mémorisation sans connexion Internet.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAiResult(generateOfflineCourseSummary(course))}
                className="rounded-xl bg-purple-700 px-4 py-2 text-xs font-bold text-white hover:bg-purple-800"
              >
                Résumer & créer des mini-flashcards
              </button>
            </div>

            {aiResult && (
              <div className="mt-4 space-y-3 rounded-xl border border-purple-200 bg-white p-4 text-xs dark:border-purple-800 dark:bg-slate-900">
                <p className="whitespace-pre-line font-medium text-slate-800 dark:text-slate-200">
                  {aiResult.summary}
                </p>
                <div className="space-y-2 pt-2">
                  <p className="font-bold text-purple-800 dark:text-purple-300">
                    Questions d’auto-vérification générées :
                  </p>
                  {aiResult.generatedFlashcards.map((c, idx) => (
                    <div key={idx} className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800">
                      <p className="font-bold text-slate-900 dark:text-white">Q : {c.question}</p>
                      <p className="mt-0.5 text-slate-600 dark:text-slate-300">R : {c.answer}</p>
                    </div>
                  ))}
                </div>
                <p className="rounded-lg bg-amber-50 p-2.5 text-[11px] text-amber-900 dark:bg-amber-950/60 dark:text-amber-200">
                  {aiResult.disclaimer}
                </p>
              </div>
            )}
          </section>

          <div className="grid gap-4 md:grid-cols-2">
            <section className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <StickyNote className="h-4 w-4 text-blue-600" />
                Ajouter une note personnelle sur ce cours
              </h2>
              <form onSubmit={handleSaveNote} className="mt-3 space-y-2">
                <textarea
                  rows={3}
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Écris ton astuce, un exemple ou une question à poser au professeur..."
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-xs dark:border-slate-700 dark:bg-slate-800"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800"
                >
                  Enregistrer la note hors ligne
                </button>
              </form>
              {courseNotes.length > 0 && (
                <div className="mt-3 space-y-2">
                  {courseNotes.map((n) => (
                    <p
                      key={n.id}
                      className="rounded-lg bg-blue-50/70 p-2.5 text-xs text-slate-800 dark:bg-blue-950/40 dark:text-slate-200"
                    >
                      {n.content}
                    </p>
                  ))}
                </div>
              )}
            </section>

            <section className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <Highlighter className="h-4 w-4 text-amber-500" />
                Passages surlignés ({courseHighlights.length})
              </h2>
              {courseHighlights.length === 0 ? (
                <p className="mt-2 text-xs text-slate-500">
                  Clique sur « Surligner » sur un encadré « À retenir » pour le retrouver ici hors
                  ligne.
                </p>
              ) : (
                <div className="mt-3 space-y-2">
                  {courseHighlights.map((h) => (
                    <p
                      key={h.id}
                      className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-2.5 text-xs font-medium text-amber-950 dark:bg-amber-950/40 dark:text-amber-100"
                    >
                      {h.text}
                    </p>
                  ))}
                </div>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
};
