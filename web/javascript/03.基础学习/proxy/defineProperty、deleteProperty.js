/**
 * defineProperty
 */
var proxy = new Proxy({}, {
  defineProperty(trapTarget, key, descriptor) {
    if (typeof key === 'symbol') {
      return false;
    }

    return Reflect.defineProperty(trapTarget, key, descriptor);
  },
});

Object.defineProperty(proxy, 'name', {
  value: 'proxy',
})

console.log(proxy.name); // proxy

var nameSymbol = Symbol('name');
Object.defineProperty(proxy, nameSymbol, { // 抛出错误
  value: 'proxy',
})

/**
 * 删除属性
 */
var handler = {
  deleteProperty (target, key, descriptor) {
    invariant(key, 'delete');
    if (typeof key === 'symbol') return false;
    return Reflect.deleteProperty(target, key, descriptor);
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}

var target = { _prop: 'foo' };
var proxy = new Proxy(target, handler);
delete proxy._prop
// Error: Invalid attempt to delete private "_prop" property