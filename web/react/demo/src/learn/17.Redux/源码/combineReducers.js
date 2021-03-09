import { validateReducers } from './utils';

export default function combineReducers(reducers) {
  // 1. 验证reducers
  validateReducers(reducers);
  /**
   * 返回一个reducer函数
   */
  return function(state = {}, action) {
    const newState = {}; // 要返回的新的状态
    for (const key in reducers) {
      if (reducers.hasOwnProperty(key)) {
        const reducer = reducers[key];
        newState[key] = reducer(state[key], action);
      }
    }
    return newState;
  }
}
