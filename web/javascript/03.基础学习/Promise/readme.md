[TOC]
***

### 一、简介

Promise 是异步编程的一种解决方案。

**特点：**
1. 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这就是Promise（承诺）这个名字的由来。

2. 状态一旦改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为resolved（已定型）。如果已经发生改变了。你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

**优点：**
1. 有了Promise对象，就可以将异步操作的流程表达出来，避免了层层嵌套的回调函数。
2. 提供统一的接口，使得控制异步操作更加容易。

**缺点：**
1. 无法取消Promise，一旦新建它就会立即执行，无法中途取消。
2. 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
3. 当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

### 二、基本用法
```JS
const promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

resolve函数的作用是，将Promise对象的状态从pending变为fulfilled，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；

reject函数的作用是，将Promise对象的状态从pending变为rejected，在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
```JS
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

#### 1.Promise.prototype.then()

为Promise实例添加状态改变时的回调函数。
第一个参数是resolved状态的回调函数，第二个参数是rejected状态的回调函数，他们都是可选的。

then方法返回的是一个新的Promise实例（注意，不是原来那一个）。因此可以采用链式写法，即then方法后面再调用另一个方法。

#### 2.Promise.prototype.catch()

用于指定发生错误时的回调函数
```JS
p.then((val) => console.log('fulfilled:', val))
  .catch((err) => console.log('rejected', err));

// 等同于
p.then((val) => console.log('fulfilled:', val))
  .then(null, (err) => console.log("rejected:", err));
```

#### 3.Promise.prototype.finally()

用于指定不管Promise对象最后状态如何，都会执行的操作。

下面是一个例子，服务器使用 Promise 处理请求，然后使用finally方法关掉服务器。
```JS
server.listen(port)
  .then(function () {
    // ...
  })
  .finally(server.stop);
```
finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

实现：
```JS
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```

#### 4.Promise.all()

用于将多个Promise实例，包装成一个新的Promise实例。
```JS
const p = Promise.all([p1, p2, p3]);
```
该方法的参数可以不是数组，但必须具有Iterator接口，且返回的每个成员都是Promise实例。

p的状态由p1，p2，p3决定：
1）只有p1，p2，p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1，p2，p3的返回值组成一个数组，传递给p的回调函数。
2）只要p1，p2，p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

#### 5.Promise.race()

将多个Promise实例，包装成一个新的Promise实例。
```JS
const p = Promise.race([p1, p2, p3]);
```
上面的代码中，只要p1，p2，p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的Promise实例的返回值，就传递给p的回调函数。

```JS
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);

p
.then(console.log)
.catch(console.error);
```

#### 6.Promise.allSettled()

该方法接受一组Promise实例作为参数，包装成一个新的Promise实例。只有等到所有这些实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束。
```JS
const promises = [
  fetch('/api-1'),
  fetch('/api-2'),
  fetch('/api-3'),
];
await Promise.allSettled(promises);
removeLoadingIndicator();
```

```JS
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.allSettled([resolved, rejected]);

allSettledPromise.then(function (results) {
  console.log(results);
});
// [
//    { status: 'fulfilled', value: 42 },
//    { status: 'rejected', reason: -1 }
// ]
```

```JS
const promises = [ fetch('index.html'), fetch('https://does-not-exist/') ];
const results = await Promise.allSettled(promises);

// 过滤出成功的请求
const successfulPromises = results.filter(p => p.status === 'fulfilled');

// 过滤出失败的请求，并输出原因
const errors = results
  .filter(p => p.status === 'rejected')
  .map(p => p.reason);
```

#### 7.Promise.any()

该方法接受一组Promise实例作为参数，包装成一个新的Promise实例返回。只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有的参数实例都变成rejected状态，包装实例就会变成rejected状态。
```JS
var resolved = Promise.resolve(42);
var rejected = Promise.reject(-1);
var alsoRejected = Promise.reject(Infinity);

Promise.any([resolved, rejected, alsoRejected]).then(function (result) {
  console.log(result); // 42
});

Promise.any([rejected, alsoRejected]).catch(function (results) {
  console.log(results); // [-1, Infinity]
});
```

#### 8.Promise.resolve()

该方法将现有对象转换为Promise对象
```JS
const jsPromise = Promise.resolve($.ajax('/whatever.json'));
```
```JS
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

**参数：**
1. Promise实例
Promise.resolve将不做任何修改，原封不动地返回这个实例。

2. thenable对象
thenable对象指的具有then方法的对象，比如下面这个对象。
```JS
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function (value) {
  console.log(value);  // 42
});
```
Promise.resolve()方法会将这个对象转为Promise对象，然后就立即执行thenable对象的then()方法。

3. 不是具有then()方法的对象，或根本就不是对象
如果参数是一个原始值，或者是一个不具有then()方法的对象，则Promise.resolve()方法返回一个新的Promise对象，状态为resolved。
```JS
const p = Promise.resolve('Hello');

p.then(function (s) {
  console.log(s)
});
// Hello
```

4. 不带任何参数
直接返回一个resolved状态的Promise对象。
所以，如果希望得到一个Promise对象，比较方便的方法就是直接调用Promise.resolve()方法。

需要注意的是，立即resolved()的Promise对象，是在本轮”事件循环“（event loop）的结束时执行，而不是在下一轮事件循环的开始时。
```JS
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');
// one
// two
// three
```

#### 9.Promise.reject()

返回一个新的Promise实例，该实例的状态为rejected。
```JS
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
```
```JS
Promise.reject('出错了')
.catch(e => {
  console.log(e === '出错了')
})
// true
```
