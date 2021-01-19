/**
给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:
输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

示例 2:
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

示例 3:
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters
解答：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/solution/zi-jie-leetcode3wu-zhong-fu-zi-fu-de-zui-chang-zi-/
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/* 2020-07-06 */
// 时间复杂度：O(n<sup>2</sup>)， 其中 arr.indexOf() 时间复杂度为 O(n) ，arr.splice(0, index+1) 的时间复杂度也为 O(n)
// 空间复杂度：O(n)

// 维护数组
var lengthOfLongestSubstring = function (s) {
  var len = s.length;
  var arr = [];
  var max = 0;

  for (var i = 0; i < len; i++) {
    var index = arr.indexOf(s[i]);
    if (index > -1) {
      arr.splice(0, index + 1);
    }
    arr.push(s[i]);
    max = Math.max(arr.length, max);
  }
  return max;
};

// 维护下标
var lengthOfLongestSubstring2 = function (s) {
  let index = 0,
    max = 0;
  for (let i = 0, j = 0; j < s.length; j++) {
    index = s.substring(i, j).indexOf(s[j]);
    if (index !== -1) {
      i = i + index + 1;
    }
    max = Math.max(max, j - i + 1);
  }
  return max;
};

// 挫
var lengthOfLongestSubstring1 = function (s) {
  var len = s.length;
  if (len === 0) return '';

  var max = s[0]; // 最长字符串
  var p; // 指针(下标)

  for (p = 0; p < len && max.length < len - p; p++) {
    var tmp = ''; // 临时
    var i = p; // 临时字符串末位index
    while (i < len) {
      if (tmp.indexOf(s[i]) > -1) {
        break;
      } else {
        tmp += s[i];
        i++;
        if (tmp.length > max.length) max = tmp;
      }
    }
  }
  return max.length;
};

console.log(lengthOfLongestSubstring('abcabcbb'));
console.log(lengthOfLongestSubstring('bbbbb'));
console.log(lengthOfLongestSubstring('pwwkew'));
console.log(lengthOfLongestSubstring('au'));
console.log(lengthOfLongestSubstring('ks'));
