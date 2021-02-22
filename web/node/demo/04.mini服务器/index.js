var http = require('http');
var url = require('url');
var fs = require('fs');
var globalConfig = require('./config.js');
var loader = require('./loader');
var log = require('./log');

http
  .createServer(function (request, response) {
    var path = url.parse(request.url, true);
    var pathName = path.pathname;
    // var query = path.query;
    var isStatic = isStaticsRequest(pathName);

    log('pathName: ' + pathName);

    if (isStatic) {
      // 请求内容为静态文件
      try {
        var data = fs.readFileSync(globalConfig.page_path + pathName);
        response.writeHead(200);
        response.write(data);
        response.end();
      } catch (error) {
        response.writeHead(404);
        response.write('<html><body><h2>404 NotFound</h2></body></html>');
        response.end();
      }
    } else {
      // 请求的动态的数据
      if (loader.has(pathName)) {
        try {
          loader.get(pathName)(request, response);
        } catch (error) {
          response.writeHead(500);
          response.write('<html><body><h2>500 BadServer</h2></body></html>');
          response.end();
        }
      } else {
        response.writeHead(404);
        response.write('<html><body><h2>404 NotFound</h2></body></html>');
        response.end();
      }
    }
  })
  .listen(globalConfig.port);

log('服务已启动');

function isStaticsRequest(pathName) {
  var statics = globalConfig.static_file_type;
  for (var i = 0; i < statics.length; i++) {
    if (pathName.endsWith(statics[i])) return true;
  }
  return false;
}
