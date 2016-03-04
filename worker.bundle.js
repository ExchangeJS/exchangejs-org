/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	// The SW will be shutdown when not in use to save memory,
	// be aware that any global state is likely to disappear
	console.log("SW startup");
	
	var CACHE_VERSION = (98
	);
	
	function cacheName(version) {
	  return "request-cache-" + CACHE_VERSION;
	}
	
	function openCache(storage, cache_name) {
	  console.log("Opening cache");
	  return Promise.all([storage, storage.open(cacheName(CACHE_VERSION)), cache_name]);
	}
	
	var URLS_TO_CACHE = ['https://www.exchangejs.com/', 'https://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css', 'https://maps.google.com/maps/api/staticmap?center=53.5461361,-113.4991690&zoom=15&size=240x180&maptype=roadmap&sensor=false&language=&markers=color:green|label:none|53.5461361,-113.4991690', 'https://netdna.bootstrapcdn.com/bootstrap/3.0.0/fonts/glyphicons-halflings-regular.woff'];
	
	function cacheRequests(cache) {
	  console.log("Caching requests");
	  return cache.addAll(URLS_TO_CACHE.concat((["bundle.js","bundle.js.map","code-of-conduct.html","december-2013-meetup-photo.jpg","ejs.png","favicon.ico","index-archive.html","index.bundle.js","index.bundle.js.map","index.html","january-2013-meetup-photo.jpg","november-meetup-photo.jpg","sponsorship.html","startup-edmonton.png","startup_edmonton.jpg"])));
	}
	
	function clearOldCaches(storage, cache_name) {
	  console.log("Clearing keys");
	  return storage.keys().then(function (keys) {
	    return keys.filter(function (key) {
	      return key !== cache_name;
	    });
	  }).then(function (keys) {
	    return Promise.all(keys.map(function (key) {
	      return storage.delete(key);
	    }));
	  });
	};
	
	function refreshCache() {
	  console.log("Refreshing cache..");
	  return openCache(caches, cacheName(CACHE_VERSION)).then(function (_ref) {
	    var _ref2 = _slicedToArray(_ref, 3);
	
	    var storage = _ref2[0];
	    var cache = _ref2[1];
	    var cache_name = _ref2[2];
	    return cacheRequests(cache).then(function (_) {
	      return [storage, cache_name];
	    });
	  }).then(function (_ref3) {
	    var _ref4 = _slicedToArray(_ref3, 2);
	
	    var storage = _ref4[0];
	    var cache_name = _ref4[1];
	    return clearOldCaches(storage, cache_name);
	  });
	}
	
	self.addEventListener('install', function (event) {
	  console.log("SW installed");
	});
	
	self.addEventListener('activate', function (event) {
	  console.log("SW activated");
	});
	
	self.addEventListener('fetch', function (event) {
	  console.log("Caught a fetch!" + event.request.url);
	
	  if (true) {
	    event.respondWith(fetch(event.request));
	  } else {
	    event.respondWith(caches.match(event.request).then(function (response) {
	      return response || fetch(event.request);
	    }));
	  }
	});
	
	self.addEventListener('message', function (event) {
	  console.dir(event);
	  console.log('Pong!');
	});

/***/ }
/******/ ]);
//# sourceMappingURL=worker.bundle.js.map