import React from 'react';
import { Check, ShieldCheck, Sparkles, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PlanModal: React.FC = () => {
  const { showPlanModal, setShowPlanModal, activeProfile, isOwner, navigate, updateActiveProfile, notify } = useApp();
  if (!showPlanModal) return null;

  const isPremium = activeProfile?.plan === 'premium';

  if (isOwner) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
      >
        <div className="w-full max-w-lg rounded-2xl border-2 border-amber-400 bg-white p-6 shadow-2xl dark:bg-slate-900">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-extrabold text-amber-900">
                👑 Compte Propriétaire / Fondateur
              </span>
              <h2 className="mt-2 text-xl font-extrabold text-slate-900 dark:text-white">
                Accès Illimité à Vie Actif
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setShowPlanModal(false)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Ton compte <strong>{activeProfile?.email}</strong> dispose de tous les privilèges
            Propriétaire, du plan Premium illimité à vie et de la Console Fondateur complète.
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setShowPlanModal(false);
                navigate('owner-hub');
              }}
              className="rounded-xl bg-amber-400 px-4 py-2 text-xs font-extrabold text-slate-950 hover:bg-amber-300"
            >
              Ouvrir la Console Propriétaire
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="plan-modal-title"
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="plan-modal-title" className="text-xl font-bold text-slate-900 dark:text-white">
              Accès équitable — Gratuit & Premium
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Les fonctionnalités essentielles restent 100 % gratuites pour tous les élèves et étudiants.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowPlanModal(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border-2 border-blue-200 bg-blue-50/40 p-5 dark:border-blue-800 dark:bg-blue-950/20">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white">Version Gratuite</h3>
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                0 FCFA / 0 €
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Utile toute l’année, sans publicité invasive et sans vente de données.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
              {[
                'Fonctionnement complet hors ligne',
                'Plusieurs matières (Maths, Physique, SVT, Droit, Éco...)',
                'Sélection d’annales et examens blancs',
                'Fiches synthétiques & flashcards SM-2',
                'Chronomètre configurable & statistiques essentielles',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {activeProfile && isPremium && (
              <button
                type="button"
                onClick={() => {
                  updateActiveProfile({ plan: 'gratuit' });
                  notify('Passage à la formule Gratuite.', 'info');
                  setShowPlanModal(false);
                }}
                className="mt-5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                Revenir au plan Gratuit
              </button>
            )}
          </div>

          <div className="rounded-xl border-2 border-amber-300 bg-amber-50/40 p-5 dark:border-amber-700 dark:bg-amber-950/20">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                <Sparkles className="h-4 w-4 text-amber-600" />
                Réussite Plus
              </h3>
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-900 dark:bg-amber-900 dark:text-amber-100">
                1 500 FCFA / mois
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Pour les concours spécialisés, certifications pro et établissements.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
              {[
                'Concours spécialisés & certifications pro (Agile, Cyber)',
                'Fiches avancées & lecture audio illimitée',
                'Programmes personnalisés adaptatifs avancés',
                'Synchronisation multi-appareils chiffrée',
                'Espace enseignant avancé & statistiques anonymisées',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {activeProfile && (
              <button
                type="button"
                onClick={() => {
                  updateActiveProfile({ plan: 'premium' });
                  notify('Mode Réussite Plus activé sur votre compte !', 'success');
                  setShowPlanModal(false);
                }}
                className="mt-5 w-full rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-700"
              >
                {isPremium ? 'Déjà actif sur ce compte' : 'Activer Réussite Plus (essai gratuit)'}
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-100 p-3 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
          Engagement éthique : aucune publicité ciblée et aucune revente des résultats scolaires.
        </div>
      </div>
    </div>
  );
};
