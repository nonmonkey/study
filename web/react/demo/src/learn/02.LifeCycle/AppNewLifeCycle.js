import React from 'react';
import NewLifeCycle from './NewLifeCycle';

export default class App extends React.Component {
  state = {
    number: 1,
  };

  render() {
    return (
      <div>
        <NewLifeCycle n={this.state.number}></NewLifeCycle>
        <button onClick={() => {
          this.setState({
            number: this.state.number + 1
          })
        }}>父组件按钮 + 1</button> <span>{this.state.number}</span>
      </div>
    );
  }
}
