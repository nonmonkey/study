import React from 'react';
import store from '../store';
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

export default class CounterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = mapStates(store.getState());
    this.unSubscribe = store.subscribe(() => {
      this.setState(mapStates(store.getState()));
    });
  }

  componentWillUnmount() {
    this.unSubscribe();
  }

  render() {
    const eventHandlers = mapDispatchs(store.dispatch);
    return <Counter {...this.state} {...eventHandlers}></Counter>;
  }
}
