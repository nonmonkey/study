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
  static contextType = ctx;

  render() {
    return (
      <div>
        <h1>ChildB</h1>
        <div>
          a:{this.context.a}; b:{this.context.b}
          <button
            onClick={() => {
              this.context.onChangeA(this.context.a + 2);
            }}
          >
            子组件按钮：a+2
          </button>
        </div>
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
    console.log('ctx:', ctx);

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
