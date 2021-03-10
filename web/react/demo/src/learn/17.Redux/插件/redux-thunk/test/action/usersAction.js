import getAllStudents from '../../../../../services/student';
export const ADDUSER = Symbol('add-user');
export const DELETEUSER = Symbol('delete-user');
export const UPDATEUSER = Symbol('update-user');
export const SETUSERS = Symbol('set-users');
export const SETLOADING = Symbol('set-loading');

export function createAddUser(user) {
  return {
    type: ADDUSER,
    payload: user,
  };
}

export function createDeleteUser(id) {
  return {
    type: DELETEUSER,
    payload: id,
  };
}

export function createUpdateUser(id, newUserData) {
  return {
    type: UPDATEUSER,
    payload: {
      ...newUserData,
      id,
    },
  };
}

export const createSetUsersAction = (users) => ({
  type: SETUSERS,
  payload: users, // 用户数组
});

/**
 * 返回一个设置加载状态的action
 * @param {*} isLoading
 */
export const createSetLoadingAction = (isLoading) => ({
  type: SETLOADING,
  payload: isLoading,
});

// 副作用函数
export const fetchUsers = () => {
  // 使用了thunk的存在，允许action是一个有副作用的函数
  return async function (dispatch) {
    dispatch(createSetLoadingAction(true)); // 正在加载
    const users = await getAllStudents();
    const action = createSetUsersAction(users);
    dispatch(action);
    dispatch(createSetLoadingAction(false)); // 取消正在加载
  };
};
