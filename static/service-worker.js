var cacheName = 'weatherPWA-step-6-1'
var filesToCache = [
  '/',
  '/index.html',
  '/index.css',
  '/main.js',
  '/images/jerry.png',
]
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install')
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell')
      return cache.addAll(filesToCache)
    })
  )
})