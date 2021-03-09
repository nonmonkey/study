import { createStore, bindActionCreators, applyMiddleware } from '../源码/index.js';
// import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import * as MyRedux from '../源码/index.js';
import * as Redux from 'redux';
import reducer from './reducer/index';
import * as usersAction from './action/usersAction';

console.log((window.Redux = Redux), (window.MyRedux = MyRedux));

/**
 * 一个中间件函数
 * @param {*} store
 */
function loggerMiddleWare1(store) {
  return function dispatchCreator1(nextDispatch) {
    // 下面返回的函数，是最终要应用的dispatch
    return function dispatch(action) {
      console.log('中间件1');
      console.log('旧数据', store.getState());
      console.log('action', action);
      nextDispatch(action);
      console.log('中间件1 新数据', store.getState());
      console.log('');
    };
  };
}
function loggerMiddleWare2(store) {
  return function dispatchCreator2(nextDispatch) {
    // 下面返回的函数，是最终要应用的dispatch
    return function dispatch(action) {
      console.log('中间件2');
      console.log('旧数据', store.getState());
      console.log('action', action);
      nextDispatch(action);
      console.log('中间件2 新数据', store.getState());
      console.log('');
    };
  };
}

const store = createStore(reducer, applyMiddleware(loggerMiddleWare1, loggerMiddleWare2));
// const store = applyMiddleware(loggerMiddleWare1, loggerMiddleWare2)(createStore)(reducer);

console.log('store:', store);

store.subscribe(() => {
  console.log('状态改变了1：', store.getState());
});

console.log('getState:', store.getState());

const actions = bindActionCreators(
  {
    createAddUser: usersAction.createAddUser,
    createDeleteUser: usersAction.createDeleteUser,
  },
  store.dispatch
);
actions.createAddUser({ id: 123, name: 'fwefewfew' });

console.log('getState:', store.getState());
