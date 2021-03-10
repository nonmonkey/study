// 用于创建仓库
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducer';
// import { changeAction } from './action/student/searchCondition';
import {
  // setIsLoadingAction,
  // setStudentsAndTotalAction,
  fetchStudents,
} from './action/student/searchResult';

const store = createStore(reducer, applyMiddleware(thunk, logger));

console.log('store:', store);

store.dispatch(fetchStudents());

export default store;
