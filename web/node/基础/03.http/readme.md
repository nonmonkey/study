[TOC]

---

### 一、HTTP 服务器

要开发 HTTP 服务器程序，从头处理 TCP 连接，解析 HTTP 是不现实的。这些工作实际上已经由 NodeJs 自带的 http 模块完成。应用程序并不直接和 HTTP 协议打交道，而是操作 http 模块提供的 request 和 response 对象。

request 对象封装了 HTTP 请求，我们调用 request 对象的属性和方法就可以拿到所有 HTTP 请求的信息。

response 对象封装了 HTTP 响应，我们操作 response 对象的方法，就可以吧 HTTP 响应返回给浏览器。

### 二、Hello world

```JS
// 导入http模块:
var http = require('http');

// 创建http server，并传入回调函数:
var server = http.createServer(function (request, response) {
  // 回调函数接收request和response对象,
  // 获得HTTP请求的method和url:
  console.log(request.method + ': ' + request.url);
  // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
  response.writeHead(200, { 'Content-Type': 'text/html' });
  // 将HTTP响应的HTML内容写入response:
  response.end('<h1>Hello world!</h1>');
});

// 让服务器监听8080端口:
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
```

执行 node hello.js
不要关闭命令提示符，直接打开浏览器输入 http://localhost:8080，即可看到服务器响应的内容

### 三、文件服务器 (file_server.js)

我们可以设定一个目录，然后让web程序变成一个文件服务器。要实现这一点，我们只需要解析request.url中的路径，然后在本地找到对应的文件，把文件内容发送出去就可以了。

```JS
var fs = require('fs'),
  url = require('url'),
  path = require('path'),
  http = require('http');

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);

// 创建服务器:
var server = http.createServer(function (request, response) {
  // 获得URL的path，类似 '/css/bootstrap.css':
  var _url = url.parse(request.url);
  var pathname = _url.pathname;
  console.log('pathname:', pathname);
  // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
  var filepath = path.join(root, pathname);
  // 获取文件状态:
  fs.stat(filepath, function (err, stats) {
    if (!err && stats.isFile()) {
      // 没有出错并且文件存在:
      console.log('200 ' + request.url);
      // 发送200响应:
      response.writeHead(200);
      // 将文件流导向response:
      fs.createReadStream(filepath).pipe(response);
    } else {
      // 出错了或者文件不存在:
      console.log('404 ' + request.url);
      // 发送404响应:
      response.writeHead(404);
      response.end('404 Not Found');
    }
  });
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
```
