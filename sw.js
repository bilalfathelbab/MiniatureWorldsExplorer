// ============================================================
// MINIATURE WORLDS EXPLORER SERVICE WORKER
// Provides offline support for GitHub Pages using a cache-first
// strategy plus online background refreshes.
// ============================================================

const CACHE_VERSION = 'v2';
const CACHE_NAME = `miniature-worlds-${CACHE_VERSION}`;

const APP_SHELL = [
  './',
  'index.html',
  'favicon.png',
  'https://cdn.tailwindcss.com/3.4.17'
];

const STATIC_ASSET_PATTERN = /\.(?:html|css|js|json|png|jpe?g|gif|webp|svg|ico|webmanifest|txt|woff2?|ttf|otf|wasm)$/i;
const CRAWLABLE_PATTERN = /\.(?:html|css|js|json)$/i;
const ALLOWED_EXTERNAL_ORIGINS = new Set([
  'https://cdn.tailwindcss.com'
]);

// ============================================================
// SERVICE WORKER LIFECYCLE
// ============================================================

self.addEventListener('install', event => {
  event.waitUntil(
    refreshAppCache()
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

// ============================================================
// EVENTS
// ============================================================

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
    return;
  }

  if (event.data?.type === 'REFRESH_CACHE') {
    event.waitUntil(refreshAppCache());
  }
});

self.addEventListener('fetch', event => {
  const { request } = event;

  if (request.method !== 'GET' || !shouldHandleRequest(request.url)) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(cacheFirst(request, getIndexUrl(), event));
    return;
  }

  event.respondWith(cacheFirst(request, null, event));
});

// ============================================================
// CACHE STRATEGY
// ============================================================

async function cacheFirst(request, fallbackUrl, event) {
  const cached = await caches.match(request, { ignoreSearch: true });

  if (cached) {
    event.waitUntil(updateCachedRequest(request));
    return cached;
  }

  try {
    const response = await fetchForCache(request.url);
    await putCache(request.url, response.clone());
    return response;
  } catch (error) {
    if (fallbackUrl) {
      const fallback = await caches.match(fallbackUrl, { ignoreSearch: true });
      if (fallback) return fallback;
    }

    throw error;
  }
}

async function updateCachedRequest(request) {
  try {
    const response = await fetchForCache(request.url);
    await putCache(request.url, response);
  } catch (error) {
    // Staying offline-capable is more important than surfacing refresh noise.
  }
}

async function refreshAppCache() {
  const cache = await caches.open(CACHE_NAME);
  const discoveredUrls = await discoverAppAssets();

  await Promise.all(
    [...discoveredUrls].map(url => cacheUrl(cache, url))
  );
}

async function cacheUrl(cache, url) {
  try {
    const response = await fetchForCache(url);
    if (!isSuccessfulResponse(response)) return;

    await cache.put(url, response.clone());

    if (url === getIndexUrl()) {
      await cache.put(getScopeUrl(), response.clone());
    }
  } catch (error) {
    // The app can keep using the last good cached copy if refresh fails.
  }
}

async function putCache(url, response) {
  if (!isSuccessfulResponse(response)) return;

  const cache = await caches.open(CACHE_NAME);
  const responseForScope = response.clone();

  await cache.put(url, response);

  if (url === getIndexUrl()) {
    await cache.put(getScopeUrl(), responseForScope);
  }
}

// ============================================================
// ASSET DISCOVERY
// ============================================================

async function discoverAppAssets() {
  const discovered = new Set(APP_SHELL.map(resolveUrl));
  const queue = [...discovered];

  while (queue.length) {
    const url = queue.shift();

    if (!isCrawlable(url)) continue;

    try {
      const response = await fetchForCache(url);
      if (!isSuccessfulResponse(response)) continue;

      const text = await response.clone().text();
      await putCache(url, response.clone());

      for (const assetUrl of extractAssetUrls(text, url)) {
        if (discovered.has(assetUrl)) continue;

        discovered.add(assetUrl);
        queue.push(assetUrl);
      }
    } catch (error) {
      // A missing optional asset should not prevent the rest of the app
      // from installing and remaining available offline.
    }
  }

  return discovered;
}

function extractAssetUrls(text, baseUrl) {
  const urls = new Set();
  const assetRegex = /(?:src|href)\s*=\s*["']([^"']+)["']|url\(\s*["']?([^"')]+)["']?\s*\)|["'`]([^"'`]+?\.(?:html|css|js|json|png|jpe?g|gif|webp|svg|ico|webmanifest|txt|woff2?|ttf|otf|wasm)(?:[?#][^"'`]*)?)["'`]/gi;
  let match;

  while ((match = assetRegex.exec(text)) !== null) {
    const candidate = match[1] || match[2] || match[3];
    const url = normalizeUrl(candidate, baseUrl);

    if (url) urls.add(url);
  }

  return urls;
}

// ============================================================
// REQUEST HELPERS
// ============================================================

function fetchForCache(url) {
  const requestUrl = typeof url === 'string' ? url : url.url;
  const parsedUrl = new URL(requestUrl);

  if (parsedUrl.origin === self.location.origin) {
    return fetch(new Request(parsedUrl.href, {
      cache: 'reload',
      credentials: 'same-origin'
    }));
  }

  return fetch(new Request(parsedUrl.href, {
    cache: 'reload',
    mode: 'no-cors'
  }));
}

function shouldHandleRequest(url) {
  const parsedUrl = new URL(url);

  if (parsedUrl.origin === self.location.origin) {
    return parsedUrl.href.startsWith(getScopeUrl());
  }

  return ALLOWED_EXTERNAL_ORIGINS.has(parsedUrl.origin);
}

function isCrawlable(url) {
  const parsedUrl = new URL(url);

  return parsedUrl.origin === self.location.origin
    && parsedUrl.href.startsWith(getScopeUrl())
    && (parsedUrl.href === getScopeUrl() || CRAWLABLE_PATTERN.test(parsedUrl.pathname));
}

function normalizeUrl(candidate, baseUrl) {
  if (!candidate || candidate.startsWith('#')) return null;
  if (/^(?:data|blob|mailto|tel):/i.test(candidate)) return null;

  const url = new URL(candidate, baseUrl);
  url.hash = '';

  if (url.origin === self.location.origin) {
    if (!url.href.startsWith(getScopeUrl())) return null;

    if (url.href === getScopeUrl() || STATIC_ASSET_PATTERN.test(url.pathname)) {
      return url.href;
    }
  }

  if (ALLOWED_EXTERNAL_ORIGINS.has(url.origin)) {
    return url.href;
  }

  return null;
}

function resolveUrl(path) {
  return normalizeUrl(path, getScopeUrl());
}

function getScopeUrl() {
  return self.registration.scope;
}

function getIndexUrl() {
  return new URL('index.html', getScopeUrl()).href;
}

function isSuccessfulResponse(response) {
  return response && (response.ok || response.type === 'opaque');
}
