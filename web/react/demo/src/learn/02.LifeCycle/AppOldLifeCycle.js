import React from 'react';
import OldLifeCycle from './OldLifeCycle';

export default class App extends React.Component {
  state = {
    number: 1,
    show: true,
  };

  render() {
    const Comp = this.state.show ? <OldLifeCycle n={this.state.number}></OldLifeCycle> : null;
    return (
      <div>
        {Comp}
        <button
          onClick={() => {
            this.setState((state) => ({ number: state.number + 1 }));
          }}
        >
          属性加1
        </button>
        <button
          onClick={() => {
            this.setState({
              show: !this.state.show,
            });
          }}
        >
          显示/隐藏
        </button>
      </div>
    );
  }
}
