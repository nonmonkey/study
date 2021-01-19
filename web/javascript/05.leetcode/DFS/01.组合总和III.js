/**
找出所有相加之和为 n 的 k 个数的组合。组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。

说明：
所有数字都是正整数。
解集不能包含重复的组合。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/combination-sum-iii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
var combinationSum3 = function (k, n) {
  var result = [];
  var _combination = function (sum, path) {
    var l = path.length;
    if (l === k && sum === n) {
      result.push(Array.from(path));
    } else if (l < k && sum < n) {
      var i = l ? path[l - 1] + 1 : 1;
      for (i; i <= 9; i++) {
        path.push(i);
        _combination(sum + i, path);
        path.pop(i);
      }
    }
  };

  _combination(0, []);
  return result;
};

// var combinationSum3 = function (k, n) {
//   var result = [];
//   var container = new Array(9).fill().map((n, i) => i + 1);
//   var _combination = function (k, n, c, arr = []) {
//     if (k === 0 && n === 0) {
//       result.push(arr);
//     } else if (k > 0 && n > 0) {
//       for (var i = 0, l = c.length; i < l; i++) {
//         _combination(k - 1, n - c[i], c.slice(i + 1), [...arr, c[i]]);
//       }
//     }
//     return;
//   };

//   for (var i = 0, l = container.length; i < l; i++) {
//     _combination(k - 1, n - container[i], container.slice(i + 1), [container[i]]);
//   }
//   return result;
// };

console.log('result:', combinationSum3(3, 7));
console.log('result:', combinationSum3(3, 9));
