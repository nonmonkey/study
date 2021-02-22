import React from 'react';
import './ball.css';

/**
 * 一个能够自动移动的小球
 */

export default class Ball extends React.Component {
  constructor(props) {
    super(props);
    // 属性中需要分别传递横纵坐标上的速度，每秒移动的像素值
    // props.xSpeed props.ySpeed
    this.state = {
      left: props.left || 0, // 横坐标
      top: props.top || 0, // 纵坐标
      xSpeed: props.xSpeed || 50,
      ySpeed: props.ySpeed || 50,
    };

    var duration = 16; // 间隔时间
    setInterval(() => {
      var xDis = (this.state.xSpeed * duration) / 1000;
      var yDis = (this.state.ySpeed * duration) / 1000;
      var newLeft = this.state.left + xDis;
      var newTop = this.state.top + yDis;

      if (newLeft < 0) {
        newLeft = 0;
        this.setState({
          xSpeed: -this.state.xSpeed, // 横坐标相反
        });
      } else if (newLeft >= document.documentElement.clientWidth - 100) {
        newLeft = document.documentElement.clientWidth - 100;
        this.setState({
          xSpeed: -this.state.xSpeed, // 横坐标相反
        });
      }

      if (newTop < 0) {
        newTop = 0;
        this.setState({
          ySpeed: -this.state.ySpeed, // 纵坐标相反
        });
      } else if (newTop >= document.documentElement.clientHeight - 100) {
        newTop = document.documentElement.clientHeight - 100;
        this.setState({
          ySpeed: -this.state.ySpeed, // 纵坐标相反
        });
      }
      
      this.setState({
        top: newTop,
        left: newLeft,
      });
    }, duration);
  }

  render() {
    return (
      <div
        className="ball"
        style={{
          left: this.state.left,
          top: this.state.top,
          backgroundColor: this.props.bg || 'red',
        }}
      ></div>
    );
  }
}
