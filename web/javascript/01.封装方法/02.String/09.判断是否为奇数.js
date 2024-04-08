/**
 * 判断是否为奇数
 * @param {*} n 
 */
function isOdd(n) {
  if (typeof n !== 'number') {
    throw new TypeError(`${n} is not a number.`);
  }

  return n % 2 === 1 || n % 2 === -1
}

console.log(isOdd(123));
console.log(isOdd(22));
