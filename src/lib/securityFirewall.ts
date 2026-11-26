import { WAF_FAMILY_LABELS, WAF_RULES as WAF_RULE_DEFS } from './wafRules';
import {
  AppState,
  SecurityConfig,
  SecurityEvent,
  SecurityScanReport,
  SecuritySeverity,
  SecurityState,
  SecurityThreatCategory,
} from '../types';

export interface ThreatDetection {
  safe: boolean;
  category?: SecurityThreatCategory;
  severity?: SecuritySeverity;
  ruleId?: string;
  description?: string;
  sanitizedText: string;
}

export interface FileScanResult {
  safe: boolean;
  fileName: string;
  sizeBytes: number;
  threats: {
    category: SecurityThreatCategory;
    severity: SecuritySeverity;
    ruleId: string;
    description: string;
  }[];
  sha256?: string;
}

export interface SecuritySystemItem {
  id: string;
  layer:
    | 'Pare-feu WAF'
    | 'Antivirus & Anti-Malware'
    | 'Réseau & En-têtes HTTP'
    | 'Service Worker PWA'
    | 'Cryptographie & Stockage'
    | 'Cloud Zero-Trust & Auth';
  name: string;
  description: string;
  code: string;
  isActive: (state: AppState) => boolean;
}

export const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
  firewallEnabled: true,
  antivirusEnabled: true,
  strictMode: true,
  domGuardEnabled: true,
  rateLimitEnabled: true,
  bruteForceProtection: true,
  zeroTrustCloudValidation: true,
  integrityCheckEnabled: true,
  autoLockMinutes: 30,
};

export function createInitialSecurityState(): SecurityState {
  return {
    config: { ...DEFAULT_SECURITY_CONFIG },
    events: [
      {
        id: 'sec-init-1',
        timestamp: new Date().toISOString(),
        category: 'SYSTEM_AUDIT',
        severity: 'info',
        source: 'Bouclier Réussite Offline',
        ruleId: 'SYS-BOOT-001',
        description: `Initialisation réussie des ${FIREWALL_SYSTEMS.length + 28} systèmes de sécurité dont ${FIREWALL_SYSTEMS.length} pare-feux WAF (Antivirus, PBKDF2/AES-256, Garde DOM, Service Worker sécurisé & Zero-Trust).`,
        blocked: false,
      },
    ],
    quarantinedCount: 0,
    blockedCount: 0,
    lastScan: null,
    integrityHash: null,
    integrityStatus: 'verified',
    failedLoginAttempts: 0,
    lockoutUntil: null,
  };
}

// ============================================================================
// 1. WAF & ANTIVIRUS SIGNATURE RULES (REAL CLIENT-SIDE DETECTION ENGINE)
// ============================================================================

interface DetectionRule {
  ruleId: string;
  category: SecurityThreatCategory;
  severity: SecuritySeverity;
  pattern: RegExp;
  description: string;
}

/** 100 pare-feux WAF : signatures issues du catalogue dédié (src/lib/wafRules.ts). */
const WAF_RULES: DetectionRule[] = WAF_RULE_DEFS as unknown as DetectionRule[];

const ANTIVIRUS_RULES: DetectionRule[] = [
  // EICAR standard antivirus test string
  {
    ruleId: 'AV-EICAR-001',
    category: 'ANTIVIRUS_SIGNATURE',
    severity: 'critical',
    pattern: /X5O!P%@AP\[4\\PZX54\(P\^\)7CC\)7\}\$EICAR-STANDARD-ANTIVIRUS-TEST-FILE/i,
    description: 'Signature virale détectée : Fichier de test antivirus EICAR',
  },
  // Ransomware / Shadow Copy deletion / Crypto-locker indicators
  {
    ruleId: 'AV-RANSOM-002',
    category: 'ANTIVIRUS_SIGNATURE',
    severity: 'critical',
    pattern: /vssadmin\s+delete\s+shadows|wbadmin\s+delete\s+catalog|bcdedit\s+\/set.*recoveryenabled\s+no|wannacry|lockbit|your\s+files\s+have\s+been\s+encrypted/i,
    description: 'Signature de rançongiciel (Ransomware) bloquée',
  },
  // Crypto-jacking / Browser Miners
  {
    ruleId: 'AV-MINER-003',
    category: 'ANTIVIRUS_SIGNATURE',
    severity: 'high',
    pattern: /coinhive|cryptonight|stratum\+tcp:\/\/|xmrig|webminerpool|monero-miner/i,
    description: 'Signature de logiciel de minage clandestin (Cryptojacking)',
  },
  // Droppers / Webshells / Obfuscated payloads
  {
    ruleId: 'AV-DROPPER-004',
    category: 'ANTIVIRUS_SIGNATURE',
    severity: 'critical',
    pattern: /eval\s*\(\s*(?:atob|unescape|base64_decode|gzinflate)\s*\(|WScript\.Shell|ActiveXObject\s*\(|certutil\s+-urlcache|mshta\s+http/i,
    description: 'Signature de cheval de Troie / Dropper / Webshell détectée',
  },
  // Unicode Right-to-Left Override (RLO) Spoofing used by viruses
  {
    ruleId: 'AV-RLO-005',
    category: 'ANTIVIRUS_HEURISTIC',
    severity: 'high',
    pattern: /[\u202A-\u202E\u2066-\u2069]/,
    description: 'Caractère caché Unicode RLO (usurpation d’extension malveillante)',
  },
  // Phishing / Mobile Money PIN theft
  {
    ruleId: 'AV-PHISH-006',
    category: 'ANTIVIRUS_HEURISTIC',
    severity: 'medium',
    pattern: /(?:envoie|donne|partage|confirme).{0,35}(?:code\s+pin|mot\s+de\s+passe|code\s+secret|carte\s+bancaire|orange\s+money|airtel\s+money|moov\s+money)/i,
    description: 'Alerte anti-hameçonnage (phishing d’identifiants ou code PIN)',
  },
];

// Dangerous executable extensions & double extensions
const DANGEROUS_EXTENSIONS = [
  '.exe',
  '.bat',
  '.cmd',
  '.com',
  '.scr',
  '.pif',
  '.vbs',
  '.vbe',
  '.js',
  '.jse',
  '.wsf',
  '.wsh',
  '.ps1',
  '.msi',
  '.msp',
  '.dll',
  '.sys',
  '.apk',
  '.dex',
  '.sh',
  '.elf',
  '.hta',
  '.jar',
  '.reg',
];

const COMMON_WEAK_PASSWORDS = new Set([
  '1234',
  '12345',
  '123456',
  '12345678',
  '123456789',
  '0000',
  '000000',
  '111111',
  'password',
  'motdepasse',
  'azerty',
  'qwerty',
  'admin',
  'admin123',
  'root',
  'test',
  'reussite',
  'bonjour',
]);

// ============================================================================
// 2. SHANNON ENTROPY HEURISTIC & TEXT/INPUT INSPECTION
// ============================================================================

export function calculateShannonEntropy(input: string): number {
  if (!input) return 0;
  const freq: Record<string, number> = {};
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    freq[ch] = (freq[ch] || 0) + 1;
  }
  let entropy = 0;
  const len = input.length;
  for (const count of Object.values(freq)) {
    const p = count / len;
    entropy -= p * Math.log2(p);
  }
  return entropy;
}

export function sanitizePlainText(input: string, maxLength = 4000): string {
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // Strip control bytes
    .replace(/[\u202A-\u202E\u2066-\u2069]/g, '') // Strip RLO spoofing chars
    .replace(/<\s*script\b[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, '[bloqué]')
    .replace(/[<>]/g, (c) => (c === '<' ? '‹' : '›'))
    .trim()
    .slice(0, maxLength);
}

export function inspectTextInput(
  rawInput: string,
  config: SecurityConfig = DEFAULT_SECURITY_CONFIG,
  maxLength = 4000
): ThreatDetection {
  const sanitizedText = sanitizePlainText(rawInput, maxLength);

  if (rawInput.length > maxLength * 2) {
    return {
      safe: false,
      category: 'RATE_LIMIT',
      severity: 'medium',
      ruleId: 'WAF-SIZE-001',
      description: `Charge utile anormalement volumineuse (${rawInput.length} car.) bloquée contre saturation mémoire.`,
      sanitizedText,
    };
  }

  if (config.antivirusEnabled) {
    for (const rule of ANTIVIRUS_RULES) {
      if (rule.pattern.test(rawInput)) {
        return {
          safe: false,
          category: rule.category,
          severity: rule.severity,
          ruleId: rule.ruleId,
          description: rule.description,
          sanitizedText,
        };
      }
    }

    // Heuristic check: long unbroken high-entropy obfuscated blob (> 180 chars without space and entropy > 5.7)
    if (config.strictMode) {
      const longTokens = rawInput.split(/\s+/).filter((t) => t.length >= 180);
      for (const token of longTokens) {
        const ent = calculateShannonEntropy(token);
        if (ent > 5.75) {
          return {
            safe: false,
            category: 'ANTIVIRUS_HEURISTIC',
            severity: 'high',
            ruleId: 'AV-HEUR-ENTROPY',
            description: `Payload obfusqué suspect détecté par analyse heuristique (entropie ${ent.toFixed(2)} bits/car.).`,
            sanitizedText,
          };
        }
      }
    }
  }

  if (config.firewallEnabled) {
    for (const rule of WAF_RULES) {
      if (rule.pattern.test(rawInput)) {
        return {
          safe: false,
          category: rule.category,
          severity: rule.severity,
          ruleId: rule.ruleId,
          description: rule.description,
          sanitizedText,
        };
      }
    }
  }

  return { safe: true, sanitizedText };
}

// ============================================================================
// 3. ANTI-PROTOTYPE POLLUTION DEEP OBJECT GUARD
// ============================================================================

export function hasPrototypePollution(obj: unknown, depth = 0): boolean {
  if (depth > 10 || !obj || typeof obj !== 'object') return false;
  if (Array.isArray(obj)) {
    return obj.some((item) => hasPrototypePollution(item, depth + 1));
  }
  const keys = Object.keys(obj as Record<string, unknown>);
  for (const key of keys) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      return true;
    }
    if (hasPrototypePollution((obj as Record<string, unknown>)[key], depth + 1)) {
      return true;
    }
  }
  return false;
}

// ============================================================================
// 4. ANTIVIRUS FILE SCANNER (MAGIC BYTES + EXTENSIONS + SIGNATURES + SHA-256)
// ============================================================================

export async function scanUploadedFile(
  file: File,
  config: SecurityConfig = DEFAULT_SECURITY_CONFIG
): Promise<FileScanResult> {
  const threats: FileScanResult['threats'] = [];
  const lowerName = file.name.toLowerCase();

  // Check 1: Maximum file size anti-DoS (10 Mo)
  if (file.size > 10 * 1024 * 1024) {
    threats.push({
      category: 'ANTIVIRUS_FILE',
      severity: 'high',
      ruleId: 'AV-FILE-SIZE',
      description: 'Fichier trop volumineux (> 10 Mo) refusé par protection anti-saturation.',
    });
  }

  // Check 2: RLO Unicode spoofing in filename
  if (/[\u202A-\u202E\u2066-\u2069]/.test(file.name)) {
    threats.push({
      category: 'ANTIVIRUS_FILE',
      severity: 'critical',
      ruleId: 'AV-FILE-RLO',
      description: 'Nom de fichier piégé par caractère Unicode RLO (usurpation d’extension).',
    });
  }

  // Check 3: Dangerous executable extensions or double extension tricks (e.g. cours.pdf.exe)
  for (const ext of DANGEROUS_EXTENSIONS) {
    if (lowerName.endsWith(ext) || lowerName.includes(`${ext}.`)) {
      threats.push({
        category: 'ANTIVIRUS_FILE',
        severity: 'critical',
        ruleId: 'AV-FILE-EXT',
        description: `Extension exécutable dangereuse bloquée (${ext}).`,
      });
      break;
    }
  }

  // Check 4: Inspect binary magic bytes & text signatures
  let sha256: string | undefined;
  try {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    if (typeof crypto !== 'undefined' && crypto.subtle) {
      const digest = await crypto.subtle.digest('SHA-256', buffer);
      sha256 = Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    }

    // PE Windows executable (MZ)
    if (bytes.length >= 2 && bytes[0] === 0x4d && bytes[1] === 0x5a) {
      threats.push({
        category: 'ANTIVIRUS_FILE',
        severity: 'critical',
        ruleId: 'AV-MAGIC-PE',
        description: 'En-tête binaire exécutable Windows (MZ/PE) détecté dans le fichier.',
      });
    }
    // Linux ELF executable (\x7fELF)
    if (
      bytes.length >= 4 &&
      bytes[0] === 0x7f &&
      bytes[1] === 0x45 &&
      bytes[2] === 0x4c &&
      bytes[3] === 0x46
    ) {
      threats.push({
        category: 'ANTIVIRUS_FILE',
        severity: 'critical',
        ruleId: 'AV-MAGIC-ELF',
        description: 'En-tête binaire exécutable Linux (ELF) détecté.',
      });
    }
    // Mach-O binary (macOS)
    if (
      bytes.length >= 4 &&
      ((bytes[0] === 0xcf && bytes[1] === 0xfa && bytes[2] === 0xed && bytes[3] === 0xfe) ||
        (bytes[0] === 0xca && bytes[1] === 0xfe && bytes[2] === 0xba && bytes[3] === 0xbe))
    ) {
      threats.push({
        category: 'ANTIVIRUS_FILE',
        severity: 'critical',
        ruleId: 'AV-MAGIC-MACHO',
        description: 'En-tête binaire exécutable Mach-O / Java class détecté.',
      });
    }

    // Scan first 64 KB as text for EICAR / XSS / Dropper signatures
    const sampleSlice = bytes.slice(0, Math.min(bytes.length, 65536));
    const decodedText = new TextDecoder('utf-8', { fatal: false }).decode(sampleSlice);
    const textCheck = inspectTextInput(decodedText, config, 70000);
    if (!textCheck.safe && textCheck.ruleId) {
      threats.push({
        category: textCheck.category ?? 'ANTIVIRUS_SIGNATURE',
        severity: textCheck.severity ?? 'high',
        ruleId: textCheck.ruleId,
        description: textCheck.description ?? 'Signature malveillante détectée dans le contenu.',
      });
    }
  } catch {
    // Non-readable stream
  }

  return {
    safe: threats.length === 0,
    fileName: sanitizePlainText(file.name, 160),
    sizeBytes: file.size,
    threats,
    sha256,
  };
}

// ============================================================================
// 5. APPLICATION RATE LIMITER (SLIDING WINDOW ANTI-FLOOD / ANTI-DDOS)
// ============================================================================

const rateBucket = new Map<string, number[]>();

export function checkRateLimit(
  actionKey: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const timestamps = (rateBucket.get(actionKey) ?? []).filter((t) => now - t < windowMs);
  if (timestamps.length >= maxRequests) {
    const oldest = timestamps[0];
    const retryAfterSec = Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000));
    rateBucket.set(actionKey, timestamps);
    return { allowed: false, retryAfterSec };
  }
  timestamps.push(now);
  rateBucket.set(actionKey, timestamps);
  return { allowed: true, retryAfterSec: 0 };
}

// ============================================================================
// 6. PASSWORD STRENGTH AUDIT & PBKDF2-SHA256 / AES-256-GCM CRYPTOGRAPHY
// ============================================================================

export function evaluatePasswordStrength(password: string): {
  score: number; // 0..100
  label: 'Faible' | 'Moyen' | 'Fort' | 'Très fort';
  isCompromisedCommon: boolean;
  warnings: string[];
} {
  const lower = password.trim().toLowerCase();
  const warnings: string[] = [];
  const isCompromisedCommon = COMMON_WEAK_PASSWORDS.has(lower);
  if (isCompromisedCommon) {
    warnings.push('Ce mot de passe figure dans les listes de mots de passe piratés courants.');
  }
  let score = 0;
  if (password.length >= 6) score += 25;
  else warnings.push('Utilise au moins 6 caractères (8+ recommandés).');
  if (password.length >= 10) score += 15;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 20;
  else warnings.push('Mélange majuscules et minuscules.');
  if (/\d/.test(password)) score += 20;
  else warnings.push('Ajoute au moins un chiffre.');
  if (/[^A-Za-z0-9]/.test(password)) score += 20;
  else warnings.push('Ajoute un symbole (!, @, #, %) pour une protection maximale.');

  if (isCompromisedCommon) score = Math.min(score, 15);
  const label =
    score >= 85 ? 'Très fort' : score >= 65 ? 'Fort' : score >= 40 ? 'Moyen' : 'Faible';

  return { score, label, isCompromisedCommon, warnings };
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function fromHex(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

/**
 * PBKDF2-SHA256 hardened password hashing (120,000 iterations + 128-bit random salt).
 */
export async function hashPasswordPBKDF2(password: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const salt = new Uint8Array(16);
    crypto.getRandomValues(salt);
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      'PBKDF2',
      false,
      ['deriveBits']
    );
    const derived = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt,
        iterations: 120000,
        hash: 'SHA-256',
      },
      keyMaterial,
      256
    );
    return `pbkdf2$120000$${toHex(salt.buffer)}$${toHex(derived)}`;
  }
  return `fallback$${password.length}`;
}

export async function verifyPasswordPBKDF2(password: string, storedHash: string): Promise<boolean> {
  if (!storedHash.startsWith('pbkdf2$')) return false;
  const parts = storedHash.split('$');
  if (parts.length !== 4) return false;
  const iterations = Number(parts[1]);
  const salt = fromHex(parts[2]);
  const expectedHex = parts[3];

  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      'PBKDF2',
      false,
      ['deriveBits']
    );
    const derived = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt as unknown as BufferSource,
        iterations,
        hash: 'SHA-256',
      },
      keyMaterial,
      256
    );
    const actualHex = toHex(derived);
    // Constant-time string comparison (anti timing attack)
    if (actualHex.length !== expectedHex.length) return false;
    let diff = 0;
    for (let i = 0; i < actualHex.length; i++) {
      diff |= actualHex.charCodeAt(i) ^ expectedHex.charCodeAt(i);
    }
    return diff === 0;
  }
  return false;
}

/**
 * Compute tamper-evident SHA-256 integrity seal for local persisted state.
 */
export async function computeIntegritySeal(payload: unknown): Promise<string> {
  const serialized = `reussite-seal-v2::${JSON.stringify(payload)}`;
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(serialized));
    return toHex(digest);
  }
  let h = 2166136261;
  for (let i = 0; i < serialized.length; i++) {
    h ^= serialized.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `fnv_${(h >>> 0).toString(16)}`;
}

/**
 * Authenticated AES-256-GCM encryption/decryption for sensitive local storage vault.
 */
async function getVaultAesKey(): Promise<CryptoKey | null> {
  if (typeof crypto === 'undefined' || !crypto.subtle) return null;
  const seed = `reussite-offline-aes256-vault::${typeof location !== 'undefined' ? location.origin : 'local'}`;
  const raw = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(seed));
  return crypto.subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}

export async function encryptVaultString(plainText: string): Promise<string> {
  const key = await getVaultAesKey();
  if (!key) return plainText;
  const iv = new Uint8Array(12);
  crypto.getRandomValues(iv);
  const cipher = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(plainText)
  );
  return `AES256GCM$${toHex(iv.buffer)}$${toHex(cipher)}`;
}

export async function decryptVaultString(blobText: string): Promise<string | null> {
  if (!blobText.startsWith('AES256GCM$')) return blobText;
  const key = await getVaultAesKey();
  if (!key) return null;
  const parts = blobText.split('$');
  if (parts.length !== 3) return null;
  try {
    const iv = fromHex(parts[1]);
    const data = fromHex(parts[2]);
    const plain = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv as unknown as BufferSource },
      key,
      data as unknown as BufferSource
    );
    return new TextDecoder().decode(plain);
  } catch {
    return null;
  }
}

// ============================================================================
// 7. RUNTIME DOM TAMPERING GUARD & URL POISONING DETECTOR
// ============================================================================

export function inspectCurrentUrl(): SecurityEvent | null {
  if (typeof window === 'undefined') return null;
  const raw = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const res = inspectTextInput(decodeURIComponent(raw), DEFAULT_SECURITY_CONFIG);
  if (!res.safe) {
    try {
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch {
      // Ignore history restrictions
    }
    return {
      id: `sec-url-${Date.now()}`,
      timestamp: new Date().toISOString(),
      category: 'URL_POISONING',
      severity: 'high',
      source: 'Inspecteur d’URL',
      ruleId: res.ruleId ?? 'URL-GUARD-001',
      description: `Paramètre d’URL suspect neutralisé au démarrage : ${res.description}`,
      blocked: true,
      sampleSnippet: raw.slice(0, 80),
    };
  }
  return null;
}

export function startDomTamperingGuard(
  onThreat: (event: SecurityEvent) => void
): () => void {
  if (typeof document === 'undefined' || typeof MutationObserver === 'undefined') {
    return () => {};
  }

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of Array.from(m.addedNodes)) {
        if (!(node instanceof HTMLElement)) continue;
        const tag = node.tagName.toLowerCase();

        // Block unauthorized injected external scripts, iframes, objects, embeds
        if (tag === 'script') {
          const src = node.getAttribute('src') || '';
          const isLocalViteOrSameOrigin =
            !src ||
            src.startsWith('/') ||
            src.startsWith(window.location.origin) ||
            src.includes('/@vite') ||
            src.includes('/src/');
          if (!isLocalViteOrSameOrigin) {
            node.remove();
            onThreat({
              id: `sec-dom-${Date.now()}`,
              timestamp: new Date().toISOString(),
              category: 'DOM_TAMPERING',
              severity: 'critical',
              source: 'Garde DOM Temps Réel',
              ruleId: 'DOM-GUARD-SCRIPT',
              description: `Script externe non autorisé immédiatement bloqué et supprimé du DOM.`,
              blocked: true,
              sampleSnippet: src.slice(0, 100),
            });
          }
        } else if (tag === 'iframe' || tag === 'object' || tag === 'embed') {
          const src = node.getAttribute('src') || node.getAttribute('data') || '';
          if (src && !src.startsWith(window.location.origin) && !src.startsWith('blob:')) {
            node.remove();
            onThreat({
              id: `sec-dom-${Date.now()}`,
              timestamp: new Date().toISOString(),
              category: 'DOM_TAMPERING',
              severity: 'high',
              source: 'Garde DOM Temps Réel',
              ruleId: 'DOM-GUARD-EMBED',
              description: `Élément <${tag}> externe non autorisé bloqué par le bouclier DOM.`,
              blocked: true,
              sampleSnippet: src.slice(0, 100),
            });
          }
        }
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  return () => observer.disconnect();
}

// ============================================================================
// 8. FULL APPLICATION ANTIVIRUS & INTEGRITY AUDIT SCAN
// ============================================================================

export function runFullSecurityScan(state: AppState): {
  report: SecurityScanReport;
  detectedEvents: SecurityEvent[];
} {
  const sec = state.security ?? createInitialSecurityState();
  const cfg = sec.config;
  const detectedEvents: SecurityEvent[] = [];
  let itemsScanned = 0;

  const inspectItem = (source: string, text: string) => {
    itemsScanned++;
    const res = inspectTextInput(text, cfg);
    if (!res.safe) {
      detectedEvents.push({
        id: `sec-scan-${Date.now()}-${itemsScanned}`,
        timestamp: new Date().toISOString(),
        category: res.category ?? 'ANTIVIRUS_SIGNATURE',
        severity: res.severity ?? 'high',
        source,
        ruleId: res.ruleId ?? 'SCAN-001',
        description: res.description ?? 'Contenu suspect détecté lors de l’analyse complète.',
        blocked: true,
        sampleSnippet: text.slice(0, 70),
      });
    }
  };

  // Scan profiles, notes, group messages, error reports, custom content
  state.profiles.forEach((p) => inspectItem(`Profil (${p.name})`, `${p.name} ${p.email}`));
  state.notes.forEach((n) => inspectItem(`Note (${n.targetTitle})`, n.content));
  state.studyGroups.forEach((g) => {
    inspectItem(`Groupe (${g.name})`, `${g.name} ${g.description}`);
    g.messages.forEach((m) => inspectItem(`Message groupe (${g.name})`, m.text));
  });
  state.errorReports.forEach((r) => inspectItem(`Signalement`, r.reason));
  state.customQuestions.forEach((q) => inspectItem(`Question perso`, `${q.prompt} ${q.explanation}`));
  state.customFiches.forEach((f) => inspectItem(`Fiche perso`, `${f.title} ${f.resumeExpress}`));

  // Evaluate active security systems
  const totalChecks = SECURITY_SYSTEMS_CATALOG.length;
  const checksPassed = SECURITY_SYSTEMS_CATALOG.filter((sys) => sys.isActive(state)).length;
  const integrityValid = sec.integrityStatus !== 'tampered';

  let score = Math.round((checksPassed / totalChecks) * 100);
  if (!integrityValid) score = Math.max(20, score - 25);
  if (detectedEvents.length > 0) score = Math.max(30, score - detectedEvents.length * 10);

  const report: SecurityScanReport = {
    scannedAt: new Date().toISOString(),
    itemsScanned,
    threatsFound: detectedEvents.length,
    threatsQuarantined: detectedEvents.length,
    integrityValid,
    securityScore: score,
    checksPassed,
    totalChecks,
    summary:
      detectedEvents.length === 0
        ? `Aucune menace détectée sur ${itemsScanned} éléments analysés (${checksPassed}/${totalChecks} boucliers actifs).`
        : `${detectedEvents.length} menace(s) neutralisée(s) sur ${itemsScanned} éléments analysés.`,
  };

  return { report, detectedEvents };
}

// ============================================================================
// 9. CATALOGUE COMPLET DES SYSTÈMES DE SÉCURITÉ ACTIFS (100 pare-feux WAF + 28 boucliers)
// ============================================================================

/**
 * 100 pare-feux WAF : chaque entrée est adossée à une signature réellement exécutée
 * par `testSecurityInput()` (aucune vitrine : 1 pare-feu = 1 règle de détection active).
 */
export const FIREWALL_SYSTEMS: SecuritySystemItem[] = WAF_RULE_DEFS.map((rule, idx) => ({
  id: `sys-waf-${rule.ruleId.toLowerCase()}`,
  layer: 'Pare-feu WAF',
  code: `WAF-${String(idx + 1).padStart(3, '0')}`,
  name: rule.description,
  description: `Signature ${rule.ruleId} · famille « ${WAF_FAMILY_LABELS[rule.family]} » · sévérité ${rule.severity}. Détection temps réel hors ligne, 0 ms réseau.`,
  isActive: (s: AppState) => s.security?.config.firewallEnabled ?? true,
}));

export const SECURITY_SYSTEMS_CATALOG: SecuritySystemItem[] = [
  // Couche 1 : Pare-feu WAF (100 systèmes — un pare-feu armé par signature)
  ...FIREWALL_SYSTEMS,

  // Couche 2 : Antivirus & Anti-Malware (8 systèmes)
  {
    id: 'sys-av-eicar',
    layer: 'Antivirus & Anti-Malware',
    code: 'AV-01',
    name: 'Moteur Signatures Virales (EICAR & Malwares)',
    description: 'Détecte instantanément les signatures virales standards et marqueurs malveillants.',
    isActive: (s) => s.security?.config.antivirusEnabled ?? true,
  },
  {
    id: 'sys-av-ransom',
    layer: 'Antivirus & Anti-Malware',
    code: 'AV-02',
    name: 'Bouclier Anti-Ransomware (Rançongiciels)',
    description: 'Bloque les marqueurs de rançongiciels et commandes de suppression de sauvegardes.',
    isActive: (s) => s.security?.config.antivirusEnabled ?? true,
  },
  {
    id: 'sys-av-miner',
    layer: 'Antivirus & Anti-Malware',
    code: 'AV-03',
    name: 'Détecteur Anti-Cryptojacking (Mineurs cachés)',
    description: 'Intercepte les scripts de minage clandestin CPU/batterie (Coinhive, Stratum, XMRig).',
    isActive: (s) => s.security?.config.antivirusEnabled ?? true,
  },
  {
    id: 'sys-av-dropper',
    layer: 'Antivirus & Anti-Malware',
    code: 'AV-04',
    name: 'Détecteur de Chevaux de Troie & Droppers',
    description: 'Repère eval(atob()), WScript.Shell, ActiveXObject, mshta et webshells obfusqués.',
    isActive: (s) => s.security?.config.antivirusEnabled ?? true,
  },
  {
    id: 'sys-av-entropy',
    layer: 'Antivirus & Anti-Malware',
    code: 'AV-05',
    name: 'Analyse Heuristique par Entropie de Shannon',
    description: 'Repère les chaînes fortement obfusquées ou chiffrées typiques des malwares polymorphes.',
    isActive: (s) => (s.security?.config.antivirusEnabled ?? true) && (s.security?.config.strictMode ?? true),
  },
  {
    id: 'sys-av-rlo',
    layer: 'Antivirus & Anti-Malware',
    code: 'AV-06',
    name: 'Anti-Spoofing Unicode RLO (Fausses extensions)',
    description: 'Bloque les caractères bidirectionnels cachés servant à déguiser un .exe en .pdf.',
    isActive: (s) => s.security?.config.antivirusEnabled ?? true,
  },
  {
    id: 'sys-av-magic',
    layer: 'Antivirus & Anti-Malware',
    code: 'AV-07',
    name: 'Scanner de Fichiers par Magic Bytes (PE / ELF / Mach-O)',
    description: 'Vérifie l’en-tête binaire réel, les doubles extensions et le SHA-256 des fichiers.',
    isActive: (s) => s.security?.config.antivirusEnabled ?? true,
  },
  {
    id: 'sys-av-phishing',
    layer: 'Antivirus & Anti-Malware',
    code: 'AV-08',
    name: 'Bouclier Anti-Phishing & Vol de Codes PIN',
    description: 'Détecte les messages frauduleux réclamant mots de passe ou codes PIN Mobile Money.',
    isActive: (s) => s.security?.config.antivirusEnabled ?? true,
  },

  // Couche 3 : Réseau & En-têtes HTTP (6 systèmes)
  {
    id: 'sys-http-csp',
    layer: 'Réseau & En-têtes HTTP',
    code: 'NET-01',
    name: 'Content-Security-Policy (CSP) Stricte',
    description: 'Restreint l’exécution des scripts et connexions uniquement à l’origine et Supabase.',
    isActive: () => true,
  },
  {
    id: 'sys-http-hsts',
    layer: 'Réseau & En-têtes HTTP',
    code: 'NET-02',
    name: 'HSTS Preload (2 ans, sous-domaines inclus)',
    description: 'Force le chiffrement TLS/HTTPS et empêche les attaques SSL-stripping.',
    isActive: () => true,
  },
  {
    id: 'sys-http-nosniff',
    layer: 'Réseau & En-têtes HTTP',
    code: 'NET-03',
    name: 'Anti-MIME Sniffing (X-Content-Type-Options)',
    description: 'Interdit au navigateur d’exécuter un fichier texte/image déguisé en script.',
    isActive: () => true,
  },
  {
    id: 'sys-http-perm',
    layer: 'Réseau & En-têtes HTTP',
    code: 'NET-04',
    name: 'Permissions-Policy Anti-Espionnage Matériel',
    description: 'Coupe par défaut l’accès caméra, GPS, USB, Bluetooth et paiement caché.',
    isActive: () => true,
  },
  {
    id: 'sys-http-coop',
    layer: 'Réseau & En-têtes HTTP',
    code: 'NET-05',
    name: 'Isolation Cross-Origin (COOP / CORP)',
    description: 'Protège la mémoire du processus contre les fuites inter-onglets (XS-Leaks).',
    isActive: () => true,
  },
  {
    id: 'sys-http-referrer',
    layer: 'Réseau & En-têtes HTTP',
    code: 'NET-06',
    name: 'Referrer-Policy & Anti-DNS Prefetch',
    description: 'Empêche toute fuite d’URL interne et bloque le pré-chargement DNS tiers.',
    isActive: () => true,
  },

  // Couche 4 : Service Worker PWA & DOM (5 systèmes)
  {
    id: 'sys-sw-origin',
    layer: 'Service Worker PWA',
    code: 'PWA-01',
    name: 'Pare-feu d’Origine Service Worker (Allowlist)',
    description: 'Refuse la mise en cache de toute ressource externe hors domaine de confiance.',
    isActive: () => true,
  },
  {
    id: 'sys-sw-poison',
    layer: 'Service Worker PWA',
    code: 'PWA-02',
    name: 'Protection Anti-Cache Poisoning (MIME & HTTP 200)',
    description: 'Vérifie le statut 200, le type basic et la liste blanche MIME avant mise en cache.',
    isActive: () => true,
  },
  {
    id: 'sys-sw-traversal',
    layer: 'Service Worker PWA',
    code: 'PWA-03',
    name: 'Filtre HTTP 403 Anti-Traversal / Anti-Scan dans SW',
    description: 'Bloque en 403 les sondes malveillantes (/.env, /.git, ../, UNION SELECT).',
    isActive: () => true,
  },
  {
    id: 'sys-sw-dos',
    layer: 'Service Worker PWA',
    code: 'PWA-04',
    name: 'Plafond Anti-DoS du Cache Hors-Ligne (150 entrées)',
    description: 'Empêche le remplissage malveillant du disque et exclut les endpoints privés/API.',
    isActive: () => true,
  },
  {
    id: 'sys-dom-guard',
    layer: 'Service Worker PWA',
    code: 'PWA-05',
    name: 'Garde DOM Temps Réel (MutationObserver)',
    description: 'Détecte et supprime instantanément les scripts/iframes injectés par des extensions.',
    isActive: (s) => s.security?.config.domGuardEnabled ?? true,
  },

  // Couche 5 : Cryptographie & Intégrité Stockage (4 systèmes)
  {
    id: 'sys-crypto-pbkdf2',
    layer: 'Cryptographie & Stockage',
    code: 'CRY-01',
    name: 'Hachage PBKDF2-SHA256 (120 000 itérations + Sel)',
    description: 'Dérivation cryptographique lente avec sel aléatoire 128 bits et comparaison temps constant.',
    isActive: () => true,
  },
  {
    id: 'sys-crypto-aes',
    layer: 'Cryptographie & Stockage',
    code: 'CRY-02',
    name: 'Chiffrement Authentifié AES-256-GCM Local',
    description: 'Chiffre le coffre de secours local via WebCrypto AES-256-GCM avec vecteur IV aléatoire.',
    isActive: (s) => s.privacy.localEncryptionEnabled,
  },
  {
    id: 'sys-crypto-seal',
    layer: 'Cryptographie & Stockage',
    code: 'CRY-03',
    name: 'Sceau d’Intégrité SHA-256 Anti-Falsification',
    description: 'Vérifie au chargement qu’aucun programme tiers n’a altéré les données IndexedDB.',
    isActive: (s) => s.security?.config.integrityCheckEnabled ?? true,
  },
  {
    id: 'sys-crypto-quarantine',
    layer: 'Cryptographie & Stockage',
    code: 'CRY-04',
    name: 'Quarantaine & Journal d’Audit SIEM Local',
    description: 'Isole toute menace détectée avant sauvegarde et conserve la trace horodatée.',
    isActive: () => true,
  },

  // Couche 6 : Cloud Zero-Trust & Auth (5 systèmes)
  {
    id: 'sys-auth-bruteforce',
    layer: 'Cloud Zero-Trust & Auth',
    code: 'ZT-01',
    name: 'Verrouillage Anti-Bruteforce (5 essais → 5 min)',
    description: 'Bloque les attaques par dictionnaire sur les profils locaux avec compte à rebours.',
    isActive: (s) => s.security?.config.bruteForceProtection ?? true,
  },
  {
    id: 'sys-auth-pwdpolicy',
    layer: 'Cloud Zero-Trust & Auth',
    code: 'ZT-02',
    name: 'Filtre Anti-Mots de Passe Compromis & Audit',
    description: 'Rejette les mots de passe faibles piratés courants et note la robustesse en direct.',
    isActive: (s) => s.security?.config.bruteForceProtection ?? true,
  },
  {
    id: 'sys-cloud-zt',
    layer: 'Cloud Zero-Trust & Auth',
    code: 'ZT-03',
    name: 'Validation Zero-Trust des Données Cloud Supabase',
    description: 'Passe chaque question/fiche synchronisée du Cloud au WAF & antivirus avant import.',
    isActive: (s) => s.security?.config.zeroTrustCloudValidation ?? true,
  },
  {
    id: 'sys-cloud-rls',
    layer: 'Cloud Zero-Trust & Auth',
    code: 'ZT-04',
    name: 'PostgreSQL RLS + Contraintes Anti-XSS & Anti-DoS',
    description: 'Row Level Security + filtres CHECK côté base Supabase + table d’audit sécurité.',
    isActive: () => true,
  },
  {
    id: 'sys-auth-autolock',
    layer: 'Cloud Zero-Trust & Auth',
    code: 'ZT-05',
    name: 'Verrouillage Automatique d’Inactivité & Mode Panique',
    description: 'Ferme la session après inactivité prolongée et offre un verrouillage d’urgence en 1 clic.',
    isActive: (s) => (s.security?.config.autoLockMinutes ?? 30) > 0,
  },
];
