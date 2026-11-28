import { Chapter, ClassLevelId, Subject } from '../../types';
import {
  buildCenturionPack,
  CenturionBundle,
  CenturionTopicTuple,
  mergeCenturionBundles,
} from '../centurion100/engine';
import { getSubjectClassLevels } from '../hyperExpansion72/classLevels';
import { getSubjectDiagramGallery } from '../../lib/subjectDiagrams';
import { X32_BOOST_MODULES } from './boostModules';
import { ExtensionModuleTuple, ExtensionSubjectModules } from '../extensionV23/types';

interface Stage {
  suffix: string;
  titleSuffix: string;
  notion: (m: ExtensionModuleTuple) => string;
  rule: (m: ExtensionModuleTuple) => string;
  trap: (m: ExtensionModuleTuple) => string;
}

/** Dix étapes « raisonnement et transfert » inédites (aucun suffixe réemployé de v19 à v31). */
const BOOST_STAGES_V32: Stage[] = [
  { suffix: 'declic-initial', titleSuffix: 'Le déclic initial', notion: (m) => `Situation déclenchante : ${m[5]}`, rule: (m) => `Formuler la question que pose ${m[1]}`, trap: (m) => `Se lancer sans avoir formulé la question` },
  { suffix: 'carte-reperes', titleSuffix: 'Carte des repères', notion: (m) => `Repères essentiels de ${m[1]}`, rule: (m) => `Organiser ${m[2]} en trois familles`, trap: (m) => `Aligner des repères sans hiérarchie` },
  { suffix: 'raisonnement-guide', titleSuffix: 'Raisonnement guidé', notion: (m) => `Raisonnement pas à pas sur ${m[1]}`, rule: (m) => `Justifier chaque étape par ${m[3]}`, trap: (m) => `Sauter des étapes sans justification` },
  { suffix: 'exercice-modele', titleSuffix: 'Exercice modèle', notion: (m) => `Exercice modèle : ${m[5]}`, rule: (m) => `Résoudre en explicitant la démarche`, trap: (m) => `Donner le résultat sans démarche` },
  { suffix: 'atelier-autonome', titleSuffix: 'Atelier autonome', notion: (m) => `Atelier autonome sur ${m[1]}`, rule: (m) => `Réaliser la tâche seul puis comparer au corrigé`, trap: (m) => `Consulter le corrigé avant d’essayer` },
  { suffix: 'pieges-du-sujet', titleSuffix: 'Les pièges du sujet', notion: (m) => `Pièges fréquents sur ${m[1]}`, rule: (m) => `Repérer le piège avant de répondre`, trap: (m) => m[4] },
  { suffix: 'test-progressif', titleSuffix: 'Test progressif', notion: (m) => `Test progressif : ${m[2]}`, rule: (m) => `Passer du facile au difficile sans perdre la règle`, trap: (m) => `Traiter les questions dans le désordre` },
  { suffix: 'situation-reelle', titleSuffix: 'Situation réelle', notion: (m) => `Situation réelle : ${m[5]}`, rule: (m) => `Décider en explicitant le critère retenu`, trap: (m) => `Décider sans critère explicite` },
  { suffix: 'passerelle-metiers', titleSuffix: 'Passerelle vers les métiers', notion: (m) => `Débouchés liés à ${m[1]}`, rule: (m) => `Relier la notion à deux métiers concrets`, trap: (m) => `Citer des métiers sans lien avec la notion` },
  { suffix: 'recapitulatif-actif', titleSuffix: 'Récapitulatif actif', notion: (m) => `Récapitulatif de ${m[2]}`, rule: (m) => `Restituer de mémoire puis vérifier`, trap: (m) => `Relire passivement sans restitution` },
];

export interface V32Bundle extends CenturionBundle {
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
): V32Bundle {
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

/** v32.0 — 20 chapitres « raisonnement et transfert » de plus dans chacune des 150 matières. */
export function buildBoostV32(existing: Chapter[], subjects: Subject[]): V32Bundle {
  return buildWave(existing, subjects, X32_BOOST_MODULES, BOOST_STAGES_V32, {
    idPrefix: 'x32',
    zone: 'Programme officiel — raisonnement et transfert illustrés v32.0',
    annalesCount: 3,
    label: 'raisonnement et transfert v32.0',
  });
}
