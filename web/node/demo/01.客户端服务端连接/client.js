var net = require('net');

var socket = net.connect(12306, '127.0.0.1');

/** 方法 start */
socket.setTimeout(2000); // 设置超时时间
socket.write('hello server');
// socket.setEncoding(); // 设置编码
// socket.end(); // 关闭
/** 方法 end */
console.log('socket:', socket);
/** 事件 start */
socket.on('connect', function () {
  console.log('client 已连接到服务器。');
});

socket.on('data', function (data) {
  console.log('client data:', data.toString());
  socket.end();
});

socket.on('end', function () {
  console.log('client end。');
});

socket.on('close', function () {
  console.log('client close。');
});

socket.on('timeout', function () {
  console.log('client 超时了。');
});

socket.on('error', function () {
  console.log('client error。');
});
/** 事件 end */
