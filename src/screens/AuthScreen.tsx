import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Cloud,
  Crown,
  GraduationCap,
  KeyRound,
  Lock,
  LogIn,
  ShieldCheck,
  UserPlus,
  WifiOff,
} from 'lucide-react';
import { USER_CATEGORIES } from '../data';
import { LegacyCloudAccountPreview, useApp } from '../context/AppContext';
import { isTwoFactorMandatoryForProfile } from '../lib/twoFactor';
import { UserCategory } from '../types';

export const AuthScreen: React.FC = () => {
  const {
    state,
    navigate,
    registerAccount,
    loginAccount,
    activateLegacyCloudAccount,
    switchProfile,
  } = useApp();
  // If an account already exists on this device, default to 'login' so the user can reconnect directly
  const [tab, setTab] = useState<'register' | 'login'>(() =>
    state.profiles.length > 0 ? 'login' : 'register'
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState<UserCategory>('lyceen');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Seamless Cloud activation state for legacy accounts (pre-v17 users & Owner on a new device)
  const [legacyAccount, setLegacyAccount] = useState<LegacyCloudAccountPreview | null>(null);
  const [cloudNewPassword, setCloudNewPassword] = useState('');
  const [cloudConfirmPassword, setCloudConfirmPassword] = useState('');
  const [cloudMfaInput, setCloudMfaInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    if (tab === 'register') {
      const res = await registerAccount({ name, email, password, category });
      setBusy(false);
      if (!res.ok) setError(res.error ?? 'Une erreur est survenue.');
      return;
    }

    const res = await loginAccount(email, password);
    setBusy(false);
    if (!res.ok) {
      if (res.requiresCloudActivation && res.legacyAccount) {
        setLegacyAccount(res.legacyAccount);
        setCloudNewPassword(password.length >= 6 ? password : '');
        setCloudConfirmPassword('');
        setCloudMfaInput('');
        setError(null);
      } else {
        setError(res.error ?? 'Une erreur est survenue.');
      }
    }
  };

  const handleLegacyActivation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!legacyAccount) return;
    setError(null);

    if (cloudNewPassword.length < 6) {
      setError('Choisis un mot de passe Cloud d’au moins 6 caractères.');
      return;
    }
    if (cloudNewPassword !== cloudConfirmPassword) {
      setError('Les deux mots de passe ne correspondent pas.');
      return;
    }
    if ((legacyAccount.hasMfaPin || legacyAccount.hasRecoveryCodes) && !cloudMfaInput.trim()) {
      setError('Saisis ton Code PIN 2FA Maître ou un code de récupération pour confirmer ton identité.');
      return;
    }

    setBusy(true);
    const res = await activateLegacyCloudAccount({
      email: legacyAccount.email,
      newPassword: cloudNewPassword,
      mfaPinOrRecovery: cloudMfaInput.trim() || undefined,
    });
    setBusy(false);
    if (!res.ok) {
      setError(res.error ?? 'Impossible d’activer ton compte Cloud.');
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-emerald-600 text-white shadow">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <p className="text-base font-extrabold text-slate-900 dark:text-white">Réussite Offline</p>
            <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
              100 matières · 10 000 chapitres · 100 % Hors ligne
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate('welcome')}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Découvrir le programme
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="hc-card rounded-2xl border border-slate-200 bg-white p-6 shadow-lg lg:col-span-7 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white">
              {tab === 'register' ? <UserPlus className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {tab === 'register'
                  ? 'Créer ton compte personnel'
                  : 'Connexion à ton compte existant'}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {tab === 'register'
                  ? 'Nouveau sur Réussite Offline ? Crée ton compte en 30 secondes.'
                  : 'Déjà inscrit ? Connecte-toi directement avec ton e-mail et ton mot de passe (local & cloud).'}
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => {
                setTab('register');
                setLegacyAccount(null);
                setError(null);
              }}
              className={`rounded-lg py-2.5 text-sm font-bold transition ${
                tab === 'register'
                  ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-900 dark:text-blue-300'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Créer un compte
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('login');
                setLegacyAccount(null);
                setError(null);
              }}
              className={`rounded-lg py-2.5 text-sm font-bold transition ${
                tab === 'login'
                  ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-900 dark:text-blue-300'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              J’ai déjà un compte
            </button>
          </div>

          {legacyAccount ? (
            <form onSubmit={handleLegacyActivation} className="mt-5 space-y-4">
              <div className="rounded-xl border border-emerald-300 bg-emerald-50/80 p-4 dark:border-emerald-800 dark:bg-emerald-950/40">
                <div className="flex flex-wrap items-center gap-2">
                  <Cloud className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                  <p className="text-sm font-extrabold text-emerald-950 dark:text-emerald-100">
                    Ancien compte retrouvé sur le Cloud !
                  </p>
                  {legacyAccount.isOwner && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
                      <Crown className="h-3 w-3" />
                      Propriétaire
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                  {legacyAccount.name} · <span className="font-normal">{legacyAccount.email}</span>
                </p>
                <p className="mt-1 text-[11px] text-emerald-800 dark:text-emerald-300">
                  Série : {legacyAccount.streakDays} j · {legacyAccount.sessionsCount} session(s) ·{' '}
                  {legacyAccount.notesCount} note(s) prêtes à être restaurées.
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-emerald-900/90 dark:text-emerald-200/90">
                  Ce compte a été créé avant l’activation de la synchronisation multi-appareils. Définis
                  ton mot de passe Cloud une seule fois pour te connecter ensuite sur n’importe quel appareil.
                </p>
              </div>

              {(legacyAccount.hasMfaPin || legacyAccount.hasRecoveryCodes) && (
                <div className="rounded-xl border border-amber-300 bg-amber-50/80 p-3.5 dark:border-amber-800 dark:bg-amber-950/40">
                  <label
                    htmlFor="cloud-mfa-code"
                    className="flex items-center gap-1.5 text-xs font-bold text-amber-950 dark:text-amber-100"
                  >
                    <KeyRound className="h-4 w-4 text-amber-700 dark:text-amber-300" />
                    Vérification 2FA obligatoire (Code PIN Maître ou code de récupération)
                  </label>
                  <input
                    id="cloud-mfa-code"
                    type="password"
                    required
                    value={cloudMfaInput}
                    onChange={(e) => setCloudMfaInput(e.target.value)}
                    placeholder="Ton Code PIN 2FA ou code XXXX-XXXX"
                    className="mt-1.5 w-full rounded-xl border border-amber-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-amber-600 dark:border-amber-700 dark:bg-slate-800 dark:text-white"
                  />
                  <p className="mt-1 text-[11px] text-amber-800 dark:text-amber-300">
                    Protection anti-usurpation : seul le titulaire authentique peut activer ce compte protégé.
                  </p>
                </div>
              )}

              <div>
                <label
                  htmlFor="cloud-new-pwd"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Mot de passe Cloud (6 caractères min.)
                </label>
                <input
                  id="cloud-new-pwd"
                  type="password"
                  required
                  minLength={6}
                  value={cloudNewPassword}
                  onChange={(e) => setCloudNewPassword(e.target.value)}
                  placeholder="Choisis ton mot de passe Cloud sécurisé"
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="cloud-confirm-pwd"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Confirmer le mot de passe Cloud
                </label>
                <input
                  id="cloud-confirm-pwd"
                  type="password"
                  required
                  minLength={6}
                  value={cloudConfirmPassword}
                  onChange={(e) => setCloudConfirmPassword(e.target.value)}
                  placeholder="Répète le mot de passe Cloud"
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-800 dark:border-red-900 dark:bg-red-950/60 dark:text-red-200">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-60"
                >
                  <Cloud className="h-4 w-4" />
                  {busy
                    ? 'Activation & restauration Cloud...'
                    : 'Activer & récupérer mon compte'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLegacyAccount(null);
                    setError(null);
                  }}
                  className="rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Retour
                </button>
              </div>
            </form>
          ) : (
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
                Mot de passe (protégé par PBKDF2-SHA256)
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

            {tab === 'register' && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 text-[11px] leading-relaxed text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-200">
                <span className="inline-flex items-center gap-1 font-bold">
                  <Cloud className="h-3.5 w-3.5 text-emerald-600" />
                  Enregistrement Cloud automatique activé :
                </span>{' '}
                chaque nouveau compte créé est automatiquement enregistré sur le Cloud Supabase (ou dès le retour d’Internet si tu es hors ligne) afin d’être accessible sur tous tes appareils.
              </div>
            )}

            {tab === 'login' && (
              <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3 text-[11px] leading-relaxed text-blue-900 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-200">
                <span className="font-bold">Ancien compte ou compte Propriétaire sur un nouvel appareil ?</span>{' '}
                Saisis ton adresse e-mail et ton mot de passe : si ton compte provient d’une version précédente,
                l’application te proposera immédiatement de l’activer et de restaurer toutes tes données depuis le Cloud.
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800 disabled:opacity-60"
            >
              {tab === 'register' ? <UserPlus className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              {busy
                ? 'Vérification sécurisée...'
                : tab === 'register'
                ? 'Créer mon compte et choisir mon examen'
                : 'Se connecter à mon compte'}
            </button>

            <div className="pt-1 text-center text-xs text-slate-500 dark:text-slate-400">
              {tab === 'register' ? (
                <>
                  Tu as déjà un compte ?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setTab('login');
                      setError(null);
                    }}
                    className="font-bold text-blue-700 hover:underline dark:text-blue-400"
                  >
                    Connecte-toi directement ici
                  </button>
                </>
              ) : (
                <>
                  Pas encore de compte ?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setTab('register');
                      setError(null);
                    }}
                    className="font-bold text-blue-700 hover:underline dark:text-blue-400"
                  >
                    Crée ton compte gratuitement
                  </button>
                </>
              )}
            </div>
          </form>
          )}
        </div>

        <div className="space-y-4 lg:col-span-5">
          {state.profiles.length > 0 && (
            <div className="hc-card rounded-2xl border border-blue-200 bg-white p-5 shadow-sm dark:border-blue-900/60 dark:bg-slate-900">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Comptes déjà enregistrés sur cet appareil
              </h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Clique directement sur ton compte existant pour reprendre tes révisions sans rien recréer.
              </p>
              <div className="mt-3 space-y-2">
                {state.profiles.map((p) => {
                  const protected2fa = isTwoFactorMandatoryForProfile(p);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => switchProfile(p.id)}
                      className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-3 py-2.5 text-left text-xs transition hover:border-blue-400 hover:bg-blue-50/50 dark:border-slate-700 dark:hover:bg-blue-950/30"
                    >
                      <div>
                        <p className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                          <span>{p.name}</span>
                          {protected2fa && (
                            <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
                              🔐 2FA
                            </span>
                          )}
                        </p>
                        <p className="text-slate-500">{p.email}</p>
                      </div>
                      <span className="font-bold text-blue-700 dark:text-blue-400">
                        {protected2fa ? 'Vérifier 2FA →' : 'Ouvrir →'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="hc-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <WifiOff className="h-4 w-4 text-blue-600" />
              Un seul compte, tous tes appareils
            </h2>
            <ul className="mt-2.5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                <span>
                  Tes progrès, notes, flashcards et examens blancs sont sauvegardés localement hors ligne et synchronisés sur le cloud Supabase.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                <span>
                  Si tu as déjà un compte, connecte-toi directement avec ton e-mail et ton mot de passe : inutile de recréer un compte.
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
            <p className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Sécurité & Confidentialité garanties
            </p>
            <p className="mt-1 leading-relaxed">
              Mots de passe hachés en PBKDF2-SHA256 (120 000 itérations), bouclier anti-bruteforce, coffre IndexedDB et zéro publicité.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
