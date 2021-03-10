export const actionTypes = {
  change: Symbol('change'),
};

/**
 * 根据新的查询条件，产生一个action
 * @param {*} newCondition
 */
export function changeAction(newCondition) {
  return {
    type: actionTypes.change,
    payload: newCondition,
  };
}
