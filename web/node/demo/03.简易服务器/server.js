var net = require('net');
var fs = require('fs');
var globalConf = require('./config.js');

var server = net.createServer();
server.listen(globalConf.port, globalConf.ip);

server.on('listening', function () {
  console.log('服务已启动');
});

server.on('connection', function (scoket) {
  scoket.on('data', function (data) {
    var url = data.toString().split('\r\n')[0].split(' ')[1];
    console.log('url:', url);

    try {
      var dataFile = fs.readFileSync(globalConf.basePath + url);
      scoket.write('HTTP/1.1 200OK\r\n\r\n');
      scoket.write(dataFile);
    } catch (error) {
      console.log('找不到文件！');
      scoket.write('HTTP/1.1 404NotFound\r\n\r\n' + '<html><body><h2>404</h2></body></html>');
    }
    scoket.end();
  });
});
