import { Fiche } from '../../types';

export interface RichFicheInput {
  slug: string;
  subjectId: string;
  chapterId: string;
  title: string;
  subtitle: string;
  /** 4 key concepts */
  notions: [string, string, string, string];
  /** 2 key definitions [terme, definition] */
  defs: [[string, string], [string, string]];
  /** 2 formulas or key rules [label, formule, unite?] */
  formulas: [[string, string, string?], [string, string, string?]];
  /** 2 key landmarks/standards [repere, detail] */
  reperes: [[string, string], [string, string]];
  /** 3 exam methods */
  methods: [string, string, string];
  /** 2 frequent exam pitfalls */
  errors: [string, string];
  /** 1 worked example [titre, contenu] */
  example: [string, string];
  /** Express summary */
  express: string;
  /** Comparison table */
  compare: [
    [string, string, string],
    [string, string, string],
    [string, string, string],
  ];
  /** 2 self-check Q&A */
  quiz: [[string, string], [string, string]];
}

export function buildExpandedFiche(spec: RichFicheInput): Fiche {
  const [headers, row1, row2] = spec.compare;
  return {
    id: `fiche-exp-${spec.subjectId}-${spec.slug}`,
    subjectId: spec.subjectId,
    chapterId: spec.chapterId,
    title: spec.title,
    subtitle: spec.subtitle,
    sizeKb: 16,
    notionsEssentielles: [...spec.notions],
    definitions: spec.defs.map(([terme, definition]) => ({ terme, definition })),
    formules: spec.formulas.map(([label, formule, unite]) =>
      unite ? { label, formule, unite } : { label, formule }
    ),
    datesReperes: spec.reperes.map(([repere, detail]) => ({ repere, detail })),
    methodes: [...spec.methods],
    erreursFrequentes: [...spec.errors],
    exemples: [{ titre: spec.example[0], contenu: spec.example[1] }],
    resumeExpress: spec.express,
    tableauComparatif: {
      headers,
      rows: [
        { critere: row1[0], elementA: row1[1], elementB: row1[2] },
        { critere: row2[0], elementA: row2[1], elementB: row2[2] },
      ],
    },
    autoEvaluation: spec.quiz.map(([question, reponse]) => ({ question, reponse })),
  };
}

/**
 * Compact tuple descriptor for authoring large curated subject fiche packs cleanly.
 */
export type CuratedFicheTuple = [
  slug: string,
  title: string,
  subtitle: string,
  notions: [string, string, string, string],
  def1: [string, string],
  def2: [string, string],
  form1: [string, string, string?],
  form2: [string, string, string?],
  repere: [string, string],
  method1: string,
  method2: string,
  pitfall: string,
  example: string,
  compare: [[string, string, string], [string, string, string], [string, string, string]],
  qa1: [string, string],
  qa2: [string, string],
];

export function buildSubjectFiches(
  subjectId: string,
  chapterIds: string[],
  tuples: CuratedFicheTuple[]
): Fiche[] {
  return tuples.map((t, idx) => {
    const [
      slug,
      title,
      subtitle,
      notions,
      def1,
      def2,
      form1,
      form2,
      repere,
      method1,
      method2,
      pitfall,
      example,
      compare,
      qa1,
      qa2,
    ] = t;
    const chapterId = chapterIds[idx % chapterIds.length];
    return buildExpandedFiche({
      slug,
      subjectId,
      chapterId,
      title,
      subtitle,
      notions,
      defs: [def1, def2],
      formulas: [form1, form2],
      reperes: [
        repere,
        ['Objectif examen', `Maîtriser ${title.toLowerCase()} en QCM et résolution rédigée.`],
      ],
      methods: [
        method1,
        method2,
        'Vérifier les unités, hypothèses d’application et cohérence de la réponse finale.',
      ],
      errors: [
        pitfall,
        'Confondre les conditions d’application ou sauter la justification attendue par le jury.',
      ],
      example: [`Application type — ${title}`, example],
      express: `${title} : ${notions[0]} ; ${notions[1]} ; règle clé ${form1[1]}.`,
      compare,
      quiz: [qa1, qa2],
    });
  });
}
