[TOC]
---

### 一、Router 组件

本身不做任何展示，仅提供路由模式配置，另外，该组件会产生一个上下文，上下文中会提供一些使用的对象和方法，作为属性传入对应的组件。

1. HashRouter：该组件，使用hash模式匹配
2. BrowserRouter：该组件，使用BrowserHistory模式匹配

通常情况下，Router组件只有一个，将该组件包裹整个页面。

react-router使用了第三方库：path-to-regexp，该库的作用是，将一个字符串正则转换成一个真正的正则表达式。

主要属性：
- getUserConfirmation：拦截history.block函数，单独使用没有任何效果
  - 参数1：阻塞消息（history.block函数的传值）
  - 参数2：回调函数，调用该组件并传递true，则表示进入到新页面，否则，不做任何操作。

### 二、Route 组件

根据不同的地址，展示不同的组件

重要属性：
1. path：
    1. 默认情况下，不区分大小写，可以设置sensitive属性为true来区分大小写（一般不用）
    2. 默认情况下，只匹配初始目录，如果要精确匹配，配置exact属性为true
    3. 如果不写path，则会匹配任意路径
    4. 可以为字符串，或数组。
    5. 可以书写一个```string pattern```（字符串正则）
2. component：匹配成功后要显示的组件
3. children：（不论是否匹配都会运行）
    1. 传递React元素，无论是否匹配，一定会显示children，并且会忽略掉component
    2. 传递一个函数，该函数有多个参数，这些参数来自于上下文，该函数返回react元素，则一定会显示返回的元素，并且忽略component属性。
4. render：（只有匹配了才会运行）
    1. 传递一个函数，返回一个节点，参数为上下文，页面显示该节点

**向某个页面传递数据的方法：**
1. 使用state：在push页面时，加入state
2. 利用search：把数据填写到地址栏中的?后。（使用比较多）
3. 利用hash：把数据填写到hash后
4. params：把数据填写到路径中。（使用比较多）例：
```js
/students/add/:name/:age? // ? 表示可传可不传
/students/add/:year/:month/:day(\d+) // 添加校验
/students/add/:year/:month/:day(\d+)/* // /* 表示任意路径
```

***被匹配的组件参数中存在以下属性：***
#### 1.history

他不是window.history对象，我们利用该对象无刷新跳转地址
**为什么没有直接使用history对象**
1. React-Router中有两种模式：Hash，History。如果直接使用window.history，只能支持一种模式。
2. 当使用window.history.pushState方法时，没有办法收到任何通知时，将导致React无法知晓地址发生了变化，结果导致无法重新渲染组件。

- push：将某个新的地址入栈（历史记录）
  - 参数1：新的地址
  - 参数2：可选，附带的状态数据
- replace：将某个新的地址替换掉当前栈中的地址
- go
- forward
- back
- listen：添加一个监听器，监听地址的变化，当地址发生变化时，会调用传递的函数
  - 参数：函数 (运行时间点：发生在即将跳转到新页面时)
    - 参数1：location对象，记录当前的地址信息
    - 参数2：action，一个字符串，表示进入该地址的方式
      - POP: 出栈
        - 通过点击浏览器的前进，后退
        - 调用history.go
        - 调用history.goBack
        - 调用history.goForward
      - PUSH：入栈
        - history.push
      - REPLACE：替换
        - history.replace
  - 返回结果：函数，可以使用该函数取消监听
- block：函数，设置阻塞，只能设置一次。并将阻塞消息传递到 router 组件上的getUserConfirmation函数。
  - 参数
    - 字符串，阻塞消息
    - 函数
      - 参数1：location
      - 参数2：action
  - 返回一个函数，用于取消阻塞器。

#### 2.location
与history.location完全一致，是一个对象，但是，与window.location不同
location对象中记录了当前地址的相关信息
我们通常使用第三方库```query-string```用于解析地址栏中的信息

#### 3.match
该对象中保存了，路由匹配的相关信息。
- isExact：是否成功进行了精确的匹配。
- params：获取路径规则中对应的数据。
- path: 当前组件的路径规则（即Route组件的path属性）
- url: 真实路径中匹配到规则的那一部分

#### 4、非路由组件获取路由信息

某些组件，并没有直接放到Route中，而是嵌套在其他普通组件中，因此，它的props中没有路由信息，如果这些组件需要获取到路由信息，可以使用下面两种信息：
1. 将路由信息从父组件一层一层传递到子组件
2. 使用react-router提供的高阶组件**withRouter**。包装要使用的组件，该高阶组件会返回一个新组件，新组件将向提供的组件注入路由信息。

### 三、Switch 组件

写到Switch组件中的Route组件，当匹配到第一个Route后，会立即停止匹配。

由于Switch组件会循环所有子元素，然后让每个子元素去完成匹配，若匹配成功，则渲染对应的组件，然后停止循环，因此，不能在Switch组件中使用除Route外的任何组件。

### 四、Redirect 组件

跳转组件（返回该组件时，直接跳转到目标路径）

重要属性：
1. to：目标路径

### 五、Link 组件

会渲染成a元素

重要属性：
- to： 目标路径
```JS
// to为string
<Link to="/about">关于</Link>
 
// to为obj
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: { fromDashboard: true }
}}/>
```
- replace：bool，为true时，点击链接后将使用新地址替换掉访问历史记录里面的原地址。

### 六、NavLink 组件

NavLink是Link的一个特定版本，会在匹配上当前的url的时候给已经渲染的元素添加参数，组件的属性有：
- activeClassName(string)：设置选中样式，默认值为active
- activeStyle(object)：当元素被选中时，为此元素添加样式
- exact(bool)：为true时，只有当导致和完全匹配class和style才会应用
- strict(bool)：为true时，在确定为位置是否与当前URL匹配时，将考虑位置pathname后的斜线
- isActive(func)判断链接是否激活的额外逻辑的功能
