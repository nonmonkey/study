import React from 'react';

export default class Test extends React.Component {
  state = {
    n: this.props.n,
  };

  componentWillReceiveProps(newProps) {
    this.setState({
      n: newProps.n,
    });
  }

  render() {
    return (
      <div>
        <h1>数字：{this.state.n}</h1>

        <p>
          <button
            onClick={() => {
              this.setState({
                n: this.state.n + 1,
              });
            }}
          >
            n加1
          </button>
        </p>
      </div>
    );
  }
}
