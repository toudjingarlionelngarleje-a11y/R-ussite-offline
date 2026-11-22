import React from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  DownloadCloud,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Timer,
  Users,
  WifiOff,
} from 'lucide-react';
import { EXAMS, useApp } from '../context/AppContext';

export const WelcomeScreen: React.FC = () => {
  const { state, navigate, loginDemo, switchProfile, setShowPlanModal } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/70 via-slate-50 to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      {/* Compact Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-emerald-600 text-white shadow">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
              Réussite Offline
            </span>
            <span className="ml-2 hidden rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800 sm:inline-block dark:bg-emerald-950 dark:text-emerald-200">
              100 % Hors ligne
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPlanModal(true)}
            className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Gratuit & Plus
          </button>
          <button
            type="button"
            onClick={() => navigate('auth')}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            Connexion
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6">
        {/* Hero */}
        <section className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-blue-800 dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-200">
              <WifiOff className="h-3.5 w-3.5" />
              Conçu pour réviser sans Internet, sans stress et sans consommer ton forfait
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              Prépare tes examens et concours,{' '}
              <span className="text-blue-700 dark:text-blue-400">même sans connexion</span>.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
              Cours structurés, annales corrigées, fiches synthétiques multi-formats, flashcards à répétition espacée et examens blancs chronométrés — tout fonctionne sur ton téléphone ou ton ordinateur, puis se synchronise automatiquement dès que le réseau revient.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => loginDemo('bac-scientifique')}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-blue-800"
              >
                <Sparkles className="h-4 w-4" />
                Essayer immédiatement (Démo hors ligne)
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('auth')}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                Créer mon compte personnalisé
              </button>
            </div>

            {/* Existing local profiles for shared family devices */}
            {state.profiles.length > 0 && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Users className="h-3.5 w-3.5" />
                  Profils enregistrés sur cet appareil (usage familial / partagé)
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {state.profiles.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => switchProfile(p.id)}
                      className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50/70 px-3.5 py-2 text-xs font-bold text-blue-900 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-100"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-700 text-[11px] text-white">
                        {p.name.charAt(0).toUpperCase()}
                      </span>
                      <span>Continuer en tant que {p.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Highlight Card */}
          <div className="lg:col-span-5">
            <div className="hc-card rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Choisis un parcours pour démarrer
              </p>
              <div className="mt-4 space-y-3">
                {EXAMS.map((exam) => (
                  <button
                    key={exam.id}
                    type="button"
                    onClick={() => loginDemo(exam.id)}
                    className="group flex w-full items-start justify-between gap-3 rounded-xl border border-slate-200 p-3.5 text-left transition hover:border-blue-400 hover:bg-blue-50/40 dark:border-slate-700 dark:hover:border-blue-500 dark:hover:bg-blue-950/30"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: exam.badgeColor }}
                        />
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {exam.shortName}
                        </span>
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {exam.category}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                        {exam.description}
                      </p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: DownloadCloud,
              title: 'Offline-first léger',
              desc: 'Télécharge une fois en Wi-Fi (quelques centaines de Ko) et révise partout sans réseau.',
              tone: 'text-blue-700 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-300',
            },
            {
              icon: Timer,
              title: 'Examens blancs réels',
              desc: 'Chronomètre configurable, alertes à mi-parcours, verrouillage des distractions et corrigé détaillé.',
              tone: 'text-amber-700 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-300',
            },
            {
              icon: BookOpen,
              title: 'Fiches & Flashcards SM-2',
              desc: '6 formats de fiches (express, tableau, audio, PDF) et répétition espacée hors ligne.',
              tone: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-300',
            },
            {
              icon: ShieldCheck,
              title: 'Respect de la vie privée',
              desc: 'Données stockées localement, exportables, supprimables, zéro revente et zéro pub.',
              tone: 'text-purple-700 bg-purple-50 dark:bg-purple-950/50 dark:text-purple-300',
            },
          ].map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="hc-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${feat.tone}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                  {feat.title}
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{feat.desc}</p>
              </div>
            );
          })}
        </section>

        {/* Bottom Guarantee */}
        <section className="mt-10 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-emerald-200 bg-emerald-50/70 px-6 py-4 text-xs font-semibold text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Faible consommation de données et de batterie
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Adapté aux zones à couverture limitée
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Accessible : mode sombre, fort contraste, texte réglable & audio
          </span>
        </section>
      </main>
    </div>
  );
};
