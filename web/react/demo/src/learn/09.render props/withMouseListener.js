import React from 'react';

export default function withMouseListener(Comp) {
  return class MouseListener extends React.Component {
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
          <Comp {...this.props} x={this.state.x} y={this.state.y}></Comp>
        </div>
      );
    }
  }
}
