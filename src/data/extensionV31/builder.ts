import { Chapter, ClassLevelId, Subject } from '../../types';
import {
  buildCenturionPack,
  CenturionBundle,
  CenturionTopicTuple,
  mergeCenturionBundles,
} from '../centurion100/engine';
import { getSubjectClassLevels } from '../hyperExpansion72/classLevels';
import { getSubjectDiagramGallery } from '../../lib/subjectDiagrams';
import { NEW_SUBJECT_MODULES_V31 } from '../newSubjectsV31/modules';
import { ExtensionModuleTuple, ExtensionSubjectModules } from '../extensionV23/types';

interface Stage {
  suffix: string;
  titleSuffix: string;
  notion: (m: ExtensionModuleTuple) => string;
  rule: (m: ExtensionModuleTuple) => string;
  trap: (m: ExtensionModuleTuple) => string;
}

/** Dix étapes de professionnalisation inédites (suffixes non réemployés de v19 à v30). */
const NEW_SUBJECT_STAGES_V31: Stage[] = [
  { suffix: 'metier-decouverte', titleSuffix: 'Découverte du métier', notion: (m) => `Le métier autour de ${m[1]}`, rule: (m) => `Situer l’activité et ses acteurs : ${m[2]}`, trap: (m) => `Confondre le métier avec un seul de ses gestes` },
  { suffix: 'terminologie', titleSuffix: 'Terminologie professionnelle', notion: (m) => `Vocabulaire technique de ${m[1]}`, rule: (m) => `Employer le terme exact du métier`, trap: (m) => `Inventer un terme approximatif` },
  { suffix: 'materiel-securite', titleSuffix: 'Matériel et sécurité', notion: (m) => `Matériel et protection pour ${m[1]}`, rule: (m) => `Préparer le poste et les protections avant d’agir`, trap: (m) => `Intervenir sans vérifier le matériel` },
  { suffix: 'geste-technique', titleSuffix: 'Geste technique guidé', notion: (m) => `Geste professionnel de ${m[1]}`, rule: (m) => `Exécuter selon les règles du métier`, trap: (m) => `Aller vite au détriment du geste` },
  { suffix: 'protocole-metier', titleSuffix: 'Protocole du métier', notion: (m) => `Protocole appliqué à ${m[5]}`, rule: (m) => `Suivre les étapes du protocole sans en sauter`, trap: (m) => `Modifier l’ordre des étapes` },
  { suffix: 'cas-client', titleSuffix: 'Cas client commenté', notion: (m) => `Situation client : ${m[5]}`, rule: (m) => `Analyser la demande puis proposer une solution`, trap: (m) => `Répondre sans avoir écouté la demande` },
  { suffix: 'controle-qualite', titleSuffix: 'Contrôle qualité', notion: (m) => `Points de contrôle en ${m[1]}`, rule: (m) => `Contrôler selon des critères explicites`, trap: (m) => `Livrer sans contrôle` },
  { suffix: 'economie-activite', titleSuffix: 'Économie de l’activité', notion: (m) => `Coûts et recettes de ${m[1]}`, rule: (m) => `Calculer coût, prix et marge de l’activité`, trap: (m) => `Fixer un prix sans calculer le coût` },
  { suffix: 'reglementation', titleSuffix: 'Cadre réglementaire', notion: (m) => `Obligations réglementaires de ${m[1]}`, rule: (m) => `Identifier la règle applicable et sa conséquence`, trap: (m) => `Ignorer une obligation d’exercice` },
  { suffix: 'progression-metier', titleSuffix: 'Progression dans le métier', notion: (m) => `Évolution professionnelle en ${m[1]}`, rule: (m) => `Fixer trois compétences à certifier`, trap: (m) => `Progresser sans objectif vérifiable` },
];

export interface V31Bundle extends CenturionBundle {
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
): V31Bundle {
  const maxOrder = maxOrders(existing);
  const bundles: CenturionBundle[] = [];
  const covered = new Set<string>();
  let illustrated = 0;

  for (const subject of subjects) {
    const modules = modulesBySubject[subject.id];
    if (!modules || modules.length === 0) {
      throw new Error(`[v31.0] Aucun module « ${options.label} » pour la matière « ${subject.id} ».`);
    }

    const levels = getSubjectClassLevels(subject.id);
    const usableLevels = levels.length > 0 ? levels : (['terminale'] as ClassLevelId[]);
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
      primaryExamId: subject.examIds[0] ?? 'certif-pro',
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

/** v31.0 — Programme des neuf nouvelles matières (80 chapitres chacune). */
export function buildNewSubjectsV31(existing: Chapter[], subjects: Subject[]): V31Bundle {
  return buildWave(existing, subjects, NEW_SUBJECT_MODULES_V31, NEW_SUBJECT_STAGES_V31, {
    idPrefix: 'x31n',
    zone: 'Nouveau programme v31.0 — matière professionnelle créée et illustrée',
    annalesCount: 3,
    label: 'nouvelle matière v31.0',
  });
}
