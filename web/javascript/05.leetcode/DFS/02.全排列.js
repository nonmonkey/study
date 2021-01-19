/**
  给定一个 没有重复 数字的序列，返回其所有可能的全排列。

  示例:

  输入: [1,2,3]
  输出:
  [
    [1,2,3],
    [1,3,2],
    [2,1,3],
    [2,3,1],
    [3,1,2],
    [3,2,1]
  ]

  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/permutations
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

const permute = (nums) => {
  const res = [];
  const used = {};
  dfs([]);
  function dfs(path) {
    if (path.length == nums.length) {
      res.push(path.slice());
      return;
    }
    for (const num of nums) {
      // if (path.includes(num)) continue; // 查找的时间是O(n)，这么写增加了时间复杂度
      if (used[num]) continue;
      path.push(num);
      used[num] = true;
      dfs(path);
      path.pop();
      used[num] = false;
    }
  }
  return res;
};

/* 全排列二：
给定一个可包含重复数字的序列，返回所有不重复的全排列。

示例:

输入: [1,1,2]
输出:
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]
 */

var permuteUnique = function (nums) {
  const result = [];
  const used = [];
  const len = nums.length;
  nums.sort();
  helper([]);

  function helper(path) {
    if (path.length == len) {
      result.push(path.slice());
      return;
    }

    for (let i = 0; i < len; i++) {
      if (nums[i - 1] == nums[i] && i - 1 >= 0 && !used[i - 1]) {
        continue;
      }
      if (used[i]) {
        continue;
      }

      path.push(nums[i]);
      used[i] = true;
      helper(path);
      path.pop();
      used[i] = false;
    }
  }
  return result;
};

permuteUnique([1, 1, 2]);
