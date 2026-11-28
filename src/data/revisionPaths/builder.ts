import { Annale, Chapter, RevisionPath, Subject } from '../../types';
import { REVISION_PHASES, RevisionPhaseId } from './types';

/** Nombre de chapitres pivots sélectionnés dans chaque matière (2 par journée). */
export const ANCHOR_CHAPTERS_PER_PATH = 14;

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

/** Choisit une annale réellement pourvue de questions pour la matière. */
function pickAnnale(annales: Annale[], subjectId: string): Annale | undefined {
  const candidates = annales
    .filter((a) => a.subjectId === subjectId && a.questionIds.length >= 3)
    .sort((a, b) => b.year - a.year || a.id.localeCompare(b.id));
  if (candidates.length === 0) return undefined;
  return candidates[0];
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
    const subjectChapters = chaptersBySubject.get(subject.id) ?? [];
    if (subjectChapters.length === 0) continue;

    const totalAnchors = Object.values(PHASE_ANCHORS).reduce((sum, n) => sum + n, 0);
    const anchors = pickAnchorChapters(subjectChapters, totalAnchors);
    const annale = pickAnnale(annales, subject.id);

    let cursor = 0;
    const days = REVISION_PHASES.map((phase) => {
      const wanted = PHASE_ANCHORS[phase.id];
      const dayChapters: Chapter[] = [];
      for (let i = 0; i < wanted; i += 1) {
        const chapter = anchors[cursor % anchors.length];
        cursor += 1;
        if (chapter && !dayChapters.some((c) => c.id === chapter.id)) dayChapters.push(chapter);
      }
      return {
        id: `rp-${subject.id}-j${phase.index}`,
        phase: phase.id as RevisionPhaseId,
        index: phase.index,
        chapterIds: dayChapters.map((c) => c.id),
        annaleId: phase.id === 'simulation' ? annale?.id : undefined,
      };
    });

    paths.push({
      id: `rp-${subject.id}`,
      subjectId: subject.id,
      title: `Parcours guidé — ${subject.name}`,
      goal: `Sept journées guidées, du diagnostic au bilan final, sur ${anchors.length} chapitres pivots de ${subject.name}.`,
      days,
      anchorChapterCount: anchors.length,
    });
  }
  return paths;
}
