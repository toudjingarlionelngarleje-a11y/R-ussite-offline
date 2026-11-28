import { RevisionPathMode } from '../types';
import { formatDayLabel, formatIsoDate } from './planner';

export interface RevisionScheduleInput {
  mode: RevisionPathMode;
  dayCount: number;
  /** Date d’examen au format YYYY-MM-DD (profil actif). */
  examDate?: string | null;
  /** Jours de repos (0 = dimanche … 6 = samedi), identiques au programme personnalisé. */
  restDays?: number[];
  /** Par défaut : aujourd’hui. */
  from?: Date;
}

export interface RevisionScheduleSlot {
  date: string;
  dayLabel: string;
}

const DAY_MS = 24 * 60 * 60 * 1000;

function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function addDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

/**
 * v34.0 — Répartit les journées d’un parcours guidé dans le programme personnalisé.
 *
 * • Parcours express : les journées se terminent la veille de l’examen (J-3, J-2, J-1)
 *   lorsque la date d’épreuve le permet ; sinon elles démarrent aujourd’hui.
 * • Parcours complet : une journée par jour disponible, en sautant les jours de repos.
 * Aucune date n’est planifiée dans le passé et deux journées ne tombent jamais le même jour.
 */
export function buildRevisionSchedule(input: RevisionScheduleInput): RevisionScheduleSlot[] {
  const dayCount = Math.max(1, input.dayCount);
  const today = startOfDay(input.from ?? new Date());
  const restDays = new Set(input.restDays ?? []);
  const exam = input.examDate ? parseIsoDate(input.examDate) : null;

  const isRest = (date: Date) => restDays.has(date.getDay());
  const iso = (date: Date) => formatIsoDate(date);

  const fill = (start: Date): Date[] => {
    const used = new Set<string>();
    const dates: Date[] = [];
    let cursor = startOfDay(start);
    for (let i = 0; i < dayCount; i += 1) {
      let guard = 0;
      while ((isRest(cursor) || used.has(iso(cursor))) && guard < 30) {
        cursor = addDays(cursor, 1);
        guard += 1;
      }
      used.add(iso(cursor));
      dates.push(new Date(cursor));
      cursor = addDays(cursor, 1);
    }
    return dates;
  };

  let dates: Date[];
  if (input.mode === 'express' && exam && exam.getTime() - today.getTime() >= dayCount * DAY_MS) {
    const anchored = fill(addDays(exam, -dayCount));
    const last = anchored[anchored.length - 1];
    dates = last.getTime() <= addDays(exam, -1).getTime() ? anchored : fill(today);
  } else {
    dates = fill(today);
  }

  return dates.map((date) => ({ date: iso(date), dayLabel: formatDayLabel(iso(date)) }));
}
