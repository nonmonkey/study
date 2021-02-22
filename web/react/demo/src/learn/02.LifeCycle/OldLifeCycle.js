import React from 'react';

export default class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      n: 0,
    };
    console.log('一个新组件诞生了！');
  }

  componentWillMount() {
    console.log('componentWillMount:', '组件即将被挂载');
  }

  render() {
    console.log('render: ', '渲染，返回的react元素会挂载到虚拟dom树');
    return (
      <div>
        <h1>旧版生命周期</h1>
        <h2>属性n：{this.props.n}</h2>
        <h2>状态n：{this.state.n}</h2>

        <button
          onClick={() => {
            this.setState({ n: this.state.n + 1 });
          }}
        >
          状态+1
        </button>
      </div>
    );
  }

  componentDidMount() {
    console.log('componentDidMount:', '挂载完成');
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps:', '接收到新的属性值:', nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate:', '是否组件应该重新渲染:', nextProps, nextState);
    if (nextProps.n === this.props.n && nextState.n === this.state.n) {
      return false;
    }
    return true;
  }

  componentWillUpdate() {
    console.log('componentWillUpdate:', '组价即将被重新渲染');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate:', '组件已完成重新渲染', prevProps, prevState)
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
}
