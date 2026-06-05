const CACHE_NAME = "propolis-static-v21";
const LOCAL_ASSETS = [
  "./",
  "404.html",
  "offline.html",
  "assets/css/reset.css",
  "assets/css/variables.css",
  "assets/css/base.css",
  "assets/css/layout.css",
  "assets/css/components.css",
  "assets/css/sections.css",
  "assets/css/forms.css",
  "assets/css/legal.css",
  "assets/css/responsive.css",
  "assets/css/styles.css",
  "assets/images/course/course-video-poster.jpg",
  "assets/js/utils.js",
  "assets/js/menu.js",
  "assets/js/site.js",
  "assets/js/cookie-consent.js",
  "assets/js/register-sw.js",
  "assets/js/offline.js",
  "assets/icons/favicon.svg",
  "assets/icons/logo-doctor.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(LOCAL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key !== CACHE_NAME)
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.search) return;
  const scopePath = new URL(self.registration.scope).pathname;
  const relativePath = url.pathname.startsWith(scopePath)
    ? url.pathname.slice(scopePath.length)
    : url.pathname.replace(/^\//, "");

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match("offline.html"))
    );
    return;
  }

  const isLocalAsset = relativePath.startsWith("assets/");
  if (!isLocalAsset && !LOCAL_ASSETS.includes(relativePath)) return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, copy);
        });
        return response;
      });
    })
  );
});


