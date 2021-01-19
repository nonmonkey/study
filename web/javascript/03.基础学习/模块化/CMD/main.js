seajs.config({
  // 所有别名基于本路径
  base: './modules/',

  // define each self path
  paths: {
    jQueryPath: 'jquery',
  },

  // define each alias name here
  alias: {
    add: 'add',
    str: 'str',
    obj: 'obj',
    // 'jQuery1.9': 'jquery/jquery-1.9.1.min',
    // 'jQuery1.11': 'jquery/jquery-1.11.0.min',
    // hellow: '../hellow/hellow',
  },

  // preload: 'jQuery1.11',
  vars: {
    locale: 'zh-cn', // 在模块中require调用路径可用格式{key},即{locale}表示变量
  },
});

/* seajs.config 详解：*/
// 1.alias
/**
seajs.config({
  base: 'http://www.main.com/base/',
  alias: {
    'jquery': 'jquery/jquery/1.10.1/jquery',
    'app/biz': 'http://path/to/app/biz.js',
  }
});


define(function(require, exports, module) {
  var $ = require('jquery');
  //=> 加载的是 http://www.main.com/base/jquery/jquery/1.10.1/jquery.js
  var biz = require('app/biz');
  //=> 加载的是 http://path/to/app/biz.js
});
 */

// 2.paths
/**
seajs.config({
  base: 'http://www.main.com/base/',
  paths: {
    'hostA': 'https://www.shenzhen.com/sz',
	  'app': 'path/to/app'
  }
  // 别名配置
  alias: {
    'hostA-jquery': 'hostA/jquery/1.10.1/jquery.js',
  },
});

define(function(require, exports, module) {
  var underscore = require('hostA/underscore');
  //=> 加载的是 https://www.shenzhen.com/sz/underscore.js
  var jquery = require('hostA-jquery');
	//=> 加载的是 https://www.shenzhen.com/sz/jquery/1.10.1/jquery.js
  var biz = require('app/biz');
  //=> 加载的是 http://www.main.com/base/path/to/app/biz.js
});
 */

// 3.vars
/**
seajs.config({
  base: 'http://www.main.com/base/',
  vars: {
    'locale': 'zh-cn'
  }
});

define(function(require, exports, module) {
  var lang = require('i18n/{locale}.js');
    //=> 加载的是 http://www.main.com/base/i18n/zh-cn.js
});
 */

// 4.map (map配置主要用来做调试用途，用来做路径转换、版本号、时间戳等管理)
/**
seajs.config({
   base: 'http://www.main.com/base/',
  'map': [
    [ /(.*?)(\.js)$/i , '$1-debug.js']
  ]
});


define(function(require, exports, module) {
  var a = require('cs/a');
  //=> 加载的是 http://www.main.com/base/cs/a-debug.js
});
 */
