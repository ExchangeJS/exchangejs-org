// Register the service worker
if (navigator.serviceWorker) {
	document.body.classList.add('service-workers');

	navigator.serviceWorker.register('worker.bundle.js').then(function(reg) {
	  console.log('SW registered. ◕‿◕', reg);
	}, function(err) {
	  console.log('SW register failed! ಠ_ಠ', err);
	});

	// Wire up SW interface
	document.getElementById('sw-ping').
		addEventListener('click', function(e) {
			e.preventDefault();

			console.log('ping');
			navigator.serviceWorker.controller.postMessage("ping");
		});
}
