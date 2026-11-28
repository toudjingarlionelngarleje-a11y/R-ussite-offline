import { Chapter, ClassLevelId, Subject } from '../../types';
import {
  buildCenturionPack,
  CenturionBundle,
  CenturionTopicTuple,
  mergeCenturionBundles,
} from '../centurion100/engine';
import { getSubjectClassLevels } from '../hyperExpansion72/classLevels';
import { ALL_X23_MODULES } from './modules';
import { ExtensionModuleTuple } from './types';

/**
 * Dix étapes de la quatrième vague (v23.0). Les intitulés diffèrent des vagues
 * v19.0, v20.0 et v21.0 pour éviter toute redite de chapitre dans une matière.
 */
const STAGES = [
  {
    suffix: 'rappels',
    titleSuffix: 'Rappels express & prérequis',
    notion: (m: ExtensionModuleTuple) => `Prérequis indispensables avant « ${m[1]} »`,
    rule: (m: ExtensionModuleTuple) => `Réactiver les bases : ${m[2]}`,
    trap: (m: ExtensionModuleTuple) => `Se lancer sans vérifier les prérequis : ${m[4]}`,
  },
  {
    suffix: 'carte-mentale',
    titleSuffix: 'Carte mentale du thème',
    notion: (m: ExtensionModuleTuple) => `Organiser « ${m[1]} » en carte mentale`,
    rule: (m: ExtensionModuleTuple) => `Relier ${m[2]} à ${m[3]}`,
    trap: (m: ExtensionModuleTuple) => `Apprendre des définitions isolées sans liens logiques`,
  },
  {
    suffix: 'vocabulaire',
    titleSuffix: 'Vocabulaire, notations & unités',
    notion: (m: ExtensionModuleTuple) => `Lexique et notations de ${m[2]}`,
    rule: (m: ExtensionModuleTuple) => `Employer les unités et notations exactes : ${m[3]}`,
    trap: (m: ExtensionModuleTuple) => `Confondre les notations ou omettre les unités`,
  },
  {
    suffix: 'regle-or',
    titleSuffix: 'Règle d’or & formule de référence',
    notion: (m: ExtensionModuleTuple) => `La règle d’or de ${m[1]}`,
    rule: (m: ExtensionModuleTuple) => m[3],
    trap: (m: ExtensionModuleTuple) => m[4],
  },
  {
    suffix: 'exemple-commente',
    titleSuffix: 'Exemple commenté pas à pas',
    notion: (m: ExtensionModuleTuple) => `Exemple guidé : ${m[5]}`,
    rule: (m: ExtensionModuleTuple) => `Appliquer ${m[3]} en commentant chaque étape`,
    trap: (m: ExtensionModuleTuple) => `Présenter le résultat sans expliquer le raisonnement`,
  },
  {
    suffix: 'erreurs-parades',
    titleSuffix: 'Erreurs fréquentes & parades',
    notion: (m: ExtensionModuleTuple) => `Erreurs classiques sur « ${m[1]} »`,
    rule: (m: ExtensionModuleTuple) => `Neutraliser l’erreur : ${m[4]}`,
    trap: (m: ExtensionModuleTuple) => m[4],
  },
  {
    suffix: 'exercices-progressifs',
    titleSuffix: 'Exercices progressifs corrigés',
    notion: (m: ExtensionModuleTuple) => `Progression d’exercices : ${m[5]}`,
    rule: (m: ExtensionModuleTuple) => `Passer du guidé à l’autonome autour de ${m[2]}`,
    trap: (m: ExtensionModuleTuple) => `Sauter les niveaux et se décourager sur un exercice trop dur`,
  },
  {
    suffix: 'terrain',
    titleSuffix: 'Cas de terrain & données réelles',
    notion: (m: ExtensionModuleTuple) => `Sur le terrain : ${m[5]}`,
    rule: (m: ExtensionModuleTuple) => `Confronter ${m[3]} à un contexte documenté`,
    trap: (m: ExtensionModuleTuple) => `Réutiliser une recette toute faite sans vérifier le contexte`,
  },
  {
    suffix: 'synthese',
    titleSuffix: 'Synthèse en une page',
    notion: (m: ExtensionModuleTuple) => `Fiche synthèse : ${m[2]}`,
    rule: (m: ExtensionModuleTuple) => `Condenser ${m[2]}, ${m[3]} et ${m[5]} en une page`,
    trap: (m: ExtensionModuleTuple) => `Recopier le cours au lieu de hiérarchiser l’essentiel`,
  },
  {
    suffix: 'defi-final',
    titleSuffix: 'Défi final & auto-évaluation',
    notion: (m: ExtensionModuleTuple) => `Défi final sur « ${m[1]} »`,
    rule: (m: ExtensionModuleTuple) => `Résoudre un cas inédit en mobilisant ${m[3]}`,
    trap: (m: ExtensionModuleTuple) => `S’auto-évaluer sans chronomètre ni barème`,
  },
] as const;

export interface ExtensionBundle extends CenturionBundle {
  subjectsCovered: number;
}

/**
 * Construit la quatrième vague (v23.0) en numérotant chaque matière à la suite
 * de tout ce qui existe déjà (programme d’origine + vagues v19.0 à v21.0).
 */
export function buildExtensionV23(existing: Chapter[], subjects: Subject[]): ExtensionBundle {
  const maxOrder: Record<string, number> = {};
  for (const ch of existing) {
    maxOrder[ch.subjectId] = Math.max(maxOrder[ch.subjectId] ?? 0, ch.order);
  }

  const bundles: CenturionBundle[] = [];
  const covered = new Set<string>();

  for (const subject of subjects) {
    const modules = ALL_X23_MODULES[subject.id];
    if (!modules || modules.length === 0) {
      throw new Error(`[v23.0] Aucun module d’extension pour la matière « ${subject.id} ».`);
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
        zone: 'Programme officiel — quatrième vague v23.0',
        startOrder,
        annalesCount: 3,
        totalChapters: startOrder - 1 + topics.length,
        idPrefix: 'x23',
        topics,
      })
    );
    covered.add(subject.id);
  }

  const merged = mergeCenturionBundles(bundles);
  return { ...merged, subjectsCovered: covered.size };
}
