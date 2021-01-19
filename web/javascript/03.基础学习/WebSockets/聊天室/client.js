// 步骤2
const express = require('express'); //引入express模块
const path = require('path'); //引入磁盘路径模块
const app = express();
let port = 3000; //端口
const host = '127.0.0.1'; //主机
app.use(express.static(path.resolve(__dirname, './client'))); //设置要开启服务的路径

const client = function (port, host) {
  app.listen(port, host, () => {
    //监听服务
    console.log(`客户端服务器为:http://${host}:${port}`);
  });
};

client(port++, host);
client(port++, host);
client(port++, host);

/**
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/
