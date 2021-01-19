/**
编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例 1:

输入: ["flower","flow","flight"]
输出: "fl"
示例 2:

输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。

说明:
所有输入只包含小写字母 a-z 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-common-prefix
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

var longestCommonPrefix = function (strs) {
  var len = strs.length;
  if (len < 2) return strs.toString();

  var result = '';
  var str1 = strs[0];
  var len1 = str1.length;
  for (var p = 0; p < len1; p++) {
    var s = str1[p];
    for (var i = 1; i < len; i++) {
      if (strs[i][p] !== s) return result;
    }
    result += s;
  }

  return result;
};

var arr1 = ['flower', 'flow', 'flight'];
var arr2 = ['dog', 'racecar', 'car'];
var arr3 = ['c', 'acc', 'ccc'];

console.log(longestCommonPrefix(arr1), longestCommonPrefix(arr2), longestCommonPrefix(arr3));
