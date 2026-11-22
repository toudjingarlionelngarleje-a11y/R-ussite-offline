import React, { useState } from 'react';
import { ArrowLeft, GraduationCap, Lock, ShieldCheck, UserPlus } from 'lucide-react';
import { USER_CATEGORIES } from '../data';
import { useApp } from '../context/AppContext';
import { UserCategory } from '../types';

export const AuthScreen: React.FC = () => {
  const { state, navigate, registerAccount, loginAccount, switchProfile, loginDemo } = useApp();
  const [tab, setTab] = useState<'register' | 'login'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState<UserCategory>('lyceen');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const res =
      tab === 'register'
        ? await registerAccount({ name, email, password, category })
        : await loginAccount(email, password);
    setBusy(false);
    if (!res.ok) setError(res.error ?? 'Une erreur est survenue.');
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-4 py-8">
      <button
        type="button"
        onClick={() => navigate('welcome')}
        className="mb-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-700 dark:text-slate-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à l’accueil
      </button>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="hc-card rounded-2xl border border-slate-200 bg-white p-6 shadow-lg lg:col-span-7 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {tab === 'register' ? 'Créer un compte hors ligne' : 'Connexion locale sécurisée'}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Fonctionne même sans Internet grâce au stockage local chiffré.
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => {
                setTab('register');
                setError(null);
              }}
              className={`rounded-lg py-2 text-sm font-semibold transition ${
                tab === 'register'
                  ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-900 dark:text-blue-300'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Inscription
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('login');
                setError(null);
              }}
              className={`rounded-lg py-2 text-sm font-semibold transition ${
                tab === 'login'
                  ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-900 dark:text-blue-300'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Connexion
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {tab === 'register' && (
              <>
                <div>
                  <label htmlFor="auth-name" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Prénom et nom (ou pseudo)
                  </label>
                  <input
                    id="auth-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex. Moussa Idriss"
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Ta catégorie d’utilisateur
                  </label>
                  <div className="mt-1.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {USER_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`rounded-xl border p-2.5 text-left transition ${
                          category === cat.id
                            ? 'border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/60'
                            : 'border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800'
                        }`}
                      >
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{cat.label}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{cat.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div>
              <label htmlFor="auth-email" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Adresse e-mail
              </label>
              <input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ex. etudiant@domaine.td"
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="auth-pwd" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Mot de passe (haché localement en SHA-256)
              </label>
              <input
                id="auth-pwd"
                type="password"
                required
                minLength={4}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-800 dark:border-red-900 dark:bg-red-950/60 dark:text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800 disabled:opacity-60"
            >
              {tab === 'register' ? <UserPlus className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              {tab === 'register' ? 'Créer mon compte et configurer mon examen' : 'Me connecter'}
            </button>
          </form>
        </div>

        <div className="space-y-4 lg:col-span-5">
          <div className="hc-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Appareil partagé en famille ?
            </h2>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Chaque membre peut garder son propre profil, ses notes et sa progression sur le même téléphone sans mélanger les résultats.
            </p>
            {state.profiles.length > 0 && (
              <div className="mt-3 space-y-2">
                {state.profiles.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => switchProfile(p.id)}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-left text-xs hover:border-blue-400 dark:border-slate-700"
                  >
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{p.name}</p>
                      <p className="text-slate-500">{p.email}</p>
                    </div>
                    <span className="font-semibold text-blue-700 dark:text-blue-400">Ouvrir →</span>
                  </button>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => loginDemo('bac-scientifique')}
              className="mt-4 w-full rounded-xl border border-blue-200 bg-blue-50 px-3 py-2.5 text-xs font-bold text-blue-800 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-200"
            >
              Accéder rapidement avec le compte démo
            </button>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
            <p className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Confidentialité garantie
            </p>
            <p className="mt-1 leading-relaxed">
              Tes données restent sur cet appareil dans IndexedDB. Tu peux les exporter ou supprimer ton compte à tout moment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
