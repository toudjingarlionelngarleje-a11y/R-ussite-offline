import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Cloud,
  Crown,
  HardDrive,
  RefreshCw,
  Smartphone,
  Trash2,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { SyncBadge } from '../components/SyncBadge';
import { useApp } from '../context/AppContext';
import { isOwnerProfile } from '../lib/owner';
import { formatBytesFromKb } from '../lib/storage';
import { isSupabaseConfigured } from '../lib/supabaseSync';

export const StorageSyncScreen: React.FC = () => {
  const {
    state,
    screen,
    isOnline,
    syncStatus,
    toggleSimulatedOffline,
    toggleSimulateSyncError,
    syncNow,
    connectAllAccountsToCloud,
    removeDownloadedItem,
    clearAllDownloads,
    updateAccessibility,
    navigate,
  } = useApp();
  const [linkingCloud, setLinkingCloud] = useState(false);

  const handleLinkAllAccounts = async () => {
    setLinkingCloud(true);
    await connectAllAccountsToCloud();
    setLinkingCloud(false);
  };

  const items = Object.values(state.downloadedItems);
  const packKb = items.filter((i) => i.type === 'subject').reduce((s, i) => s + i.sizeKb, 0);
  const annaleKb = items.filter((i) => i.type === 'annale').reduce((s, i) => s + i.sizeKb, 0);
  const ficheKb = items.filter((i) => i.type === 'fiche').reduce((s, i) => s + i.sizeKb, 0);
  const courseKb = items.filter((i) => i.type === 'course').reduce((s, i) => s + i.sizeKb, 0);
  const personalKb = Math.max(
    18,
    state.sessions.length * 6 + state.notes.length * 3 + Object.keys(state.flashcardProgress).length
  );
  const totalKb = packKb + annaleKb + ficheKb + courseKb + personalKb;
  const maxQuotaKb = 50 * 1024; // 50 Mo soft local budget displayed for low-storage phones
  const usedPct = Math.min(100, Math.max(2, Math.round((totalKb / maxQuotaKb) * 100)));

  // Screen 22: Gestion du stockage sur l'appareil
  if (screen === 'storage') {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Gestion du stockage sur l’appareil
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Optimisé pour les téléphones à espace limité : maîtrise exactement ce qui est conservé dans IndexedDB.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('downloads')}
            className="rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800"
          >
            Télécharger d’autres packs
          </button>
        </div>

        {/* Storage Meter */}
        <section className="hc-card rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                <HardDrive className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Espace local occupé : {formatBytesFromKb(totalKb)}
                </p>
                <p className="text-xs text-slate-500">
                  Sur un budget recommandé de 50 Mo ({usedPct} %) — ultra léger !
                </p>
              </div>
            </div>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearAllDownloads}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-300 bg-red-50 px-3.5 py-2 text-xs font-bold text-red-700 hover:bg-red-100 dark:border-red-900 dark:bg-red-950/60 dark:text-red-200"
              >
                <Trash2 className="h-4 w-4" />
                Vider tous les téléchargements
              </button>
            )}
          </div>

          <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div className="h-full rounded-full bg-blue-700" style={{ width: `${usedPct}%` }} />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {[
              { label: 'Packs matières', kb: packKb, color: 'bg-blue-600' },
              { label: 'Annales', kb: annaleKb, color: 'bg-emerald-600' },
              { label: 'Fiches', kb: ficheKb, color: 'bg-amber-500' },
              { label: 'Cours', kb: courseKb, color: 'bg-purple-600' },
              { label: 'Stats & Notes', kb: personalKb, color: 'bg-slate-600' },
            ].map((b) => (
              <div key={b.label} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                <span className={`inline-block h-2 w-6 rounded-full ${b.color}`} />
                <p className="mt-1 text-[11px] font-semibold text-slate-500">{b.label}</p>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {formatBytesFromKb(b.kb)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Individual Downloaded Items */}
        <section className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Fichiers stockés sur cet appareil ({items.length})
          </h2>
          {items.length === 0 ? (
            <p className="mt-3 text-xs text-slate-500">
              Aucun pack téléchargé pour le moment. Rends-toi dans Téléchargements pour préparer tes révisions hors ligne.
            </p>
          ) : (
            <div className="mt-3 divide-y divide-slate-100 dark:divide-slate-800">
              {items.map((it) => (
                <div key={it.id} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{it.title}</p>
                    <p className="text-xs text-slate-500">
                      Type : {it.type} · {formatBytesFromKb(it.sizeKb)} · Téléchargé le{' '}
                      {new Date(it.downloadedAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeDownloadedItem(it.id)}
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:border-red-300 hover:text-red-600 dark:border-slate-700"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }

  // Screen 23: Synchronisation
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Centre de synchronisation hors ligne
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Tes résultats, notes et progrès se synchronisent automatiquement dès qu’une connexion revient, sans jamais re-télécharger les fichiers existants.
          </p>
        </div>
        <SyncBadge status={syncStatus} pendingCount={state.syncQueue.length} />
      </div>

      {/* Main Sync Status Card */}
      <section className="hc-card rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {isOnline ? <Wifi className="h-6 w-6" /> : <WifiOff className="h-6 w-6" />}
            </div>
            <div>
              <p className="text-base font-extrabold text-slate-900 dark:text-white">
                {isOnline
                  ? isSupabaseConfigured
                    ? 'Connexion active — Supabase Cloud connecté'
                    : 'Connexion active'
                  : 'Mode hors ligne'}
              </p>
              <p className="text-xs text-slate-500">
                Dernière synchronisation :{' '}
                {state.lastSyncAt
                  ? new Date(state.lastSyncAt).toLocaleString('fr-FR')
                  : 'Jamais synchronisé'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleLinkAllAccounts}
              disabled={linkingCloud || !isOnline || !isSupabaseConfigured}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              <Cloud className="h-4 w-4" />
              {linkingCloud ? 'Connexion Cloud...' : 'Lier tous mes comptes au Cloud'}
            </button>
            <button
              type="button"
              onClick={syncNow}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-800"
            >
              <RefreshCw className="h-4 w-4" />
              Synchroniser maintenant
            </button>
          </div>
        </div>

        {/* Cloud-Linked Accounts & Multi-Device Recovery Status */}
        {state.profiles.length > 0 && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-950 dark:text-emerald-100">
                <Cloud className="h-4 w-4 text-emerald-600" />
                Comptes connectés au Cloud ({state.profiles.length}) — Récupérables sur tout appareil
              </p>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200">
                Profil + Progression + Notes + 2FA
              </span>
            </div>
            <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
              {state.profiles.map((prof) => {
                const owner = isOwnerProfile(prof);
                return (
                  <div
                    key={prof.id}
                    className="flex items-center justify-between rounded-lg border border-emerald-200/80 bg-white px-3 py-2 text-xs dark:border-emerald-900 dark:bg-slate-900"
                  >
                    <div>
                      <p className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                        <span>{prof.name}</span>
                        {owner && (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
                            <Crown className="h-2.5 w-2.5" />
                            Propriétaire
                          </span>
                        )}
                      </p>
                      <p className="text-[11px] text-slate-500">{prof.email}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Cloud
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* All 5 States Reference & Interactive Simulation Controls */}
        <div className="mt-5 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2 dark:border-slate-800">
          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3.5 text-xs font-semibold dark:border-slate-700">
            <span className="flex items-center gap-2">
              <WifiOff className="h-4 w-4 text-slate-600" />
              Simuler le mode hors ligne (test sans réseau)
            </span>
            <input
              type="checkbox"
              checked={state.simulatedOffline}
              onChange={toggleSimulatedOffline}
              className="h-5 w-5 accent-blue-700"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3.5 text-xs font-semibold dark:border-slate-700">
            <span className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              Simuler une erreur de synchronisation
            </span>
            <input
              type="checkbox"
              checked={state.simulateSyncError}
              onChange={toggleSimulateSyncError}
              className="h-5 w-5 accent-amber-600"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3.5 text-xs font-semibold dark:border-slate-700">
            <span className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-blue-600" />
              Télécharger les contenus uniquement en Wi-Fi
            </span>
            <input
              type="checkbox"
              checked={state.accessibility.wifiOnlyDownloads}
              onChange={(e) => updateAccessibility({ wifiOnlyDownloads: e.target.checked })}
              className="h-5 w-5 accent-blue-700"
            />
          </label>

          <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-xs text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
            <Smartphone className="h-4 w-4 shrink-0 text-emerald-600" />
            Synchronisation incrémentale : les fichiers déjà présents ne sont jamais re-téléchargés.
          </div>
        </div>
      </section>

      {/* Pending Sync Queue */}
      <section className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
          <Clock className="h-4 w-4 text-amber-600" />
          File d’attente de synchronisation ({state.syncQueue.length})
        </h2>
        {state.syncQueue.length === 0 ? (
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Tout est à jour ! Aucune donnée en attente d’envoi. Passe en mode hors ligne et termine un quiz ou ajoute une note pour observer la mise en file automatique.
          </div>
        ) : (
          <div className="mt-3 space-y-2">
            {state.syncQueue.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50/50 p-3 text-xs dark:border-amber-900 dark:bg-amber-950/30"
              >
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{item.label}</p>
                  <p className="text-[11px] text-slate-500">
                    Enregistré localement le {new Date(item.createdAt).toLocaleString('fr-FR')}
                  </p>
                </div>
                <span className="rounded-lg bg-white px-2 py-1 font-bold text-amber-900 dark:bg-slate-800 dark:text-amber-200">
                  {item.sizeKb} Ko
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
