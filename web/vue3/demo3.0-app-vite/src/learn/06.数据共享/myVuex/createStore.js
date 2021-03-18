import { readonly } from 'vue';
import storeKey from './storeKey';
import { unifyActionParams, isString, isPlainObject, assert, createPathInObj } from './utils.js';

export default function createStore(options) {
  return new Store(options);
}

function Store(options) {
  this.state = {};
  this._mutations = Object.create(null);
  this._actions = Object.create(null);

  this.dispatch = (type, value) => {
    const newParams = unifyActionParams(type, value);
    return _dispatch(this, newParams.type, newParams.value);
  };

  this.commit = (type, value) => {
    const newParams = unifyActionParams(type, value);
    return _commit(this, newParams.type, newParams.value);
  };

  initCore(this, options);
  initReactive(this);
}

function _commit(store, type, value) {
  const mutation = store._mutations[type];
  assert(mutation, 'unknown mutation type: ' + type);
  return mutation(value);
}

function _dispatch(store, type, value) {
  const action = store._actions[type];
  assert(action, 'unknown action type: ' + type);
  return action(value);
}

Store.prototype.install = function (app) {
  app.provide(storeKey, this);
  app.config.globalProperties.$store = this;
};

function initReactive(store) {
  store.state = readonly(store.state);
}

function initCore(store, options = {}) {
  assert(isPlainObject(options), 'expects plain-object as the module.');
  regesterCore(store, options, []);
}

function regesterCore(store, options = {}, pathArr = [], namespacedPath = '') {
  const { state, mutations, actions, modules = {} } = options;
  regesterState(store, state, pathArr);
  regesterMutations(store, mutations, pathArr, namespacedPath);
  regesterActions(store, actions, pathArr, namespacedPath);
  regesterModule(store, modules, pathArr, namespacedPath);
}

function regesterState(store, state = {}, pathArr = []) {
  assert(isPlainObject(state), 'expects plain-object as the state.');

  const [curState, warns] = createPathInObj(store.state, pathArr);

  if (warns && warns.length) {
    warns.forEach((path) => console.warn('state field "' + path + '" was overridden by a module with the same name.'));
  }

  Object.assign(curState, state);
}

function regesterMutations(store, mutations, pathArr = [], namespacedPath = '') {
  if (!mutations) return;
  assert(isPlainObject(mutations), 'expects plain-object as the mutations.');
  const [curState] = createPathInObj(store.state, pathArr);
  const _createMutationFn = function (name) {
    return function (value) {
      return mutations[name](curState, value);
    };
  };

  Object.keys(mutations).forEach((name) => {
    const key = (namespacedPath + '/' + name).replace(/^\//, '');
    assert(!(key in store._mutations), 'The mutation type "' + key + '" already exists');
    store._mutations[key] = _createMutationFn(name);
  });
}

function regesterActions(store, actions, pathArr = [], namespacedPath = '') {
  if (!actions) return;
  assert(isPlainObject(actions), 'expects plain-object as the actions.');
  const handler = {
    dispatch: namespacedPath
      ? function (type, value) {
          const newParams = unifyActionParams(type, value);
          return store.dispatch(namespacedPath + '/' + newParams.type, newParams.value);
        }
      : store.dispatch,
    commit: namespacedPath
      ? function (type, value) {
          const newParams = unifyActionParams(type, value);
          return store.commit(namespacedPath + '/' + newParams.type, newParams.value);
        }
      : store.commit,
  };
  const _createActionFn = function (name) {
    return function (value) {
      return new Promise((resolve, reject) => {
        try {
          const result = actions[name](handler, value);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    };
  };

  Object.keys(actions).forEach((name, fn) => {
    const key = (namespacedPath + '/' + name).replace(/^\//, '');
    assert(!(key in store._actions), 'The action type "' + key + '" already exists');
    store._actions[key] = _createActionFn(name);
  });
}

function regesterModule(store, modules, pathArr = [], namespacedPath = '') {
  if (!modules) return;
  assert(isPlainObject(modules), 'expects plain-object as the modules.');

  Object.keys(modules).forEach((name) => {
    const options = modules[name];
    var tmpNs = namespacedPath;
    if (options.namespaced) tmpNs += `/${name}`;
    tmpNs = tmpNs.replace(/^\//, '');
    regesterCore(store, options, [...pathArr, name], tmpNs);
  });
}
