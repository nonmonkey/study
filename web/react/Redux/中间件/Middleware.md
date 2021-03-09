[TOC]

---

中间件：类似于插件，可以在不影响原本功能，并且不改变原本代码的基础上，对其功能进行增强。在 Redux 中，中间件主要用于增强 dispatch 功能

实现 Redux 中间件的基本原理，是更改仓库中的 dispatch 函数

Redux 中间件写法一：

- 中间件本身是一个函数，该函数接收一个 store 参数，表示创建的仓库，该仓库并非一个完整的仓库对象，仅包含 getState，dispatch，该函数运行时间是在仓库创建之后运行。
  - 由于创建仓库后需要自动运行设置的中间件函数，因此，需要在创建仓库时，告诉仓库有哪些中间件
  - 需要使用 applyMiddleware 函数，将函数的返回结果作为 createStore 的第二个或第三个参数。
    - 参数：一系列中间件函数
    - 返回值：一个 dispatch 函数创建函数。

Redux 中间件写法二：

- applyMiddleware 函数，用于记录有哪些中间件，他会返回一个函数
  - 参数：一系列中间件函数
  - 返回值：记录创建仓库的函数
    - 参数：createStore 函数
    - 返回值：真正用来创建仓库的函数
      - 参数：reducer
      - 返回值：生成的 store


middleware 函数的本质，是一个调用后可以得到dispatch创建函数的函数

### 应用中间件方式一：

```JS
/**
 * 一个中间件函数
 * @param {*} store
 */
function loggerMiddleWare1(store) {
  return function (nextDispatch) {
    // 下面返回的函数，是最终要应用的dispatch
    return function dispatch(action) {
      console.log('中间件1');
      console.log('旧数据', store.getState());
      console.log('action', action);
      nextDispatch(action);
      console.log('新数据', store.getState());
      console.log('');
    };
  };
}
function loggerMiddleWare2(store) {
  return function (nextDispatch) {
    // 下面返回的函数，是最终要应用的dispatch
    return function dispatch(action) {
      console.log('中间件2');
      console.log('旧数据', store.getState());
      console.log('action', action);
      nextDispatch(action);
      console.log('新数据', store.getState());
      console.log('');
    };
  };
}

const store = createStore(reducer, applyMiddleware(loggerMiddleWare1, loggerMiddleWare2));
```

### 应用中间件方法二：

一般不用，调用第一种方法，最终也是执行的这种方法。

```JS
const store = applyMiddleware(loggerMiddleWare1, loggerMiddleWare2)(createStore)(reducer);
```
