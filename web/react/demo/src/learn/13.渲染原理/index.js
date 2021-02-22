import React from 'react';

class CompA extends React.Component {
  state = {
    a: 123,
    b: 'abc',
  };
  render() {
    return (
      <div>
        <h1>CompA {this.state.a}</h1>
        <button
          onClick={() => {
            this.setState({
              a: this.state.a + 1,
              b: this.state.b + 'c',
            });
          }}
        >
          点击
        </button>
        <CompB n={this.state.b}></CompB>
      </div>
    );
  }
}

class CompB extends React.Component {
  render() {
    return (
      <div>
        <h1>CompB {this.props.n}</h1>
        <CompC n={this.props.n}></CompC>
      </div>
    );
  }
}

class CompC extends React.Component {
  render() {
    return (
      <div>
        <h1>CompC {this.props.n}</h1>
      </div>
    );
  }
}

export default class Test extends React.Component {
  render() {
    return (
      <div>
        <CompA></CompA>
      </div>
    );
  }
}
