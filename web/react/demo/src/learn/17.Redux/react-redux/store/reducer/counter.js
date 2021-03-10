import { actionTypes } from '../action/counter';

// 默认状态
const initialState = 0;

/**
 * 控制查询条件的reducer
 * @param {*} state
 * @param {*} action
 */
export default function searchCondition(state = initialState, action) {
  switch (action.type) {
    case actionTypes.DECREASE:
      return state - 1;
    case actionTypes.INCREASE:
      return state + 1;
    default:
      return state;
  }
}
