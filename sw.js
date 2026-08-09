const CACHE_NAME = 'frontend-nexus-v2';
const OFFLINE_PAGE = '/pages/404.html';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/pages/404.html',
  '/assets/css/variables.css',
  '/assets/css/themes.css',
  '/assets/css/app.css',
  '/assets/css/animations.css',
  '/assets/css/view-transitions.css',
  '/assets/css/page-components.css',
  '/assets/js/core/app.js',
  '/assets/js/core/router.js',
  '/assets/js/core/pageManager.js',
  '/assets/js/core/libraryConfig.js',
  '/assets/js/core/libraryLoader.js',
  '/assets/js/core/themeManager.js',
  '/assets/js/core/commandPalette.js',
  '/assets/js/core/notificationManager.js',
  '/assets/js/core/storageManager.js',
  '/assets/js/core/errorManager.js',
  '/assets/js/core/performanceMonitor.js',
  '/assets/js/components/AppNavbar.js',
  '/assets/js/components/AppSidebar.js',
  '/assets/js/components/AppFooter.js',
  '/assets/js/components/AppModal.js',
  '/assets/js/components/AppToast.js',
  '/assets/js/components/AppDropdown.js',
  '/assets/js/components/AppTabs.js',
  '/assets/js/components/AppAccordion.js',
  '/assets/js/components/AppLoader.js',
  '/assets/js/components/AppSkeleton.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.allSettled(
        PRECACHE_URLS.map(url =>
          cache.add(url).catch(err => {
            console.warn('[SW] Precache failed:', url, err.message);
          })
        )
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);

  // HTML pages: network-first, fallback to cache, then offline page
  if (requestUrl.origin === location.origin && (requestUrl.pathname.endsWith('.html') || requestUrl.pathname === '/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (!response || response.status !== 200) return response;
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then(resp => resp || caches.match(OFFLINE_PAGE)))
    );
    return;
  }

  // CSS, JS, images, fonts, media: cache-first, fallback to network
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => {
        // Network failed and no cache entry — return a minimal fallback for navigation
        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_PAGE);
        }
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
});
