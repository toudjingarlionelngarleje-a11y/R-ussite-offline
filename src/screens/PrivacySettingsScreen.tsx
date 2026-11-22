import React, { useState } from 'react';
import {
  BatteryCharging,
  Download,
  Eye,
  Lock,
  Moon,
  Shield,
  ShieldCheck,
  Trash2,
  Volume2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FontSizeScale } from '../types';

export const PrivacySettingsScreen: React.FC = () => {
  const {
    state,
    activeProfile,
    navigate,
    updateAccessibility,
    updatePrivacy,
    exportUserData,
    clearAllDownloads,
    deleteActiveAccount,
    resetAllLocalData,
  } = useApp();

  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Confidentialité, Sécurité & Accessibilité
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Gère tes préférences d’inclusion, le chiffrement local, tes consentements et le contrôle total sur tes données.
        </p>
      </div>

      {/* Direct access banner to Security Firewall & Antivirus Center */}
      <section className="flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-emerald-900/50 dark:bg-emerald-950/30">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-sm font-extrabold text-emerald-950 dark:text-emerald-200">
              Centre de Sécurité, Pare-feu WAF & Antivirus (36 systèmes actifs)
            </p>
            <p className="text-xs text-emerald-800/90 dark:text-emerald-300/80">
              Lance un scan antivirus complet, teste le pare-feu anti-XSS/SQLi/EICAR, analyse un fichier local
              et consulte le journal SIEM de quarantaine.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate('security')}
          className="shrink-0 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
        >
          Ouvrir le Bouclier
        </button>
      </section>

      {/* Accessibility & Low-Resource Optimization (Section 14) */}
      <section className="hc-card space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
          <Eye className="h-5 w-5 text-blue-600" />
          Accessibilité, Inclusion & Économie d’énergie
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3.5 text-xs font-semibold dark:border-slate-700">
            <span className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-blue-600" />
              Mode sombre (repos visuel nocturne)
            </span>
            <input
              type="checkbox"
              checked={state.accessibility.darkMode}
              onChange={(e) => updateAccessibility({ darkMode: e.target.checked })}
              className="h-5 w-5 accent-blue-700"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3.5 text-xs font-semibold dark:border-slate-700">
            <span className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-slate-800 dark:text-white" />
              Mode contraste élevé (malvoyance)
            </span>
            <input
              type="checkbox"
              checked={state.accessibility.highContrast}
              onChange={(e) => updateAccessibility({ highContrast: e.target.checked })}
              className="h-5 w-5 accent-blue-700"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3.5 text-xs font-semibold dark:border-slate-700">
            <span className="flex items-center gap-2">
              <BatteryCharging className="h-4 w-4 text-emerald-600" />
              Mode économie de batterie & appareils modestes
            </span>
            <input
              type="checkbox"
              checked={state.accessibility.batterySaver}
              onChange={(e) =>
                updateAccessibility({
                  batterySaver: e.target.checked,
                  reducedMotion: e.target.checked,
                })
              }
              className="h-5 w-5 accent-emerald-600"
            />
          </label>

          <div className="rounded-xl border border-slate-200 p-3.5 dark:border-slate-700">
            <label className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-purple-600" />
                Vitesse de lecture audio : {state.accessibility.audioRate}x
              </span>
            </label>
            <input
              type="range"
              min={0.75}
              max={1.4}
              step={0.05}
              value={state.accessibility.audioRate}
              onChange={(e) => updateAccessibility({ audioRate: Number(e.target.value) })}
              className="mt-2 w-full accent-blue-700"
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
            Taille de police réglable
          </p>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {(
              [
                { id: 'sm', label: 'Petit' },
                { id: 'md', label: 'Normal' },
                { id: 'lg', label: 'Grand' },
                { id: 'xl', label: 'Très grand' },
              ] as { id: FontSizeScale; label: string }[]
            ).map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => updateAccessibility({ fontSize: f.id })}
                className={`rounded-xl border py-2 text-xs font-bold ${
                  state.accessibility.fontSize === f.id
                    ? 'border-blue-600 bg-blue-700 text-white'
                    : 'border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Security (Section 17) */}
      <section className="hc-card space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
          <Shield className="h-5 w-5 text-emerald-600" />
          Sécurité, Consentement & Politique de confidentialité
        </h2>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs leading-relaxed text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
          <p className="flex items-center gap-1.5 font-extrabold">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Engagement clair de Réussite Offline
          </p>
          <p className="mt-1">
            Nous ne vendons jamais les données personnelles des élèves et étudiants et n’utilisons jamais tes résultats scolaires à des fins publicitaires. Ton mot de passe est haché localement (SHA-256), tes révisions sont stockées dans ton espace local IndexedDB et la synchronisation utilise un canal chiffré.
          </p>
        </div>

        <div className="space-y-2.5">
          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3.5 text-xs font-semibold dark:border-slate-700">
            <span className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-600" />
              Protection & chiffrement du stockage local
            </span>
            <input
              type="checkbox"
              checked={state.privacy.localEncryptionEnabled}
              onChange={(e) => updatePrivacy({ localEncryptionEnabled: e.target.checked })}
              className="h-5 w-5 accent-emerald-600"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3.5 text-xs font-semibold dark:border-slate-700">
            <span>Autoriser l’assistant pédagogique IA (explications hors ligne)</span>
            <input
              type="checkbox"
              checked={state.privacy.aiAssistanceConsent}
              onChange={(e) => updatePrivacy({ aiAssistanceConsent: e.target.checked })}
              className="h-5 w-5 accent-blue-700"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3.5 text-xs font-semibold dark:border-slate-700">
            <span>Partager des statistiques strictement anonymisées pour améliorer les cours</span>
            <input
              type="checkbox"
              checked={state.privacy.analyticsConsent}
              onChange={(e) => updatePrivacy({ analyticsConsent: e.target.checked })}
              className="h-5 w-5 accent-blue-700"
            />
          </label>
        </div>

        {/* User Rights: Export, Clear, Delete Account */}
        <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <button
            type="button"
            onClick={exportUserData}
            className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800"
          >
            <Download className="h-4 w-4" />
            Exporter toutes mes données (JSON)
          </button>

          <button
            type="button"
            onClick={clearAllDownloads}
            className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
          >
            <Trash2 className="h-4 w-4" />
            Supprimer les contenus téléchargés
          </button>

          {activeProfile && (
            <button
              type="button"
              onClick={() => setConfirmDelete((v) => !v)}
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-xs font-bold text-red-700 hover:bg-red-100 dark:border-red-900 dark:bg-red-950/60 dark:text-red-200"
            >
              <Trash2 className="h-4 w-4" />
              Supprimer définitivement mon compte
            </button>
          )}
        </div>

        {confirmDelete && (
          <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-xs text-red-900 dark:border-red-900 dark:bg-red-950/60 dark:text-red-200">
            <p className="font-bold">
              Confirmer la suppression définitive du compte « {activeProfile?.name} » ?
            </p>
            <p className="mt-1">
              Cette action efface ton profil, tes résultats, tes notes et ton planning de cet appareil. Pense à exporter tes données avant si besoin.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={deleteActiveAccount}
                className="rounded-xl bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
              >
                Oui, supprimer définitivement
              </button>
              <button
                type="button"
                onClick={resetAllLocalData}
                className="rounded-xl border border-red-400 px-4 py-2 font-bold"
              >
                Réinitialiser tout l’appareil
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="rounded-xl bg-white px-4 py-2 font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
