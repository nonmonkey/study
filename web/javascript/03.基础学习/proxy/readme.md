[TOC]

---

### Proxy

new Proxy(target, handler);

target：目标

handler：处理程序，定义一个或多个陷阱的对象。

| 代理陷阱                 | 覆写的特性                                                                | 默认特性                           |
| ------------------------ | ------------------------------------------------------------------------- | ---------------------------------- |
| get                      | 读取一个属性                                                              | Reflect.get()                      |
| set                      | 写入一个属性                                                              | Reflect.set()                      |
| has                      | in 操作符                                                                 | Reflect.has()                      |
| deleteProperty           | delete 操作符                                                             | Reflect.deleteProperty()           |
| getPrototypeOf           | Object.getPrototypeOf()                                                   | Reflect.getPrototypeOf()           |
| setPrototypeOf           | Object.setPrototypeOf()                                                   | Reflect.setPrototypeOf()           |
| isExtensible             | Object.isExtensible()                                                     | Reflect.isExtensible()             |
| preventExtensions        | Object.preventExtensions()                                                | Reflect.preventExtensions()        |
| getOwnPropertyDescriptor | Object.getOwnPropertyDescriptor()                                         | Reflect.getOwnPropertyDescriptor() |
| defineProperty           | Object.defineProperty()                                                   | Reflect.defineProperty()           |
| ownKeys                  | Object.keys() Object.getOwnPropertyNames() Object.getOwnPropertySymbols() | Reflect.ownKeys()                  |
| apply                    | 调用一个函数                                                              | Reflect.apply()                    |
| construct                | 用 new 调用一个函数                                                       | Reflect.construct()                |

例 1: 该示例中，proxy.name 和 target.name 引用的都是 target.name

```JS
let target = {};
let proxy = new Proxy(target, {});
proxy.name = 'proxy';
console.log(proxy.name); // proxy
console.log(target.name); // proxy

target.name = 'target';
console.log(proxy.name); // target
console.log(target.name); // target
```

#### 一、代理陷阱

##### 1.set

参数：

- trapTarget 用于接收属性（代理的目标）的对象
- key 要写入的属性键（字符串或 Symbol 类型）
- value 被写入属性的值
- receiver 操作发生的对象（通常是代理）

例：创建一个属性值是数字的对象：

```JS
let target = { name: 'target' };
let proxy = new Proxy(target, {
    set(trapTarget, key, value, receiver) {
        if (!trapTarget.hasOwnProperty(key)) {
            if (typeof value !== 'number') {
                throw new TypeError('属性必须是数字');
            }
        }
        return Reflect.set(trapTarget, key, value, receiver)
    }
});

proxy.name = 'proxy'; // proxy 因为已经有name属性了，给不存在的属性赋值会抛出错误
proxy.name1 = 'proxy'; // 报错
```

##### 2.get

参数：
- trapTarget 用于接收属性（代理的目标）的对象
- key 要写入的属性键（字符串或 Symbol 类型）
- receiver 操作发生的对象（通常是代理）

例：访问对象中不存在的属性抛出错误

```JS
let target = { name: 'target' };
let proxy = new Proxy(target, {
    get(trapTarget, key, receiver) {
        if (!(key intrapTarget)) { // 用in操作符检查trapTarget而不检查receiver，是为了防止receiver代理含有has陷阱
            throw new TypeError('属性 ' + key + ' 不存在');
        }
        return Reflect.get(trapTarget, key, receiver);
    }
});

console.log(proxy.name); // target
console.log(proxy.name1); // 属性 name1 不存在
```

##### 3.has

每当使用 in 操作符时都会调用 has 陷阱

参数：
- trapTarget 用于接收属性（代理的目标）的对象
- key 要写入的属性键（字符串或 Symbol 类型）

例：隐藏某个属性

```JS
let target = { name: 'target', value: '1111' };
let proxy = new Proxy(target, {
    has(trapTarget, key) {
        if (key === 'value') {
            return false;
        } else {
            return Reflect.has(trapTarget, key);
        }
        return Reflect.get(trapTarget, key, receiver);
    }
});

console.log('name' in proxy); // true
console.log('value' in proxy); // false
```

##### 4.deleteProperty

delete 操作符可以从对象中移除属性，如果成功返回 true，不成功返回 false。

在非严格模式下删除一个不可配置属性，会导致程序抛出错误，严格模式下会报错。

参数：
- trapTarget 用于接收属性（代理的目标）的对象
- key 要写入的属性键（字符串或 Symbol 类型）

例：确保 value 不被删除，且在严格模式下不报错

```JS
let target = { name: 'target', value: '2321' };
let proxy = new Proxy(target, {
  deleteProperty(trapTarget, key) {
    if (key === 'value') {
      return false;
    } else {
      return Reflect.deleteProperty(trapTarget, key);
    }
  }
});

console.log('value' in proxy); // true
let result1 = delete proxy.value;
console.log('result1:', result1); // false
console.log('value' in proxy); // true
```

##### 5.getPrototypeOf

如果传入的参数不是对象，则 Relect.getprototypeOf()方法会抛出错误，而 Object.getPrototypeOf()方法则会在操作执行前先将参数强制转换为一个对象

参数：
- trapTarget 用于接收属性（代理的目标）的对象

```JS
let result = Object.getPrototypeOf(1);
console.log(result === Number.prototype); // true
Reflect.getPrototypeOf(1); // 抛出错误
```

##### 6.setPrototypeOf
Reflect.setPrototypeOf 方法返回一个布尔值来表示操作是否成功，如果操作失败则返回的一定是 false，此时 Object.setPrototypeOf 方法会抛出错误，如果 setPrototypeOf 返回了任何不是 false 的值，那么 Object.setPrototypeOf 便假设操作成功。

参数
- trapTarget 用于接收属性（代理的目标）的对象
- proto 作为原型使用的对象

```JS
let target1 = {};
let result1 = Object.setPrototypeOf(target1, {});
console.log(target1 === result1); // true

let target2 = {};
let result2 = Reflect.setPrototypeOf(target2, {});
console.log(target2 === result2); // false
console.log(result2); // true
```

##### 7.isExtensible
只有在传入非对象时，Object.isExtensible 返回 false，而 Reflect.isExtensible 则抛出一个错误。

参数：
- trapTarget 用于接收属性（代理的目标）的对象

```JS
let result1 = Object.isExtensible(2);
console.log(result1); // false
let result2 = Reflect.isExtensible(2); // 抛出错误
```

##### 8.preventExtensions
无论传入 Object.preventExtensions()方法的参数是否为一个对象，总是返回该参数。

而如果 Reflect.preventExtensions()方法的参数不是对象就会抛出错误。如果是对象，则返回布尔值。

参数：
- trapTarget 用于接收属性（代理的目标）的对象

```JS
let target = { name: 'target', value: '2321' };
let proxy = new Proxy(target, {
  isExtensible(trapTarget) {
    return Reflect.isExtensible(trapTarget);
  },
  preventExtensions(trapTarget) {
    return Reflect.preventExtensions(trapTarget);
  }
});

console.log(Object.isExtensible(target)); // true
console.log(Object.isExtensible(proxy)); // true

Object.preventExtensions(proxy);
console.log(Object.isExtensible(target)); // false
console.log(Object.isExtensible(proxy)); // false
```

##### 9.defineProperty

Object.defineProperty()方法返回第一个参数，而 Reflect.defineProperty()的返回值与操作有关。

参数：
- trapTarget 用于接收属性（代理的目标）的对象
- key 属性的键（字符串或 symbol）
- descriptor 属性的描述符对象

例：阻止 symbol 类型

```JS
let proxy = new Proxy({}, {
  defineProperty(trapTarget, key, descriptor) {
    if (typeof key === 'symbol') {
      return false;
    }
    return Reflect.defineProperty(trapTarget, key, descriptor);
  },
});

Object.defineProperty(proxy, 'name', {
  value: 'proxy',
})

console.log(proxy.name); // proxy

let nameSymbol = Symbol('name');
Object.defineProperty(proxy, nameSymbol, { // 抛出错误
  value: 'proxy',
})
```

##### 10.getOwnPropertyDescriptor

返回值必须为 null、undefined 或一个对象。如果返回对象，则对象的属性只能为 enumerable、configurable、value、writable、get 和 set，不然会抛出一个错误。
调用 Object.getOwnPropertyDescripter()方法时传入原始值作为第一个参数，内部会将这个值强制转换为一个对象。
若调用 Reflect.getOwnPropertyDescripter()方法时传入原始值作为第一个参数，则抛出一个错误。
参数：

- trapTarget 用于接收属性（代理的目标）的对象
- key 属性的键（字符串或 symbol）

##### 11.ownKeys

通过 Reflect.ownKeys 方法实现默认的行为，返回的数组中包含所有自有属性的键名，字符串类型和 Symbol 类型。

Object.getOwnPropertyNames()方法和 Object.keys()方法返回的结果将 Symbol 类型的属性名排除在外。

Object.getOwnPropertySymbols()方法返回的结果将字符串类型的属性名排除在外。

Object.assgin()方法支持字符串和 Symbol 两种类型。

ownKeys 陷阱也会影响 for-in 循环，当确定循环内部使用的键时会调用陷阱。

返回值：数组或者类数组对象，否则抛出错误。

参数：

- trapTarget 用于接收属性（代理的目标）的对象

```JS
let proxy = new Proxy({}, {
  ownKeys(trapTarget) {
    return Reflect.ownKeys(trapTarget).filter(key => {
      return typeof key !== 'string' || key[0] !== '_';
    });
  },
});

let nameSymbol = Symbol('name');

proxy.name = 'proxy';
proxy._name = 'private';
proxy[nameSymbol] = 'symbol';

let names = Object.getOwnPropertyNames(proxy);
  keys = Object.keys(proxy)
  symbols = Object.getOwnPropertySymbols(proxy);

console.log(names); // ["name"]
console.log(keys); // ["name"]
console.log(symbols); // [Symbol(name)]
```

##### 12.apply

参数：
- trapTarget 用于接收属性（代理的目标）的对象
- thisArg 函数被调用时内部 this 的值
- argumentsList 传递给函数的参数数组

```JS
    let target = function() { return 42; },
        proxy = new Proxy(target, {
          apply: function(trapTarget, thisArg, argumentList) {
            return Reflect.apply(trapTarget, thisArg, argumentList);
          },
          construct: function(trapTarget, argumentList) {
            return Reflect.construct(trapTarget, argumentList);
          }
        })

    console.log(typeof proxy); // function
    console.log(proxy()); // 42

    var instance = new proxy();
    console.log(instance instanceof proxy); // true
    console.log(instance instanceof target); // true
```

##### 13.construct
new.target 元属性，它是用 new 调用函数时对该函数的引用。可以通过 new.target 的值来确定函数是否是通过 new 来调用的。
例：

```JS
function Numbers(...values) {
  if (typeof new.target === 'undefined') {
    throw new TypeError('该函数必须通过new来调用');
  }
  this.values = values;
}
```

参数：
- trapTarget 用于接收属性（代理的目标）的对象
- argumentsList 传递给函数的参数数组

例：验证函数，增加了一些可能改变函数执行方式的可能性。

```JS
    function sum(...values) {
      return values.reduce((previous, current) => previous + current, 0);
    }
    let sumProxy = new Proxy(sum, {
      apply: function(trapTarget, thisArg, argumentList) {
        argumentList.forEach((arg) => {
          if (typeof arg !== 'number') {
            throw new TypeError('所有参数必须是数字。');
          }
        });
        return Reflect.apply(trapTarget, thisArg, argumentList);
      },

      construct(trapTarget, argumentList) {
        throw new TypeError('该函数不可能通过new来调用！')
      }
    })

    console.log(sumProxy(1, 2, 3, 4)); // 10
    console.log(sumProxy(1, '2', '3', 5)); // 抛出错误
    let result = new sumProxy(); // 抛出错误
```

例：覆写抽象基类构造函数

```JS
    class AbstractNumbers {
      constructor(...values) {
        if (new.target === AbstractNumbers) {
          throw new TypeError('次函数必须被继承！');
        }
        this.values = values;
      }
    }

    class Numbers extends AbstractNumbers {}
    let instance = new Numbers(1, 2, 3, 4);
    console.log(instance.values); // [1, 2, 3, 4]
    new AbstractNumbers(1, 2, 3, 4);
```

#### 二、撤销代理
Proxy.revocable()
参数：
- target：目标
- handler：处理程序，定义一个或多个陷阱的对象。

返回对象：

- proxy 可被撤销的代理对象
- revoke 撤销代理要调用的函数

例：

```JS
let target = {
  name: 'target',
}

let { proxy, revoke } = Proxy.revocable(target, {});
console.log(proxy.name); // 'target'
revoke();
console.log(proxy.name); // 报错
```

#### 三、将代理用作原型
##### 1.defineProperty
在对象中定义属性的操作不需要操作对象原型，所以代理中的 defineProperty 陷阱永远不会被调用，name 作为自有属性被添加到 newTarget 上。
例：

```JS
let target = {};
let newTarget = Object.create(new Proxy(target, {
  // 不会被调用
  defineProperty(trapTarget, name, descriptor) {
    // 如果调用会返回一个错误
    return false;
  }
}))

Object.defineProperty(newTarget, 'name', {
  value: 'newTarget',
})

console.log(newTarget.name); // 'newTarget'
console.log(newTarget.hasOwnProperty('name')); // true
```

##### 2.get
每当指定名称的自有属性不存在时，会调用原型上的陷阱。

```JS
function NoSuchProperty() { }

let proxy = new Proxy({}, {
  get(trapTarget, key, receiver) {
    throw new ReferenceError(`${key} doesnot exist!`);
  }
});

NoSuchProperty.prototype = proxy;

class Square extends NoSuchProperty {
  constructor(length, width) {
    super();
    this.length = length;
    this.width = width;
  }
}

let shape = new Square(2, 6);
let shapeProto = Object.getPrototypeOf(shape);
console.log(shapeProto === proxy); // false
let secondLevelProto = Object.getPrototypeOf(shapeProto);
console.log(secondLevelProto === proxy); // true
```

##### 3.set
如果属性不是代理对象的自有属性，则 set 陷阱会被调用。

##### 4.has
当你用代理作为原型时，只有指定名称没有对应的自有属性时才会调用 has 陷阱。

#### 四、this 问题
虽然 proxy 可以代理针对目标对象的访问，但他不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因是在 proxy 代理拦截的情况下，目标对象内部的 this 关键字指向 proxy 代理。

```JS
const target = {
  m: function () {
    console.log(this === proxy);
  }
};
const handler = {};

const proxy = new Proxy(target, handler);

target.m() // false
proxy.m()  // true
```

此外，有些原生对象的内部属性，只有通过正确的 this 才能拿到，所以 Proxy 也无法代理这些原生对象的属性

```JS
const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);

proxy.getDate();
// TypeError: this is not a Date object.
```

this 绑定原始对象，可以解决这个问题

```JS
const target = new Date('2015-01-01');
const handler = {
  get(target, prop) {
    if (prop === 'getDate') {
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  }
};
const proxy = new Proxy(target, handler);

proxy.getDate() // 1
```

### Reflect

#### 1.概述
（1）将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty），放到 Reflect 对象上。现阶段，某些方法同时在 Object 和 Reflect 对象上部署，未来的新方法将只部署在 Reflect 对象上。也就是说，从 Reflect 对象上可以拿到语言内部的方法。
（2）修改某些 Object 方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而 Reflect.defineProperty(obj, name, desc)则返回 false

```JS
// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
```

（3）让 Object 操作都变成函数行为。某些 Object 操作是命令式，比如 name in obj 和 delete obj[name]，而 Reflect.has(obj, name)和 Reflect.deleteProperty(obj, name)让他们变成了函数行为
（4）Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便得地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为。

##### 2.静态方法
Reflect.apply(target, thisArg, args)
Reflect.construct(target, args)
Reflect.get(target, name, receiver)
Reflect.set(target, name, value, receiver)
Reflect.defineProperty(target, name, desc)
Reflect.deleteProperty(target, name)
Reflect.has(target, name)
Reflect.ownKeys(target)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.getOwnPropertyDescriptor(target, name)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, prototype)
