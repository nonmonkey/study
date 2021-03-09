import * as actionTypes from './action-types';

/**
 * 得到一个用于增加数字操作的action
 */
export function getIncreaseAction() {
  return {
    type: actionTypes.INCREASE,
  };
}

/**
 * 得到一个用于减少数字操作的action
 */
export function getDecreaseAction() {
  return {
    type: actionTypes.DECREASE,
  };
}

/**
 * 得到一个用于设置数字操作的action
 */
export function getSetAction(newNumber) {
  return {
    type: actionTypes.SET,
    payload: newNumber,
  };
}
