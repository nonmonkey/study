
/**
 * 例1: 实现数组读取负数下标
 * @param  {...any} elements 
 */
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    }
  };

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}

// let arr = createArray('a', 'b', 'c');
// arr[-1] // c


/**
 * 例2: 实现属性的链式调用
 * @param {*} value 
 */
var pipe = function (value) {
  var funcStack = [];
  var oproxy = new Proxy({} , {
    get : function (pipeObject, fnName) {
      if (fnName === 'get') {
        return funcStack.reduce(function (val, fn) {
          return fn(val);
        },value);
      }
      funcStack.push(window[fnName]);
      return oproxy;
    }
  });

  return oproxy;
}

// var double = n => n * 2;
// var pow    = n => n * n;
// var reverseInt = n => n.toString().split("").reverse().join("") | 0;

// pipe(3).double.pow.reverseInt.get; // 63


/**
 * 例3: 实现一个生成各种 DOM 节点的通用函数dom
 */
const dom = new Proxy({}, {
  get(target, property) {
    return function(attrs = {}, ...children) {
      const el = document.createElement(property);
      for (let prop of Object.keys(attrs)) {
        el.setAttribute(prop, attrs[prop]);
      }
      for (let child of children) {
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }
        el.appendChild(child);
      }
      return el;
    }
  }
});

const el = dom.div({},
  'Hello, my name is ',
  dom.a({href: '//example.com'}, 'Mark'),
  '. I like:',
  dom.ul({},
    dom.li({}, 'The web'),
    dom.li({}, 'Food'),
    dom.li({}, '…actually that\'s it')
  )
);

// document.body.appendChild(el);


/**
 * 例4: 不大于 200 的整数
 */
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对于满足条件的 age 属性以及其他属性，直接保存
    return Reflect.set(obj, prop, value)
  }
};

// let person = new Proxy({}, validator);

// person.age = 100;

// person.age // 100
// person.age = 'young' // 报错
// person.age = 300 // 报错


/**
 * 例5: 不允许修改或设置下划线开头的属性
 */

const handler = {
  get (target, key, receiver) {
    invariant(key, 'get');
    return Reflect.get(target, key, receiver);
  },
  set (target, key, value, receiver) {
    invariant(key, 'set');
    return Reflect.set(target, key, value, receiver)
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}
// const target = {};
// const proxy = new Proxy(target, handler);
// proxy._prop
// // Error: Invalid attempt to get private "_prop" property
// proxy._prop = 'c'
// // Error: Invalid attempt to set private "_prop" property


/**
 * 例6: has 使用has隐藏某些属性
 */

var handler = {
  has (target, key, receiver) {
    if (key[0] === '_') {
      return false;
    }
    return Reflect.get(target, key, receiver);
  }
};
// var target = { _prop: 'foo', prop: 'foo' };
// var proxy = new Proxy(target, handler);
// '_prop' in proxy // false
