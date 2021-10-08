import React from 'react';
// import { bindActionCreators } from 'redux';
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
  // 或者
  // return bindActionCreators(
  //   {
  //     onDecreaseAsync: decreaseAsyncAction,
  //     onDecrease: decreaseAction,
  //     onIncrease: increaseAction,
  //     onIncreaseAsync: increaseAsyncAction,
  //   },
  //   dispatch
  // );
}

// connect 返回一个高阶组件
// 传入展示组件，返回一个容器组件
export default connect(mapStates, mapDispatchs)(Counter);
