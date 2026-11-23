import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Download,
  FileDown,
  FileText,
  Heart,
  Play,
  RotateCcw,
  Search,
  Share2,
  Trash2,
} from 'lucide-react';
import { ANNALES, EXAMS, SUBJECTS, useApp } from '../context/AppContext';
import { downloadExamPaperFile } from '../lib/examPaperDownload';
import { Difficulty } from '../types';

export const AnnalesScreen: React.FC = () => {
  const {
    state,
    allQuestions,
    isDownloaded,
    downloadItem,
    removeDownloadedItem,
    downloadingIds,
    toggleFavorite,
    startPractice,
    resumeInProgressSession,
    getMistakeQuestionIds,
    notify,
  } = useApp();

  const [query, setQuery] = useState('');
  const [examFilter, setExamFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | Difficulty>('all');
  const [durationFilter, setDurationFilter] = useState<'all' | 'short' | 'medium'>('all');
  const [quickTag, setQuickTag] = useState<'all' | 'downloaded' | 'favorites' | 'unfinished' | 'review'>('all');
  const [visibleCount, setVisibleCount] = useState(24);

  const years = useMemo(
    () => Array.from(new Set(ANNALES.map((a) => a.year))).sort((a, b) => b - a),
    []
  );
  const mistakeIds = useMemo(() => new Set(getMistakeQuestionIds()), [getMistakeQuestionIds]);

  const getAnnaleStats = (annaleId: string) => {
    const matching = state.sessions.filter((s) => s.annaleId === annaleId);
    const inProg = state.inProgressSession?.annaleId === annaleId;
    const best = matching.length > 0 ? Math.max(...matching.map((m) => m.scorePercent)) : null;
    const status: 'non_commence' | 'en_cours' | 'termine' = inProg
      ? 'en_cours'
      : matching.length > 0
      ? 'termine'
      : 'non_commence';
    return { best, status, attempts: matching.length };
  };

  const filtered = useMemo(
    () =>
      ANNALES.filter((a) => {
        if (examFilter !== 'all' && a.examId !== examFilter) return false;
        if (subjectFilter !== 'all' && a.subjectId !== subjectFilter) return false;
        if (yearFilter !== 'all' && String(a.year) !== yearFilter) return false;
        if (difficultyFilter !== 'all' && a.difficulty !== difficultyFilter) return false;
        if (durationFilter === 'short' && a.durationMinutes > 15) return false;
        if (durationFilter === 'medium' && a.durationMinutes <= 15) return false;

        const st = getAnnaleStats(a.id);
        if (quickTag === 'downloaded' && !isDownloaded('annale', a.id)) return false;
        if (quickTag === 'favorites' && !state.favorites.annales.includes(a.id)) return false;
        if (quickTag === 'unfinished' && st.status === 'termine') return false;
        if (quickTag === 'review' && !a.questionIds.some((qid) => mistakeIds.has(qid))) return false;

        if (query.trim()) {
          const hay = `${a.title} ${a.examType} ${a.year} ${a.countryOrZone ?? ''}`.toLowerCase();
          if (!hay.includes(query.trim().toLowerCase())) return false;
        }
        return true;
      }),
    [
      examFilter,
      subjectFilter,
      yearFilter,
      difficultyFilter,
      durationFilter,
      quickTag,
      query,
      state.sessions,
      state.inProgressSession,
      state.favorites.annales,
      state.downloadedItems,
      mistakeIds,
    ]
  );

  const displayedAnnales = filtered.slice(0, visibleCount);

  const handleDownloadPaper = (annaleId: string, includeCorrection: boolean) => {
    const annale = ANNALES.find((a) => a.id === annaleId);
    if (!annale) return;
    const questions = annale.questionIds
      .map((id) => allQuestions.find((q) => q.id === id))
      .filter((q): q is NonNullable<typeof q> => Boolean(q));
    downloadExamPaperFile({
      annale,
      subject: SUBJECTS.find((s) => s.id === annale.subjectId),
      exam: EXAMS.find((e) => e.id === annale.examId),
      questions,
      includeCorrection,
    });
    notify(
      includeCorrection
        ? `Sujet + corrigé « ${annale.title} » téléchargé (imprimable en PDF).`
        : `Sujet à traiter « ${annale.title} » téléchargé sur ton appareil (prêt à imprimer ou traiter hors ligne).`,
      'success'
    );
  };

  const handleShare = (title: string) => {
    const shareText = `Sujet d'entraînement Réussite Offline : ${title}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).catch(() => {});
    }
    notify('Lien / résumé du sujet copié pour partage.', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Banque de sujets & d’annales
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Filtre par matière, année, difficulté ou durée. Télécharge les sujets une fois et passe-les hors ligne.
        </p>
      </div>

      {/* Filters Panel */}
      <div className="hc-card space-y-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-6">
          <div className="relative lg:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un ancien sujet (BEPC, Bac, BTS, Santé...)"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pl-9 pr-3 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <select
            aria-label="Filtrer par examen"
            value={examFilter}
            onChange={(e) => setExamFilter(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="all">Tous les examens ({EXAMS.length})</option>
            {EXAMS.map((e) => (
              <option key={e.id} value={e.id}>
                {e.shortName}
              </option>
            ))}
          </select>
          <select
            aria-label="Filtrer par matière"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="all">Toutes les matières ({SUBJECTS.length})</option>
            {SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <select
            aria-label="Filtrer par année"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
          >
            <option value="all">Toutes les années</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>
                Session {y}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-2">
            <select
              aria-label="Filtrer par difficulté"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value as 'all' | Difficulty)}
              className="rounded-xl border border-slate-300 bg-white px-2 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="all">Difficulté</option>
              <option value="facile">Facile</option>
              <option value="moyen">Moyen</option>
              <option value="difficile">Difficile</option>
            </select>
            <select
              aria-label="Filtrer par durée"
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value as 'all' | 'short' | 'medium')}
              className="rounded-xl border border-slate-300 bg-white px-2 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="all">Durée</option>
              <option value="short">≤ 15 min</option>
              <option value="medium">&gt; 15 min</option>
            </select>
          </div>
        </div>

        {/* Quick filter chips */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all' as const, label: `Tous (${ANNALES.length})` },
            { id: 'downloaded' as const, label: 'Téléchargés' },
            { id: 'favorites' as const, label: 'Favoris' },
            { id: 'unfinished' as const, label: 'Non terminés' },
            { id: 'review' as const, label: 'À revoir' },
          ].map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => setQuickTag(chip.id)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                quickTag === chip.id
                  ? 'bg-blue-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results summary */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span>
          Affichage de <strong className="text-slate-900 dark:text-white">{displayedAnnales.length}</strong> sur{' '}
          <strong className="text-slate-900 dark:text-white">{filtered.length}</strong> anciens sujets correspondants
          ({ANNALES.length} au total)
        </span>
        {filtered.length > visibleCount && (
          <button
            type="button"
            onClick={() => setVisibleCount((n) => n + 30)}
            className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300"
          >
            + Voir plus
          </button>
        )}
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700">
            Aucun sujet ne correspond à ces filtres.
          </div>
        ) : (
          displayedAnnales.map((a) => {
            const subj = SUBJECTS.find((s) => s.id === a.subjectId);
            const exam = EXAMS.find((e) => e.id === a.examId);
            const downloaded = isDownloaded('annale', a.id);
            const directKey = `annale:${a.id}`;
            const downloadedMeta = state.downloadedItems[directKey];
            const pct = downloadingIds[directKey];
            const isFav = state.favorites.annales.includes(a.id);
            const st = getAnnaleStats(a.id);

            const statusBadge =
              st.status === 'termine'
                ? { label: 'Terminé', cls: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200' }
                : st.status === 'en_cours'
                ? { label: 'En cours', cls: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200' }
                : { label: 'Non commencé', cls: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' };

            return (
              <article
                key={a.id}
                className="hc-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
                      <span
                        className="rounded-md px-2 py-0.5 text-white"
                        style={{ backgroundColor: subj?.color ?? '#1D4ED8' }}
                      >
                        {subj?.shortName}
                      </span>
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        {a.year}
                      </span>
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 capitalize text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        {a.difficulty}
                      </span>
                      <span className={`rounded-md px-2 py-0.5 ${statusBadge.cls}`}>
                        {statusBadge.label}
                      </span>
                      {downloaded && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                          <CheckCircle2 className="h-3 w-3" />
                          Hors ligne
                        </span>
                      )}
                    </div>

                    <h2 className="mt-2 text-base font-bold text-slate-900 dark:text-white">
                      {a.title}
                    </h2>

                    <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
                      <span>{exam?.shortName} · {a.examType}</span>
                      {a.countryOrZone && <span>{a.countryOrZone}</span>}
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {a.durationMinutes} min · {a.questionIds.length} questions ({a.responseFormat})
                      </span>
                      <span>Taille : {a.sizeKb} Ko · {a.language}</span>
                      {a.bareme && <span>{a.bareme}</span>}
                      {downloadedMeta && (
                        <span>
                          Téléchargé le {new Date(downloadedMeta.downloadedAt).toLocaleDateString('fr-FR')}
                        </span>
                      )}
                      {st.best !== null && (
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">
                          Meilleur score : {st.best} %
                        </span>
                      )}
                    </div>

                    {/* Offline Printable Paper Download Bar */}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDownloadPaper(a.id, false)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-blue-950 dark:hover:text-blue-200"
                        title="Télécharger l'énoncé seul en fichier hors ligne (imprimable en PDF) pour le traiter sur papier"
                      >
                        <FileDown className="h-3.5 w-3.5 text-blue-700 dark:text-blue-400" />
                        Télécharger l’énoncé à traiter
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownloadPaper(a.id, true)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[11px] font-bold text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-200"
                        title="Télécharger le sujet complet accompagné de son corrigé détaillé"
                      >
                        <FileText className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
                        Énoncé + Corrigé (PDF/HTML)
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    {st.status === 'en_cours' ? (
                      <button
                        type="button"
                        onClick={resumeInProgressSession}
                        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-amber-700"
                      >
                        <Play className="h-3.5 w-3.5" />
                        Reprendre
                      </button>
                    ) : (
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
                            timerMode: 'countdown',
                          })
                        }
                        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-blue-700 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-800"
                      >
                        {st.status === 'termine' ? (
                          <>
                            <RotateCcw className="h-3.5 w-3.5" />
                            Recommencer
                          </>
                        ) : (
                          <>
                            <Play className="h-3.5 w-3.5" />
                            Examen blanc
                          </>
                        )}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        startPractice({
                          mode: 'libre',
                          title: `Entraînement libre — ${a.title}`,
                          annaleId: a.id,
                          subjectId: a.subjectId,
                          questionIds: a.questionIds,
                          immediateFeedback: true,
                        })
                      }
                      className="inline-flex min-h-[40px] items-center gap-1 rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
                    >
                      Mode libre
                    </button>

                    {downloadedMeta ? (
                      <button
                        type="button"
                        onClick={() => removeDownloadedItem(directKey)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 text-slate-600 hover:border-red-300 hover:text-red-600 dark:border-slate-700"
                        title="Supprimer de l’appareil"
                        aria-label="Supprimer de l’appareil"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          downloadItem({
                            id: a.id,
                            type: 'annale',
                            title: a.title,
                            subjectId: a.subjectId,
                            sizeKb: a.sizeKb,
                          })
                        }
                        disabled={downloaded || pct !== undefined}
                        className="inline-flex h-10 items-center gap-1 rounded-xl border border-slate-300 px-3 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:text-slate-200"
                        title="Télécharger hors ligne"
                      >
                        <Download className="h-4 w-4" />
                        {pct !== undefined ? `${pct}%` : downloaded ? 'OK' : `${a.sizeKb} Ko`}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleFavorite('annales', a.id)}
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${
                        isFav
                          ? 'border-rose-300 bg-rose-50 text-rose-600 dark:border-rose-800 dark:bg-rose-950'
                          : 'border-slate-300 text-slate-500 hover:bg-slate-50 dark:border-slate-700'
                      }`}
                      aria-label="Ajouter aux favoris"
                    >
                      <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>

                    {a.shareable && (
                      <button
                        type="button"
                        onClick={() => handleShare(a.title)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 text-slate-500 hover:bg-slate-50 dark:border-slate-700"
                        aria-label="Partager le sujet"
                        title="Partager"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })
        )}

        {filtered.length > visibleCount && (
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setVisibleCount((n) => n + 30)}
              className="rounded-xl bg-blue-700 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-800"
            >
              Charger 30 sujets supplémentaires ({filtered.length - visibleCount} restants)
            </button>
            <button
              type="button"
              onClick={() => setVisibleCount(filtered.length)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              Tout afficher ({filtered.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
