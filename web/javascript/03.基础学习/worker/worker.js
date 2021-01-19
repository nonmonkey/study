console.log('worker this is worker.');
console.log('worker this:', this);

self.onmessage = function (event) {
  console.log('worker onmessage:', event);

  var count = 2000000000;
  while(count--) {}

  self.postMessage(Object.assign(event.data, { count }))
};
