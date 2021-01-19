/**
 * ownKeys方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。
  Object.getOwnPropertyNames()
  Object.getOwnPropertySymbols()
  Object.keys()
  for...in循环
 */
var target = {
  a: 1,
  b: 2,
  c: 3
};

var handler = {
  ownKeys(target) {
    return ['a'];
  }
};

var proxy = new Proxy(target, handler);

Object.keys(proxy)
// [ 'a' ]


/**
 * 拦截第一个字符为下划线的属性名
 */
var target = {
  _bar: 'foo',
  _prop: 'bar',
  prop: 'baz'
};

var handler = {
  ownKeys (target) {
    return Reflect.ownKeys(target).filter(key => key[0] !== '_');
  }
};

var proxy = new Proxy(target, handler);
for (var key of Object.keys(proxy)) {
  console.log(target[key]);
}

/**
 * 使用Object.keys方法时，有三类属性会被ownKeys方法自动过滤，不会返回：
目标对象上不存在的属性
属性名为 Symbol 值
不可遍历（enumerable）的属性
 */
var target = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.for('secret')]: '4',
};

Object.defineProperty(target, 'key', {
  enumerable: false,
  configurable: true,
  writable: true,
  value: 'static'
});

var handler = {
  ownKeys(target) {
    return ['a', 'd', Symbol.for('secret'), 'key'];
  }
};

var proxy = new Proxy(target, handler);

Object.keys(proxy)
// ['a']


/**
 * ownKeys方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错。
 */
var obj = {};

var p = new Proxy(obj, {
  ownKeys: function(target) {
    return [123, true, undefined, null, {}, []];
  }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 123 is not a valid property name


/**
 * 如果目标对象自身包含不可配置的属性，则该属性必须被ownKeys方法返回，否则报错。
 */
var obj = {};
Object.defineProperty(obj, 'a', {
  configurable: false,
  enumerable: true,
  value: 10 }
);

var p = new Proxy(obj, {
  ownKeys: function(target) {
    return ['b'];
  }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 'ownKeys' on proxy: trap result did not include 'a'


/**
 * 如果目标对象是不可扩展的（non-extensible），这时ownKeys方法返回的数组之中，
 * 必须包含原对象的所有属性，且不能包含多余的属性，否则报错。
 */
var obj = {
  a: 1
};

Object.preventExtensions(obj);

var p = new Proxy(obj, {
  ownKeys: function(target) {
    return ['a', 'b'];
  }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 'ownKeys' on proxy: trap returned extra keys but proxy target is non-extensible
