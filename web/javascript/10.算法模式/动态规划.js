/**
动态规划(Dynamic Programming，DP)是一种将复杂问题分解成更小的子问题来解决的优化技术

要注意动态规划和分而治之(归并排序和快速排序算法中用到的那种)是不 同的方法。
分而治之方法是把问题分解成相互独立的子问题，然后组合它们的答案，而动态规划则是将问题分解成相互依赖的子问题。
 */

/** 1.最少硬币找零问题 */
// 最少硬币找零问题是给出要找零的钱数， 以及可用的硬币面额d1...dn及其数量，找到所需的最少的硬币个数
// 例如，美国有以下面额(硬币):d1=1，d2=5，d3=10，d4=25。
function MinCoinChange(coins) {
  this.coins = coins;
  this.cache = {};

  this.makeChange = function (amount) {
    if (amount <= 0) return [];
    if (this.cache[amount]) return this.cache[amount];

    var min = [];
    var newMin;
    var newAmount;

    for (var i = 0; i < this.coins.length; i++) {
      var coin = this.coins[i];
      newAmount = amount - coin;
      if (newAmount >= 0) {
        newMin = this.makeChange(newAmount);
      }
      if (newAmount >= 0 && (!min.length || newMin.length < min.length - 1) && (newMin.length || !newAmount)) {
        min = [coin].concat(newMin);
        console.log('new MIn ', min, ' for ', amount);
      }
    }
    return (this.cache[amount] = min);
  };
}

/** 测试 */
// var minCoinChange = new MinCoinChange([1, 5, 10, 25]);
// console.log(minCoinChange.makeChange(36));
// console.log(minCoinChange.makeChange(10));

/** 2.背包问题 */
// 给定一个固定大小、能够携重W的背包， 以及一组有价值和重量的物品，
// 找出一个最佳解决方案，使得装入背包的物品总重量不超过W， 且总价值最大。
var objects = [
  { value: 4, volume: 2 }, // value: 价值; volume: 体积
  { value: 5, volume: 3 },
  { value: 7, volume: 4 },
  { value: 8, volume: 5 },
  { value: 9, volume: 6 },
];

function getMaxValue(capacity, objects = []) {
  if (objects.length === 0) {
    return {
      objects: [],
      value: 0,
      volume: 0,
    };
  }

  // 就看第一件物品能不能选
  var obj = objects[0]; // 第一件物品
  var left = objects.slice(1); // 除去第一件物品剩余的物品
  if (obj.volume > capacity) {
    // 装不下第一件物品
    return getMaxValue(capacity, objects.slice(1));
  }

  var result1 = getMaxValue(capacity - obj.volume, left); // 得到剩余空间，剩余物品的最优解
  result1.objects.unshift(obj); // 选择的物品数组中加入第一件物品
  result1.value += obj.value; // 总价值加上第一件物品
  result1.volume += obj.volume; // 总空间加上第一件物品
  var result2 = getMaxValue(capacity, left); // 空间不变，剩余物品的最优解

  if (result1.value > result2.value) {
    return result1;
  } else {
    return result2;
  }
}

/** 测试 */
// var result = getMaxValue(12, objects);
// console.log('result:', result);


