import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  Check,
  Copy,
  Crown,
  Download,
  KeyRound,
  Lock,
  LogOut,
  RefreshCw,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  buildOtpAuthUri,
  formatSecretForDisplay,
  generateQrDataUrl,
  generateRecoveryCodes,
  generateTotpSecret,
} from '../lib/twoFactor';
import { TwoFactorMethod } from '../types';

export const TwoFactorGateScreen: React.FC = () => {
  const {
    activeProfile,
    isOwner,
    twoFactorConfigured,
    completeTwoFactorEnrollment,
    verifyTwoFactorChallenge,
    logout,
    notify,
  } = useApp();

  // Enrollment state
  const [enrollMethod, setEnrollMethod] = useState<TwoFactorMethod>('totp');
  const [totpSecret, setTotpSecret] = useState<string>(() => generateTotpSecret(20));
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>(() => generateRecoveryCodes(8));
  const [savedRecoveryAck, setSavedRecoveryAck] = useState(false);
  const [enrollCode, setEnrollCode] = useState('');
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [copiedRecovery, setCopiedRecovery] = useState(false);

  // Challenge state
  const [challengeMode, setChallengeMode] = useState<'primary' | 'recovery'>('primary');
  const [challengeInput, setChallengeInput] = useState('');
  const [rememberDevice, setRememberDevice] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(() => 30 - (Math.floor(Date.now() / 1000) % 30));

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const otpUri = useMemo(() => {
    if (!activeProfile) return '';
    return buildOtpAuthUri(activeProfile.email, totpSecret, 'Reussite Offline');
  }, [activeProfile, totpSecret]);

  // Generate local offline QR code SVG/PNG data URL whenever secret changes
  useEffect(() => {
    if (twoFactorConfigured || !otpUri) return;
    let cancelled = false;
    generateQrDataUrl(otpUri)
      .then((url) => {
        if (!cancelled) setQrDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setQrDataUrl('');
      });
    return () => {
      cancelled = true;
    };
  }, [twoFactorConfigured, otpUri]);

  // 30-second TOTP countdown indicator
  useEffect(() => {
    const interval = window.setInterval(() => {
      setSecondsLeft(30 - (Math.floor(Date.now() / 1000) % 30));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  if (!activeProfile) return null;

  const currentMethod: TwoFactorMethod = activeProfile.twoFactor?.method ?? 'totp';
  const remainingRecoveryCount = activeProfile.twoFactor?.recoveryCodeHashes?.length ?? 0;

  const handleCopySecret = async () => {
    try {
      await navigator.clipboard.writeText(totpSecret);
      setCopiedSecret(true);
      notify('Clé secrète TOTP copiée dans le presse-papiers.', 'info');
      window.setTimeout(() => setCopiedSecret(false), 2500);
    } catch {
      notify('Sélectionne et copie la clé manuellement.', 'warning');
    }
  };

  const handleCopyRecoveryCodes = async () => {
    const text = [
      `Réussite Offline — Codes de secours 2FA (${activeProfile.email})`,
      `Générés le : ${new Date().toLocaleString('fr-FR')}`,
      'Chaque code ne peut être utilisé qu’une seule fois :',
      ...recoveryCodes.map((c, idx) => `${idx + 1}. ${c}`),
    ].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopiedRecovery(true);
      setSavedRecoveryAck(true);
      notify('8 codes de secours copiés ! Conserve-les dans un endroit sûr.', 'success');
      window.setTimeout(() => setCopiedRecovery(false), 2500);
    } catch {
      notify('Utilise le bouton Télécharger (.txt) pour sauvegarder tes codes.', 'warning');
    }
  };

  const handleDownloadRecoveryCodes = () => {
    const text = [
      '======================================================',
      'RÉUSSITE OFFLINE — CODES DE SECOURS 2FA (USAGE UNIQUE)',
      '======================================================',
      `Compte : ${activeProfile.name} (${activeProfile.email})`,
      `Date   : ${new Date().toLocaleString('fr-FR')}`,
      '',
      'Conserve ce fichier en lieu sûr (hors ligne).',
      'Chaque code permet de débloquer ton compte 1 seule fois si tu perds ton appareil :',
      '',
      ...recoveryCodes.map((c, idx) => `  [${idx + 1}]  ${c}`),
      '',
    ].join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reussite-offline-codes-secours-2fa-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setSavedRecoveryAck(true);
    notify('Fichier des 8 codes de secours téléchargé !', 'success');
  };

  const handleRegenerateSecret = () => {
    setTotpSecret(generateTotpSecret(20));
    setRecoveryCodes(generateRecoveryCodes(8));
    setEnrollCode('');
    setError(null);
  };

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!savedRecoveryAck) {
      setError('Confirme d’abord que tu as sauvegardé tes 8 codes de secours en lieu sûr.');
      return;
    }

    if (enrollMethod === 'pin') {
      if (pin1.replace(/\D/g, '').length !== 6) {
        setError('Saisis un Code PIN Maître composé exactement de 6 chiffres.');
        return;
      }
      if (pin1 !== pin2) {
        setError('Les deux saisies du Code PIN Maître ne correspondent pas.');
        return;
      }
    }

    setBusy(true);
    const res = await completeTwoFactorEnrollment({
      method: enrollMethod,
      totpSecret: enrollMethod === 'totp' ? totpSecret : undefined,
      verificationCode: enrollMethod === 'totp' ? enrollCode : undefined,
      pin: enrollMethod === 'pin' ? pin1 : undefined,
      recoveryCodes,
    });
    setBusy(false);

    if (!res.ok) {
      setError(res.error ?? 'Impossible d’activer la double authentification.');
    }
  };

  const handleChallengeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const res = await verifyTwoFactorChallenge(
      challengeInput,
      challengeMode,
      rememberDevice ? 12 : 0
    );
    setBusy(false);
    if (!res.ok) {
      setError(res.error ?? 'Code de vérification refusé.');
      setChallengeInput('');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-8 text-slate-100">
      <div className="w-full max-w-2xl rounded-3xl border border-amber-400/30 bg-slate-900/90 p-6 shadow-2xl backdrop-blur sm:p-8">
        {/* Header Identity */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-lg">
              {isOwner ? <Crown className="h-6 w-6" /> : <ShieldCheck className="h-6 w-6" />}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-extrabold text-white sm:text-xl">
                  {twoFactorConfigured
                    ? 'Double Authentification Requise (2FA)'
                    : 'Active ta Double Authentification (2FA)'}
                </h1>
                {isOwner && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[11px] font-bold text-amber-300 ring-1 ring-amber-400/40">
                    👑 Propriétaire
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-slate-400">
                Compte protégé : <strong className="text-slate-200">{activeProfile.name}</strong> ({activeProfile.email})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <LogOut className="h-3.5 w-3.5" />
            Se déconnecter
          </button>
        </div>

        {/* ================= MODE 1: FIRST-TIME ENROLLMENT ================= */}
        {!twoFactorConfigured ? (
          <div className="mt-6 space-y-5">
            <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4 text-xs leading-relaxed text-amber-100">
              <p className="flex items-center gap-2 font-bold text-amber-300">
                <Lock className="h-4 w-4" />
                Sécurité obligatoire avant d’utiliser ton compte
              </p>
              <p className="mt-1">
                Configure ta double authentification une seule fois. Ensuite, un second facteur sera exigé{' '}
                <strong>à chaque connexion</strong> (100 % fonctionnel même hors ligne et synchronisé sur Supabase).
              </p>
            </div>

            {/* Method Selector */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  setEnrollMethod('totp');
                  setError(null);
                }}
                className={`rounded-2xl border p-3.5 text-left transition ${
                  enrollMethod === 'totp'
                    ? 'border-amber-400 bg-amber-400/15 text-white'
                    : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  <Smartphone className="h-4 w-4 text-amber-400" />
                  App Authenticator (Recommandé)
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Google Authenticator, Microsoft Authenticator, Authy ou FreeOTP (standard RFC 6238 TOTP).
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEnrollMethod('pin');
                  setError(null);
                }}
                className={`rounded-2xl border p-3.5 text-left transition ${
                  enrollMethod === 'pin'
                    ? 'border-amber-400 bg-amber-400/15 text-white'
                    : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  <KeyRound className="h-4 w-4 text-emerald-400" />
                  Code PIN Maître 2FA (6 chiffres)
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Second code personnel chiffré PBKDF2-SHA256 si tu n’as pas d’app Authenticator sous la main.
                </p>
              </button>
            </div>

            <form onSubmit={handleEnrollSubmit} className="space-y-5">
              {enrollMethod === 'totp' ? (
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Étape 1 — Scanne ce QR Code dans ton application Authenticator
                    </p>
                    <button
                      type="button"
                      onClick={handleRegenerateSecret}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Nouvelle clé
                    </button>
                  </div>

                  <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row">
                    <div className="shrink-0 rounded-2xl bg-white p-3 shadow-md">
                      {qrDataUrl ? (
                        <img
                          src={qrDataUrl}
                          alt="QR Code 2FA Réussite Offline"
                          className="h-44 w-44"
                        />
                      ) : (
                        <div className="flex h-44 w-44 items-center justify-center text-xs text-slate-500">
                          Génération QR...
                        </div>
                      )}
                    </div>

                    <div className="w-full space-y-3 text-xs">
                      <p className="text-slate-300">
                        Ouvre <strong>Google Authenticator</strong>, <strong>Authy</strong> ou{' '}
                        <strong>Microsoft Authenticator</strong>, appuie sur <strong>+</strong> et scanne le QR Code.
                      </p>
                      <div>
                        <p className="text-[11px] font-semibold text-slate-400">
                          Ou saisis manuellement cette clé secrète :
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <code className="flex-1 break-all rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 font-mono text-xs font-bold tracking-wider text-amber-300">
                            {formatSecretForDisplay(totpSecret)}
                          </code>
                          <button
                            type="button"
                            onClick={handleCopySecret}
                            className="inline-flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                          >
                            {copiedSecret ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                            {copiedSecret ? 'Copié' : 'Copier'}
                          </button>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Généré 100 % localement sur ton appareil — jamais envoyé à un service externe.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-slate-800 pt-4">
                    <label
                      htmlFor="totp-enroll-code"
                      className="block text-xs font-bold text-slate-200"
                    >
                      Étape 2 — Saisis le code à 6 chiffres affiché dans ton Authenticator
                    </label>
                    <input
                      id="totp-enroll-code"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      required
                      value={enrollCode}
                      onChange={(e) => setEnrollCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-center font-mono text-2xl font-extrabold tracking-[0.45em] text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Étape 1 — Définis ton Code PIN Maître 2FA (6 chiffres)
                  </p>
                  <p className="text-xs text-slate-400">
                    Choisis un code à 6 chiffres différent de ton mot de passe (haché PBKDF2-SHA256 120 000 itérations).
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="pin-1" className="block text-xs font-semibold text-slate-300">
                        Code PIN Maître (6 chiffres)
                      </label>
                      <input
                        id="pin-1"
                        type="password"
                        inputMode="numeric"
                        maxLength={6}
                        required
                        value={pin1}
                        onChange={(e) => setPin1(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="••••••"
                        className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-center font-mono text-xl font-bold tracking-[0.4em] text-white focus:border-emerald-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="pin-2" className="block text-xs font-semibold text-slate-300">
                        Confirme le Code PIN
                      </label>
                      <input
                        id="pin-2"
                        type="password"
                        inputMode="numeric"
                        maxLength={6}
                        required
                        value={pin2}
                        onChange={(e) => setPin2(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="••••••"
                        className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-center font-mono text-xl font-bold tracking-[0.4em] text-white focus:border-emerald-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 8 Recovery Codes */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-sky-300">
                      Étape 3 — Sauvegarde tes 8 codes de secours à usage unique
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      Indispensables si tu perds ou changes de téléphone. Ils ne seront plus affichés en clair ensuite.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleCopyRecoveryCodes}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                    >
                      {copiedRecovery ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      Copier
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadRecoveryCodes}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-sky-500"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Télécharger (.txt)
                    </button>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {recoveryCodes.map((code) => (
                    <div
                      key={code}
                      className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-2 text-center font-mono text-xs font-bold tracking-wider text-slate-100"
                    >
                      {code}
                    </div>
                  ))}
                </div>

                <label className="mt-3 flex cursor-pointer items-center gap-2.5 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={savedRecoveryAck}
                    onChange={(e) => setSavedRecoveryAck(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-amber-500 focus:ring-amber-400"
                  />
                  J’ai copié ou téléchargé mes 8 codes de secours en lieu sûr.
                </label>
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-950/60 p-3 text-xs font-semibold text-red-200">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={busy}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-3 text-sm font-extrabold text-slate-950 shadow-lg hover:from-amber-300 hover:to-orange-400 disabled:opacity-60"
              >
                <ShieldCheck className="h-5 w-5" />
                {busy
                  ? 'Activation cryptographique en cours...'
                  : 'Activer la Double Authentification et ouvrir mon compte'}
              </button>
            </form>
          </div>
        ) : (
          /* ================= MODE 2: 2FA VERIFICATION CHALLENGE ================= */
          <form onSubmit={handleChallengeSubmit} className="mt-6 space-y-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-bold text-white">
                  {challengeMode === 'recovery'
                    ? 'Saisis un code de secours à usage unique'
                    : currentMethod === 'totp'
                    ? 'Saisis le code à 6 chiffres de ton application Authenticator'
                    : 'Saisis ton Code PIN Maître 2FA (6 chiffres)'}
                </p>
                {challengeMode === 'primary' && currentMethod === 'totp' && (
                  <span className="rounded-full bg-slate-800 px-2.5 py-1 font-mono text-[11px] font-bold text-amber-300">
                    Nouveau code dans {secondsLeft}s
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs text-slate-400">
                {challengeMode === 'recovery'
                  ? `Format XXXX-XXXX (${remainingRecoveryCount} code(s) de secours encore disponible(s)).`
                  : currentMethod === 'totp'
                  ? 'Ouvre Google Authenticator, Authy ou Microsoft Authenticator et entre le code Réussite Offline.'
                  : 'Entre ton Code PIN Maître personnel à 6 chiffres pour déverrouiller ton accès.'}
              </p>

              <input
                type={challengeMode === 'primary' && currentMethod === 'pin' ? 'password' : 'text'}
                inputMode={challengeMode === 'recovery' ? 'text' : 'numeric'}
                autoComplete="one-time-code"
                autoFocus
                required
                maxLength={challengeMode === 'recovery' ? 9 : 6}
                value={challengeInput}
                onChange={(e) => {
                  if (challengeMode === 'recovery') {
                    setChallengeInput(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 9));
                  } else {
                    setChallengeInput(e.target.value.replace(/\D/g, '').slice(0, 6));
                  }
                }}
                placeholder={challengeMode === 'recovery' ? 'XXXX-XXXX' : '000000'}
                className="mt-4 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-4 text-center font-mono text-3xl font-extrabold tracking-[0.45em] text-white focus:border-amber-400 focus:outline-none"
              />

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-amber-500"
                  />
                  Faire confiance à cet appareil pendant 12h
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setChallengeMode((m) => (m === 'primary' ? 'recovery' : 'primary'));
                    setChallengeInput('');
                    setError(null);
                  }}
                  className="text-xs font-semibold text-amber-300 underline-offset-2 hover:underline"
                >
                  {challengeMode === 'primary'
                    ? 'Appareil indisponible ? Utiliser un code de secours'
                    : 'Revenir au code 2FA principal'}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-950/60 p-3 text-xs font-semibold text-red-200">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={busy || (challengeMode === 'primary' && challengeInput.length < 6)}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-3 text-sm font-extrabold text-slate-950 shadow-lg hover:from-amber-300 hover:to-orange-400 disabled:opacity-60"
            >
              <Lock className="h-4 w-4" />
              {busy ? 'Vérification cryptographique...' : 'Vérifier et déverrouiller mon compte'}
            </button>

            <p className="text-center text-[11px] text-slate-500">
              Protection anti-bruteforce active : 5 tentatives maximum avant verrouillage automatique de 5 minutes.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
