/**
地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？

示例 1：

输入：m = 2, n = 3, k = 1
输出：3
示例 2：

输入：m = 3, n = 1, k = 0
输出：1
提示：

1 <= n,m <= 100
0 <= k <= 20

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
// 位数计算
let _getSum = function (num) {
  let answer = 0;
  while (num) {
    answer += num % 10;
    num = Math.floor(num / 10);
  }
  return answer;
};

let directionArray = [
  [-1, 0], // 上
  [0, 1], // 右
  [1, 0], // 下
  [0, -1], // 左
]
/**
(-1 + x, 0 + y)：x坐标后退一格，y不变，犹如由南向北移动，即当前单元格的上方。
(0 + x, 1 + y)：x坐标不变，y前进一格，犹如由西向东移动，即当前单元格的右方。
(1 + x, 0 + y)：x坐标前进一格，y不变，犹如由北向南移动，即当前单元格的下方。
(0 + x, -1 + y)：x坐标不变，y后退一格，犹如由东向西移动，即当前单元格的左方。
 */

let movingCount = function (m, n, k) {
  // 已走过的坐标
  let set = new Set(['0,0']);
  // 需要遍历的坐标
  let queue = [[0, 0]];
  // 遍历队列中的坐标
  while(queue.length) {
    let [x, y] = queue.shift();
    // 遍历方向
    for (let i = 0; i < 4; i++) {
      let offsetX = x + directionArray[i][0];
      let offsetY = y + directionArray[i][1];

      // 临界值判断
      if (offsetX < 0 || offsetX >= m || offsetY < 0 || offsetY >= n || _getSum(offsetX) + _getSum(offsetY) > k || set.has(`${offsetX},${offsetY}`)) {
        continue;
      }
      
      // 统计走过的路
      set.add(`${offsetX},${offsetY}`);

      // 将该坐标加入队列(这个坐标的四周没有走过，需要下次遍历)
      queue.push([offsetX, offsetY]);
    }
  }

  return set.size;
};

console.log('movingCount:', movingCount(1,2,1));
