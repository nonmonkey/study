import {
  isFunc,
  isPlainObjet,
  createObserver,
  actionTypes,
  createAction,
} from './utils'

export default function createStore(reducer, defaultState, enhanced) {
  if (isFunc(defaultState)) {
    enhanced = defaultState;
    defaultState = undefined;
  }

  if (isFunc(enhanced)) {
    return enhanced(createStore)(reducer, defaultState);
  }
  
  let currentReducer = reducer; // 当前使用的reducer
  let currentState = defaultState; // 当前仓库中的状态

  const listeners = createObserver();

  function dispatch(action) {
    // 验证action
    if (!isPlainObjet(action)) {
      throw new TypeError('action must be a plain object.');
    }
    // 验证type属性是否存在
    if (action.type === undefined) {
      throw new TypeError('action must has a property of type.');
    }

    currentState = currentReducer(currentState, action);

    listeners.fire();
  }

  function getState() {
    return currentState;
  }

  function subscribe(listener) {
    listeners.regist(listener);
    return function () {
      return listeners.remove(listener);
    };
  }

  dispatch(createAction(actionTypes.INIT()));

  return {
    dispatch,
    getState,
    subscribe,
  };
}
