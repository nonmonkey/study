/**
 * x 和 y 数据是否发生变化
 */
function hasChange(x, y) {
  if (x === y) {
    return x === 0 && 1 / x !== 1 / y; // +0 -0
  } else {
    return x === x || y === y;
  }
}
