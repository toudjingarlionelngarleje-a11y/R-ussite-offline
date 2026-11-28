import { Chapter, ClassLevelId, Subject } from '../../types';
import {
  buildCenturionPack,
  CenturionBundle,
  CenturionTopicTuple,
  mergeCenturionBundles,
} from '../centurion100/engine';
import { getSubjectClassLevels } from '../hyperExpansion72/classLevels';
import { ALL_X19_MODULES } from './modules';
import { ExtensionModuleTuple } from './types';

/**
 * Dix étapes d’approfondissement par module (1 module par matière en v19.0).
 * Les intitulés sont volontairement différents des packs v16 → v17.9 pour éviter
 * toute redite de chapitre au sein d’une même matière.
 */
const STAGES = [
  {
    suffix: 'diagnostic',
    titleSuffix: 'Diagnostic initial & attentes du jury',
    notion: (m: ExtensionModuleTuple) => `Prérequis et attentes du jury sur « ${m[1]} »`,
    rule: (m: ExtensionModuleTuple) => `Auto-évaluation ciblée : maîtriser ${m[2]} avant toute application`,
    trap: (m: ExtensionModuleTuple) => `Arriver en épreuve sans avoir consolidé les prérequis : ${m[4]}`,
  },
  {
    suffix: 'fondements',
    titleSuffix: 'Fondements approfondis & vocabulaire expert',
    notion: (m: ExtensionModuleTuple) => m[2],
    rule: (m: ExtensionModuleTuple) => m[3],
    trap: (m: ExtensionModuleTuple) => m[4],
  },
  {
    suffix: 'regles',
    titleSuffix: 'Cadre normatif, formulaires & ordres de grandeur',
    notion: (m: ExtensionModuleTuple) => `Formulaire et cadre de référence : ${m[3]}`,
    rule: (m: ExtensionModuleTuple) => m[3],
    trap: (m: ExtensionModuleTuple) => `Appliquer « ${m[3]} » hors de son domaine de validité`,
  },
  {
    suffix: 'methode',
    titleSuffix: 'Méthode experte pas à pas',
    notion: (m: ExtensionModuleTuple) => `Démarche guidée vers « ${m[5]} »`,
    rule: (m: ExtensionModuleTuple) =>
      `Méthode en quatre temps : cadrer le problème, mobiliser ${m[2]}, appliquer ${m[3]}, contrôler le résultat`,
    trap: (m: ExtensionModuleTuple) => m[4],
  },
  {
    suffix: 'exercice',
    titleSuffix: 'Exercice guidé corrigé & rédaction attendue',
    notion: (m: ExtensionModuleTuple) => `Exercice corrigé : ${m[5]}`,
    rule: (m: ExtensionModuleTuple) => `Résolution complète de « ${m[5]} » en appliquant ${m[3]}`,
    trap: (m: ExtensionModuleTuple) => m[4],
  },
  {
    suffix: 'etude-cas',
    titleSuffix: 'Étude de cas professionnelle',
    notion: (m: ExtensionModuleTuple) => `Étude de cas : ${m[5]}`,
    rule: (m: ExtensionModuleTuple) => `Transposer ${m[2]} au contexte réel de ${m[5]}`,
    trap: (m: ExtensionModuleTuple) => `Recopier un modèle théorique sans l’adapter au contexte : ${m[4]}`,
  },
  {
    suffix: 'pieges',
    titleSuffix: 'Copies fautives & pièges de barème',
    notion: (m: ExtensionModuleTuple) => `Analyse de copies fautives sur « ${m[1]} »`,
    rule: (m: ExtensionModuleTuple) => `Grille de contrôle avant remise : ${m[3]}`,
    trap: (m: ExtensionModuleTuple) => m[4],
  },
  {
    suffix: 'memo',
    titleSuffix: 'Fiche mémo & révision active',
    notion: (m: ExtensionModuleTuple) => `À retenir absolument : ${m[2]}`,
    rule: (m: ExtensionModuleTuple) => `Résumé opérationnel : ${m[3]}`,
    trap: (m: ExtensionModuleTuple) => `Réviser passivement sans se tester : ${m[4]}`,
  },
  {
    suffix: 'entrainement',
    titleSuffix: 'Entraînement chronométré type concours',
    notion: (m: ExtensionModuleTuple) => `Sujet chronométré : ${m[5]}`,
    rule: (m: ExtensionModuleTuple) => `Sous contrainte de temps, sécuriser d’abord ${m[3]}`,
    trap: (m: ExtensionModuleTuple) => `Sacrifier la rigueur pour finir plus vite : ${m[4]}`,
  },
  {
    suffix: 'synthese',
    titleSuffix: 'Synthèse transversale & transfert',
    notion: (m: ExtensionModuleTuple) => `Synthèse transversale : ${m[2]} → ${m[5]}`,
    rule: (m: ExtensionModuleTuple) =>
      `Relier explicitement ${m[2]}, ${m[3]} et ${m[5]} dans une conclusion argumentée`,
    trap: (m: ExtensionModuleTuple) => `Traiter le chapitre isolément sans lien avec le reste du programme : ${m[4]}`,
  },
] as const;

export interface ExtensionBundle extends CenturionBundle {
  /** Chapitres ajoutés par matière (diagnostic de couverture). */
  subjectsCovered: number;
}

/**
 * Construit l’extension v19.0 à partir des chapitres déjà présents (pour
 * numéroter chaque matière à la suite de son programme existant) et du
 * catalogue de matières (pour récupérer noms, examens et niveaux).
 */
export function buildExtensionV19(existing: Chapter[], subjects: Subject[]): ExtensionBundle {
  const maxOrder: Record<string, number> = {};
  for (const ch of existing) {
    maxOrder[ch.subjectId] = Math.max(maxOrder[ch.subjectId] ?? 0, ch.order);
  }

  const bundles: CenturionBundle[] = [];
  const covered = new Set<string>();

  for (const subject of subjects) {
    const modules = ALL_X19_MODULES[subject.id];
    if (!modules || modules.length === 0) {
      throw new Error(`[v19.0] Aucun module d’extension pour la matière « ${subject.id} ».`);
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
        zone: 'Programme officiel — approfondissement v19.0',
        startOrder,
        annalesCount: 3,
        totalChapters: startOrder - 1 + topics.length,
        idPrefix: 'x19',
        topics,
      })
    );
    covered.add(subject.id);
  }

  const merged = mergeCenturionBundles(bundles);
  return { ...merged, subjectsCovered: covered.size };
}
