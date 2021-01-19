// // 使用Proxy实现观察者模式

// const queuedObservers = new Set();

// const observe = fn => queuedObservers.add(fn);
// const observable = obj => new Proxy(obj, {set});

// function set(target, key, value, receiver) {
//   const result = Reflect.set(target, key, value, receiver);
//   queuedObservers.forEach(observer => observer());
//   return result;
// }

function sum(...values) {
  return values.reduce((previous, current) => previous + current, 0);
}

let sumProxy = new Proxy(sum, {
  apply: function(trapTarget, thisArg, argumentList) {
    console.log(trapTarget, thisArg, argumentList);
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
