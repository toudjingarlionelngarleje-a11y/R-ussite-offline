import { Chapter, ClassLevelId, Subject } from '../../types';
import {
  buildCenturionPack,
  CenturionBundle,
  CenturionTopicTuple,
  mergeCenturionBundles,
} from '../centurion100/engine';
import { getSubjectClassLevels } from '../hyperExpansion72/classLevels';
import { NEW_SUBJECT_MODULES } from '../newSubjects/modules';
import { X24_BOOST_MODULES } from './boostModules';
import { ExtensionModuleTuple, ExtensionSubjectModules } from '../extensionV23/types';

interface Stage {
  suffix: string;
  titleSuffix: string;
  notion: (m: ExtensionModuleTuple) => string;
  rule: (m: ExtensionModuleTuple) => string;
  trap: (m: ExtensionModuleTuple) => string;
}

/** Étapes inédites réservées aux 10 nouvelles matières. */
const NEW_SUBJECT_STAGES: Stage[] = [
  { suffix: 'diagnostic', titleSuffix: 'Diagnostic de départ', notion: (m) => `Ce que je sais déjà sur ${m[2]}`, rule: (m) => `Évaluer ses acquis avant d’aborder ${m[1]}`, trap: (m) => `Se surestimer et sauter les bases de ${m[2]}` },
  { suffix: 'objectifs', titleSuffix: 'Objectifs & contrat d’apprentissage', notion: (m) => `Objectifs mesurables de « ${m[1]} »`, rule: (m) => `Formuler un objectif vérifiable autour de ${m[3]}`, trap: (m) => `Travailler sans critère de réussite explicite` },
  { suffix: 'methode', titleSuffix: 'Méthode guidée', notion: (m) => `Démarche pas à pas pour ${m[1]}`, rule: (m) => `Suivre la méthode : ${m[3]}`, trap: (m) => `Improviser une méthode sans la vérifier` },
  { suffix: 'exemple', titleSuffix: 'Exemple résolu commenté', notion: (m) => `Cas résolu : ${m[5]}`, rule: (m) => `Expliciter chaque étape à partir de ${m[3]}`, trap: (m) => `Recopier la solution sans comprendre le raisonnement` },
  { suffix: 'atelier', titleSuffix: 'Atelier pratique', notion: (m) => `Mise en pratique de ${m[2]}`, rule: (m) => `Produire un livrable concret sur ${m[1]}`, trap: (m) => `Rester dans l’abstrait sans production tangible` },
  { suffix: 'erreurs', titleSuffix: 'Erreurs fréquentes & remédiation', notion: (m) => `Obstacles récurrents sur ${m[1]}`, rule: (m) => `Corriger l’erreur type : ${m[4]}`, trap: (m) => m[4] },
  { suffix: 'evaluation', titleSuffix: 'Évaluation formative', notion: (m) => `Auto-évaluation de ${m[2]}`, rule: (m) => `Mesurer sa maîtrise de ${m[3]} avec un barème`, trap: (m) => `S’évaluer sans grille ni correction` },
  { suffix: 'projet', titleSuffix: 'Projet de terrain encadré', notion: (m) => `Projet autour de ${m[5]}`, rule: (m) => `Conduire le projet en respectant ${m[3]}`, trap: (m) => `Lancer un projet sans échéancier` },
  { suffix: 'oral', titleSuffix: 'Présentation orale & argumentation', notion: (m) => `Argumenter sur ${m[1]}`, rule: (m) => `Structurer une intervention de trois minutes`, trap: (m) => `Lire ses notes sans regarder l’auditoire` },
  { suffix: 'portfolio', titleSuffix: 'Portfolio & auto-positionnement', notion: (m) => `Trace de progrès sur ${m[1]}`, rule: (m) => `Archiver les preuves de maîtrise de ${m[2]}`, trap: (m) => `Ne conserver aucune trace de son travail` },
];

/** Étapes inédites de la vague de consolidation v24.0 (toutes matières). */
const BOOST_STAGES: Stage[] = [
  { suffix: 'lecon-essentielle', titleSuffix: 'Leçon essentielle', notion: (m) => `L’essentiel de ${m[1]}`, rule: (m) => `Retenir la règle : ${m[3]}`, trap: (m) => `Mémoriser des détails sans la règle centrale` },
  { suffix: 'demonstration', titleSuffix: 'Démonstration guidée', notion: (m) => `Démonstration appliquée à ${m[5]}`, rule: (m) => `Dérouler ${m[3]} sur un cas complet`, trap: (m) => `Sauter une étape de la démonstration` },
  { suffix: 'entrainement', titleSuffix: 'Entraînement guidé', notion: (m) => `Exercices guidés sur ${m[2]}`, rule: (m) => `Appliquer ${m[3]} avec corrections immédiates`, trap: (m) => `Faire les exercices sans vérifier ses réponses` },
  { suffix: 'exercices-autonomes', titleSuffix: 'Exercices autonomes', notion: (m) => `Série autonome : ${m[1]}`, rule: (m) => `Résoudre sans aide en mobilisant ${m[2]}`, trap: (m) => `Consulter la solution dès la première difficulté` },
  { suffix: 'remediation', titleSuffix: 'Remédiation ciblée', notion: (m) => `Remédier aux difficultés sur ${m[1]}`, rule: (m) => `Reprendre l’erreur : ${m[4]}`, trap: (m) => `Répéter le même exercice sans corriger la cause` },
  { suffix: 'etude-de-cas', titleSuffix: 'Étude de cas complète', notion: (m) => `Étude de cas : ${m[5]}`, rule: (m) => `Analyser le cas au regard de ${m[3]}`, trap: (m) => `Répondre par des généralités sans données` },
  { suffix: 'defi-chrono', titleSuffix: 'Défi chronométré', notion: (m) => `Défi minuté sur ${m[1]}`, rule: (m) => `Traiter le sujet en temps limité avec ${m[3]}`, trap: (m) => `Sacrifier la précision pour finir plus vite` },
  { suffix: 'memo', titleSuffix: 'Fiche mémo durable', notion: (m) => `Mémo personnel sur ${m[2]}`, rule: (m) => `Condenser ${m[3]} et ${m[5]} en un mémo relu`, trap: (m) => `Produire un mémo illisible et jamais relu` },
  { suffix: 'transfert', titleSuffix: 'Transfert à une situation nouvelle', notion: (m) => `Transférer ${m[1]} hors du contexte d’origine`, rule: (m) => `Adapter ${m[3]} à un contexte inédit`, trap: (m) => `Appliquer la recette sans vérifier les hypothèses` },
  { suffix: 'bilan', titleSuffix: 'Bilan de consolidation', notion: (m) => `Bilan de maîtrise de ${m[1]}`, rule: (m) => `Comparer les acquis au diagnostic initial`, trap: (m) => `Conclure sans preuve de progression` },
];

export interface V24Bundle extends CenturionBundle {
  subjectsCovered: number;
}

function maxOrders(existing: Chapter[]): Record<string, number> {
  const maxOrder: Record<string, number> = {};
  for (const ch of existing) {
    maxOrder[ch.subjectId] = Math.max(maxOrder[ch.subjectId] ?? 0, ch.order);
  }
  return maxOrder;
}

function buildWave(
  existing: Chapter[],
  subjects: Subject[],
  modulesBySubject: ExtensionSubjectModules,
  stages: Stage[],
  options: { idPrefix: string; zone: string; levelWindow?: 'all' | 'top4'; annalesCount: number; label: string }
): V24Bundle {
  const maxOrder = maxOrders(existing);
  const bundles: CenturionBundle[] = [];
  const covered = new Set<string>();

  for (const subject of subjects) {
    const modules = modulesBySubject[subject.id];
    if (!modules || modules.length === 0) {
      throw new Error(`[v24.0] Aucun module « ${options.label} » pour la matière « ${subject.id} ».`);
    }

    const levels = getSubjectClassLevels(subject.id);
    const usableLevels = options.levelWindow === 'all' ? levels : levels.slice(Math.max(0, levels.length - 4));
    const startOrder = (maxOrder[subject.id] ?? 0) + 1;
    const topics: CenturionTopicTuple[] = [];
    const total = modules.length * stages.length;
    let index = 0;

    modules.forEach((mod) => {
      const [slug, moduleTitle] = mod;
      stages.forEach((stage) => {
        const cls: ClassLevelId = usableLevels[Math.min(usableLevels.length - 1, Math.floor((index / total) * usableLevels.length))];
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
        zone: options.zone,
        startOrder,
        annalesCount: options.annalesCount,
        totalChapters: startOrder - 1 + topics.length,
        idPrefix: options.idPrefix,
        topics,
      })
    );
    covered.add(subject.id);
  }

  const merged = mergeCenturionBundles(bundles);
  return { ...merged, subjectsCovered: covered.size };
}

/** v24.0 — Programme complet des 10 nouvelles matières (80 chapitres chacune). */
export function buildNewSubjectsV24(existing: Chapter[], subjects: Subject[]): V24Bundle {
  return buildWave(existing, subjects, NEW_SUBJECT_MODULES, NEW_SUBJECT_STAGES, {
    idPrefix: 'x24n',
    zone: 'Nouveau programme v24.0 — matière créée',
    levelWindow: 'all',
    annalesCount: 3,
    label: 'nouvelle matière',
  });
}

/** v24.0 — Consolidation : 10 chapitres supplémentaires pour toutes les matières. */
export function buildBoostV24(existing: Chapter[], subjects: Subject[]): V24Bundle {
  return buildWave(existing, subjects, X24_BOOST_MODULES, BOOST_STAGES, {
    idPrefix: 'x24',
    zone: 'Programme officiel — consolidation v24.0',
    levelWindow: 'top4',
    annalesCount: 3,
    label: 'consolidation',
  });
}
