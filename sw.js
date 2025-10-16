// Service Worker Code

const CACHE_NAME = 'kundan-test-series-v1';
// Offline chalane ke liye zaroori files
const urlsToCache = [
  '/',
  '/index.html',
  
  // Aap yahan apni CSS aur JS files ka naam bhi daal sakte hain
];

// Install event: Jab service worker pehli baar install hota hai
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: Jab app koi file (image, page) maangta hai
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Agar file cache mein mil gayi, to wahan se de do
        if (response) {
          return response;
        }
        // Agar nahi mili, to internet se laakar do
        return fetch(event.request);
      }
    )
  );
});

// Activate event: Purane cache ko saaf karne ke liye
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
