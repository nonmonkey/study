export const ADDUSER = Symbol('add-user');
export const DELETEUSER = Symbol('delete-user');
export const UPDATEUSER = Symbol('update-user');

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
