[TOC]

---

***Redux 核心概念***

MVC：他是一个UI的解决方案，用于降低UI以及UI关联的数据的复杂度。

**服务器端渲染**

环境：
1. 服务器需要响应一个完整的HTML
2. 该HTML中包含页面需要的数据
3. 浏览器只承担渲染页面的作用。

以上的这种方式叫做**服务端渲染**，即服务器端将完整的页面组装好之后，一起发送给客户端。

服务器端需要处理UI中要用到的数据，并且要将数据嵌入到页面中，最终生成一个完整的HTML响应。

为了降低处理这个过程的复杂度，出现了MVC模式。

**服务器MVC**

1. 服务器收到一个请求，将不同的请求分发到对应的**Controller**：控制器，处理请求，组装这次请求需要的数据
2. **Modal**：数据模型，需要用于UI渲染的模型。
3. **View**：视图，生成完整的HTML，返回给客户端

**前端MVC的困难**

> 请求流程：1. 客户端请求：url地址。2. 服务器端提供资源，响应最基本的HTML结构，附带js引用。3. 客户端，执行js，用js动态的控制页面元素。

React 解决了 数据 -> 视图的问题。

1. 前端的controller要比服务器复杂多了，因为前端中的controller处理的是用户的操作，而用户的操作场景是复杂的。
2. 对于那些组件化的框架（比如：Vue，React），他们使用的是单向数据流。若需要共享数据，则必须将数据提升到顶层组件，然后数据再一层一层传递，极其繁琐。
    1. 虽然可以使用上下文来提供共享数据，但对数据的操作难以监控，容易导致调试错误的困难，以及数据还原的困难。并且，若开发一个大中型项目，共享的数据很多，会导致上下文中的数据非常复杂。


**前端需要一个独立的数据解决方案**

**Flux** 

Facebook 提出的数据解决方案，它的最大历史意义，在于他引入了action的概念

action 是一个普通的对象，用于描述要干什么，**action是触发变化的唯一原因**。

store表示数据仓库，用于存储共享数据。还可以根据不同的action更改仓库中的数据。

```JS
var loginAction = {
  type: 'login',
  payload: {
    loginId: 'admin',
    loginPwd: 'admin',
  }
}

var deleteAction = {
  type: 'delete',
  payload: 1, // 用户id为1 
}
```

**Redux**

在Flux基础上，引入了reducer的概念。

**reducer**：处理器，用于根据action来处理数据，处理后的数据会被仓库重新保存。

```JS
// 约定action的格式：{ type: '操作类型', payload: 附加数据 }
/**
 * reducer本质上是一个普通函数
 * @param {*} state 之前仓库中的状态（数据）
 * @param {*} action 描述要做什么对象。
 */
function reducer(state, action) {
  if (action.type === 'increase') {
    return state + 1;
  } else if (action.type === 'increase') {
    return state - 1;
  }
  return state; // 如果 type 是一个无效类型，返回原来数据
}
```
