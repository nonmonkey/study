var fs = require('fs');

// 加载配置文件
var globalConf = {};
var config = fs.readFileSync('./server.config').toString();
var configs = config.split('\n');
for (var i = 0; i < configs.length; i++) {
  var tempConf = configs[i].split('=');
  if (tempConf.length < 2) {
    continue;
  } else {
    globalConf[tempConf[0]] = tempConf[1];
  }
}

if (globalConf.static_file_type) {
  globalConf.static_file_type = globalConf.static_file_type.split('|').filter(Boolean);
} else {
  throw new Error('配置文件异常，缺少[static_file_type]字段！');
}

module.exports = globalConf;
