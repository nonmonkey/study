// JSON.parse 解决不了循环引用的问题，会忽略undefined\symbol\函数
{
  let a = {};
  let b = JSON.parse(JSON.stringify(a));
  // 循环引用是说a.b.d=a.b这样的
}

// MessageChannel含有内置类型，不包含函数
// 可以处理循环引用对象、也可以处理undefined
// 不过它是异步的
function structuralClone(obj) {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel();
    port2.onmessage = (ev) => {
      resolve(ev.data);
    };
    port1.postMessage(obj);
  });
}

// 手写一个简单的cloneDeep
// function _isObject(o) {
//   return (typeof o === 'object' || typeof o === 'function') && o !== null;
// }
// function cloneDeep(obj) {
//   if (!_isObject(obj)) return obj;
//   let newObj = Array.isArray(obj) ? [...obj] : { ...obj };
//   console.log('newObj:', newObj);
//   for (let key in newObj) {
//     newObj[key] = cloneDeep(newObj[key]);
//   }
//   return newObj;
// }

function deepClone(obj) {
  let copy;
  if (Array.isArray(obj)) {
    copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = typeof obj[i] === 'object' && obj[i] !== null ? deepClone(obj[i]) : obj[i];
    }
    return copy;
  } else if ((Object.prototype.toString.call(obj) === '[object Object]')) {
    copy = {};
    for (let i in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, i)) {
        copy[i] = typeof obj[i] === 'object' && obj[i] !== null ? deepClone(obj[i]) : obj[i];
      }
    }
    return copy;
  } else {
    return obj;
  }
}
