import React, { useState } from 'react';
import {
  AlertTriangle,
  BookMarked,
  CheckCircle2,
  Download,
  Heart,
  Highlighter,
  Layers,
  Printer,
  Search,
  Share2,
  StickyNote,
  Table,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react';
import { SUBJECTS, useApp } from '../context/AppContext';
import { isSpeechSupported, speakFrench, stopSpeaking } from '../lib/speech';

type FicheFormat = 'detaillee' | 'express' | 'tableau' | 'cartes' | 'imprimable';

export const FicheViewerScreen: React.FC = () => {
  const {
    state,
    allFiches,
    selectedFicheId,
    setSelectedFicheId,
    navigate,
    isDownloaded,
    downloadItem,
    toggleFavorite,
    addNote,
    addHighlight,
    updateAccessibility,
    notify,
  } = useApp();

  const [format, setFormat] = useState<FicheFormat>('detaillee');
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [speaking, setSpeaking] = useState(false);
  const [revealedAuto, setRevealedAuto] = useState<Record<number, boolean>>({});
  const [noteText, setNoteText] = useState('');

  const filteredFiches = allFiches.filter((f) => {
    if (subjectFilter !== 'all' && f.subjectId !== subjectFilter) return false;
    if (
      searchTerm.trim() &&
      !`${f.title} ${f.subtitle} ${f.resumeExpress}`
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const fiche =
    allFiches.find((f) => f.id === selectedFicheId) ?? filteredFiches[0] ?? allFiches[0];
  const subject = SUBJECTS.find((s) => s.id === fiche.subjectId);
  const downloaded = isDownloaded('fiche', fiche.id);
  const isFav = state.favorites.fiches.includes(fiche.id);
  const ficheNotes = state.notes.filter(
    (n) => n.targetType === 'fiche' && n.targetId === fiche.id
  );
  const ficheHighlights = state.highlights.filter(
    (h) => h.targetType === 'fiche' && h.targetId === fiche.id
  );

  const handleAudio = () => {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    const script = `Fiche synthétique : ${fiche.title}. Résumé express : ${fiche.resumeExpress}. Notions essentielles : ${fiche.notionsEssentielles.join('. ')}. Erreurs fréquentes à éviter : ${fiche.erreursFrequentes.join('. ')}.`;
    setSpeaking(true);
    speakFrench(script, state.accessibility.audioRate, () => setSpeaking(false));
  };

  const handlePrintPdf = () => {
    setFormat('imprimable');
    window.setTimeout(() => window.print(), 150);
  };

  const handleShare = () => {
    const text = `Fiche Réussite Offline — ${fiche.title}\nRésumé : ${fiche.resumeExpress}`;
    if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
    notify('Résumé de la fiche copié pour partage.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Selector & Search Bar */}
      <div className="no-print flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Fiches synthétiques de révision
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            6 formats disponibles hors ligne : détaillée, express, tableau, cartes mémoire, imprimable PDF et audio.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              const order = ['sm', 'md', 'lg', 'xl'] as const;
              const next = order[(order.indexOf(state.accessibility.fontSize) + 1) % order.length];
              updateAccessibility({ fontSize: next });
            }}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold dark:border-slate-700 dark:bg-slate-800"
          >
            Taille texte : {state.accessibility.fontSize.toUpperCase()}
          </button>
          <button
            type="button"
            onClick={handlePrintPdf}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <Printer className="h-4 w-4" />
            Imprimer / PDF
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Sidebar: Fiche Catalog */}
        <aside className="no-print space-y-3 lg:col-span-4">
          <div className="hc-card space-y-2.5 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher une fiche..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pl-9 pr-3 text-xs dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
            <select
              aria-label="Filtrer les fiches par matière"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="all">Toutes les matières ({allFiches.length})</option>
              {SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <div className="max-h-[420px] space-y-1.5 overflow-y-auto pt-1">
              {filteredFiches.map((f) => {
                const sub = SUBJECTS.find((s) => s.id === f.subjectId);
                const active = f.id === fiche.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      stopSpeaking();
                      setSpeaking(false);
                      setRevealedAuto({});
                      setSelectedFicheId(f.id);
                    }}
                    className={`w-full rounded-xl border p-3 text-left transition ${
                      active
                        ? 'border-blue-600 bg-blue-50/70 dark:border-blue-400 dark:bg-blue-950/60'
                        : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="rounded px-1.5 py-0.5 text-[10px] font-bold text-white"
                        style={{ backgroundColor: sub?.color ?? '#1D4ED8' }}
                      >
                        {sub?.shortName}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500">
                        {f.sizeKb} Ko
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-bold text-slate-900 dark:text-white">
                      {f.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Main Fiche Display */}
        <div className="space-y-4 lg:col-span-8">
          {/* Format Switcher & Action Bar */}
          <div className="no-print hc-card flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'detaillee' as const, label: 'Détaillée', icon: BookMarked },
                { id: 'express' as const, label: 'Express 60s', icon: Zap },
                { id: 'tableau' as const, label: 'Tableau', icon: Table },
                { id: 'cartes' as const, label: 'Cartes mémoire', icon: Layers },
                { id: 'imprimable' as const, label: 'Imprimable', icon: Printer },
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFormat(t.id)}
                    className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-bold ${
                      format === t.id
                        ? 'bg-blue-700 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5">
              {isSpeechSupported() && (
                <button
                  type="button"
                  onClick={handleAudio}
                  className={`inline-flex h-9 items-center gap-1 rounded-xl px-3 text-xs font-bold ${
                    speaking
                      ? 'bg-amber-600 text-white'
                      : 'border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200'
                  }`}
                  title="Version audio facultative"
                >
                  {speaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  Audio
                </button>
              )}
              <button
                type="button"
                onClick={() =>
                  downloadItem({
                    id: fiche.id,
                    type: 'fiche',
                    title: fiche.title,
                    subjectId: fiche.subjectId,
                    sizeKb: fiche.sizeKb,
                  })
                }
                disabled={downloaded}
                className={`inline-flex h-9 items-center gap-1 rounded-xl px-2.5 text-xs font-bold ${
                  downloaded
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                    : 'border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-200'
                }`}
              >
                {downloaded ? <CheckCircle2 className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                {downloaded ? 'Hors ligne' : `${fiche.sizeKb} Ko`}
              </button>
              <button
                type="button"
                onClick={() => toggleFavorite('fiches', fiche.id)}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${
                  isFav ? 'border-rose-300 bg-rose-50 text-rose-600' : 'border-slate-300 text-slate-500 dark:border-slate-700'
                }`}
                aria-label="Ajouter aux favoris"
              >
                <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 text-slate-500 dark:border-slate-700"
                aria-label="Partager la fiche"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Fiche Body */}
          <article className="print-container hc-card rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
              <div>
                <span
                  className="rounded-md px-2 py-0.5 text-[11px] font-bold text-white"
                  style={{ backgroundColor: subject?.color ?? '#1D4ED8' }}
                >
                  {subject?.name}
                </span>
                <h2 className="mt-2 text-xl font-extrabold text-slate-900 dark:text-white">
                  {fiche.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">{fiche.subtitle}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                Format : {format}
              </span>
            </div>

            {/* Express Format */}
            {format === 'express' && (
              <div className="mt-5 space-y-4">
                <div className="rounded-xl border-2 border-blue-200 bg-blue-50/70 p-4 dark:border-blue-800 dark:bg-blue-950/50">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                    Résumé ultra-court (30 secondes avant l’épreuve)
                  </p>
                  <p className="mt-2 text-base font-semibold leading-relaxed text-slate-900 dark:text-white">
                    {fiche.resumeExpress}
                  </p>
                </div>
                {fiche.formules.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Formules & repères vitaux
                    </h3>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {fiche.formules.map((fm) => (
                        <div key={fm.label} className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
                          <p className="text-[11px] font-bold text-slate-500">{fm.label}</p>
                          <p className="mt-0.5 font-mono text-sm font-bold text-blue-800 dark:text-blue-300">
                            {fm.formule}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Table Format */}
            {format === 'tableau' && (
              <div className="mt-5 overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-blue-50 dark:bg-blue-950/60">
                      {fiche.tableauComparatif.headers.map((h) => (
                        <th
                          key={h}
                          className="border border-slate-200 px-3 py-2.5 text-xs font-extrabold text-blue-900 dark:border-slate-700 dark:text-blue-200"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {fiche.tableauComparatif.rows.map((row) => (
                      <tr key={row.critere} className="odd:bg-white even:bg-slate-50/60 dark:odd:bg-slate-900 dark:even:bg-slate-800/40">
                        <td className="border border-slate-200 px-3 py-2.5 font-bold dark:border-slate-700">
                          {row.critere}
                        </td>
                        <td className="border border-slate-200 px-3 py-2.5 dark:border-slate-700">
                          {row.elementA}
                        </td>
                        <td className="border border-slate-200 px-3 py-2.5 dark:border-slate-700">
                          {row.elementB}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Cartes mémoire mode */}
            {format === 'cartes' && (
              <div className="mt-5 space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Teste ta mémoire active sur les définitions et questions d’auto-évaluation de cette fiche :
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ...fiche.definitions.map((d) => ({ q: `Définir : ${d.terme}`, a: d.definition })),
                    ...fiche.autoEvaluation.map((ae) => ({ q: ae.question, a: ae.reponse })),
                  ].map((card, i) => {
                    const shown = Boolean(revealedAuto[i]);
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRevealedAuto((p) => ({ ...p, [i]: !p[i] }))}
                        className="rounded-xl border-2 border-slate-200 bg-slate-50 p-4 text-left transition hover:border-blue-400 dark:border-slate-700 dark:bg-slate-800"
                      >
                        <p className="text-xs font-bold uppercase text-blue-700 dark:text-blue-300">
                          {shown ? 'Réponse' : 'Recto (clique pour retourner)'}
                        </p>
                        <p className="mt-1.5 text-sm font-semibold text-slate-900 dark:text-white">
                          {shown ? card.a : card.q}
                        </p>
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => navigate('flashcards')}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700"
                >
                  <Layers className="h-4 w-4" />
                  Ouvrir le mode Flashcards (Répétition espacée SM-2)
                </button>
              </div>
            )}

            {/* Detailed & Printable Formats */}
            {(format === 'detaillee' || format === 'imprimable') && (
              <div className="mt-5 space-y-5 text-sm">
                <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 dark:border-blue-900 dark:bg-blue-950/40">
                  <p className="text-xs font-bold uppercase text-blue-800 dark:text-blue-300">
                    Résumé très court
                  </p>
                  <p className="mt-1 font-medium text-slate-900 dark:text-white">
                    {fiche.resumeExpress}
                  </p>
                </div>

                <section>
                  <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                    Notions essentielles
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {fiche.notionsEssentielles.map((n, i) => (
                      <li
                        key={i}
                        className="flex items-start justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60"
                      >
                        <span>• {n}</span>
                        <button
                          type="button"
                          onClick={() =>
                            addHighlight({
                              targetType: 'fiche',
                              targetId: fiche.id,
                              text: n,
                              color: 'yellow',
                            })
                          }
                          className="no-print shrink-0 text-amber-600 hover:text-amber-700"
                          title="Surligner cette notion"
                        >
                          <Highlighter className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>

                {fiche.definitions.length > 0 && (
                  <section>
                    <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                      Définitions importantes
                    </h3>
                    <dl className="mt-2 space-y-2">
                      {fiche.definitions.map((d) => (
                        <div key={d.terme} className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                          <dt className="font-bold text-blue-800 dark:text-blue-300">{d.terme}</dt>
                          <dd className="mt-0.5 text-xs text-slate-700 dark:text-slate-300">
                            {d.definition}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                )}

                {fiche.formules.length > 0 && (
                  <section>
                    <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                      Formules & Citations à retenir
                    </h3>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {fiche.formules.map((fm) => (
                        <div key={fm.label} className="rounded-xl border border-blue-200 bg-blue-50/50 p-3 dark:border-blue-900 dark:bg-blue-950/40">
                          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                            {fm.label} {fm.unite ? `(${fm.unite})` : ''}
                          </p>
                          <p className="mt-1 font-mono text-sm font-bold text-blue-900 dark:text-blue-200">
                            {fm.formule}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {fiche.datesReperes.length > 0 && (
                  <section>
                    <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                      Dates & Repères
                    </h3>
                    <ul className="mt-2 space-y-1.5 text-xs">
                      {fiche.datesReperes.map((dr) => (
                        <li key={dr.repere} className="flex gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">{dr.repere} :</span>
                          <span className="text-slate-600 dark:text-slate-300">{dr.detail}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  <section className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
                    <h3 className="text-xs font-extrabold uppercase text-emerald-800 dark:text-emerald-300">
                      Méthodes à retenir
                    </h3>
                    <ul className="mt-2 space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
                      {fiche.methodes.map((m, i) => (
                        <li key={i}>✓ {m}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900 dark:bg-amber-950/30">
                    <h3 className="flex items-center gap-1.5 text-xs font-extrabold uppercase text-amber-900 dark:text-amber-300">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Erreurs fréquentes
                    </h3>
                    <ul className="mt-2 space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
                      {fiche.erreursFrequentes.map((err, i) => (
                        <li key={i}>✗ {err}</li>
                      ))}
                    </ul>
                  </section>
                </div>

                {fiche.exemples.length > 0 && (
                  <section>
                    <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                      Exemples d’application
                    </h3>
                    <div className="mt-2 space-y-2">
                      {fiche.exemples.map((ex) => (
                        <div key={ex.titre} className="rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800">
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{ex.titre}</p>
                          <p className="mt-1 text-xs text-slate-700 dark:text-slate-300">{ex.contenu}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {fiche.autoEvaluation.length > 0 && (
                  <section>
                    <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                      Auto-évaluation rapide
                    </h3>
                    <div className="mt-2 space-y-2">
                      {fiche.autoEvaluation.map((ae, idx) => (
                        <div key={idx} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                          <p className="text-xs font-bold text-slate-900 dark:text-white">
                            Q{idx + 1}. {ae.question}
                          </p>
                          {revealedAuto[idx] || format === 'imprimable' ? (
                            <p className="mt-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                              Réponse : {ae.reponse}
                            </p>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setRevealedAuto((p) => ({ ...p, [idx]: true }))}
                              className="mt-1.5 text-xs font-bold text-blue-700 hover:underline dark:text-blue-400"
                            >
                              Afficher la réponse →
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </article>

          {/* Notes & Highlights on this Fiche */}
          <div className="no-print grid gap-4 md:grid-cols-2">
            <div className="hc-card rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                <StickyNote className="h-4 w-4 text-blue-600" />
                Mes notes sur cette fiche ({ficheNotes.length})
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!noteText.trim()) return;
                  addNote({
                    targetType: 'fiche',
                    targetId: fiche.id,
                    targetTitle: fiche.title,
                    subjectId: fiche.subjectId,
                    content: noteText.trim(),
                  });
                  setNoteText('');
                }}
                className="mt-2 flex gap-2"
              >
                <input
                  type="text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Ajouter un mémo personnel..."
                  className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-blue-700 px-3 py-2 text-xs font-bold text-white"
                >
                  Ajouter
                </button>
              </form>
              <div className="mt-2 space-y-1.5">
                {ficheNotes.map((n) => (
                  <p key={n.id} className="rounded-lg bg-blue-50/70 p-2 text-xs dark:bg-blue-950/40">
                    {n.content}
                  </p>
                ))}
              </div>
            </div>

            <div className="hc-card rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                <Highlighter className="h-4 w-4 text-amber-500" />
                Passages surlignés ({ficheHighlights.length})
              </h3>
              <div className="mt-2 space-y-1.5">
                {ficheHighlights.length === 0 ? (
                  <p className="text-xs text-slate-500">
                    Clique sur l’icône surligneur à côté d’une notion essentielle pour la mémoriser ici.
                  </p>
                ) : (
                  ficheHighlights.map((h) => (
                    <p
                      key={h.id}
                      className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-2 text-xs text-amber-950 dark:bg-amber-950/40 dark:text-amber-100"
                    >
                      {h.text}
                    </p>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
