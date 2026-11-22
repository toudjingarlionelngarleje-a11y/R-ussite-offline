import React, { useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Copy,
  Flag,
  Lock,
  Plus,
  Send,
  Shield,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { ANNALES, COURSES, EXAMS, SUBJECTS, useApp } from '../context/AppContext';
import { formatBytesFromKb } from '../lib/storage';

export const CommunityAdminScreen: React.FC = () => {
  const {
    state,
    screen,
    allQuestions,
    allFiches,
    allFlashcards,
    createStudyGroup,
    addStudyGroupMessage,
    reportGroupMessage,
    updateErrorReportStatus,
    setSelectedFicheId,
    navigate,
    notify,
  } = useApp();

  const [activeGroupId, setActiveGroupId] = useState(state.studyGroups[0]?.id ?? '');
  const [msgInput, setMsgInput] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newExamId, setNewExamId] = useState(EXAMS[0].id);
  const [newDesc, setNewDesc] = useState('');

  // ==================== SCREEN: ADMIN DASHBOARD ====================
  if (screen === 'admin') {
    const pendingReports = state.errorReports.filter((r) => r.status === 'en_attente');
    const totalStorageKb = Object.values(state.downloadedItems).reduce((s, d) => s + d.sizeKb, 0);
    const officialQuestions = allQuestions.filter((q) => q.isOfficial).length;

    const alerts = [
      pendingReports.length > 0 && {
        tone: 'amber',
        title: `${pendingReports.length} signalement(s) de contenu en attente`,
        detail: 'Vérifie la source et corrige ou valide la question signalée ci-dessous.',
      },
      state.syncQueue.length > 0 && {
        tone: 'blue',
        title: `${state.syncQueue.length} action(s) en attente de synchronisation Supabase`,
        detail: 'La synchronisation s’exécutera automatiquement dès le retour de la connexion.',
      },
      state.simulateSyncError && {
        tone: 'red',
        title: 'Simulation d’échec de synchronisation active',
        detail: 'Désactive-la dans Stockage & Sync pour rétablir la synchronisation cloud.',
      },
    ].filter(Boolean) as { tone: string; title: string; detail: string }[];

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Tableau de bord Administrateur & Contrôle Qualité
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Supervision des contenus vérifiés, traitement des signalements, versions éditoriales et statistiques anonymisées.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
            <ShieldCheck className="h-4 w-4" />
            Qualité éditoriale active · v2.0
          </span>
        </div>

        {/* KPI Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Examens & Matières', value: `${EXAMS.length} / ${SUBJECTS.length}`, sub: 'Parcours officiels actifs' },
            { label: 'Questions vérifiées', value: `${officialQuestions} / ${allQuestions.length}`, sub: `${ANNALES.length} anciens sujets` },
            { label: 'Fiches & Cours', value: `${allFiches.length} / ${COURSES.length}`, sub: `${allFlashcards.length} flashcards SM-2` },
            { label: 'Stockage local actif', value: formatBytesFromKb(totalStorageKb), sub: `${state.profiles.length} profil(s) local(aux)` },
          ].map((k) => (
            <div key={k.label} className="hc-card rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-[11px] font-bold uppercase text-slate-500">{k.label}</p>
              <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">{k.value}</p>
              <p className="text-xs text-slate-500">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* System Alerts */}
        <section className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            Alertes de supervision ({alerts.length})
          </h2>
          {alerts.length === 0 ? (
            <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              Aucune alerte critique : catalogue à jour, synchronisation saine et aucun signalement bloquant.
            </p>
          ) : (
            <div className="mt-3 space-y-2">
              {alerts.map((al, i) => (
                <div key={i} className="rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-xs dark:border-amber-900 dark:bg-amber-950/30">
                  <p className="font-bold text-slate-900 dark:text-white">{al.title}</p>
                  <p className="text-slate-600 dark:text-slate-300">{al.detail}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Error Reports Moderation Table */}
        <section className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
            <Flag className="h-4 w-4 text-rose-600" />
            Signalements d’erreurs sur les contenus ({state.errorReports.length})
          </h2>
          {state.errorReports.length === 0 ? (
            <p className="mt-2 text-xs text-slate-500">
              Aucun signalement soumis pour le moment. Les signalements faits depuis les corrigés ou le générateur apparaissent ici.
            </p>
          ) : (
            <div className="mt-3 space-y-2.5">
              {state.errorReports.map((r) => (
                <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-3 text-xs dark:border-slate-700">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900 dark:text-white">{r.questionPrompt}</p>
                    <p className="text-slate-600 dark:text-slate-400">Motif : {r.reason}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-bold capitalize dark:bg-slate-800">
                      {r.status.replace('_', ' ')}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateErrorReportStatus(r.id, 'examine')}
                      className="rounded-lg border border-slate-300 px-2.5 py-1 font-bold hover:bg-slate-50 dark:border-slate-700"
                    >
                      Examiner
                    </button>
                    <button
                      type="button"
                      onClick={() => updateErrorReportStatus(r.id, 'corrige')}
                      className="rounded-lg bg-emerald-600 px-2.5 py-1 font-bold text-white hover:bg-emerald-700"
                    >
                      Marquer corrigé
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Editorial Catalog Audit */}
        <section className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
            Audit éditorial des matières (couverture hors ligne)
          </h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-700">
                  <th className="py-2 pr-3">Matière</th>
                  <th className="py-2 pr-3">Questions</th>
                  <th className="py-2 pr-3">Annales</th>
                  <th className="py-2 pr-3">Fiches</th>
                  <th className="py-2">Taille pack</th>
                </tr>
              </thead>
              <tbody>
                {SUBJECTS.map((s) => (
                  <tr key={s.id} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="py-2 pr-3 font-bold text-slate-900 dark:text-white">{s.name}</td>
                    <td className="py-2 pr-3">{allQuestions.filter((q) => q.subjectId === s.id).length}</td>
                    <td className="py-2 pr-3">{ANNALES.filter((a) => a.subjectId === s.id).length}</td>
                    <td className="py-2 pr-3">{allFiches.filter((f) => f.subjectId === s.id).length}</td>
                    <td className="py-2">{s.sizeKb} Ko</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }

  // ==================== SCREEN: COLLABORATION / STUDY GROUPS ====================
  const activeGroup =
    state.studyGroups.find((g) => g.id === activeGroupId) ?? state.studyGroups[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Groupes d’étude privés & Entraide sécurisée
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Révise en groupe privé avec partage de fiches vérifiées, modération active et protection des mineurs.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreate((v) => !v)}
          className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800"
        >
          <Plus className="h-4 w-4" />
          Créer un groupe privé
        </button>
      </div>

      {/* Minor protection & moderation charter */}
      <div className="flex items-start gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100">
        <Shield className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-400" />
        <p>
          <strong>Charte de sécurité & protection des mineurs :</strong> groupes privés uniquement sur invitation, zéro messagerie non sollicitée entre adultes et mineurs, tolérance zéro contre le harcèlement et bouton de signalement immédiat sur chaque message.
        </p>
      </div>

      {showCreate && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newName.trim()) return;
            createStudyGroup({ name: newName, examId: newExamId, description: newDesc });
            setNewName('');
            setNewDesc('');
            setShowCreate(false);
          }}
          className="hc-card grid gap-3 rounded-2xl border border-blue-200 bg-white p-4 sm:grid-cols-3 dark:border-blue-900 dark:bg-slate-900"
        >
          <input
            type="text"
            required
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nom du groupe (ex. Prépa BEPC Lycée)"
            className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
          />
          <select
            value={newExamId}
            onChange={(e) => setNewExamId(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
          >
            {EXAMS.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.shortName}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <input
              type="text"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Objectif du groupe..."
              className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
            />
            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
            >
              Créer
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-5 lg:grid-cols-12">
        {/* Groups List */}
        <div className="space-y-2.5 lg:col-span-4">
          {state.studyGroups.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setActiveGroupId(g.id)}
              className={`w-full rounded-2xl border p-4 text-left transition ${
                activeGroup?.id === g.id
                  ? 'border-blue-600 bg-blue-50/70 dark:border-blue-500 dark:bg-blue-950/40'
                  : 'border-slate-200 bg-white hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                  <Lock className="h-3 w-3" /> Privé · {g.inviteCode}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                  <Users className="h-3 w-3" /> {g.membersCount}
                </span>
              </div>
              <p className="mt-1 text-sm font-extrabold text-slate-900 dark:text-white">{g.name}</p>
              <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">{g.description}</p>
            </button>
          ))}
        </div>

        {/* Active Group Room */}
        {activeGroup && (
          <div className="hc-card flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-8 dark:border-slate-800 dark:bg-slate-900">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {activeGroup.name}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Modération active · Code d’invitation : <strong>{activeGroup.inviteCode}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(activeGroup.inviteCode).catch(() => {});
                    notify(`Code privé ${activeGroup.inviteCode} copié !`, 'success');
                  }}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-bold hover:bg-slate-50 dark:border-slate-700"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Partager le code
                </button>
              </div>

              {/* Shared verified fiches */}
              {activeGroup.sharedFicheIds.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase text-slate-500">Fiches partagées :</span>
                  {activeGroup.sharedFicheIds.map((fid) => {
                    const f = allFiches.find((x) => x.id === fid);
                    if (!f) return null;
                    return (
                      <button
                        key={fid}
                        type="button"
                        onClick={() => {
                          setSelectedFicheId(fid);
                          navigate('fiche-viewer');
                        }}
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-800 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-200"
                      >
                        <BookOpen className="h-3 w-3" />
                        {f.title}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Messages */}
              <div className="mt-4 max-h-[300px] space-y-2.5 overflow-y-auto pr-1">
                {activeGroup.messages.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs dark:border-slate-700 dark:bg-slate-800"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {m.author}{' '}
                        {m.role === 'enseignant' && (
                          <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                            Enseignant
                          </span>
                        )}
                      </span>
                      {!m.reported && (
                        <button
                          type="button"
                          onClick={() => reportGroupMessage(activeGroup.id, m.id)}
                          className="text-[11px] text-slate-400 hover:text-rose-600"
                          title="Signaler ce message"
                        >
                          Signaler
                        </button>
                      )}
                    </div>
                    <p className="mt-1 text-slate-700 dark:text-slate-200">
                      {m.reported ? '[Message masqué en attente de modération]' : m.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!msgInput.trim()) return;
                addStudyGroupMessage(activeGroup.id, msgInput);
                setMsgInput('');
              }}
              className="mt-4 flex gap-2 border-t border-slate-200 pt-3 dark:border-slate-800"
            >
              <input
                type="text"
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                placeholder="Partager une astuce, une méthode ou poser une question..."
                className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1 rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800"
              >
                <Send className="h-3.5 w-3.5" />
                Publier
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
