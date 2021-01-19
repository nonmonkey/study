// 贪心算法遵循一种近似解决问题的技术，期盼通过每个阶段的局部最优选择(当前最好的
// 解)，从而达到全局的最优(全局最优解)。它不像动态规划算法那样计算更大的格局。

/** 1.最少硬币问题 */
function MinCoinChange(coins) {
  this.coins = coins;

  this.makeChange = function (amount) {
    var change = [];
    var total = 0;

    for (var i = this.coins.length; i >= 0; i--) {
      var coin = this.coins[i];
      while (total + coin <= amount) {
        change.push(coin);
        total += coin;
      }
      if (total === amount) return change;
    }
    return change;
  };
}

/** 测试 */
// var minCoinChange = new MinCoinChange([1, 5, 10, 25]);
// console.log(minCoinChange.makeChange(100))

/** 2.分数背包问题 */
// 在0-1背包问题中，只能向背包里装入 完整的物品，而在分数背包问题中，我们可以装入分数的物品
function knapSack(capacity, values, weights) {
  var len = values.length,
    i = 0,
    load = 0, // 总重量
    val = 0; // 总价值

  for (i = 0; i < len && load < capacity; i++) {
    if (weights[i] <= capacity - load) {
      val += values[i];
      load += weights[i];
    } else {
      var r = (capacity - load) / weights[i];
      val += r * values[i];
      load += r * weights[i];
    }
  }
  return { val, load };
}

// [
// { value: 4, volume: 2 },
// { value: 5, volume: 3 },
// { value: 7, volume: 4 },
// { value: 8, volume: 5 },
// { value: 9, volume: 6 },
// ]

console.log(knapSack(10, [4, 5, 7, 8, 9], [2, 3, 4, 5, 6]));
