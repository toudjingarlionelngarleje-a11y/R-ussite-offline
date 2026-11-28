import { Annale, Chapter, RevisionPath, RevisionPathMode, Subject } from '../../types';
import { REVISION_PHASES, ExpressPhaseId, RevisionPhaseId } from './types';

/** Nombre de chapitres pivots sélectionnés dans chaque parcours complet (2 par journée). */
export const ANCHOR_CHAPTERS_PER_PATH = 14;

/** Nombre de chapitres pivots du parcours express (2 par journée). */
export const EXPRESS_ANCHORS_PER_PATH = 6;

/** Une journée = deux chapitres pivots, sauf la simulation qui s’appuie sur une annale. */
const PHASE_ANCHORS: Record<RevisionPhaseId, number> = {
  diagnostic: 2,
  fondations: 2,
  coeur: 2,
  methode: 2,
  entrainement: 2,
  simulation: 2,
  consolidation: 2,
};

const EXPRESS_ANCHORS: Record<ExpressPhaseId, number> = {
  'filet-securite': 2,
  'notions-tombables': 2,
  'veille-epreuve': 2,
};

/**
 * Choisit des chapitres pivots répartis sur tout le programme de la matière :
 * le premier chapitre, le dernier, et des jalons réguliers entre les deux.
 */
export function pickAnchorChapters(chapters: Chapter[], count: number): Chapter[] {
  const sorted = [...chapters].sort((a, b) => a.order - b.order);
  if (sorted.length <= count) return sorted;
  const picked: Chapter[] = [];
  const used = new Set<string>();
  for (let i = 0; i < count; i += 1) {
    const index = Math.round((i * (sorted.length - 1)) / (count - 1));
    const chapter = sorted[Math.min(sorted.length - 1, Math.max(0, index))];
    if (!used.has(chapter.id)) {
      used.add(chapter.id);
      picked.push(chapter);
    }
  }
  return picked;
}

/**
 * Pour l’express, on ne garde que le cœur du programme (entre 20 % et 80 % de la
 * progression) : les notions centrales, celles qui tombent le plus souvent.
 */
export function pickExpressAnchors(chapters: Chapter[], count: number): Chapter[] {
  const sorted = [...chapters].sort((a, b) => a.order - b.order);
  if (sorted.length <= count) return sorted;
  const start = Math.floor(sorted.length * 0.2);
  const end = Math.max(start + count, Math.ceil(sorted.length * 0.8));
  const band = sorted.slice(start, end);
  if (band.length <= count) return band;
  const picked: Chapter[] = [];
  const used = new Set<string>();
  for (let i = 0; i < count; i += 1) {
    const index = Math.round((i * (band.length - 1)) / (count - 1));
    const chapter = band[Math.min(band.length - 1, Math.max(0, index))];
    if (!used.has(chapter.id)) {
      used.add(chapter.id);
      picked.push(chapter);
    }
  }
  return picked;
}

/** Choisit une annale réellement pourvue de questions pour la matière. */
function pickAnnale(annales: Annale[], subjectId: string): Annale | undefined {
  const candidates = annales
    .filter((a) => a.subjectId === subjectId && a.questionIds.length >= 3)
    .sort((a, b) => b.year - a.year || a.id.localeCompare(b.id));
  if (candidates.length === 0) return undefined;
  return candidates[0];
}

function buildPath(
  subject: Subject,
  subjectChapters: Chapter[],
  annales: Annale[],
  mode: RevisionPathMode
): RevisionPath | null {
  if (subjectChapters.length === 0) return null;
  const express = mode === 'express';
  const anchors = express
    ? pickExpressAnchors(subjectChapters, EXPRESS_ANCHORS_PER_PATH)
    : pickAnchorChapters(subjectChapters, ANCHOR_CHAPTERS_PER_PATH);
  const annale = pickAnnale(annales, subject.id);
  const phases = express
    ? (['filet-securite', 'notions-tombables', 'veille-epreuve'] as ExpressPhaseId[])
    : (REVISION_PHASES.map((p) => p.id) as RevisionPhaseId[]);
  const perPhase = express ? EXPRESS_ANCHORS : PHASE_ANCHORS;
  const idPrefix = express ? `rp-exp-${subject.id}` : `rp-${subject.id}`;

  let cursor = 0;
  const days = phases.map((phase, index) => {
    const wanted = perPhase[phase as keyof typeof perPhase];
    const dayChapters: Chapter[] = [];
    for (let i = 0; i < wanted; i += 1) {
      const chapter = anchors[cursor % anchors.length];
      cursor += 1;
      if (chapter && !dayChapters.some((c) => c.id === chapter.id)) dayChapters.push(chapter);
    }
    return {
      id: `${idPrefix}-j${index + 1}`,
      phase,
      index: index + 1,
      chapterIds: dayChapters.map((c) => c.id),
      annaleId: phase === 'veille-epreuve' || phase === 'simulation' ? annale?.id : undefined,
    };
  });

  return {
    id: idPrefix,
    subjectId: subject.id,
    title: `${express ? 'Parcours express' : 'Parcours guidé'} — ${subject.name}`,
    goal: express
      ? `Trois journées de dernière ligne droite sur ${anchors.length} notions tombables de ${subject.name} : filet de sécurité, notions clés, puis veille d’épreuve.`
      : `Sept journées guidées, du diagnostic au bilan final, sur ${anchors.length} chapitres pivots de ${subject.name}.`,
    mode,
    days,
    anchorChapterCount: anchors.length,
  };
}

/**
 * Construit un parcours guidé de sept journées par matière, adossé à de vrais
 * chapitres, fiches, QCM, flashcards et annales du catalogue hors ligne.
 */
export function buildRevisionPaths(
  subjects: Subject[],
  chapters: Chapter[],
  annales: Annale[]
): RevisionPath[] {
  const chaptersBySubject = new Map<string, Chapter[]>();
  for (const chapter of chapters) {
    const list = chaptersBySubject.get(chapter.subjectId);
    if (list) list.push(chapter);
    else chaptersBySubject.set(chapter.subjectId, [chapter]);
  }

  const paths: RevisionPath[] = [];
  for (const subject of subjects) {
    const path = buildPath(subject, chaptersBySubject.get(subject.id) ?? [], annales, 'standard');
    if (path) paths.push(path);
  }
  return paths;
}

/**
 * v34.0 — Parcours express de trois journées (J-3, J-2, J-1) par matière :
 * filet de sécurité, notions tombables, veille d’épreuve.
 */
export function buildExpressRevisionPaths(
  subjects: Subject[],
  chapters: Chapter[],
  annales: Annale[]
): RevisionPath[] {
  const chaptersBySubject = new Map<string, Chapter[]>();
  for (const chapter of chapters) {
    const list = chaptersBySubject.get(chapter.subjectId);
    if (list) list.push(chapter);
    else chaptersBySubject.set(chapter.subjectId, [chapter]);
  }

  const paths: RevisionPath[] = [];
  for (const subject of subjects) {
    const path = buildPath(subject, chaptersBySubject.get(subject.id) ?? [], annales, 'express');
    if (path) paths.push(path);
  }
  return paths;
}
