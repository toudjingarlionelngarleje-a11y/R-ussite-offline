import { FlashcardProgress, MasteryLevel } from '../types';

export const MASTERY_LABELS: Record<
  MasteryLevel,
  { label: string; short: string; colorClass: string; nextHint: string }
> = {
  0: {
    label: 'Non maîtrisée',
    short: 'À reprendre',
    colorClass: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950/60 dark:text-red-200 dark:border-red-800',
    nextHint: 'Revoir dans 10 min / demain',
  },
  1: {
    label: 'À revoir bientôt',
    short: 'Bientôt',
    colorClass: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800',
    nextHint: 'Revoir dans 2 jours',
  },
  2: {
    label: 'Maîtrisée',
    short: 'Maîtrisée',
    colorClass: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-200 dark:border-blue-800',
    nextHint: 'Revoir dans 5 à 7 jours',
  },
  3: {
    label: 'Parfaitement maîtrisée',
    short: 'Acquise',
    colorClass: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800',
    nextHint: 'Revoir dans 14+ jours',
  },
};

/**
 * Offline SM-2 spaced repetition algorithm adapted for 4 intuitive student mastery buttons.
 */
export function computeNextFlashcardReview(
  cardId: string,
  rating: MasteryLevel,
  existing?: FlashcardProgress
): FlashcardProgress {
  const now = new Date();
  let ease = existing?.easeFactor ?? 2.5;
  let reps = existing?.repetitions ?? 0;
  let intervalDays = existing?.intervalDays ?? 1;

  if (rating === 0) {
    reps = 0;
    intervalDays = 0.25; // Review same day / within 6 hours
    ease = Math.max(1.3, ease - 0.2);
  } else if (rating === 1) {
    reps = Math.max(1, reps);
    intervalDays = 2;
    ease = Math.max(1.3, ease - 0.1);
  } else if (rating === 2) {
    reps += 1;
    if (reps === 1) intervalDays = 4;
    else if (reps === 2) intervalDays = 7;
    else intervalDays = Math.round(intervalDays * ease);
  } else {
    reps += 1;
    ease = Math.min(3.0, ease + 0.15);
    if (reps === 1) intervalDays = 7;
    else intervalDays = Math.max(14, Math.round(intervalDays * ease * 1.25));
  }

  const nextDate = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);

  return {
    cardId,
    mastery: rating,
    intervalDays,
    easeFactor: Number(ease.toFixed(2)),
    repetitions: reps,
    nextReviewAt: nextDate.toISOString(),
    lastReviewedAt: now.toISOString(),
  };
}

export function isCardDue(progress?: FlashcardProgress): boolean {
  if (!progress) return true;
  return new Date(progress.nextReviewAt).getTime() <= Date.now();
}
