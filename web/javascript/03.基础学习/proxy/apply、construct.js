/**
 * 例1: 结果翻倍
 */

var twice = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
};
function sum (left, right) {
  return left + right;
};
// var proxy = new Proxy(sum, twice);
// proxy(1, 2) // 6
// proxy.call(null, 5, 6) // 22
// proxy.apply(null, [7, 8]) // 30

/**
 * 验证函数，增加了一些可能改变函数执行方式的可能性。
 */
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

// console.log(sumProxy(1, 2, 3, 4)); // 10
// console.log(sumProxy(1, '2', '3', 5)); // 抛出错误
// let result = new sumProxy(); // 抛出错误
