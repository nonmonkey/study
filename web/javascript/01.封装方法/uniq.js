// 数组去重

/**
 * 第一个参数是一个数组，第二个参数是一个函数（对象数组去重的规则）。
 * 思路就是当它是数组的时候，直接用这个Set数据结构去重，
 * 如果是个对象数据的话，就新建一个Map，按照传入的函数返回的值，存入Map。
 * 这里用到了filter，它是用传入的函数测试所有的元素，并且返回所有通过测试的元素。
 */
function uniq(arr, rule) {
  if (!rule) {
    return Array.from(new Set([...arr]));
  } else {
    const res = new Map();
    return arr.filter((a) => {
      const target = rule(a);
      return !res.has(target) && res.set(target, 1)
    });
  }
}

/**
 * 双重for循环 外层遍历，内层比较
 */
function uniqFor(arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] == arr[j]) {
        arr.splice(j, 1);
        //数组长度变了
        len--;
        j--;
      }
    }
  }
  return arr;
}

/**
 * Array.filter()+indexOf()
 */
function uniqFilter(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

/**
 * for...of+includes()
 * 双重for的升级版，外层用for...of替换，内层循环改用includes。
 * 创建一个新数组，如果includes返回false,将该元素push进去。
 */
function uniqIncludes(arr) {
  let result = [];
  for (let i of arr) {
    !result.includes(i) && result.push(i);
  }
  return result;
}

/**
 * Array.sort()+相邻元素比较
 * 先排序，然后比较相邻元素，从而排除重复项。
 */
function uniqSort(arr) {
  if (arr.length === 0) {
    return arr;
  }
  arr.sort();
  let result = [arr[0]];

  for (let i = 1, len = arr.length; i < len; i++) {
    arr[i] !== arr[i - 1] && result.push(arr[i]);
  }
  return result;
}

/**
 * new Set()
 */
function uniqSet(arr) {
  return Array.from(new Set(arr));
}

/**
 * for...of+Object对象属性不重复
 */
function uniqObject(arr) {
  let result = [];
  let obj = {};

  for (let i of arr) {
    if (!obj[i]) {
      result.push(i);
      obj[i] = 1;
    }
  }
  return result;
}

const arr = [1, 8, 2, 3, 2, 8];

uniq;
console.log("uniq:", uniq([...arr]));
console.log("uniqFor:", uniqFor([...arr]));
console.log("uniqFilter:", uniqFilter([...arr]));
console.log("uniqIncludes:", uniqIncludes([...arr]));
console.log("uniqSort:", uniqSort([...arr]));
console.log("uniqSet:", uniqSet([...arr]));
console.log("uniqObject:", uniqObject([...arr]));
