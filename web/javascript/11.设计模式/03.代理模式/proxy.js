/**
  代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。
 */

/* 用高阶函数动态创建代理 start */
// 计算乘积
var mult_1 = function () {
  var a = 1;
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i];
  }
  return a;
};
// 计算加和
var plus_1 = function () {
  var a = 0;
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a + arguments[i];
  }
  return a;
};
// 创建缓存代理的工厂
var createProxyFactory = function (fn) {
  var cache = {};
  return function () {
    var args = Array.prototype.join.call(arguments, ',');
    if (args in cache) return cache[args];
    return (cache[args] = fn.apply(this, arguments));
  };
};

var proxyMult_1 = createProxyFactory(mult_1);
var proxyPlus_1 = createProxyFactory(plus_1);

console.log(proxyMult_1(1, 2, 3, 4));
console.log(proxyMult_1(1, 2, 3, 4));
console.log(proxyPlus_1(1, 2, 3, 4));
console.log(proxyPlus_1(1, 2, 3, 4));
// 输出:24 // 输出:24 // 输出:10 // 输出:10
/* 用高阶函数动态创建代理 end */

/* 虚拟代理实现图片预加载 start */
var myImage = (function () {
  var imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  return {
    setSrc: function (src) {
      imgNode.src = src;
    },
  };
})();

var proxyImage = (function () {
  var img = new Image();
  img.onload = function () {
    myImage.setSrc(this.src);
  };
  return {
    setSrc: function (src) {
      myImage.setSrc('./home.svg');
      img.src = src;
    },
  };
})();

proxyImage.setSrc('./pikaqiu.jpeg');
/* 虚拟代理实现图片预加载 end */

/* 缓存代理-计算乘积 start */
var mult = function () {
  console.log('开始计算乘积。');
  var a = 1;
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i];
  }
  return a;
};
console.log(mult(2, 3));
console.log(mult(2, 3, 4));

// 加入缓存代理
var proxyMult = (function () {
  var cache = {};
  return function () {
    var args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
      return cache[args];
    }
    return (cache[args] = mult.apply(this, arguments));
  };
})();

console.log(proxyMult(1, 2, 3, 4));
console.log(proxyMult(1, 2, 3, 4));
/* 缓存代理-计算乘积 end */
