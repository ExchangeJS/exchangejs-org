// The SW will be shutdown when not in use to save memory,
// be aware that any global state is likely to disappear
console.log("SW startup");

self.addEventListener('install', function(event) {
  console.log("SW installed");

  caches.open('request').then((cache) => {
    cache.addAll([
      '/',
      '/index.bundle.js',
      'https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css',
      'https://maps.google.com/maps/api/staticmap?center=53.5461361,-113.4991690&zoom=15&size=240x180&maptype=roadmap&sensor=false&language=&markers=color:green|label:none|53.5461361,-113.4991690',
      'https://netdna.bootstrapcdn.com/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.woff'
    ]);
  })
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
