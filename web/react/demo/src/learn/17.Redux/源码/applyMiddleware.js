import { compose } from './utils';

/**
 * 注册中间件
 * @param  {...any} middlewares 
 */
export default function applyMiddleware(...middlewares) {
  // 创建仓库的函数
  return function (createStore) {
    // 用于创建仓库
    return function (reducer, defaultState) {
      // 创建仓库
      const store = createStore(reducer, defaultState);
      let dispatch = () => { throw new Error('目前不能使用该函数') }
      const simpleStore = {
        getState: store.getState,
        dispatch: (...args) => dispatch(...args),
      }
      // 给dispatch赋值
      // 根据中间件数组，得到一个dispatch创建函数的数组
      const dispatchProducers = middlewares.map(mid => mid(simpleStore))
      const dispatchProducer = compose(...dispatchProducers);
      dispatch = dispatchProducer(store.dispatch);

      return {
        ...store,
        dispatch
      }
    }
  }
}
