import React, { useState } from 'react';
import {
  ArrowLeft,
  BookMarked,
  CheckCircle2,
  Heart,
  Highlighter,
  Play,
  Sparkles,
  StickyNote,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { PedagogicalDiagram } from '../components/PedagogicalDiagram';
import { CHAPTERS, COURSES, SUBJECTS, useApp } from '../context/AppContext';
import { generateOfflineCourseSummary } from '../lib/aiHelper';
import { isSpeechSupported, speakFrench, stopSpeaking } from '../lib/speech';

export const CourseReaderScreen: React.FC = () => {
  const {
    state,
    selectedCourseId,
    setSelectedCourseId,
    setSelectedFicheId,
    navigate,
    allQuestions,
    toggleFavorite,
    toggleCourseCompleted,
    addNote,
    addHighlight,
    startPractice,
    updateAccessibility,
  } = useApp();

  const course = COURSES.find((c) => c.id === selectedCourseId) ?? COURSES[0];
  const chapter = CHAPTERS.find((c) => c.id === course.chapterId);
  const subject = SUBJECTS.find((s) => s.id === course.subjectId);
  const isCompleted = state.completedCourseIds.includes(course.id);
  const isFav = state.favorites.courses.includes(course.id);
  const courseHighlights = state.highlights.filter(
    (h) => h.targetType === 'course' && h.targetId === course.id
  );
  const courseNotes = state.notes.filter(
    (n) => n.targetType === 'course' && n.targetId === course.id
  );

  const [noteInput, setNoteInput] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [aiResult, setAiResult] = useState<ReturnType<typeof generateOfflineCourseSummary> | null>(null);

  const handleSpeak = () => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    const text = `${course.title}. ${course.sections
      .map((s) => `${s.heading}. ${s.content}. Point clé : ${s.keyTakeaway}`)
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

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate('chapters')}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-700 dark:text-slate-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux chapitres
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <select
            aria-label="Changer de cours"
            value={course.id}
            onChange={(e) => {
              stopSpeaking();
              setSpeaking(false);
              setAiResult(null);
              setSelectedCourseId(e.target.value);
            }}
            className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
          >
            {COURSES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
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
              {speaking ? 'Arrêter audio' : 'Écouter le cours'}
            </button>
          )}

          <button
            type="button"
            onClick={() => toggleFavorite('courses', course.id)}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${
              isFav ? 'border-rose-300 bg-rose-50 text-rose-600' : 'border-slate-300 text-slate-500 dark:border-slate-700'
            }`}
            aria-label="Ajouter aux favoris"
          >
            <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Course Header */}
      <article className="hc-card rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span
            className="rounded-md px-2 py-0.5 text-white"
            style={{ backgroundColor: subject?.color ?? '#1D4ED8' }}
          >
            {subject?.name}
          </span>
          <span className="text-slate-500">
            ~{course.durationMinutes} min · Mis à jour le {course.updatedAt} · {course.sizeKb} Ko hors ligne
          </span>
        </div>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
          {course.title}
        </h1>

        <div className="mt-6 space-y-6">
          {course.sections.map((sec) => (
            <section
              key={sec.id}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40"
            >
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{sec.heading}</h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                {sec.content}
              </p>

              {sec.formula && (
                <div className="mt-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 font-mono text-sm font-bold text-blue-900 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-200">
                  {sec.formula}
                </div>
              )}

              {sec.diagramId && (
                <div className="mt-4">
                  <PedagogicalDiagram diagramId={sec.diagramId} />
                </div>
              )}

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
                  className="inline-flex items-center gap-1 rounded-lg bg-white/80 px-2.5 py-1 text-[11px] font-bold text-amber-800 hover:bg-white dark:bg-slate-900 dark:text-amber-300"
                >
                  <Highlighter className="h-3.5 w-3.5" />
                  Surligner
                </button>
              </div>
            </section>
          ))}
        </div>

        {/* Bottom Course Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
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
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-slate-300 px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100"
              >
                <BookMarked className="h-4 w-4 text-emerald-600" />
                Ouvrir la fiche synthétique
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                const qs = allQuestions.filter((q) => q.chapterId === course.chapterId);
                startPractice({
                  mode: 'libre',
                  title: `Exercices — ${course.title}`,
                  subjectId: course.subjectId,
                  questionIds: qs.length > 0 ? qs.map((q) => q.id) : allQuestions.slice(0, 4).map((q) => q.id),
                  immediateFeedback: true,
                });
              }}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800"
            >
              <Play className="h-4 w-4" />
              S’entraîner sur ce cours
            </button>
          </div>
        </div>
      </article>

      {/* Responsible Offline AI Helper */}
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

      {/* Personal Notes & Highlights */}
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
                <p key={n.id} className="rounded-lg bg-blue-50/70 p-2.5 text-xs text-slate-800 dark:bg-blue-950/40 dark:text-slate-200">
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
              Clique sur « Surligner » sur un encadré « À retenir » pour le retrouver ici hors ligne.
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
    </div>
  );
};
