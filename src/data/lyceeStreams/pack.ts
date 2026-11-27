import {
  buildCenturionPack,
  CenturionBundle,
  CenturionTopicTuple,
  mergeCenturionBundles,
} from '../centurion100/engine';
import { LYCEE_SUBJECT_SPECS, LyceeModule, LyceeSubjectSpec } from './content';

/**
 * Cinq étapes pédagogiques déclinées pour chaque module de Seconde et de
 * Terminale. 4 modules × 5 étapes = 20 chapitres dédiés par matière et
 * par filière, soit 400 nouveaux chapitres au total.
 */
const STAGES = [
  {
    suffix: 'fondements',
    titleSuffix: 'Fondements & notions clés',
    notion: (m: LyceeModule) => m[2],
    rule: (m: LyceeModule) => `Cadre de référence : ${m[2]} — règle directrice : ${m[3]}`,
    trap: (m: LyceeModule) => m[4],
    difficulty: 'moyen' as const,
  },
  {
    suffix: 'regles-methode',
    titleSuffix: 'Règles, formules & méthode de référence',
    notion: (m: LyceeModule) => `${m[3]} (${m[2]})`,
    rule: (m: LyceeModule) => m[3],
    trap: (m: LyceeModule) => m[4],
    difficulty: 'moyen' as const,
  },
  {
    suffix: 'exercice-guide',
    titleSuffix: 'Méthodologie & exercice guidé pas à pas',
    notion: (m: LyceeModule) => `Démarche opérationnelle : ${m[5]}`,
    rule: (m: LyceeModule) => `En pratique (${m[5]}), vérifier systématiquement : ${m[3]}`,
    trap: (m: LyceeModule) =>
      `Sauter la vérification des hypothèses et de l’énoncé dans « ${m[1]} » : ${m[4]}`,
    difficulty: 'moyen' as const,
  },
  {
    suffix: 'etude-de-cas',
    titleSuffix: 'Étude de cas corrigée & pièges d’examen',
    notion: (m: LyceeModule) => `Cas appliqué : ${m[5]}`,
    rule: (m: LyceeModule) => `Résolution rigoureuse de « ${m[5]} » en appliquant : ${m[3]}`,
    trap: (m: LyceeModule) => m[4],
    difficulty: 'difficile' as const,
  },
  {
    suffix: 'synthese-epreuve',
    titleSuffix: 'Synthèse, révision active & maîtrise de l’épreuve',
    notion: (m: LyceeModule) => `Intégration complète : ${m[2]} → ${m[5]}`,
    rule: (m: LyceeModule) =>
      `À l’épreuve officielle sur « ${m[1]} », relier ${m[2]}, démontrer par « ${m[3]} » et illustrer via ${m[5]}`,
    trap: (m: LyceeModule) =>
      `Se limiter à une définition théorique sans maîtriser le piège classique : ${m[4]}`,
    difficulty: 'difficile' as const,
  },
];

function streamLevel(spec: LyceeSubjectSpec) {
  return `${spec.base}-${spec.stream === 'science' ? 's' : 'l'}` as
    | '2nde-s'
    | '2nde-l'
    | 'terminale-s'
    | 'terminale-l';
}

function streamLabel(spec: LyceeSubjectSpec) {
  const base = spec.base === '2nde' ? '2nde' : 'Tle';
  return `${base} ${spec.stream === 'science' ? 'S' : 'L'}`;
}

function slugPrefix(spec: LyceeSubjectSpec) {
  return `${spec.base === '2nde' ? '2nd' : 'tle'}-${spec.stream === 'science' ? 's' : 'l'}`;
}

function buildLyceePack(spec: LyceeSubjectSpec): CenturionBundle {
  const classLevel = streamLevel(spec);
  const label = streamLabel(spec);
  const prefix = slugPrefix(spec);
  const topics: CenturionTopicTuple[] = [];

  spec.modules.forEach((mod, modIdx) => {
    const [slug, moduleTitle] = mod;
    STAGES.forEach((stage, stageIdx) => {
      const chapterNumber = modIdx * STAGES.length + stageIdx + 1;
      topics.push([
        `${prefix}-${String(chapterNumber).padStart(2, '0')}-${slug}-${stage.suffix}`,
        `${moduleTitle} — ${stage.titleSuffix} (${label})`,
        stage.notion(mod),
        stage.rule(mod),
        stage.trap(mod),
        classLevel,
        stage.difficulty,
      ]);
    });
  });

  return buildCenturionPack({
    subjectId: spec.subjectId,
    subjectName: spec.subjectName,
    primaryExamId: spec.primaryExamId,
    examIds: spec.examIds,
    zone: spec.zone,
    startOrder: 101,
    annalesCount: 2,
    diagramId: spec.diagramId,
    totalChapters: 120,
    idPrefix: prefix,
    topics,
  });
}

/**
 * v17.8 — 400 nouveaux chapitres dédiés au lycée :
 * 100 pour la Seconde scientifique, 100 pour la Seconde littéraire,
 * 100 pour la Terminale scientifique, 100 pour la Terminale littéraire.
 */
export const LYCEE_STREAMS_PACK: CenturionBundle = mergeCenturionBundles(
  LYCEE_SUBJECT_SPECS.map((spec) => buildLyceePack(spec))
);
