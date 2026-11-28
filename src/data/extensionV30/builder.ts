import { Chapter, ClassLevelId, Subject } from '../../types';
import {
  buildCenturionPack,
  CenturionBundle,
  CenturionTopicTuple,
  mergeCenturionBundles,
} from '../centurion100/engine';
import { getSubjectClassLevels } from '../hyperExpansion72/classLevels';
import { getSubjectDiagramGallery } from '../../lib/subjectDiagrams';
import { X30_BOOST_MODULES } from './boostModules';
import { ExtensionModuleTuple, ExtensionSubjectModules } from '../extensionV23/types';

interface Stage {
  suffix: string;
  titleSuffix: string;
  notion: (m: ExtensionModuleTuple) => string;
  rule: (m: ExtensionModuleTuple) => string;
  trap: (m: ExtensionModuleTuple) => string;
}

/** Dix étapes « méthode et pratique » inédites (aucun suffixe réemployé de v19 à v29). */
const BOOST_STAGES_V30: Stage[] = [
  { suffix: 'exemple-vecu', titleSuffix: 'Exemple vécu', notion: (m) => `Cas concret observé autour de ${m[1]}`, rule: (m) => `Relier l’exemple à la règle : ${m[3]}`, trap: (m) => `Raconter l’exemple sans en tirer la règle` },
  { suffix: 'mini-projet', titleSuffix: 'Mini-projet', notion: (m) => `Mini-projet : ${m[5]}`, rule: (m) => `Produire un livrable en trois étapes datées`, trap: (m) => `Improviser sans plan de travail` },
  { suffix: 'etude-document', titleSuffix: 'Étude de document', notion: (m) => `Document d’appui sur ${m[1]}`, rule: (m) => `Confronter le document à ${m[2]}`, trap: (m) => `Recopier le document sans l’analyser` },
  { suffix: 'analyse-erreur', titleSuffix: 'Analyse d’erreur', notion: (m) => `Erreur typique sur ${m[1]}`, rule: (m) => `Corriger en expliquant le mécanisme de l’erreur`, trap: (m) => m[4] },
  { suffix: 'debat-argumente', titleSuffix: 'Débat argumenté', notion: (m) => `Débat argumenté sur ${m[1]}`, rule: (m) => `Défendre une position avec ${m[3]}`, trap: (m) => `Confondre opinion et argument` },
  { suffix: 'defi-chrono', titleSuffix: 'Défi chronométré', notion: (m) => `Défi chronométré : ${m[5]}`, rule: (m) => `Traiter en dix minutes sans perdre la rigueur`, trap: (m) => `Sacrifier la méthode au temps` },
  { suffix: 'fiche-revision', titleSuffix: 'Fiche de révision', notion: (m) => `Fiche de révision : ${m[2]}`, rule: (m) => `Condenser ${m[3]} en dix lignes claires`, trap: (m) => `Recopier le cours au lieu de le résumer` },
  { suffix: 'question-orale', titleSuffix: 'Question orale', notion: (m) => `Question d’oral sur ${m[1]}`, rule: (m) => `Répondre en quatre-vingt-dix secondes avec un exemple`, trap: (m) => `Réciter sans exemple` },
  { suffix: 'bilan-schema', titleSuffix: 'Schéma bilan', notion: (m) => `Schéma bilan de ${m[2]}`, rule: (m) => `Relier les notions de ${m[1]} en un schéma légendé`, trap: (m) => `Dessiner sans légende ni flèche` },
  { suffix: 'grille-reussite', titleSuffix: 'Grille de réussite', notion: (m) => `Grille de réussite sur ${m[1]}`, rule: (m) => `S’évaluer sur trois critères explicites`, trap: (m) => `S’évaluer sans critère` },
];

export interface V30Bundle extends CenturionBundle {
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
  options: { idPrefix: string; zone: string; annalesCount: number; label: string }
): V30Bundle {
  const maxOrder = maxOrders(existing);
  const bundles: CenturionBundle[] = [];
  const covered = new Set<string>();
  let illustrated = 0;

  for (const subject of subjects) {
    const modules = modulesBySubject[subject.id];
    if (!modules || modules.length === 0) {
      throw new Error(`[v30.0] Aucun module « ${options.label} » pour la matière « ${subject.id} ».`);
    }

    const levels = getSubjectClassLevels(subject.id);
    const usableLevels = levels.slice(Math.max(0, levels.length - 4));
    const startOrder = (maxOrder[subject.id] ?? 0) + 1;
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

/** v30.0 — 20 chapitres « méthode et pratique » de plus dans chacune des 141 matières. */
export function buildBoostV30(existing: Chapter[], subjects: Subject[]): V30Bundle {
  return buildWave(existing, subjects, X30_BOOST_MODULES, BOOST_STAGES_V30, {
    idPrefix: 'x30',
    zone: 'Programme officiel — méthode et pratique illustrées v30.0',
    annalesCount: 3,
    label: 'méthode et pratique v30.0',
  });
}
