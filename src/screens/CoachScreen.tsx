import React, { useEffect, useMemo, useState } from 'react';
import {
  Bot,
  BookOpen,
  Brain,
  ChevronRight,
  Compass,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  ListChecks,
  Mic,
  MicOff,
  Play,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Square,
  Target,
  Volume2,
} from 'lucide-react';
import { COURSES, SUBJECTS, mapStudyLevelToClassId, useApp } from '../context/AppContext';
import { isSpeechSupported, speakFrench, stopSpeaking } from '../lib/speech';
import { Question } from '../types';
import {
  COACH_STYLE_LABELS,
  CoachExplanationStyle,
  CoachIntent,
  answerCoachQuery,
  browseNotions,
  buildNotionBrief,
  detectIntent,
  normalizeText,
  notionSearchTerms,
  notionsForWeakLabels,
  searchNotions,
  suggestCoachQuestions,
} from '../lib/coachEngine';
import {
  COACH_DOMAIN_LABELS,
  COACH_KNOWLEDGE_STATS,
  COACH_METHOD_KIND_LABELS,
  COACH_METHODS,
  CoachDomain,
  CoachMethod,
  CoachNotion,
  formatNotionLevels,
} from '../data/coachKnowledge';

interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  styleUsed?: CoachExplanationStyle;
  relatedQuestion?: Question;
  socraticStep?: 'ask' | 'hint' | 'partial' | 'full';
  relatedFicheId?: string;
  notion?: CoachNotion;
  method?: CoachMethod;
  followUps?: string[];
  intent?: CoachIntent;
  confidence?: 'haute' | 'moyenne' | 'faible';
}

const INTENT_LABELS: Record<CoachIntent, string> = {
  definition: 'Définition',
  formule: 'Formule',
  exemple: 'Exemple',
  piege: 'Piège',
  methode: 'Méthode',
  exercice: 'Exercice',
  quiz: 'Quiz',
  plan: 'Plan de révision',
  motivation: 'Encouragement',
  orientation: 'Orientation',
  resume: 'Fiche express',
  salutation: 'Accueil',
  remerciement: 'Clôture',
  general: 'Explication',
};

const CONFIDENCE_STYLE: Record<'haute' | 'moyenne' | 'faible', string> = {
  haute: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200',
  moyenne: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200',
  faible: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
};

const DOMAIN_FILTERS: (CoachDomain | 'all')[] = [
  'all',
  'maths',
  'physique',
  'chimie',
  'biologie',
  'francais',
  'philosophie',
  'histoire',
  'geographie',
  'anglais',
  'economie',
  'droit',
  'informatique',
  'methodologie',
  'orientation',
];

export const CoachScreen: React.FC = () => {
  const {
    state,
    activeProfile,
    allQuestions,
    allFiches,
    updateAccessibility,
    startPractice,
    setSelectedFicheId,
    navigate,
    notify,
    getMistakeQuestionIds,
  } = useApp();

  const [style, setStyle] = useState<CoachExplanationStyle>('scolaire');
  const [input, setInput] = useState('');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [explorerQuery, setExplorerQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState<CoachDomain | 'all'>('all');
  const [showExplorer, setShowExplorer] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-coach',
      sender: 'coach',
      text: `Bonjour ! Je suis ton coach pédagogique hors ligne. Je dispose maintenant de ${COACH_KNOWLEDGE_STATS.notions} notions détaillées (collège, lycée et supérieur) et de ${COACH_METHODS.length} méthodes d’épreuve : définition, formule, exemple, piège, méthode de travail, orientation.\n\nPose ta question librement, ou utilise l’explorateur ci-dessous. Tu peux aussi demander « interroge-moi » pour un quiz ou « organise ma semaine » pour un plan.`,
      followUps: suggestCoachQuestions(undefined, []),
    },
  ]);

  const level = useMemo(
    () => mapStudyLevelToClassId(activeProfile?.studyLevel, activeProfile?.examId) ?? undefined,
    [activeProfile?.studyLevel, activeProfile?.examId]
  );

  const weakSubjectIds = state.diagnosticResult?.weakSubjectIds ?? [];

  // Notions personnalisées : erreurs récentes puis matières faibles du diagnostic.
  const personalNotions = useMemo(() => {
    const mistakeIds = new Set(getMistakeQuestionIds());
    const labels = allQuestions
      .filter((q) => mistakeIds.has(q.id))
      .slice(0, 12)
      .map((q) => q.notion);
    const fromMistakes = notionsForWeakLabels(labels, level, 3);
    const fromDiagnostic = weakSubjectIds
      .flatMap((subjectId) => browseNotions('all', level, 500).filter((n) => n.subjectId === subjectId).slice(0, 1))
      .slice(0, 2);
    const merged: CoachNotion[] = [];
    for (const notion of [...fromMistakes, ...fromDiagnostic]) {
      if (!merged.some((n) => n.id === notion.id)) merged.push(notion);
    }
    return merged.slice(0, 4);
  }, [allQuestions, getMistakeQuestionIds, level, weakSubjectIds]);

  const daysToExam = useMemo(() => {
    if (!activeProfile?.examDate) return null;
    const target = new Date(`${activeProfile.examDate}T00:00:00`).getTime();
    if (Number.isNaN(target)) return null;
    const diff = Math.ceil((target - Date.now()) / 86_400_000);
    return diff >= 0 && diff < 400 ? diff : null;
  }, [activeProfile?.examDate]);

  const starters = useMemo(() => suggestCoachQuestions(level, weakSubjectIds), [level, weakSubjectIds]);

  const explorerResults = useMemo(() => {
    if (explorerQuery.trim().length >= 2) {
      return searchNotions(explorerQuery, { level }).slice(0, 8).map((r) => r.notion);
    }
    return browseNotions(domainFilter, level, 8);
  }, [explorerQuery, domainFilter, level]);

  useEffect(() => () => stopSpeaking(), []);

  const findFicheIdForNotion = (notion: CoachNotion): string | undefined => {
    const terms = notionSearchTerms(notion);
    const fiche = allFiches.find((f) => {
      const haystack = normalizeText(`${f.title} ${f.subtitle} ${f.notionsEssentielles.join(' ')}`);
      return terms.some((t) => haystack.includes(t));
    });
    return fiche?.id;
  };

  const questionsForNotion = (notion: CoachNotion): Question[] => {
    const terms = notionSearchTerms(notion);
    const direct = allQuestions.filter((q) => {
      const haystack = normalizeText(`${q.notion} ${q.prompt}`);
      return terms.some((t) => haystack.includes(t));
    });
    if (direct.length > 0) return direct;
    return allQuestions.filter((q) => q.subjectId === notion.subjectId);
  };

  const scoreLibraryText = (query: string, haystack: string): number => {
    const tokens = normalizeText(query)
      .split(' ')
      .filter((t) => t.length >= 3);
    if (tokens.length === 0) return 0;
    const norm = normalizeText(haystack);
    return tokens.reduce((acc, token) => {
      if (norm.includes(token)) return acc + 2;
      if (token.length >= 6 && norm.includes(token.slice(0, 6))) return acc + 1;
      return acc;
    }, 0);
  };

  const formatLibraryText = (title: string, core: string, example: string, chosenStyle: CoachExplanationStyle): string => {
    switch (chosenStyle) {
      case 'tres_simple':
        return `En mots très simples (${title}) : ${core} Retiens juste l’essentiel !`;
      case 'universitaire':
        return `Approche académique — ${title} : ${core} Articule définition rigoureuse, portée et limites.`;
      case 'technique':
        return `Synthèse technique (${title}) : ${core} Vérifie les conditions de validité et les cas limites.`;
      case 'exemple':
        return `Exemple concret sur « ${title} » : ${example || core}`;
      case 'analogie':
        return `Analogie pédagogique (${title}) : ${core} Une fois le mécanisme visualisé, la formule devient naturelle.`;
      default:
        return `Explication scolaire (${title}) : ${core}`;
    }
  };

  const findLibraryFallback = (query: string): { ficheId?: string; text: string } | null => {
    const bestFiche = allFiches
      .map((f) => ({
        f,
        sc: scoreLibraryText(query, `${f.title} ${f.subtitle} ${f.resumeExpress} ${f.notionsEssentielles.join(' ')}`),
      }))
      .sort((a, b) => b.sc - a.sc)[0];
    if (bestFiche && bestFiche.sc >= 2) {
      const ex = bestFiche.f.exemples[0]
        ? `${bestFiche.f.exemples[0].titre} — ${bestFiche.f.exemples[0].contenu}`
        : bestFiche.f.resumeExpress;
      const text = formatLibraryText(bestFiche.f.title, bestFiche.f.resumeExpress, ex, style);
      return {
        ficheId: bestFiche.f.id,
        text: `${text}\n\nPiège fréquent à éviter : ${
          bestFiche.f.erreursFrequentes[0] ?? 'Relis attentivement la consigne.'
        }`,
      };
    }
    const bestCourse = COURSES.map((c) => ({
      c,
      sc: scoreLibraryText(query, `${c.title} ${c.sections.map((s) => `${s.heading} ${s.content}`).join(' ')}`),
    })).sort((a, b) => b.sc - a.sc)[0];
    if (bestCourse && bestCourse.sc >= 2) {
      const sec = bestCourse.c.sections[0];
      return { text: formatLibraryText(bestCourse.c.title, sec.content, sec.keyTakeaway, style) };
    }
    return null;
  };

  const handleSend = (customPrompt?: string) => {
    const query = (customPrompt ?? input).trim();
    if (!query) return;
    setInput('');

    const userMsg: ChatMessage = { id: `u-${Date.now()}`, sender: 'user', text: query };
    const intent = detectIntent(query);
    const qLower = normalizeText(query);

    // 1. Quiz : on privilégie une question liée à la notion reconnue.
    if (intent === 'quiz' || qLower.includes('mini session')) {
      const notion = searchNotions(query, { level })[0]?.notion;
      let candidates: Question[] = notion ? questionsForNotion(notion) : [];
      if (candidates.length === 0) {
        const matchedSubj = SUBJECTS.find(
          (s) => qLower.includes(normalizeText(s.shortName)) || qLower.includes(normalizeText(s.name).slice(0, 6))
        );
        candidates = matchedSubj ? allQuestions.filter((q) => q.subjectId === matchedSubj.id) : allQuestions;
      }
      const picked = candidates[Math.floor(Math.random() * candidates.length)];

      const coachMsg: ChatMessage = {
        id: `c-${Date.now() + 1}`,
        sender: 'coach',
        styleUsed: style,
        relatedQuestion: picked,
        socraticStep: 'ask',
        relatedFicheId: picked?.ficheId,
        intent: 'quiz',
        notion,
        followUps: ['Donne-moi un indice', 'Explique-moi la notion', 'Un autre quiz'],
        text: picked
          ? `${notion ? `Quiz ciblé sur « ${notion.term} ».\n\n` : ''}Question d’entraînement (${picked.notion}) :\n« ${picked.prompt} »\n\nRéfléchis avant de révéler quoi que ce soit ! Veux-tu un indice, une explication partielle ou la correction complète ?`
          : 'Tu peux lancer une mini-session depuis les modes d’entraînement — je n’ai pas trouvé de question correspondante ici.',
      };
      setMessages((prev) => [...prev, userMsg, coachMsg]);
      return;
    }

    // 2. Réponse de la base de connaissances hors ligne.
    const answer = answerCoachQuery({
      query,
      style,
      level,
      subjectIds: activeProfile?.selectedSubjectIds,
    });

    if (answer.source !== 'fallback') {
      const notion = answer.notion;
      setMessages((prev) => [
        ...prev,
        userMsg,
        {
          id: `c-${Date.now() + 1}`,
          sender: 'coach',
          styleUsed: style,
          text: answer.text,
          notion,
          method: answer.method,
          followUps: answer.followUps,
          intent: answer.intent,
          confidence: answer.confidence,
          relatedFicheId: notion ? findFicheIdForNotion(notion) : undefined,
        },
      ]);
      return;
    }

    // 3. Repli : fiches et cours embarqués (12 000+ contenus).
    const fallback = findLibraryFallback(query);
    if (fallback) {
      setMessages((prev) => [
        ...prev,
        userMsg,
        {
          id: `c-${Date.now() + 1}`,
          sender: 'coach',
          styleUsed: style,
          text: fallback.text,
          relatedFicheId: fallback.ficheId,
          intent: 'general',
          confidence: 'moyenne',
          followUps: ['Interroge-moi avec un quiz', 'Comment réviser efficacement ?', 'Organise ma semaine de révision'],
        },
      ]);
      return;
    }

    setMessages((prev) => [
      ...prev,
      userMsg,
      {
        id: `c-${Date.now() + 1}`,
        sender: 'coach',
        styleUsed: style,
        text: answer.text,
        followUps: answer.followUps,
        intent: answer.intent,
        confidence: answer.confidence,
      },
    ]);
  };

  const revealSocratic = (msgId: string, level2: 'hint' | 'partial' | 'full') => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== msgId || !m.relatedQuestion) return m;
        const q = m.relatedQuestion;
        const nextText =
          level2 === 'hint'
            ? `Indice pédagogique (${q.notion}) : ${
                q.steps[0] ?? 'Relis les données clés de l’énoncé.'
              }\n\nVeux-tu maintenant une explication partielle ou la correction complète ?`
            : level2 === 'partial'
            ? `Explication partielle :\n1) ${q.steps[0] ?? ''}\n2) ${q.steps[1] ?? q.explanation}\n\nEssaie de trouver la bonne option avant d’afficher la correction complète !`
            : `Correction complète :\nBonne réponse : « ${q.options[q.correctIndex]} ».\n${q.explanation}\n\nÉtapes :\n${q.steps
                .map((s, i) => `${i + 1}. ${s}`)
                .join('\n')}`;
        return { ...m, socraticStep: level2, text: nextText };
      })
    );
  };

  const handleToggleSpeech = (msg: ChatMessage) => {
    if (speakingId === msg.id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }
    if (!isSpeechSupported()) {
      notify('Synthèse vocale non prise en charge sur ce navigateur.', 'warning');
      return;
    }
    setSpeakingId(msg.id);
    speakFrench(msg.text, state.accessibility.audioRate, () => setSpeakingId(null));
  };

  const handleVoiceDictation = () => {
    const SpeechRec =
      (window as unknown as { SpeechRecognition?: new () => unknown; webkitSpeechRecognition?: new () => unknown })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => unknown }).webkitSpeechRecognition;

    if (!SpeechRec) {
      notify('Dictée vocale indisponible sur ce navigateur — utilise le clavier ou la lecture audio.', 'info');
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rec: any = new SpeechRec();
      rec.lang = 'fr-FR';
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      setListening(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rec.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript ?? '';
        if (transcript) setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setListening(false);
      };
      rec.onerror = () => {
        setListening(false);
        notify('Micro non accessible ou dictée interrompue.', 'warning');
      };
      rec.onend = () => setListening(false);
      rec.start();
    } catch {
      setListening(false);
      notify('Impossible de démarrer le micro sur cet appareil.', 'warning');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Coach IA — base de connaissances hors ligne
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {COACH_KNOWLEDGE_STATS.notions} notions détaillées, {COACH_METHODS.length} méthodes d’épreuve,{' '}
            {COACH_KNOWLEDGE_STATS.subjects} matières couvertes. Aucune connexion, aucune donnée envoyée.
          </p>
        </div>

        {isSpeechSupported() && (
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold dark:border-slate-800 dark:bg-slate-900">
            <Volume2 className="h-4 w-4 text-blue-700 dark:text-blue-400" />
            <span>Vitesse audio :</span>
            {[0.8, 1.0, 1.25, 1.5].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => updateAccessibility({ audioRate: r })}
                className={`rounded-lg px-2 py-0.5 ${
                  state.accessibility.audioRate === r
                    ? 'bg-blue-700 text-white'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {r}×
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tableau de bord personnalisé */}
      {(personalNotions.length > 0 || daysToExam !== null) && (
        <div className="hc-card rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4 dark:border-indigo-900 dark:bg-indigo-950/30">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="inline-flex items-center gap-2 text-sm font-extrabold text-indigo-950 dark:text-indigo-100">
              <Target className="h-4 w-4" /> Ton coach te connaît
            </p>
            {daysToExam !== null && (
              <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-indigo-900 dark:bg-indigo-900 dark:text-indigo-100">
                J−{daysToExam} avant l’examen
              </span>
            )}
          </div>
          <p className="mt-1.5 text-xs text-indigo-900/80 dark:text-indigo-200/80">
            {personalNotions.length > 0
              ? 'Notions à consolider d’après tes erreurs et ton diagnostic :'
              : 'Objectif du jour : une notion, un test, une pause.'}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {personalNotions.map((notion) => (
              <button
                key={notion.id}
                type="button"
                onClick={() => handleSend(`Explique-moi ${notion.term}`)}
                className="inline-flex items-center gap-1 rounded-full border border-indigo-300 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-900 hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-100"
              >
                <Brain className="h-3 w-3" />
                {notion.term}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleSend('Organise ma semaine de révision')}
              className="inline-flex items-center gap-1 rounded-full bg-indigo-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-800"
            >
              <ListChecks className="h-3 w-3" />
              Plan de révision à 7 jours
            </button>
          </div>
        </div>
      )}

      {/* Profil d’explication */}
      <div className="hc-card rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Profil d’explication souhaité (6 modes)
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {(Object.keys(COACH_STYLE_LABELS) as CoachExplanationStyle[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setStyle(key)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                style === key
                  ? 'bg-blue-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200'
              }`}
            >
              {COACH_STYLE_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      {/* Explorateur de la base */}
      <div className="hc-card rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
            <Compass className="h-4 w-4 text-blue-700 dark:text-blue-400" />
            Explorer la base
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {COACH_KNOWLEDGE_STATS.notions} notions · {COACH_METHODS.length} méthodes
            </span>
          </p>
          <button
            type="button"
            onClick={() => setShowExplorer((v) => !v)}
            className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200"
          >
            {showExplorer ? 'Masquer' : 'Ouvrir'}
          </button>
        </div>

        {showExplorer && (
          <div className="mt-3 space-y-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={explorerQuery}
                onChange={(e) => setExplorerQuery(e.target.value)}
                placeholder="Chercher une notion : Thalès, pH, TVA, jointure, oxymore…"
                className="min-h-[44px] w-full rounded-xl border border-slate-300 bg-slate-50 pl-9 pr-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {DOMAIN_FILTERS.map((domain) => (
                <button
                  key={domain}
                  type="button"
                  onClick={() => {
                    setDomainFilter(domain);
                    setExplorerQuery('');
                  }}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                    domainFilter === domain && !explorerQuery
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {domain === 'all' ? 'Tous' : COACH_DOMAIN_LABELS[domain]}
                </button>
              ))}
            </div>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {explorerResults.map((notion) => (
                <button
                  key={notion.id}
                  type="button"
                  onClick={() => handleSend(`Explique-moi ${notion.term}`)}
                  className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-bold text-slate-900 dark:text-white">{notion.term}</span>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                      {COACH_DOMAIN_LABELS[notion.domain]} · {formatNotionLevels(notion)}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                </button>
              ))}
              {explorerResults.length === 0 && (
                <p className="text-xs text-slate-500">Aucune notion pour cette recherche — essaie un autre mot-clé.</p>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {COACH_KNOWLEDGE_STATS.aliases} synonymes indexés · {COACH_KNOWLEDGE_STATS.keys} points clés · niveau{' '}
              {level ?? 'tous'} pris en compte dans les réponses.
            </p>
          </div>
        )}
      </div>

      {/* Suggestions rapides */}
      <div className="flex flex-wrap gap-2">
        {starters.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => handleSend(q)}
            className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/60 px-3 py-1.5 text-xs font-semibold text-blue-900 hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200"
          >
            <Sparkles className="h-3 w-3" />
            {q}
          </button>
        ))}
      </div>

      {/* Conversation */}
      <div className="hc-card space-y-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="max-h-[520px] space-y-3 overflow-y-auto pr-1">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[95%] rounded-2xl p-4 text-sm leading-relaxed sm:max-w-[85%] ${
                  m.sender === 'user'
                    ? 'bg-blue-700 text-white'
                    : 'border border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'
                }`}
              >
                {m.sender === 'coach' && (
                  <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold text-blue-700 dark:text-blue-400">
                    <span className="inline-flex flex-wrap items-center gap-1">
                      <Bot className="h-3.5 w-3.5" />
                      Coach Réussite Offline
                      {m.intent && <span className="text-slate-500 dark:text-slate-400">· {INTENT_LABELS[m.intent]}</span>}
                      {m.styleUsed && <span className="text-slate-500 dark:text-slate-400">· {COACH_STYLE_LABELS[m.styleUsed]}</span>}
                      {m.confidence && (
                        <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${CONFIDENCE_STYLE[m.confidence]}`}>
                          {m.confidence === 'haute' ? 'fiabilité haute' : m.confidence === 'moyenne' ? 'à vérifier' : 'indice faible'}
                        </span>
                      )}
                    </span>
                    {isSpeechSupported() && (
                      <button
                        type="button"
                        onClick={() => handleToggleSpeech(m)}
                        className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-0.5 text-[11px] text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200"
                        aria-label="Écouter cette réponse"
                      >
                        {speakingId === m.id ? (
                          <>
                            <Square className="h-3 w-3" /> Stop
                          </>
                        ) : (
                          <>
                            <Volume2 className="h-3 w-3" /> Écouter
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}

                <p className="whitespace-pre-line">{m.text}</p>

                {m.notion && (
                  <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3 text-xs dark:border-slate-700 dark:bg-slate-900">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="inline-flex items-center gap-1.5 font-extrabold text-slate-900 dark:text-white">
                        <GraduationCap className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                        {m.notion.term}
                      </p>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {formatNotionLevels(m.notion)} · {COACH_DOMAIN_LABELS[m.notion.domain]}
                      </span>
                    </div>
                    <dl className="mt-2 space-y-1.5">
                      {buildNotionBrief(m.notion).map((row) => (
                        <div key={row.label} className="grid gap-0.5 sm:grid-cols-[112px_1fr]">
                          <dt className="font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            {row.label}
                          </dt>
                          <dd className="text-slate-800 dark:text-slate-200">{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {m.method && (
                  <div className="mt-3 rounded-xl border border-indigo-200 bg-indigo-50/60 p-3 text-xs dark:border-indigo-900 dark:bg-indigo-950/30">
                    <p className="font-extrabold text-indigo-950 dark:text-indigo-100">{m.method.title}</p>
                    <p className="mt-0.5 text-indigo-900/80 dark:text-indigo-200/80">
                      {COACH_METHOD_KIND_LABELS[m.method.kind]} · {m.method.durationHint}
                    </p>
                    <ul className="mt-1.5 space-y-0.5 text-indigo-950 dark:text-indigo-100">
                      {m.method.checklist.map((item) => (
                        <li key={item}>☐ {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {m.relatedQuestion && m.socraticStep !== 'full' && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => revealSocratic(m.id, 'hint')}
                      className="inline-flex items-center gap-1 rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900 hover:bg-amber-200 dark:bg-amber-950 dark:text-amber-200"
                    >
                      <Lightbulb className="h-3.5 w-3.5" />
                      Indice
                    </button>
                    <button
                      type="button"
                      onClick={() => revealSocratic(m.id, 'partial')}
                      className="inline-flex items-center gap-1 rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-900 hover:bg-blue-200 dark:bg-blue-950 dark:text-blue-200"
                    >
                      <HelpCircle className="h-3.5 w-3.5" />
                      Explication partielle
                    </button>
                    <button
                      type="button"
                      onClick={() => revealSocratic(m.id, 'full')}
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-900 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-200"
                    >
                      Correction complète
                    </button>
                  </div>
                )}

                {(m.relatedFicheId || m.notion || m.relatedQuestion) && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.relatedFicheId && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFicheId(m.relatedFicheId!);
                          navigate('fiche-viewer');
                        }}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold text-slate-800 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        Ouvrir la fiche
                      </button>
                    )}
                    {m.notion && (
                      <button
                        type="button"
                        onClick={() => handleSend(`Interroge-moi sur ${m.notion!.term}`)}
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-700 px-2.5 py-1 text-xs font-bold text-white hover:bg-blue-800"
                      >
                        <Play className="h-3.5 w-3.5" />
                        Quiz sur cette notion
                      </button>
                    )}
                    {m.notion && (
                      <button
                        type="button"
                        onClick={() =>
                          startPractice({
                            mode: 'rapide',
                            title: `Mini-session — ${m.notion!.term}`,
                            questionIds: questionsForNotion(m.notion!)
                              .slice(0, 5)
                              .map((q) => q.id),
                          })
                        }
                        className="inline-flex items-center gap-1 rounded-lg border border-blue-300 bg-white px-2.5 py-1 text-xs font-bold text-blue-900 hover:bg-blue-50 dark:border-blue-800 dark:bg-slate-900 dark:text-blue-200"
                      >
                        <Target className="h-3.5 w-3.5" />
                        Mini-session (5 questions)
                      </button>
                    )}
                  </div>
                )}

                {m.followUps && m.followUps.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {m.followUps.map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => handleSend(f)}
                        className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200"
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 border-t border-slate-200 pt-3 dark:border-slate-800"
        >
          <button
            type="button"
            onClick={handleVoiceDictation}
            className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition ${
              listening
                ? 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950'
                : 'border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300'
            }`}
            title="Dictée vocale"
            aria-label="Activer la dictée vocale"
          >
            {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pose ta question : notion, formule, méthode, orientation…"
            className="min-h-[44px] flex-1 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
          />
          <button
            type="submit"
            className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-blue-700 px-4 text-sm font-bold text-white hover:bg-blue-800"
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Envoyer</span>
          </button>
        </form>
      </div>

      <div className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5 text-xs text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400" />
        <p>
          <strong>100 % hors ligne & éthique :</strong> les {COACH_KNOWLEDGE_STATS.notions} notions et{' '}
          {COACH_METHODS.length} méthodes sont embarquées dans l’application. Aucune question n’est envoyée à un serveur,
          aucune donnée vocale n’est enregistrée, et le coach indique toujours le niveau de fiabilité de sa réponse.
        </p>
      </div>
    </div>
  );
};
