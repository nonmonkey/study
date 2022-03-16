// 数组扁平化

/**
 * reduce 遍历每一项，若值为数组则递归遍历，否则concat
 */
function flatten(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}

/**
 * toString()和split
 * 调用数组的toString()方法，将数组变为字符串，然后再用split分割还原为数组。
 * split分割后形成的数组每一项值为字符串，所以需要用一个map方法遍历数组将其每一项换为数值型
 */
function flattenToString(arr) {
  return arr
    .toString()
    .split(",")
    .map(function(item) {
      return Number(item);
    });
}

/**
 * join
 */
function flattenJoin(arr) {
  return arr
    .join(",")
    .split(",")
    .map(function(item) {
      return parseInt(item);
    });
}

/**
 * 递归
 */
// function flatten(arr) {
//   var res = [];
//   arr.forEach(item => {
//     if (Array.isArray(item)) {
//       res = res.concat(flatten(item));
//     } else {
//       res.push(item);
//     }
//   });
//   return res;
// }

/**
 * 拓展运算符
 * @param {*} arr 
 */
// function flatten(arr){
//   while(arr.some(item=>Array.isArray(item))){
//       console.log('111:', JSON.stringify(arr))
//       arr=[].concat(...arr);
//       console.log('222:', JSON.stringify(arr))
//   }
//   return arr;
// }

const arr = [1, [2, 3, [4, 5]]];

console.log("flatten:", flatten(arr));
console.log("flattenToString:", flattenToString(arr));
console.log("flattenJoin:", flattenJoin(arr));
