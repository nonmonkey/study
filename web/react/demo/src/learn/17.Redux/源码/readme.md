### createStore

- 参数 1：function，reducer
- 参数 2：any，默认的状态值
- 返回值：
  - dispatch()： 分发一个 action
    - 参数：plain-object (action)
      - type: '操作类型'
      - payload: 附加数据
  - getState()：得到仓库中当前的状态
  - subscribe()：注册一个监听器，监听器是一个无参函数，分发一个 action 之后，会运行注册的监听器。
    - 参数：function，监听器
    - 返回值：一个函数，用于取消监听

### bindActionCreators

组装 reducers，返回一个 reducer，数据使用一个对象表示，对象的属性名与传递的参数对象保持一致。

- 参数：object
  - key: 状态名
  - value: reducer
- 返回值：reducer 函数
  - 参数 1：state
  - 参数 2：action ({ type: xxx, payload: xxx })
  - 返回值：state

### applyMiddleware

- applyMiddleware 函数，用于记录有哪些中间件
  - 参数：一系列中间件函数
  - 返回值：记录创建仓库的函数
    - 参数：createStore 函数
    - 返回值：真正用来创建仓库的函数
      - 参数：reducer
      - 返回值：生成的 store
