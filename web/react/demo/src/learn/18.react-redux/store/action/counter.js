export const actionTypes = {
  DECREASE: Symbol('decrease'),
  DECREASEASYNC: Symbol('decreaseAsync'),
  INCREASE: Symbol('increase'),
  INCREASEASYNC: Symbol('increaseAsync'),
};

export function decreaseAction() {
  return {
    type: actionTypes.DECREASE,
  };
}

export function decreaseAsyncAction() {
  return async function (dispatch) {
    await new Promise((res) => {
      setTimeout(() => {
        res(dispatch(decreaseAction()));
      }, 1200);
    });
  };
}

export function increaseAction() {
  return {
    type: actionTypes.INCREASE,
  };
}

export function increaseAsyncAction() {
  return async function (dispatch) {
    await new Promise((res) => {
      setTimeout(() => {
        res(dispatch(increaseAction()));
      }, 1200);
    });
  };
}
