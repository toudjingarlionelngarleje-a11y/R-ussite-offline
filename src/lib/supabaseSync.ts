import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  AccountRole,
  AppState,
  DiagnosticResult,
  Fiche,
  FlashcardProgress,
  HighlightItem,
  OwnerGlobalSettings,
  PersonalNote,
  Question,
  SecurityEvent,
  SessionRecord,
  StudyPlanItem,
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

export interface PortableCloudAccountData {
  completedCourseIds: string[];
  /** v33.0 — progression des parcours de révision guidés. */
  revisionPathProgress?: Record<string, string[]>;
  favorites: AppState['favorites'];
  sessions: SessionRecord[];
  flashcardProgress: Record<string, FlashcardProgress>;
  notes: PersonalNote[];
  highlights: HighlightItem[];
  studyPlan: StudyPlanItem[];
  streakDays: number;
  dailyChallengeCompletedDate: string | null;
  diagnosticResult: DiagnosticResult | null;
  fatigueLevel: AppState['fatigueLevel'];
  planMode: AppState['planMode'];
  updatedAt: string;
}

export interface CloudAccountBundle {
  profile: UserProfile;
  needsCloudPasswordActivation: boolean;
  cloudData: PortableCloudAccountData;
}

export function buildPortableCloudSnapshot(state: AppState): PortableCloudAccountData {
  return {
    completedCourseIds: Array.isArray(state.completedCourseIds)
      ? state.completedCourseIds.slice(-2000)
      : [],
    revisionPathProgress: Object.fromEntries(
      Object.entries(state.revisionPathProgress ?? {}).map(([pathId, steps]) => [
        pathId,
        Array.isArray(steps) ? steps.slice(-500) : [],
      ])
    ),
    favorites: {
      annales: state.favorites?.annales?.slice(-300) ?? [],
      fiches: state.favorites?.fiches?.slice(-500) ?? [],
      courses: state.favorites?.courses?.slice(-500) ?? [],
      questions: state.favorites?.questions?.slice(-500) ?? [],
    },
    sessions: Array.isArray(state.sessions) ? state.sessions.slice(-150) : [],
    flashcardProgress: state.flashcardProgress ?? {},
    notes: Array.isArray(state.notes) ? state.notes.slice(-300) : [],
    highlights: Array.isArray(state.highlights) ? state.highlights.slice(-300) : [],
    studyPlan: Array.isArray(state.studyPlan) ? state.studyPlan.slice(-200) : [],
    streakDays: Math.max(1, Number(state.streakDays ?? 1)),
    dailyChallengeCompletedDate: state.dailyChallengeCompletedDate ?? null,
    diagnosticResult: state.diagnosticResult ?? null,
    fatigueLevel: state.fatigueLevel ?? 'normal',
    planMode: state.planMode ?? 'standard',
    updatedAt: new Date().toISOString(),
  };
}

function isUsablePasswordHash(hash?: string | null): boolean {
  if (!hash || typeof hash !== 'string') return false;
  const trimmed = hash.trim();
  return trimmed.length >= 16 && trimmed !== 'demo_hashed_local';
}

function buildSafeProfileUpsertRow(
  profile: UserProfile,
  existingCloudRow: Record<string, unknown> | null,
  cloudSnapshot?: PortableCloudAccountData,
  streakDaysOverride?: number
): Record<string, unknown> {
  const normalizedProfile = applyOwnerEntitlements(profile);
  const ownerFlag = isOwnerProfile(normalizedProfile);
  const canonicalId =
    existingCloudRow && typeof existingCloudRow.id === 'string' && existingCloudRow.id.trim()
      ? existingCloudRow.id.trim()
      : normalizedProfile.id;

  const existingPwd =
    existingCloudRow && typeof existingCloudRow.password_hash === 'string'
      ? existingCloudRow.password_hash
      : null;
  const effectivePasswordHash = isUsablePasswordHash(normalizedProfile.passwordHash)
    ? normalizedProfile.passwordHash
    : isUsablePasswordHash(existingPwd)
      ? existingPwd
      : null;

  const localMfaEnabled = Boolean(normalizedProfile.twoFactor?.enabled);
  const cloudMfaEnabled = Boolean(existingCloudRow?.mfa_enabled);
  const preserveCloudMfa = cloudMfaEnabled && !localMfaEnabled;

  const row: Record<string, unknown> = {
    id: canonicalId,
    email: normalizedProfile.email.trim().toLowerCase(),
    name: normalizedProfile.name,
    role: ownerFlag ? 'owner' : normalizedProfile.role ?? 'user',
    category: normalizedProfile.category,
    country: normalizedProfile.country,
    study_level: normalizedProfile.studyLevel,
    exam_id: normalizedProfile.examId,
    selected_subject_ids: normalizedProfile.selectedSubjectIds,
    exam_date: normalizedProfile.examDate,
    current_level: normalizedProfile.currentLevel,
    daily_minutes: normalizedProfile.dailyMinutes,
    rest_days: normalizedProfile.restDays,
    target_score: normalizedProfile.targetScore,
    plan: ownerFlag ? 'premium' : normalizedProfile.plan,
    streak_days: Math.max(
      1,
      Number(streakDaysOverride ?? existingCloudRow?.streak_days ?? 1)
    ),
    password_hash: effectivePasswordHash,
    onboarding_completed: Boolean(normalizedProfile.onboardingCompleted),
    cloud_connected: true,
    cloud_migrated_at:
      (existingCloudRow?.cloud_migrated_at as string | undefined) ?? new Date().toISOString(),
    mfa_required: ownerFlag
      ? true
      : Boolean(normalizedProfile.twoFactor?.required || existingCloudRow?.mfa_required),
    mfa_enabled: preserveCloudMfa ? true : localMfaEnabled,
    mfa_method: preserveCloudMfa
      ? (existingCloudRow?.mfa_method as string | undefined) ?? 'pin'
      : normalizedProfile.twoFactor?.method ?? 'device',
    mfa_webauthn_credential_id: preserveCloudMfa
      ? (existingCloudRow?.mfa_webauthn_credential_id as string | null | undefined) ?? null
      : normalizedProfile.twoFactor?.webauthnCredentialId ?? null,
    mfa_webauthn_device_label: preserveCloudMfa
      ? (existingCloudRow?.mfa_webauthn_device_label as string | null | undefined) ?? null
      : normalizedProfile.twoFactor?.webauthnDeviceLabel ?? null,
    mfa_pin_hash: preserveCloudMfa
      ? (existingCloudRow?.mfa_pin_hash as string | null | undefined) ?? null
      : normalizedProfile.twoFactor?.pinHash ?? null,
    mfa_recovery_hashes: preserveCloudMfa
      ? (existingCloudRow?.mfa_recovery_hashes as string[] | undefined) ?? []
      : normalizedProfile.twoFactor?.recoveryCodeHashes ?? [],
    mfa_configured_at: preserveCloudMfa
      ? (existingCloudRow?.mfa_configured_at as string | null | undefined) ?? null
      : normalizedProfile.twoFactor?.configuredAt ?? null,
    mfa_last_verified_at:
      normalizedProfile.twoFactor?.lastVerifiedAt ??
      (existingCloudRow?.mfa_last_verified_at as string | null | undefined) ??
      null,
    updated_at: new Date().toISOString(),
  };

  if (cloudSnapshot) {
    row.cloud_state_json = cloudSnapshot;
  }
  return row;
}

async function findExistingCloudRowByEmail(
  sb: SupabaseClient,
  email: string
): Promise<Record<string, unknown> | null> {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail) return null;
  const { data, error } = await sb
    .from('user_profiles')
    .select(
      'id, email, name, role, category, country, study_level, exam_id, selected_subject_ids, exam_date, current_level, daily_minutes, rest_days, target_score, plan, streak_days, password_hash, onboarding_completed, cloud_connected, cloud_migrated_at, cloud_state_json, created_at, updated_at, mfa_required, mfa_enabled, mfa_method, mfa_webauthn_credential_id, mfa_webauthn_device_label, mfa_pin_hash, mfa_recovery_hashes, mfa_configured_at, mfa_last_verified_at'
    )
    .ilike('email', cleanEmail)
    .order('updated_at', { ascending: false })
    .limit(5);
  if (error || !data || data.length === 0) return null;
  // Prefer owner row if multiple exist for same email, otherwise most recently updated
  const ownerRow = data.find((r) => r.role === 'owner');
  return (ownerRow ?? data[0]) as Record<string, unknown>;
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
    // 1. Canonicalize & upsert user profile + full portable cloud snapshot (preserves Owner entitlements & Cloud MFA)
    const existingCloud = await findExistingCloudRowByEmail(sb, activeProfile.email);
    const portableSnapshot = buildPortableCloudSnapshot(state);
    const profileRow = buildSafeProfileUpsertRow(
      activeProfile,
      existingCloud,
      portableSnapshot,
      state.streakDays
    );
    const canonicalProfileId = String(profileRow.id);
    const { error: profErr } = await sb.from('user_profiles').upsert(profileRow);
    if (profErr) throw profErr;

    // 2. Upsert sessions
    let pushedSessions = 0;
    if (state.sessions.length > 0) {
      const rows = state.sessions.map((s) => ({
        id: s.id,
        profile_id: canonicalProfileId,
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
          profile_id: canonicalProfileId,
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
        id: `${canonicalProfileId}:${fc.cardId}`,
        profile_id: canonicalProfileId,
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
          profile_id: canonicalProfileId,
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
    const existing = await findExistingCloudRowByEmail(sb, email);
    return Boolean(existing?.id);
  } catch {
    return false;
  }
}

/**
 * Persists a real user profile (including PBKDF2 password hash) to Supabase Cloud
 * without creating duplicate rows for the same email and without overwriting Cloud MFA.
 */
export async function upsertProfileToCloud(
  profile: UserProfile,
  cloudSnapshot?: PortableCloudAccountData,
  streakDaysOverride?: number
): Promise<{ ok: boolean; canonicalId: string; error?: string }> {
  const sb = getSupabaseClient();
  if (!sb) return { ok: false, canonicalId: profile.id, error: 'Supabase non configuré.' };
  try {
    const existing = await findExistingCloudRowByEmail(sb, profile.email);
    const row = buildSafeProfileUpsertRow(profile, existing, cloudSnapshot, streakDaysOverride);
    const { data, error } = await sb
      .from('user_profiles')
      .upsert(row, { onConflict: 'id' })
      .select('id')
      .maybeSingle();
    if (error) {
      return { ok: false, canonicalId: String(row.id), error: error.message };
    }
    return { ok: true, canonicalId: String(data?.id ?? row.id) };
  } catch (err) {
    return {
      ok: false,
      canonicalId: profile.id,
      error: err instanceof Error ? err.message : 'Erreur réseau Cloud.',
    };
  }
}

/**
 * Guarantees automatic Cloud registration for every newly created account with automatic retries
 * (3 attempts with short backoff) so transient mobile network glitches never drop a registration.
 */
export async function registerProfileToCloudWithRetry(
  profile: UserProfile,
  cloudSnapshot?: PortableCloudAccountData,
  maxAttempts = 3
): Promise<{ ok: boolean; canonicalId: string; attempts: number; error?: string }> {
  let lastError: string | undefined;
  let canonicalId = profile.id;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const res = await upsertProfileToCloud(profile, cloudSnapshot, 1);
    canonicalId = res.canonicalId;
    if (res.ok) {
      return { ok: true, canonicalId, attempts: attempt };
    }
    lastError = res.error;
    if (attempt < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 450));
    }
  }
  return { ok: false, canonicalId, attempts: maxAttempts, error: lastError };
}

/**
 * Automatically connects ALL locally saved profiles (including legacy accounts created before v17
 * and the Owner account) to Supabase Cloud so they can be recovered from any device.
 */
export async function syncAllLocalProfilesToCloud(
  profiles: UserProfile[],
  activeProfileId: string | null,
  state: AppState
): Promise<{ syncedCount: number; canonicalIdMap: Record<string, string> }> {
  const sb = getSupabaseClient();
  const canonicalIdMap: Record<string, string> = {};
  if (!sb || !profiles.length) return { syncedCount: 0, canonicalIdMap };

  let syncedCount = 0;
  const snapshot = buildPortableCloudSnapshot(state);

  for (const prof of profiles) {
    if (!prof.email || prof.email.toLowerCase().includes('demo')) continue;
    const isActive = prof.id === activeProfileId;
    const res = await upsertProfileToCloud(
      prof,
      isActive ? snapshot : undefined,
      isActive ? state.streakDays : undefined
    );
    if (res.ok) {
      syncedCount += 1;
      if (res.canonicalId && res.canonicalId !== prof.id) {
        canonicalIdMap[prof.id] = res.canonicalId;
      }
    }
  }
  return { syncedCount, canonicalIdMap };
}

function hydrateProfileFromCloudRow(data: Record<string, unknown>): UserProfile {
  const twoFactor: TwoFactorConfig | undefined =
    data.mfa_required || data.mfa_enabled
      ? {
          required: Boolean(data.mfa_required),
          enabled: Boolean(data.mfa_enabled),
          method: data.mfa_method === 'pin' ? 'pin' : 'device',
          webauthnCredentialId: (data.mfa_webauthn_credential_id as string | null) ?? undefined,
          webauthnDeviceLabel: (data.mfa_webauthn_device_label as string | null) ?? undefined,
          pinHash: (data.mfa_pin_hash as string | null) ?? undefined,
          recoveryCodeHashes: Array.isArray(data.mfa_recovery_hashes)
            ? (data.mfa_recovery_hashes as string[])
            : [],
          configuredAt: (data.mfa_configured_at as string | null) ?? undefined,
          lastVerifiedAt: (data.mfa_last_verified_at as string | null) ?? undefined,
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
    examDate: String(
      data.exam_date ?? new Date(Date.now() + 60 * 86400000).toISOString().slice(0, 10)
    ),
    currentLevel: (data.current_level as UserProfile['currentLevel']) ?? 'intermediaire',
    dailyMinutes: Number(data.daily_minutes ?? 45),
    restDays: Array.isArray(data.rest_days) ? (data.rest_days as number[]) : [0],
    targetScore: Number(data.target_score ?? 70),
    plan: data.plan === 'premium' ? 'premium' : 'gratuit',
    createdAt: String(data.created_at ?? new Date().toISOString()),
    onboardingCompleted: data.onboarding_completed !== false,
  });
}

/**
 * Fetches an existing user profile from Supabase Cloud by email so an existing user
 * opening the link on a new browser or device can log straight into their account.
 */
export async function fetchCloudProfileByEmail(email: string): Promise<UserProfile | null> {
  const sb = getSupabaseClient();
  if (!sb || !email) return null;
  try {
    const row = await findExistingCloudRowByEmail(sb, email);
    if (!row) return null;
    return hydrateProfileFromCloudRow(row);
  } catch {
    return null;
  }
}

/**
 * Fetches the COMPLETE cloud account bundle (profile + MFA + legacy password activation status +
 * full portable progress merged from cloud_state_json, study_sessions, personal_notes, flashcard_reviews).
 */
export async function fetchCloudAccountBundleByEmail(
  email: string
): Promise<CloudAccountBundle | null> {
  const sb = getSupabaseClient();
  if (!sb || !email) return null;
  try {
    const row = await findExistingCloudRowByEmail(sb, email);
    if (!row) return null;

    const profile = hydrateProfileFromCloudRow(row);
    const needsCloudPasswordActivation = !isUsablePasswordHash(profile.passwordHash);

    // Extract snapshot from cloud_state_json if present
    const rawJson =
      row.cloud_state_json && typeof row.cloud_state_json === 'object'
        ? (row.cloud_state_json as Partial<PortableCloudAccountData>)
        : {};

    // Also pull relational cloud progress rows (study_sessions, personal_notes, flashcard_reviews)
    const [sessionsRes, notesRes, fcRes] = await Promise.all([
      sb
        .from('study_sessions')
        .select(
          'id, mode, title, annale_id, subject_id, started_at, completed_at, total_time_seconds, remaining_seconds, score_percent, correct_count, total_count, answers_json'
        )
        .eq('profile_id', profile.id)
        .order('completed_at', { ascending: false })
        .limit(150),
      sb
        .from('personal_notes')
        .select('id, target_type, target_id, target_title, subject_id, content, created_at, updated_at')
        .eq('profile_id', profile.id)
        .order('updated_at', { ascending: false })
        .limit(300),
      sb
        .from('flashcard_reviews')
        .select('card_id, mastery, interval_days, ease_factor, repetitions, next_review_at, last_reviewed_at')
        .eq('profile_id', profile.id)
        .limit(500),
    ]);

    // Merge sessions by ID
    const sessionMap = new Map<string, SessionRecord>();
    if (Array.isArray(rawJson.sessions)) {
      for (const s of rawJson.sessions) {
        if (s?.id) sessionMap.set(s.id, s);
      }
    }
    if (!sessionsRes.error && Array.isArray(sessionsRes.data)) {
      for (const s of sessionsRes.data) {
        sessionMap.set(String(s.id), {
          id: String(s.id),
          mode: (s.mode as SessionRecord['mode']) ?? 'entrainement',
          title: String(s.title ?? 'Session Cloud'),
          annaleId: s.annale_id ? String(s.annale_id) : undefined,
          subjectId: s.subject_id ? String(s.subject_id) : undefined,
          startedAt: String(s.started_at ?? new Date().toISOString()),
          completedAt: String(s.completed_at ?? new Date().toISOString()),
          totalTimeSeconds: Number(s.total_time_seconds ?? 0),
          remainingSeconds:
            s.remaining_seconds != null ? Number(s.remaining_seconds) : undefined,
          scorePercent: Number(s.score_percent ?? 0),
          correctCount: Number(s.correct_count ?? 0),
          totalCount: Number(s.total_count ?? 0),
          answers: Array.isArray(s.answers_json) ? s.answers_json : [],
          synced: true,
        });
      }
    }

    // Merge notes by ID
    const noteMap = new Map<string, PersonalNote>();
    if (Array.isArray(rawJson.notes)) {
      for (const n of rawJson.notes) {
        if (n?.id) noteMap.set(n.id, n);
      }
    }
    if (!notesRes.error && Array.isArray(notesRes.data)) {
      for (const n of notesRes.data) {
        noteMap.set(String(n.id), {
          id: String(n.id),
          targetType: (n.target_type as PersonalNote['targetType']) ?? 'course',
          targetId: String(n.target_id ?? ''),
          targetTitle: String(n.target_title ?? 'Note'),
          subjectId: n.subject_id ? String(n.subject_id) : undefined,
          content: String(n.content ?? ''),
          createdAt: String(n.created_at ?? new Date().toISOString()),
          updatedAt: String(n.updated_at ?? new Date().toISOString()),
        });
      }
    }

    // Merge flashcard progress by cardId
    const fcMap: Record<string, FlashcardProgress> = {
      ...(rawJson.flashcardProgress && typeof rawJson.flashcardProgress === 'object'
        ? rawJson.flashcardProgress
        : {}),
    };
    if (!fcRes.error && Array.isArray(fcRes.data)) {
      for (const fc of fcRes.data) {
        const cardId = String(fc.card_id ?? '');
        if (!cardId) continue;
        fcMap[cardId] = {
          cardId,
          mastery: (Number(fc.mastery ?? 0) as FlashcardProgress['mastery']),
          intervalDays: Number(fc.interval_days ?? 1),
          easeFactor: Number(fc.ease_factor ?? 2.5),
          repetitions: Number(fc.repetitions ?? 0),
          nextReviewAt: String(fc.next_review_at ?? new Date().toISOString()),
          lastReviewedAt: String(fc.last_reviewed_at ?? new Date().toISOString()),
        };
      }
    }

    const cloudData: PortableCloudAccountData = {
      completedCourseIds: Array.isArray(rawJson.completedCourseIds)
        ? rawJson.completedCourseIds
        : [],
      revisionPathProgress:
        rawJson.revisionPathProgress && typeof rawJson.revisionPathProgress === 'object'
          ? Object.fromEntries(
              Object.entries(rawJson.revisionPathProgress as Record<string, unknown>)
                .filter(([, steps]) => Array.isArray(steps))
                .map(([pathId, steps]) => [pathId, (steps as string[]).slice(-500)])
            )
          : {},
      favorites: {
        annales: Array.isArray(rawJson.favorites?.annales) ? rawJson.favorites.annales : [],
        fiches: Array.isArray(rawJson.favorites?.fiches) ? rawJson.favorites.fiches : [],
        courses: Array.isArray(rawJson.favorites?.courses) ? rawJson.favorites.courses : [],
        questions: Array.isArray(rawJson.favorites?.questions) ? rawJson.favorites.questions : [],
      },
      sessions: Array.from(sessionMap.values()).sort((a, b) =>
        b.completedAt.localeCompare(a.completedAt)
      ),
      flashcardProgress: fcMap,
      notes: Array.from(noteMap.values()).sort((a, b) =>
        b.updatedAt.localeCompare(a.updatedAt)
      ),
      highlights: Array.isArray(rawJson.highlights) ? rawJson.highlights : [],
      studyPlan: Array.isArray(rawJson.studyPlan) ? rawJson.studyPlan : [],
      streakDays: Math.max(
        1,
        Number(rawJson.streakDays ?? row.streak_days ?? 1)
      ),
      dailyChallengeCompletedDate: rawJson.dailyChallengeCompletedDate ?? null,
      diagnosticResult: rawJson.diagnosticResult ?? null,
      fatigueLevel: rawJson.fatigueLevel ?? 'normal',
      planMode: rawJson.planMode ?? 'standard',
      updatedAt: String(rawJson.updatedAt ?? row.updated_at ?? new Date().toISOString()),
    };

    return {
      profile,
      needsCloudPasswordActivation,
      cloudData,
    };
  } catch {
    return null;
  }
}

/**
 * Safely attaches a new PBKDF2-SHA256 password hash to an existing legacy Cloud account
 * (created prior to v17 where password_hash was NULL) so the account can now sign in from any device.
 * Strictly guards against overwriting an already-set password_hash.
 */
export async function activateLegacyCloudAccountPassword(
  profileId: string,
  email: string,
  newPasswordHash: string
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabaseClient();
  if (!sb) return { ok: false, error: 'Supabase Cloud indisponible hors ligne.' };
  if (!isUsablePasswordHash(newPasswordHash)) {
    return { ok: false, error: 'Hash de mot de passe invalide.' };
  }
  try {
    const existing = await findExistingCloudRowByEmail(sb, email);
    if (!existing) {
      return { ok: false, error: 'Compte Cloud introuvable.' };
    }
    if (isUsablePasswordHash(existing.password_hash as string | null)) {
      return {
        ok: false,
        error: 'Ce compte possède déjà un mot de passe Cloud actif. Connectez-vous normalement.',
      };
    }
    const targetId = String(existing.id || profileId);
    const { error } = await sb
      .from('user_profiles')
      .update({
        password_hash: newPasswordHash,
        cloud_connected: true,
        cloud_migrated_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', targetId);
    if (error) {
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Erreur réseau.' };
  }
}


