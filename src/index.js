import { write } from './lib';

class Greeter {
		greet(name) {
			return "Hello, " + name + "!";
		}
	}

var greeter = new Greeter();
write(greeter.greet("Bob"));
