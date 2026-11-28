import { Chapter, ClassLevelId, Subject } from '../../types';
import {
  buildCenturionPack,
  CenturionBundle,
  CenturionTopicTuple,
  mergeCenturionBundles,
} from '../centurion100/engine';
import { getSubjectClassLevels } from '../hyperExpansion72/classLevels';
import { getSubjectDiagramGallery } from '../../lib/subjectDiagrams';
import { X29_BOOST_MODULES } from './boostModules';
import { ExtensionModuleTuple, ExtensionSubjectModules } from '../extensionV23/types';

interface Stage {
  suffix: string;
  titleSuffix: string;
  notion: (m: ExtensionModuleTuple) => string;
  rule: (m: ExtensionModuleTuple) => string;
  trap: (m: ExtensionModuleTuple) => string;
}

/** Dix étapes inédites de la vague v29.0 (aucun suffixe ne réemploie les vagues v19 à v27). */
const BOOST_STAGES_V29: Stage[] = [
  { suffix: 'fiche-methode', titleSuffix: 'Fiche méthode', notion: (m) => `Méthode de travail sur ${m[1]}`, rule: (m) => `Appliquer la méthode : ${m[3]}`, trap: (m) => `Apprendre la méthode sans l’avoir appliquée` },
  { suffix: 'carte-mentale', titleSuffix: 'Carte mentale', notion: (m) => `Carte mentale de ${m[2]}`, rule: (m) => `Relier trois idées autour de ${m[1]}`, trap: (m) => `Recopier un plan linéaire en carte mentale` },
  { suffix: 'exercice-corrige', titleSuffix: 'Exercice corrigé', notion: (m) => `Exercice corrigé : ${m[5]}`, rule: (m) => `Rédiger la solution en justifiant ${m[3]}`, trap: (m) => `Lire la correction avant d’avoir cherché` },
  { suffix: 'question-cours', titleSuffix: 'Question de cours', notion: (m) => `Question de cours sur ${m[1]}`, rule: (m) => `Répondre en une phrase complète et justifiée`, trap: (m) => `Répondre par un mot isolé` },
  { suffix: 'contresens', titleSuffix: 'Contresens à éviter', notion: (m) => `Confusion fréquente sur ${m[1]}`, rule: (m) => `Distinguer le vrai du faux : ${m[3]}`, trap: (m) => m[4] },
  { suffix: 'mots-cles', titleSuffix: 'Mots-clés à maîtriser', notion: (m) => `Vocabulaire exigible de ${m[2]}`, rule: (m) => `Employer chaque terme dans une phrase exacte`, trap: (m) => `Réciter une définition sans l’illustrer` },
  { suffix: 'lien-programme', titleSuffix: 'Lien avec le programme', notion: (m) => `Place de ${m[1]} dans la progression`, rule: (m) => `Situer la notion avant et après dans le programme`, trap: (m) => `Isoler la notion de la progression` },
  { suffix: 'sujet-type', titleSuffix: 'Sujet type', notion: (m) => `Sujet d’examen type sur ${m[1]}`, rule: (m) => `Traiter les questions dans l’ordre et sans oubli`, trap: (m) => `Répondre à une question sur deux` },
  { suffix: 'prise-de-parole', titleSuffix: 'Prise de parole', notion: (m) => `Exposé oral sur ${m[1]}`, rule: (m) => `Annoncer, démontrer, conclure en trois minutes`, trap: (m) => `Lire ses notes sans regarder l’auditoire` },
  { suffix: 'auto-correction', titleSuffix: 'Auto-correction', notion: (m) => `Grille d’auto-correction sur ${m[1]}`, rule: (m) => `Vérifier le résultat avec un second raisonnement`, trap: (m) => `Relire son travail avec le même regard` },
];

export interface V29Bundle extends CenturionBundle {
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

/** Illustration stable : un schéma de la galerie par module, posé sur la 1re section et la flashcard. */
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
): V29Bundle {
  const maxOrder = maxOrders(existing);
  const bundles: CenturionBundle[] = [];
  const covered = new Set<string>();
  let illustrated = 0;

  for (const subject of subjects) {
    const modules = modulesBySubject[subject.id];
    if (!modules || modules.length === 0) {
      throw new Error(`[v29.0] Aucun module « ${options.label} » pour la matière « ${subject.id} ».`);
    }

    const levels = getSubjectClassLevels(subject.id);
    const usableLevels = levels.slice(Math.max(0, levels.length - 4));
    const startOrder = (maxOrder[subject.id] ?? 0) + 1;
    // Équilibrage : on complète d'abord les niveaux qui comptent le moins de chapitres.
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

/** v29.0 — 20 chapitres inédits (2 modules × 10 étapes) dans chacune des 141 matières. */
export function buildBoostV29(existing: Chapter[], subjects: Subject[]): V29Bundle {
  return buildWave(existing, subjects, X29_BOOST_MODULES, BOOST_STAGES_V29, {
    idPrefix: 'x29',
    zone: 'Programme officiel — approfondissement illustré v29.0',
    annalesCount: 3,
    label: 'approfondissement v29.0',
  });
}
