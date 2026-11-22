import { StudyPlanItem, Subject, UserProfile } from '../types';

const DAY_NAMES = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const MONTH_NAMES = [
  'janv.',
  'févr.',
  'mars',
  'avr.',
  'mai',
  'juin',
  'juil.',
  'août',
  'sept.',
  'oct.',
  'nov.',
  'déc.',
];

export function formatIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatDayLabel(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return `${DAY_NAMES[date.getDay()]} ${d} ${MONTH_NAMES[m - 1]}`;
}

export function daysUntil(isoDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [y, m, d] = isoDate.split('-').map(Number);
  const target = new Date(y, m - 1, d);
  const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

/**
 * Generates an adaptive 14-day study schedule that boosts weaker subjects
 * while respecting rest days, daily available time, breaks, mock exams, error reviews,
 * weekly bilan, and final revision periods.
 */
export function generateAdaptiveStudyPlan(
  profile: UserProfile,
  subjects: Subject[],
  subjectScores: Record<string, number>,
  mistakeCount: number
): StudyPlanItem[] {
  const activeSubjects = subjects.filter((s) =>
    profile.selectedSubjectIds.includes(s.id)
  );
  const pool = activeSubjects.length > 0 ? activeSubjects : subjects.slice(0, 3);

  // Build weighted subject rotation: weak subjects (< 65%) appear twice as often
  const weightedSubjects: Subject[] = [];
  pool.forEach((s) => {
    weightedSubjects.push(s);
    const score = subjectScores[s.id];
    if (score !== undefined && score < 65) {
      weightedSubjects.push(s);
    }
  });

  const plan: StudyPlanItem[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const remainingToExam = daysUntil(profile.examDate);
  const daily = Math.max(20, profile.dailyMinutes || 45);

  let rotIndex = 0;

  for (let offset = 0; offset < 14; offset++) {
    const d = new Date(today.getTime() + offset * 24 * 60 * 60 * 1000);
    const iso = formatIsoDate(d);
    const dayLabel = formatDayLabel(iso);
    const weekday = d.getDay();

    if (profile.restDays.includes(weekday)) {
      plan.push({
        id: `plan-${iso}-pause`,
        date: iso,
        dayLabel,
        title: 'Journée de repos & récupération cognitive',
        type: 'pause',
        durationMinutes: 0,
        completed: false,
      });
      continue;
    }

    const daysLeftAtDate = Math.max(0, remainingToExam - offset);
    const subject = weightedSubjects[rotIndex % weightedSubjects.length];
    rotIndex++;
    const isWeak =
      subjectScores[subject.id] !== undefined && subjectScores[subject.id] < 65;

    // Final revision period if within 3 days of exam
    if (daysLeftAtDate <= 3 && remainingToExam > 0) {
      plan.push({
        id: `plan-${iso}-final`,
        date: iso,
        dayLabel,
        subjectId: subject.id,
        title: `Révision finale express — ${subject.name} (fiches & formules)`,
        type: 'revision_finale',
        durationMinutes: Math.min(daily, 45),
        completed: false,
        priority: 'haute',
      });
      continue;
    }

    // Weekly Bilan on every 7th day (offset 6 and 13)
    if (offset === 6 || offset === 13) {
      plan.push({
        id: `plan-${iso}-bilan`,
        date: iso,
        dayLabel,
        title: 'Journée Bilan : analyse des scores & réajustement du programme',
        type: 'bilan',
        durationMinutes: Math.min(30, daily),
        completed: false,
      });
      continue;
    }

    // Mock exam every 4th study day
    if (offset === 3 || offset === 10) {
      plan.push({
        id: `plan-${iso}-mock`,
        date: iso,
        dayLabel,
        subjectId: subject.id,
        title: `Examen blanc chronométré — ${subject.name}`,
        type: 'examen_blanc',
        durationMinutes: Math.min(daily, 45),
        completed: false,
        priority: isWeak ? 'haute' : 'normale',
      });
      continue;
    }

    // Split daily time into structured blocks: Fiche + Practice (or Mistake review)
    const ficheMinutes = Math.max(10, Math.round(daily * 0.4));
    const practiceMinutes = Math.max(10, daily - ficheMinutes);

    plan.push({
      id: `plan-${iso}-fiche`,
      date: iso,
      dayLabel,
      subjectId: subject.id,
      title: `Fiche synthétique & Flashcards — ${subject.name}${isWeak ? ' (Priorité)' : ''}`,
      type: 'fiche',
      durationMinutes: ficheMinutes,
      completed: false,
      priority: isWeak ? 'haute' : 'normale',
    });

    if ((offset % 3 === 1 && mistakeCount > 0) || isWeak) {
      plan.push({
        id: `plan-${iso}-err`,
        date: iso,
        dayLabel,
        subjectId: subject.id,
        title: `Révision des erreurs & points faibles — ${subject.name}`,
        type: 'erreurs',
        durationMinutes: practiceMinutes,
        completed: false,
        priority: 'haute',
      });
    } else {
      plan.push({
        id: `plan-${iso}-exo`,
        date: iso,
        dayLabel,
        subjectId: subject.id,
        title: `Session d’exercices ciblés — ${subject.name}`,
        type: 'exercices',
        durationMinutes: practiceMinutes,
        completed: false,
        priority: 'normale',
      });
    }
  }

  return plan;
}
