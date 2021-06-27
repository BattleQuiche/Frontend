/* eslint-disable no-undef, max-len, no-restricted-globals, no-underscore-dangle */
const cachePrefix = 'quiches-wars';
const cacheStaticName = `${cachePrefix}-static`;
const cacheRequestName = `${cachePrefix}-requests`;
const cacheNamesToDeleteOnUpdate = [cacheStaticName, cacheRequestName];

// define a prefix for your cache names. It is recommended to use your project name
workbox.core.setCacheNameDetails({ prefix: cachePrefix });

// __precacheManifest is the list of resources you want to precache. This list will be generated and imported automatically by workbox during build time
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// ADD MORE REQUEST TO CACHE WITH EXAMPLE BELOW
// workbox.routing.registerRoute(
//   /.+\\.js$/,
//   new workbox.strategies.StaleWhileRevalidate(),
// );

async function installHandler() {
  const staticFiles = [
    // Static file route
  ];

  const requests = [
    '', // For a GET request
    { // For specific request
      url: '', // url to fetch
      params: {
        // fetch params
      },
    },
  ];

  const [staticCache, requestCache] = await Promise.all([caches.open(cacheStaticName), caches.open(cacheRequestName)]);

  const hasRequestCache = await caches.has(cacheRequestName);

  if (!hasRequestCache) {
    throw new Error('Impossible to use ', cacheRequestName, ' cache !');
  }

  // Add static files to its cache
  const cachePromises = [staticCache.addAll(staticFiles)];

  // Add request to its cache
  const reqFetches = [];
  const reqResult = [];

  for (let reqIndex = 0; reqIndex < requests.length; reqIndex += 1) {
    const req = requests[reqIndex];

    let reqUrl = req;
    let reqParams = {};

    if (typeof req !== 'string') {
      reqUrl = req.url;
      reqParams = req.params;
    }

    reqFetches.push(
      fetch(reqUrl, reqParams)
        .then((res) => {
          reqResult.push({
            url: reqUrl,
            res,
          });
        })
        .catch((status, err) => {
          console.warn('Fail to fetch ', status, ' ', err);
        }),
    );
  }

  await Promise.all(reqFetches);

  reqResult.forEach((req) => {
    cachePromises.push(requestCache.put(req.url, req.res));
  });

  await Promise.all(cachePromises);
}

async function fecthHandler(req) {
  caches.open(cacheRequestName).then(async (cache) => {
    const cachedRes = await cache.match(req);

    if (navigator.onLine && !cachedRes) {
      return fetch(req).then((res) => {
        cache.put(req, res.clone());
        return res;
      });
    }

    if (navigator.onLine) {
      fetch(req).then((res) => {
        cache.put(req, res.clone());
      });
    }

    return cachedRes;
  });
}

async function activateHandler() {
  caches.keys().then((cacheNames) => Promise.all(
    cacheNames
      .filter((cacheName) => {
        if (!cacheNamesToDeleteOnUpdate.includes(cacheName)) {
          return false;
        }

        return true;
      })
      .map((cacheName) => caches.delete(cacheName)),
  ));
}

self.addEventListener('install', (event) => {
  event.waitUntil(installHandler());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fecthHandler(event.request));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(activateHandler());
});
