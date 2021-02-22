var fs = require('fs');
var globalConf = require('./config.js');

var pathMap = new Map();
var files = fs.readdirSync(globalConf.web_path);
for (var i = 0; i < files.length; i++) {
  var tmp = require('./' + globalConf.web_path + '/' + files[i]);
  if (tmp.path) {
    for (var [k, v] of tmp.path) {
      if (pathMap.has(k)) {
        throw new Error('重复的url：[' + k + ']');
      } else {
        pathMap.set(k, v);
      }
    }
  }
}

module.exports = pathMap;
