var net = require('net');

var server = net.createServer();
server.listen(12306, '127.0.0.1');

server.on('listening', function () {
  console.log('服务已启动');
});

server.on('connection', function (socket) {
  console.log('server 有新的连接');
  socket.on('data', function (data) {
    console.log('server data:', data.toString());
    var request = data.toString().split('\r\n');
    var url = request[0].split(' ')[1];
    console.log('url:', url);
    socket.write('HTTP 200OK\r\nContent-type:text/html\r\n\r\n<html><body>hello brower</body></html>');
  });
});
