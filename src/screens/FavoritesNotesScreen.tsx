import React, { useState } from 'react';
import {
  BookMarked,
  BookOpen,
  FileText,
  Heart,
  Highlighter,
  Plus,
  Search,
  StickyNote,
  Trash2,
} from 'lucide-react';
import { ANNALES, COURSES, SUBJECTS, useApp } from '../context/AppContext';

export const FavoritesNotesScreen: React.FC = () => {
  const {
    state,
    screen,
    allFiches,
    allQuestions,
    navigate,
    setSelectedCourseId,
    setSelectedFicheId,
    toggleFavorite,
    addNote,
    updateNote,
    deleteNote,
    removeHighlight,
    startPractice,
  } = useApp();

  const [noteQuery, setNoteQuery] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteSubject, setNewNoteSubject] = useState('maths');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  // Screen 20: Favoris
  if (screen === 'favorites') {
    const favAnnales = ANNALES.filter((a) => state.favorites.annales.includes(a.id));
    const favFiches = allFiches.filter((f) => state.favorites.fiches.includes(f.id));
    const favCourses = COURSES.filter((c) => state.favorites.courses.includes(c.id));
    const favQuestions = allQuestions.filter((q) => state.favorites.questions.includes(q.id));

    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Mes favoris hors ligne
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Retrouve en un clic tes sujets, fiches, cours et questions mis de côté.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Annales favorites */}
          <section className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <FileText className="h-4 w-4 text-blue-600" />
              Annales favorites ({favAnnales.length})
            </h2>
            <div className="mt-3 space-y-2">
              {favAnnales.length === 0 ? (
                <p className="text-xs text-slate-500">Aucune annale favorite.</p>
              ) : (
                favAnnales.map((a) => (
                  <div key={a.id} className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() =>
                        startPractice({
                          mode: 'examen_blanc',
                          title: a.title,
                          annaleId: a.id,
                          subjectId: a.subjectId,
                          questionIds: a.questionIds,
                          durationMinutes: a.durationMinutes,
                        })
                      }
                      className="text-left text-xs font-bold text-slate-900 hover:text-blue-700 dark:text-white"
                    >
                      {a.title} ({a.year})
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleFavorite('annales', a.id)}
                      className="text-rose-500"
                      aria-label="Retirer des favoris"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Fiches favorites */}
          <section className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <BookMarked className="h-4 w-4 text-emerald-600" />
              Fiches favorites ({favFiches.length})
            </h2>
            <div className="mt-3 space-y-2">
              {favFiches.length === 0 ? (
                <p className="text-xs text-slate-500">Aucune fiche favorite.</p>
              ) : (
                favFiches.map((f) => (
                  <div key={f.id} className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFicheId(f.id);
                        navigate('fiche-viewer');
                      }}
                      className="text-left text-xs font-bold text-slate-900 hover:text-blue-700 dark:text-white"
                    >
                      {f.title}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleFavorite('fiches', f.id)}
                      className="text-rose-500"
                      aria-label="Retirer des favoris"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Cours favoris */}
          <section className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <BookOpen className="h-4 w-4 text-purple-600" />
              Cours favoris ({favCourses.length})
            </h2>
            <div className="mt-3 space-y-2">
              {favCourses.length === 0 ? (
                <p className="text-xs text-slate-500">Aucun cours favori.</p>
              ) : (
                favCourses.map((c) => (
                  <div key={c.id} className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCourseId(c.id);
                        navigate('course-reader');
                      }}
                      className="text-left text-xs font-bold text-slate-900 hover:text-blue-700 dark:text-white"
                    >
                      {c.title}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleFavorite('courses', c.id)}
                      className="text-rose-500"
                      aria-label="Retirer des favoris"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Questions marquées */}
          <section className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Heart className="h-4 w-4 text-rose-500" />
              Questions marquées ({favQuestions.length})
            </h2>
            <div className="mt-3 space-y-2">
              {favQuestions.length === 0 ? (
                <p className="text-xs text-slate-500">Aucune question marquée.</p>
              ) : (
                favQuestions.map((q) => (
                  <div key={q.id} className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {q.notion} — {q.prompt.slice(0, 75)}...
                    </p>
                    <button
                      type="button"
                      onClick={() => toggleFavorite('questions', q.id)}
                      className="text-rose-500"
                      aria-label="Retirer des favoris"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // Screen 21: Notes personnelles & Surlignages
  const filteredNotes = state.notes.filter((n) =>
    !noteQuery.trim()
      ? true
      : `${n.targetTitle} ${n.content}`.toLowerCase().includes(noteQuery.trim().toLowerCase())
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Carnet de notes personnelles & Surlignages
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Toutes tes notes sont sauvegardées localement et synchronisées dès le retour de la connexion.
        </p>
      </div>

      {/* Create Quick Note */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
          addNote({
            targetType: 'general',
            targetId: `gen-${Date.now()}`,
            targetTitle: newNoteTitle.trim(),
            subjectId: newNoteSubject,
            content: newNoteContent.trim(),
          });
          setNewNoteTitle('');
          setNewNoteContent('');
        }}
        className="hc-card space-y-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
      >
        <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
          <Plus className="h-4 w-4 text-blue-600" />
          Nouvelle note de révision
        </h2>
        <div className="grid gap-2.5 sm:grid-cols-3">
          <input
            type="text"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            placeholder="Titre (ex. Formules à revoir avant l'examen)"
            className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs sm:col-span-2 dark:border-slate-700 dark:bg-slate-800"
          />
          <select
            value={newNoteSubject}
            onChange={(e) => setNewNoteSubject(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
          >
            {SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <textarea
          rows={3}
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
          placeholder="Écris ta note personnelle..."
          className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-xs dark:border-slate-700 dark:bg-slate-800"
        />
        <button
          type="submit"
          className="rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800"
        >
          Enregistrer hors ligne
        </button>
      </form>

      {/* Search Notes */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={noteQuery}
          onChange={(e) => setNoteQuery(e.target.value)}
          placeholder="Rechercher dans mes notes..."
          className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm dark:border-slate-700 dark:bg-slate-900"
        />
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {filteredNotes.map((n) => {
          const subj = SUBJECTS.find((s) => s.id === n.subjectId);
          const isEditing = editingId === n.id;
          return (
            <article
              key={n.id}
              className="hc-card rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-bold">
                    <StickyNote className="h-3.5 w-3.5 text-blue-600" />
                    <span className="text-slate-900 dark:text-white">{n.targetTitle}</span>
                    {subj && (
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {subj.shortName}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Modifiée le {new Date(n.updatedAt).toLocaleString('fr-FR')}
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      if (isEditing) {
                        updateNote(n.id, editContent);
                        setEditingId(null);
                      } else {
                        setEditingId(n.id);
                        setEditContent(n.content);
                      }
                    }}
                    className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-bold text-blue-700 dark:border-slate-700 dark:text-blue-400"
                  >
                    {isEditing ? 'Valider' : 'Modifier'}
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteNote(n.id)}
                    className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:text-red-600 dark:border-slate-700"
                    aria-label="Supprimer la note"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-blue-400 p-2.5 text-xs dark:bg-slate-800"
                />
              ) : (
                <p className="mt-2 whitespace-pre-line text-sm text-slate-700 dark:text-slate-200">
                  {n.content}
                </p>
              )}
            </article>
          );
        })}
      </div>

      {/* Highlights section */}
      {state.highlights.length > 0 && (
        <section className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <Highlighter className="h-4 w-4 text-amber-500" />
            Passages surlignés ({state.highlights.length})
          </h2>
          <div className="mt-3 space-y-2">
            {state.highlights.map((h) => (
              <div
                key={h.id}
                className="flex items-start justify-between gap-2 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-3 text-xs text-amber-950 dark:bg-amber-950/40 dark:text-amber-100"
              >
                <span>{h.text}</span>
                <button
                  type="button"
                  onClick={() => removeHighlight(h.id)}
                  className="text-amber-700 hover:text-red-600"
                  aria-label="Supprimer le surlignage"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
