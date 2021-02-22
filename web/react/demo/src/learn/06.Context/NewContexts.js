import React from 'react';

const ctx = React.createContext();
const ctx1 = React.createContext();

function ChildA(props) {
  return (
    <ctx1.Provider value={{ a: 999, c: 'this is c.' }}>
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
    </ctx1.Provider>
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
        <div>
          <ctx1.Consumer>
            {
              val => (
                <>
                来自于ctx1的数据：
                a: {val.a}, c: {val.c}
                </>
              )
            }
          </ctx1.Consumer>
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
