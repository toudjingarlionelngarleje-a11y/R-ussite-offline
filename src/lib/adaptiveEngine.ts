import { CHAPTERS, FICHES, SUBJECTS } from '../data';
import { AppState, Difficulty, Question, SessionRecord, UserProfile } from '../types';

export type CompetencyLevel =
  | 'a_decouvrir'
  | 'en_cours'
  | 'presque_maitrise'
  | 'maitrise'
  | 'a_entretenir';

export type MasteryReliability =
  | 'maitrise_reelle'
  | 'hasard_probable'
  | 'memorisation_fragile'
  | 'pratique_requise';

export interface CompetencyItem {
  chapterId: string;
  chapterTitle: string;
  subjectId: string;
  subjectName: string;
  subjectColor: string;
  ficheId: string;
  level: CompetencyLevel;
  levelLabel: string;
  reliability: MasteryReliability;
  reliabilityLabel: string;
  attempts: number;
  successRate: number;
  confidencePercent: number;
  avgTimeSeconds: number;
  lastReviewedAt: string | null;
  nextRecommendedAt: string;
  errorCount: number;
  recommendedDifficulty: Difficulty;
}

export interface AdaptiveRecommendation {
  id: string;
  priority: 'haute' | 'moyenne' | 'entretien';
  title: string;
  why: string;
  actionLabel: string;
  actionType: 'practice_chapter' | 'open_fiche' | 'mistakes' | 'mock_exam' | 'diagnostic';
  subjectId?: string;
  chapterId?: string;
  ficheId?: string;
  recommendedDifficulty: Difficulty;
  recommendedCount: number;
  recommendedMinutes: number;
}

export interface HealthyBadge {
  id: string;
  title: string;
  description: string;
  achieved: boolean;
  progressText: string;
  category: 'progression' | 'regularite' | 'temps' | 'erreurs' | 'autonomie';
}

export function buildCompetencyMap(
  state: AppState,
  allQuestions: Question[],
  profile: UserProfile | null
): CompetencyItem[] {
  const activeSubjects = profile?.selectedSubjectIds.length
    ? new Set(profile.selectedSubjectIds)
    : new Set(SUBJECTS.map((s) => s.id));

  const targetChapters = CHAPTERS.filter((c) => activeSubjects.has(c.subjectId));
  const chaptersToEval = targetChapters.length > 0 ? targetChapters : CHAPTERS.slice(0, 8);

  const qById = new Map(allQuestions.map((q) => [q.id, q]));

  // Aggregate per chapter from all sessions
  const stats = new Map<
    string,
    {
      attempts: number;
      correct: number;
      totalSeconds: number;
      fastCorrectOnly: number;
      modified: number;
      lastDate: string | null;
    }
  >();

  for (const session of state.sessions) {
    for (const ans of session.answers) {
      const q = qById.get(ans.questionId);
      if (!q) continue;
      const cur = stats.get(q.chapterId) ?? {
        attempts: 0,
        correct: 0,
        totalSeconds: 0,
        fastCorrectOnly: 0,
        modified: 0,
        lastDate: null,
      };
      cur.attempts += 1;
      if (ans.isCorrect) {
        cur.correct += 1;
        if (ans.timeSpentSeconds > 0 && ans.timeSpentSeconds < 6) {
          cur.fastCorrectOnly += 1;
        }
      }
      cur.totalSeconds += ans.timeSpentSeconds;
      cur.modified += ans.modifiedCount;
      if (!cur.lastDate || session.completedAt > cur.lastDate) {
        cur.lastDate = session.completedAt;
      }
      stats.set(q.chapterId, cur);
    }
  }

  const now = Date.now();

  return chaptersToEval.map((ch) => {
    const subj = SUBJECTS.find((s) => s.id === ch.subjectId);
    const st = stats.get(ch.id);
    const attempts = st?.attempts ?? 0;
    const correct = st?.correct ?? 0;
    const successRate = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;
    const avgTimeSeconds = attempts > 0 ? Math.round((st?.totalSeconds ?? 0) / attempts) : 0;
    const daysSinceLast = st?.lastDate
      ? Math.floor((now - new Date(st.lastDate).getTime()) / (1000 * 60 * 60 * 24))
      : 999;

    let level: CompetencyLevel = 'a_decouvrir';
    if (attempts === 0) {
      level = 'a_decouvrir';
    } else if (successRate < 50) {
      level = 'en_cours';
    } else if (successRate < 75 || attempts < 2) {
      level = 'presque_maitrise';
    } else if (daysSinceLast > 10) {
      level = 'a_entretenir';
    } else {
      level = 'maitrise';
    }

    const levelLabels: Record<CompetencyLevel, string> = {
      a_decouvrir: 'À découvrir',
      en_cours: 'En cours d’apprentissage',
      presque_maitrise: 'Presque maîtrisé',
      maitrise: 'Maîtrisé',
      a_entretenir: 'À entretenir',
    };

    let reliability: MasteryReliability = 'pratique_requise';
    if (attempts === 0 || successRate < 60) {
      reliability = 'pratique_requise';
    } else if (attempts <= 2 && (st?.fastCorrectOnly ?? 0) >= correct) {
      reliability = 'hasard_probable';
    } else if (attempts < 3 || (st?.modified ?? 0) >= attempts) {
      reliability = 'memorisation_fragile';
    } else {
      reliability = 'maitrise_reelle';
    }

    const reliabilityLabels: Record<MasteryReliability, string> = {
      maitrise_reelle: 'Maîtrise confirmée',
      hasard_probable: 'Réponse très rapide — à confirmer',
      memorisation_fragile: 'Mémorisation récente — à consolider',
      pratique_requise: 'Pratique supplémentaire recommandée',
    };

    const confidencePercent =
      attempts === 0
        ? 0
        : Math.min(
            98,
            Math.round(successRate * (attempts >= 4 ? 1 : 0.72 + attempts * 0.07))
          );

    const nextDays =
      level === 'a_decouvrir' || level === 'en_cours'
        ? 1
        : level === 'presque_maitrise'
        ? 3
        : level === 'a_entretenir'
        ? 1
        : 7;

    const nextDate = new Date(now + nextDays * 86400000).toISOString().slice(0, 10);

    const recommendedDifficulty: Difficulty =
      successRate >= 82 && attempts >= 2
        ? 'difficile'
        : successRate >= 50
        ? 'moyen'
        : 'facile';

    return {
      chapterId: ch.id,
      chapterTitle: ch.title,
      subjectId: ch.subjectId,
      subjectName: subj?.name ?? ch.subjectId,
      subjectColor: subj?.color ?? '#1D4ED8',
      ficheId: ch.ficheId,
      level,
      levelLabel: levelLabels[level],
      reliability,
      reliabilityLabel: reliabilityLabels[reliability],
      attempts,
      successRate,
      confidencePercent,
      avgTimeSeconds,
      lastReviewedAt: st?.lastDate ?? null,
      nextRecommendedAt: nextDate,
      errorCount: attempts - correct,
      recommendedDifficulty,
    };
  });
}

export function buildAdaptiveRecommendations(
  state: AppState,
  allQuestions: Question[],
  profile: UserProfile | null,
  mistakeCount: number
): AdaptiveRecommendation[] {
  const recs: AdaptiveRecommendation[] = [];
  const competencies = buildCompetencyMap(state, allQuestions, profile);

  if (!state.diagnosticResult) {
    recs.push({
      id: 'rec-diagnostic',
      priority: 'haute',
      title: 'Passer ton test de positionnement adaptatif (5 min)',
      why: 'Aucune évaluation initiale enregistrée : ce test calibre automatiquement tes matières prioritaires et le niveau de difficulté idéal.',
      actionLabel: 'Lancer le diagnostic',
      actionType: 'diagnostic',
      recommendedDifficulty: 'moyen',
      recommendedCount: 6,
      recommendedMinutes: 5,
    });
  }

  if (mistakeCount >= 2) {
    recs.push({
      id: 'rec-mistakes',
      priority: 'haute',
      title: `Corriger tes ${mistakeCount} erreur(s) récurrente(s)`,
      why: `La récupération active sur tes erreurs passées est le levier le plus rapide (+15 à +25 % de score) avant d’aborder de nouveaux sujets.`,
      actionLabel: 'Revoir mes erreurs',
      actionType: 'mistakes',
      recommendedDifficulty: 'moyen',
      recommendedCount: Math.min(8, mistakeCount),
      recommendedMinutes: state.fatigueLevel === 'fatigue' ? 5 : 10,
    });
  }

  const weakComp = competencies
    .filter((c) => c.level === 'en_cours' || c.level === 'a_entretenir')
    .sort((a, b) => a.successRate - b.successRate)[0];

  if (weakComp) {
    const fiche = FICHES.find((f) => f.id === weakComp.ficheId);
    recs.push({
      id: `rec-weak-${weakComp.chapterId}`,
      priority: 'haute',
      title: `Renforcer : ${weakComp.chapterTitle}`,
      why: `Taux actuel de ${weakComp.successRate} % (${weakComp.levelLabel}, ${weakComp.reliabilityLabel.toLowerCase()}). Une relecture courte de la fiche puis des exercices ciblés consolideront durablement cette compétence.`,
      actionLabel: fiche ? 'Relire la fiche prioritaire' : 'S’entraîner',
      actionType: fiche ? 'open_fiche' : 'practice_chapter',
      subjectId: weakComp.subjectId,
      chapterId: weakComp.chapterId,
      ficheId: weakComp.ficheId,
      recommendedDifficulty: weakComp.recommendedDifficulty,
      recommendedCount: state.fatigueLevel === 'fatigue' ? 4 : 6,
      recommendedMinutes: state.fatigueLevel === 'fatigue' ? 10 : 15,
    });
  }

  const strongComp = competencies.find((c) => c.level === 'maitrise');
  if (strongComp) {
    recs.push({
      id: `rec-levelup-${strongComp.chapterId}`,
      priority: 'entretien',
      title: `Passer en niveau avancé sur « ${strongComp.chapterTitle} »`,
      why: `Tu atteins déjà ${strongComp.successRate} % sur ce chapitre : pour éviter la stagnation sur des exercices trop faciles, le moteur recommande un examen blanc chronométré.`,
      actionLabel: 'Lancer un examen blanc',
      actionType: 'mock_exam',
      subjectId: strongComp.subjectId,
      chapterId: strongComp.chapterId,
      recommendedDifficulty: 'difficile',
      recommendedCount: 6,
      recommendedMinutes: 20,
    });
  }

  const unseen = competencies.find((c) => c.level === 'a_decouvrir');
  if (unseen && recs.length < 4) {
    recs.push({
      id: `rec-discover-${unseen.chapterId}`,
      priority: 'moyenne',
      title: `Découvrir : ${unseen.chapterTitle}`,
      why: `Ce chapitre de ${unseen.subjectName} fait partie de ton programme d’examen et n’a pas encore été évalué.`,
      actionLabel: 'Commencer l’entraînement',
      actionType: 'practice_chapter',
      subjectId: unseen.subjectId,
      chapterId: unseen.chapterId,
      recommendedDifficulty: 'moyen',
      recommendedCount: 5,
      recommendedMinutes: 15,
    });
  }

  return recs.slice(0, 4);
}

export function buildHealthyBadges(state: AppState): HealthyBadge[] {
  const sessions = state.sessions;
  const mockExams = sessions.filter((s) => s.mode === 'examen_blanc');
  const firstScore = sessions.length > 0 ? sessions[sessions.length - 1].scorePercent : 0;
  const bestScore = sessions.length > 0 ? Math.max(...sessions.map((s) => s.scorePercent)) : 0;
  const improved = sessions.length >= 2 && bestScore > firstScore;
  const reviewedErrors = sessions.some((s) => s.mode === 'erreurs');
  const offlineReadyCount = Object.keys(state.downloadedItems).length;

  return [
    {
      id: 'badge-progression',
      title: 'Progression réelle',
      description: 'Améliorer son score par rapport à sa première session.',
      achieved: improved,
      progressText: improved
        ? `+${bestScore - firstScore} pts gagnés depuis ton début`
        : 'Réalise 2 sessions pour mesurer ta progression',
      category: 'progression',
    },
    {
      id: 'badge-regularite',
      title: 'Régularité sereine',
      description: 'Maintenir une habitude de révision sur 3 jours ou plus.',
      achieved: state.streakDays >= 3,
      progressText: `${state.streakDays} jour(s) actif(s)`,
      category: 'regularite',
    },
    {
      id: 'badge-erreurs',
      title: 'Esprit d’analyse',
      description: 'Transformer ses erreurs en acquis grâce à la session Révision erreurs.',
      achieved: reviewedErrors,
      progressText: reviewedErrors ? 'Session erreurs accomplie' : 'Lance une session d’erreurs ciblée',
      category: 'erreurs',
    },
    {
      id: 'badge-temps',
      title: 'Maîtrise du chronomètre',
      description: 'Terminer au moins un examen blanc chronométré en entier.',
      achieved: mockExams.length >= 1,
      progressText: `${mockExams.length} examen(s) blanc(s) terminé(s)`,
      category: 'temps',
    },
    {
      id: 'badge-offline',
      title: 'Prêt sans Internet',
      description: 'Télécharger au moins 3 ressources hors ligne pour réviser partout.',
      achieved: offlineReadyCount >= 3,
      progressText: `${offlineReadyCount} ressource(s) hors ligne`,
      category: 'autonomie',
    },
  ];
}

export function analyzeExamComparison(sessions: SessionRecord[]) {
  const mocks = sessions.filter((s) => s.mode === 'examen_blanc');
  if (mocks.length === 0) return null;
  const latest = mocks[0];
  const first = mocks[mocks.length - 1];
  const best = mocks.reduce((a, b) => (b.scorePercent > a.scorePercent ? b : a), mocks[0]);
  return {
    count: mocks.length,
    firstScore: first.scorePercent,
    latestScore: latest.scorePercent,
    bestScore: best.scorePercent,
    deltaFromFirst: latest.scorePercent - first.scorePercent,
  };
}
