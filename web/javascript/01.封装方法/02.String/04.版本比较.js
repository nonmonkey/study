// 判断版本号
const v1 = '12.3.1';
const v2 = '12.16.1';
const v3 = '1.5.6-alpha.1';
const v4 = '1.5.6-beta';
const v5 = '1.6.1';

/** 1.使用数组 */
const _toNum = (n = '') => {
  var result = parseFloat(n)
  return result == n ? result : n;
}
function compareVersion (v1 = '', v2 = '') {
  if (v1 === v2 && v1 && v2) return 0;

  var terminalReg = /[-.]/;
  var _v1 = v1.split(terminalReg);
  var _v2 = v2.split(terminalReg);

  var i = 0;
  while(_v1[i] && _v2[i]) {
    var num1 = _toNum(_v1[i]);
    var num2 = _toNum(_v2[i]);
    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
    i++
  }
}

/** 2.使用迭代器 */
function * walk (str) {
  let part =  '';
  let terminals = ['.', '-'];
  for (var i = 0; i < str.length; i++) {
    if (terminals.includes(str[i])) {
      yield part;
      part = ''
    } else {
      part += str[i];
    }
  }
  if (part) {
    yield part;
  }
}