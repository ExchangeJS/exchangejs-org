// The SW will be shutdown when not in use to save memory,
// be aware that any global state is likely to disappear
console.log("SW startup");

let CACHE_VERSION = __VERSION__;

function cacheName(version) {
  return `request-cache-${CACHE_VERSION}`;
}

function openCache(storage, cache_name) {
  return Promise.all([storage, storage.open(cacheName(CACHE_VERSION)), cache_name]);
}

function cacheRequests(cache) {
  return cache.addAll([
    '.',
    './index.bundle.js',
    './favicon.ico',
    './code-of-conduct.html',
    './sponsorship.html',
    './startup-edmonton.png',
    'https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css',
    'https://maps.google.com/maps/api/staticmap?center=53.5461361,-113.4991690&zoom=15&size=240x180&maptype=roadmap&sensor=false&language=&markers=color:green|label:none|53.5461361,-113.4991690',
    'https://netdna.bootstrapcdn.com/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.woff'
  ]);
}

function clearOldCaches(storage, cache_name) {
  return storage.keys().
    then((keys) => keys.filter(key => key !== cache_name)).
    then((keys) => keys.map(key => storage.delete(key)));
};

self.addEventListener('install', function(event) {
  console.log("SW installed");

  openCache(caches, cacheName(CACHE_VERSION)).
  then(([storage, cache, cache_name]) => cacheRequests(cache).then((_) => [storage, cache_name])).
  then(([storage, cache_name]) => clearOldCaches(storage, cache_name));
});

self.addEventListener('activate', function(event) {
  console.log("SW activated");
});

self.addEventListener('fetch', function(event) {
  console.log("Caught a fetch!" + event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
