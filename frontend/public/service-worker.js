const CACHE_NAME = 'spendwise-v1';
const ASSETS_TO_CACHE = [
  '/', 
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png'
  // you can add built asset paths (eg /static/js/main.xxxx.js) after build
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Basic cache-first strategy
  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached ||
      fetch(event.request).then((response) => {
        // optionally cache new requests:
        // if response.ok && event.request.method === 'GET' { cache.put(event.request, response.clone()) }
        return response;
      }).catch(() => {
        // fallback if offline (optional): return caches.match('/offline.html')
      })
    )
  );
});
