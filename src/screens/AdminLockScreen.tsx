import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertOctagon,
  Clock3,
  Fingerprint,
  KeyRound,
  Lock,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  WifiOff,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  ADMIN_LOCKDOWN_LADDER,
  detectAdminCommand,
  formatAdminDuration,
  formatAdminRemaining,
} from '../lib/adminGuard';

/**
 * Écran de blocage total : affiché à la place de TOUTE l'application tant que le
 * verrouillage anti-escalade « Admin__ » est actif. Aucune navigation, aucun
 * contournement : seul le compte Propriétaire vérifié (e-mail + PBKDF2) peut lever
 * le blocage avant l'échéance.
 */
export const AdminLockScreen: React.FC = () => {
  const {
    state,
    releaseAdminLockdown,
    adminLockdownUntil,
  } = useApp();

  const sec = state.security;
  const [now, setNow] = useState(() => Date.now());
  const [showOwnerForm, setShowOwnerForm] = useState(false);
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [unlocking, setUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);
  const [clearBans, setClearBans] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remainingMs = useMemo(() => {
    if (!adminLockdownUntil) return 0;
    const until = Date.parse(adminLockdownUntil);
    if (Number.isNaN(until)) return 0;
    return Math.max(0, until - now);
  }, [adminLockdownUntil, now]);

  const level = sec?.adminLockdownLevel ?? 0;
  const attempts = sec?.adminCommandAttempts ?? 0;
  const banned = sec?.adminBlockedIdentities ?? [];
  const lastEvent = useMemo(
    () => (sec?.events ?? []).find((ev) => ev.category === 'PRIVILEGE_ESCALATION'),
    [sec?.events]
  );
  const lastPolicy = level > 0 ? ADMIN_LOCKDOWN_LADDER[Math.min(level, ADMIN_LOCKDOWN_LADDER.length) - 1] : null;

  const handleOwnerUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerEmail.trim() || !ownerPassword) return;
    // La commande ne doit jamais servir de « mot de passe » de déblocage.
    if (detectAdminCommand(ownerEmail) || detectAdminCommand(ownerPassword)) {
      setUnlockError('La commande « Admin__ » ne peut jamais servir de justificatif de déblocage.');
      return;
    }
    setUnlocking(true);
    setUnlockError(null);
    const res = await releaseAdminLockdown(ownerEmail, ownerPassword, { clearBans });
    setUnlocking(false);
    if (!res.ok) {
      setUnlockError(res.error ?? 'Déblocage refusé.');
      return;
    }
    setOwnerPassword('');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-red-950 to-slate-950 px-4 py-10 text-slate-100">
      <div className="w-full max-w-2xl space-y-5">
        <div className="rounded-3xl border border-red-500/40 bg-slate-900/80 p-6 shadow-2xl backdrop-blur sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-red-600/20 p-3 ring-1 ring-red-500/40">
              <AlertOctagon className="h-9 w-9 text-red-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-red-400">
                Garde anti-escalade · v17.6
              </p>
              <h1 className="mt-1 text-2xl font-black leading-tight text-white sm:text-3xl">
                ACCÈS BLOQUÉ
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                La commande privilégiée{' '}
                <span className="rounded bg-red-600/20 px-1.5 py-0.5 font-mono font-bold text-red-300">
                  Admin__
                </span>{' '}
                a été détectée. Aucun rôle, privilège ou accès Propriétaire ne peut être obtenu par
                une saisie : l’application est verrouillée et l’identité utilisée est bannie.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                <Clock3 className="h-3.5 w-3.5" /> Temps restant
              </p>
              <p className="mt-1 font-mono text-3xl font-black tabular-nums text-red-300">
                {formatAdminRemaining(remainingMs)}
              </p>
              {adminLockdownUntil && (
                <p className="mt-1 text-[11px] text-slate-400">
                  Verrou jusqu’à {new Date(adminLockdownUntil).toLocaleString('fr-FR')}
                </p>
              )}
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                <ShieldAlert className="h-3.5 w-3.5" /> Niveau de blocage
              </p>
              <p className="mt-1 text-3xl font-black text-white">{level || 1} / 4</p>
              <p className="mt-1 text-[11px] text-slate-400">
                {attempts} tentative(s) · {lastPolicy ? formatAdminDuration(lastPolicy.minutes) : '—'}
              </p>
            </div>
          </div>

          <ul className="mt-4 space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              Saisie refusée et non enregistrée : la commande n’accorde aucun droit.
            </li>
            <li className="flex items-start gap-2">
              <Fingerprint className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              Session coupée et identité bannie définitivement (e-mail / nom) :
              {' '}
              {banned.length > 0 ? (
                <span className="font-mono text-[11px] text-red-300">{banned.join(' · ')}</span>
              ) : (
                'aucune identité exploitable enregistrée'
              )}
            </li>
            <li className="flex items-start gap-2">
              <Terminal className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              Incident journalisé en sévérité critique{' '}
              {lastEvent ? (
                <span className="font-mono text-[11px] text-slate-400">
                  [{lastEvent.ruleId}] {lastEvent.source}
                </span>
              ) : null}
            </li>
            <li className="flex items-start gap-2">
              <WifiOff className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              Blocage appliqué 100 % hors ligne : couper Internet ne le contourne pas.
            </li>
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="flex items-center gap-2 text-sm font-bold text-white">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> Déblocage Propriétaire hors-bande
            </p>
            <button
              type="button"
              onClick={() => setShowOwnerForm((v) => !v)}
              className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-200 ring-1 ring-slate-700 hover:bg-slate-700"
            >
              {showOwnerForm ? 'Masquer' : 'Se débloquer'}
            </button>
          </div>

          {showOwnerForm && (
            <form onSubmit={handleOwnerUnlock} className="mt-4 space-y-3">
              <p className="text-[11px] leading-relaxed text-slate-400">
                Réservé au Propriétaire vérifié (e-mail officiel + mot de passe haché PBKDF2). La
                commande « Admin__ » ne peut jamais servir de justificatif.
              </p>
              <input
                type="email"
                autoComplete="username"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
                placeholder="E-mail Propriétaire"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
              />
              <input
                type="password"
                autoComplete="current-password"
                value={ownerPassword}
                onChange={(e) => setOwnerPassword(e.target.value)}
                placeholder="Mot de passe Propriétaire"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500"
              />
              <label className="flex items-center gap-2 text-[11px] font-semibold text-slate-300">
                <input
                  type="checkbox"
                  checked={clearBans}
                  onChange={(e) => setClearBans(e.target.checked)}
                  className="h-4 w-4 accent-emerald-500"
                />
                Purger aussi la liste des identités bannies
              </label>
              {unlockError && (
                <p className="rounded-lg bg-red-950/70 px-3 py-2 text-xs font-semibold text-red-300 ring-1 ring-red-800">
                  {unlockError}
                </p>
              )}
              <button
                type="submit"
                disabled={unlocking || !ownerEmail.trim() || !ownerPassword}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-black text-white transition hover:bg-emerald-500 disabled:opacity-50"
              >
                <KeyRound className="h-4 w-4" />
                {unlocking ? 'Vérification PBKDF2...' : 'Vérifier et lever le blocage'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-[11px] leading-relaxed text-slate-500">
          Échelle de blocage : {ADMIN_LOCKDOWN_LADDER.map((s) => formatAdminDuration(s.minutes)).join(' → ')}.
          Chaque nouvelle tentative rallonge le verrou. Le rôle Propriétaire ne provient que du compte
          vérifié et de la RLS Supabase, jamais d’un texte saisi.
        </p>
      </div>
    </div>
  );
};

export default AdminLockScreen;
