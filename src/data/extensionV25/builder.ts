import { Chapter, ClassLevelId, Subject } from '../../types';
import {
  buildCenturionPack,
  CenturionBundle,
  CenturionTopicTuple,
  mergeCenturionBundles,
} from '../centurion100/engine';
import { getSubjectClassLevels } from '../hyperExpansion72/classLevels';
import { getSubjectDiagramGallery } from '../../lib/subjectDiagrams';
import { NEW_SUBJECT_MODULES_V25 } from '../newSubjectsV25/modules';
import { X25_BOOST_MODULES } from './boostModules';
import { ExtensionModuleTuple, ExtensionSubjectModules } from '../extensionV23/types';

interface Stage {
  suffix: string;
  titleSuffix: string;
  notion: (m: ExtensionModuleTuple) => string;
  rule: (m: ExtensionModuleTuple) => string;
  trap: (m: ExtensionModuleTuple) => string;
}

/** Étapes illustrées des huit nouvelles matières v25.0. */
const NEW_SUBJECT_STAGES_V25: Stage[] = [
  { suffix: 'ouverture', titleSuffix: 'Ouverture & situation déclencheuse', notion: (m) => `Situation concrète autour de ${m[1]}`, rule: (m) => `Identifier l’enjeu : ${m[2]}`, trap: (m) => `Commencer par la théorie sans situation concrète` },
  { suffix: 'reperes', titleSuffix: 'Repères clés & définitions', notion: (m) => `Repères et vocabulaire de ${m[1]}`, rule: (m) => `Fixer les notions exactes : ${m[2]}`, trap: (m) => `Employer un vocabulaire approximatif` },
  { suffix: 'pas-a-pas', titleSuffix: 'Méthode pas à pas', notion: (m) => `Démarche guidée sur ${m[1]}`, rule: (m) => `Appliquer la règle : ${m[3]}`, trap: (m) => `Sauter une étape du raisonnement` },
  { suffix: 'exemple-guide', titleSuffix: 'Exemple guidé commenté', notion: (m) => `Cas résolu : ${m[5]}`, rule: (m) => `Commenter chaque étape à partir de ${m[3]}`, trap: (m) => `Recopier le résultat sans justification` },
  { suffix: 'atelier-illustre', titleSuffix: 'Atelier illustré', notion: (m) => `Atelier pratique sur ${m[1]}`, rule: (m) => `Produire un livrable en mobilisant ${m[2]}`, trap: (m) => `Rester abstrait sans production` },
  { suffix: 'obstacles', titleSuffix: 'Obstacles & remédiation', notion: (m) => `Obstacles fréquents sur ${m[1]}`, rule: (m) => `Contourner l’obstacle : ${m[4]}`, trap: (m) => m[4] },
  { suffix: 'quiz-formatif', titleSuffix: 'Quiz formatif corrigé', notion: (m) => `Auto-contrôle de ${m[2]}`, rule: (m) => `Vérifier la maîtrise par un quiz court`, trap: (m) => `Valider sans vérifier les réponses` },
  { suffix: 'cas-reel', titleSuffix: 'Cas réel documenté', notion: (m) => `Dossier documenté : ${m[5]}`, rule: (m) => `Analyser le dossier au regard de ${m[3]}`, trap: (m) => `Répondre par des généralités` },
  { suffix: 'expose', titleSuffix: 'Exposé structuré', notion: (m) => `Présenter ${m[1]} en cinq minutes`, rule: (m) => `Structurer : contexte, analyse, recommandation`, trap: (m) => `Lire ses notes sans regarder l’auditoire` },
  { suffix: 'ancrage', titleSuffix: 'Ancrage & bilan personnel', notion: (m) => `Bilan de maîtrise de ${m[1]}`, rule: (m) => `Relier ${m[2]} à son projet personnel`, trap: (m) => `Terminer sans trace écrite` },
];

/** Étapes de la vague de consolidation v25.0 (toutes les matières). */
const BOOST_STAGES_V25: Stage[] = [
  { suffix: 'flash-notion', titleSuffix: 'Flash notion', notion: (m) => `Notion express : ${m[2]}`, rule: (m) => `Mémoriser : ${m[3]}`, trap: (m) => `Retenir un détail au lieu de la règle` },
  { suffix: 'schema-cle', titleSuffix: 'Schéma clé illustré', notion: (m) => `Schéma de synthèse de ${m[1]}`, rule: (m) => `Traduire ${m[3]} en schéma légendé`, trap: (m) => `Dessiner sans légende ni repère` },
  { suffix: 'application-directe', titleSuffix: 'Application directe', notion: (m) => `Application immédiate sur ${m[1]}`, rule: (m) => `Appliquer ${m[3]} sans détour`, trap: (m) => `Chercher une méthode compliquée` },
  { suffix: 'serie-graduee', titleSuffix: 'Série graduée', notion: (m) => `Série d’exercices : ${m[5]}`, rule: (m) => `Progresser du simple au complexe autour de ${m[2]}`, trap: (m) => `Sauter les niveaux intermédiaires` },
  { suffix: 'erreur-type', titleSuffix: 'Erreur type & correction', notion: (m) => `Erreur type sur ${m[1]}`, rule: (m) => `Corriger l’erreur : ${m[4]}`, trap: (m) => m[4] },
  { suffix: 'cas-complet', titleSuffix: 'Cas complet', notion: (m) => `Cas complet : ${m[5]}`, rule: (m) => `Traiter le cas de bout en bout avec ${m[3]}`, trap: (m) => `S’arrêter à mi-parcours` },
  { suffix: 'epreuve-chrono', titleSuffix: 'Épreuve chronométrée', notion: (m) => `Épreuve minutée sur ${m[1]}`, rule: (m) => `Respecter le temps et le barème`, trap: (m) => `Négliger la relecture` },
  { suffix: 'memo-actif', titleSuffix: 'Mémo actif', notion: (m) => `Mémo personnel : ${m[2]}`, rule: (m) => `Reformuler ${m[3]} avec ses propres mots`, trap: (m) => `Recopier le cours sans reformuler` },
  { suffix: 'transposition', titleSuffix: 'Transposition', notion: (m) => `Transposer ${m[1]} à un autre contexte`, rule: (m) => `Adapter la méthode à une situation nouvelle`, trap: (m) => `Appliquer la recette sans vérifier les hypothèses` },
  { suffix: 'verification', titleSuffix: 'Vérification finale', notion: (m) => `Contrôle final de ${m[1]}`, rule: (m) => `Vérifier chaque étape et l’unité du résultat`, trap: (m) => `Rendre sans vérification` },
];

export interface V25Bundle extends CenturionBundle {
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
): V25Bundle {
  const maxOrder = maxOrders(existing);
  const bundles: CenturionBundle[] = [];
  const covered = new Set<string>();
  let illustrated = 0;

  for (const subject of subjects) {
    const modules = modulesBySubject[subject.id];
    if (!modules || modules.length === 0) {
      throw new Error(`[v25.0] Aucun module « ${options.label} » pour la matière « ${subject.id} ».`);
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

/** v25.0 — Programme illustré des huit nouvelles matières (80 chapitres chacune). */
export function buildNewSubjectsV25(existing: Chapter[], subjects: Subject[]): V25Bundle {
  return buildWave(existing, subjects, NEW_SUBJECT_MODULES_V25, NEW_SUBJECT_STAGES_V25, {
    idPrefix: 'x25n',
    zone: 'Nouveau programme v25.0 — matière créée et illustrée',
    levelWindow: 'all',
    annalesCount: 3,
    label: 'nouvelle matière',
  });
}

/** v25.0 — Consolidation illustrée : 10 chapitres de plus dans les 125 matières. */
export function buildBoostV25(existing: Chapter[], subjects: Subject[]): V25Bundle {
  return buildWave(existing, subjects, X25_BOOST_MODULES, BOOST_STAGES_V25, {
    idPrefix: 'x25',
    zone: 'Programme officiel — approfondissement illustré v25.0',
    levelWindow: 'top4',
    annalesCount: 3,
    label: 'approfondissement',
  });
}
