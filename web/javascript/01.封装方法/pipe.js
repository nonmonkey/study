// 管道函数(从左向右执行)
// 管道函数可以和curry函数配合，pipe接收的函数参数均为单参函数，
// 通过curry把其它多参函数转换为单参函数

function Pipe() {
  // 得到所有的参数，建设所有参数均为单餐函数
  var args = Array.prototype.slice.call(arguments);
  return function(data) {
    for (var i = 0; i < args.length; i++) {
      var func = args[i];
      data = func(data);
    }
    return data;
  }
}

/**
 * 组合函数(从右向左执行)
 * @param  {...any} funcs 
 */
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (data) => a(b(data)));
}

// 去除空白字符
function removeEmpty(str) {
  return str.replace(/\s/g, '');
}

// 单词首字母大写
function firstLetter(str) {
  return str.replace(/\b(\w)(\w*)\b/g, function($, $1, $2) {
    return $1.toUpperCase() + $2;
  })
}

// 将每个单词除首字母外，其他字母小写
function notFirstLetterLower(str) {
  return str.replace(/\b(\w)(\w*)\b/g, function($, $1, $2) {
    return $1 + $2.toLowerCase();
  })
}

// 实现大驼峰命名
var str = 'Hfew fewfJFBE few';
var pipe = Pipe(notFirstLetterLower, firstLetter, removeEmpty);
console.log(pipe(str));
