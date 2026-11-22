import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AppState, Fiche, Question, UserProfile } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured || !supabaseUrl || !supabaseAnonKey) return null;
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    });
  }
  return client;
}

export interface CloudSyncResult {
  ok: boolean;
  pushedCounts: {
    sessions: number;
    notes: number;
    flashcards: number;
    teacherItems: number;
    errorReports: number;
  };
  pulledQuestions: Question[];
  pulledFiches: Fiche[];
  errorMessage?: string;
}

/**
 * Real offline-first bidirectional sync with Supabase.
 * Pushes local profile, sessions, notes, flashcard SM-2 state, error reports & teacher publications,
 * and pulls any new teacher-published offline content from Supabase.
 */
export async function syncStateWithSupabase(
  state: AppState,
  activeProfile: UserProfile | null
): Promise<CloudSyncResult> {
  const sb = getSupabaseClient();
  if (!sb || !activeProfile) {
    return {
      ok: true,
      pushedCounts: { sessions: 0, notes: 0, flashcards: 0, teacherItems: 0, errorReports: 0 },
      pulledQuestions: [],
      pulledFiches: [],
    };
  }

  try {
    // 1. Upsert user profile
    const { error: profErr } = await sb.from('user_profiles').upsert({
      id: activeProfile.id,
      email: activeProfile.email,
      name: activeProfile.name,
      category: activeProfile.category,
      country: activeProfile.country,
      study_level: activeProfile.studyLevel,
      exam_id: activeProfile.examId,
      selected_subject_ids: activeProfile.selectedSubjectIds,
      exam_date: activeProfile.examDate,
      current_level: activeProfile.currentLevel,
      daily_minutes: activeProfile.dailyMinutes,
      rest_days: activeProfile.restDays,
      target_score: activeProfile.targetScore,
      plan: activeProfile.plan,
      streak_days: state.streakDays,
      updated_at: new Date().toISOString(),
    });
    if (profErr) throw profErr;

    // 2. Upsert sessions
    let pushedSessions = 0;
    if (state.sessions.length > 0) {
      const rows = state.sessions.map((s) => ({
        id: s.id,
        profile_id: activeProfile.id,
        mode: s.mode,
        title: s.title,
        annale_id: s.annaleId ?? null,
        subject_id: s.subjectId ?? null,
        started_at: s.startedAt,
        completed_at: s.completedAt,
        total_time_seconds: s.totalTimeSeconds,
        remaining_seconds: s.remainingSeconds ?? null,
        score_percent: s.scorePercent,
        correct_count: s.correctCount,
        total_count: s.totalCount,
        answers_json: s.answers,
        synced_at: new Date().toISOString(),
      }));
      const { error } = await sb.from('study_sessions').upsert(rows);
      if (error) throw error;
      pushedSessions = rows.length;
    }

    // 3. Upsert personal notes
    let pushedNotes = 0;
    if (state.notes.length > 0) {
      const rows = state.notes.map((n) => ({
        id: n.id,
        profile_id: activeProfile.id,
        target_type: n.targetType,
        target_id: n.targetId,
        target_title: n.targetTitle,
        subject_id: n.subjectId ?? null,
        content: n.content,
        created_at: n.createdAt,
        updated_at: n.updatedAt,
      }));
      const { error } = await sb.from('personal_notes').upsert(rows);
      if (error) throw error;
      pushedNotes = rows.length;
    }

    // 4. Upsert flashcard SM-2 progress
    const fcValues = Object.values(state.flashcardProgress);
    let pushedFlashcards = 0;
    if (fcValues.length > 0) {
      const rows = fcValues.map((fc) => ({
        id: `${activeProfile.id}:${fc.cardId}`,
        profile_id: activeProfile.id,
        card_id: fc.cardId,
        mastery: fc.mastery,
        interval_days: fc.intervalDays,
        ease_factor: fc.easeFactor,
        repetitions: fc.repetitions,
        next_review_at: fc.nextReviewAt,
        last_reviewed_at: fc.lastReviewedAt,
      }));
      const { error } = await sb.from('flashcard_reviews').upsert(rows);
      if (error) throw error;
      pushedFlashcards = rows.length;
    }

    // 5. Upsert error reports
    let pushedReports = 0;
    if (state.errorReports.length > 0) {
      const rows = state.errorReports.map((r) => ({
        id: r.id,
        profile_id: activeProfile.id,
        question_id: r.questionId,
        question_prompt: r.questionPrompt,
        reason: r.reason,
        status: r.status,
        created_at: r.createdAt,
      }));
      const { error } = await sb.from('error_reports').upsert(rows);
      if (error) throw error;
      pushedReports = rows.length;
    }

    // 6. Push published teacher drafts
    const publishedDrafts = state.teacherDrafts.filter((d) => d.status === 'publie');
    let pushedTeacher = 0;
    if (publishedDrafts.length > 0) {
      const rows = publishedDrafts.map((d) => ({
        id: d.id,
        kind: d.kind,
        subject_id: d.subjectId,
        chapter_id: d.chapterId,
        title: d.title,
        difficulty: d.difficulty,
        payload_json: d.payload,
        author_profile_id: activeProfile.id,
        published_at: d.createdAt,
      }));
      const { error } = await sb.from('teacher_contents').upsert(rows);
      if (error) throw error;
      pushedTeacher = rows.length;
    }

    // 7. Pull latest published teacher content from Supabase (avoiding duplicates)
    const { data: remoteContents } = await sb
      .from('teacher_contents')
      .select('kind, payload_json')
      .order('published_at', { ascending: false })
      .limit(50);

    const pulledQuestions: Question[] = [];
    const pulledFiches: Fiche[] = [];
    if (remoteContents) {
      for (const row of remoteContents) {
        if (row.kind === 'question' && row.payload_json) {
          pulledQuestions.push(row.payload_json as Question);
        } else if (row.kind === 'fiche' && row.payload_json) {
          pulledFiches.push(row.payload_json as Fiche);
        }
      }
    }

    return {
      ok: true,
      pushedCounts: {
        sessions: pushedSessions,
        notes: pushedNotes,
        flashcards: pushedFlashcards,
        teacherItems: pushedTeacher,
        errorReports: pushedReports,
      },
      pulledQuestions,
      pulledFiches,
    };
  } catch (err) {
    return {
      ok: false,
      pushedCounts: { sessions: 0, notes: 0, flashcards: 0, teacherItems: 0, errorReports: 0 },
      pulledQuestions: [],
      pulledFiches: [],
      errorMessage: err instanceof Error ? err.message : 'Erreur réseau Supabase',
    };
  }
}
