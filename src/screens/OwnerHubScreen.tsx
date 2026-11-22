import React, { useCallback, useEffect, useState } from 'react';
import {
  Bell,
  Cloud,
  Crown,
  Database,
  Download,
  Globe,
  Lock,
  PlusCircle,
  RefreshCw,
  Shield,
  ShieldCheck,
  Sparkles,
  Trash2,
  Users,
  Wrench,
} from 'lucide-react';
import { ANNALES, CHAPTERS, COURSES, EXAMS, FICHES, SUBJECTS } from '../data';
import { useApp } from '../context/AppContext';
import { DEFAULT_OWNER_SETTINGS, getRoleLabel } from '../lib/owner';
import {
  deleteCloudTeacherContent,
  fetchOwnerCloudSnapshot,
  isSupabaseConfigured,
  OwnerCloudSnapshot,
  updateUserRoleOrPlanInCloud,
} from '../lib/supabaseSync';
import { AccountRole, Difficulty, OwnerGlobalSettings, Question } from '../types';

type OwnerTab = 'governance' | 'users' | 'cloud-publish' | 'moderation' | 'security';

export const OwnerHubScreen: React.FC = () => {
  const {
    state,
    activeProfile,
    isOwner,
    isOnline,
    navigate,
    allQuestions,
    allFiches,
    allFlashcards,
    updateOwnerSettings,
    downloadFullOfflineCatalog,
    publishOwnerQuickQuestion,
    exportMasterBackup,
    purgeReportedGroupMessages,
    updateErrorReportStatus,
    syncNow,
    triggerPanicLockdown,
    notify,
  } = useApp();

  const [activeTab, setActiveTab] = useState<OwnerTab>('governance');
  const [cloudData, setCloudData] = useState<OwnerCloudSnapshot | null>(null);
  const [loadingCloud, setLoadingCloud] = useState(false);

  const settings: OwnerGlobalSettings = state.ownerSettings ?? DEFAULT_OWNER_SETTINGS;
  const [announcementText, setAnnouncementText] = useState(settings.announcementText);
  const [announcementTone, setAnnouncementTone] = useState<OwnerGlobalSettings['announcementTone']>(
    settings.announcementTone
  );
  const [announcementEnabled, setAnnouncementEnabled] = useState(settings.announcementEnabled);

  // Express Question Publisher state
  const [qSubjectId, setQSubjectId] = useState(SUBJECTS[0]?.id ?? 'maths');
  const [qPrompt, setQPrompt] = useState('');
  const [qOpt0, setQOpt0] = useState('');
  const [qOpt1, setQOpt1] = useState('');
  const [qOpt2, setQOpt2] = useState('');
  const [qOpt3, setQOpt3] = useState('');
  const [qCorrect, setQCorrect] = useState(0);
  const [qExplanation, setQExplanation] = useState('');
  const [qNotion, setQNotion] = useState('');
  const [qDifficulty, setQDifficulty] = useState<Difficulty>('moyen');
  const [publishingQ, setPublishingQ] = useState(false);

  useEffect(() => {
    setAnnouncementText(settings.announcementText);
    setAnnouncementTone(settings.announcementTone);
    setAnnouncementEnabled(settings.announcementEnabled);
  }, [settings.announcementText, settings.announcementTone, settings.announcementEnabled]);

  const refreshCloudSnapshot = useCallback(async () => {
    if (!isOnline || !isSupabaseConfigured) return;
    setLoadingCloud(true);
    const snap = await fetchOwnerCloudSnapshot();
    setCloudData(snap);
    setLoadingCloud(false);
  }, [isOnline]);

  useEffect(() => {
    if (isOwner && isOnline) {
      refreshCloudSnapshot();
    }
  }, [isOwner, isOnline, refreshCloudSnapshot]);

  // Strict Owner Gate
  if (!isOwner) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center dark:border-amber-900/50 dark:bg-amber-950/30">
        <Lock className="mx-auto h-10 w-10 text-amber-600" />
        <h1 className="mt-3 text-xl font-extrabold text-slate-900 dark:text-white">
          Espace réservé au Propriétaire
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Cette console fondateur est strictement protégée et accessible uniquement au compte
          Propriétaire officiel de Réussite Offline.
        </p>
        <button
          onClick={() => navigate('dashboard')}
          className="mt-5 rounded-xl bg-blue-700 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-800"
        >
          Retour au tableau de bord
        </button>
      </div>
    );
  }

  const reportedMessagesCount = state.studyGroups.reduce(
    (sum, g) => sum + g.messages.filter((m) => m.reported).length,
    0
  );
  const pendingReportsCount = state.errorReports.filter((r) => r.status === 'en_attente').length;

  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateOwnerSettings({
      announcementEnabled,
      announcementText,
      announcementTone,
    });
  };

  const handleUpdateCloudUser = async (
    userId: string,
    patch: { role?: AccountRole; plan?: 'gratuit' | 'premium' }
  ) => {
    const res = await updateUserRoleOrPlanInCloud(userId, patch);
    if (!res.ok) {
      notify(`Erreur mise à jour utilisateur : ${res.error}`, 'error');
      return;
    }
    notify('👑 Compte utilisateur mis à jour dans Supabase !', 'success');
    refreshCloudSnapshot();
  };

  const handleDeleteCloudContent = async (id: string) => {
    const res = await deleteCloudTeacherContent(id);
    if (!res.ok) {
      notify(`Erreur suppression Cloud : ${res.error}`, 'error');
      return;
    }
    notify(`Contenu Cloud « ${id} » supprimé de Supabase.`, 'info');
    refreshCloudSnapshot();
  };

  const handlePublishExpressQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    const options = [qOpt0.trim(), qOpt1.trim(), qOpt2.trim(), qOpt3.trim()];
    if (!qPrompt.trim() || options.some((o) => !o) || !qExplanation.trim()) {
      notify('Remplis l’énoncé, les 4 choix et l’explication avant de publier.', 'warning');
      return;
    }
    setPublishingQ(true);
    const matchingChapter = CHAPTERS.find((c) => c.subjectId === qSubjectId);
    const subjectObj = SUBJECTS.find((s) => s.id === qSubjectId);
    const newQ: Question = {
      id: `q-owner-${Date.now()}`,
      subjectId: qSubjectId,
      chapterId: matchingChapter?.id ?? 'ch-maths-second-degre',
      examIds: subjectObj?.examIds ?? ['bac-scientifique'],
      prompt: qPrompt.trim(),
      options,
      correctIndex: qCorrect,
      explanation: qExplanation.trim(),
      steps: [qExplanation.trim()],
      notion: qNotion.trim() || 'Notion Officielle Propriétaire',
      difficulty: qDifficulty,
      ficheId: matchingChapter?.ficheId,
      source: `Publication Officielle Propriétaire (${activeProfile?.name ?? 'Fondateur'})`,
      isOfficial: true,
      estimatedSeconds: 35,
      createdByTeacher: true,
    };

    const res = await publishOwnerQuickQuestion(newQ);
    setPublishingQ(false);
    if (res.ok) {
      setQPrompt('');
      setQOpt0('');
      setQOpt1('');
      setQOpt2('');
      setQOpt3('');
      setQExplanation('');
      setQNotion('');
      refreshCloudSnapshot();
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Golden Owner Hero Header */}
      <section className="rounded-2xl bg-gradient-to-br from-amber-950 via-slate-900 to-indigo-950 p-6 text-white shadow-lg ring-1 ring-amber-400/30">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-extrabold text-amber-300 ring-1 ring-amber-400/40">
              <Crown className="h-4 w-4" />
              COMPTE PROPRIÉTAIRE / FONDATEUR — ACCÈS ILLIMITÉ À VIE
            </div>
            <h1 className="text-2xl font-extrabold sm:text-3xl">
              Console Propriétaire — {activeProfile?.name}
            </h1>
            <p className="text-xs text-amber-100/80 sm:text-sm">
              Identité vérifiée : <span className="font-mono font-bold">{activeProfile?.email}</span> •
              Privilèges Super-Admin, gouvernance globale Cloud Supabase, gestion des utilisateurs,
              publication directe & contrôle du bouclier 36/36.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={downloadFullOfflineCatalog}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 shadow transition hover:bg-amber-300"
            >
              <Download className="h-4 w-4" />
              Pack Offline 100 %
            </button>
            <button
              onClick={exportMasterBackup}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-4 py-2.5 text-xs font-bold text-white backdrop-blur transition hover:bg-white/25"
            >
              <Database className="h-4 w-4" />
              Backup Maître JSON
            </button>
            <button
              onClick={() => {
                syncNow();
                refreshCloudSnapshot();
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/20 px-4 py-2.5 text-xs font-bold text-emerald-200 ring-1 ring-emerald-400/40 hover:bg-emerald-500/30"
            >
              <RefreshCw className={`h-4 w-4 ${loadingCloud ? 'animate-spin' : ''}`} />
              Actualiser Cloud
            </button>
          </div>
        </div>

        {/* Owner Executive KPIs */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-[10px] font-bold uppercase text-amber-200/80">Catalogue Intégré</p>
            <p className="mt-1 text-lg font-extrabold">
              {EXAMS.length} concours • {SUBJECTS.length} mat.
            </p>
            <p className="text-[11px] text-slate-300">
              {allQuestions.length} QCM • {ANNALES.length} annales
            </p>
          </div>
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-[10px] font-bold uppercase text-amber-200/80">Utilisateurs Cloud</p>
            <p className="mt-1 text-lg font-extrabold">
              {cloudData?.ok ? cloudData.users.length : state.profiles.length} compte(s)
            </p>
            <p className="text-[11px] text-emerald-300">
              {cloudData?.ok ? `${cloudData.totalSessionsCount} sessions Cloud` : 'Mode hors ligne'}
            </p>
          </div>
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-[10px] font-bold uppercase text-amber-200/80">Contenus Cloud</p>
            <p className="mt-1 text-lg font-extrabold">
              {cloudData?.ok ? cloudData.contents.length : '—'} publiés
            </p>
            <p className="text-[11px] text-slate-300">
              {allFiches.length} fiches • {allFlashcards.length} cartes
            </p>
          </div>
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-[10px] font-bold uppercase text-amber-200/80">Modération</p>
            <p className="mt-1 text-lg font-extrabold">
              {pendingReportsCount + reportedMessagesCount} en attente
            </p>
            <p className="text-[11px] text-slate-300">
              {state.studyGroups.length} groupes modérés
            </p>
          </div>
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-[10px] font-bold uppercase text-amber-200/80">Pare-feu & SIEM</p>
            <p className="mt-1 text-lg font-extrabold text-emerald-300">
              {settings.globalFirewallLevel.toUpperCase()}
            </p>
            <p className="text-[11px] text-slate-300">
              {state.security?.blockedCount ?? 0} menace(s) bloquée(s)
            </p>
          </div>
        </div>
      </section>

      {/* Owner Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: 'governance', label: 'Gouvernance & Annonces', icon: Globe },
            { id: 'users', label: 'Comptes & Rôles Cloud', icon: Users },
            { id: 'cloud-publish', label: 'Publication Express Cloud', icon: Cloud },
            { id: 'moderation', label: 'Modération Globale', icon: Wrench },
            { id: 'security', label: 'Supervision Sécurité SIEM', icon: Shield },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                active
                  ? 'bg-slate-900 text-amber-300 shadow dark:bg-amber-400 dark:text-slate-950'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: GOVERNANCE & GLOBAL ANNOUNCEMENT */}
      {activeTab === 'governance' && (
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="hc-card space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
              <Bell className="h-5 w-5 text-amber-600" />
              Bannière d’Annonce Globale (Tous les utilisateurs)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Diffuse un message officiel en haut de l’application (ex. ouverture d’une session
              concours, nouveau pack d’annales ou rappel important). Synchronisé via Supabase.
            </p>

            <form onSubmit={handleSaveAnnouncement} className="space-y-3">
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3 text-xs font-bold dark:border-slate-700">
                <span>Afficher la bannière d’annonce globale</span>
                <input
                  type="checkbox"
                  checked={announcementEnabled}
                  onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                  className="h-4 w-4 accent-amber-500"
                />
              </label>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Style de la bannière
                </label>
                <div className="mt-1.5 grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'info', label: 'Information (Bleu)' },
                      { id: 'success', label: 'Événement (Vert)' },
                      { id: 'warning', label: 'Alerte (Ambre)' },
                    ] as const
                  ).map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setAnnouncementTone(t.id)}
                      className={`rounded-lg border px-2 py-2 text-xs font-bold ${
                        announcementTone === t.id
                          ? 'border-blue-600 bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-200'
                          : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Message officiel (500 car. max)
                </label>
                <textarea
                  rows={3}
                  maxLength={500}
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-xs text-slate-900 focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-extrabold text-slate-950 shadow hover:bg-amber-400"
              >
                Enregistrer & Diffuser l’annonce
              </button>
            </form>
          </section>

          <section className="hc-card space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
              <Sparkles className="h-5 w-5 text-blue-600" />
              Interrupteurs de Gouvernance Globale
            </h2>
            <div className="space-y-3">
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3.5 text-xs dark:border-slate-700">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    Événement Accès Libre Premium (Gratuit pour tous)
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Offre le statut Premium aux nouveaux inscrits pendant une période de révision.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.freePremiumEvent}
                  onChange={(e) => updateOwnerSettings({ freePremiumEvent: e.target.checked })}
                  className="h-5 w-5 accent-emerald-600"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3.5 text-xs dark:border-slate-700">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    Inscriptions publiques ouvertes
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Désactive pour fermer temporairement la création de nouveaux comptes.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.registrationsOpen}
                  onChange={(e) => updateOwnerSettings({ registrationsOpen: e.target.checked })}
                  className="h-5 w-5 accent-blue-600"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-red-200 bg-red-50/40 p-3.5 text-xs dark:border-red-900/40 dark:bg-red-950/20">
                <div>
                  <p className="font-bold text-red-900 dark:text-red-200">
                    Mode Maintenance Globale
                  </p>
                  <p className="text-[11px] text-red-700/80 dark:text-red-300/80">
                    Affiche un avis de maintenance sur le bandeau supérieur (le Propriétaire garde l’accès total).
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => updateOwnerSettings({ maintenanceMode: e.target.checked })}
                  className="h-5 w-5 accent-red-600"
                />
              </label>

              <div className="rounded-xl border border-slate-200 p-3.5 dark:border-slate-700">
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Politique Globale du Pare-feu WAF & Antivirus
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'standard', label: 'Standard' },
                      { id: 'renforce', label: 'Renforcé' },
                      { id: 'forteresse', label: 'Forteresse Max' },
                    ] as const
                  ).map((lvl) => (
                    <button
                      key={lvl.id}
                      onClick={() => updateOwnerSettings({ globalFirewallLevel: lvl.id })}
                      className={`rounded-lg py-2 text-xs font-bold transition ${
                        settings.globalFirewallLevel === lvl.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TAB 2: CLOUD USERS & ROLES */}
      {activeTab === 'users' && (
        <section className="hc-card space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                <Users className="h-5 w-5 text-blue-600" />
                Gestionnaire des Comptes & Rôles (Supabase Live)
              </h2>
              <p className="text-xs text-slate-500">
                Promouvoir un enseignant ou administrateur, ou activer/désactiver le plan Premium à distance.
              </p>
            </div>
            <button
              onClick={refreshCloudSnapshot}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold hover:bg-slate-50 dark:border-slate-700"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loadingCloud ? 'animate-spin' : ''}`} />
              Rafraîchir
            </button>
          </div>

          {!isOnline ? (
            <p className="rounded-xl bg-amber-50 p-4 text-xs font-semibold text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
              Mode hors ligne actif : reconnecte Internet pour gérer les comptes Cloud Supabase.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200 text-[11px] uppercase text-slate-500 dark:border-slate-700">
                  <tr>
                    <th className="py-2 pr-3">Utilisateur</th>
                    <th className="py-2 pr-3">Rôle</th>
                    <th className="py-2 pr-3">Plan</th>
                    <th className="py-2 pr-3">Série</th>
                    <th className="py-2">Actions Propriétaire</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {(cloudData?.users ?? []).map((u) => (
                    <tr key={u.id}>
                      <td className="py-3 pr-3">
                        <p className="font-bold text-slate-900 dark:text-white">{u.name}</p>
                        <p className="font-mono text-[11px] text-slate-500">{u.email}</p>
                      </td>
                      <td className="py-3 pr-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                            u.role === 'owner'
                              ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200'
                              : u.role === 'admin'
                              ? 'bg-purple-100 text-purple-900 dark:bg-purple-900/40 dark:text-purple-200'
                              : u.role === 'teacher'
                              ? 'bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-200'
                              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {u.role === 'owner' && <Crown className="h-3 w-3" />}
                          {getRoleLabel(u.role)}
                        </span>
                      </td>
                      <td className="py-3 pr-3 font-bold">
                        {u.plan === 'premium' ? '⭐ Premium' : 'Gratuit'}
                      </td>
                      <td className="py-3 pr-3">{u.streak_days} j</td>
                      <td className="py-3">
                        {u.email.toLowerCase() === 'toudjingarlionelngarleje@gmail.com' ? (
                          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                            Compte Fondateur protégé
                          </span>
                        ) : (
                          <div className="flex flex-wrap gap-1.5">
                            <select
                              value={u.role}
                              onChange={(e) =>
                                handleUpdateCloudUser(u.id, { role: e.target.value as AccountRole })
                              }
                              className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold dark:border-slate-700 dark:bg-slate-950"
                            >
                              <option value="user">Candidat</option>
                              <option value="teacher">Enseignant</option>
                              <option value="admin">Administrateur</option>
                            </select>
                            <button
                              onClick={() =>
                                handleUpdateCloudUser(u.id, {
                                  plan: u.plan === 'premium' ? 'gratuit' : 'premium',
                                })
                              }
                              className="rounded-lg bg-blue-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-blue-700"
                            >
                              {u.plan === 'premium' ? 'Passer Gratuit' : 'Offrir Premium'}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* TAB 3: EXPRESS CLOUD PUBLISHER & CONTENT MANAGER */}
      {activeTab === 'cloud-publish' && (
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="hc-card space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
              <PlusCircle className="h-5 w-5 text-emerald-600" />
              Publication Express : Question Officielle Cloud
            </h2>
            <p className="text-xs text-slate-500">
              Ajoute instantanément une nouvelle question officielle dans ton application ET dans
              Supabase Cloud (distribuée automatiquement à tous les candidats).
            </p>
            <form onSubmit={handlePublishExpressQuestion} className="space-y-3 text-xs">
              <div className="grid gap-2 sm:grid-cols-2">
                <select
                  value={qSubjectId}
                  onChange={(e) => setQSubjectId(e.target.value)}
                  className="rounded-xl border border-slate-300 bg-slate-50 p-2.5 font-semibold dark:border-slate-700 dark:bg-slate-950"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <select
                  value={qDifficulty}
                  onChange={(e) => setQDifficulty(e.target.value as Difficulty)}
                  className="rounded-xl border border-slate-300 bg-slate-50 p-2.5 font-semibold dark:border-slate-700 dark:bg-slate-950"
                >
                  <option value="facile">Difficulté : Facile</option>
                  <option value="moyen">Difficulté : Moyen</option>
                  <option value="difficile">Difficulté : Difficile</option>
                </select>
              </div>
              <input
                type="text"
                value={qNotion}
                onChange={(e) => setQNotion(e.target.value)}
                placeholder="Notion clé (ex. Théorème de Thalès, Incoterms CIF...)"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-950"
              />
              <textarea
                rows={2}
                value={qPrompt}
                onChange={(e) => setQPrompt(e.target.value)}
                placeholder="Énoncé de la question officielle..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-950"
              />
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { val: qOpt0, set: setQOpt0, label: 'Choix A' },
                  { val: qOpt1, set: setQOpt1, label: 'Choix B' },
                  { val: qOpt2, set: setQOpt2, label: 'Choix C' },
                  { val: qOpt3, set: setQOpt3, label: 'Choix D' },
                ].map((opt, idx) => (
                  <input
                    key={opt.label}
                    type="text"
                    value={opt.val}
                    onChange={(e) => opt.set(e.target.value)}
                    placeholder={`${opt.label}${qCorrect === idx ? ' (Bonne réponse)' : ''}`}
                    className="rounded-xl border border-slate-300 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-950"
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Bonne réponse :</span>
                {['A', 'B', 'C', 'D'].map((ltr, idx) => (
                  <button
                    key={ltr}
                    type="button"
                    onClick={() => setQCorrect(idx)}
                    className={`rounded-lg px-3 py-1 font-bold ${
                      qCorrect === idx
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {ltr}
                  </button>
                ))}
              </div>
              <textarea
                rows={2}
                value={qExplanation}
                onChange={(e) => setQExplanation(e.target.value)}
                placeholder="Correction détaillée pas à pas..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-950"
              />
              <button
                type="submit"
                disabled={publishingQ}
                className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 font-extrabold text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                {publishingQ ? 'Publication en cours...' : 'Publier en Officiel (Local + Cloud)'}
              </button>
            </form>
          </section>

          <section className="hc-card space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
              <Cloud className="h-5 w-5 text-blue-600" />
              Contenus publiés sur Supabase Cloud ({cloudData?.contents.length ?? 0})
            </h2>
            <div className="max-h-96 space-y-2 overflow-y-auto pr-1">
              {(cloudData?.contents ?? []).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 p-3 text-xs dark:border-slate-800"
                >
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{item.title}</p>
                    <p className="text-[11px] text-slate-500">
                      {item.id} • {item.subject_id} • {item.difficulty}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteCloudContent(item.id)}
                    className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                    title="Supprimer ce contenu Cloud"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* TAB 4: GLOBAL MODERATION */}
      {activeTab === 'moderation' && (
        <section className="hc-card space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Modération Globale (Groupes d’étude & Signalements Pédagogiques)
            </h2>
            <button
              onClick={purgeReportedGroupMessages}
              className="rounded-xl bg-red-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-red-700"
            >
              Purger les messages signalés ({reportedMessagesCount})
            </button>
          </div>

          <div className="space-y-2">
            {state.errorReports.length === 0 ? (
              <p className="text-xs text-slate-500">Aucun signalement pédagogique en attente.</p>
            ) : (
              state.errorReports.map((rep) => (
                <div
                  key={rep.id}
                  className="flex flex-col gap-2 rounded-xl border border-slate-200 p-3 text-xs sm:flex-row sm:items-center sm:justify-between dark:border-slate-800"
                >
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{rep.questionPrompt}</p>
                    <p className="text-slate-600 dark:text-slate-300">Motif : {rep.reason}</p>
                    <span className="text-[10px] font-bold uppercase text-blue-600">
                      Statut : {rep.status}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => updateErrorReportStatus(rep.id, 'corrige')}
                      className="rounded-lg bg-emerald-600 px-2.5 py-1 font-bold text-white"
                    >
                      Marquer corrigé
                    </button>
                    <button
                      onClick={() => updateErrorReportStatus(rep.id, 'examine')}
                      className="rounded-lg bg-amber-500 px-2.5 py-1 font-bold text-slate-950"
                    >
                      Examiner
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {/* TAB 5: CLOUD SIEM SECURITY TELEMETRY */}
      {activeTab === 'security' && (
        <section className="hc-card space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              Supervision SIEM Cloud & Contrôle du Bouclier
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('security')}
                className="rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700"
              >
                Ouvrir Pare-feu & Antivirus (36/36)
              </button>
              <button
                onClick={triggerPanicLockdown}
                className="rounded-xl bg-red-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-red-700"
              >
                Verrouillage d’Urgence
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {(cloudData?.securityLogs ?? []).length === 0 ? (
              <p className="rounded-xl bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">
                ✅ Aucune alerte critique enregistrée dans la table Cloud security_audit_logs.
              </p>
            ) : (
              (cloudData?.securityLogs ?? []).map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-3 text-xs dark:border-slate-800"
                >
                  <div>
                    <span className="font-mono font-bold text-red-600">{log.rule_id}</span>{' '}
                    <span className="font-bold">{log.source}</span> ({log.category})
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">
                    {new Date(log.created_at).toLocaleString('fr-FR')}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      )}
    </div>
  );
};
