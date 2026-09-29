const CACHE_NAME = "version-2";
const urlsToCache = ["/", "/offline.html"];

const self = this;

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
    self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
    if (event.request.mode !== "navigate") {
        return;
    }

    event.respondWith(
        fetch(event.request).catch(() => caches.match("/offline.html"))
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});