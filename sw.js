self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('cricket-counter-v1').then(function(cache) {
      return cache.addAll([
        '/crickstar/',
        '/crickstar/index.html',
        '/crickstar/manifest.json',
        '/crickstar/icons/icon-72x72.png',
        '/crickstar/icons/icon-96x96.png',
        '/crickstar/icons/icon-128x128.png',
        '/crickstar/icons/icon-144x144.png',
        '/crickstar/icons/icon-152x152.png',
        '/crickstar/icons/icon-192x192.png',
        '/crickstar/icons/icon-384x384.png',
        '/crickstar/icons/icon-512x512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request).then(function(response) {
        // Cache the fetched response
        if (event.request.method === 'GET') {
          const clonedResponse = response.clone();
          caches.open('cricket-counter-v1').then(function(cache) {
            cache.put(event.request, clonedResponse);
          });
        }
        return response;
      }).catch(function() {
        // Fallback for offline functionality
        if (event.request.mode === 'navigate') {
          return caches.match('/crickstar/');
        }
      });
    })
  );
}); 