import { Chapter, Course, Difficulty, Fiche } from '../../types';

/**
 * Compact curated curriculum unit for one authentic chapter + course + 6-format fiche.
 */
export type CurriculumTuple = [
  slug: string,
  title: string,
  notionA: string,
  notionB: string,
  ruleOrFormula: string,
  pitfall: string,
  example: string,
  difficulty: Difficulty,
];

export interface ExpandedBundle {
  chapters: Chapter[];
  courses: Course[];
  fiches: Fiche[];
}

/**
 * Promotes an already-authored standalone Fiche into a full (Chapter + Course + Fiche) triplet
 * with clean sequential ordering.
 */
export function promoteFichesToChapters(
  fiches: Fiche[],
  startOrderBySubject: Record<string, number>
): ExpandedBundle {
  const counters: Record<string, number> = { ...startOrderBySubject };
  const chapters: Chapter[] = [];
  const courses: Course[] = [];
  const linkedFiches: Fiche[] = [];

  for (const f of fiches) {
    const nextOrder = (counters[f.subjectId] ?? 1) + 1;
    counters[f.subjectId] = nextOrder;

    const chId = `ch-exp-${f.subjectId}-${nextOrder}-${f.id.replace(/^fiche-exp-/, '')}`;
    const courseId = `course-exp-${f.subjectId}-${nextOrder}-${f.id.replace(/^fiche-exp-/, '')}`;
    const diff: Difficulty = nextOrder <= 7 ? 'facile' : nextOrder <= 15 ? 'moyen' : 'difficile';

    chapters.push({
      id: chId,
      subjectId: f.subjectId,
      title: f.title,
      order: nextOrder,
      summary: f.subtitle,
      estimatedMinutes: diff === 'facile' ? 20 : diff === 'moyen' ? 30 : 40,
      difficulty: diff,
      courseId,
      ficheId: f.id,
    });

    const f1 = f.formules[0];
    const ex1 = f.exemples[0];
    courses.push({
      id: courseId,
      subjectId: f.subjectId,
      chapterId: chId,
      title: f.title,
      durationMinutes: diff === 'facile' ? 20 : diff === 'moyen' ? 30 : 40,
      sizeKb: 22,
      updatedAt: '2026-11-22',
      sections: [
        {
          id: `${courseId}-s1`,
          heading: '1. Notions clés et définitions fondamentales',
          content: `${f.subtitle}. Points essentiels à maîtriser : ${f.notionsEssentielles.join(' ; ')}. ${f.definitions.map((d) => `${d.terme} : ${d.definition}`).join(' ')}`,
          keyTakeaway: f.resumeExpress,
        },
        {
          id: `${courseId}-s2`,
          heading: '2. Règles, formules et démarche de résolution',
          content: `${f.methodes.join(' ')} Repères importants : ${f.datesReperes.map((r) => `${r.repere} (${r.detail})`).join(' ; ')}.`,
          keyTakeaway: f1 ? `${f1.label} : ${f1.formule}` : f.notionsEssentielles[0],
          formula: f1 ? `${f1.formule}${f1.unite ? ` (${f1.unite})` : ''}` : undefined,
        },
        {
          id: `${courseId}-s3`,
          heading: '3. Application concrète et pièges d’examen',
          content: `${ex1 ? `${ex1.titre} — ${ex1.contenu} ` : ''}Erreurs fréquentes à éviter : ${f.erreursFrequentes.join(' ')}`,
          keyTakeaway: f.erreursFrequentes[0] ?? 'Vérifier chaque étape et les unités avant de conclure.',
        },
      ],
    });

    linkedFiches.push({
      ...f,
      chapterId: chId,
    });
  }

  return { chapters, courses, fiches: linkedFiches };
}

/**
 * Expands curated discipline-specific curriculum tuples into full Chapter + Course + 6-format Fiche sets.
 */
export function buildSubjectCurriculum(
  subjectId: string,
  subjectLabel: string,
  startOrder: number,
  units: CurriculumTuple[]
): ExpandedBundle {
  const chapters: Chapter[] = [];
  const courses: Course[] = [];
  const fiches: Fiche[] = [];

  units.forEach((unit, idx) => {
    const [slug, title, notionA, notionB, ruleOrFormula, pitfall, example, difficulty] = unit;
    const order = startOrder + idx;
    const chId = `ch-cur-${subjectId}-${slug}`;
    const courseId = `course-cur-${subjectId}-${slug}`;
    const ficheId = `fiche-cur-${subjectId}-${slug}`;
    const minutes = difficulty === 'facile' ? 20 : difficulty === 'moyen' ? 30 : 40;

    chapters.push({
      id: chId,
      subjectId,
      title,
      order,
      summary: `${notionA} · ${notionB}`,
      estimatedMinutes: minutes,
      difficulty,
      courseId,
      ficheId,
    });

    courses.push({
      id: courseId,
      subjectId,
      chapterId: chId,
      title,
      durationMinutes: minutes,
      sizeKb: 20,
      updatedAt: '2026-11-22',
      sections: [
        {
          id: `${courseId}-s1`,
          heading: `1. Comprendre ${title}`,
          content: `En ${subjectLabel}, ce chapitre approfondit ${notionA.toLowerCase()} ainsi que ${notionB.toLowerCase()}. La maîtrise de ces concepts conditionne la réussite des épreuves écrites, QCM et études de cas.`,
          keyTakeaway: `${notionA} et ${notionB} forment le socle opérationnel du chapitre.`,
        },
        {
          id: `${courseId}-s2`,
          heading: '2. Règle maîtresse et méthode d’examen',
          content: `Principe de référence à mobiliser systématiquement : ${ruleOrFormula}. Commencez par identifier les données et hypothèses du sujet, appliquez le cadre méthodologique étape par étape, puis vérifiez la cohérence de la conclusion.`,
          keyTakeaway: ruleOrFormula,
          formula: ruleOrFormula,
        },
        {
          id: `${courseId}-s3`,
          heading: '3. Mise en pratique et vigilance jury',
          content: `Application type : ${example}. Point de vigilance majeur en examen : ${pitfall}.`,
          keyTakeaway: `Piège à éviter : ${pitfall}`,
        },
      ],
    });

    fiches.push({
      id: ficheId,
      subjectId,
      chapterId: chId,
      title,
      subtitle: `${subjectLabel} — Chapitre ${order} (${difficulty})`,
      sizeKb: 15,
      notionsEssentielles: [
        notionA,
        notionB,
        `Principe clé : ${ruleOrFormula}`,
        `Vigilance examen : ${pitfall}`,
      ],
      definitions: [
        {
          terme: title,
          definition: `Domaine essentiel de ${subjectLabel} portant sur ${notionA.toLowerCase()} et ${notionB.toLowerCase()}.`,
        },
        {
          terme: 'Règle de référence',
          definition: ruleOrFormula,
        },
      ],
      formules: [
        { label: `Principe / Formule clé — ${title}`, formule: ruleOrFormula },
      ],
      datesReperes: [
        { repere: `Chapitre ${order}`, detail: `${subjectLabel} — Niveau ${difficulty} (${minutes} min)` },
        { repere: 'Point méthodologique', detail: notionA },
      ],
      methodes: [
        `Analyser l’énoncé pour repérer immédiatement les indices liés à ${notionA.toLowerCase()}.`,
        `Appliquer rigoureusement le repère : ${ruleOrFormula}.`,
        `Relire sa réponse en vérifiant qu’on évite le piège : ${pitfall.toLowerCase()}.`,
      ],
      erreursFrequentes: [
        pitfall,
        'Omettre de justifier les hypothèses ou confondre deux notions voisines sous pression du chronomètre.',
      ],
      exemples: [
        {
          titre: `Cas d’application — ${title}`,
          contenu: example,
        },
      ],
      resumeExpress: `${title} : retenir ${notionA}, ${notionB} et la règle clé (${ruleOrFormula}).`,
      tableauComparatif: {
        headers: ['Axe d’analyse', 'Bon réflexe examen', 'Piège fréquent'],
        rows: [
          {
            critere: 'Concept central',
            elementA: notionA,
            elementB: 'Définition floue ou hors sujet',
          },
          {
            critere: 'Application',
            elementA: ruleOrFormula,
            elementB: pitfall,
          },
        ],
      },
      autoEvaluation: [
        {
          question: `Quelle est la règle ou formule essentielle à retenir sur « ${title} » ?`,
          reponse: ruleOrFormula,
        },
        {
          question: `Quel piège classique faut-il éviter en examen sur « ${title} » ?`,
          reponse: pitfall,
        },
      ],
    });
  });

  return { chapters, courses, fiches };
}

export function mergeBundles(bundles: ExpandedBundle[]): ExpandedBundle {
  return {
    chapters: bundles.flatMap((b) => b.chapters),
    courses: bundles.flatMap((b) => b.courses),
    fiches: bundles.flatMap((b) => b.fiches),
  };
}
