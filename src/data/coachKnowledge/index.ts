import { ClassLevelId } from '../../types';
import { COACH_NOTIONS_SCIENCES } from './notionsSciences';
import { COACH_NOTIONS_LETTRES } from './notionsLettres';
import { COACH_NOTIONS_PRO } from './notionsPro';
import { COACH_NOTIONS_METHODE } from './notionsMethode';
import { COACH_METHODS } from './methods';
import { CoachDomain, CoachMethod, CoachNotion, COACH_DOMAIN_LABELS, COACH_METHOD_KIND_LABELS } from './types';

export * from './types';
export { COACH_METHODS };
export { COACH_NOTIONS_SCIENCES, COACH_NOTIONS_LETTRES, COACH_NOTIONS_PRO, COACH_NOTIONS_METHODE };

/** Les 121 notions du coach, tous niveaux confondus. */
export const COACH_NOTIONS: CoachNotion[] = [
  ...COACH_NOTIONS_SCIENCES,
  ...COACH_NOTIONS_LETTRES,
  ...COACH_NOTIONS_PRO,
  ...COACH_NOTIONS_METHODE,
];

/** Ordre d’affichage des domaines dans l’explorateur du coach. */
export const COACH_DOMAINS: CoachDomain[] = [
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
  'sante',
  'ingenierie',
  'methodologie',
  'orientation',
];

/** Niveau de base : « 1ere-s » → « 1ere », « terminale-l » → « terminale ». */
export function baseClassLevel(level: ClassLevelId | string): string {
  return level.replace(/-(s|l)$/, '');
}

/** Vrai si la notion est enseignée au niveau demandé (filières S/L incluses). */
export function notionMatchesLevel(notion: CoachNotion, level?: ClassLevelId | string): boolean {
  if (!level) return true;
  const query = String(level);
  const queryBase = baseClassLevel(query);
  const queryHasStream = query !== queryBase;
  return notion.classLevels.some((l) => {
    const notionLevel = String(l);
    if (baseClassLevel(notionLevel) !== queryBase) return false;
    // Niveau « tronc commun » : la notion vaut pour les deux filières.
    if (!queryHasStream) return true;
    // Niveau filière : la notion doit viser la même filière ou être commune.
    return notionLevel === query || notionLevel === queryBase;
  });
}

export function getNotionsByLevel(level?: ClassLevelId | string): CoachNotion[] {
  if (!level) return COACH_NOTIONS;
  return COACH_NOTIONS.filter((n) => notionMatchesLevel(n, level));
}

export function getNotionsByDomain(domain: CoachDomain): CoachNotion[] {
  return COACH_NOTIONS.filter((n) => n.domain === domain);
}

export function getNotionsBySubject(subjectId: string): CoachNotion[] {
  return COACH_NOTIONS.filter((n) => n.subjectId === subjectId);
}

export function findCoachNotion(id: string): CoachNotion | undefined {
  return COACH_NOTIONS.find((n) => n.id === id);
}

export function findCoachMethod(id: string): CoachMethod | undefined {
  return COACH_METHODS.find((m) => m.id === id);
}

export interface CoachKnowledgeStats {
  notions: number;
  methods: number;
  domains: number;
  subjects: number;
  levels: number;
  aliases: number;
  keys: number;
}

export const COACH_KNOWLEDGE_STATS: CoachKnowledgeStats = {
  notions: COACH_NOTIONS.length,
  methods: COACH_METHODS.length,
  domains: new Set(COACH_NOTIONS.map((n) => n.domain)).size,
  subjects: new Set(COACH_NOTIONS.map((n) => n.subjectId)).size,
  levels: new Set(COACH_NOTIONS.flatMap((n) => n.classLevels.map(baseClassLevel))).size,
  aliases: COACH_NOTIONS.reduce((acc, n) => acc + n.aliases.length, 0),
  keys: COACH_NOTIONS.reduce((acc, n) => acc + n.keys.length, 0),
};

/** Libellé court d’une plage de niveaux : « 6e → 3e », « 2nde → Tle ». */
export function formatNotionLevels(notion: CoachNotion): string {
  const order: string[] = ['6e', '5e', '4e', '3e', '2nde', '1ere', 'terminale', 'l1', 'l2', 'l3', 'master'];
  const labels: Record<string, string> = {
    '6e': '6e',
    '5e': '5e',
    '4e': '4e',
    '3e': '3e',
    '2nde': '2nde',
    '1ere': '1re',
    terminale: 'Tle',
    l1: 'L1',
    l2: 'L2',
    l3: 'L3',
    master: 'Master',
  };
  const bases = Array.from(new Set(notion.classLevels.map((l) => baseClassLevel(l))));
  bases.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  if (bases.length === 0) return 'Tous niveaux';
  if (bases.length === 1) return labels[bases[0]] ?? bases[0];
  return `${labels[bases[0]] ?? bases[0]} → ${labels[bases[bases.length - 1]] ?? bases[bases.length - 1]}`;
}

export { COACH_DOMAIN_LABELS, COACH_METHOD_KIND_LABELS };
