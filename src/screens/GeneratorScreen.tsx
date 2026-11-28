import React, { useState } from 'react';
import {
  AlertTriangle,
  BookMarked,
  CheckCircle2,
  FileUp,
  Flag,
  Layers,
  Save,
  Sparkles,
  Wand2,
} from 'lucide-react';
import { CHAPTERS, SUBJECTS, useApp } from '../context/AppContext';
import { Fiche, Flashcard, Question } from '../types';

interface GeneratedBundle {
  sourceName: string;
  confidencePercent: number;
  verificationPoints: string[];
  summary: string;
  definitions: { terme: string; definition: string }[];
  commonErrors: string[];
  fiche: Fiche;
  questions: Question[];
  flashcards: Flashcard[];
}

export const GeneratorScreen: React.FC = () => {
  const { addGeneratedContent, reportQuestionError, navigate, setSelectedFicheId, notify } = useApp();

  const [subjectId, setSubjectId] = useState(SUBJECTS[0].id);
  const [title, setTitle] = useState('');
  const [sourceLabel, setSourceLabel] = useState('Notes personnelles / Cours importé');
  const [rawText, setRawText] = useState('');
  const [bundle, setBundle] = useState<GeneratedBundle | null>(null);
  const [saved, setSaved] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSourceLabel(`Fichier importé : ${file.name}`);
    if (!title) setTitle(file.name.replace(/\.[^.]+$/, ''));
    const reader = new FileReader();
    reader.onload = () => {
      const content = typeof reader.result === 'string' ? reader.result : '';
      setRawText(content.slice(0, 8000));
      notify(`Fichier « ${file.name} » chargé localement (100 % hors ligne).`, 'success');
    };
    reader.readAsText(file);
  };

  const handleGenerate = () => {
    const clean = rawText.trim();
    if (clean.length < 40) {
      notify('Colle au moins 2 ou 3 phrases de cours ou importe un fichier texte (.txt / .md).', 'warning');
      return;
    }

    const sentences = clean
      .split(/(?<=[.!?])\s+|\n+/)
      .map((s) => s.trim())
      .filter((s) => s.length >= 18);

    const effectiveTitle = title.trim() || `Synthèse — ${SUBJECTS.find((s) => s.id === subjectId)?.shortName ?? 'Cours'}`;
    const chapterId =
      CHAPTERS.find((c) => c.subjectId === subjectId)?.id ?? CHAPTERS[0].id;

    // Extract definitions heuristically ("X : Y" or "X est Y")
    const definitions: { terme: string; definition: string }[] = [];
    for (const s of sentences) {
      const colonIdx = s.indexOf(':');
      if (colonIdx > 2 && colonIdx < 45) {
        definitions.push({
          terme: s.slice(0, colonIdx).trim(),
          definition: s.slice(colonIdx + 1).trim(),
        });
      }
      if (definitions.length >= 4) break;
    }
    if (definitions.length === 0 && sentences[0]) {
      definitions.push({
        terme: effectiveTitle,
        definition: sentences[0],
      });
    }

    const keyPoints = sentences.slice(0, 4);
    const summary = keyPoints.slice(0, 2).join(' ');
    const commonErrors = [
      'Confondre les définitions clés ou oublier les conditions d’application citées dans le cours.',
      'Ne pas relire les termes techniques exacts attendus par le correcteur.',
    ];

    const uid = `gen-${Date.now()}`;
    const fiche: Fiche = {
      id: `fiche-${uid}`,
      subjectId,
      chapterId,
      title: `${effectiveTitle} (Générée IA locale)`,
      subtitle: `Source : ${sourceLabel}`,
      sizeKb: Math.max(24, Math.round(clean.length / 80)),
      notionsEssentielles: keyPoints,
      definitions,
      formules: [],
      datesReperes: [
        { repere: 'Source du document', detail: sourceLabel },
      ],
      methodes: [
        'Relis les notions essentielles à voix haute puis teste-toi avec les flashcards générées.',
        'Vérifie chaque point sensible avec ton cours officiel avant l’examen.',
      ],
      erreursFrequentes: commonErrors,
      exemples: [
        {
          titre: 'Extrait clé du support',
          contenu: sentences[Math.min(1, sentences.length - 1)] ?? summary,
        },
      ],
      resumeExpress: summary,
      tableauComparatif: {
        headers: ['Élément clé', 'Point à retenir', 'Vérification'],
        rows: definitions.slice(0, 3).map((d) => ({
          critere: d.terme,
          elementA: d.definition.slice(0, 90),
          elementB: 'À valider avec le cours officiel',
        })),
      },
      autoEvaluation: definitions.slice(0, 2).map((d) => ({
        question: `Définis : ${d.terme}`,
        reponse: d.definition,
      })),
    };

    const questions: Question[] = definitions.slice(0, 2).map((d, idx) => ({
      id: `q-${uid}-${idx + 1}`,
      subjectId,
      chapterId,
      examIds: SUBJECTS.find((s) => s.id === subjectId)?.examIds ?? ['bac-scientifique'],
      prompt: `D’après le support « ${effectiveTitle} », quelle affirmation correspond exactement à « ${d.terme} » ?`,
      options: [
        d.definition,
        'Une notion sans lien avec le chapitre étudié.',
        'Uniquement une hypothèse secondaire sans impact sur le programme.',
        'L’inverse exact de la définition du cours.',
      ],
      correctIndex: 0,
      explanation: `Extrait issu de votre support (${sourceLabel}) : ${d.definition}`,
      steps: [
        'Relire la définition exacte du support importé.',
        'Éliminer les distracteurs hors-sujet.',
        'Valider la formulation fidèle au cours.',
      ],
      notion: d.terme,
      difficulty: 'moyen',
      ficheId: fiche.id,
      source: `IA locale — ${sourceLabel} (à vérifier)`,
      isOfficial: false,
      estimatedSeconds: 45,
    }));

    const flashcards: Flashcard[] = definitions.slice(0, 3).map((d, idx) => ({
      id: `fc-${uid}-${idx + 1}`,
      subjectId,
      chapterId,
      question: `Que faut-il retenir sur « ${d.terme} » ?`,
      answer: d.definition,
    }));

    const confidencePercent = Math.min(92, Math.max(68, 65 + Math.min(25, sentences.length * 4)));

    setBundle({
      sourceName: sourceLabel,
      confidencePercent,
      verificationPoints: [
        'Vérifie l’exactitude des chiffres, formules et dates par rapport au programme officiel.',
        'Les QCM auto-générés sont des exercices d’entraînement rapide (non issus d’un jury officiel).',
      ],
      summary,
      definitions,
      commonErrors,
      fiche,
      questions,
      flashcards,
    });
    setSaved(false);
    notify('Fiche, QCM et flashcards générés localement (100 % hors ligne) !', 'success');
  };

  const handleSaveOffline = () => {
    if (!bundle) return;
    addGeneratedContent({
      fiche: bundle.fiche,
      questions: bundle.questions,
      flashcards: bundle.flashcards,
    });
    setSaved(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Studio de génération intelligente de contenus (Hors ligne)
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Colle un extrait de cours, tes notes ou importe un fichier texte (.txt / .md) pour générer instantanément une fiche synthétique, des QCM et des flashcards disponibles hors ligne.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Input Form */}
        <section className="hc-card space-y-4 rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Matière</label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
              >
                {SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Titre du thème</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex. La photosynthèse, Les contrats..."
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-blue-400 bg-blue-50/50 px-4 py-2.5 text-xs font-bold text-blue-800 hover:bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-200">
              <FileUp className="h-4 w-4" />
              Importer un fichier de cours (.txt, .md, .csv)
              <input type="file" accept=".txt,.md,.csv" onChange={handleFileUpload} className="hidden" />
            </label>
            <p className="mt-1 text-[11px] text-slate-500">
              Traitement 100 % local sur ton appareil — zéro envoi externe requis.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Texte du cours ou notes à transformer
              </label>
              <button
                type="button"
                onClick={() => {
                  setTitle('La photosynthèse et la respiration cellulaire');
                  setSourceLabel('Exemple de cours SVT Terminale');
                  setRawText(
                    'Photosynthèse : processus par lequel les végétaux chlorophylliens utilisent l’énergie lumineuse pour synthétiser de la matière organique (glucose) à partir de CO2 et d’eau, en libérant du dioxygène O2.\nChloroplaste : organite cellulaire siège de la photosynthèse contenant la chlorophylle.\nRespiration cellulaire : dégradation complète du glucose en présence d’O2 dans les mitochondries pour produire de l’ATP utilisable par la cellule.'
                  );
                }}
                className="text-[11px] font-bold text-blue-700 hover:underline dark:text-blue-400"
              >
                Charger un exemple
              </button>
            </div>
            <textarea
              rows={8}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Colle ici ton cours, tes notes ou un extrait de manuel (utilise « Terme : définition » pour une extraction encore plus précise)..."
              className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-xs leading-relaxed dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white shadow hover:bg-blue-800"
          >
            <Wand2 className="h-4 w-4" />
            Générer fiche + QCM + Flashcards
          </button>
        </section>

        {/* Generated Preview with Transparency */}
        <section className="space-y-4 lg:col-span-7">
          {!bundle ? (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 p-8 text-center dark:border-slate-700 dark:bg-slate-900/60">
              <Sparkles className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              <p className="mt-3 text-sm font-bold text-slate-800 dark:text-white">
                Prêt à transformer tes cours en outils de révision
              </p>
              <p className="mt-1 max-w-md text-xs text-slate-500 dark:text-slate-400">
                Chaque contenu généré affiche clairement sa source, son niveau de confiance et les points à vérifier avant l’examen.
              </p>
            </div>
          ) : (
            <div className="hc-card space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              {/* Mandatory Transparency Banner */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs dark:border-amber-900 dark:bg-amber-950/30">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 font-extrabold text-amber-900 dark:text-amber-200">
                    <AlertTriangle className="h-4 w-4" />
                    Contenu généré par IA locale — Vérification recommandée
                  </span>
                  <span className="rounded-full bg-white px-2.5 py-0.5 font-bold text-amber-900 dark:bg-slate-800 dark:text-amber-200">
                    Confiance estimée : {bundle.confidencePercent} %
                  </span>
                </div>
                <p className="mt-1 text-slate-700 dark:text-slate-300">
                  <strong>Source :</strong> {bundle.sourceName}
                </p>
                <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-slate-700 dark:text-slate-300">
                  {bundle.verificationPoints.map((vp, i) => (
                    <li key={i}>{vp}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Résumé express généré
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  {bundle.summary}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-blue-50/70 p-3 dark:bg-blue-950/40">
                  <BookMarked className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                  <p className="mt-1 text-xs font-extrabold">1 Fiche synthétique</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    {bundle.definitions.length} définitions + tableau
                  </p>
                </div>
                <div className="rounded-xl bg-emerald-50/70 p-3 dark:bg-emerald-950/40">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                  <p className="mt-1 text-xs font-extrabold">{bundle.questions.length} QCM générés</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Avec explication & source
                  </p>
                </div>
                <div className="rounded-xl bg-violet-50/70 p-3 dark:bg-violet-950/40">
                  <Layers className="h-4 w-4 text-violet-700 dark:text-violet-400" />
                  <p className="mt-1 text-xs font-extrabold">{bundle.flashcards.length} Flashcards SM-2</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Prêtes pour répétition espacée
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() =>
                    reportQuestionError(
                      bundle.questions[0]?.id ?? bundle.fiche.id,
                      bundle.fiche.title,
                      'Signalement depuis le générateur IA locale pour révision éditoriale'
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
                >
                  <Flag className="h-3.5 w-3.5 text-amber-600" />
                  Signaler une erreur
                </button>

                <div className="flex flex-wrap gap-2">
                  {saved ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFicheId(bundle.fiche.id);
                        navigate('fiche-viewer');
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                    >
                      <BookMarked className="h-4 w-4" />
                      Ouvrir ma fiche hors ligne
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSaveOffline}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800"
                    >
                      <Save className="h-4 w-4" />
                      Enregistrer dans mon espace hors ligne
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
