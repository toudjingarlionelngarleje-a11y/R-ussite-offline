import React, { useState } from 'react';
import {
  BookMarked,
  BookOpen,
  CheckCircle2,
  Download,
  FileText,
  Trash2,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { ANNALES, COURSES, SUBJECTS, useApp } from '../context/AppContext';
import { formatBytesFromKb } from '../lib/storage';

export const DownloadsScreen: React.FC = () => {
  const {
    state,
    allFiches,
    isOnline,
    isDownloaded,
    downloadItem,
    downloadSubjectBundle,
    removeDownloadedItem,
    downloadingIds,
    updateAccessibility,
  } = useApp();

  const [tab, setTab] = useState<'packs' | 'annales' | 'fiches' | 'courses'>('packs');

  const totalDownloadedKb = Object.values(state.downloadedItems).reduce(
    (sum, item) => sum + item.sizeKb,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Téléchargements hors ligne
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Télécharge uniquement ce dont tu as besoin. Les fichiers déjà enregistrés ne sont jamais re-téléchargés.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-right dark:border-slate-800 dark:bg-slate-900">
          <p className="text-[11px] font-semibold uppercase text-slate-500">Espace utilisé</p>
          <p className="text-lg font-extrabold text-blue-700 dark:text-blue-400">
            {formatBytesFromKb(totalDownloadedKb)}
          </p>
        </div>
      </div>

      {/* Wi-Fi Only Switch & Connection Status */}
      <div className="hc-card flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            {isOnline ? <Wifi className="h-5 w-5" /> : <WifiOff className="h-5 w-5" />}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Télécharger uniquement en Wi-Fi (économie de forfait mobile)
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isOnline
                ? 'Connexion disponible — tu peux télécharger de nouveaux packs optimisés.'
                : 'Mode hors ligne : consulte tes contenus déjà téléchargés ci-dessous.'}
            </p>
          </div>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold">
          <input
            type="checkbox"
            checked={state.accessibility.wifiOnlyDownloads}
            onChange={(e) => updateAccessibility({ wifiOnlyDownloads: e.target.checked })}
            className="h-5 w-5 accent-blue-700"
          />
          <span>Wi-Fi uniquement</span>
        </label>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'packs' as const, label: `Packs par matière (${SUBJECTS.length})` },
          { id: 'annales' as const, label: `Annales (${ANNALES.length})` },
          { id: 'fiches' as const, label: `Fiches (${allFiches.length})` },
          { id: 'courses' as const, label: `Cours (${COURSES.length})` },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              tab === t.id
                ? 'bg-blue-700 text-white'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {tab === 'packs' &&
          SUBJECTS.map((s) => {
            const key = `subject:${s.id}`;
            const exists = Boolean(state.downloadedItems[key]);
            const pct = downloadingIds[key];
            return (
              <DownloadRow
                key={s.id}
                icon={BookOpen}
                title={`Pack complet ${s.name}`}
                subtitle="Inclut tous les cours, schémas SVG, fiches synthétiques, flashcards et quiz de la matière"
                sizeKb={s.sizeKb}
                downloaded={exists}
                progress={pct}
                canDownload={isOnline}
                onDownload={() => downloadSubjectBundle(s.id)}
                onRemove={() => removeDownloadedItem(key)}
              />
            );
          })}

        {tab === 'annales' &&
          ANNALES.map((a) => {
            const key = `annale:${a.id}`;
            const exists = isDownloaded('annale', a.id);
            const direct = Boolean(state.downloadedItems[key]);
            return (
              <DownloadRow
                key={a.id}
                icon={FileText}
                title={a.title}
                subtitle={`Session ${a.year} · ${a.questionIds.length} questions + corrigé détaillé`}
                sizeKb={a.sizeKb}
                downloaded={exists}
                progress={downloadingIds[key]}
                canDownload={isOnline}
                onDownload={() =>
                  downloadItem({
                    id: a.id,
                    type: 'annale',
                    title: a.title,
                    subjectId: a.subjectId,
                    sizeKb: a.sizeKb,
                  })
                }
                onRemove={direct ? () => removeDownloadedItem(key) : undefined}
              />
            );
          })}

        {tab === 'fiches' &&
          allFiches.map((f) => {
            const key = `fiche:${f.id}`;
            const exists = isDownloaded('fiche', f.id);
            const direct = Boolean(state.downloadedItems[key]);
            return (
              <DownloadRow
                key={f.id}
                icon={BookMarked}
                title={f.title}
                subtitle={`${f.subtitle} (6 formats dont imprimable & express)`}
                sizeKb={f.sizeKb}
                downloaded={exists}
                progress={downloadingIds[key]}
                canDownload={isOnline}
                onDownload={() =>
                  downloadItem({
                    id: f.id,
                    type: 'fiche',
                    title: f.title,
                    subjectId: f.subjectId,
                    sizeKb: f.sizeKb,
                  })
                }
                onRemove={direct ? () => removeDownloadedItem(key) : undefined}
              />
            );
          })}

        {tab === 'courses' &&
          COURSES.map((c) => {
            const key = `course:${c.id}`;
            const exists = isDownloaded('course', c.id);
            const direct = Boolean(state.downloadedItems[key]);
            return (
              <DownloadRow
                key={c.id}
                icon={BookOpen}
                title={c.title}
                subtitle={`${c.sections.length} sections · ~${c.durationMinutes} min de lecture`}
                sizeKb={c.sizeKb}
                downloaded={exists}
                progress={downloadingIds[key]}
                canDownload={isOnline}
                onDownload={() =>
                  downloadItem({
                    id: c.id,
                    type: 'course',
                    title: c.title,
                    subjectId: c.subjectId,
                    sizeKb: c.sizeKb,
                  })
                }
                onRemove={direct ? () => removeDownloadedItem(key) : undefined}
              />
            );
          })}
      </div>
    </div>
  );
};

const DownloadRow: React.FC<{
  icon: React.FC<{ className?: string }>;
  title: string;
  subtitle: string;
  sizeKb: number;
  downloaded: boolean;
  progress?: number;
  canDownload: boolean;
  onDownload: () => void;
  onRemove?: () => void;
}> = ({ icon: Icon, title, subtitle, sizeKb, downloaded, progress, canDownload, onDownload, onRemove }) => (
  <div className="hc-card flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <div className="flex min-w-0 flex-1 items-start gap-3">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-blue-700 dark:bg-slate-800 dark:text-blue-300">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
        {progress !== undefined && (
          <div className="mt-2 h-2 w-full max-w-xs overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>

    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-slate-500">{formatBytesFromKb(sizeKb)}</span>
      {downloaded ? (
        <>
          <span className="inline-flex items-center gap-1 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
            <CheckCircle2 className="h-4 w-4" />
            Prêt hors ligne
          </span>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:border-red-300 hover:text-red-600 dark:border-slate-700"
              aria-label="Supprimer de l’appareil"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </>
      ) : (
        <button
          type="button"
          onClick={onDownload}
          disabled={!canDownload || progress !== undefined}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800 disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          {progress !== undefined ? `${progress}%` : 'Télécharger'}
        </button>
      )}
    </div>
  </div>
);
