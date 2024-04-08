/**
 * 大整数相加 不能使用bigint
 * @param {string} a 
 * @param {string} b 
 * @returns 
 */
function sum(a, b) {
  let result = '';
  let len = Math.max(a.length, b.length);

  a = a.padStart(len, '0');
  b = b.padStart(len, '0');

  var carry = 0;
  while (len) {
    var n = +a[len - 1] + +b[len - 1] + carry;

    carry = Math.floor(n / 10);
    result = n % 10 + result

    len = len - 1;
  }

  if (carry) {
    result = carry + result;
  }

  return result;
}

console.log('sum:', sum('4536', '8536'));
console.log('sum:', sum('123', '2'));

