/**
 * 函数组合，将一个数组中的函数进行组合，形成一个新的函数，该函数调用时，实际上是反向调用之前组合的函数
 */
const compose = (...fns) => (n) => fns.reduce((val, curFn) => curFn(val), n);
const composeRight = (...fns) => (n) => fns.reduceRight((val, curFn) => curFn(val), n);

function func1(n) {
  return n * 2;
}

function func2(n) {
  return n + 1;
}

var func = compose(func1, func2);

func(3);
