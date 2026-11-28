import { Chapter, ClassLevelId, Subject } from '../../types';
import {
  buildCenturionPack,
  CenturionBundle,
  CenturionTopicTuple,
  mergeCenturionBundles,
} from '../centurion100/engine';
import { getSubjectClassLevels } from '../hyperExpansion72/classLevels';
import { getSubjectDiagramGallery } from '../../lib/subjectDiagrams';
import { NEW_SUBJECT_MODULES_V27 } from '../newSubjectsV27/modules';
import { X27_BOOST_MODULES } from './boostModules';
import { ExtensionModuleTuple, ExtensionSubjectModules } from '../extensionV23/types';

interface Stage {
  suffix: string;
  titleSuffix: string;
  notion: (m: ExtensionModuleTuple) => string;
  rule: (m: ExtensionModuleTuple) => string;
  trap: (m: ExtensionModuleTuple) => string;
}

/** Étapes illustrées des huit nouvelles matières v27.0. */
const NEW_SUBJECT_STAGES_V27: Stage[] = [
  { suffix: 'observation', titleSuffix: 'Observation guidée du réel', notion: (m) => `Observation de terrain autour de ${m[1]}`, rule: (m) => `Décrire ce que l’on observe avant d’interpréter : ${m[2]}`, trap: (m) => `Interpréter avant d’avoir observé` },
  { suffix: 'lexique-metier', titleSuffix: 'Lexique du métier', notion: (m) => `Vocabulaire professionnel de ${m[1]}`, rule: (m) => `Employer le terme exact : ${m[2]}`, trap: (m) => `Utiliser un vocabulaire approximatif` },
  { suffix: 'gestes-base', titleSuffix: 'Gestes de base', notion: (m) => `Gestes techniques de ${m[1]}`, rule: (m) => `Exécuter selon la règle : ${m[3]}`, trap: (m) => `Aller vite au détriment du geste` },
  { suffix: 'modele-commente', titleSuffix: 'Modèle commenté', notion: (m) => `Cas modèle : ${m[5]}`, rule: (m) => `Commenter le geste à partir de ${m[3]}`, trap: (m) => `Imiter sans comprendre le pourquoi` },
  { suffix: 'chantier-ecole', titleSuffix: 'Chantier école', notion: (m) => `Mise en situation sur ${m[1]}`, rule: (m) => `Réaliser un livrable conforme à ${m[2]}`, trap: (m) => `Livrer sans contrôle` },
  { suffix: 'securite-prevention', titleSuffix: 'Sécurité et prévention', notion: (m) => `Risques professionnels de ${m[1]}`, rule: (m) => `Prévenir le risque : ${m[4]}`, trap: (m) => m[4] },
  { suffix: 'verification-rapide', titleSuffix: 'Vérification rapide', notion: (m) => `Auto-contrôle de ${m[1]}`, rule: (m) => `Contrôler en trois points clés`, trap: (m) => `Valider sans contrôle` },
  { suffix: 'dossier-client', titleSuffix: 'Dossier client ou dossier technique', notion: (m) => `Dossier type : ${m[5]}`, rule: (m) => `Instruire le dossier selon ${m[3]}`, trap: (m) => `Traiter un dossier incomplet` },
  { suffix: 'presentation-livrable', titleSuffix: 'Présentation du livrable', notion: (m) => `Présenter le travail de ${m[1]}`, rule: (m) => `Argumenter : demande, choix, résultat`, trap: (m) => `Montrer sans expliquer ses choix` },
  { suffix: 'plan-progression', titleSuffix: 'Plan de progression', notion: (m) => `Plan de progression en ${m[1]}`, rule: (m) => `Fixer trois objectifs mesurables`, trap: (m) => `Repartir sans objectif` },
];

/** Étapes de la vague d’approfondissement v27.0 (toutes les matières). */
const BOOST_STAGES_V27: Stage[] = [
  { suffix: 'idee-cle', titleSuffix: 'L’idée clé', notion: (m) => `Idée clé de ${m[1]}`, rule: (m) => `Retenir : ${m[3]}`, trap: (m) => `Retenir l’exemple au lieu de l’idée` },
  { suffix: 'schema-muet', titleSuffix: 'Schéma muet à compléter', notion: (m) => `Schéma à légender sur ${m[1]}`, rule: (m) => `Placer les notions de ${m[2]} sur le schéma`, trap: (m) => `Recopier un schéma sans le comprendre` },
  { suffix: 'automatisme', titleSuffix: 'Automatisme à acquérir', notion: (m) => `Geste automatique sur ${m[1]}`, rule: (m) => `Répéter ${m[3]} jusqu’à l’aisance`, trap: (m) => `Changer de méthode à chaque essai` },
  { suffix: 'entrainement-cible', titleSuffix: 'Entraînement ciblé', notion: (m) => `Exercices ciblés : ${m[5]}`, rule: (m) => `Cibler la difficulté autour de ${m[2]}`, trap: (m) => `Refaire uniquement ce qui est déjà acquis` },
  { suffix: 'piege-classique', titleSuffix: 'Piège classique', notion: (m) => `Piège classique sur ${m[1]}`, rule: (m) => `Éviter : ${m[4]}`, trap: (m) => m[4] },
  { suffix: 'mission-longue', titleSuffix: 'Mission longue', notion: (m) => `Mission étendue : ${m[5]}`, rule: (m) => `Mener la mission avec ${m[3]} sur plusieurs séances`, trap: (m) => `Abandonner à la première difficulté` },
  { suffix: 'chrono-examen', titleSuffix: 'Chrono examen', notion: (m) => `Épreuve chronométrée sur ${m[1]}`, rule: (m) => `Tenir le temps et la qualité`, trap: (m) => `Bâcler la relecture` },
  { suffix: 'fiche-express', titleSuffix: 'Fiche express', notion: (m) => `Fiche express : ${m[2]}`, rule: (m) => `Résumer ${m[3]} en dix lignes`, trap: (m) => `Écrire un résumé illisible` },
  { suffix: 'cas-voisin', titleSuffix: 'Cas voisin', notion: (m) => `Cas proche de ${m[1]}`, rule: (m) => `Transposer la démarche au cas voisin`, trap: (m) => `Recopier la solution précédente` },
  { suffix: 'bilan-maitrise', titleSuffix: 'Bilan de maîtrise', notion: (m) => `Bilan de maîtrise sur ${m[1]}`, rule: (m) => `S’auto-évaluer avec des critères`, trap: (m) => `S’évaluer sans critère` },
];

export interface V27Bundle extends CenturionBundle {
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
): V27Bundle {
  const maxOrder = maxOrders(existing);
  const bundles: CenturionBundle[] = [];
  const covered = new Set<string>();
  let illustrated = 0;

  for (const subject of subjects) {
    const modules = modulesBySubject[subject.id];
    if (!modules || modules.length === 0) {
      throw new Error(`[v27.0] Aucun module « ${options.label} » pour la matière « ${subject.id} ».`);
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

/** v27.0 — Programme illustré des huit nouvelles matières (80 chapitres chacune). */
export function buildNewSubjectsV27(existing: Chapter[], subjects: Subject[]): V27Bundle {
  return buildWave(existing, subjects, NEW_SUBJECT_MODULES_V27, NEW_SUBJECT_STAGES_V27, {
    idPrefix: 'x27n',
    zone: 'Nouveau programme v27.0 — matière créée et illustrée',
    levelWindow: 'all',
    annalesCount: 3,
    label: 'nouvelle matière',
  });
}

/** v27.0 — Approfondissement illustré : 10 chapitres de plus dans les 141 matières. */
export function buildBoostV27(existing: Chapter[], subjects: Subject[]): V27Bundle {
  return buildWave(existing, subjects, X27_BOOST_MODULES, BOOST_STAGES_V27, {
    idPrefix: 'x27',
    zone: 'Programme officiel — approfondissement illustré v27.0',
    levelWindow: 'top4',
    annalesCount: 3,
    label: 'approfondissement',
  });
}
