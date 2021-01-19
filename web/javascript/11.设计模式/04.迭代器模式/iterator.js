/*
  迭代器模式是指提供一种方法顺序访问一个聚合对象中的各元素，而不需要暴露该对象的内部表示。
  迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的构造，也可以按顺序访问其中的每个元素
 */

/* 实现自己的迭代器each start */
var each = function (obj, callback) {
  var i;
  var l;

  if (Array.isArray(obj)) {
    // 迭代数组
    for (i = 0, l = obj.length; i < l; i++) {
      callback.call(obj[i], i, obj[i]);
    }
  } else {
    for (i in obj) {
      // 迭代字面量对象
      if (Object.prototype.hasOwnProperty.call(obj, i)) {
        callback.call(obj[i], i, obj[i]);
      }
    }
  }
};

each([1, 2, 3, 4], function (i, n) {
  // console.log(i, n);
});
each({ a: 1, b: 2 }, function (i, n) {
  // console.log(i, n);
});
/* 实现自己的迭代器each end */

/* 内部迭代器和外部迭代器 start */
// 内部迭代器 each就属于内部迭代器，each函数内部已经定义好了迭代规则，它完全接手整个迭代过程，外部只需要一次初始调用
// 外界不用关心迭代器内部的实现，跟迭代器的交互也仅 仅是一次初始调用，但这也刚好是内部迭代器的缺点。
// 由于内部迭代器的迭代规则已经被提前规 定，上面的 each 函数就无法同时迭代 2 个数组了

// 外部迭代器
// 外部迭代器必须显式地请求迭代下一个元素
// 外部迭代器增加了一些调用的复杂度，但相对也增强了迭代器的灵活性，我们可以手工控制 迭代的过程或者顺序。
var MyIterator = function (obj) {
  var current = 0;
  var next = function () {
    current += 1;
  };
  var isDone = function () {
    return current >= obj.length;
  };
  var getCurItem = function () {
    return obj[current];
  };

  return {
    next: next,
    isDone: isDone,
    getCurItem: getCurItem,
  };
};

var compare = function (iterator1, iterator2) {
  while (!iterator1.isDone() && !iterator2.isDone()) {
    if (iterator1.getCurItem() !== iterator2.getCurItem()) {
      console.log('iterator1和iterator2不相等');
    }
    iterator1.next();
    iterator2.next();
  }
  if (iterator1.isDone() && iterator2.isDone()) {
    console.log('iterator1和iterator2相等');
  } else {
    console.log('iterator1和iterator2不相等');
  }
};

var iterator1 = MyIterator([1, 2, 3]);
var iterator2 = MyIterator([1, 2, 3]);

// compare(iterator1, iterator2);
/* 内部迭代器和外部迭代器 end */

/* 倒序迭代器 start */
var reverseEach = function (arr, callback) {
  for (var l = arr.length - 1; l >= 0; l--) {
    callback(l, arr[l]);
  }
};

reverseEach([1, 2, 3, 4], function (i, n) {
  console.log(i, n);
});
/* 倒序迭代器 end */

/* 中止迭代器 start */
// 约定如果回调函数的执行结果返回 false，则提前终止循环。
var each_break = function (arr, callback) {
  for (var i = 0, l = arr.length; i < l; i++) {
    if (callback(i, arr[i]) === false) break;
  }
};

each_break([1, 2, 3, 4], function (i, n) {
  if (n > 3) return false;
  console.log('each_break:', i, n);
});
/* 中止迭代器 end */
