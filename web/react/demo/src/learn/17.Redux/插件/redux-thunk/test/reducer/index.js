import { combineReducers } from 'redux';
import loginUserReducer from './loginUser';
import usersReducer from './users';

/**
 * reducer本质上是一个普通函数
 * @param {*} state 之前仓库中的状态（数据）
 * @param {*} action 描述要做什么对象。
 */
// export default function reducer(state = {}, action) {
//   console.log('reducer', state, action);
//   const newState = {
//     loginUser: loginUserReducer(state.loginUser, action),
//     users: usersReducer(state.users, action),
//   };

//   return newState;
// }

// ***等同于***

export default combineReducers({
  loginUser: loginUserReducer,
  users: usersReducer,
});
