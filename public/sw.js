// Service worker minimal : garde l'écran d'accueil disponible hors connexion.
// Le brouillon de demande hors connexion (EF17) sera ajouté par sa propre spec.
const CACHE = "naatal-v1";
const PAGES = ["/", "/producteur"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PAGES)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cles) => Promise.all(cles.filter((c) => c !== CACHE).map((c) => caches.delete(c)))),
  );
  self.clients.claim();
});

// Pages : réseau d'abord, copie locale si le réseau manque. Les API ne sont jamais mises en cache.
self.addEventListener("fetch", (event) => {
  const requete = event.request;
  if (requete.method !== "GET" || requete.mode !== "navigate") return;

  event.respondWith(
    fetch(requete)
      .then((reponse) => {
        const copie = reponse.clone();
        caches.open(CACHE).then((cache) => cache.put(requete, copie));
        return reponse;
      })
      .catch(() => caches.match(requete).then((r) => r || caches.match("/"))),
  );
});
