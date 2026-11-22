import { Course, Question } from '../types';

export type AiExplanationLevel = 'simplifie' | 'standard' | 'approfondi';

export interface ResponsibleAiResponse {
  text: string;
  keyTip: string;
  confidenceLabel: string;
  disclaimer: string;
  isOfflineGenerated: boolean;
}

/**
 * Responsible offline pedagogical assistant.
 * - Never replaces an official correction
 * - Adapts pedagogy to requested difficulty level
 * - Explicitly displays uncertainty & verification reminders
 * - Works 100% offline with zero data consumption
 */
export function generateOfflineQuestionExplanation(
  question: Question,
  chosenIndex: number | null,
  level: AiExplanationLevel
): ResponsibleAiResponse {
  const correctText = question.options[question.correctIndex];
  const chosenText = chosenIndex !== null ? question.options[chosenIndex] : null;
  const isRight = chosenIndex === question.correctIndex;

  let text = '';
  if (level === 'simplifie') {
    text = isRight
      ? `Bravo, tu as trouvé la bonne réponse (« ${correctText} »). Retiens l’idée centrale sur « ${question.notion} » : ${question.steps[0] ?? question.explanation}`
      : `Pas d’inquiétude ! ${
          chosenText ? `Tu avais choisi « ${chosenText} », mais ` : ''
        }la réponse attendue est « ${correctText} ». Pour retenir facilement : commence par ${
          question.steps[0]?.toLowerCase() ?? 'identifier la règle de base'
        }. Ensuite, vérifie la notion « ${question.notion} » dans la fiche synthétique associée.`;
  } else if (level === 'standard') {
    text = `Analyse pédagogique sur « ${question.notion} » :\n• Réponse officielle : « ${correctText} ».\n• Méthode recommandée : ${question.steps.join(
      ' → '
    )}\n• Pourquoi c’est important à l’examen : cette notion tombe fréquemment sous forme de question rapide ou d’étape intermédiaire.`;
  } else {
    text = `Approfondissement (« ${question.notion} ») :\n1. Règle clé : ${question.explanation}\n2. Démarche rigoureuse attendue par un correcteur : ${question.steps.join(
      ' | '
    )}\n3. Pour éviter les pièges : relis les distracteurs proposés et demande-toi quelle erreur de calcul ou de définition mène à chacun d’eux.`;
  }

  const keyTip = question.disputable
    ? 'Attention : cette notion comporte des nuances d’interprétation. Cite toujours l’auteur ou le texte officiel dans ta copie.'
    : `Refais 2 questions similaires sur « ${question.notion} » dans 48h pour ancrer le réflexe.`;

  return {
    text,
    keyTip,
    confidenceLabel: question.disputable
      ? 'Nuance pédagogique détectée — vérifie avec ton cours'
      : 'Aligné sur la correction officielle enregistrée hors ligne',
    disclaimer:
      'Explication générée localement par l’assistant pédagogique (hors ligne). Elle complète la correction officielle sans jamais la remplacer. Vérifie toujours tes références auprès de ton enseignant ou du programme officiel.',
    isOfflineGenerated: true,
  };
}

export function generateOfflineCourseSummary(course: Course): {
  summary: string;
  generatedFlashcards: { question: string; answer: string }[];
  disclaimer: string;
} {
  const takeaways = course.sections.map((s, idx) => `${idx + 1}. ${s.heading} : ${s.keyTakeaway}`);
  const cards = course.sections.map((s) => ({
    question: `Quel est le point essentiel à retenir sur « ${s.heading.replace(/^\d+\.\s*/, '')} » ?`,
    answer: `${s.keyTakeaway}${s.formula ? ` (Formule : ${s.formula})` : ''}`,
  }));

  return {
    summary: takeaways.join('\n'),
    generatedFlashcards: cards,
    disclaimer:
      'Synthèse et cartes proposées automatiquement hors ligne à partir du texte du cours. Relis-les et confirme avant de les enregistrer dans tes révisions.',
  };
}
