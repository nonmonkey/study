var fs = require('fs');
var globalConfig = require('./config');

var fileName = globalConfig.log_path + '/' + globalConfig.log_name;

function log(data) {
  console.log('log:', data);
  fs.writeFile(fileName, data + '\n', { flag: 'a' }, function () {});
}

module.exports = log;
