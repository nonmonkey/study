// serviceWorker.js
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = ['/serviceWorker', '/serviceWorker/styles/main.css', '/serviceWorker/script/main.js'];

self.addEventListener('install', function (event) {
  console.log('this is install:', event);
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    // 根据请求 URL，查找缓存是否对应的缓存响应
    caches.match(event.request).then(function (response) {
      console.log('response:', response);
      if (response) {
        // 判断存在缓存响应，直接返回
        return response;
      }
      return fetch(event.request);
    })
  );
});
