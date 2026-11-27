import {
  buildCenturionPack,
  CenturionBundle,
  CenturionTopicTuple,
  mergeCenturionBundles,
} from '../centurion100/engine';
import { PremiereModule, PremiereSubjectSpec, PREMIERE_SUBJECT_SPECS } from './content';

/**
 * Cinq étapes pédagogiques déclinées pour chaque module de Première.
 * 4 modules × 5 étapes = 20 chapitres dédiés par matière et par filière.
 */
const STAGES = [
  {
    suffix: 'fondements',
    titleSuffix: 'Fondements & notions clés',
    notion: (m: PremiereModule) => m[2],
    rule: (m: PremiereModule) => `Cadre de référence : ${m[2]} — règle directrice : ${m[3]}`,
    trap: (m: PremiereModule) => m[4],
    difficulty: 'moyen' as const,
  },
  {
    suffix: 'regles-methode',
    titleSuffix: 'Règles, formules & méthode de référence',
    notion: (m: PremiereModule) => `${m[3]} (${m[2]})`,
    rule: (m: PremiereModule) => m[3],
    trap: (m: PremiereModule) => m[4],
    difficulty: 'moyen' as const,
  },
  {
    suffix: 'exercice-guide',
    titleSuffix: 'Méthodologie & exercice guidé pas à pas',
    notion: (m: PremiereModule) => `Démarche opérationnelle : ${m[5]}`,
    rule: (m: PremiereModule) => `En pratique (${m[5]}), vérifier systématiquement : ${m[3]}`,
    trap: (m: PremiereModule) =>
      `Sauter la vérification des hypothèses et de l’énoncé dans « ${m[1]} » : ${m[4]}`,
    difficulty: 'moyen' as const,
  },
  {
    suffix: 'etude-de-cas',
    titleSuffix: 'Étude de cas corrigée & pièges d’examen',
    notion: (m: PremiereModule) => `Cas appliqué : ${m[5]}`,
    rule: (m: PremiereModule) => `Résolution rigoureuse de « ${m[5]} » en appliquant : ${m[3]}`,
    trap: (m: PremiereModule) => m[4],
    difficulty: 'difficile' as const,
  },
  {
    suffix: 'synthese-epreuve',
    titleSuffix: 'Synthèse, révision active & maîtrise de l’épreuve',
    notion: (m: PremiereModule) => `Intégration complète : ${m[2]} → ${m[5]}`,
    rule: (m: PremiereModule) =>
      `À l’épreuve officielle sur « ${m[1]} », relier ${m[2]}, démontrer par « ${m[3]} » et illustrer via ${m[5]}`,
    trap: (m: PremiereModule) =>
      `Se limiter à une définition théorique sans maîtriser le piège classique : ${m[4]}`,
    difficulty: 'difficile' as const,
  },
];

function buildPremierePack(spec: PremiereSubjectSpec): CenturionBundle {
  const classLevel = spec.stream === 'science' ? '1ere-s' : '1ere-l';
  const streamLabel = spec.stream === 'science' ? '1ère S' : '1ère L';
  const topics: CenturionTopicTuple[] = [];

  spec.modules.forEach((mod, modIdx) => {
    const [slug, moduleTitle] = mod;
    STAGES.forEach((stage, stageIdx) => {
      const chapterNumber = modIdx * STAGES.length + stageIdx + 1;
      topics.push([
        `prem-${spec.stream === 'science' ? 's' : 'l'}-${String(chapterNumber).padStart(2, '0')}-${slug}-${stage.suffix}`,
        `${moduleTitle} — ${stage.titleSuffix} (${streamLabel})`,
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
    idPrefix: spec.stream === 'science' ? 'prem-s' : 'prem-l',
    topics,
  });
}

/**
 * v17.7 — 200 nouveaux chapitres dédiés à la Première :
 * 100 pour la filière scientifique (1ère S, séries C & D)
 * 100 pour la filière littéraire (1ère L, séries A4 & A5).
 * Chaque chapitre possède son cours complet, sa fiche, son QCM corrigé,
 * ses flashcards et deux annales corrigées par matière.
 */
export const PREMIERE_STREAMS_PACK: CenturionBundle = mergeCenturionBundles(
  PREMIERE_SUBJECT_SPECS.map((spec) => buildPremierePack(spec))
);
