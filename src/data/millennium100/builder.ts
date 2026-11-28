import { CourseSection } from '../../types';
import {
  buildCenturionPack,
  CenturionBundle,
  CenturionTopicTuple,
  mergeCenturionBundles,
} from '../centurion100/engine';

export type MillenniumModuleTuple = [
  slug: string,
  moduleTitle: string,
  coreConcept: string,
  keyRule: string,
  examTrap: string,
  practicalCase: string
];

export interface MillenniumSubjectSpec {
  subjectId: string;
  subjectName: string;
  primaryExamId: string;
  examIds: string[];
  zone: string;
  diagramId?: CourseSection['diagramId'];
  /** Exactly 20 distinct domain modules × 5 progressive chapters = 100 chapters */
  modules: MillenniumModuleTuple[];
}

const STAGE_META = [
  {
    suffix: 'fondements',
    titleSuffix: 'Fondements & Concepts clés',
    buildNotion: (m: MillenniumModuleTuple) => m[2],
    buildRule: (m: MillenniumModuleTuple) => `Cadre de base : ${m[2]} — règle directrice : ${m[3]}`,
    buildTrap: (m: MillenniumModuleTuple) => m[4],
  },
  {
    suffix: 'regles-normes',
    titleSuffix: 'Règles, Formules & Normes de référence',
    buildNotion: (m: MillenniumModuleTuple) => `${m[3]} (${m[2]})`,
    buildRule: (m: MillenniumModuleTuple) => m[3],
    buildTrap: (m: MillenniumModuleTuple) => `Mal appliquer la règle sur « ${m[1]} » : ${m[4]}`,
  },
  {
    suffix: 'methode-pratique',
    titleSuffix: 'Méthodologie & Mise en pratique',
    buildNotion: (m: MillenniumModuleTuple) => `Démarche opérationnelle : ${m[5]}`,
    buildRule: (m: MillenniumModuleTuple) => `En pratique (${m[5]}), vérifier systématiquement : ${m[3]}`,
    buildTrap: (m: MillenniumModuleTuple) => `Sauter la vérification d’hypothèses dans « ${m[5]} » (${m[4]})`,
  },
  {
    suffix: 'etude-cas-pieges',
    titleSuffix: 'Étude de cas corrigée & Pièges d’examen',
    buildNotion: (m: MillenniumModuleTuple) => `Cas appliqué : ${m[5]}`,
    buildRule: (m: MillenniumModuleTuple) => `Résolution rigoureuse de « ${m[5]} » en appliquant : ${m[3]}`,
    buildTrap: (m: MillenniumModuleTuple) => m[4],
  },
  {
    suffix: 'synthese-concours',
    titleSuffix: 'Synthèse avancée & Maîtrise Concours',
    buildNotion: (m: MillenniumModuleTuple) => `Intégration complète : ${m[2]} → ${m[5]}`,
    buildRule: (m: MillenniumModuleTuple) => `À l’épreuve officielle sur « ${m[1]} », relier ${m[2]}, prouver par « ${m[3]} » et illustrer via ${m[5]}`,
    buildTrap: (m: MillenniumModuleTuple) => `Se limiter à une définition théorique sans maîtriser le piège : ${m[4]}`,
  },
] as const;

export function buildMillenniumPack(specs: MillenniumSubjectSpec[]): CenturionBundle {
  return mergeCenturionBundles(
    specs.map((spec) => {
      const topics: CenturionTopicTuple[] = [];
      spec.modules.forEach((mod, modIdx) => {
        const [slug, moduleTitle] = mod;
        STAGE_META.forEach((stage, stageIdx) => {
          const orderNum = modIdx * 5 + stageIdx + 1;
          topics.push([
            `m${String(orderNum).padStart(3, '0')}-${slug}-${stage.suffix}`,
            `${moduleTitle} — ${stage.titleSuffix}`,
            stage.buildNotion(mod),
            stage.buildRule(mod),
            stage.buildTrap(mod),
          ]);
        });
      });

      return buildCenturionPack({
        subjectId: spec.subjectId,
        subjectName: spec.subjectName,
        primaryExamId: spec.primaryExamId,
        examIds: spec.examIds,
        zone: spec.zone,
        startOrder: 1,
        annalesCount: 5,
        diagramId: spec.diagramId,
        topics,
      });
    })
  );
}
