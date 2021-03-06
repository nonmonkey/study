/**
初始时有 n 个灯泡关闭。 第 1 轮，你打开所有的灯泡。 第 2 轮，每两个灯泡你关闭一次。 第 3 轮，每三个灯泡切换一次开关（如果关闭则开启，如果开启则关闭）。第 i 轮，每 i 个灯泡切换一次开关。 对于第 n 轮，你只切换最后一个灯泡的开关。 找出 n 轮后有多少个亮着的灯泡。

示例:

输入: 3
输出: 1 
解释: 
初始时, 灯泡状态 [关闭, 关闭, 关闭].
第一轮后, 灯泡状态 [开启, 开启, 开启].
第二轮后, 灯泡状态 [开启, 关闭, 开启].
第三轮后, 灯泡状态 [开启, 关闭, 关闭]. 

你应该返回 1，因为只有一个灯泡还亮着。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/bulb-switcher
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {number} n
 * @return {number}
 */
var bulbSwitch = function (n) {
  var res = 0;
  var k = 1;
  while (k * k <= n) {
    res++;
    k++;
  }
  return res;
};

console.log(bulbSwitch(3));

/**
 * 第 i 个灯泡只有在第 k 轮会被操作，而 k 一定是 i 的因数。并且 n>=k。所以如果一个数的因数的个数为奇数个，那么它最后一定是亮的，否则是关闭的。
 * 那么问题又转变了：
 * 什么数的因数的个数是奇数个？
 * 答案是完全平方数。
 * 因为，一个数的因数是成对的，当有一对因数相等时，个数就是奇数，所以完全平方数（一个整数是某一个整数的平方）的因数是奇数个的。
 * 
 * 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
 *
 * 01: 1
 * 02: 1 2
 * 03: 1 3
 * 04: 1 2 4
 * 05: 1 5
 * 06: 1 2 3 6
 * 07: 1 7
 * 08: 1 2 4 8
 * 09: 1 3 9
 * 10: 1 2 5 10
 * 11: 1 11
 * 12: 1 2 3 4 6 12
 * 13: 1 13
 * 14: 1 2 7 14
 * 15: 1 3 5 15
 * 16: 1 2 4 8 16
 * 17: 1 17
 * 18: 1 2 3 6 9 18
 * 19: 1 19
 * 20: 1 2 4 5 10 20
 */
