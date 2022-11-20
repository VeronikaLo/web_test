'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "b3bd40ebfd8db0603459dd3235d0ead4",
"assets/assets/fonts/product_sans_bold.ttf": "dba0c688b8d5ee09a1e214aebd5d25e4",
"assets/assets/fonts/product_sans_italic.ttf": "e88ec18827526928e71407a24937825a",
"assets/assets/fonts/product_sans_regular.ttf": "eae9c18cee82a8a1a52e654911f8fe83",
"assets/assets/images/development.png": "cda53059a75425d13a71231293440ee0",
"assets/assets/images/dev_exp.png": "3d7998d98903ccc56c219209d0134ff3",
"assets/assets/images/ecosystem.png": "759d5a8ac1726ff78df8ef60861a68a2",
"assets/assets/images/flutter_logo_text.png": "d21f1eecaeaab081ba7efec1721c0712",
"assets/assets/images/mixer.png": "c984bcb440264ebbade4bbb0a7809442",
"assets/assets/images/multi_plattform.png": "92f0a972a2eba5b0efb114c25f9cee00",
"assets/FontManifest.json": "642c33e612c4ea4078f142496dab6126",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "6c0863adfc245d880d033c0de0154e5e",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "e066978a97d38b04afad1fb0d1f93742",
"browserconfig.xml": "97775b1fd3b6e6c13fc719c2c7dd0ffe",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.ico": "0ce0fc0eea55d6eac2594326914feb9b",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/android-icon-144x144.png": "437a89fbc44962ccfdb7abc800107a69",
"icons/android-icon-192x192.png": "cef73aa87f21e556e8de3ae14619c68a",
"icons/android-icon-36x36.png": "adb19fcf6af7ce934b2228c39cfeee8f",
"icons/android-icon-48x48.png": "88c2a1eeb39df6f2f886f20f7fc82564",
"icons/android-icon-72x72.png": "151635fba098c1f68ee6106a670b4d81",
"icons/android-icon-96x96.png": "fb62e9e14ce8d1146df556c8eff7bccb",
"icons/apple-icon-114x114.png": "e9c78d7519d80dd130595cfc3c4fff8b",
"icons/apple-icon-120x120.png": "7cdd66fa8597c644a350406807cbd4da",
"icons/apple-icon-144x144.png": "437a89fbc44962ccfdb7abc800107a69",
"icons/apple-icon-152x152.png": "7757a2968193e3f94af1095eb6e7dd27",
"icons/apple-icon-180x180.png": "8b97c5a2da8cbea5cb4e2c97a2962c69",
"icons/apple-icon-57x57.png": "0fee758cc38b2ec787434c91b7d26a40",
"icons/apple-icon-60x60.png": "87e0ca8c9c3abc85fe34f0f359865354",
"icons/apple-icon-72x72.png": "151635fba098c1f68ee6106a670b4d81",
"icons/apple-icon-76x76.png": "03c484561f0baa59e0274742a8fd371f",
"icons/apple-icon-precomposed.png": "1e4d2b18aa16e3374a035c69c5155e66",
"icons/apple-icon.png": "1e4d2b18aa16e3374a035c69c5155e66",
"icons/favicon-16x16.png": "dea0b9d69fc632a1808e5e4e5f316e44",
"icons/favicon-32x32.png": "b499917ef0ef8d94f6af8d8900f7dea2",
"icons/favicon-96x96.png": "fb62e9e14ce8d1146df556c8eff7bccb",
"icons/ms-icon-144x144.png": "437a89fbc44962ccfdb7abc800107a69",
"icons/ms-icon-150x150.png": "2837fe6ae5d3b505065f8e8a919cc3c3",
"icons/ms-icon-310x310.png": "4c96e845ee719c7cf8bf26fa61bd43ee",
"icons/ms-icon-70x70.png": "03ce20e354973939084c87cfaa58b1de",
"index.html": "5e732cf74bd8375ab82784a23c18029d",
"/": "5e732cf74bd8375ab82784a23c18029d",
"main.dart.js": "58649cf53d201392ca95d1bbd9c812f9",
"manifest.json": "becc4078ec66d27ae50cdbf6f05c9036",
"version.json": "9094aacdae789dccd67fa32109ff1a18"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
