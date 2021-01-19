/**
  发布—订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。
  在 JavaScript 开发中，我们一般用事件模型来替代传统的发布—订阅模式。

  发布—订阅模式的优点非常明显，一为时间上的解耦，二为对象之间的解耦。它的应用非常 广泛，既可以用在异步编程中，也可以帮助我们完成更松耦合的代码编写。发布—订阅模式还可 以用来帮助实现一些别的设计模式，比如中介者模式。从架构上来看，无论是 MVC 还是 MVVM， 都少不了发布—订阅模式的参与，而且 JavaScript 本身也是一门基于事件驱动的语言。

  当然，发布—订阅模式也不是完全没有缺点。创建订阅者本身要消耗一定的时间和内存，而 且当你订阅一个消息后，也许此消息最后都未发生，但这个订阅者会始终存在于内存中。另外， 发布—订阅模式虽然可以弱化对象之间的联系，但如果过度使用的话，对象和对象之间的必要联 系也将被深埋在背后，会导致程序难以跟踪维护和理解。特别是有多个发布者和订阅者嵌套到一 起的时候，要跟踪一个 bug 不是件轻松的事情。
 */

/*
  现在看看如何一步步实现发布—订阅模式：
    1.首先要指定好谁充当发布者(比如售楼处);
    2.然后给发布者添加一个缓存列表，用于存放回调函数以便通知订阅者(售楼处的花名册);
    3.最后发布消息的时候，发布者会遍历这个缓存列表，依次触发里面存放的订阅者回调函数
 */
/* 售楼处实例 start */
var salesOffices = {}; // 定义售楼处

salesOffices.clientList = {}; // 缓存列表，存放订阅者的回调函数。

salesOffices.listen = function (key, fn) {
  // 添加订阅者
  if (!this.clientList[key]) {
    this.clientList[key] = [];
  }
  this.clientList[key].push(fn); // 订阅的消息添加进缓存列表
};

salesOffices.trigger = function () {
  var key = Array.prototype.shift.call(arguments);
  var fns = this.clientList[key];
  if (!fns || fns.length === 0) return false;

  for (var i = 0, l = fns.length; i < l; i++) {
    fns[i].apply(this, arguments);
  }
};

// 测试
// 小明订阅消息
salesOffices.listen('squareMeter88', function (price) {
  console.log('价格：squareMeter88', price);
});
// 小红订阅消息
salesOffices.listen('squareMeter100', function (price) {
  console.log('价格：squareMeter100', price);
});

salesOffices.trigger('squareMeter88', 2000000);
salesOffices.trigger('squareMeter100', 3000000);
/* 售楼处实例 end */

/* 发布订阅模式的通用实现 start */
var event = {
  clientList: {},
  listen: function (key, fn) {
    // 添加订阅
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn); // 订阅的消息添加进缓存列表
  },
  trigger: function () {
    // 发布
    var key = Array.prototype.shift.call(arguments);
    var fns = this.clientList[key];

    if (!fns || fns.length === 0) return false; // 没有绑定对应的消息

    for (var i = 0, l = fns.length; i < l; i++) {
      // arguments是trigger时带上的参数
      fns[i].apply(this, arguments);
    }
  },
  remove(key, fn) {
    // 取消订阅
    var fns = this.clientList[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns.length = 0;
    } else {
      for (var l = fns.length - 1; l >= 0; l--) {
        var _fn = fns[l];
        if (_fn === fn) fns.splice(l, 1);
      }
    }
  },
};

// 定义一个installEvent函数，可以给所有对象都动态安装发布订阅功能
var installEvent = function (obj) {
  for (var i in event) {
    obj[i] = event[i];
  }
};

/** 测试
  var salesOffices = {};
  installEvent(salesOffices);
  salesOffices.listen('squareMeter88', fn1 = function(price) { console.log('价格1: ', price) })
  salesOffices.listen('squareMeter88', fn2 = function(price) { console.log('价格2: ', price) })
  salesOffices.trigger('squareMeter88', 2000000);
  salesOffices.remove( 'squareMeter88', fn1 )
  salesOffices.trigger('squareMeter88', 2000000);
 */
/* 发布订阅模式的通用实现 end */

/* 全局的发布-订阅对象 start */
// 发布—订阅模式可以用一个全局的 Event 对象来实现，订阅者不需要了解消 息来自哪个发布者，
// 发布者也不知道消息会推送给哪些订阅者，Event 作为一个类似“中介者” 的角色，把订阅者和发布者联系起来
var globalEvent = (function () {
  clientList = {};

  var listen = function (key, fn) {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    clientList[key].push(fn);
  };

  var trigger = function () {
    var key = Array.prototype.shift.call(arguments);
    var fns = clientList[key];
    if (!fns || fns.length === 0) return false;

    for (var i = 0, l = fns.length; i < l; i++) {
      fns[i].apply(this, arguments);
    }
  };

  var remove = function (key, fn) {
    var fns = clientList[key];
    if (!fns) return false;
    if (!fn) {
      fns.length = 0;
    } else {
      for (var l = fns.length - 1; l >= 0; l--) {
        var _fn = fns[l];
        if (_fn === fn) fns.splice(l, 1);
      }
    }
  };

  return {
    listen,
    trigger,
    remove,
  };
})();

globalEvent.listen('haha', function (name) {
  console.log('参数:', name);
});
globalEvent.trigger('haha', 'xiaoming');
/* 全局的发布-订阅对象 end */

/* 全局事件的命名冲突(使用命名空间) start */
var Event_Namespace = (function () {
  var global = this;
  var Event = null;
  var _default = 'default';

  Event = (function () {
    var _slice = Array.prototype.slice;
    var _shift = Array.prototype.shift;
    var _unshift = Array.prototype.unshift;
    var namespaceCache = {};
    var _create;
    var find;
    var each = function (arr, fn) {
      var result;
      for (var i = 0, l = arr.length; i < l; i++) {
        var n = arr[i];
        result = fn.call(n, i, n);
      }
      return result;
    };

    var _listen = function (key, fn, cache) {
      if (!cache[key]) cache[key] = [];
      cache[key].push(fn);
    };

    var _trigger = function () {
      var cache = _shift.call(arguments);
      var key = _shift.call(arguments);
      var args = arguments;
      var _self = this;
      var stack = cache[key];

      if (!stack || !stack.length) return;

      return each(stack, function () {
        return this.apply(_self, args);
      });
    };

    var _remove = function (key, cache, fn) {
      if (cache[key]) {
        if (fn) {
          for (var l = cache.length - 1; l >= 0; l--) {
            if (cache[key][i] === fn) {
              cache[key].splice(i, l);
              break;
            }
          }
        } else {
          cache[key].length = 0;
        }
      }
    };

    var _create = function (namespace) {
      var namespace = namespace || _default;
      var cache = {};
      var offlineStack = []; // 离线事件
      var result = {
        listen: function (key, fn, last) {
          _listen(key, fn, cache);
          if (offlineStack === null) return;
          if (last === 'last') {
            offlineStack.length && offlineStack.pop()();
          } else {
            each(offlineStack, function () {
              this();
            });
          }
          offlineStack = null;
        },
        one: function (key, fn, last) {
          _remove(key, cache);
          this.listen(key, fn, last);
        },
        remove: function (key, fn) {
          _remove(key, cache, fn);
        },
        trigger: function () {
          var _self = this;
          var args = arguments;
          _unshift.call(args, cache);
          var fn = function () {
            return _trigger.apply(_self, args);
          };

          if (offlineStack) {
            return offlineStack.push(fn);
          }
          return fn();
        },
      };

      return namespace
        ? namespaceCache[namespace]
          ? namespaceCache[namespace]
          : (namespaceCache[namespace] = result)
        : result;
    };

    return {
      create: _create,
      one: function (key, fn, last) {
        var event = this.create();
        event.one(key, fn, last);
      },
      remove: function (key, fn) {
        var e = this.create();
        e.remove(key, fn);
      },
      listen: function (key, fn, last) {
        var e = this.create();
        e.listen(key, fn, last);
      },
      trigger: function () {
        var e = this.create();
        e.trigger.apply(this, arguments);
      },
    };
  })();

  return Event;
})();

// 测试
// 先发布后订阅
Event_Namespace.trigger('click', 1);
Event_Namespace.listen('click', function (a) {
  console.log('a:', a);
});
// 使用命名空间
Event_Namespace.create('namespace1').listen('click', function (a) {
  console.log(a); // 输出:1
});

Event_Namespace.create('namespace1').trigger('click', 1111);

Event_Namespace.create('namespace2').trigger('click', 2222);

Event_Namespace.create('namespace2').listen('click', function (a) {
  console.log(a); // 输出:1
});

/* 全局事件的命名冲突(使用命名空间) end */
