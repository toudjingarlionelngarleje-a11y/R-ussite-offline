import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  Check,
  Copy,
  Crown,
  Download,
  Fingerprint,
  KeyRound,
  Lock,
  LogOut,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  checkDeviceLockAvailability,
  DeviceLockSupportInfo,
  generateRecoveryCodes,
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

  // Device WebAuthn availability detection
  const [deviceSupport, setDeviceSupport] = useState<DeviceLockSupportInfo>({
    available: true,
    inIframe: false,
  });

  // Enrollment state (NO QR code)
  const [enrollMethod, setEnrollMethod] = useState<TwoFactorMethod>('device');
  const [recoveryCodes] = useState<string[]>(() => generateRecoveryCodes(8));
  const [savedRecoveryAck, setSavedRecoveryAck] = useState(false);
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [copiedRecovery, setCopiedRecovery] = useState(false);

  // Challenge state
  const [challengeMode, setChallengeMode] = useState<'primary' | 'recovery'>('primary');
  const [challengeInput, setChallengeInput] = useState('');
  const [rememberDevice, setRememberDevice] = useState(false);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    checkDeviceLockAvailability().then((info) => {
      if (cancelled) return;
      setDeviceSupport(info);
      if (!info.available) {
        setEnrollMethod('pin');
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!activeProfile) return null;

  const currentMethod: TwoFactorMethod = activeProfile.twoFactor?.method ?? 'device';
  const enrolledDeviceLabel =
    activeProfile.twoFactor?.webauthnDeviceLabel ?? 'Verrouillage natif de cet appareil';
  const remainingRecoveryCount = activeProfile.twoFactor?.recoveryCodeHashes?.length ?? 0;

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
      'Chaque code permet de débloquer ton compte 1 seule fois si tu changes d’appareil :',
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

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!savedRecoveryAck) {
      setError('Confirme d’abord que tu as copié ou téléchargé tes 8 codes de secours.');
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
      pin: enrollMethod === 'pin' ? pin1 : undefined,
      recoveryCodes,
    });
    setBusy(false);

    if (!res.ok) {
      setError(res.error ?? 'Impossible d’activer la double authentification.');
    }
  };

  const handleDeviceUnlockClick = async () => {
    setError(null);
    setBusy(true);
    const res = await verifyTwoFactorChallenge('', 'primary', rememberDevice ? 12 : 0);
    setBusy(false);
    if (!res.ok) {
      setError(res.error ?? 'Vérification par verrouillage de l’appareil refusée.');
    }
  };

  const handleCodeChallengeSubmit = async (e: React.FormEvent) => {
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

        {/* ================= MODE 1: FIRST-TIME ENROLLMENT (ZERO QR CODE) ================= */}
        {!twoFactorConfigured ? (
          <div className="mt-6 space-y-5">
            <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4 text-xs leading-relaxed text-amber-100">
              <p className="flex items-center gap-2 font-bold text-amber-300">
                <Lock className="h-4 w-4" />
                Sécurité obligatoire sans QR code ni application tierce
              </p>
              <p className="mt-1">
                Choisis le <strong>mot de passe / verrouillage natif de ton appareil</strong> (empreinte, Face ID,
                Windows Hello ou code d’écran) ou un <strong>Code PIN Maître 2FA</strong>. Cette vérification sera exigée
                avant toute utilisation de ton compte.
              </p>
            </div>

            {/* Method Selector */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  setEnrollMethod('device');
                  setError(null);
                }}
                className={`rounded-2xl border p-4 text-left transition ${
                  enrollMethod === 'device'
                    ? 'border-amber-400 bg-amber-400/15 text-white'
                    : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  <Fingerprint className="h-5 w-5 text-amber-400" />
                  Mot de passe / Verrouillage de l’appareil
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Utilise le code PIN d’écran, le mot de passe Windows/Mac, l’empreinte digitale ou Face ID de ton appareil.
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEnrollMethod('pin');
                  setError(null);
                }}
                className={`rounded-2xl border p-4 text-left transition ${
                  enrollMethod === 'pin'
                    ? 'border-emerald-400 bg-emerald-400/15 text-white'
                    : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  <KeyRound className="h-5 w-5 text-emerald-400" />
                  Code PIN Maître 2FA (6 chiffres)
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Second code personnel chiffré PBKDF2-SHA256, fonctionne partout même sur plusieurs appareils.
                </p>
              </button>
            </div>

            <form onSubmit={handleEnrollSubmit} className="space-y-5">
              {enrollMethod === 'device' ? (
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/30">
                      <Smartphone className="h-6 w-6" />
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <p className="text-sm font-bold text-white">
                        Étape 1 — Associer le verrouillage natif de cet appareil
                      </p>
                      <p className="text-slate-300 leading-relaxed">
                        En cliquant sur le bouton ci-dessous, ton téléphone ou ton ordinateur va afficher sa fenêtre
                        de sécurité officielle pour confirmer ton <strong>mot de passe système, code d’écran, empreinte ou Face ID</strong>.
                      </p>
                      {!deviceSupport.available && (
                        <p className="mt-2 rounded-xl border border-amber-500/40 bg-amber-500/10 p-2.5 text-amber-200">
                          ⚠️ {deviceSupport.reason}{' '}
                          <button
                            type="button"
                            onClick={() => setEnrollMethod('pin')}
                            className="font-bold underline"
                          >
                            Passer au Code PIN Maître 2FA →
                          </button>
                        </p>
                      )}
                      {deviceSupport.available && deviceSupport.inIframe && (
                        <p className="mt-2 rounded-xl border border-sky-500/40 bg-sky-500/10 p-2.5 text-sky-200">
                          ℹ️ Astuce : si le verrouillage natif est bloqué dans cet aperçu intégré, ouvre{' '}
                          <strong>reussite-offline.vercel.app</strong> directement dans ton navigateur, ou utilise le{' '}
                          <button
                            type="button"
                            onClick={() => setEnrollMethod('pin')}
                            className="font-bold underline"
                          >
                            Code PIN Maître 2FA
                          </button>
                          .
                        </p>
                      )}
                    </div>
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
                      Étape 2 — Sauvegarde tes 8 codes de secours à usage unique
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      Indispensables si tu te connectes un jour depuis un autre appareil.
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
                className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-3 text-sm font-extrabold text-slate-950 shadow-lg hover:from-amber-300 hover:to-orange-400 disabled:opacity-60"
              >
                {enrollMethod === 'device' ? (
                  <Fingerprint className="h-5 w-5" />
                ) : (
                  <ShieldCheck className="h-5 w-5" />
                )}
                {busy
                  ? 'Validation avec ton appareil en cours...'
                  : enrollMethod === 'device'
                  ? 'Activer avec le mot de passe / biométrie de mon appareil'
                  : 'Activer le Code PIN Maître 2FA et ouvrir mon compte'}
              </button>
            </form>
          </div>
        ) : (
          /* ================= MODE 2: 2FA VERIFICATION CHALLENGE ================= */
          <div className="mt-6 space-y-5">
            {challengeMode === 'primary' && currentMethod === 'device' ? (
              <div className="space-y-5">
                <div className="rounded-2xl border border-amber-400/30 bg-slate-950/60 p-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 text-amber-300 ring-1 ring-amber-400/40">
                    <Fingerprint className="h-9 w-9" />
                  </div>
                  <h2 className="mt-4 text-base font-extrabold text-white">
                    Confirme ton identité avec ton appareil
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">
                    Appareil enregistré : <strong className="text-slate-200">{enrolledDeviceLabel}</strong>
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    Clique ci-dessous pour entrer le mot de passe, le code d’écran, l’empreinte digitale ou Face ID de ton appareil.
                  </p>

                  <button
                    type="button"
                    disabled={busy}
                    onClick={handleDeviceUnlockClick}
                    className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg hover:from-amber-300 hover:to-orange-400 disabled:opacity-60"
                  >
                    <Fingerprint className="h-5 w-5" />
                    {busy
                      ? 'En attente de confirmation système...'
                      : 'Déverrouiller avec le mot de passe / biométrie de l’appareil'}
                  </button>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-left">
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
                        setChallengeMode('recovery');
                        setChallengeInput('');
                        setError(null);
                      }}
                      className="text-xs font-semibold text-amber-300 underline-offset-2 hover:underline"
                    >
                      Autre appareil ? Utiliser un code de secours
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-950/60 p-3 text-xs font-semibold text-red-200">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleCodeChallengeSubmit} className="space-y-5">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <p className="text-sm font-bold text-white">
                    {challengeMode === 'recovery'
                      ? 'Saisis un code de secours à usage unique'
                      : 'Saisis ton Code PIN Maître 2FA (6 chiffres)'}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {challengeMode === 'recovery'
                      ? `Format XXXX-XXXX (${remainingRecoveryCount} code(s) de secours encore disponible(s)).`
                      : 'Entre ton Code PIN Maître personnel à 6 chiffres pour déverrouiller ton accès.'}
                  </p>

                  <input
                    type={challengeMode === 'primary' ? 'password' : 'text'}
                    inputMode={challengeMode === 'recovery' ? 'text' : 'numeric'}
                    autoComplete="one-time-code"
                    autoFocus
                    required
                    maxLength={challengeMode === 'recovery' ? 9 : 6}
                    value={challengeInput}
                    onChange={(e) => {
                      if (challengeMode === 'recovery') {
                        setChallengeInput(
                          e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 9)
                        );
                      } else {
                        setChallengeInput(e.target.value.replace(/\D/g, '').slice(0, 6));
                      }
                    }}
                    placeholder={challengeMode === 'recovery' ? 'XXXX-XXXX' : '••••••'}
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
                        ? 'Code oublié ? Utiliser un code de secours'
                        : currentMethod === 'device'
                        ? 'Revenir au verrouillage de l’appareil'
                        : 'Revenir au Code PIN Maître 2FA'}
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
              </form>
            )}

            <p className="text-center text-[11px] text-slate-500">
              Protection anti-bruteforce active : 5 tentatives échouées maximum avant verrouillage automatique de 5 minutes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
