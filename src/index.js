import { write } from './lib';

class Greeter {
		greet(name) {
			return "Hello, " + name + "!";
		}
	}

var greeter = new Greeter();
write(greeter.greet("Bob"));

// Register the service worker
navigator.serviceWorker.register('worker.bundle.js').then(function(reg) {
  console.log('◕‿◕', reg);
}, function(err) {
  console.log('ಠ_ಠ', err);
});
