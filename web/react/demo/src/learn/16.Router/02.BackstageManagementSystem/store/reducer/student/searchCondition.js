import { actionTypes } from '../../action/student/searchCondition';

// 默认状态
const initialState = {
  key: '',
  sex: -1,
  page: 1,
  limit: 10,
};

/**
 * 控制查询条件的reducer
 * @param {*} state
 * @param {*} action
 */
export default function searchCondition(state = initialState, action) {
  switch (action.type) {
    case actionTypes.change:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
