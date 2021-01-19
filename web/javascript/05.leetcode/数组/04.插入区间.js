/**
给出一个无重叠的 ，按照区间起始端点排序的区间列表。

在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。

示例 1：

输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
输出：[[1,5],[6,9]]
示例 2：

输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
输出：[[1,2],[3,10],[12,16]]
解释：这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/insert-interval
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
  var result = [];
  var i = 0;
  var len = intervals.length;

  // 无重叠区间，且新增区间在当前区间右侧
  while (i < len && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  // 有重叠区间
  while (i < len && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(intervals[i][0], newInterval[0]); // 左端取最小值
    newInterval[1] = Math.max(intervals[i][1], newInterval[1]); // 右端取最大值
    i++;
  }
  result.push(newInterval);

  // intervals剩余区间
  while (i < intervals.length) {
    result.push(intervals[i]);
    i++
  }

  return result;
};
