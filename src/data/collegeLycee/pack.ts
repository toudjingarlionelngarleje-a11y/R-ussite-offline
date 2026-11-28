import { Subject } from '../../types';
import {
  buildCenturionPack,
  CenturionBundle,
  CenturionTopicTuple,
  mergeCenturionBundles,
} from '../centurion100/engine';
import {
  COLLEGE_LYCEE_SUBJECT_SPECS,
  CollegeLyceeModuleTuple,
  CollegeLyceeSubjectSpec,
} from './content';

/**
 * Dix étapes pédagogiques par module : 12 modules × 10 étapes = 120 chapitres
 * par matière scolaire (plus de 100 chapitres garantis par matière).
 */
const STAGES = [
  {
    suffix: 'fondements',
    titleSuffix: 'Fondements & vocabulaire',
    notion: (m: CollegeLyceeModuleTuple) => m[2],
    rule: (m: CollegeLyceeModuleTuple) => `Repères de base : ${m[2]} — règle à retenir : ${m[3]}`,
    trap: (m: CollegeLyceeModuleTuple) => m[4],
    difficulty: 'facile' as const,
  },
  {
    suffix: 'regles',
    titleSuffix: 'Règles & repères essentiels',
    notion: (m: CollegeLyceeModuleTuple) => `${m[3]} (${m[2]})`,
    rule: (m: CollegeLyceeModuleTuple) => m[3],
    trap: (m: CollegeLyceeModuleTuple) => m[4],
    difficulty: 'facile' as const,
  },
  {
    suffix: 'methode',
    titleSuffix: 'Méthode & procédure pas à pas',
    notion: (m: CollegeLyceeModuleTuple) => `Démarche : ${m[5]}`,
    rule: (m: CollegeLyceeModuleTuple) => `Appliquer « ${m[5]} » en contrôlant : ${m[3]}`,
    trap: (m: CollegeLyceeModuleTuple) => `Sauter une étape de « ${m[5]} » : ${m[4]}`,
    difficulty: 'moyen' as const,
  },
  {
    suffix: 'exercice-guide',
    titleSuffix: 'Exercice guidé corrigé',
    notion: (m: CollegeLyceeModuleTuple) => `Exercice guidé sur : ${m[1]}`,
    rule: (m: CollegeLyceeModuleTuple) => `Résolution pas à pas de « ${m[5]} » avec la règle : ${m[3]}`,
    trap: (m: CollegeLyceeModuleTuple) => m[4],
    difficulty: 'moyen' as const,
  },
  {
    suffix: 'application',
    titleSuffix: 'Application concrète & terrain',
    notion: (m: CollegeLyceeModuleTuple) => `Application : ${m[5]}`,
    rule: (m: CollegeLyceeModuleTuple) => `Transposer en situation réelle en respectant : ${m[3]}`,
    trap: (m: CollegeLyceeModuleTuple) => `Appliquer la théorie sans adapter au contexte : ${m[4]}`,
    difficulty: 'moyen' as const,
  },
  {
    suffix: 'pieges',
    titleSuffix: 'Pièges classiques & erreurs fréquentes',
    notion: (m: CollegeLyceeModuleTuple) => `Erreurs à éviter dans « ${m[1]} »`,
    rule: (m: CollegeLyceeModuleTuple) => `Contrôle anti-erreur : ${m[3]}`,
    trap: (m: CollegeLyceeModuleTuple) => m[4],
    difficulty: 'moyen' as const,
  },
  {
    suffix: 'revision',
    titleSuffix: 'Fiche de révision active',
    notion: (m: CollegeLyceeModuleTuple) => `À retenir : ${m[2]}`,
    rule: (m: CollegeLyceeModuleTuple) => `Fiche mémo : ${m[3]}`,
    trap: (m: CollegeLyceeModuleTuple) => `Révision incomplète : ${m[4]}`,
    difficulty: 'facile' as const,
  },
  {
    suffix: 'entrainement',
    titleSuffix: 'Entraînement type contrôle & examen',
    notion: (m: CollegeLyceeModuleTuple) => `Sujet d’entraînement : ${m[5]}`,
    rule: (m: CollegeLyceeModuleTuple) => `Rédiger la réponse en justifiant par : ${m[3]}`,
    trap: (m: CollegeLyceeModuleTuple) => `Perdre des points sur : ${m[4]}`,
    difficulty: 'difficile' as const,
  },
  {
    suffix: 'synthese',
    titleSuffix: 'Synthèse & liens avec les autres chapitres',
    notion: (m: CollegeLyceeModuleTuple) => `Synthèse : ${m[2]} → ${m[5]}`,
    rule: (m: CollegeLyceeModuleTuple) => `Relier ${m[2]} à ${m[3]} et à ${m[5]}`,
    trap: (m: CollegeLyceeModuleTuple) => `Isoler le chapitre sans faire de lien : ${m[4]}`,
    difficulty: 'moyen' as const,
  },
  {
    suffix: 'maitrise',
    titleSuffix: 'Maîtrise & transfert',
    notion: (m: CollegeLyceeModuleTuple) => `Transfert de « ${m[1]} » à une situation nouvelle`,
    rule: (m: CollegeLyceeModuleTuple) => `Mobiliser ${m[3]} dans un cas inédit proche de ${m[5]}`,
    trap: (m: CollegeLyceeModuleTuple) => `Restituer sans transférer : ${m[4]}`,
    difficulty: 'difficile' as const,
  },
];

function buildSubjectPack(spec: CollegeLyceeSubjectSpec): CenturionBundle {
  const topics: CenturionTopicTuple[] = [];
  const total = spec.modules.length * STAGES.length;
  let index = 0;

  spec.modules.forEach((mod) => {
    const [slug, moduleTitle] = mod;
    STAGES.forEach((stage) => {
      const level = spec.levels[Math.min(spec.levels.length - 1, Math.floor((index / total) * spec.levels.length))];
      topics.push([
        `cl-${slug}-${stage.suffix}`,
        `${moduleTitle} — ${stage.titleSuffix} (${spec.shortName})`,
        stage.notion(mod),
        stage.rule(mod),
        stage.trap(mod),
        level,
        stage.difficulty,
      ]);
      index += 1;
    });
  });

  return buildCenturionPack({
    subjectId: spec.subjectId,
    subjectName: spec.subjectName,
    primaryExamId: spec.primaryExamId,
    examIds: spec.examIds,
    zone: spec.zone,
    startOrder: 1,
    annalesCount: 3,
    diagramId: spec.diagramId,
    totalChapters: 120,
    idPrefix: 'cl',
    topics,
  });
}

/**
 * v17.9 — 720 nouveaux chapitres scolaires : 6 matières × 120 chapitres.
 * Matières strictement réservées au collège et/ou au lycée.
 */
export const COLLEGE_LYCEE_PACK: CenturionBundle = mergeCenturionBundles(
  COLLEGE_LYCEE_SUBJECT_SPECS.map((spec) => buildSubjectPack(spec))
);

export const COLLEGE_LYCEE_NEW_SUBJECTS: Subject[] = COLLEGE_LYCEE_SUBJECT_SPECS.map((spec) => ({
  id: spec.subjectId,
  name: spec.subjectName,
  shortName: spec.shortName,
  examIds: spec.examIds,
  classLevels: spec.levels,
  color: spec.color,
  icon: spec.icon,
  description: spec.description,
  sizeKb: spec.sizeKb,
}));
