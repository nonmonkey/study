import { renderData } from './render.js';
import { rebuild } from './mount.js'

const arrayProto = Array.prototype;
function defArrayFunc(obj, func, namespace, vm) {
  Object.defineProperty(obj, func, {
    configurable: true,
    enumerable: true,
    value: function(...args) {
      let original = arrayProto[func];
      const result = original.apply(this, args);
      rebuild(vm, getNamespace(namespace, ''));
      renderData(vm, getNamespace(namespace, ''));
      return result;
    },
  })
}

function proxyArr(vm, arr, namespace) {
  let obj = {
    eleType: 'Array',
    toString() {
      let result = '';
      for (let i = 0; i < arr.length; i++) {
        result += arr[i] + ',';
      }
      return result.substring(0, result.length - 2);
    },
    push() {},
    pop() {},
    shift() {},
    unshift() {},
  };

  defArrayFunc.call(vm, obj, 'push', namespace, vm);
  defArrayFunc.call(vm, obj, 'pop', namespace, vm);
  defArrayFunc.call(vm, obj, 'shift', namespace, vm);
  defArrayFunc.call(vm, obj, 'unshift', namespace, vm);
  arr.__proto__ = obj;

  return arr;
}

function constructObjectProxy(vm, obj, namespace) {
  let proxyObj = {};

  for (let prop in obj) {
    let ns = getNamespace(namespace, prop);
    Object.defineProperty(proxyObj, prop, {
      configurable: true,
      get() {
        return obj[prop];
      },
      set(value) {
        obj[prop] = value;
        renderData(vm, ns);
      }
    });

    Object.defineProperty(vm, prop, {
      configurable: true,
      get() {
        return obj[prop];
      },
      set(value) {
        obj[prop] = value;
        renderData(vm, ns);
      }
    });

    if (obj[prop] instanceof Object) {
      proxyObj[prop] = constructProxy(vm, obj[prop], ns)
    }
  }

  return proxyObj;
}

function getNamespace(nowNamespace, nowProp) {
  if (nowNamespace == null || nowNamespace == '') {
    return nowProp;
  } else if (nowProp == null || nowProp == '') {
    return nowNamespace;
  } else {
    return nowNamespace + '.' + nowProp;
  }
}

/**
 * 
 * @param {*} vm Due对象
 * @param {*} obj 要代理的对象
 * @param {*} namespace 
 */
// 我们要知道哪个属性被修改了，我们才能对页面上的内容进行更新
// 所以我们必须先能够捕获修改的这个事件
// 所以我们需要用代理的方式来实现监听属性修改
export function constructProxy(vm, obj, namespace) {
  let proxyObj = null;
  if (obj instanceof Array) {
    proxyObj = new Array(obj.length);
    for (let i = 0; i < obj.length; i++) {
      proxyObj[i] = constructProxy(vm, obj[i], namespace);
    }
    proxyObj = proxyArr(vm, obj, namespace);
  } else if (obj instanceof Object) {
    proxyObj = constructObjectProxy(vm, obj, namespace);
  } else {
    throw new Error('error');
  }

  return proxyObj;
}
