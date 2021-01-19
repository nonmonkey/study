if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/serviceWorker/sw.js', /* { scope: '/serviceWorker/' } */)
    .then(function (registration) {
      /* 注册 Service Worker 成功 */
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    })
    .catch(function (err) {
      /* 注册 Service Worker 失败 */
      console.log('ServiceWorker registration failed: ', err);
    });
}
