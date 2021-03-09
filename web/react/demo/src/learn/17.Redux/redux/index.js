import { createStore, bindActionCreators, applyMiddleware } from '../源码/index.js';
// import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import * as MyRedux from '../源码/index.js';
import * as Redux from 'redux';
import reducer from './reducer/index';
import * as usersAction from './action/usersAction';

import logger, { createLogger } from 'redux-logger';

console.log((window.Redux = Redux), (window.MyRedux = MyRedux));

const myLogger = createLogger({
  predicate: () => {
    console.log('********');
  },
});

const store = createStore(reducer, applyMiddleware(myLogger, logger));
// const store = applyMiddleware(logger)(createStore)(reducer);

console.log('store:', store);

const actions = bindActionCreators(
  {
    createAddUser: usersAction.createAddUser,
    createDeleteUser: usersAction.createDeleteUser,
  },
  store.dispatch
);
actions.createAddUser({ id: 123, name: 'fwefewfew' });
