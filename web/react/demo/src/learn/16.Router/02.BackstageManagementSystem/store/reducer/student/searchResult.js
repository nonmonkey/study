import { actionTypes } from '../../action/student/searchResult';

const initialState = {
  datas: [],
  total: 0,
  isLoading: false,
};
/**
 * 控制查询结果的reducer
 * @param {*} state
 * @param {*} action
 */
export default function searchResult(state = initialState, action) {
  switch (action.type) {
    case actionTypes.setStudentsAndTotal:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.setIsLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}
