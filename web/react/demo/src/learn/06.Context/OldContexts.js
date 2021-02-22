import React from 'react';
import types from '../../utils/commonTypes';

const contextTypes = {
  a: types.number,
  b: types.string.isRequired,
  c: types.string,
  onChangeA: types.func,
};

// 1.ChildA 中也要创建上下文
class ChildA extends React.Component {
  static contextTypes = contextTypes;
  
  static childContextTypes = {
    a: types.number,
    c: types.string,
  };

  getChildContext = () => {
    return {
      a: 123,
      c: 'hello ',
    };
  };

  render() {
    return (
      <div>
        <h1>ChildA</h1>
        <div>
          ChildA:修改a:
          <button
            onClick={() => {
              this.context.onChangeA(this.context.a + 3);
            }}
          >
            a+3
          </button>
        </div>
        <div>
          ChildA:a:{this.context.a}; b:{this.context.b}
        </div>
        <ChildB></ChildB>
      </div>
    );
  }
}

// 2.ChildB context中的数据取值时，会使用就近原则。
class ChildB extends React.Component {
  /**
   * 声明需要使用那些上下文中的数据
   */
  static contextTypes = contextTypes;

  // 如果使用 constructor 需要将 context 也传入 super
  // constructor(props, context) {
  //   super(props, context);
  //   console.log('constructor:', props, context, this);
  // }

  render() {
    console.log('b this:', this);
    return (
      <p>
        ChildB 来自于上下文中数据：a:{this.context.a}；b:{this.context.b}
      </p>
    );
  }
}

export default class OldContext extends React.Component {
  static childContextTypes = contextTypes;

  state = {
    a: 100,
    b: 'b',
  };

  /**
   * 得到上下文中的数据
   */
  getChildContext() {
    return {
      a: this.state.a,
      b: this.state.b,
      onChangeA: (newA) => {
        console.log('newA:', newA);
        this.setState({
          a: newA,
        });
      },
    };
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({
              a: this.state.a + 1,
            });
          }}
        >
          a+1
        </button>
        this is Context.
        <ChildA></ChildA>
      </div>
    );
  }
}
