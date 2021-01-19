/**
  给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。

  示例 1:

  输入: num1 = "2", num2 = "3"
  输出: "6"
  示例 2:

  输入: num1 = "123", num2 = "456"
  输出: "56088"
  说明：

  num1 和 num2 的长度小于110。
  num1 和 num2 只包含数字 0-9。
  num1 和 num2 均不以零开头，除非是数字 0 本身。
  不能使用任何标准库的大数类型（比如 BigInteger）或直接将输入转换为整数来处理。

  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/multiply-strings
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
var multiply = function (num1, num2) {
  if (num1 == 0 || num2 == 0) return '0';

  var result = [];

  for (var i = 0, len1 = num1.length; i < len1; i++) {
    var tmp1 = num1[len1 - 1 - i];
    for (var j = 0, len2 = num2.length; j < len2; j++) {
      var tmp2 = num2[len2 - 1 - j];
      var pos = result[i + j] ? result[i + j] + tmp1 * tmp2 : tmp1 * tmp2;
      result[i + j] = pos % 10;
      pos >= 10 &&
        (result[i + j + 1] = result[i + j + 1] ? result[i + j + 1] + Math.floor(pos / 10) : Math.floor(pos / 10));
    }
  }
  return result.reverse().join('');
};

console.log(multiply('123', '456'));
