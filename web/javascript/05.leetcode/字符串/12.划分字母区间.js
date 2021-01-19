/**
字符串 S 由小写字母组成。我们要把这个字符串划分为尽可能多的片段，同一个字母只会出现在其中的一个片段。返回一个表示每个字符串片段的长度的列表。

 

示例 1：

输入：S = "ababcbacadefegdehijhklij"
输出：[9,7,8]
解释：
划分结果为 "ababcbaca", "defegde", "hijhklij"。
每个字母最多出现在一个片段中。
像 "ababcbacadefegde", "hijhklij" 的划分是错误的，因为划分的片段数较少。
 

提示：

S的长度在[1, 500]之间。
S只包含小写字母 'a' 到 'z' 。


来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/partition-labels
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {string} S
 * @return {number[]}
 */
var partitionLabels = function(S) {
  const maxPos = {};
  for (let i = 0; i < S.length; i++) { //存放字母与它的最远位置
    maxPos[S[i]] = i;
  }

  const res = [];
  const tmp = [];
  let start = 0; // 待切割的起始位置
  let scannedCharMaxPos = 0; // 已扫描的字符中最远的位置

  for (let i = 0; i < S.length; i++) {
    const curCharMaxPos = maxPos[S[i]]; // 当前扫描的字符的最远位置
    scannedCharMaxPos = Math.max(curCharMaxPos, scannedCharMaxPos); // 更新

    if (i === scannedCharMaxPos) {
      res.push(i - start + 1);
      tmp.push(S.slice(start, i + 1));
      start = i + 1;
    }
  }
  console.log('tmp:', tmp);
  return res;
};
