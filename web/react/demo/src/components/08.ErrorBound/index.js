import React from 'react';

export default class ErrorBound extends React.Component {
  state = {
    hasError: false,
  };

  // 1.方法一
  // static getDerivedStateFromError(error) {
  //   console.log('发生了错误！', error);
  //   return {
  //     hasError: true,
  //   };
  // }

  // 2.方法二
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
    })
  }

  render() {
    console.log('ErrorBound render');
    if (this.state.hasError) {
      return <h1>出现错误了！</h1>;
    }
    return this.props.children;
  }
}
