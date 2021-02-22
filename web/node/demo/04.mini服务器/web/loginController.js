const { fchown } = require('fs');
var url = require('url');
var studentService = require('../service/studentService');

var path = new Map();

function getData(request, response) {
  studentService.queryAllStudent(function (data) {
    response.writeHead(200);
    response.write(JSON.stringify(data));
    response.end();
  });
}
path.set('/getData', getData);

// get 请求
function login(request, response) {
  var params = url.parse(request.url, true).query;
  studentService.queryStudentByStuNum(params.stuNum, function (data) {
    var result = '';
    if (!data || data.length === 0) {
      result = 'Fail';
      response.writeHead(401);
      response.write(result);
    } else {
      if (data[0].pwd === params.password) {
        result = 'OK';
        response.writeHead(200);
        response.write(result);
      } else {
        result = 'Fail';
        response.writeHead(401);
        response.write(result);
      }
    }
    response.end();
  });
}
path.set('/login', login);

// post 请求
function login1(request, response) {
  request.on('data', function (data) {
    var params = data.toString();
    var stuNum = params.split('&')[0].split('=')[1];
    var password = params.split('&')[1].split('=')[1];
    studentService.queryStudentByStuNum(stuNum, function (data) {
      var result = '';
      if (!data || data.length === 0) {
        result = 'Fail';
        response.writeHead(401);
        response.write(result);
      } else {
        if (data[0].pwd === password) {
          result = 'OK';
          response.writeHead(200);
          response.write(result);
        } else {
          result = 'Fail';
          response.writeHead(401);
          response.write(result);
        }
      }
      response.end();
    });
  });
}
path.set('/login1', login1);

module.exports.path = path;
