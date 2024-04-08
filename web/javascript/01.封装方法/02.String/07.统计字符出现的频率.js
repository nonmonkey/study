var str = 'fkhewibfiklaewbfgiwaebgifbvawei';

/**
 * 统计字符出现的频率
 * @param {*} str 
 * @returns 
 */
var getCharNumMap1 = function (str = '') {
  var result = {};

  for (let i = 0, len = str.length; i < len; i++) {
    var char = str[i];
    if (result[char]) {
      result[char]++;
    } else {
      result[char] = 1;
    }
  }
  return result;
};

/**
 * 统计字符出现的频率
 * @param {*} str 
 * @returns 
 */
var getCharNumMap2 = function (str = '') {
  return Array.prototype.reduce.call(
    str,
    (obj, char) => ((obj[char]++ || (obj[char] = 1)), obj),
    {}
  );
};
console.log('getCharNumMap2:', getCharNumMap2(str));
