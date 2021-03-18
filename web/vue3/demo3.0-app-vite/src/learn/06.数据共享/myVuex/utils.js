/**
 * 判断某个对象是否是一个对象
 * @param {*} origin
 */
export function isObject(origin) {
  return Object.prototype.toString.call(origin) === '[object Object]';
}

/**
 * 判断某个对象是否是一个布尔值
 * @param {*} origin
 */
export function isBoolean(origin) {
  return typeof origin === 'boolean';
}

/**
 * 判断某个对象是否是一个平面对象
 * @param {*} origin
 */
export function isPlainObject(origin) {
  return isObject(origin) && Object.getPrototypeOf(origin) === Object.prototype;
}

/**
 * 判断是否为一个函数
 * @param {*} origin
 */
export function isFunction(origin) {
  return typeof origin === 'function' && origin.toString().slice(0, 5) !== 'class';
}

/**
 * 判断是否为一个字符串
 * @param {*} origin
 */
export function isString(origin) {
  return typeof origin === 'string';
}

/**
 * 判断是否为一个Symbol
 * @param {*} origin
 */
export function isSymbol(origin) {
  return typeof origin === 'symbol';
}

/**
 * 判断是否为一个Promise
 * @param {*} origin
 */
export function isPromise(origin) {
  return (
    Object.prototype.toString.call(origin) === '[object Promise]' ||
    (isObject(val) && isFunction(val.then) && isFunction(val.catch))
  );
}

/**
 * 是否为一个key
 * @param {*} origin
 */
export function isKey(origin) {
  return !!origin && isString(origin);
}

/**
 * 生成action
 * @param {*} type
 * @param {*} value
 */
export function unifyActionParams(type, value) {
  if (isPlainObject(type)) {
    type = type.type;
    value = type.value;
  }

  {
    assert(isKey(type), 'expects string as the type, but found ' + typeof type + '.');
  }

  return { type, value };
}

/**
 * 报错
 * @param {*} condition
 * @param {*} msg
 */
export function assert(condition, ...msg) {
  if (!condition) {
    throw new Error(...msg);
  }
}

/**
 * 按路径获取对象，没有就创建
 * @param {*} origin
 * @param {*} path
 */
export function createPathInObj(origin, path) {
  assert(isObject(origin), 'expects object as the origin.');
  if (isString(path)) path = path.split(/\/|\./).filter(Boolean);
  assert(Array.isArray(path), 'expects string as the path.');

  const overridden = [];
  let tmp = origin;
  for (let i = 0, len = path.length; i < len; i++) {
    const key = path[i];
    if (key in tmp) {
      if (Object.prototype.hasOwnProperty.call(tmp, key)) {
        if (!isObject(tmp[key])) {
          overridden.push(path.slice(0, i + 1).join('.'));
          tmp[key] = {};
        }
      } else {
        tmp[key] = {};
      }
    } else {
      tmp[key] = {};
    }
    tmp = tmp[key];
  }
  return [tmp, overridden];
}
