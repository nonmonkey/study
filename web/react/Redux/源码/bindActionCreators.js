import { isFunc } from './utils';

export default function bindActionCreators(actionCreators, dispatch) {
  if (isFunc(actionCreators)) {
    return getAutoDispatchActionCreator(actionCreators, dispatch);
  } else if (typeof actionCreators === 'object') {
    const result = {};
    for (let key in actionCreators) {
      const actionCreator = actionCreators[key];
      if (actionCreators.hasOwnProperty(key) && isFunc(actionCreator)) {
        result[key] = getAutoDispatchActionCreator(actionCreator, dispatch);
      }
    }
    return result;
  } else {
    throw new TypeError('actionCreators must be an object or function witch means action creator.');
  }
}

/**
 * 得到一个自动分发的action创建函数
 * @param {*} action
 */
function getAutoDispatchActionCreator(actionCreator, dispatch) {
  return function (...args) {
    const action = actionCreator(...args);
    dispatch(action);
  };
}
