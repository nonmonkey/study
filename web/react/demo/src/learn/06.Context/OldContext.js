import React from 'react';
import types from '../../utils/commonTypes';

const contextTypes = {
  a: types.number,
  b: types.string.isRequired,
  onChangeA: types.func,
};

// 1.函数组件 使用 context
function ChildA(props, context) {
  console.log('A context:', context)
  return (
    <div>
      <h1>ChildA</h1>
      <div>
        ChildA:修改a:
        <button
          onClick={() => {
            context.onChangeA(context.a + 3);
          }}
        >
          a+3
        </button>
      </div>
      <div>
        ChildA:a:{context.a}; b:{context.b}
      </div>
      <ChildB></ChildB>
    </div>
  );
}
ChildA.contextTypes = contextTypes;

// 2.类组件使用 context
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
        console.log('newA:', newA)
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
