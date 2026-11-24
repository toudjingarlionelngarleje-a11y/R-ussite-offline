import { AppState } from '../types';
import {
  computeIntegritySeal,
  decryptVaultString,
  encryptVaultString,
  hasPrototypePollution,
  hashPasswordPBKDF2,
  verifyPasswordPBKDF2,
} from './securityFirewall';

const DB_NAME = 'reussite-offline-db';
const DB_VERSION = 1;
const STORE_NAME = 'app_state';
const STATE_KEY = 'main_state_v1';
const SEAL_KEY = 'main_state_seal_v2';
const FALLBACK_KEY = 'reussite_offline_fallback_v1';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB indisponible'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function getCoreIntegrityPayload(state: AppState) {
  return {
    profiles: state.profiles.map((p) => ({ id: p.id, email: p.email, plan: p.plan })),
    sessionsCount: state.sessions.length,
    notesCount: state.notes.length,
    customQCount: state.customQuestions.length,
    activeProfileId: state.activeProfileId,
  };
}

export async function loadPersistedState(): Promise<{
  state: AppState | null;
  integrityValid: boolean;
}> {
  let loaded: AppState | null = null;
  let storedSeal: string | null = null;

  try {
    const db = await openDB();
    loaded = await new Promise<AppState | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(STATE_KEY);
      req.onsuccess = () => resolve((req.result as AppState) ?? null);
      req.onerror = () => reject(req.error);
    });
    storedSeal = await new Promise<string | null>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(SEAL_KEY);
      req.onsuccess = () => resolve((req.result as string) ?? null);
      req.onerror = () => resolve(null);
    });
  } catch {
    try {
      const raw = localStorage.getItem(FALLBACK_KEY);
      if (raw) {
        const decrypted = await decryptVaultString(raw);
        if (decrypted) {
          loaded = JSON.parse(decrypted) as AppState;
        }
      }
    } catch {
      loaded = null;
    }
  }

  if (!loaded) {
    return { state: null, integrityValid: true };
  }

  // Anti-Prototype Pollution verification on loaded state
  if (hasPrototypePollution(loaded)) {
    return { state: null, integrityValid: false };
  }

  // Tamper-evident SHA-256 seal check
  let integrityValid = true;
  if (storedSeal) {
    const expectedSeal = await computeIntegritySeal(getCoreIntegrityPayload(loaded));
    integrityValid = storedSeal === expectedSeal;
  }

  return { state: loaded, integrityValid };
}

export async function savePersistedState(state: AppState): Promise<string | null> {
  const seal = await computeIntegritySeal(getCoreIntegrityPayload(state));
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(state, STATE_KEY);
      store.put(seal, SEAL_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    // Fallback silently
  }
  try {
    const serialized = JSON.stringify(state);
    const toStore = state.privacy?.localEncryptionEnabled
      ? await encryptVaultString(serialized)
      : serialized;
    localStorage.setItem(FALLBACK_KEY, toStore);
  } catch {
    // Quota exceeded
  }
  return seal;
}

export async function clearAllPersistedData(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // Ignore
  }
  try {
    localStorage.removeItem(FALLBACK_KEY);
  } catch {
    // Ignore
  }
}

async function legacySha256Hash(password: string): Promise<string> {
  const text = `reussite-offline-salt::${password}`;
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const data = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return `local_${Math.abs(hash).toString(16)}`;
}

/**
 * Hardened password hashing using PBKDF2-SHA256 (120,000 iterations + 128-bit random salt).
 */
export async function hashPassword(password: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    return hashPasswordPBKDF2(password);
  }
  return legacySha256Hash(password);
}

/**
 * Verifies PBKDF2-SHA256 hashes (with constant-time compare) and preserves backwards compatibility
 * with earlier SHA-256 local profiles.
 */
export async function verifyPasswordHash(password: string, storedHash: string): Promise<boolean> {
  if (!storedHash || storedHash === 'demo_hashed_local') return false;
  if (storedHash.startsWith('pbkdf2$')) {
    return verifyPasswordPBKDF2(password, storedHash);
  }
  const legacy = await legacySha256Hash(password);
  return legacy === storedHash;
}

export function formatBytesFromKb(kb: number): string {
  if (kb < 1024) return `${Math.round(kb)} Ko`;
  return `${(kb / 1024).toFixed(2)} Mo`;
}

export function exportJsonDownload(filename: string, data: unknown): void {
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = safeName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
