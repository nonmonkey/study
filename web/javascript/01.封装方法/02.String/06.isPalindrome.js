/**
 * 回文验证
 * 例如：abcba
 * 大小写字母、数字 其他字符忽略
 */

function isPalindrome(str = '') {
  if (str.length === 0) return false;
  const isValid = (s) => (s >= 'a' && s <= 'z' || s >= 'A' && s <= 'Z' || s >= '0' && s <= '9');

  let len = str.length,
    i = 0,
    j = len - 1;

  while (i < j) {
    var left = str[i].toLowerCase();
    var right = str[j].toLowerCase();

    if (!isValid(left)) {
      i++;
      break;
    }
    if (!isValid(right)) {
      j--;
      break;
    }
    if (left !== right) return false;

    i++;
    j--;
  }

  return true;
}