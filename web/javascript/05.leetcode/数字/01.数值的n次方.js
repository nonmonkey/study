/**
  实现函数double Power(double base, int exponent)，求base的exponent次方。不得使用库函数，同时不需要考虑大数问题。

  示例 1:

  输入: 2.00000, 10
  输出: 1024.00000
  示例 2:

  输入: 2.10000, 3
  输出: 9.26100
  示例 3:

  输入: 2.00000, -2
  输出: 0.25000
  解释: 2-2 = 1/22 = 1/4 = 0.25

  说明:

  -100.0 < x < 100.0
  n 是 32 位有符号整数，其数值范围是 [−231, 231 − 1] 。

 * @param {number} x
 * @param {number} n
 * @return {number}
 */

var myPow = function (x, n) {
  var _myPow = function (base, exponent) {
    if (exponent === 0) return 1;
    if (exponent === 1) return base;
    var subResult = _myPow(base, Math.floor(exponent / 2));
    return exponent % 2 ? subResult * subResult * base : subResult * subResult;
  };
  var isNegative = n < 0;
  var result = _myPow(x, Math.abs(n));
  return isNegative ? 1 / result : result;
};

var myPow1 = function (x, n) {
  if (n === 0) return 1;
  if (n === 1) return x;
  var isNegative = n < 0;
  n = Math.abs(n);
  var result = n == 2 ** 31 ? (n = 2 ** 31 - 1, x) : 1;
  
  while (n) {
    if (n & 1) result *= x;
    x *= x;
    n = n >> 1;
  }
  return isNegative ? 1 / result : result;
};
console.log('myPow1:', myPow1(-1, 2147483648));
console.log('myPow:', myPow(-1, 2147483648));
