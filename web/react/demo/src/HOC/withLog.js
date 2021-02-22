import React from 'react';

/**
 * 高阶组件
 * @params {*} comp
 */
export default function withLog(Comp) {
  return class LogWrapper extends React.Component {
    render() {
      return <Comp {...this.props}></Comp>
    }

    componentDidMount() {
      console.log(`日志：组件 ${Comp.name}被创建了！${new Date()}`);
    }

    componentWillUnmount() {
      console.log(`日志：组件 ${Comp.name}被移除了！${new Date()}`);
    }
  }
}
