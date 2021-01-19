console.log('main this is main.js');

let worker = new Worker('./worker.js', { name: 'myWorker1' });

console.log('main worker:', worker);

worker.onmessage = function (event) {
  console.log('main onmessage:', event);
};

worker.onerror = function (event) {
  console.log('main onerror:', event);
};

worker.onmessageerror = function (event) {
  console.log('main onmessageerror:', event);
};

worker.postMessage({ command: 'sum', num: 100000 });

console.log('main this is main end');
