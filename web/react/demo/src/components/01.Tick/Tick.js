// 计时器
import React from 'react';

export default class Tick extends React.Component {
  state = {
    left: this.props.number || 10,
  };

  constructor(props) {
    super(props);
    this.timer = setInterval(() => {
      var left = this.state.left - 1;
      if (left < 0) {
        clearInterval(this.timer);
        this.props.onOver && this.props.onOver();
      } else {
        this.setState({
          left,
        });
      }
    }, 600);
  }

  render() {
    return (
      <h1 onClick={this.props.onClick}>倒计时：{this.state.left}</h1>
    );
  }
}
