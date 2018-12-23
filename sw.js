
let staticCacheName = "restaurants-cache-v1";
let urlsToCache = [
    'js/main.js',
    'js/restaurant_info.js',
    'js/dbhelper.js',
    'css/styles.css',
    'index.html',
    'restaurant.html',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
];

/**
 * Installation of service worker
 */
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(staticCacheName).then(cache => cache.addAll(urlsToCache))
    );
});

/**
 * Activation of service worker
 */
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => Promise.all(cacheNames.map(cache => {
            if (cache !== staticCacheName) {
                return caches.delete(cache);
            }
        })))
    )
})

/**
 * Fetching for offline content viewing
 */
self.addEventListener("fetch", event => {
    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
        return;
    }
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
    );

});