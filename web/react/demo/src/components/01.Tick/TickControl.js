import React from 'react';
import Tick from './Tick';

export default class TickControl extends React.Component {
  state = {
    isOver: false,
  };

  handleClick() {
    console.log('this is click');
  }

  onOver() {
    this.setState({ isOver: true });
  }

  render() {
    var status = '正在倒计时';
    if (this.state.isOver) {
      status = '倒计时完成';
    }
    return (
      <div>
        <Tick
          number={5}
          onClick={() => {
            this.handleClick();
          }}
          onOver={() => {
            this.onOver();
          }}
        ></Tick>
        <h2>{status}</h2>
      </div>
    );
  }
}
