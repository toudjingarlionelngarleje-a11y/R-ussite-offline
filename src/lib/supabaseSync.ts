import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  AccountRole,
  AppState,
  Fiche,
  OwnerGlobalSettings,
  Question,
  SecurityEvent,
  TwoFactorConfig,
  UserProfile,
} from '../types';
import { applyOwnerEntitlements, isOwnerProfile } from './owner';
import {
  DEFAULT_SECURITY_CONFIG,
  hasPrototypePollution,
  inspectTextInput,
} from './securityFirewall';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Anti-SSRF / Anti-MITM Endpoint Firewall: only trust strict HTTPS Supabase endpoints.
 */
function isTrustedSupabaseUrl(url?: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && parsed.hostname.endsWith('.supabase.co');
  } catch {
    return false;
  }
}

export const isSupabaseConfigured = Boolean(
  isTrustedSupabaseUrl(supabaseUrl) && supabaseAnonKey && supabaseAnonKey.length > 20
);

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
  pulledOwnerSettings?: OwnerGlobalSettings;
  blockedCloudThreats: SecurityEvent[];
  errorMessage?: string;
}

export interface CloudUserRow {
  id: string;
  email: string;
  name: string;
  role: AccountRole;
  category: string;
  country: string;
  plan: 'gratuit' | 'premium';
  streak_days: number;
  updated_at: string;
}

export interface CloudTeacherContentRow {
  id: string;
  kind: string;
  subject_id: string;
  chapter_id: string;
  title: string;
  difficulty: string;
  published_at: string;
}

export interface CloudSecurityLogRow {
  id: string;
  profile_id: string;
  category: string;
  severity: string;
  rule_id: string;
  source: string;
  blocked: boolean;
  created_at: string;
}

export interface OwnerCloudSnapshot {
  ok: boolean;
  users: CloudUserRow[];
  contents: CloudTeacherContentRow[];
  securityLogs: CloudSecurityLogRow[];
  ownerSettings?: OwnerGlobalSettings;
  totalSessionsCount: number;
  totalReportsCount: number;
  errorMessage?: string;
}

/**
 * Real offline-first bidirectional sync with Supabase, protected by a Zero-Trust WAF/Antivirus gate
 * on both outbound writes and inbound teacher content pulls.
 */
export async function syncStateWithSupabase(
  state: AppState,
  activeProfile: UserProfile | null
): Promise<CloudSyncResult> {
  const sb = getSupabaseClient();
  const blockedCloudThreats: SecurityEvent[] = [];
  if (!sb || !activeProfile) {
    return {
      ok: true,
      pushedCounts: { sessions: 0, notes: 0, flashcards: 0, teacherItems: 0, errorReports: 0 },
      pulledQuestions: [],
      pulledFiches: [],
      blockedCloudThreats,
    };
  }

  const secCfg = state.security?.config ?? DEFAULT_SECURITY_CONFIG;

  try {
    // 1. Upsert user profile (sanitized + preserve Owner entitlements & 2FA metadata)
    const ownerFlag = isOwnerProfile(activeProfile);
    const { error: profErr } = await sb.from('user_profiles').upsert({
      id: activeProfile.id,
      email: activeProfile.email,
      name: activeProfile.name,
      role: ownerFlag ? 'owner' : activeProfile.role ?? 'user',
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
      plan: ownerFlag ? 'premium' : activeProfile.plan,
      streak_days: state.streakDays,
      password_hash: activeProfile.passwordHash,
      onboarding_completed: Boolean(activeProfile.onboardingCompleted),
      mfa_required: ownerFlag ? true : Boolean(activeProfile.twoFactor?.required),
      mfa_enabled: Boolean(activeProfile.twoFactor?.enabled),
      mfa_method: activeProfile.twoFactor?.method ?? 'device',
      mfa_webauthn_credential_id: activeProfile.twoFactor?.webauthnCredentialId ?? null,
      mfa_webauthn_device_label: activeProfile.twoFactor?.webauthnDeviceLabel ?? null,
      mfa_pin_hash: activeProfile.twoFactor?.pinHash ?? null,
      mfa_recovery_hashes: activeProfile.twoFactor?.recoveryCodeHashes ?? [],
      mfa_configured_at: activeProfile.twoFactor?.configuredAt ?? null,
      mfa_last_verified_at: activeProfile.twoFactor?.lastVerifiedAt ?? null,
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

    // 3. Upsert personal notes (WAF pre-check)
    let pushedNotes = 0;
    if (state.notes.length > 0) {
      const safeNotes = state.notes.filter((n) => inspectTextInput(n.content, secCfg).safe);
      if (safeNotes.length > 0) {
        const rows = safeNotes.map((n) => ({
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
      const safeReports = state.errorReports.filter((r) => inspectTextInput(r.reason, secCfg).safe);
      if (safeReports.length > 0) {
        const rows = safeReports.map((r) => ({
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

    // 7. Push anonymized high/critical security alerts to Supabase SIEM audit table (best-effort)
    const criticalEvents = (state.security?.events ?? [])
      .filter((ev) => ev.blocked && (ev.severity === 'high' || ev.severity === 'critical'))
      .slice(0, 10);
    if (criticalEvents.length > 0) {
      await sb
        .from('security_audit_logs')
        .upsert(
          criticalEvents.map((ev) => ({
            id: ev.id,
            profile_id: activeProfile.id,
            category: ev.category,
            severity: ev.severity,
            rule_id: ev.ruleId,
            source: ev.source,
            blocked: ev.blocked,
            created_at: ev.timestamp,
          }))
        )
        .then(() => undefined);
    }

    // 8. Pull latest published teacher content from Supabase with Zero-Trust WAF & Antivirus inspection
    const { data: remoteContents } = await sb
      .from('teacher_contents')
      .select('id, kind, payload_json')
      .order('published_at', { ascending: false })
      .limit(200);

    const pulledQuestions: Question[] = [];
    const pulledFiches: Fiche[] = [];
    if (remoteContents) {
      for (const row of remoteContents) {
        if (!row.payload_json) continue;

        if (secCfg.zeroTrustCloudValidation) {
          if (hasPrototypePollution(row.payload_json)) {
            blockedCloudThreats.push({
              id: `sec-cloud-proto-${Date.now()}-${row.id}`,
              timestamp: new Date().toISOString(),
              category: 'ZERO_TRUST_CLOUD',
              severity: 'critical',
              source: 'Synchronisation Cloud Zero-Trust',
              ruleId: 'ZT-PROTO-001',
              description: `Contenu distant (${row.id}) rejeté pour pollution de prototype.`,
              blocked: true,
            });
            continue;
          }
          const serialized = JSON.stringify(row.payload_json);
          const scan = inspectTextInput(serialized, secCfg, 30000);
          if (!scan.safe) {
            blockedCloudThreats.push({
              id: `sec-cloud-waf-${Date.now()}-${row.id}`,
              timestamp: new Date().toISOString(),
              category: 'ZERO_TRUST_CLOUD',
              severity: scan.severity ?? 'high',
              source: 'Synchronisation Cloud Zero-Trust',
              ruleId: scan.ruleId ?? 'ZT-WAF-001',
              description: `Contenu Cloud (${row.id}) mis en quarantaine : ${scan.description}`,
              blocked: true,
            });
            continue;
          }
        }

        if (row.kind === 'question') {
          pulledQuestions.push(row.payload_json as Question);
        } else if (row.kind === 'fiche') {
          pulledFiches.push(row.payload_json as Fiche);
        }
      }
    }

    // 9. Pull global owner settings (announcements, maintenance, free-premium event)
    let pulledOwnerSettings: OwnerGlobalSettings | undefined;
    const { data: settingsRow } = await sb
      .from('app_owner_settings')
      .select('*')
      .eq('id', 'global')
      .maybeSingle();

    if (settingsRow) {
      pulledOwnerSettings = {
        announcementEnabled: Boolean(settingsRow.announcement_enabled),
        announcementText: String(settingsRow.announcement_text ?? ''),
        announcementTone:
          settingsRow.announcement_tone === 'success' || settingsRow.announcement_tone === 'warning'
            ? settingsRow.announcement_tone
            : 'info',
        maintenanceMode: Boolean(settingsRow.maintenance_mode),
        registrationsOpen: settingsRow.registrations_open !== false,
        freePremiumEvent: Boolean(settingsRow.free_premium_event),
        globalFirewallLevel:
          settingsRow.global_firewall_level === 'standard' ||
          settingsRow.global_firewall_level === 'forteresse'
            ? settingsRow.global_firewall_level
            : 'renforce',
        updatedAt: String(settingsRow.updated_at ?? new Date().toISOString()),
      };
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
      pulledOwnerSettings,
      blockedCloudThreats,
    };
  } catch (err) {
    return {
      ok: false,
      pushedCounts: { sessions: 0, notes: 0, flashcards: 0, teacherItems: 0, errorReports: 0 },
      pulledQuestions: [],
      pulledFiches: [],
      blockedCloudThreats,
      errorMessage: err instanceof Error ? err.message : 'Erreur réseau Supabase',
    };
  }
}

export async function fetchOwnerCloudSnapshot(): Promise<OwnerCloudSnapshot> {
  const sb = getSupabaseClient();
  if (!sb) {
    return {
      ok: false,
      users: [],
      contents: [],
      securityLogs: [],
      totalSessionsCount: 0,
      totalReportsCount: 0,
      errorMessage: 'Supabase non configuré',
    };
  }

  try {
    const [usersRes, contentsRes, logsRes, settingsRes, sessionsCountRes, reportsCountRes] =
      await Promise.all([
        sb
          .from('user_profiles')
          .select('id, email, name, role, category, country, plan, streak_days, updated_at')
          .order('updated_at', { ascending: false })
          .limit(100),
        sb
          .from('teacher_contents')
          .select('id, kind, subject_id, chapter_id, title, difficulty, published_at')
          .order('published_at', { ascending: false })
          .limit(100),
        sb
          .from('security_audit_logs')
          .select('id, profile_id, category, severity, rule_id, source, blocked, created_at')
          .order('created_at', { ascending: false })
          .limit(50),
        sb.from('app_owner_settings').select('*').eq('id', 'global').maybeSingle(),
        sb.from('study_sessions').select('id', { count: 'exact', head: true }),
        sb.from('error_reports').select('id', { count: 'exact', head: true }),
      ]);

    const settingsRow = settingsRes.data;
    const ownerSettings: OwnerGlobalSettings | undefined = settingsRow
      ? {
          announcementEnabled: Boolean(settingsRow.announcement_enabled),
          announcementText: String(settingsRow.announcement_text ?? ''),
          announcementTone:
            settingsRow.announcement_tone === 'success' ||
            settingsRow.announcement_tone === 'warning'
              ? settingsRow.announcement_tone
              : 'info',
          maintenanceMode: Boolean(settingsRow.maintenance_mode),
          registrationsOpen: settingsRow.registrations_open !== false,
          freePremiumEvent: Boolean(settingsRow.free_premium_event),
          globalFirewallLevel:
            settingsRow.global_firewall_level === 'standard' ||
            settingsRow.global_firewall_level === 'forteresse'
              ? settingsRow.global_firewall_level
              : 'renforce',
          updatedAt: String(settingsRow.updated_at ?? new Date().toISOString()),
        }
      : undefined;

    return {
      ok: true,
      users: (usersRes.data ?? []) as CloudUserRow[],
      contents: (contentsRes.data ?? []) as CloudTeacherContentRow[],
      securityLogs: (logsRes.data ?? []) as CloudSecurityLogRow[],
      ownerSettings,
      totalSessionsCount: sessionsCountRes.count ?? 0,
      totalReportsCount: reportsCountRes.count ?? 0,
    };
  } catch (err) {
    return {
      ok: false,
      users: [],
      contents: [],
      securityLogs: [],
      totalSessionsCount: 0,
      totalReportsCount: 0,
      errorMessage: err instanceof Error ? err.message : 'Erreur de lecture Cloud',
    };
  }
}

export async function saveOwnerGlobalSettingsToCloud(
  settings: OwnerGlobalSettings
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabaseClient();
  if (!sb) return { ok: true };
  try {
    const { error } = await sb.from('app_owner_settings').upsert({
      id: 'global',
      owner_email: 'toudjingarlionelngarleje@gmail.com',
      announcement_enabled: settings.announcementEnabled,
      announcement_text: settings.announcementText,
      announcement_tone: settings.announcementTone,
      maintenance_mode: settings.maintenanceMode,
      registrations_open: settings.registrationsOpen,
      free_premium_event: settings.freePremiumEvent,
      global_firewall_level: settings.globalFirewallLevel,
      updated_at: new Date().toISOString(),
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Erreur Cloud' };
  }
}

export async function updateUserRoleOrPlanInCloud(
  userId: string,
  patch: { role?: AccountRole; plan?: 'gratuit' | 'premium' }
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabaseClient();
  if (!sb) return { ok: false, error: 'Supabase non configuré' };
  try {
    const { error } = await sb
      .from('user_profiles')
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq('id', userId);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Erreur mise à jour' };
  }
}

export async function publishOwnerCloudQuestion(
  question: Question,
  authorProfileId: string
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabaseClient();
  if (!sb) return { ok: true };
  try {
    const { error } = await sb.from('teacher_contents').upsert({
      id: `tc-owner-${Date.now()}`,
      kind: 'question',
      subject_id: question.subjectId,
      chapter_id: question.chapterId,
      title: `${question.notion} — Officiel Propriétaire`,
      difficulty: question.difficulty,
      payload_json: question,
      author_profile_id: authorProfileId,
      published_at: new Date().toISOString(),
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Erreur publication Cloud' };
  }
}

export async function deleteCloudTeacherContent(
  contentId: string
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabaseClient();
  if (!sb) return { ok: false, error: 'Supabase non configuré' };
  try {
    const { error } = await sb.from('teacher_contents').delete().eq('id', contentId);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Erreur suppression' };
  }
}

/**
 * Persists a user's encrypted 2FA / MFA configuration to Supabase for multi-device enforcement.
 */
export async function syncTwoFactorConfigToCloud(
  profile: UserProfile
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabaseClient();
  if (!sb || !profile.twoFactor) return { ok: true };
  try {
    const ownerFlag = isOwnerProfile(profile);
    const { error } = await sb
      .from('user_profiles')
      .update({
        mfa_required: ownerFlag ? true : profile.twoFactor.required,
        mfa_enabled: profile.twoFactor.enabled,
        mfa_method: profile.twoFactor.method,
        mfa_webauthn_credential_id: profile.twoFactor.webauthnCredentialId ?? null,
        mfa_webauthn_device_label: profile.twoFactor.webauthnDeviceLabel ?? null,
        mfa_pin_hash: profile.twoFactor.pinHash ?? null,
        mfa_recovery_hashes: profile.twoFactor.recoveryCodeHashes ?? [],
        mfa_configured_at: profile.twoFactor.configuredAt ?? null,
        mfa_last_verified_at: profile.twoFactor.lastVerifiedAt ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq('email', profile.email.toLowerCase());
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Erreur sync 2FA Cloud' };
  }
}

/**
 * Fetches existing 2FA / MFA configuration from Supabase so a new device cannot bypass 2FA.
 */
export async function fetchProfileMfaFromCloud(
  email: string
): Promise<TwoFactorConfig | null> {
  const sb = getSupabaseClient();
  if (!sb || !email) return null;
  try {
    const { data, error } = await sb
      .from('user_profiles')
      .select(
        'mfa_required, mfa_enabled, mfa_method, mfa_webauthn_credential_id, mfa_webauthn_device_label, mfa_pin_hash, mfa_recovery_hashes, mfa_configured_at, mfa_last_verified_at'
      )
      .eq('email', email.trim().toLowerCase())
      .maybeSingle();
    if (error || !data) return null;
    if (!data.mfa_required && !data.mfa_enabled) return null;
    return {
      required: Boolean(data.mfa_required),
      enabled: Boolean(data.mfa_enabled),
      method: data.mfa_method === 'pin' ? 'pin' : 'device',
      webauthnCredentialId: data.mfa_webauthn_credential_id ?? undefined,
      webauthnDeviceLabel: data.mfa_webauthn_device_label ?? undefined,
      pinHash: data.mfa_pin_hash ?? undefined,
      recoveryCodeHashes: Array.isArray(data.mfa_recovery_hashes)
        ? (data.mfa_recovery_hashes as string[])
        : [],
      configuredAt: data.mfa_configured_at ?? undefined,
      lastVerifiedAt: data.mfa_last_verified_at ?? undefined,
    };
  } catch {
    return null;
  }
}

export async function saveActiveMethodSessionToCloud(
  profileId: string | undefined,
  record: {
    id: string;
    mode: string;
    subjectId: string;
    chapterId: string;
    chapterTitle: string;
    scorePercent: number;
    gradeOutOf20?: number;
    durationSeconds: number;
    notesPreview?: string;
    completedAt: string;
  }
): Promise<boolean> {
  const sb = getSupabaseClient();
  if (!sb) return false;
  try {
    const { error } = await sb.from('active_method_sessions').upsert(
      {
        id: record.id,
        profile_id: profileId ?? 'guest',
        method_mode: record.mode,
        subject_id: record.subjectId,
        chapter_id: record.chapterId,
        chapter_title: record.chapterTitle.slice(0, 240),
        score_percent: Math.max(0, Math.min(100, Math.round(record.scorePercent))),
        grade_out_of_20: record.gradeOutOf20 ?? null,
        duration_seconds: Math.max(0, Math.round(record.durationSeconds)),
        notes_preview: record.notesPreview ? record.notesPreview.slice(0, 400) : null,
        completed_at: record.completedAt,
      },
      { onConflict: 'id' }
    );
    return !error;
  } catch {
    return false;
  }
}

/**
 * Checks whether an account already exists in Supabase Cloud for the given email.
 */
export async function checkCloudEmailExists(email: string): Promise<boolean> {
  const sb = getSupabaseClient();
  if (!sb || !email) return false;
  try {
    const { data, error } = await sb
      .from('user_profiles')
      .select('id')
      .eq('email', email.trim().toLowerCase())
      .maybeSingle();
    return !error && Boolean(data?.id);
  } catch {
    return false;
  }
}

/**
 * Persists a newly registered real user profile (including PBKDF2 password hash) to Supabase Cloud
 * so the user can directly sign into their existing account from any device without re-registering.
 */
export async function upsertProfileToCloud(profile: UserProfile): Promise<boolean> {
  const sb = getSupabaseClient();
  if (!sb) return false;
  try {
    const ownerFlag = isOwnerProfile(profile);
    const { error } = await sb.from('user_profiles').upsert({
      id: profile.id,
      email: profile.email.trim().toLowerCase(),
      name: profile.name,
      role: ownerFlag ? 'owner' : profile.role ?? 'user',
      category: profile.category,
      country: profile.country,
      study_level: profile.studyLevel,
      exam_id: profile.examId,
      selected_subject_ids: profile.selectedSubjectIds,
      exam_date: profile.examDate,
      current_level: profile.currentLevel,
      daily_minutes: profile.dailyMinutes,
      rest_days: profile.restDays,
      target_score: profile.targetScore,
      plan: ownerFlag ? 'premium' : profile.plan,
      streak_days: 1,
      password_hash: profile.passwordHash,
      onboarding_completed: Boolean(profile.onboardingCompleted),
      mfa_required: ownerFlag ? true : Boolean(profile.twoFactor?.required),
      mfa_enabled: Boolean(profile.twoFactor?.enabled),
      mfa_method: profile.twoFactor?.method ?? 'device',
      updated_at: new Date().toISOString(),
    });
    return !error;
  } catch {
    return false;
  }
}

/**
 * Fetches an existing user profile from Supabase Cloud by email so an existing user
 * opening the link on a new browser or device can log straight into their account.
 */
export async function fetchCloudProfileByEmail(email: string): Promise<UserProfile | null> {
  const sb = getSupabaseClient();
  if (!sb || !email) return null;
  try {
    const { data, error } = await sb
      .from('user_profiles')
      .select(
        'id, email, name, role, category, country, study_level, exam_id, selected_subject_ids, exam_date, current_level, daily_minutes, rest_days, target_score, plan, password_hash, onboarding_completed, created_at, mfa_required, mfa_enabled, mfa_method, mfa_webauthn_credential_id, mfa_webauthn_device_label, mfa_pin_hash, mfa_recovery_hashes, mfa_configured_at, mfa_last_verified_at'
      )
      .eq('email', email.trim().toLowerCase())
      .maybeSingle();
    if (error || !data) return null;

    const twoFactor: TwoFactorConfig | undefined =
      data.mfa_required || data.mfa_enabled
        ? {
            required: Boolean(data.mfa_required),
            enabled: Boolean(data.mfa_enabled),
            method: data.mfa_method === 'pin' ? 'pin' : 'device',
            webauthnCredentialId: data.mfa_webauthn_credential_id ?? undefined,
            webauthnDeviceLabel: data.mfa_webauthn_device_label ?? undefined,
            pinHash: data.mfa_pin_hash ?? undefined,
            recoveryCodeHashes: Array.isArray(data.mfa_recovery_hashes)
              ? (data.mfa_recovery_hashes as string[])
              : [],
            configuredAt: data.mfa_configured_at ?? undefined,
            lastVerifiedAt: data.mfa_last_verified_at ?? undefined,
          }
        : undefined;

    return applyOwnerEntitlements({
      id: String(data.id),
      name: String(data.name ?? 'Étudiant'),
      email: String(data.email).toLowerCase(),
      passwordHash: String(data.password_hash ?? ''),
      role: (data.role as AccountRole) ?? 'user',
      twoFactor,
      category: (data.category as UserProfile['category']) ?? 'lyceen',
      country: String(data.country ?? 'Tchad'),
      studyLevel: String(data.study_level ?? 'Terminale (Baccalauréat)'),
      examId: String(data.exam_id ?? 'bac-scientifique'),
      selectedSubjectIds: Array.isArray(data.selected_subject_ids)
        ? (data.selected_subject_ids as string[])
        : ['maths', 'physique', 'svt'],
      examDate: String(data.exam_date ?? new Date(Date.now() + 60 * 86400000).toISOString().slice(0, 10)),
      currentLevel: (data.current_level as UserProfile['currentLevel']) ?? 'intermediaire',
      dailyMinutes: Number(data.daily_minutes ?? 45),
      restDays: Array.isArray(data.rest_days) ? (data.rest_days as number[]) : [0],
      targetScore: Number(data.target_score ?? 70),
      plan: data.plan === 'premium' ? 'premium' : 'gratuit',
      createdAt: String(data.created_at ?? new Date().toISOString()),
      onboardingCompleted: data.onboarding_completed !== false,
    });
  } catch {
    return null;
  }
}


