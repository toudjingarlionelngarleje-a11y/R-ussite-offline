import { ClassLevelId } from '../types';
import {
  COACH_KNOWLEDGE_STATS,
  COACH_METHODS,
  COACH_NOTIONS,
  CoachDomain,
  CoachMethod,
  CoachNotion,
  formatNotionLevels,
  notionMatchesLevel,
} from '../data/coachKnowledge';

/**
 * v18.0 — Moteur du Coach IA, 100 % hors ligne.
 *
 * Aucune requête réseau : la recherche s’effectue dans la base de connaissances
 * locale (`src/data/coachKnowledge`), enrichie par les fiches, cours et questions
 * déjà embarqués dans la PWA. Le moteur gère les accents, les synonymes, les
 * intentions (« c’est quoi », « comment », « piège »…) et le niveau de l’élève.
 */

export type CoachExplanationStyle =
  | 'tres_simple'
  | 'scolaire'
  | 'universitaire'
  | 'technique'
  | 'exemple'
  | 'analogie';

export const COACH_STYLE_LABELS: Record<CoachExplanationStyle, string> = {
  tres_simple: 'Très simple',
  scolaire: 'Scolaire',
  universitaire: 'Universitaire',
  technique: 'Technique',
  exemple: 'Exemple concret',
  analogie: 'Analogie',
};

export type CoachIntent =
  | 'definition'
  | 'formule'
  | 'exemple'
  | 'piege'
  | 'methode'
  | 'exercice'
  | 'quiz'
  | 'plan'
  | 'motivation'
  | 'orientation'
  | 'resume'
  | 'salutation'
  | 'remerciement'
  | 'general';

export interface CoachAnswer {
  text: string;
  intent: CoachIntent;
  source: 'notion' | 'methode' | 'motivation' | 'fallback';
  confidence: 'haute' | 'moyenne' | 'faible';
  notion?: CoachNotion;
  method?: CoachMethod;
  related: CoachNotion[];
  followUps: string[];
}

const STOPWORDS = new Set(
  `le la les un une des du de d au aux a et ou mais donc or ni car pour par avec sans sous sur dans en
  est sont etre ete etait sera soit ce cet cette ces cela ceci il elle ils elles on nous vous je tu
  me te se lui leur leurs mon ma mes ton ta tes son sa ses notre votre nos vos qui que quoi dont
  quel quelle quels quelles comment pourquoi quand combien ou y ne pas plus moins tres trop bien
  tout tous toute toutes meme aussi encore deja alors ainsi afin chez entre vers depuis pendant
  avant apres ensuite puis si comme cela s il c qu j n d l
  moi toi dis donne montre explique expliquer explication detaille detailler parle parler veux
  voudrais peux peut savoir comprendre apprendre definition definir signification the sujet notion
  aide aider svp stp please about ca`
    .split(/\s+/)
    .filter(Boolean)
);

/** Synonymes fréquents ramenés vers un vocabulaire canonique. */
const SYNONYMS: Record<string, string> = {
  delta: 'discriminant',
  b2: 'discriminant',
  derivee: 'derivee',
  deriver: 'derivee',
  integrale: 'integrale',
  primitive: 'primitive',
  ln: 'logarithme',
  exp: 'exponentielle',
  thales: 'thales',
  pythagore: 'pythagore',
  adn: 'adn',
  pcr: 'adn',
  vih: 'immunite',
  svt: 'biologie',
  oxymore: 'oxymore',
  figure: 'metaphore',
  figures: 'metaphore',
  texte: 'commentaire',
  commentaire: 'commentaire-compose',
  dissert: 'dissertation',
  dissertes: 'dissertation',
  soustraction: 'fractions',
  fraction: 'fractions',
  pourcent: 'pourcentage',
  pourcents: 'pourcentage',
  vitesse: 'vitesse-mouvement',
  newton: 'chute-libre',
  ohm: 'loi-ohm',
  tension: 'loi-ohm',
  intensite: 'loi-ohm',
  ph: 'ph',
  mole: 'mole',
  mol: 'mole',
  concentration: 'concentration',
  dilution: 'dilution',
  mitose: 'mitose',
  meiose: 'meiose',
  photosynthese: 'photosynthese',
  immunitaire: 'immunite',
  vaccin: 'immunite',
  pib: 'pib',
  inflation: 'inflation',
  chomage: 'chomage',
  tva: 'tva',
  bilan: 'bilan',
  amortissement: 'amortissement',
  sql: 'sql-select',
  requete: 'sql-select',
  jointure: 'sql-join',
  algorithme: 'algorithme',
  binaire: 'binaire',
  orienter: 'orientation-post-bac',
  orientation: 'orientation-post-bac',
  stress: 'stress-examen',
  stresser: 'stress-examen',
  anxiete: 'stress-examen',
  trac: 'stress-examen',
  memoire: 'repetition-espacee',
  memoriser: 'repetition-espacee',
  reviser: 'repetition-espacee',
  revisions: 'repetition-espacee',
  flashcards: 'repetition-espacee',
  pomodoro: 'pomodoro',
  sommeil: 'sommeil-memoire',
  dormir: 'sommeil-memoire',
  brouillon: 'brouillon',
  planning: 'plan-revision-7-jours',
  programme: 'plan-revision-7-jours',
  organiser: 'plan-revision-7-jours',
};

const INTENT_KEYWORDS: Record<Exclude<CoachIntent, 'general'>, string[]> = {
  definition: ['definition', 'definis', 'definir', 'signifie', 'signification', 'explique', 'expliquer', 'c est quoi', 'qu est ce que', 'veut dire'],
  formule: ['formule', 'equation', 'calculer', 'calcul', 'expression', 'relation', 'theoreme'],
  exemple: ['exemple', 'exemples', 'illustration', 'illustrer', 'concret', 'cas pratique'],
  piege: ['piege', 'erreur', 'erreurs', 'confondre', 'confusion', 'attention', 'eviter', 'faux'],
  methode: ['comment', 'methode', 'demarche', 'procedure', 'etapes', 'faire', 'rediger', 'preparer', 'organiser'],
  exercice: ['exercice', 'exercices', 'resoudre', 'resous', 'corrige', 'correction', 'solution', 'probleme', 'entrainement'],
  quiz: ['quiz', 'interroge', 'interroger', 'teste', 'tester', 'question rapide', 'qcm', 'entrainement rapide'],
  plan: ['planning', 'plan de revision', 'programme', 'semaine', 'emploi du temps', 'organiser mes revisions', 'combien de temps'],
  motivation: ['decourage', 'decouragement', 'abandonner', 'abandonne', 'motive', 'motivation', 'peur', 'panique', 'stress', 'stresse', 'nul', 'fatigue', 'craque'],
  orientation: ['orientation', 'orienter', 'filiere', 'metier', 'apres le bac', 'choisir', 'parcours', 'universite'],
  resume: ['resume', 'synthese', 'fiche', 'retenir', 'essentiel', 'recapituler'],
  salutation: ['bonjour', 'salut', 'bonsoir', 'hello', 'coucou', 'hey'],
  remerciement: ['merci', 'thanks', 'super', 'genial'],
};

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u2019'\u0060\u00b4]/g, ' ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokenize(text: string): string[] {
  return normalizeText(text)
    .split(' ')
    .filter((t) => t.length >= 2 && !STOPWORDS.has(t));
}

function canonicalTokens(text: string): string[] {
  return tokenize(text).map((t) => SYNONYMS[t] ?? t);
}

function unique(tokens: string[]): string[] {
  return Array.from(new Set(tokens));
}

/** Tolérance morphologique simple : « probabilites » ≈ « probabilite ». */
function prefixHit(tokens: Set<string>, token: string): boolean {
  if (token.length < 5) return false;
  const stem = token.slice(0, 5);
  for (const candidate of tokens) {
    if (candidate.length >= 5 && candidate.slice(0, 5) === stem) return true;
  }
  return false;
}

interface NotionIndexEntry {
  notion: CoachNotion;
  termNorm: string;
  aliasNorms: string[];
  haystack: string;
  haystackTokens: Set<string>;
  domainWords: Set<string>;
}

function buildIndex(): NotionIndexEntry[] {
  return COACH_NOTIONS.map((notion) => {
    const termNorm = normalizeText(notion.term);
    const aliasNorms = unique([termNorm, ...notion.aliases.map(normalizeText)]);
    const haystack = normalizeText(
      [
        notion.term,
        ...notion.aliases,
        notion.definition,
        notion.formula ?? '',
        ...notion.keys,
        notion.example,
        notion.pitfall,
        notion.mnemonic ?? '',
      ].join(' ')
    );
    return {
      notion,
      termNorm,
      aliasNorms,
      haystack,
      haystackTokens: new Set(haystack.split(' ').filter(Boolean)),
      domainWords: new Set(notion.domain.split(/[_ ]/)),
    };
  });
}

const NOTION_INDEX: NotionIndexEntry[] = buildIndex();

interface MethodIndexEntry {
  method: CoachMethod;
  titleNorm: string;
  aliasNorms: string[];
  haystackTokens: Set<string>;
}

const METHOD_INDEX: MethodIndexEntry[] = COACH_METHODS.map((method) => ({
  method,
  titleNorm: normalizeText(method.title),
  aliasNorms: unique([normalizeText(method.title), ...method.aliases.map(normalizeText)]),
  haystackTokens: new Set(
    normalizeText([method.title, ...method.aliases, method.summary, ...method.steps].join(' '))
      .split(' ')
      .filter(Boolean)
  ),
}));

export function detectIntent(query: string): CoachIntent {
  const norm = normalizeText(query);
  const padded = ` ${norm} `;
  // Ordre de priorité : les intentions conversationnelles passent avant les autres.
  const ordered: CoachIntent[] = [
    'salutation',
    'remerciement',
    'motivation',
    'quiz',
    'plan',
    'orientation',
    'exercice',
    'piege',
    'formule',
    'exemple',
    'resume',
    'methode',
    'definition',
  ];
  for (const intent of ordered) {
    const words = INTENT_KEYWORDS[intent as Exclude<CoachIntent, 'general'>];
    if (words.some((w) => padded.includes(` ${w} `) || padded.includes(` ${w}s `) || norm.startsWith(`${w} `))) {
      return intent;
    }
  }
  return 'general';
}

function scoreNotion(
  entry: NotionIndexEntry,
  queryNorm: string,
  queryTokens: string[],
  level?: ClassLevelId
): { score: number; hits: number } {
  const notion = entry.notion;
  let score = 0;
  if (entry.termNorm === queryNorm) score += 90;
  if (entry.aliasNorms.includes(queryNorm)) score += 66;
  if (queryNorm.length >= 4 && entry.termNorm.startsWith(queryNorm)) score += 16;
  if (queryNorm.length >= 5 && entry.termNorm.includes(queryNorm)) score += 10;

  const termTokens = new Set(entry.termNorm.split(' ').filter(Boolean));
  const aliasWords = new Set(entry.aliasNorms.flatMap((a) => a.split(' ')).filter(Boolean));
  const tokens = unique(queryTokens);
  let hits = 0;
  for (const token of tokens) {
    if (termTokens.has(token)) {
      hits += 1;
      score += 18;
    } else if (prefixHit(termTokens, token)) {
      hits += 1;
      score += 13;
    } else if (aliasWords.has(token)) {
      hits += 1;
      score += 11;
    } else if (prefixHit(aliasWords, token)) {
      hits += 1;
      score += 8;
    } else if (entry.haystackTokens.has(token)) {
      score += 2;
    } else if (prefixHit(entry.haystackTokens, token)) {
      score += 1;
    }
  }
  if (tokens.length > 0) score += Math.round((hits / tokens.length) * 22);
  if (hits >= 2) score += 6;
  if (level && notionMatchesLevel(notion, level)) score += 5;
  return { score, hits };
}

export interface CoachSearchOptions {
  level?: ClassLevelId;
  subjectIds?: string[];
}

export interface NotionSearchResult {
  notion: CoachNotion;
  score: number;
}

export function searchNotions(query: string, options: CoachSearchOptions = {}): NotionSearchResult[] {
  const norm = normalizeText(query);
  if (!norm) return [];
  const tokens = unique([...tokenize(query), ...canonicalTokens(query)]);
  const results = NOTION_INDEX.map((entry) => {
    const { score, hits } = scoreNotion(entry, norm, tokens, options.level);
    const boosted = score + (options.subjectIds?.length && options.subjectIds.includes(entry.notion.subjectId) ? 4 : 0);
    return { notion: entry.notion, score: boosted, hits };
  })
    .filter((r) => r.hits > 0 && r.score >= 12)
    .map(({ notion, score }) => ({ notion, score }))
    .sort((a, b) => b.score - a.score || a.notion.term.localeCompare(b.notion.term));
  return results;
}

export function searchMethods(query: string): { method: CoachMethod; score: number }[] {
  const norm = normalizeText(query);
  if (!norm) return [];
  const tokens = unique([...tokenize(query), ...canonicalTokens(query)]);
  return METHOD_INDEX.map((entry) => {
    let score = 0;
    if (entry.titleNorm === norm) score += 60;
    if (entry.aliasNorms.some((a) => a === norm)) score += 50;
    if (entry.aliasNorms.some((a) => norm.length >= 5 && a.includes(norm))) score += 22;
    const aliasWords = new Set(entry.aliasNorms.flatMap((a) => a.split(' ')).filter(Boolean));
    let hits = 0;
    for (const token of tokens) {
      if (aliasWords.has(token)) {
        hits += 1;
        score += 16;
      } else if (entry.haystackTokens.has(token)) {
        hits += 1;
        score += 5;
      } else if (prefixHit(entry.haystackTokens, token)) {
        score += 2;
      }
    }
    if (tokens.length > 0) score += Math.round((hits / tokens.length) * 24);
    return { method: entry.method, score };
  })
    .filter((r) => r.score >= 12)
    .sort((a, b) => b.score - a.score);
}

export function findRelatedNotions(notion: CoachNotion): CoachNotion[] {
  const explicit = (notion.related ?? [])
    .map((id) => COACH_NOTIONS.find((n) => n.id === id))
    .filter((n): n is CoachNotion => Boolean(n));
  if (explicit.length >= 2) return explicit.slice(0, 3);
  const sameDomain = COACH_NOTIONS.filter((n) => n.domain === notion.domain && n.id !== notion.id).slice(0, 2);
  return [...explicit, ...sameDomain].slice(0, 3);
}

function styleNotionText(notion: CoachNotion, style: CoachExplanationStyle): string {
  const keys = notion.keys.slice(0, 3).map((k) => `• ${k}`).join('\n');
  const formula = notion.formula ? `\nFormule : ${notion.formula}` : '';
  switch (style) {
    case 'tres_simple':
      return `En mots simples — ${notion.term} : ${notion.definition}\n\nL’essentiel : ${notion.keys[0]}${
        notion.mnemonic ? `\n\nAstuce mémoire : ${notion.mnemonic}` : ''
      }`;
    case 'technique':
      return `${notion.term} — synthèse technique\n\nDéfinition rigoureuse : ${notion.definition}${formula}\n\nPoints de contrôle :\n${keys}\n\nCondition de validité à vérifier : ${notion.pitfall}`;
    case 'universitaire':
      return `${notion.term} — approche académique\n\n${notion.definition}${formula}\n\nÀ maîtriser :\n${keys}\n\nNuance et limite : ${notion.pitfall}\nExemple de référence : ${notion.example}`;
    case 'exemple':
      return `${notion.term} — par l’exemple\n\n${notion.example}\n\nCe que l’exemple montre : ${notion.keys[0]}\n\nPiège à éviter : ${notion.pitfall}`;
    case 'analogie':
      return `${notion.term} — analogie\n\n${notion.definition}\n\nImaginez : ${notion.example}\n\nPiège classique : ${notion.pitfall}`;
    default:
      return `${notion.term} (${formatNotionLevels(notion)})\n\n${notion.definition}${formula}\n\nÀ retenir :\n${keys}${
        notion.mnemonic ? `\n\nMoyen mnémotechnique : ${notion.mnemonic}` : ''
      }`;
  }
}

function styleMethodText(method: CoachMethod, style: CoachExplanationStyle): string {
  const steps = method.steps.map((s, i) => `${i + 1}. ${s}`).join('\n');
  const errors = method.errors.map((e) => `• ${e}`).join('\n');
  const checklist = method.checklist.map((c) => `☐ ${c}`).join('\n');
  const intro =
    style === 'tres_simple'
      ? `${method.title} — en clair : ${method.summary}`
      : style === 'technique'
      ? `${method.title} — protocole opératoire (${method.durationHint})`
      : `${method.title} — ${method.summary}`;
  return `${intro}\n\nÉtapes :\n${steps}\n\nErreurs à éviter :\n${errors}\n\nAuto-contrôle avant de rendre :\n${checklist}`;
}

const MOTIVATION_REPLIES: Record<string, string> = {
  defaut:
    'Je te comprends, et c’est normal de douter. On ne vise pas la perfection ce soir : on vise un pas de plus. Choisis UNE notion de 15 minutes, teste-toi dessus, puis arrête-toi. La régularité bat l’intensité. Dis-moi ta matière la plus urgente et je te construis une séance courte.',
  stress:
    'Le stress est une énergie mal orientée, pas une faiblesse. Fais 3 cycles de respiration 4-6 (inspirer 4 s, expirer 6 s), puis écris les 3 tâches les plus importantes. Tu n’as pas à tout réussir : tu as à commencer. Veux-tu un plan de révision à 7 jours ?',
  fatigue:
    'La fatigue n’est pas un manque de volonté : c’est un signal. Bois de l’eau, marche 10 minutes, puis reprends 25 minutes seulement (un Pomodoro). Si tu es épuisé, le sommeil est la meilleure révision : il consolide ce que tu viens d’apprendre.',
};

function motivationReply(query: string): string {
  const norm = normalizeText(query);
  if (norm.includes('stress') || norm.includes('panique') || norm.includes('peur')) return MOTIVATION_REPLIES.stress;
  if (norm.includes('fatigue') || norm.includes('epuise') || norm.includes('dormir')) return MOTIVATION_REPLIES.fatigue;
  return MOTIVATION_REPLIES.defaut;
}

function followUpsForNotion(notion: CoachNotion): string[] {
  const list = [
    `Donne-moi un exemple sur ${notion.term}`,
    `Quel est le piège avec ${notion.term} ?`,
    `Interroge-moi sur ${notion.term}`,
  ];
  const related = findRelatedNotions(notion)[0];
  if (related) list.push(`Explique-moi ${related.term}`);
  return list.slice(0, 4);
}

export function buildNotionBrief(notion: CoachNotion): { label: string; value: string }[] {
  const brief = [{ label: 'Définition', value: notion.definition }];
  if (notion.formula) brief.push({ label: 'Formule / repère', value: notion.formula });
  brief.push({ label: 'Exemple', value: notion.example });
  brief.push({ label: 'Piège à éviter', value: notion.pitfall });
  if (notion.mnemonic) brief.push({ label: 'Astuce mémoire', value: notion.mnemonic });
  return brief;
}

export interface CoachRequest {
  query: string;
  style?: CoachExplanationStyle;
  level?: ClassLevelId;
  subjectIds?: string[];
}

/** Réponse complète du coach, à partir de la base locale. */
export function answerCoachQuery(request: CoachRequest): CoachAnswer {
  const { query, style = 'scolaire', level, subjectIds } = request;
  let intent = detectIntent(query);
  const norm = normalizeText(query);

  if (intent === 'salutation') {
    return {
      text:
        'Bonjour ! Je suis ton coach hors ligne. Je connais ' +
        `${COACH_KNOWLEDGE_STATS.notions} notions du collège au supérieur et ${COACH_METHODS.length} méthodes d’épreuve. ` +
        'Demande-moi une définition, une formule, un piège, ou dis-moi « je stresse » / « organise ma semaine ».',
      intent,
      source: 'motivation',
      confidence: 'haute',
      related: [],
      followUps: ['Explique-moi le discriminant', 'Comment réviser efficacement ?', 'Interroge-moi avec un quiz'],
    };
  }

  if (intent === 'remerciement') {
    return {
      text: 'Avec plaisir ! Continue sur ta lancée : une notion, un test, une pause. Que veux-tu travailler maintenant ?',
      intent,
      source: 'motivation',
      confidence: 'haute',
      related: [],
      followUps: ['Interroge-moi avec un quiz', 'Organise ma semaine de révision'],
    };
  }

  const notionResults = searchNotions(query, { level, subjectIds });
  const methodResults = searchMethods(query);
  const bestNotion = notionResults[0];
  const bestMethod = methodResults[0];

  // Un besoin exprimé à la première personne (« je stresse ») reste un message
  // d’encouragement, sauf s’il vise clairement une notion (« gestion du stress »).
  const personalDistress = /\bje\b[^.]*\b(stresse|stressee|panique|peur|abandonne|craque|decourage|epuise|fatigue)\b/.test(
    normalizeText(query)
  );
  if (intent === 'motivation' && (personalDistress || !bestNotion || bestNotion.score < 26)) {
    return {
      text: motivationReply(query),
      intent,
      source: 'motivation',
      confidence: 'haute',
      related: [],
      followUps: ['Organise ma semaine de révision', 'Comment gérer le stress d’examen ?', 'Interroge-moi avec un quiz'],
    };
  }

  if (intent === 'motivation') {
    intent = 'methode';
  }

  // Une méthode l’emporte quand elle est nettement plus pertinente que la notion,
  // ou quand la question porte explicitement sur une démarche.
  const preferMethod =
    Boolean(bestMethod) &&
    (!bestNotion ||
      bestMethod.score >= bestNotion.score + 4 ||
      ((intent === 'methode' || intent === 'plan' || intent === 'orientation') &&
        bestMethod.score + 8 >= bestNotion.score));

  if (preferMethod && bestMethod) {
    const method = bestMethod.method;
    return {
      text: styleMethodText(method, style),
      intent,
      source: 'methode',
      confidence: bestMethod.score >= 30 ? 'haute' : 'moyenne',
      method,
      related: [],
      followUps: ['Fais-moi un plan de révision à 7 jours', 'Interroge-moi avec un quiz', 'Comment éviter le stress le jour J ?'],
    };
  }

  if (bestNotion && bestNotion.score >= 12) {
    const notion = bestNotion.notion;
    let text = styleNotionText(notion, style);

    if (intent === 'piege') {
      text = `${notion.term} — les pièges à éviter\n\n${notion.pitfall}\n\nPour ne pas tomber dedans :\n${notion.keys
        .map((k) => `• ${k}`)
        .join('\n')}`;
    } else if (intent === 'formule' && notion.formula) {
      text = `${notion.term} — formule et conditions\n\n${notion.formula}\n\nDéfinition : ${notion.definition}\n\nÀ vérifier avant d’appliquer : ${notion.pitfall}`;
    } else if (intent === 'exemple') {
      text = `${notion.term} — exemple guidé\n\n${notion.example}\n\nCe qu’il faut en retenir : ${notion.keys[0]}`;
    } else if (intent === 'resume') {
      text = `${notion.term} — fiche express (${formatNotionLevels(notion)})\n\n${notion.definition}${
        notion.formula ? `\nFormule : ${notion.formula}` : ''
      }\n\n${notion.keys.map((k) => `• ${k}`).join('\n')}\n\nPiège : ${notion.pitfall}`;
    }

    const related = findRelatedNotions(notion);
    return {
      text,
      intent,
      source: 'notion',
      confidence: bestNotion.score >= 40 ? 'haute' : bestNotion.score >= 22 ? 'moyenne' : 'faible',
      notion,
      related,
      followUps: followUpsForNotion(notion),
    };
  }

  if (bestMethod && !preferMethod && bestMethod.score >= 18) {
    return {
      text: styleMethodText(bestMethod.method, style),
      intent,
      source: 'methode',
      confidence: 'moyenne',
      method: bestMethod.method,
      related: [],
      followUps: ['Interroge-moi avec un quiz', 'Comment organiser mes révisions ?', 'Aide-moi à gérer le stress'],
    };
  }

  if (norm.length > 0 && (intent === 'plan' || intent === 'orientation')) {
    const method = COACH_METHODS.find((m) => m.id === 'plan-revision-7-jours');
    if (method) {
      return {
        text: styleMethodText(method, style),
        intent,
        source: 'methode',
        confidence: 'moyenne',
        method,
        related: [],
        followUps: ['Interroge-moi avec un quiz', 'Comment gérer le stress d’examen ?'],
      };
    }
  }

  return {
    text:
      'Je n’ai pas encore de fiche exactement sur ce point. Précise un mot-clé du programme (ex. « discriminant », « oxymore », « TVA », « jointure SQL », « mitose », « courbe de l’oubli ») ou demande-moi une méthode (« comment réviser », « organiser ma semaine », « gérer le stress »). Je peux aussi t’interroger avec un quiz.',
    intent,
    source: 'fallback',
    confidence: 'faible',
    related: [],
    followUps: [
      'Explique-moi le discriminant',
      'Comment réviser efficacement ?',
      'Interroge-moi avec un quiz',
      'Comment gérer le stress d’examen ?',
    ],
  };
}

/** Suggestions de départ contextuelles (niveau + matières faibles du diagnostic). */
export function suggestCoachQuestions(level?: ClassLevelId, weakSubjectIds: string[] = []): string[] {
  const suggestions: string[] = [];
  if (weakSubjectIds.length > 0) {
    const notion = COACH_NOTIONS.find((n) => weakSubjectIds.includes(n.subjectId) && notionMatchesLevel(n, level));
    if (notion) suggestions.push(`Explique-moi ${notion.term}`);
  }
  if (level) {
    const levelNotion = COACH_NOTIONS.find((n) => notionMatchesLevel(n, level) && n.domain === 'methodologie');
    if (levelNotion) suggestions.push(`Explique-moi ${levelNotion.term}`);
  }
  suggestions.push(
    'Comment réviser efficacement ?',
    'Explique-moi le discriminant',
    'Quel est le piège avec le pH ?',
    'Interroge-moi avec un quiz'
  );
  return unique(suggestions).slice(0, 5);
}

/** Notions à consolider à partir des intitulés de notions ratées. */
export function notionsForWeakLabels(labels: string[], level?: ClassLevelId, max = 4): CoachNotion[] {
  const found: CoachNotion[] = [];
  for (const label of labels) {
    const results = searchNotions(label, { level });
    const candidate = results.find((r) => r.score >= 10)?.notion;
    if (candidate && !found.some((n) => n.id === candidate.id)) found.push(candidate);
    if (found.length >= max) break;
  }
  return found;
}

/** Interroge la base par domaine et niveau (explorateur du coach). */
export function browseNotions(domain: CoachDomain | 'all', level?: ClassLevelId, limit = 12): CoachNotion[] {
  return COACH_NOTIONS.filter(
    (n) => (domain === 'all' || n.domain === domain) && notionMatchesLevel(n, level)
  ).slice(0, limit);
}

/** Questions probables associées à une notion : utile pour « interroge-moi ». */
export function notionSearchTerms(notion: CoachNotion): string[] {
  return unique([notion.term, ...notion.aliases]).map((t) => normalizeText(t)).filter((t) => t.length >= 3);
}
