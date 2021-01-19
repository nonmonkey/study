/*
  有n个物品，他们有各自的体积和价值，现在给定容量的背包，如何让背包里装入的物品具有最大的价值总和。

  每一次函数调用，js会创建一个执行上下文，并放置到执行栈中执行
    * 执行上下文：每当调用一个函数，会创建一个该函数的执行上下文，上下文中包含该函数的相关参数，变量
    * 执行栈：执行上下文会放置到执行栈中，每当执行上下文创建时，会进入执行栈；每当函数调用完成后，会从执行栈中移除。
        在刚开始执行js时，会创建一个全局上下文。
*/

var objects = [
  { value: 4, volume: 2 }, // value: 价值; volume: 体积
  { value: 5, volume: 3 },
  { value: 7, volume: 4 },
  { value: 8, volume: 5 },
  { value: 9, volume: 6 },
];

/**
 *
 * @param {*} capacity 背包的容量
 * @param {*} objects 可选物品
 * @return 求解结果，一个对象，包含三个信息：1.选择的物品数组。2.总价值。3.总占用空间
 * 例如: {
 *  objects: [{ value: 4, volume: 2 }, { value: 5, volume: 3 }], // 选择的物品
 *  value: 9, // 总价值
 *  volume: 5, // 占用的空间
 * }
 */
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

var result = getMaxValue(12, objects);

console.log('result:', result);
