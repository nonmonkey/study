/**
 * 判断某个对象是否是一个平面对象
 * @param {*} origin
 */
export function isPlainObjet(origin) {
  return (
    Object.prototype.toString.call(origin) === '[object Object]' && Object.getPrototypeOf(origin) === Object.prototype
  );
}

/**
 * 判断是否为一个函数
 * @param {*} origin
 */
export function isFunc(origin) {
  return typeof origin === 'function' && origin.toString().slice(0, 5) !== 'class';
}

/**
 * 得到一个指定长度的随机字符数
 */
export function getRandomString(length = 6) {
  return Math.random().toString(36).substr(2, length).split('').join('.');
}

/**
 * 创建一个监听器
 */
export function createObserver() {
  const listeners = new Set();
  return {
    // 注册信息接口
    regist(listener) {
      if (isFunc(listener)) {
        listeners.add(listener);
      } else {
        throw new TypeError('listener must be a function.');
      }
    },
    // 发布信息的接口
    fire() {
      listeners.forEach((listener) => listener());
    },
    // 所包含的监听器的数量
    size() {
      return listeners.size;
    },
    // 移除信息接口
    remove(listener) {
      return listeners.delete(listener);
    },
    removeAll() {
      listeners.clear();
    },
  };
}

const initActionType = `@@redux_du/INIT${getRandomString()}`;
export const actionTypes = {
  INIT() {
    return initActionType;
  },
  UNKNOWN() {
    return `@@redux_du/PROBE_UNKNOWN_ACTION${getRandomString()}`;
  },
};

/**
 * 创建一个action
 * @param {*} type
 * @param {*} payload
 */
export function createAction(type, payload) {
  return _createAction(type, payload);
}
function _createAction(type, payload) {
  if (type === undefined) throw new TypeError('The type parameter is required.');
  return {
    type,
    payload,
  };
}
createAction.INIT = function () {
  return _createAction(actionTypes.INIT());
};
createAction.UNKNOWN = function () {
  return _createAction(actionTypes.UNKNOWN());
};

/**
 * 校验 reducer
 * @param {*} reducer
 */
export function validateReducer(reducer) {
  if (!isFunc(reducer)) {
    throw new TypeError('reducers must be a function.');
  }

  // INIT校验
  let state = reducer(undefined, createAction.INIT());
  if (state === undefined) {
    throw new TypeError('reducers must not return undefined.');
  }
  // UNKNOWN校验
  state = reducer(undefined, createAction.UNKNOWN());
  if (state === undefined) {
    throw new TypeError('reducers must not return undefined.');
  }

  return true;
}

/**
 * 验证reducers
 * @param {*} reducers
 */
export function validateReducers(reducers) {
  if (!isPlainObjet(reducers)) {
    throw new TypeError('reducers must be a plain-object.');
  }

  // 验证 reducers 的返回结果是不是undefined
  for (const key in reducers) {
    if (reducers.hasOwnProperty(key)) {
      validateReducer(reducers[key]);
    }
  }

  return true;
}

/**
 * 函数组合，将一个数组中的函数进行组合，形成一个新的函数，该函数调用时，实际上是反向调用之前组合的函数
 */
export const compose = (...fns) => (n) => fns.reduceRight((val, curFn) => curFn(val), n);
