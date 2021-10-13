const cacheName = 'v1';

this.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll([
        '/static/js/vendors~main.chunk.js',
        '/static/js/main.chunk.js',
        '/static/js/0.chunk.js',
        '/static/js/bundle.js',
        '/static/css/main.chunk.css',
        '/static/media/logo.103b5fa1.svg',
        '/index.html',
        '/favicon.ico',
        '/',
      ]);
    }),
  );
});

this.addEventListener('fetch', (e) => {
  if (!navigator.onLine) {
    console.log('Service Worker is fetching');
    if (e.request.url === 'http://localhost:3000/static/js/main.chunk.js') {
      e.waitUntil(
        this.registration.showNotification('Internet', {
          body: 'Internet is not working',
        }),
      );
    }

    e.respondWith(
      caches.match(e.request).then((res) => {
        if (res) {
          return res;
        }
        let requestUrl = e.request.clone();
        fetch(requestUrl);
      }),
    );
  }
});
