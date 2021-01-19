/**
给定一个按非递减顺序排序的整数数组 A，返回每个数字的平方组成的新数组，要求也按非递减顺序排序。

示例 1：

输入：[-4,-1,0,3,10]
输出：[0,1,9,16,100]
示例 2：

输入：[-7,-3,2,3,11]
输出：[4,9,9,49,121]

提示：

1 <= A.length <= 10000
-10000 <= A[i] <= 10000
A 已按非递减顺序排序。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/squares-of-a-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

var sortedSquares = function (A) {
  var len = A.length;
  var start = 0;
  var end = len - 1;
  var res = new Array(len);

  for (var i = len - 1; i >= 0; i--) {
    var s = A[start] * A[start];
    var e = A[end] * A[end];
    if (e > s) {
      res[i] = e;
      end--;
    } else {
      res[i] = s;
      start++;
    }
  }
  return res;
};

/* 偷懒的解法 strart */
var sortedSquares = function (A) {
  return A.map((item) => item * item).sort((a, b) => a - b);
};
/* 偷懒的解法 end */
