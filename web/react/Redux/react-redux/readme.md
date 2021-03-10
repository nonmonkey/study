[TOC]

---

- React：组件化的UI界面处理方案
- React-Router：根据地址匹配路由，最终渲染不同的组件
- Redux：处理数据以及数据变化的方案，主要处理共享数据

> 如果一个组件仅用于渲染一个UI界面，而没有状态（通常是一个函数组件），该组件叫做**展示组件**
> 如果一个组件，仅用于提供数据，没有任何属于自己的UI界面，则该组件叫做**容器组件**，容器组件纯粹是为了给其他组件提供数据。


**react-redux库：链接redux和react**

- Provider组件：没有任何UI界面，该组件的作用，是将redux的仓库放到一个上下文中。
- connect：高阶组件，用于链接仓库和组件
  - 参数1: function，映射的属性函数
    - 参数1：整个仓库的状态
    - 参数2：使用者传递的属性对象
  - 参数2: function，映射的事件处理函数
    - 场景1：传递一个函数
      - 参数1：dispatch
      - 参数2：使用者传递的属性对象
      - 返回值：返回的对象会作为属性传递到展示组件
    - 场景2：使用一个对象。对象的每个属性是一个action创建函数
  - 返回值：高阶组件
  - 细节一：如果对返回的容器组件加上额外的属性，则这些属性会直接传递到展示组件
  - 细节二：如果不传递第二个参数，通过connect连接的组件，会自动得到一个属性：dispatch。使得组件有自行dispatch的能力（不推荐，因为此行为将组件和store耦合到一起）

```JS
import React from 'react';
import { connect } from 'react-redux';
import { decreaseAction, decreaseAsyncAction, increaseAction, increaseAsyncAction } from '../store/action/counter';

/**
 * 展示组件
 * @param {*} props
 */
function Counter(props) {
  return (
    <div>
      <h1>{props.number}</h1>
      <p>
        <button onClick={props.onDecreaseAsync}>异步减</button>
        <button onClick={props.onDecrease}>减</button>
        <button onClick={props.onIncrease}>加</button>
        <button onClick={props.onIncreaseAsync}>异步加</button>
      </p>
    </div>
  );
}

/**
 * 将整个仓库的状态，映射到当前需要的数据
 * @param {*} state
 */
function mapStates(state) {
  return {
    number: state.counter,
  };
}

/**
 * 映射事件处理函数
 * @param {*} dispatch 
 */
function mapDispatchs(dispatch) {
  return {
    onDecreaseAsync() {
      dispatch(decreaseAsyncAction());
    },
    onDecrease() {
      dispatch(decreaseAction());
    },
    onIncrease() {
      dispatch(increaseAction());
    },
    onIncreaseAsync() {
      dispatch(increaseAsyncAction());
    },
  };
}

export default connect(mapStates, mapDispatchs)(Counter);
```
