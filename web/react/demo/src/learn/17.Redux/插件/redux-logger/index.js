import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import * as Redux from 'redux';
import reducer from './reducer/index';
import * as usersAction from './action/usersAction';

import logger, { createLogger } from 'redux-logger';

console.log((window.Redux = Redux));

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
