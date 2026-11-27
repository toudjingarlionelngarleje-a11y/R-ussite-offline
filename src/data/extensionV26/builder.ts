import { Chapter, ClassLevelId, Subject } from '../../types';
import {
  buildCenturionPack,
  CenturionBundle,
  CenturionTopicTuple,
  mergeCenturionBundles,
} from '../centurion100/engine';
import { getSubjectClassLevels } from '../hyperExpansion72/classLevels';
import { getSubjectDiagramGallery } from '../../lib/subjectDiagrams';
import { NEW_SUBJECT_MODULES_V26 } from '../newSubjectsV26/modules';
import { X26_BOOST_MODULES } from './boostModules';
import { ExtensionModuleTuple, ExtensionSubjectModules } from '../extensionV23/types';

interface Stage {
  suffix: string;
  titleSuffix: string;
  notion: (m: ExtensionModuleTuple) => string;
  rule: (m: ExtensionModuleTuple) => string;
  trap: (m: ExtensionModuleTuple) => string;
}

/** Étapes illustrées des huit nouvelles matières v26.0. */
const NEW_SUBJECT_STAGES_V26: Stage[] = [
  { suffix: 'declencheur', titleSuffix: 'Déclencheur & situation problème', notion: (m) => `Situation problème autour de ${m[1]}`, rule: (m) => `Formuler la question à résoudre : ${m[2]}`, trap: (m) => `Partir de la théorie sans problème concret` },
  { suffix: 'boite-notions', titleSuffix: 'Boîte à notions', notion: (m) => `Notions et vocabulaire de ${m[1]}`, rule: (m) => `Définir exactement : ${m[2]}`, trap: (m) => `Employer les mots sans les définir` },
  { suffix: 'protocole', titleSuffix: 'Protocole de travail', notion: (m) => `Protocole guidé sur ${m[1]}`, rule: (m) => `Suivre la règle : ${m[3]}`, trap: (m) => `Improviser une méthode` },
  { suffix: 'demo-raisonnee', titleSuffix: 'Démonstration raisonnée', notion: (m) => `Cas démontré : ${m[5]}`, rule: (m) => `Justifier chaque étape par ${m[3]}`, trap: (m) => `Donner le résultat sans justification` },
  { suffix: 'atelier-pratique', titleSuffix: 'Atelier pratique', notion: (m) => `Atelier : ${m[1]}`, rule: (m) => `Produire un livrable mobilisant ${m[2]}`, trap: (m) => `Rester dans l’abstrait` },
  { suffix: 'vigilance', titleSuffix: 'Points de vigilance', notion: (m) => `Pièges sur ${m[1]}`, rule: (m) => `Éviter l’erreur : ${m[4]}`, trap: (m) => m[4] },
  { suffix: 'test-eclair', titleSuffix: 'Test éclair corrigé', notion: (m) => `Auto-contrôle de ${m[2]}`, rule: (m) => `Valider par un test court`, trap: (m) => `Répondre au hasard` },
  { suffix: 'dossier-reel', titleSuffix: 'Dossier de terrain', notion: (m) => `Dossier réel : ${m[5]}`, rule: (m) => `Analyser le dossier selon ${m[3]}`, trap: (m) => `Rester dans les généralités` },
  { suffix: 'soutenance', titleSuffix: 'Soutenance orale', notion: (m) => `Défendre ${m[1]} à l’oral`, rule: (m) => `Structurer : problème, analyse, réponse`, trap: (m) => `Réciter sans argumenter` },
  { suffix: 'capitalisation', titleSuffix: 'Capitalisation personnelle', notion: (m) => `Capitaliser sur ${m[1]}`, rule: (m) => `Relier ${m[2]} à une situation vécue`, trap: (m) => `Terminer sans trace écrite` },
];

/** Étapes de la vague d’approfondissement v26.0 (toutes les matières). */
const BOOST_STAGES_V26: Stage[] = [
  { suffix: 'essentiel', titleSuffix: 'L’essentiel en 5 minutes', notion: (m) => `Essentiel de ${m[2]}`, rule: (m) => `Mémoriser : ${m[3]}`, trap: (m) => `Retenir l’anecdote au lieu de la règle` },
  { suffix: 'carte-schema', titleSuffix: 'Carte-schéma de synthèse', notion: (m) => `Carte mentale de ${m[1]}`, rule: (m) => `Traduire ${m[2]} en schéma hiérarchisé`, trap: (m) => `Empiler des idées sans lien` },
  { suffix: 'reflexe', titleSuffix: 'Le bon réflexe', notion: (m) => `Réflexe professionnel sur ${m[1]}`, rule: (m) => `Automatiser ${m[3]}`, trap: (m) => `Chercher une solution compliquée` },
  { suffix: 'batterie', titleSuffix: 'Batterie d’entraînement', notion: (m) => `Entraînement intensif : ${m[5]}`, rule: (m) => `Enchaîner les exercices autour de ${m[2]}`, trap: (m) => `S’arrêter au premier succès` },
  { suffix: 'erreur-frequente', titleSuffix: 'Erreur fréquente et parade', notion: (m) => `Erreur fréquente sur ${m[1]}`, rule: (m) => `Ne pas ${m[4].charAt(0).toLowerCase() + m[4].slice(1)}`, trap: (m) => m[4] },
  { suffix: 'mission-complete', titleSuffix: 'Mission complète', notion: (m) => `Mission de bout en bout : ${m[5]}`, rule: (m) => `Mener la mission avec ${m[3]}`, trap: (m) => `Livrer une partie seulement` },
  { suffix: 'contre-la-montre', titleSuffix: 'Contre-la-montre', notion: (m) => `Performance chronométrée sur ${m[1]}`, rule: (m) => `Respecter temps et exigences`, trap: (m) => `Sacrifier la précision à la vitesse` },
  { suffix: 'fiche-active', titleSuffix: 'Fiche active', notion: (m) => `Fiche de révision : ${m[2]}`, rule: (m) => `Reformuler ${m[3]} en une page`, trap: (m) => `Recopier le cours intégralement` },
  { suffix: 'transfert-contexte', titleSuffix: 'Transfert à un autre contexte', notion: (m) => `Transfert de ${m[1]}`, rule: (m) => `Adapter la démarche à un contexte voisin`, trap: (m) => `Recopier la recette sans vérifier` },
  { suffix: 'autocontrole', titleSuffix: 'Auto-contrôle final', notion: (m) => `Contrôle final de ${m[1]}`, rule: (m) => `Vérifier chaque étape et le résultat`, trap: (m) => `Rendre sans relecture` },
];

export interface V26Bundle extends CenturionBundle {
  subjectsCovered: number;
  illustratedChapters: number;
}

function maxOrders(existing: Chapter[]): Record<string, number> {
  const maxOrder: Record<string, number> = {};
  for (const ch of existing) {
    maxOrder[ch.subjectId] = Math.max(maxOrder[ch.subjectId] ?? 0, ch.order);
  }
  return maxOrder;
}

/**
 * Applique un schéma SVG différent à chaque module : la première section du cours
 * et la flashcard du chapitre reçoivent l'illustration correspondante.
 */
function illustrateBundle(bundle: CenturionBundle, subject: Subject, startOrder: number, stagesPerModule: number): number {
  const gallery = getSubjectDiagramGallery(subject);
  if (gallery.length === 0) return 0;
  const orderByChapter = new Map(bundle.chapters.map((ch) => [ch.id, ch.order]));
  const moduleIndex = (chapterId: string) => {
    const order = orderByChapter.get(chapterId) ?? startOrder;
    return Math.max(0, Math.floor((order - startOrder) / stagesPerModule));
  };
  let illustrated = 0;
  bundle.courses = bundle.courses.map((crs) => {
    const diagramId = gallery[moduleIndex(crs.chapterId) % gallery.length];
    illustrated += 1;
    return {
      ...crs,
      sections: crs.sections.map((sec, idx) => (idx === 0 ? { ...sec, diagramId } : { ...sec, diagramId: undefined })),
    };
  });
  bundle.flashcards = bundle.flashcards.map((fc) => ({
    ...fc,
    diagramId: gallery[moduleIndex(fc.chapterId) % gallery.length],
  }));
  return illustrated;
}

function buildWave(
  existing: Chapter[],
  subjects: Subject[],
  modulesBySubject: ExtensionSubjectModules,
  stages: Stage[],
  options: { idPrefix: string; zone: string; levelWindow?: 'all' | 'top4'; annalesCount: number; label: string }
): V26Bundle {
  const maxOrder = maxOrders(existing);
  const bundles: CenturionBundle[] = [];
  const covered = new Set<string>();
  let illustrated = 0;

  for (const subject of subjects) {
    const modules = modulesBySubject[subject.id];
    if (!modules || modules.length === 0) {
      throw new Error(`[v26.0] Aucun module « ${options.label} » pour la matière « ${subject.id} ».`);
    }

    const levels = getSubjectClassLevels(subject.id);
    const usableLevels = options.levelWindow === 'all' ? levels : levels.slice(Math.max(0, levels.length - 4));
    const startOrder = (maxOrder[subject.id] ?? 0) + 1;
    // Équilibrage : on complète d'abord les niveaux qui comptent le moins de chapitres,
    // afin qu'aucun niveau ne se retrouve surchargé par rapport aux autres.
    const levelLoad: Record<string, number> = {};
    usableLevels.forEach((lvl) => {
      levelLoad[lvl] = existing.filter((ch) => ch.subjectId === subject.id && ch.classLevel === lvl).length;
    });
    const pickLevel = (): ClassLevelId => {
      let best = usableLevels[0];
      for (const lvl of usableLevels) {
        if (levelLoad[lvl] < levelLoad[best]) best = lvl;
      }
      levelLoad[best] += 1;
      return best;
    };
    const topics: CenturionTopicTuple[] = [];
    const total = modules.length * stages.length;
    let index = 0;

    modules.forEach((mod) => {
      const [slug, moduleTitle] = mod;
      stages.forEach((stage) => {
        const cls: ClassLevelId = pickLevel();
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

    const pack = buildCenturionPack({
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
    });
    illustrated += illustrateBundle(pack, subject, startOrder, stages.length);
    bundles.push(pack);
    covered.add(subject.id);
  }

  const merged = mergeCenturionBundles(bundles);
  return { ...merged, subjectsCovered: covered.size, illustratedChapters: illustrated };
}

/** v26.0 — Programme illustré des huit nouvelles matières (80 chapitres chacune). */
export function buildNewSubjectsV26(existing: Chapter[], subjects: Subject[]): V26Bundle {
  return buildWave(existing, subjects, NEW_SUBJECT_MODULES_V26, NEW_SUBJECT_STAGES_V26, {
    idPrefix: 'x26n',
    zone: 'Nouveau programme v26.0 — matière créée et illustrée',
    levelWindow: 'all',
    annalesCount: 3,
    label: 'nouvelle matière',
  });
}

/** v26.0 — Approfondissement illustré : 10 chapitres de plus dans les 133 matières. */
export function buildBoostV26(existing: Chapter[], subjects: Subject[]): V26Bundle {
  return buildWave(existing, subjects, X26_BOOST_MODULES, BOOST_STAGES_V26, {
    idPrefix: 'x26',
    zone: 'Programme officiel — approfondissement illustré v26.0',
    levelWindow: 'top4',
    annalesCount: 3,
    label: 'approfondissement',
  });
}
