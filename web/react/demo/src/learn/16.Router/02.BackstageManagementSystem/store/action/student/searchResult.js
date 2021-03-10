import { searchStudents } from '../../../services/student';

export const actionTypes = {
  setStudentsAndTotal: Symbol('setStudentsAndTotal'),
  setIsLoading: Symbol('setIsLoading'),
};

/**
 * action creator
 * 得到一个设置学生数据和总数的action
 * @param {*} arr
 * @param {*} total
 */
export function setStudentsAndTotalAction(arr = [], total = 0) {
  return {
    type: actionTypes.setStudentsAndTotal,
    payload: {
      datas: arr,
      total,
    },
  };
}

export function setIsLoadingAction(isLoading = false) {
  return {
    type: actionTypes.setIsLoading,
    payload: isLoading,
  };
}

/**
 * 根据查询条件，查询学生
 */
export function fetchStudents() {
  return async function (dispatch, getState) {
    dispatch(setIsLoadingAction(true));
    const condition = getState().student.condition;
    const resp = await searchStudents(condition);
    dispatch(setStudentsAndTotalAction(resp.datas, resp.cont));
    dispatch(setIsLoadingAction(false));
  };
}
// searchStudents
