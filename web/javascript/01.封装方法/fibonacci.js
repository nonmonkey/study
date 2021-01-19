var fibonacci = (function () {
  var arr = [0, 1];

  return function (n) {
    if (n === 0 || arr[n]) return arr[n];

    var i = arr.length;
    while (i <= n) {
      arr[i] = arr[i - 1] + arr[i - 2];
      i++;
    }

    return arr[n];
  };
})();

function fibonacci_for(n) {
  if (n < 2) return n;
  var n0 = 0;
  var n1 = 1;
  var result = 0;

  for (var i = 2; i <= n; i++) {
    result = n0 + n1;
    n0 = n1;
    n1 = result;
  }

  return result;
}

function fibonacci_recursive(n) {
  return n > 1 ? fibonacci_recursive(n - 1) + fibonacci_recursive(n - 2) : n;
}

function fibonacci_math(n) {
  let pow5 = 5 ** 0.5;
  return Math.round((1 / pow5) * (((1 + pow5) / 2) ** n - ((1 - pow5) / 2) ** n));
}
/*
function fibonacci_math(n) {
  let pow5 = Math.pow(5, .5);
  return Math.round((1 / pow5) * (Math.pow((1 + pow5) / 2, n) - Math.pow((1 - pow5) / 2, n)));
}
*/

/**
一只青蛙可以跳1级、2级……n级。此时青蛙跳上一个n级的台阶有多少种跳法。
数学归纳法是f(n)=2^(n-1)
f(1) = 1 = 2^0;
f(2) = 2 = 2^(2-1)
f(3) = 4 = 2^(3-1)
...
f(n) = 2^(n-1) = f(n-1) + f(n-2) + f(n-3) + ... + f(1) + f(0)

证明：
f(n+1) = f(n) + f(n-1) + f(n-2) + f(n-3) + ... + f(1) + f(0)
       = 2^(n-1) + 2^(n-2) + 2^(n-3) + ... + 2^0 + 1
       = (1 - 2^n) / (1 - 2) + 1
       = 2^n - 1 + 1
       = 2^n

 */

function jumpFloorII(number) {
  return Math.pow(2, number - 1);
}
// 不过,用位运算更快

function jumpFloorII(number) {
  return 1 << --number;
}

/**
可以用2*1的小矩形横着或者竖着去覆盖大矩形。请问用8个2*1的小矩形无重叠覆盖一个2*8的大矩阵总共有多少种方法？
先把2*8的覆盖方法记为f(8)，用第一个覆盖时，可以横着或者竖着。竖着放的时候，还剩下2*7的矩形，记为f(7)。横着放的时候，另一个也只能横着放，还剩下2*6的矩形，记为f(6)。所以还是斐波那契数列。
 */
function rectCover(number) {
  let res = [0, 1, 2];
  if (number <= 2) {
    return res[number];
  }
  let tmp,
    n1 = 1,
    n2 = 2;
  for (let i = 3; i <= number; i++) {
    tmp = n1 + n2;
    n1 = n2;
    n2 = tmp;
  }
  return tmp;
}
