// import { createStore, applyMiddleware } from 'redux';
import { createStore, applyMiddleware } from '../../../源码/index';
import * as Redux from 'redux';
import reducer from './reducer/index';
import { createSetUsersAction, createSetLoadingAction, fetchUsers } from './action/usersAction';
import logger from 'redux-logger';
// import thunk from 'redux-thunk';
import thunk from '../源码/index';
import getAllStudents from '../../../../../services/student';

console.log((window.Redux = Redux));

const store = createStore(reducer, applyMiddleware(thunk, logger));

// test1 不使用thunk
/*
store.dispatch(createSetLoadingAction(true)); // 正在加载
getAllStudents().then((res) => {
  const action = createSetUsersAction(res);
  store.dispatch(action);
  store.dispatch(createSetLoadingAction(false)); // 取消正在加载
});
*/

// test2 使用thunk
store.dispatch(fetchUsers())
