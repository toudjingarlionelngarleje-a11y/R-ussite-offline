import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  BookOpen,
  CheckCircle2,
  Download,
  FileText,
  Layers,
  Play,
  Search,
  Sparkles,
} from 'lucide-react';
import { ANNALES, CHAPTERS, COURSES, EXAMS, SUBJECTS, useApp } from '../context/AppContext';

export const LibraryScreen: React.FC = () => {
  const {
    state,
    screen,
    navigate,
    selectedSubjectId,
    setSelectedSubjectId,
    setSelectedCourseId,
    setSelectedFicheId,
    allQuestions,
    allFiches,
    isDownloaded,
    downloadSubjectBundle,
    downloadingIds,
    startPractice,
    setShowPlanModal,
  } = useApp();

  const [query, setQuery] = useState('');
  const [examFilter, setExamFilter] = useState<string>('all');
  const [onlyDownloaded, setOnlyDownloaded] = useState(false);
  const [chapterSearch, setChapterSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'facile' | 'moyen' | 'difficile'>('all');

  const selectedSubject = SUBJECTS.find((s) => s.id === selectedSubjectId) ?? SUBJECTS[0];

  // Screen 7: Détail d'une matière & Screen 8: Liste des chapitres
  if (screen === 'subject-detail' || screen === 'chapters') {
    const subjChapters = CHAPTERS.filter((c) => c.subjectId === selectedSubject.id).sort(
      (a, b) => a.order - b.order
    );
    const filteredChapters = subjChapters.filter((ch) => {
      if (difficultyFilter !== 'all' && ch.difficulty !== difficultyFilter) return false;
      if (
        chapterSearch.trim() &&
        !`${ch.title} ${ch.summary}`.toLowerCase().includes(chapterSearch.trim().toLowerCase())
      ) {
        return false;
      }
      return true;
    });
    const subjAnnales = ANNALES.filter((a) => a.subjectId === selectedSubject.id);
    const subjFiches = allFiches.filter((f) => f.subjectId === selectedSubject.id);
    const subjQuestions = allQuestions.filter((q) => q.subjectId === selectedSubject.id);
    const packKey = `subject:${selectedSubject.id}`;
    const isPackDownloaded = Boolean(state.downloadedItems[packKey]);
    const progressPct = downloadingIds[packKey];

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate('library')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-700 dark:text-slate-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à la bibliothèque
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate('subject-detail')}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold ${
                screen === 'subject-detail'
                  ? 'bg-blue-700 text-white'
                  : 'border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-200'
              }`}
            >
              Vue matière
            </button>
            <button
              type="button"
              onClick={() => navigate('chapters')}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold ${
                screen === 'chapters'
                  ? 'bg-blue-700 text-white'
                  : 'border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-200'
              }`}
            >
              Liste des chapitres ({subjChapters.length})
            </button>
          </div>
        </div>

        {/* Subject Hero */}
        <section className="hc-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="h-3.5 w-3.5 rounded-full"
                  style={{ backgroundColor: selectedSubject.color }}
                />
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {selectedSubject.name}
                </h1>
              </div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {selectedSubject.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
                  {subjChapters.length} chapitre(s)
                </span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
                  {subjFiches.length} fiche(s)
                </span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
                  {subjAnnales.length} annale(s)
                </span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
                  {subjQuestions.length} question(s)
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => downloadSubjectBundle(selectedSubject.id)}
                disabled={isPackDownloaded || progressPct !== undefined}
                className={`inline-flex min-h-[42px] items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold ${
                  isPackDownloaded
                    ? 'border border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                    : 'bg-blue-700 text-white hover:bg-blue-800'
                }`}
              >
                {isPackDownloaded ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Pack hors ligne prêt ({selectedSubject.sizeKb} Ko)
                  </>
                ) : progressPct !== undefined ? (
                  `Téléchargement ${progressPct}%...`
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Tout télécharger ({selectedSubject.sizeKb} Ko)
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  startPractice({
                    mode: 'rapide',
                    title: `Entraînement — ${selectedSubject.name}`,
                    subjectId: selectedSubject.id,
                    questionIds: subjQuestions.map((q) => q.id),
                    immediateFeedback: true,
                  })
                }
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
              >
                <Play className="h-4 w-4" />
                Quiz sur la matière
              </button>
            </div>
          </div>
        </section>

        {/* Chapters List (Screen 8) */}
        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Chapitres du programme ({filteredChapters.length}/{subjChapters.length})
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={chapterSearch}
                  onChange={(e) => setChapterSearch(e.target.value)}
                  placeholder="Filtrer un chapitre..."
                  className="rounded-xl border border-slate-300 bg-white py-1.5 pl-8 pr-3 text-xs dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <select
                aria-label="Filtrer par difficulté"
                value={difficultyFilter}
                onChange={(e) =>
                  setDifficultyFilter(e.target.value as 'all' | 'facile' | 'moyen' | 'difficile')
                }
                className="rounded-xl border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="all">Tous niveaux</option>
                <option value="facile">Facile</option>
                <option value="moyen">Moyen</option>
                <option value="difficile">Difficile</option>
              </select>
            </div>
          </div>

          {filteredChapters.map((ch) => {
            const course = COURSES.find((c) => c.id === ch.courseId);
            const completed = course ? state.completedCourseIds.includes(course.id) : false;
            const chQuestions = allQuestions.filter((q) => q.chapterId === ch.id);

            return (
              <div
                key={ch.id}
                className="hc-card rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                        Chapitre {ch.order}
                      </span>
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold capitalize text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {ch.difficulty} · {ch.estimatedMinutes} min
                      </span>
                      {completed && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                          <CheckCircle2 className="h-3 w-3" />
                          Cours lu
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1.5 text-base font-bold text-slate-900 dark:text-white">
                      {ch.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{ch.summary}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCourseId(ch.courseId);
                        navigate('course-reader');
                      }}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    >
                      <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                      Cours
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFicheId(ch.ficheId);
                        navigate('fiche-viewer');
                      }}
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    >
                      <BookMarked className="h-3.5 w-3.5 text-emerald-600" />
                      Fiche
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        startPractice({
                          mode: 'libre',
                          title: `Exercices — ${ch.title}`,
                          subjectId: selectedSubject.id,
                          questionIds: chQuestions.length > 0 ? chQuestions.map((q) => q.id) : subjQuestions.map((q) => q.id),
                          immediateFeedback: true,
                        })
                      }
                      className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-blue-700 px-3 py-2 text-xs font-bold text-white hover:bg-blue-800"
                    >
                      <Play className="h-3.5 w-3.5" />
                      QCM ({chQuestions.length})
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Linked Annales & Flashcards in Subject Detail view */}
        {screen === 'subject-detail' && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                  <FileText className="h-4 w-4 text-blue-600" />
                  Annales associées ({subjAnnales.length})
                </h3>
                <button
                  type="button"
                  onClick={() => navigate('annales')}
                  className="text-xs font-bold text-blue-700 hover:underline dark:text-blue-400"
                >
                  Toutes →
                </button>
              </div>
              <div className="mt-3 space-y-2">
                {subjAnnales.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-700"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{a.title}</p>
                      <p className="text-[11px] text-slate-500">
                        {a.year} · {a.durationMinutes} min · {a.questionIds.length} q.
                      </p>
                    </div>
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
                      className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-200"
                    >
                      Lancer
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <Layers className="h-4 w-4 text-emerald-600" />
                Cartes mémoire & Fiches de {selectedSubject.shortName}
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Mémorise les formules, définitions et repères grâce à la répétition espacée hors ligne.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => navigate('flashcards')}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                >
                  <Layers className="h-4 w-4" />
                  Ouvrir les flashcards
                </button>
                {subjFiches[0] && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFicheId(subjFiches[0].id);
                      navigate('fiche-viewer');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100"
                  >
                    <BookMarked className="h-4 w-4" />
                    Consulter les fiches
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Screen 6: Bibliothèque de contenus (principale)
  const filteredSubjects = SUBJECTS.filter((s) => {
    if (examFilter !== 'all' && !s.examIds.includes(examFilter)) return false;
    if (onlyDownloaded && !isDownloaded('subject', s.id)) return false;
    if (
      query.trim() &&
      !`${s.name} ${s.description}`.toLowerCase().includes(query.trim().toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Bibliothèque de contenus
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {SUBJECTS.length} matières · {CHAPTERS.length} chapitres · {allFiches.length} fiches de cours disponibles 100 % hors ligne.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => navigate('annales')}
            className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            Banque d’annales →
          </button>
          <button
            type="button"
            onClick={() => navigate('downloads')}
            className="rounded-xl bg-blue-700 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-800"
          >
            Gérer les téléchargements
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="hc-card flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une matière ou un thème..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pl-9 pr-3 text-sm dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
        <select
          aria-label="Filtrer par examen"
          value={examFilter}
          onChange={(e) => setExamFilter(e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="all">Tous les examens / concours</option>
          {EXAMS.map((e) => (
            <option key={e.id} value={e.id}>
              {e.shortName}
            </option>
          ))}
        </select>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold dark:border-slate-700">
          <input
            type="checkbox"
            checked={onlyDownloaded}
            onChange={(e) => setOnlyDownloaded(e.target.checked)}
            className="accent-blue-700"
          />
          Téléchargés hors ligne uniquement
        </label>
      </div>

      {/* Subject Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredSubjects.map((subj) => {
          const downloaded = isDownloaded('subject', subj.id);
          const pct = downloadingIds[`subject:${subj.id}`];
          const chCount = CHAPTERS.filter((c) => c.subjectId === subj.id).length;
          const ficheCount = allFiches.filter((f) => f.subjectId === subj.id).length;
          const lockedPremium = subj.isPremium && state.profiles.find((p) => p.id === state.activeProfileId)?.plan !== 'premium';

          return (
            <div
              key={subj.id}
              className="hc-card flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-3.5 w-3.5 rounded-full"
                      style={{ backgroundColor: subj.color }}
                    />
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      {subj.name}
                    </h2>
                  </div>
                  {subj.isPremium ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900 dark:bg-amber-900 dark:text-amber-100">
                      <Sparkles className="h-3 w-3" />
                      Plus
                    </span>
                  ) : (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                      Gratuit
                    </span>
                  )}
                </div>

                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {subj.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-500">
                  <span>{chCount} chapitres</span>
                  <span>·</span>
                  <span>{ficheCount} fiches</span>
                  <span>·</span>
                  <span>Pack {subj.sizeKb} Ko</span>
                  {downloaded && (
                    <>
                      <span>·</span>
                      <span className="text-emerald-700 dark:text-emerald-400">Hors ligne OK</span>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    if (lockedPremium) {
                      setShowPlanModal(true);
                      return;
                    }
                    setSelectedSubjectId(subj.id);
                    navigate('subject-detail');
                  }}
                  className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-700 px-3 py-2 text-xs font-bold text-white hover:bg-blue-800"
                >
                  {lockedPremium ? 'Découvrir Plus' : 'Ouvrir'}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => downloadSubjectBundle(subj.id)}
                  disabled={downloaded || pct !== undefined}
                  className={`inline-flex min-h-[40px] items-center justify-center gap-1 rounded-xl border px-3 py-2 text-xs font-bold ${
                    downloaded
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                      : 'border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200'
                  }`}
                  title="Télécharger cette matière hors ligne"
                >
                  {downloaded ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : pct !== undefined ? (
                    `${pct}%`
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
