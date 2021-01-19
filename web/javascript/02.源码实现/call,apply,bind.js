Function.prototype.myCall = function (context) {
  console.log(this, context);
  if (typeof this !== 'function') {
    throw new TypeError('error');
  }
  context = context || window;
  context.fn = this;
  //除去要绑定的对象，剩下参数应该绑定进去
  const args = Array.from(arguments).slice(1);
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

//与call的区别是，第二个第二个参数传入的是数组
Function.prototype.apply() = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('error');
  }
  context = context || window;
  context.fn = this;
  let result;
  //判断是否存在数组参数,毕竟是可选参数
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};

Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('error');
  }
  const _this = this;
  const args = [...arguments].slice(1);
  return function F() {
    // new ,不动this
    if (this instanceof F) {
      //链式调用要加上新旧参数
      return new _this(...args, ...arguments);
    }
    return _this.apply(context, args.concat(...arguments));
  };
};
