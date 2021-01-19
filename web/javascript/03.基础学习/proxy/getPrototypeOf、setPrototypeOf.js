/**
 * getPrototypeOf
 * 方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作:
  Object.prototype.__proto__
  Object.prototype.isPrototypeOf()
  Object.getPrototypeOf()
  Reflect.getPrototypeOf()
  instanceof
 */
var proto = {};
var p = new Proxy({}, {
  getPrototypeOf(target) {
    return proto;
  }
});
Object.getPrototypeOf(p) === proto // true


/**
 * setPrototypeOf
 */
var handler = {
  setPrototypeOf (target, proto) {
    throw new Error('Changing the prototype is forbidden');
  }
};
var proto = {};
var target = function () {};
var proxy = new Proxy(target, handler);
Object.setPrototypeOf(proxy, proto);
// Error: Changing the prototype is forbidden
