import { Chapter, ClassLevelId, Subject } from '../../types';
import {
  buildCenturionPack,
  CenturionBundle,
  CenturionTopicTuple,
  mergeCenturionBundles,
} from '../centurion100/engine';
import { getSubjectClassLevels } from '../hyperExpansion72/classLevels';
import { ALL_X20_MODULES } from './modules';
import { ExtensionModuleTuple } from './types';

/**
 * Dix étapes de la deuxième vague (v20.0). Les intitulés diffèrent de la vague
 * v19.0 pour éviter toute redite de chapitre au sein d’une même matière.
 */
const STAGES = [
  {
    suffix: 'prerequis',
    titleSuffix: 'Prérequis croisés & préparation mentale',
    notion: (m: ExtensionModuleTuple) => `Prérequis indispensables pour « ${m[1]} »`,
    rule: (m: ExtensionModuleTuple) => `Avant d’entrer dans ${m[2]}, vérifier la maîtrise des notions amont`,
    trap: (m: ExtensionModuleTuple) => `Sauter les prérequis et découvrir l’erreur au milieu de l’épreuve : ${m[4]}`,
  },
  {
    suffix: 'modelisation',
    titleSuffix: 'Modélisation & schématisation',
    notion: (m: ExtensionModuleTuple) => `Modéliser le problème : ${m[2]}`,
    rule: (m: ExtensionModuleTuple) => `Traduire l’énoncé en modèle opératoire via ${m[3]}`,
    trap: (m: ExtensionModuleTuple) => m[4],
  },
  {
    suffix: 'outils',
    titleSuffix: 'Boîte à outils & sources de référence',
    notion: (m: ExtensionModuleTuple) => `Outils et références mobilisables : ${m[3]}`,
    rule: (m: ExtensionModuleTuple) => m[3],
    trap: (m: ExtensionModuleTuple) => `Utiliser un outil sans en connaître les hypothèses de validité`,
  },
  {
    suffix: 'atelier',
    titleSuffix: 'Atelier pratique guidé',
    notion: (m: ExtensionModuleTuple) => `Atelier : construire la solution de ${m[5]}`,
    rule: (m: ExtensionModuleTuple) => `Atelier en trois passes : modéliser, calculer avec ${m[3]}, vérifier`,
    trap: (m: ExtensionModuleTuple) => m[4],
  },
  {
    suffix: 'protocole',
    titleSuffix: 'Protocole pas à pas & points de contrôle',
    notion: (m: ExtensionModuleTuple) => `Protocole reproductible pour ${m[5]}`,
    rule: (m: ExtensionModuleTuple) => `Contrôles intermédiaires obligatoires avant d’appliquer ${m[3]}`,
    trap: (m: ExtensionModuleTuple) => `Brûler les étapes du protocole : ${m[4]}`,
  },
  {
    suffix: 'cas-terrain',
    titleSuffix: 'Cas de terrain commenté',
    notion: (m: ExtensionModuleTuple) => `Retour de terrain : ${m[5]}`,
    rule: (m: ExtensionModuleTuple) => `Décider en contexte réel en s’appuyant sur ${m[2]}`,
    trap: (m: ExtensionModuleTuple) => `Appliquer une recette standard sans lire le contexte local : ${m[4]}`,
  },
  {
    suffix: 'remediation',
    titleSuffix: 'Diagnostic des erreurs & remédiation',
    notion: (m: ExtensionModuleTuple) => `Erreurs typiques et remédiation sur « ${m[1]} »`,
    rule: (m: ExtensionModuleTuple) => `Corriger durablement en repassant par ${m[3]}`,
    trap: (m: ExtensionModuleTuple) => m[4],
  },
  {
    suffix: 'memo-express',
    titleSuffix: 'Mémo express & auto-test éclair',
    notion: (m: ExtensionModuleTuple) => `Mémo express : ${m[2]}`,
    rule: (m: ExtensionModuleTuple) => `Auto-test en 5 questions : ${m[3]}`,
    trap: (m: ExtensionModuleTuple) => `Réciter sans se tester en conditions réelles : ${m[4]}`,
  },
  {
    suffix: 'concours-blanc',
    titleSuffix: 'Concours blanc chronométré',
    notion: (m: ExtensionModuleTuple) => `Épreuve blanche : ${m[5]}`,
    rule: (m: ExtensionModuleTuple) => `Gérer le temps en sécurisant les questions relevant de ${m[3]}`,
    trap: (m: ExtensionModuleTuple) => `Rester bloqué sur une question et perdre des points faciles`,
  },
  {
    suffix: 'ouverture',
    titleSuffix: 'Ouverture, actualité & prolongements',
    notion: (m: ExtensionModuleTuple) => `Prolongements et actualité de « ${m[1]} »`,
    rule: (m: ExtensionModuleTuple) => `Relier ${m[2]}, ${m[3]} et ${m[5]} à un enjeu contemporain`,
    trap: (m: ExtensionModuleTuple) => `Réciter un cours figé sans actualiser les exemples : ${m[4]}`,
  },
] as const;

export interface ExtensionBundle extends CenturionBundle {
  subjectsCovered: number;
}

/**
 * Construit la deuxième vague (v20.0) en numérotant chaque matière à la suite
 * de tout ce qui existe déjà (programme d’origine + vague v19.0).
 */
export function buildExtensionV20(existing: Chapter[], subjects: Subject[]): ExtensionBundle {
  const maxOrder: Record<string, number> = {};
  for (const ch of existing) {
    maxOrder[ch.subjectId] = Math.max(maxOrder[ch.subjectId] ?? 0, ch.order);
  }

  const bundles: CenturionBundle[] = [];
  const covered = new Set<string>();

  for (const subject of subjects) {
    const modules = ALL_X20_MODULES[subject.id];
    if (!modules || modules.length === 0) {
      throw new Error(`[v20.0] Aucun module d’extension pour la matière « ${subject.id} ».`);
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
        zone: 'Programme officiel — deuxième vague v20.0',
        startOrder,
        annalesCount: 3,
        totalChapters: startOrder - 1 + topics.length,
        idPrefix: 'x20',
        topics,
      })
    );
    covered.add(subject.id);
  }

  const merged = mergeCenturionBundles(bundles);
  return { ...merged, subjectsCovered: covered.size };
}
