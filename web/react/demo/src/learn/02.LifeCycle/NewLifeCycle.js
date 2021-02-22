import React from 'react';

export default class Test extends React.Component {
  state = {
    n: this.props.n,
  };

  constructor(props) {
    super(props);
    console.log('constructor');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps:', props, state);
    return null;
  }

  render() {
    console.log('render');
    return (
      <div>
        <h1>数字：{this.state.n}</h1>

        <p>
          <button
            onClick={() => {
              this.setState({
                n: this.state.n + 1,
              });
            }}
          >
            n加1
          </button>
        </p>
      </div>
    );
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  // 更新
  // static getDerivedStateFromProps

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState);
    return true;
  }

  //render

  getSnapshotBeforeUpdate = (prevProps, prevState) => {
    console.log('getSnapshotBeforeUpdate:', prevProps, prevState);
    return 123;
  };

  componentDidUpdate(prevProps, prevState, snap) {
    console.log('componentDidUpdate:', prevProps, prevState, snap);
  }

  // 销毁阶段
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
}
