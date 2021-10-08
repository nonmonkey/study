[TOC]
***

### 一、深入理解setState

setState 对状态的改变，**可能**是异步的

> 如果改变状态的代码处于某个HTML元素的事件中，则其是异步的，否则是同步的。

如果遇到某个事件中，需要同步调用多次，需要使用函数的方式得到最新状态。

最佳实践：
1. 把所有的setState当做是异步的。
2. 永远不要信任setState调用之后的状态
3. 如果要使用改变之后的状态，需要使用回调函数(setState的第二个参数)
4. 如果新的状态要根据之前的状态进行运算，使用函数的方式改变状态(第一个参数)。

React会对异步的setState进行优化，将多次setState进行合并(将多次状态改变完成之后，再统一对state进行改变，然后触发render)。

### 二、示例

**写法一：第一个参数为对象**
```JS
this.setState(
  {
    n: this.state.n + 1,
  },
  // 所有状态全部更新完成，并且重新渲染后执行
  () => {
    console.log('状态完成改变之后触发:', this.state.n);
  }
);
```

**写法二：第一个参数为函数**

```JS
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

```JS
this.setState(
  // 参数prev表示当前的状态
  // 该函数的返回结果，会混合（覆盖）掉之前的状态
  // 该函数是异步执行
  (cur) => {
    return {
      n: cur.n + 1,
    };
  },
  () => {
    console.log('状态完成改变之后触发:', this.state.n);
  }
);
```
