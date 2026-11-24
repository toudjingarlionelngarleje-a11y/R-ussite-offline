import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  BookOpen,
  Brain,
  CheckCircle2,
  Download,
  FileText,
  GraduationCap,
  Layers,
  Play,
  Search,
  Sparkles,
} from 'lucide-react';
import {
  ANNALES,
  CHAPTERS,
  CLASS_LEVELS,
  COURSES,
  EXAMS,
  SCHOOL_CYCLES,
  SUBJECTS,
  formatClassRange,
  getClassLevelMeta,
  mapStudyLevelToClassId,
  useApp,
} from '../context/AppContext';
import { ClassLevelId, SchoolCycleId } from '../types';

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

  const activeProfile = state.profiles.find((p) => p.id === state.activeProfileId);
  const profileClassId = mapStudyLevelToClassId(activeProfile?.studyLevel);

  const [query, setQuery] = useState('');
  const [examFilter, setExamFilter] = useState<string>('all');
  const [cycleFilter, setCycleFilter] = useState<'all' | SchoolCycleId>('all');
  const [classFilter, setClassFilter] = useState<'all' | ClassLevelId>('all');
  const [onlyDownloaded, setOnlyDownloaded] = useState(false);

  // Subject detail / chapters view filters
  const [chapterSearch, setChapterSearch] = useState('');
  const [chapterClassFilter, setChapterClassFilter] = useState<'all' | ClassLevelId>('all');
  const [groupChaptersByClass, setGroupChaptersByClass] = useState(true);
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'facile' | 'moyen' | 'difficile'>('all');

  const selectedSubject = SUBJECTS.find((s) => s.id === selectedSubjectId) ?? SUBJECTS[0];

  // Precomputed counts for instant rendering across 60 subjects & 4,320 chapters
  const chapterCountBySubject = useMemo(() => {
    const map: Record<string, number> = {};
    for (const ch of CHAPTERS) map[ch.subjectId] = (map[ch.subjectId] ?? 0) + 1;
    return map;
  }, []);

  const chapterCountBySubjectAndClass = useMemo(() => {
    const map: Record<string, number> = {};
    for (const ch of CHAPTERS) {
      if (ch.classLevel) {
        const key = `${ch.subjectId}:${ch.classLevel}`;
        map[key] = (map[key] ?? 0) + 1;
      }
    }
    return map;
  }, []);

  const ficheCountBySubject = useMemo(() => {
    const map: Record<string, number> = {};
    for (const f of allFiches) map[f.subjectId] = (map[f.subjectId] ?? 0) + 1;
    return map;
  }, [allFiches]);

  const classTotals = useMemo(() => {
    const res: Record<ClassLevelId, { subjects: number; chapters: number }> = {} as Record<
      ClassLevelId,
      { subjects: number; chapters: number }
    >;
    for (const cl of CLASS_LEVELS) {
      res[cl.id] = {
        subjects: SUBJECTS.filter((s) => s.classLevels?.includes(cl.id)).length,
        chapters: CHAPTERS.filter((c) => c.classLevel === cl.id).length,
      };
    }
    return res;
  }, []);

  // Screen 7: Détail d'une matière & Screen 8: Liste des chapitres (organisés par classe 6e → Master)
  if (screen === 'subject-detail' || screen === 'chapters') {
    const subjChapters = CHAPTERS.filter((c) => c.subjectId === selectedSubject.id).sort((a, b) => {
      const ca = getClassLevelMeta(a.classLevel).order;
      const cb = getClassLevelMeta(b.classLevel).order;
      if (ca !== cb) return ca - cb;
      return a.order - b.order;
    });

    const subjectClasses = CLASS_LEVELS.filter((cl) =>
      subjChapters.some((ch) => ch.classLevel === cl.id)
    );

    const activeChapterClassFilter =
      chapterClassFilter !== 'all' && !subjectClasses.some((c) => c.id === chapterClassFilter)
        ? 'all'
        : chapterClassFilter;

    const filteredChapters = subjChapters.filter((ch) => {
      if (activeChapterClassFilter !== 'all' && ch.classLevel !== activeChapterClassFilter) {
        return false;
      }
      if (difficultyFilter !== 'all' && ch.difficulty !== difficultyFilter) return false;
      if (
        chapterSearch.trim() &&
        !`${ch.title} ${ch.summary} ${getClassLevelMeta(ch.classLevel).label}`
          .toLowerCase()
          .includes(chapterSearch.trim().toLowerCase())
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

    const groupedByClass = CLASS_LEVELS.map((meta) => ({
      meta,
      items: filteredChapters.filter((ch) => ch.classLevel === meta.id),
    })).filter((g) => g.items.length > 0);

    const renderChapterCard = (ch: (typeof CHAPTERS)[number]) => {
      const course = COURSES.find((c) => c.id === ch.courseId);
      const completed = course ? state.completedCourseIds.includes(course.id) : false;
      const chQuestions = allQuestions.filter((q) => q.chapterId === ch.id);
      const classMeta = getClassLevelMeta(ch.classLevel);

      return (
        <div
          key={ch.id}
          className="hc-card rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-extrabold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200">
                  {classMeta.shortLabel} · {classMeta.cycleLabel}
                </span>
                <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                  Chapitre {ch.order}
                </span>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold capitalize text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {ch.difficulty} · {ch.estimatedMinutes} min
                </span>
                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  Cours détaillé + 4 ex. pratiques
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
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-blue-300 bg-blue-50/70 px-3 py-2 text-xs font-bold text-blue-800 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-200"
              >
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-300" />
                Cours & Exercices
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
                    questionIds:
                      chQuestions.length > 0
                        ? chQuestions.map((q) => q.id)
                        : subjQuestions.map((q) => q.id),
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
    };

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
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="h-3.5 w-3.5 rounded-full"
                  style={{ backgroundColor: selectedSubject.color }}
                />
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {selectedSubject.name}
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200">
                  <GraduationCap className="h-3.5 w-3.5" />
                  Classes : {formatClassRange(selectedSubject.classLevels)}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {selectedSubject.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
                  {subjChapters.length} chapitres
                </span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
                  {subjectClasses.length} niveaux de classe
                </span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
                  {subjFiches.length} fiches
                </span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
                  {subjAnnales.length} annales
                </span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 dark:bg-slate-800">
                  {subjQuestions.length} QCM
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

        {/* Class Filter Pills inside Subject */}
        <section className="hc-card rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
              <GraduationCap className="h-4 w-4 text-indigo-600" />
              Découpage par classe ({formatClassRange(selectedSubject.classLevels)})
            </div>
            <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={groupChaptersByClass}
                onChange={(e) => setGroupChaptersByClass(e.target.checked)}
                className="accent-indigo-600"
              />
              Grouper les chapitres par classe
            </label>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setChapterClassFilter('all')}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                activeChapterClassFilter === 'all'
                  ? 'bg-indigo-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              Toutes ({subjChapters.length})
            </button>
            {subjectClasses.map((cl) => {
              const count = subjChapters.filter((ch) => ch.classLevel === cl.id).length;
              return (
                <button
                  key={cl.id}
                  type="button"
                  onClick={() => setChapterClassFilter(cl.id)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                    activeChapterClassFilter === cl.id
                      ? 'bg-indigo-700 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {cl.shortLabel} ({count})
                </button>
              );
            })}
          </div>
        </section>

        {/* Chapters List (Screen 8) */}
        <section className="space-y-4">
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

          {filteredChapters.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700">
              Aucun chapitre ne correspond à ces filtres.
            </div>
          ) : groupChaptersByClass && activeChapterClassFilter === 'all' ? (
            <div className="space-y-6">
              {groupedByClass.map(({ meta, items }) => (
                <div key={meta.id} className="space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-indigo-700 px-2.5 py-1 text-xs font-extrabold text-white">
                        {meta.shortLabel}
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        {meta.label}
                      </h3>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        · {meta.cycleLabel}
                      </span>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {items.length} chapitre{items.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="space-y-2.5">{items.map(renderChapterCard)}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2.5">{filteredChapters.map(renderChapterCard)}</div>
          )}
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
                {subjAnnales.slice(0, 8).map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-700"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{a.title}</p>
                      <p className="text-[11px] text-slate-500">
                        {getClassLevelMeta(a.classLevel).shortLabel} · {a.year} · {a.durationMinutes} min · {a.questionIds.length} q.
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
                  onClick={() => navigate('active-method')}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                >
                  <Brain className="h-4 w-4" />
                  Méthode Active (Feynman / Rédaction)
                </button>
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

  // Screen 6: Bibliothèque de contenus (principale — découpée de la 6e à l’Université)
  const visibleClasses =
    cycleFilter === 'all'
      ? CLASS_LEVELS
      : CLASS_LEVELS.filter((c) => c.cycle === cycleFilter);

  const filteredSubjects = SUBJECTS.filter((s) => {
    const subjClasses = s.classLevels ?? [];
    if (cycleFilter !== 'all') {
      const cycleLevels = SCHOOL_CYCLES.find((c) => c.id === cycleFilter)?.levels ?? [];
      if (!subjClasses.some((cl) => cycleLevels.includes(cl))) return false;
    }
    if (classFilter !== 'all' && !subjClasses.includes(classFilter)) return false;
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

  const handleSelectCycle = (cycle: 'all' | SchoolCycleId) => {
    setCycleFilter(cycle);
    if (cycle !== 'all' && classFilter !== 'all') {
      const levels = SCHOOL_CYCLES.find((c) => c.id === cycle)?.levels ?? [];
      if (!levels.includes(classFilter)) setClassFilter('all');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Bibliothèque de contenus · 6e → Université
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {SUBJECTS.length} matières · {CHAPTERS.length.toLocaleString('fr-FR')} chapitres (72/matière) · {allFiches.length.toLocaleString('fr-FR')} fiches · 11 niveaux de classe 100 % hors ligne.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => navigate('annales')}
            className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            Banque d’annales ({ANNALES.length}) →
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

      {/* Parcours par Cycle & Classe (6e → Master) */}
      <section className="hc-card space-y-3 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/70 to-white p-4 dark:border-indigo-900/60 dark:from-indigo-950/30 dark:to-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-700 dark:text-indigo-400" />
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Filtrer par cycle et par classe (6e → Université)
            </h2>
          </div>
          {profileClassId && (
            <button
              type="button"
              onClick={() => {
                const meta = getClassLevelMeta(profileClassId);
                setCycleFilter(meta.cycle);
                setClassFilter(profileClassId);
              }}
              className="rounded-full bg-indigo-700 px-3 py-1 text-xs font-bold text-white hover:bg-indigo-800"
            >
              Ma classe : {getClassLevelMeta(profileClassId).shortLabel}
            </button>
          )}
        </div>

        {/* Cycles */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setCycleFilter('all');
              setClassFilter('all');
            }}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
              cycleFilter === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700'
            }`}
          >
            Tous les cycles ({SUBJECTS.length} matières)
          </button>
          {SCHOOL_CYCLES.map((cycle) => {
            const count = SUBJECTS.filter((s) =>
              (s.classLevels ?? []).some((cl) => cycle.levels.includes(cl))
            ).length;
            return (
              <button
                key={cycle.id}
                type="button"
                onClick={() => handleSelectCycle(cycle.id)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  cycleFilter === cycle.id
                    ? 'bg-indigo-700 text-white'
                    : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700'
                }`}
              >
                {cycle.label} ({cycle.rangeLabel}) · {count}
              </button>
            );
          })}
        </div>

        {/* 11 Classes Strip */}
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setClassFilter('all')}
            className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
              classFilter === 'all'
                ? 'bg-blue-700 text-white'
                : 'bg-white/90 text-slate-700 ring-1 ring-slate-200 hover:bg-blue-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700'
            }`}
          >
            Toutes classes
          </button>
          {visibleClasses.map((cl) => {
            const totals = classTotals[cl.id];
            return (
              <button
                key={cl.id}
                type="button"
                onClick={() => setClassFilter(cl.id)}
                title={`${cl.label} : ${totals.subjects} matières, ${totals.chapters} chapitres`}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
                  classFilter === cl.id
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'bg-white/90 text-slate-700 ring-1 ring-slate-200 hover:bg-blue-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700'
                }`}
              >
                {cl.shortLabel}{' '}
                <span className={classFilter === cl.id ? 'text-blue-100' : 'text-slate-400'}>
                  ({totals.subjects})
                </span>
              </button>
            );
          })}
        </div>

        {classFilter !== 'all' && (
          <p className="text-xs font-medium text-indigo-900 dark:text-indigo-200">
            <strong>{getClassLevelMeta(classFilter).label}</strong> : {getClassLevelMeta(classFilter).description}{' '}
            ({classTotals[classFilter].subjects} matières · {classTotals[classFilter].chapters} chapitres dédiés)
          </p>
        )}
      </section>

      {/* Search & Filters */}
      <div className="hc-card flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une matière (Maths, Robotique, Allemand, Génétique, Droit Pénal...)"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pl-9 pr-3 text-sm dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
        <select
          aria-label="Filtrer par examen"
          value={examFilter}
          onChange={(e) => setExamFilter(e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="all">Tous les examens / concours ({EXAMS.length})</option>
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
      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
        {filteredSubjects.length} matière{filteredSubjects.length > 1 ? 's' : ''} affichée{filteredSubjects.length > 1 ? 's' : ''} sur {SUBJECTS.length}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredSubjects.map((subj) => {
          const downloaded = isDownloaded('subject', subj.id);
          const pct = downloadingIds[`subject:${subj.id}`];
          const chCount = chapterCountBySubject[subj.id] ?? 0;
          const ficheCount = ficheCountBySubject[subj.id] ?? 0;
          const classSpecificChCount =
            classFilter !== 'all' ? chapterCountBySubjectAndClass[`${subj.id}:${classFilter}`] ?? 0 : null;
          const lockedPremium = subj.isPremium && activeProfile?.plan !== 'premium';

          return (
            <div
              key={subj.id}
              className="hc-card flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full"
                      style={{ backgroundColor: subj.color }}
                    />
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      {subj.name}
                    </h2>
                  </div>
                  {subj.isPremium ? (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900 dark:bg-amber-900 dark:text-amber-100">
                      <Sparkles className="h-3 w-3" />
                      Plus
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                      Gratuit
                    </span>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-800 dark:bg-indigo-950/70 dark:text-indigo-200">
                    <GraduationCap className="h-3 w-3" />
                    {formatClassRange(subj.classLevels)}
                  </span>
                  {classSpecificChCount !== null && (
                    <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                      {classSpecificChCount} ch. en {getClassLevelMeta(classFilter as ClassLevelId).shortLabel}
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

              <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    if (lockedPremium) {
                      setShowPlanModal(true);
                      return;
                    }
                    setSelectedSubjectId(subj.id);
                    setChapterClassFilter(classFilter);
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
