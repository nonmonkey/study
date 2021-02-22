import React from 'react';
import './index.css';

export default class MovablePanel extends React.PureComponent {
  state = {
    x: 0,
    y: 0,
  };

  divref = React.createRef();

  handleMouseMove = (e) => {
    // 更新x和y的值
    var rect = this.divref.current.getBoundingClientRect();
    console.log(e, rect);
    this.setState({
      x: e.pageX - rect.left,
      y: e.pageY - rect.top,
    });
  };

  render() {
    return (
      <div className="point" ref={this.divref} onMouseMove={this.handleMouseMove}>
        {this.props.render ? this.props.render(this.state) : '默认值'}
      </div>
    );
  }
}
