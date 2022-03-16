// 柯里化 curry (Haskell Curry)
// 是一个用于得到另外一个函数剩余参数的函数 的函数

/*  */
function _fixedParamsCurry(fn) {
  let _arg = [].slice.call(arguments, 1);
  return function () {
    let newArg = _arg.concat([].slice.call(arguments, 0));
    return fn.apply(this, newArg);
  };
}

function curry(fn, length) {
  let len = length || fn.length;

  return function () {
    if (arguments.length < len) {
      let combined = [fn].concat([].slice.call(arguments, 0));
      return curry(_fixedParamsCurry.apply(this, combined), len - arguments.length);
    } else {
      return fn.apply(this, arguments);
    }
  };
}

/*  */
function curry1(fn) {
  // 获取剩余数组
  // var args = Array.from(arguments); // 转换为真数组
  var args = Array.prototype.slice.call(arguments, 1);

  return function () {
    var subArgs = Array.prototype.slice.call(arguments);
    var newArgs = args.concat(subArgs); // 合并得到所有的参数

    if (newArgs.length >= fn.length) {
      // 函数的length属性，表示该函数的形参数量
      return fn.apply(null, newArgs);
    } else {
      // 参数数量不够，继续柯里化
      newArgs.unshift(fn);
      return curry1.apply(null, newArgs);
    }
  };
}


/* 例子： */
/*
function add(a, b, c, d) {
  return a + b + c + d;
}

let newAdd = Curry(add, 4);

// 例2
function ajax(method, url, data) {
  console.log(method, url, data);
}

var ajaxCurry = Curry(ajax);
var PostAjax = ajaxCurry('POST');
var PostTest1Ajax = PostAjax('www.baidu.com');

PostTest1Ajax('name=cst&code=111');
PostTest1Ajax('key=111');

var PostTest2Ajax = PostAjax('www.test2.com');

PostTest2Ajax('nnnn=efwee');
PostTest2Ajax('nnnn=11111');
*/