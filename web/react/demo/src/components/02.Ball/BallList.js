import React from 'react';
import Ball from './Ball';
import { getRandom } from './util';

export default class BallReact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ballInstance: [],
    };

    var timer = null;
    var index = 0;

    timer = setInterval(() => {
      index++;
      if (index > 10) {
        clearInterval(timer);
      } else {
        var info = {
          left: getRandom(0, document.documentElement.clientWidth - 100),
          top: getRandom(0, document.documentElement.clientHeight - 100),
          xSpeed: getRandom(50, 500),
          ySpeed: getRandom(50, 500),
          bg: `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`,
          key: index,
        };

        this.setState({
          ballInstance: [...this.state.ballInstance, info],
        });
      }
    }, 2000);
  }

  render() {
    var balls = this.state.ballInstance.map((item) => <Ball {...item}></Ball>);
    return <>{balls}</>;
  }
}
