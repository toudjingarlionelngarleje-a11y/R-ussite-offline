import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Bot,
  HelpCircle,
  Lightbulb,
  Mic,
  MicOff,
  Play,
  Send,
  ShieldCheck,
  Sparkles,
  Square,
  Volume2,
} from 'lucide-react';
import { COURSES, SUBJECTS, useApp } from '../context/AppContext';
import { isSpeechSupported, speakFrench, stopSpeaking } from '../lib/speech';
import { Question } from '../types';

type ExplanationStyle =
  | 'tres_simple'
  | 'scolaire'
  | 'universitaire'
  | 'technique'
  | 'exemple'
  | 'analogie';

interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  styleUsed?: ExplanationStyle;
  relatedQuestion?: Question;
  socraticStep?: 'ask' | 'hint' | 'partial' | 'full';
  relatedFicheId?: string;
}

const STYLE_LABELS: Record<ExplanationStyle, string> = {
  tres_simple: 'Très simple',
  scolaire: 'Scolaire',
  universitaire: 'Universitaire',
  technique: 'Technique',
  exemple: 'Exemple concret',
  analogie: 'Analogie',
};

export const CoachScreen: React.FC = () => {
  const {
    state,
    allQuestions,
    allFiches,
    updateAccessibility,
    startPractice,
    setSelectedFicheId,
    navigate,
    notify,
  } = useApp();

  const [style, setStyle] = useState<ExplanationStyle>('scolaire');
  const [input, setInput] = useState('');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-coach',
      sender: 'coach',
      text: 'Bonjour ! Je suis ton assistant pédagogique hors ligne. Pose-moi une question sur une notion (ex. discriminant, dipôle RC, SYSCOHADA, SQL, oxymore, Bandung, Michaelis-Menten) ou demande un quiz rapide. Je m’adapte au profil d’explication que tu choisis ci-dessus.',
    },
  ]);

  useEffect(() => () => stopSpeaking(), []);

  const formatExplanationByStyle = (
    title: string,
    core: string,
    example: string,
    chosenStyle: ExplanationStyle
  ): string => {
    switch (chosenStyle) {
      case 'tres_simple':
        return `En mots très simples (${title}) : ${core} Retiens juste l’essentiel sans jargon !`;
      case 'universitaire':
        return `Approche académique — ${title} : ${core} Pour un niveau universitaire ou concours, veille à articuler définition rigoureuse, portée théorique et limites d’application.`;
      case 'technique':
        return `Synthèse technique (${title}) : ${core} Vérifie systématiquement les conditions de validité, les unités et les cas limites.`;
      case 'exemple':
        return `Exemple concret sur « ${title} » : ${example || core}`;
      case 'analogie':
        return `Analogie pédagogique (${title}) : imagine cette notion comme un outil du quotidien — ${core} Une fois le mécanisme visualisé, la formule devient naturelle.`;
      default:
        return `Explication scolaire (${title}) : ${core}`;
    }
  };

  const handleSend = (customPrompt?: string) => {
    const query = (customPrompt ?? input).trim();
    if (!query) return;
    setInput('');

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
    };

    const qLower = query.toLowerCase();

    // 1. Check if user asks for a quick mini-session
    if (qLower.includes('mini-session') || qLower.includes('interroge') || qLower.includes('quiz')) {
      const matchedSubj = SUBJECTS.find(
        (s) =>
          qLower.includes(s.shortName.toLowerCase()) ||
          qLower.includes(s.name.toLowerCase().slice(0, 5))
      );
      const candidates = matchedSubj
        ? allQuestions.filter((q) => q.subjectId === matchedSubj.id)
        : allQuestions;
      const picked = candidates[Math.floor(Math.random() * candidates.length)];

      const coachMsg: ChatMessage = {
        id: `c-${Date.now() + 1}`,
        sender: 'coach',
        styleUsed: style,
        relatedQuestion: picked,
        socraticStep: 'ask',
        relatedFicheId: picked?.ficheId,
        text: picked
          ? `Voici une question d’entraînement (${picked.notion}) :\n« ${picked.prompt} »\n\nRéfléchis avant de regarder la réponse ! Veux-tu un indice, une explication partielle ou la correction complète ?`
          : 'Tu peux lancer une mini-session de 5 questions depuis les modes d’entraînement !',
      };
      setMessages((prev) => [...prev, userMsg, coachMsg]);
      return;
    }

    // 2. Search across fiches, courses and questions locally (100% offline)
    const tokens = qLower.split(/\s+/).filter((t) => t.length >= 3);
    const scoreText = (haystack: string) =>
      tokens.reduce((acc, tok) => (haystack.toLowerCase().includes(tok) ? acc + 1 : acc), 0);

    const bestQuestion = allQuestions
      .map((q) => ({ q, sc: scoreText(`${q.prompt} ${q.notion} ${q.explanation}`) }))
      .sort((a, b) => b.sc - a.sc)[0];

    const bestFiche = allFiches
      .map((f) => ({ f, sc: scoreText(`${f.title} ${f.subtitle} ${f.resumeExpress}`) }))
      .sort((a, b) => b.sc - a.sc)[0];

    const bestCourse = COURSES.map((c) => ({
      c,
      sc: scoreText(`${c.title} ${c.sections.map((s) => `${s.heading} ${s.content}`).join(' ')}`),
    })).sort((a, b) => b.sc - a.sc)[0];

    // If user pasted or asked about a specific exercise/question -> SOCRATIC MODE FIRST!
    if (bestQuestion && bestQuestion.sc >= 2 && (qLower.includes('?') || qLower.includes('exercice') || qLower.includes('résoudre') || qLower.includes('corrige'))) {
      const coachMsg: ChatMessage = {
        id: `c-${Date.now() + 1}`,
        sender: 'coach',
        styleUsed: style,
        relatedQuestion: bestQuestion.q,
        socraticStep: 'ask',
        relatedFicheId: bestQuestion.q.ficheId,
        text: `J’ai repéré un exercice proche sur « ${bestQuestion.q.notion} ». Pour t’aider à progresser durablement, je ne donne pas la réponse immédiatement.\n\nVeux-tu un indice, une explication partielle ou la correction complète ?`,
      };
      setMessages((prev) => [...prev, userMsg, coachMsg]);
      return;
    }

    if (bestFiche && bestFiche.sc >= 1) {
      const f = bestFiche.f;
      const ex = f.exemples[0] ? `${f.exemples[0].titre} — ${f.exemples[0].contenu}` : f.resumeExpress;
      const reply = formatExplanationByStyle(f.title, f.resumeExpress, ex, style);
      setMessages((prev) => [
        ...prev,
        userMsg,
        {
          id: `c-${Date.now() + 1}`,
          sender: 'coach',
          styleUsed: style,
          relatedFicheId: f.id,
          text: `${reply}\n\nPiège fréquent à éviter : ${f.erreursFrequentes[0] ?? 'Relire attentivement la consigne.'}`,
        },
      ]);
      return;
    }

    if (bestCourse && bestCourse.sc >= 1) {
      const sec = bestCourse.c.sections[0];
      const reply = formatExplanationByStyle(bestCourse.c.title, sec.content, sec.keyTakeaway, style);
      setMessages((prev) => [
        ...prev,
        userMsg,
        {
          id: `c-${Date.now() + 1}`,
          sender: 'coach',
          styleUsed: style,
          text: reply,
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
        text: `Bonne question ! Je travaille 100 % hors ligne sur tes 15 matières. Essaie de préciser un mot-clé du programme (ex. « discriminant », « oxymore », « Bandung », « SQL HAVING », « TVA SYSCOHADA », « Michaelis-Menten », « voix passive ») ou clique sur « Interroge-moi » ci-dessous.`,
      },
    ]);
  };

  const revealSocratic = (msgId: string, level: 'hint' | 'partial' | 'full') => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== msgId || !m.relatedQuestion) return m;
        const q = m.relatedQuestion;
        const nextText =
          level === 'hint'
            ? `Indice pédagogique (${q.notion}) : ${q.steps[0] ?? 'Relis les données clés de l’énoncé.'}\n\nVeux-tu maintenant une explication partielle ou la correction complète ?`
            : level === 'partial'
            ? `Explication partielle :\n1) ${q.steps[0] ?? ''}\n2) ${q.steps[1] ?? q.explanation}\n\nEssaie de trouver la bonne option avant d’afficher la correction complète !`
            : `Correction complète :\nBonne réponse : « ${q.options[q.correctIndex]} ».\n${q.explanation}\n\nÉtapes :\n${q.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
        return { ...m, socraticStep: level, text: nextText };
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
        if (transcript) {
          setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
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
            Assistant pédagogique & Mode vocal (Hors ligne)
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Explications adaptées à ton niveau, indices progressifs sans dévoiler la réponse trop tôt, et révision audio.
          </p>
        </div>

        {/* Voice speed control */}
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

      {/* Explanation Profile Selector (6 modes) */}
      <div className="hc-card rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Profil d’explication souhaité (6 modes)
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {(Object.keys(STYLE_LABELS) as ExplanationStyle[]).map((key) => (
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
              {STYLE_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Pedagogical Starters */}
      <div className="flex flex-wrap gap-2">
        {[
          'Explique-moi le discriminant',
          'Différence entre WHERE et HAVING en SQL',
          'Explique la TVA et le bilan SYSCOHADA',
          'Résoudre un exercice sur Michaelis-Menten ?',
          'Interroge-moi avec un quiz',
        ].map((q) => (
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

      {/* Chat Transcript */}
      <div className="hc-card space-y-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[90%] rounded-2xl p-4 text-sm leading-relaxed sm:max-w-[80%] ${
                  m.sender === 'user'
                    ? 'bg-blue-700 text-white'
                    : 'border border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'
                }`}
              >
                {m.sender === 'coach' && (
                  <div className="mb-1.5 flex items-center justify-between gap-2 text-[11px] font-bold text-blue-700 dark:text-blue-400">
                    <span className="inline-flex items-center gap-1">
                      <Bot className="h-3.5 w-3.5" />
                      Coach Réussite Offline
                      {m.styleUsed ? ` · ${STYLE_LABELS[m.styleUsed]}` : ''}
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

                {/* Socratic Step Buttons */}
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

                {m.relatedFicheId && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFicheId(m.relatedFicheId!);
                        navigate('fiche-viewer');
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold text-slate-800 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      Ouvrir la fiche associée
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        startPractice({
                          mode: 'rapide',
                          title: 'Mini-session recommandée par le Coach',
                          questionIds: allQuestions.slice(0, 5).map((q) => q.id),
                        })
                      }
                      className="inline-flex items-center gap-1 rounded-lg bg-blue-700 px-2.5 py-1 text-xs font-bold text-white hover:bg-blue-800"
                    >
                      <Play className="h-3.5 w-3.5" />
                      Mini-session (5 questions)
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input + Voice Dictation */}
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
            placeholder="Pose une question sur un cours, une notion ou un exercice..."
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

      {/* Ethical Voice & Accessibility Guarantee */}
      <div className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5 text-xs text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400" />
        <p>
          <strong>Accessibilité & éthique vocale :</strong> la dictée et la synthèse vocale traitent uniquement le texte pour t’aider à réviser en marchant ou avec un lecteur d’écran. Aucune donnée vocale n’est enregistrée, revendue ni utilisée pour évaluer ton niveau ou ton origine.
        </p>
      </div>
    </div>
  );
};
