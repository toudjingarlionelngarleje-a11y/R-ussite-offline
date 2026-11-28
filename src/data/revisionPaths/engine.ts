import { Chapter, Flashcard, Fiche, Question, RevisionPath, RevisionStepKind } from '../../types';
import {
  REVISION_PHASE_BY_ID,
  REVISION_PHASES,
  RevisionDayPlan,
  RevisionDayStep,
  RevisionPathPlan,
  RevisionPathSources,
  RevisionPhaseKey,
} from './types';

export interface RevisionEngine {
  sources: RevisionPathSources;
  chaptersById: Map<string, Chapter>;
  fichesById: Map<string, Fiche>;
  questionById: Map<string, Question>;
  questionsByChapter: Map<string, Question[]>;
  questionsBySubject: Map<string, Question[]>;
  flashcardsByChapter: Map<string, Flashcard[]>;
  flashcardsBySubject: Map<string, Flashcard[]>;
  buildPlan: (path: RevisionPath) => RevisionPathPlan;
}

const BASE_MINUTES: Record<RevisionStepKind, number> = {
  cours: 20,
  fiche: 10,
  qcm: 15,
  flashcards: 10,
  annale: 45,
  bilan: 20,
};

/** Prépare les index nécessaires aux 150 parcours (calculé une seule fois). */
export function createRevisionEngine(sources: RevisionPathSources): RevisionEngine {
  const chaptersById = new Map(sources.chapters.map((c) => [c.id, c]));
  const fichesById = new Map(sources.fiches.map((f) => [f.id, f]));
  const questionById = new Map(sources.questions.map((q) => [q.id, q]));
  const questionsByChapter = new Map<string, Question[]>();
  const questionsBySubject = new Map<string, Question[]>();
  for (const q of sources.questions) {
    const byChapter = questionsByChapter.get(q.chapterId);
    if (byChapter) byChapter.push(q);
    else questionsByChapter.set(q.chapterId, [q]);
    const bySubject = questionsBySubject.get(q.subjectId);
    if (bySubject) bySubject.push(q);
    else questionsBySubject.set(q.subjectId, [q]);
  }
  const flashcardsByChapter = new Map<string, Flashcard[]>();
  const flashcardsBySubject = new Map<string, Flashcard[]>();
  for (const card of sources.flashcards) {
    const list = flashcardsByChapter.get(card.chapterId);
    if (list) list.push(card);
    else flashcardsByChapter.set(card.chapterId, [card]);
    const bySubject = flashcardsBySubject.get(card.subjectId);
    if (bySubject) bySubject.push(card);
    else flashcardsBySubject.set(card.subjectId, [card]);
  }
  for (const list of questionsByChapter.values()) {
    list.sort((a, b) => a.id.localeCompare(b.id));
  }
  for (const list of questionsBySubject.values()) {
    list.sort((a, b) => a.id.localeCompare(b.id));
  }

  const chapterQuestions = (chapterIds: string[]): Question[] => {
    const out: Question[] = [];
    const seen = new Set<string>();
    for (const id of chapterIds) {
      for (const q of questionsByChapter.get(id) ?? []) {
        if (!seen.has(q.id)) {
          seen.add(q.id);
          out.push(q);
        }
      }
    }
    return out;
  };

  /** Sélection déterministe de questions réparties sur tout le programme. */
  const spreadQuestions = (subjectId: string, count: number, offset: number): Question[] => {
    const pool = questionsBySubject.get(subjectId) ?? [];
    if (pool.length <= count) return pool.slice(0, count);
    const out: Question[] = [];
    const used = new Set<number>();
    for (let i = 0; i < count; i += 1) {
      let index = (offset + Math.round((i * (pool.length - 1)) / Math.max(1, count - 1))) % pool.length;
      while (used.has(index)) index = (index + 1) % pool.length;
      used.add(index);
      out.push(pool[index]);
    }
    return out;
  };

  const fillQuestions = (
    base: Question[],
    subjectId: string,
    count: number,
    offset: number
  ): Question[] => {
    const out = [...base];
    const seen = new Set(out.map((q) => q.id));
    if (out.length >= count) return out.slice(0, count);
    for (const q of spreadQuestions(subjectId, count * 2 + 4, offset)) {
      if (out.length >= count) break;
      if (seen.has(q.id)) continue;
      seen.add(q.id);
      out.push(q);
    }
    return out;
  };

  const courseStep = (path: RevisionPath, chapter: Chapter): RevisionDayStep => ({
    id: `${path.id}-${chapter.id}-cours`,
    kind: 'cours',
    label: `Cours — ${chapter.title}`,
    detail: chapter.summary,
    minutes: Math.min(30, Math.max(12, chapter.estimatedMinutes || BASE_MINUTES.cours)),
    chapterId: chapter.id,
    courseId: chapter.courseId,
    questionIds: [],
  });

  const ficheStep = (path: RevisionPath, chapter: Chapter, fiche?: Fiche): RevisionDayStep => ({
    id: `${path.id}-${chapter.id}-fiche`,
    kind: 'fiche',
    label: `Fiche de synthèse — ${chapter.title}`,
    detail: fiche
      ? `Notions essentielles : ${fiche.notionsEssentielles.slice(0, 3).join(' · ')}`
      : 'Relève les définitions, les formules et les erreurs fréquentes de ce chapitre.',
    minutes: BASE_MINUTES.fiche,
    chapterId: chapter.id,
    ficheId: chapter.ficheId,
    questionIds: [],
  });

  const qcmStep = (
    stepId: string,
    chapters: Chapter[],
    subjectId: string,
    offset: number,
    wanted = 8
  ): RevisionDayStep => {
    const questions = fillQuestions(chapterQuestions(chapters.map((c) => c.id)), subjectId, wanted, offset);
    const label =
      chapters.length === 1
        ? `QCM corrigé — ${questions.length} questions sur « ${chapters[0].title} »`
        : `QCM corrigé — ${questions.length} questions sur « ${chapters[0].title} » et « ${chapters[1].title} »`;
    return {
      id: stepId,
      kind: 'qcm',
      label,
      detail: 'Correction expliquée après chaque réponse : note les notions qui bloquent.',
      minutes: Math.max(10, Math.min(25, Math.round(questions.length * 2.2))),
      chapterId: chapters[0]?.id,
      questionIds: questions.map((q) => q.id),
    };
  };

  const flashcardStep = (stepId: string, chapters: Chapter[], subjectId: string, offset: number): RevisionDayStep => {
    const cards: Flashcard[] = [];
    const seen = new Set<string>();
    for (const chapter of chapters) {
      for (const card of flashcardsByChapter.get(chapter.id) ?? []) {
        if (seen.has(card.id)) continue;
        seen.add(card.id);
        cards.push(card);
      }
    }
    const pool = flashcardsBySubject.get(subjectId) ?? [];
    if (cards.length < 10 && pool.length > 0) {
      for (let i = 0; i < 12 && cards.length < 10; i += 1) {
        const card = pool[(offset + Math.round((i * (pool.length - 1)) / 11)) % pool.length];
        if (!card || seen.has(card.id)) continue;
        seen.add(card.id);
        cards.push(card);
      }
    }
    const label = `Flashcards — ${cards.length} cartes de révision active`;
    return {
      id: stepId,
      kind: 'flashcards',
      label,
      detail: 'Réponds de mémoire, puis note honnêtement ta maîtrise pour planifier la prochaine révision.',
      minutes: BASE_MINUTES.flashcards,
      chapterId: chapters[0]?.id,
      questionIds: [],
    };
  };

  const bilanStep = (
    stepId: string,
    subjectId: string,
    offset: number,
    wanted = 10
  ): RevisionDayStep => {
    const questions = spreadQuestions(subjectId, wanted, offset);
    return {
      id: stepId,
      kind: 'bilan',
      label: `Bilan noté — ${questions.length} questions mélangées`,
      detail: 'Questions tirées de tout le programme : c’est le seul indicateur fiable de ta progression.',
      minutes: BASE_MINUTES.bilan,
      questionIds: questions.map((q) => q.id),
    };
  };

  const annaleStep = (path: RevisionPath, dayIndex: number): RevisionDayStep | undefined => {
    const annaleId = path.days.find((d) => d.index === dayIndex)?.annaleId;
    if (!annaleId) return undefined;
    const annale = sources.annales.find((a) => a.id === annaleId);
    if (!annale) return undefined;
    const questions = fillQuestions(
      annale.questionIds.map((id) => questionById.get(id)).filter((q): q is Question => Boolean(q)),
      path.subjectId,
      12,
      dayIndex * 7
    );
    return {
      id: `${path.id}-${annale.id}-simulation`,
      kind: 'annale',
      label: `Annale — ${annale.title}`,
      detail: `${annale.responseFormat} · ${annale.durationMinutes} min · session ${annale.year}.`,
      minutes: Math.min(60, Math.max(30, annale.durationMinutes)),
      annaleId: annale.id,
      questionIds: questions.map((q) => q.id),
    };
  };

  const buildDaySteps = (
    path: RevisionPath,
    dayIndex: number,
    phase: RevisionPhaseKey,
    chapters: Chapter[],
    offset: number
  ): RevisionDayStep[] => {
    const prefix = path.id;
    const first = chapters[0];
    const second = chapters[1] ?? chapters[0];
    if (!first) return [];
    const steps: RevisionDayStep[] = [];

    switch (phase) {
      case 'diagnostic':
        steps.push(courseStep(path, first), ficheStep(path, first, fichesById.get(first.ficheId)));
        steps.push(qcmStep(`${prefix}-j1-qcm1`, [first], path.subjectId, offset, 6));
        steps.push(bilanStep(`${prefix}-j1-bilan`, path.subjectId, offset, 8));
        break;
      case 'fondations':
        steps.push(courseStep(path, first), courseStep(path, second));
        steps.push(ficheStep(path, first, fichesById.get(first.ficheId)));
        steps.push(qcmStep(`${prefix}-j2-qcm`, [first, second], path.subjectId, offset, 8));
        break;
      case 'coeur':
        steps.push(courseStep(path, first), ficheStep(path, first, fichesById.get(first.ficheId)));
        steps.push(courseStep(path, second));
        steps.push(qcmStep(`${prefix}-j3-qcm`, [first, second], path.subjectId, offset, 10));
        break;
      case 'methode':
        steps.push(ficheStep(path, first, fichesById.get(first.ficheId)));
        steps.push(courseStep(path, first));
        steps.push(ficheStep(path, second, fichesById.get(second.ficheId)));
        steps.push(bilanStep(`${prefix}-j4-bilan`, path.subjectId, offset, 10));
        break;
      case 'entrainement':
        steps.push(qcmStep(`${prefix}-j5-qcm1`, [first], path.subjectId, offset, 6));
        steps.push(courseStep(path, second));
        steps.push(qcmStep(`${prefix}-j5-qcm2`, [second], path.subjectId, offset + 3, 6));
        steps.push(flashcardStep(`${prefix}-j5-cartes`, chapters, path.subjectId, offset));
        break;
      case 'simulation': {
        const annale = annaleStep(path, dayIndex);
        if (annale) steps.push(annale);
        steps.push(qcmStep(`${prefix}-j6-qcm`, [first, second], path.subjectId, offset, 8));
        steps.push(bilanStep(`${prefix}-j6-bilan`, path.subjectId, offset + 5, 10));
        break;
      }
      case 'consolidation':
        steps.push(flashcardStep(`${prefix}-j7-cartes`, chapters, path.subjectId, offset + 4));
        steps.push(ficheStep(path, second, fichesById.get(second.ficheId)));
        steps.push(bilanStep(`${prefix}-j7-bilan`, path.subjectId, offset, 12));
        break;
      case 'filet-securite':
        steps.push(ficheStep(path, first, fichesById.get(first.ficheId)));
        steps.push(courseStep(path, first));
        steps.push(qcmStep(`${prefix}-j1-qcm`, [first, second], path.subjectId, offset, 10));
        steps.push(flashcardStep(`${prefix}-j1-cartes`, [first, second], path.subjectId, offset));
        break;
      case 'notions-tombables':
        steps.push(courseStep(path, first));
        steps.push(ficheStep(path, second, fichesById.get(second.ficheId)));
        steps.push(qcmStep(`${prefix}-j2-qcm`, [second], path.subjectId, offset + 2, 10));
        steps.push(bilanStep(`${prefix}-j2-bilan`, path.subjectId, offset, 10));
        break;
      case 'veille-epreuve': {
        const annale = annaleStep(path, dayIndex);
        if (annale) steps.push(annale);
        steps.push(ficheStep(path, first, fichesById.get(first.ficheId)));
        steps.push(bilanStep(`${prefix}-j3-bilan`, path.subjectId, offset + 3, 12));
        break;
      }
      default:
        steps.push(courseStep(path, first));
    }
    return steps;
  };

  const buildPlan = (path: RevisionPath): RevisionPathPlan => {
    const days: RevisionDayPlan[] = path.days.map((day, index) => {
      const phase = REVISION_PHASE_BY_ID[day.phase] ?? REVISION_PHASES[0];
      const chapters = day.chapterIds
        .map((id) => chaptersById.get(id))
        .filter((c): c is Chapter => Boolean(c));
      const steps = buildDaySteps(path, day.index, phase.id, chapters, index * 5 + 1);
      return {
        id: day.id,
        index: day.index,
        phase: phase.id,
        title: phase.title,
        objective: phase.objective,
        advice: phase.advice,
        minutes: steps.reduce((sum, s) => sum + s.minutes, 0) || phase.minutes,
        chapters: chapters.map((c) => ({ id: c.id, title: c.title })),
        steps,
      };
    });

    const totalMinutes = days.reduce((sum, d) => sum + d.minutes, 0);
    const stepCount = days.reduce((sum, d) => sum + d.steps.length, 0);
    const questionIds = new Set<string>();
    for (const day of days) {
      for (const step of day.steps) {
        for (const id of step.questionIds) questionIds.add(id);
      }
    }
    const coverage =
      sources.totalChapterCount > 0
        ? Math.min(100, Math.round((path.anchorChapterCount / sources.totalChapterCount) * 100))
        : 0;

    return {
      id: path.id,
      subjectId: path.subjectId,
      subjectName: path.title.replace('Parcours guidé — ', ''),
      title: path.title,
      goal: path.goal,
      days,
      totalMinutes,
      stepCount,
      questionCount: questionIds.size,
      coveragePercent: coverage,
    };
  };

  return {
    sources,
    chaptersById,
    fichesById,
    questionById,
    questionsByChapter,
    questionsBySubject,
    flashcardsByChapter,
    flashcardsBySubject,
    buildPlan,
  };
}
