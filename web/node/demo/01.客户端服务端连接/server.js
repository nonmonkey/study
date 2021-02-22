var net = require('net'); // 网络层和传输层 遵循的是TCP/IP协议

var server = net.createServer();

/** 方法 start */
server.listen(12306, '127.0.0.1');
// server.address() // 返回本地地址信息（只有在回调函数中才有打印）
// server.close(); // 关闭
/** 方法 end */

/** 事件 start */
server.on('listening', () => {
  console.log('service 服务已启动');
  // console.log('service server.address:', server.address()); // { address: '127.0.0.1', family: 'IPv4', port: 12306 }
});

server.on('connection', (socket) => {
  console.log('service 有新的连接');

  // socket.on('data', (data) => {
  //   console.log('server data:', data.toString());
  //   socket.write('hello client!');
  // });

  // socket.on('close', () => {
  //   console.log('server close:');
  //   server.close();
  // });
});

// 一般不用，而是使用杀线程的方式
server.on('close', () => {
  console.log('service 服务已关闭');
});

// 一般不用
server.on('error', () => {
  console.log('service 有新的连接');
});
/** 事件 end */
