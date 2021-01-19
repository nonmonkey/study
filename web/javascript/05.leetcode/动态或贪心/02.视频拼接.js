/**
你将会获得一系列视频片段，这些片段来自于一项持续时长为 T 秒的体育赛事。这些片段可能有所重叠，也可能长度不一。

视频片段 clips[i] 都用区间进行表示：开始于 clips[i][0] 并于 clips[i][1] 结束。我们甚至可以对这些片段自由地再剪辑，例如片段 [0, 7] 可以剪切成 [0, 1] + [1, 3] + [3, 7] 三部分。

我们需要将这些片段进行再剪辑，并将剪辑后的内容拼接成覆盖整个运动过程的片段（[0, T]）。返回所需片段的最小数目，如果无法完成该任务，则返回 -1 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/video-stitching
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {number[][]} clips
 * @param {number} T
 * @return {number}
 */
var videoStitching = function (clips, T) {
  var s = 0; // 记录上一个的结束值(本次的最小值)
  var e = 0; // 记录当前的最大值
  var count = 0;

  for (var i = 0; i <= T; i++) {
    e = 0;
    for (var j = 0, l = clips.length; j < l; j++) {
      if (clips[j][0] <= s) {
        e = Math.max(e, clips[j][1]);
      }
    }
    count++;
    if (e >= T) {
      return count;
    } else if (e <= s) {
      return -1;
    }
    s = e;
  }
  return -1;
};
