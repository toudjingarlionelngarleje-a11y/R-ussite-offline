const CACHE_NAME = 'reussite-offline-secure-v12';
const STATIC_ASSETS = ['/', '/index.html', '/manifest.webmanifest', '/icon.svg'];
const MAX_CACHE_ENTRIES = 340;

// Service Worker Security Firewall: allowed MIME prefixes for offline cache (Anti-Cache Poisoning)
const ALLOWED_CACHE_MIME_PREFIXES = [
  'text/html',
  'text/css',
  'application/javascript',
  'text/javascript',
  'image/svg+xml',
  'image/png',
  'image/webp',
  'image/x-icon',
  'application/manifest+json',
  'application/json',
  'font/woff2',
  'font/woff',
];

// Path Traversal / Injection / Malicious URL Firewall patterns
const SUSPICIOUS_URL_PATTERNS = [
  /\.\.[\\/]/i,
  /%2e%2e/i,
  /%00|\0/i,
  /<script/i,
  /javascript:/i,
  /vbscript:/i,
  /union\s+select/i,
  /drop\s+table/i,
  /etc\/passwd/i,
  /wp-admin|wp-login|\.env|\.git\//i,
  // Garde anti-escalade « Admin__ » : aucune requête contenant la commande privilégiée
  /admin[\s_]*_{2,}/i,
  /_{2,}[\s]*admin/i,
];

function isUrlSafe(url) {
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return false;
  const decoded = decodeURIComponent(url.pathname + url.search);
  return !SUSPICIOUS_URL_PATTERNS.some((re) => re.test(decoded));
}

function isCacheableContentType(response) {
  const ct = (response.headers.get('content-type') || '').toLowerCase();
  if (!ct) return false;
  return ALLOWED_CACHE_MIME_PREFIXES.some((prefix) => ct.startsWith(prefix));
}

async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    const excess = keys.slice(0, keys.length - maxItems);
    await Promise.all(excess.map((k) => cache.delete(k)));
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }

  // Firewall rule 1: Block malicious traversal/injection requests to same-origin paths
  if (url.origin === self.location.origin && !isUrlSafe(url)) {
    event.respondWith(
      new Response('Requête bloquée par le pare-feu Réussite Offline.', {
        status: 403,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      })
    );
    return;
  }

  // Firewall rule 2: Never cache cross-origin responses, API/Auth requests, or Authorization headers
  if (
    url.origin !== self.location.origin ||
    url.pathname.startsWith('/rest/v1') ||
    url.pathname.startsWith('/auth/') ||
    request.headers.has('Authorization')
  ) {
    return;
  }

  // Do not intercept Vite dev server / HMR endpoints
  if (
    url.pathname.startsWith('/@vite') ||
    url.pathname.startsWith('/@react-refresh') ||
    url.pathname.startsWith('/node_modules') ||
    url.pathname.includes('hot-update')
  ) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          // Firewall rule 3: Strict Anti-Cache Poisoning check (same-origin basic, 200 OK, allowed MIME)
          if (
            response &&
            response.status === 200 &&
            response.type === 'basic' &&
            isCacheableContentType(response)
          ) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clone).then(() => trimCache(CACHE_NAME, MAX_CACHE_ENTRIES));
            });
          }
          return response;
        })
        .catch(() => cached || caches.match('/index.html'));

      return cached || networkFetch;
    })
  );
});
