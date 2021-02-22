import React from 'react';

const ctx = React.createContext();

function ChildA(props) {
  return (
    <div>
      <h1>ChildA</h1>
      ctx.Consumer:
      <ctx.Consumer>
        {(value) => (
          <div>
            {value.a}, {value.b}
          </div>
        )}
      </ctx.Consumer>
      <ChildB></ChildB>
    </div>
  );
}

class ChildB extends React.Component {
  render() {
    console.log('render B');
    return (
      <div>W
        <h1>ChildB</h1>
        <div>子组件按钮：a+2</div>
      </div>
    );
  }
}

export default class NewContext extends React.Component {
  state = {
    a: 100,
    b: 'b',
    onChangeA: (newA) => {
      this.setState({
        a: newA,
      });
    },
  };

  render() {
    return (
      <ctx.Provider value={this.state}>
        NewContext：
        <ChildA></ChildA>
        <button
          onClick={() => {
            this.setState({
              a: this.state.a + 1,
            });
          }}
        >
          父组件按钮 a+1;
        </button>
      </ctx.Provider>
    );
  }
}
