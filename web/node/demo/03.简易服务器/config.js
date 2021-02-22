var fs = require('fs');

// 加载配置文件
var globalConf = {};
var config = fs.readFileSync('./server.config').toString();
var confs = config.split('\n');
for (var i = 0; i < confs.length; i++) {
  var tempConf = confs[i].split('=');
  if (tempConf.length < 2) {
    continue;
  } else {
    globalConf[tempConf[0]] = tempConf[1];
  }
}

if (globalConf.path_position === 'relative') {
  // 相对路径
  globalConf.basePath = __dirname + globalConf.path;
} else {
  // 绝对路径
  globalConf.basePath = globalConf.path;
}

module.exports = globalConf;
