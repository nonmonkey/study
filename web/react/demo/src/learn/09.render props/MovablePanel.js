import React from 'react';
import './index.css';

export default class MovablePanel extends React.Component {
  state = {
    x: 0,
    y: 0,
  };

  divref = React.createRef();

  handleMouseMove = (e) => {
    // 更新x和y的值
    var rect = this.divref.current.getBoundingClientRect();
    console.log('rect:', rect);
    console.log('e:', e);
    this.setState({
      x: e.pageX - rect.left,
      y: e.pageY - rect.top,
    });
  };

  render() {
    return (
      <div className="point" ref={this.divref} onMouseMove={this.handleMouseMove}>
        <div
          style={{
            position: 'absolute',
            top: this.state.y - 50,
            left: this.state.x - 50,
            width: 100,
            height: 100,
            backgroundColor: '#008c8c',
          }}
        ></div>
      </div>
    );
  }
}
