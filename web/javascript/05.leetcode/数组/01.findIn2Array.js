/**
 * 在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
 * 请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
 * @param {*} target 
 * @param {*} array 
 */
function find(target, array) {
  if (array.length === 0 || array[0].length === 0) return false;
  let row = 0;
  let rowLen = array.length;
  let col = array[0].length - 1;

  while (row < rowLen && col >= 0) {
    if (target === array[row][col]) {
      return true;
    }
    if (target < array[row][col]) {
      col--;
    } else {
      row++;
    }
  }
  return false;
}

let arr = [
  [1,3,5,7,9],
  [2,4,6,8,10],
  [11,13,15,17,19],
  [12,14,16,18,20],
]

console.log('find:', find(19, arr));
