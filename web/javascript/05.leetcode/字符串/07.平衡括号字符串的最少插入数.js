/**
给你一个括号字符串 s ，它只包含字符 '(' 和 ')' 。一个括号字符串被称为平衡的当它满足：

任何左括号 '(' 必须对应两个连续的右括号 '))' 。
左括号 '(' 必须在对应的连续两个右括号 '))' 之前。
比方说 "())"， "())(())))" 和 "(())())))" 都是平衡的， ")()"， "()))" 和 "(()))" 都是不平衡的。

你可以在任意位置插入字符 '(' 和 ')' 使字符串平衡。

请你返回让 s 平衡的最少插入次数。



示例 1：

输入：s = "(()))"
输出：1
解释：第二个左括号有与之匹配的两个右括号，但是第一个左括号只有一个右括号。我们需要在字符串结尾额外增加一个 ')' 使字符串变成平衡字符串 "(())))" 。
示例 2：

输入：s = "())"
输出：0
解释：字符串已经平衡了。
示例 3：

输入：s = "))())("
输出：3
解释：添加 '(' 去匹配最开头的 '))' ，然后添加 '))' 去匹配最后一个 '(' 。
示例 4：

输入：s = "(((((("
输出：12
解释：添加 12 个 ')' 得到平衡字符串。
示例 5：

输入：s = ")))))))"
输出：5
解释：在字符串开头添加 4 个 '(' 并在结尾添加 1 个 ')' ，字符串变成平衡字符串 "(((())))))))" 。
 

提示：

1 <= s.length <= 10^5
s 只包含 '(' 和 ')' 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/minimum-insertions-to-balance-a-parentheses-string
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

var minInsertions = function (s) {
  let len = s.length,
    stack = [],
    res = 0;
  for (let i = 0; i < len; i++) {
    if (s[i] == '(') {
      stack.push('(');
      continue;
    }

    if (i + 1 == len) {
      if (stack.length == 0) res += 2;
      else {
        res++;
        stack.pop();
      }
    } else {
      if (s[i + 1] == ')') {
        if (stack.length == 0) res++;
        else stack.pop();
        i++;
      } else {
        if (stack.length == 0) res += 2;
        else {
          res++;
          stack.pop();
        }
      }
    }
  }

  res += stack.length * 2;
  return res;
};

console.log(minInsertions('))())('));
