import React, { useState } from 'react';
import {
  BarChart3,
  CheckCircle2,
  FilePlus2,
  Flag,
  PenTool,
  Send,
  ShieldCheck,
  Trash2,
  Upload,
} from 'lucide-react';
import { CHAPTERS, SUBJECTS, useApp } from '../context/AppContext';
import { Difficulty, Fiche, Question, TeacherDraft } from '../types';

export const TeacherScreen: React.FC = () => {
  const {
    state,
    allQuestions,
    saveTeacherDraft,
    publishTeacherDraft,
    deleteTeacherDraft,
    notify,
  } = useApp();

  const [tab, setTab] = useState<'create-q' | 'create-f' | 'validation' | 'analytics'>('create-q');

  // Create Question form state
  const [qSubject, setQSubject] = useState('maths');
  const [qChapter, setQChapter] = useState(CHAPTERS[0].id);
  const [qDifficulty, setQDifficulty] = useState<Difficulty>('moyen');
  const [qPrompt, setQPrompt] = useState('');
  const [qOpts, setQOpts] = useState(['', '', '', '']);
  const [qCorrect, setQCorrect] = useState(0);
  const [qExplanation, setQExplanation] = useState('');
  const [qSource, setQSource] = useState('Cours officiel enseignant 2026');
  const [qNotion, setQNotion] = useState('');

  // Create Fiche form state
  const [fSubject, setFSubject] = useState('maths');
  const [fTitle, setFTitle] = useState('');
  const [fResume, setFResume] = useState('');
  const [fNotions, setFNotions] = useState('');
  const [fErreurs, setFErreurs] = useState('');

  const handleSaveQuestionDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qPrompt.trim() || qOpts.some((o) => !o.trim()) || !qExplanation.trim()) {
      notify('Complète l’énoncé, les 4 propositions et le corrigé officiel.', 'warning');
      return;
    }
    // Duplicate check against existing catalog
    const duplicate = allQuestions.some(
      (existing) => existing.prompt.trim().toLowerCase() === qPrompt.trim().toLowerCase()
    );
    const id = `q-teach-${Date.now()}`;
    const payload: Question = {
      id,
      subjectId: qSubject,
      chapterId: qChapter,
      examIds: ['bac-scientifique', 'concours-admin'],
      prompt: qPrompt.trim(),
      options: qOpts.map((o) => o.trim()),
      correctIndex: qCorrect,
      explanation: qExplanation.trim(),
      steps: [qExplanation.trim()],
      notion: qNotion.trim() || 'Notion enseignant',
      difficulty: qDifficulty,
      source: qSource.trim() || 'Auteur enseignant',
      isOfficial: true,
      estimatedSeconds: 60,
      createdByTeacher: true,
    };

    const draft: TeacherDraft = {
      id: `draft-${Date.now()}`,
      kind: 'question',
      subjectId: qSubject,
      chapterId: qChapter,
      title: qPrompt.trim().slice(0, 70),
      difficulty: qDifficulty,
      payload,
      validationChecks: {
        noDuplicate: !duplicate,
        officialCorrectionVerified: true,
        sourceCited: Boolean(qSource.trim()),
        curriculumCompliant: false,
        upToDate: false,
      },
      status: 'brouillon',
      createdAt: new Date().toISOString(),
    };
    saveTeacherDraft(draft);
    setQPrompt('');
    setQOpts(['', '', '', '']);
    setQExplanation('');
    setQNotion('');
    setTab('validation');
  };

  const handleSaveFicheDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fTitle.trim() || !fResume.trim()) {
      notify('Indique un titre et un résumé pour la fiche.', 'warning');
      return;
    }
    const ch = CHAPTERS.find((c) => c.subjectId === fSubject) ?? CHAPTERS[0];
    const payload: Fiche = {
      id: `fiche-teach-${Date.now()}`,
      subjectId: fSubject,
      chapterId: ch.id,
      title: fTitle.trim(),
      subtitle: 'Fiche créée dans l’espace enseignant (hors ligne)',
      sizeKb: 42,
      notionsEssentielles: fNotions
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean),
      definitions: [],
      formules: [],
      datesReperes: [],
      methodes: ['Relire attentivement les notions essentielles avant les exercices.'],
      erreursFrequentes: fErreurs
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean),
      exemples: [],
      resumeExpress: fResume.trim(),
      tableauComparatif: {
        headers: ['Élément', 'À retenir', 'Application'],
        rows: [{ critere: 'Essentiel', elementA: fResume.trim(), elementB: 'Exercices du chapitre' }],
      },
      autoEvaluation: [],
    };
    saveTeacherDraft({
      id: `draft-f-${Date.now()}`,
      kind: 'fiche',
      subjectId: fSubject,
      chapterId: ch.id,
      title: fTitle.trim(),
      difficulty: 'moyen',
      payload,
      validationChecks: {
        noDuplicate: true,
        officialCorrectionVerified: true,
        sourceCited: true,
        curriculumCompliant: false,
        upToDate: false,
      },
      status: 'brouillon',
      createdAt: new Date().toISOString(),
    });
    setFTitle('');
    setFResume('');
    setFNotions('');
    setFErreurs('');
    setTab('validation');
  };

  const handleImportSampleJson = () => {
    const sampleQ: Question = {
      id: `q-import-${Date.now()}`,
      subjectId: 'maths',
      chapterId: 'ch-maths-second-degre',
      examIds: ['bac-scientifique'],
      prompt: 'Quelle est la forme factorisée de x² − 9 ?',
      options: ['(x − 3)(x + 3)', '(x − 3)²', '(x + 3)²', 'x(x − 9)'],
      correctIndex: 0,
      explanation: 'On reconnaît l’identité remarquable a² − b² = (a − b)(a + b) avec a = x et b = 3.',
      steps: ['Identifier a² = x² et b² = 9 = 3².', 'Appliquer a² − b² = (a − b)(a + b).'],
      notion: 'Identités remarquables',
      difficulty: 'facile',
      ficheId: 'fiche-maths-second-degre',
      source: 'Import JSON Enseignant — Sujet de révision',
      isOfficial: true,
      estimatedSeconds: 35,
      createdByTeacher: true,
    };
    saveTeacherDraft({
      id: `draft-imp-${Date.now()}`,
      kind: 'question',
      subjectId: 'maths',
      chapterId: 'ch-maths-second-degre',
      title: '[Import] Factorisation de x² − 9',
      difficulty: 'facile',
      payload: sampleQ,
      validationChecks: {
        noDuplicate: true,
        officialCorrectionVerified: true,
        sourceCited: true,
        curriculumCompliant: true,
        upToDate: true,
      },
      status: 'brouillon',
      createdAt: new Date().toISOString(),
    });
    setTab('validation');
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Espace Enseignant & Formateur
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Crée, valide et publie des questions et fiches synthétiques directement utilisables hors ligne par tes élèves.
          </p>
        </div>
        <button
          type="button"
          onClick={handleImportSampleJson}
          className="inline-flex items-center gap-1.5 rounded-xl border border-blue-300 bg-blue-50 px-3.5 py-2 text-xs font-bold text-blue-800 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200"
        >
          <Upload className="h-4 w-4" />
          Importer un sujet exemple
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'create-q' as const, label: 'Créer une question QCM', icon: PenTool },
          { id: 'create-f' as const, label: 'Créer une fiche', icon: FilePlus2 },
          {
            id: 'validation' as const,
            label: `Validation & Publication (${state.teacherDrafts.length})`,
            icon: ShieldCheck,
          },
          { id: 'analytics' as const, label: 'Statistiques anonymisées & Signalements', icon: BarChart3 },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold ${
                tab === t.id
                  ? 'bg-blue-700 text-white'
                  : 'border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Create Question */}
      {tab === 'create-q' && (
        <form
          onSubmit={handleSaveQuestionDraft}
          className="hc-card space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300">Matière</label>
              <select
                value={qSubject}
                onChange={(e) => {
                  setQSubject(e.target.value);
                  const firstCh = CHAPTERS.find((c) => c.subjectId === e.target.value);
                  if (firstCh) setQChapter(firstCh.id);
                }}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
              >
                {SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300">Chapitre</label>
              <select
                value={qChapter}
                onChange={(e) => setQChapter(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
              >
                {CHAPTERS.filter((c) => c.subjectId === qSubject).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300">Difficulté</label>
              <select
                value={qDifficulty}
                onChange={(e) => setQDifficulty(e.target.value as Difficulty)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="facile">Facile</option>
                <option value="moyen">Moyen</option>
                <option value="difficile">Difficile</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300">
              Énoncé de la question
            </label>
            <textarea
              rows={2}
              required
              value={qPrompt}
              onChange={(e) => setQPrompt(e.target.value)}
              placeholder="Ex. Quelle est la dérivée de f(x) = 5x² ?"
              className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            {qOpts.map((val, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correct-opt"
                  checked={qCorrect === idx}
                  onChange={() => setQCorrect(idx)}
                  aria-label={`Marquer l'option ${idx + 1} comme bonne réponse`}
                  className="h-4 w-4 accent-emerald-600"
                />
                <input
                  type="text"
                  required
                  value={val}
                  onChange={(e) => {
                    const copy = [...qOpts];
                    copy[idx] = e.target.value;
                    setQOpts(copy);
                  }}
                  placeholder={`Option ${String.fromCharCode(65 + idx)} ${qCorrect === idx ? '(Bonne réponse)' : ''}`}
                  className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300">Notion évaluée</label>
              <input
                type="text"
                value={qNotion}
                onChange={(e) => setQNotion(e.target.value)}
                placeholder="Ex. Dérivée d’un polynôme"
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300">Source officielle</label>
              <input
                type="text"
                value={qSource}
                onChange={(e) => setQSource(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300">
              Corrigé détaillé & explication pédagogique
            </label>
            <textarea
              rows={3}
              required
              value={qExplanation}
              onChange={(e) => setQExplanation(e.target.value)}
              placeholder="Explique clairement les étapes de résolution..."
              className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-xs dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-800"
          >
            <Send className="h-4 w-4" />
            Envoyer vers la file de validation
          </button>
        </form>
      )}

      {/* Tab 2: Create Fiche */}
      {tab === 'create-f' && (
        <form
          onSubmit={handleSaveFicheDraft}
          className="hc-card space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300">Matière</label>
              <select
                value={fSubject}
                onChange={(e) => setFSubject(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
              >
                {SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300">Titre de la fiche</label>
              <input
                type="text"
                required
                value={fTitle}
                onChange={(e) => setFTitle(e.target.value)}
                placeholder="Ex. Suites arithmétiques et géométriques"
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300">
              Résumé express (essentiel en 2 phrases)
            </label>
            <textarea
              rows={2}
              required
              value={fResume}
              onChange={(e) => setFResume(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-xs dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300">
                Notions essentielles (une par ligne)
              </label>
              <textarea
                rows={4}
                value={fNotions}
                onChange={(e) => setFNotions(e.target.value)}
                placeholder={'u_{n+1} = u_n + r\nu_n = u_0 + n·r'}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-xs dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300">
                Erreurs fréquentes (une par ligne)
              </label>
              <textarea
                rows={4}
                value={fErreurs}
                onChange={(e) => setFErreurs(e.target.value)}
                placeholder="Confondre raison additive et raison multiplicative"
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-xs dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-800"
          >
            <FilePlus2 className="h-4 w-4" />
            Enregistrer le brouillon pour validation
          </button>
        </form>
      )}

      {/* Tab 3: Quality Validation Workflow (Section 12) */}
      {tab === 'validation' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-blue-950 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200">
            <strong>Contrôle qualité avant publication hors ligne :</strong> chaque contenu doit être vérifié contre les doublons, erreurs de corrigé, sources manquantes et informations obsolètes avant d’être diffusé aux apprenants.
          </div>

          {state.teacherDrafts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700">
              Aucun brouillon en attente. Crée une question, une fiche ou clique sur « Importer un sujet exemple ».
            </div>
          ) : (
            state.teacherDrafts.map((draft) => {
              const checks = draft.validationChecks;
              const allChecked =
                checks.noDuplicate &&
                checks.officialCorrectionVerified &&
                checks.sourceCited &&
                checks.curriculumCompliant &&
                checks.upToDate;

              const toggleCheck = (key: keyof TeacherDraft['validationChecks']) => {
                saveTeacherDraft({
                  ...draft,
                  validationChecks: { ...checks, [key]: !checks[key] },
                });
              };

              return (
                <div
                  key={draft.id}
                  className="hc-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] font-bold">
                        <span className="rounded bg-blue-100 px-2 py-0.5 uppercase text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                          {draft.kind}
                        </span>
                        <span
                          className={`rounded px-2 py-0.5 uppercase ${
                            draft.status === 'publie'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                              : 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
                          }`}
                        >
                          {draft.status}
                        </span>
                      </div>
                      <h3 className="mt-1.5 text-sm font-bold text-slate-900 dark:text-white">
                        {draft.title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteTeacherDraft(draft.id)}
                      className="text-slate-400 hover:text-red-600"
                      aria-label="Supprimer le brouillon"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      { k: 'noDuplicate' as const, label: 'Absence de doublon vérifiée' },
                      { k: 'officialCorrectionVerified' as const, label: 'Correction exacte et vérifiée' },
                      { k: 'sourceCited' as const, label: 'Source officielle citée' },
                      { k: 'curriculumCompliant' as const, label: 'Conforme au programme' },
                      { k: 'upToDate' as const, label: 'Contenu non obsolète' },
                    ].map((c) => (
                      <label
                        key={c.k}
                        className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 p-2.5 text-xs font-semibold dark:border-slate-700"
                      >
                        <input
                          type="checkbox"
                          checked={checks[c.k]}
                          onChange={() => toggleCheck(c.k)}
                          className="accent-emerald-600"
                        />
                        {c.label}
                      </label>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      disabled={draft.status === 'publie' || !allChecked}
                      onClick={() => publishTeacherDraft(draft.id)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {draft.status === 'publie'
                        ? 'Publié dans le catalogue hors ligne'
                        : 'Publier la version hors ligne'}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 4: Anonymized Learner Analytics & Error Reports */}
      {tab === 'analytics' && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Statistiques anonymisées des apprenants (agrégées)
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Aucune donnée nominative exposée — uniquement les taux agrégés pour améliorer les cours.
            </p>
            <div className="mt-4 space-y-2.5 text-xs">
              {[
                { chap: 'Équations du second degré', rate: 62, learners: 128 },
                { chap: 'Dipôle RC et circuits', rate: 58, learners: 94 },
                { chap: 'Mitose & Méiose', rate: 81, learners: 112 },
                { chap: 'Séparation des pouvoirs', rate: 74, learners: 86 },
              ].map((row) => (
                <div key={row.chap} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                  <div className="flex justify-between font-bold">
                    <span>{row.chap}</span>
                    <span className={row.rate < 65 ? 'text-amber-700' : 'text-emerald-700'}>
                      {row.rate} % ({row.learners} sessions)
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      className={`h-full rounded-full ${row.rate < 65 ? 'bg-amber-500' : 'bg-emerald-600'}`}
                      style={{ width: `${row.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hc-card rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Flag className="h-4 w-4 text-amber-600" />
              Signalements d’erreurs reçus ({state.errorReports.length})
            </h2>
            {state.errorReports.length === 0 ? (
              <p className="mt-3 text-xs text-slate-500">
                Aucun signalement en attente. Lorsqu’un étudiant signale un énoncé ou un corrigé, il apparaît ici pour vérification.
              </p>
            ) : (
              <div className="mt-3 space-y-2">
                {state.errorReports.map((rep) => (
                  <div key={rep.id} className="rounded-xl border border-amber-200 bg-amber-50/50 p-3 text-xs dark:border-amber-900 dark:bg-amber-950/30">
                    <p className="font-bold text-slate-900 dark:text-white">{rep.questionPrompt}</p>
                    <p className="mt-1 text-amber-900 dark:text-amber-200">Remarque : {rep.reason}</p>
                    <p className="mt-1 text-[10px] text-slate-500">
                      Statut : {rep.status} · {new Date(rep.createdAt).toLocaleString('fr-FR')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
