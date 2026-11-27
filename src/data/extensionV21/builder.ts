import { Chapter, ClassLevelId, Subject } from '../../types';
import {
  buildCenturionPack,
  CenturionBundle,
  CenturionTopicTuple,
  mergeCenturionBundles,
} from '../centurion100/engine';
import { getSubjectClassLevels } from '../hyperExpansion72/classLevels';
import { ALL_X21_MODULES } from './modules';
import { ExtensionModuleTuple } from './types';

/**
 * Dix étapes de la troisième vague (v21.0). Les intitulés diffèrent de la vague
 * v19.0 pour éviter toute redite de chapitre au sein d’une même matière.
 */
const STAGES = [
  {
    suffix: 'situation',
    titleSuffix: 'Mise en situation & enjeu',
    notion: (m: ExtensionModuleTuple) => `Pourquoi « ${m[1]} » compte à l’examen et sur le terrain`,
    rule: (m: ExtensionModuleTuple) => `Identifier l’enjeu concret avant d’aborder ${m[2]}`,
    trap: (m: ExtensionModuleTuple) => `Traiter le sujet sans comprendre ce qui est réellement demandé : ${m[4]}`,
  },
  {
    suffix: 'concepts',
    titleSuffix: 'Concepts clés & définitions maîtrisées',
    notion: (m: ExtensionModuleTuple) => m[2],
    rule: (m: ExtensionModuleTuple) => `Définir chaque terme puis relier au cadre : ${m[3]}`,
    trap: (m: ExtensionModuleTuple) => m[4],
  },
  {
    suffix: 'demonstration',
    titleSuffix: 'Démonstration & justification rigoureuse',
    notion: (m: ExtensionModuleTuple) => `Démontrer proprement : ${m[3]}`,
    rule: (m: ExtensionModuleTuple) => m[3],
    trap: (m: ExtensionModuleTuple) => `Affirmer le résultat sans justifier les étapes intermédiaires`,
  },
  {
    suffix: 'application',
    titleSuffix: 'Application immédiate guidée',
    notion: (m: ExtensionModuleTuple) => `Application directe : ${m[5]}`,
    rule: (m: ExtensionModuleTuple) => `Appliquer ${m[3]} pas à pas sur ${m[5]}`,
    trap: (m: ExtensionModuleTuple) => m[4],
  },
  {
    suffix: 'atelier-corrige',
    titleSuffix: 'Atelier corrigé pas à pas',
    notion: (m: ExtensionModuleTuple) => `Atelier guidé : résoudre ${m[5]}`,
    rule: (m: ExtensionModuleTuple) => `Décomposer en sous-questions avant de conclure`,
    trap: (m: ExtensionModuleTuple) => `Sauter la vérification des hypothèses : ${m[4]}`,
  },
  {
    suffix: 'contexte-pro',
    titleSuffix: 'Contexte professionnel, normes & usages',
    notion: (m: ExtensionModuleTuple) => `Normes et usages professionnels autour de ${m[5]}`,
    rule: (m: ExtensionModuleTuple) => `Respecter le cadre normatif applicable à ${m[5]}`,
    trap: (m: ExtensionModuleTuple) => `Ignorer une norme ou une obligation réglementaire du contexte`,
  },
  {
    suffix: 'autoevaluation',
    titleSuffix: 'Auto-évaluation guidée & remédiation',
    notion: (m: ExtensionModuleTuple) => `Auto-évaluation sur « ${m[1]} »`,
    rule: (m: ExtensionModuleTuple) => `Cocher les acquis puis reprendre les points faibles avec ${m[3]}`,
    trap: (m: ExtensionModuleTuple) => m[4],
  },
  {
    suffix: 'consolidation',
    titleSuffix: 'Consolidation & exercices variés',
    notion: (m: ExtensionModuleTuple) => `Exercices variés : ${m[2]}`,
    rule: (m: ExtensionModuleTuple) => `Varier les contextes d’application de ${m[3]}`,
    trap: (m: ExtensionModuleTuple) => `Ne s’entraîner que sur un seul type d’énoncé`,
  },
  {
    suffix: 'epreuve',
    titleSuffix: 'Épreuve type, barème & gestion du temps',
    notion: (m: ExtensionModuleTuple) => `Épreuve type : ${m[5]}`,
    rule: (m: ExtensionModuleTuple) => `Répartir le temps selon le barème et sécuriser les points de méthode`,
    trap: (m: ExtensionModuleTuple) => `Négliger la présentation et les unités, points faciles du barème`,
  },
  {
    suffix: 'bilan',
    titleSuffix: 'Bilan, projection & transfert',
    notion: (m: ExtensionModuleTuple) => `Bilan des acquis : ${m[2]} → ${m[5]}`,
    rule: (m: ExtensionModuleTuple) => `Relier ${m[2]}, ${m[3]} et ${m[5]} puis projeter sur un cas nouveau`,
    trap: (m: ExtensionModuleTuple) => `S’arrêter au bilan sans transférer à un contexte inédit`,
  },
] as const;

export interface ExtensionBundle extends CenturionBundle {
  subjectsCovered: number;
}

/**
 * Construit la troisième vague (v21.0) en numérotant chaque matière à la suite
 * de tout ce qui existe déjà (programme d’origine + vague v19.0).
 */
export function buildExtensionV21(existing: Chapter[], subjects: Subject[]): ExtensionBundle {
  const maxOrder: Record<string, number> = {};
  for (const ch of existing) {
    maxOrder[ch.subjectId] = Math.max(maxOrder[ch.subjectId] ?? 0, ch.order);
  }

  const bundles: CenturionBundle[] = [];
  const covered = new Set<string>();

  for (const subject of subjects) {
    const modules = ALL_X21_MODULES[subject.id];
    if (!modules || modules.length === 0) {
      throw new Error(`[v21.0] Aucun module d’extension pour la matière « ${subject.id} ».`);
    }

    const levels = getSubjectClassLevels(subject.id);
    const topLevels = levels.slice(Math.max(0, levels.length - 4));
    const startOrder = (maxOrder[subject.id] ?? 0) + 1;

    const topics: CenturionTopicTuple[] = [];
    let index = 0;
    const total = modules.length * STAGES.length;

    modules.forEach((mod) => {
      const [slug, moduleTitle] = mod;
      STAGES.forEach((stage) => {
        const cls: ClassLevelId =
          topLevels[Math.min(topLevels.length - 1, Math.floor((index / total) * topLevels.length))];
        const difficulty = index % 3 === 0 ? 'moyen' : index % 3 === 1 ? 'difficile' : 'moyen';
        topics.push([
          `${slug}-${stage.suffix}`,
          `${moduleTitle} — ${stage.titleSuffix}`,
          stage.notion(mod),
          stage.rule(mod),
          stage.trap(mod),
          cls,
          difficulty as CenturionTopicTuple[6],
        ]);
        index += 1;
      });
    });

    bundles.push(
      buildCenturionPack({
        subjectId: subject.id,
        subjectName: subject.name,
        primaryExamId: subject.examIds[0] ?? 'bac-scientifique',
        examIds: subject.examIds,
        zone: 'Programme officiel — troisième vague v21.0',
        startOrder,
        annalesCount: 3,
        totalChapters: startOrder - 1 + topics.length,
        idPrefix: 'x21',
        topics,
      })
    );
    covered.add(subject.id);
  }

  const merged = mergeCenturionBundles(bundles);
  return { ...merged, subjectsCovered: covered.size };
}
