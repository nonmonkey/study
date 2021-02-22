import React from 'react';

function A(props, ref) {
  return <h1 ref={ref}>组件: {props.words}</h1>;
}

// 1.传递函数组件，得到一个新组件NewA
const NewA = React.forwardRef(A);

// 2.类组件可以通过使用参数的形式进行传递
class B extends React.Component {
  render() {
    return (
      <h2 ref={this.props.ref1}>
        <span>this is B :{this.props.words}</span>
      </h2>
    );
  }
}
// 3.或者使用函数包装一下，再通过 React.forwardRef 方法处理
class C extends React.Component {
  render() {
    return (
      <h3 ref={this.props.myRef}>
        <span>this is C :{this.props.words}</span>
      </h3>
    );
  }
}

const NewC = React.forwardRef((props, ref) => {
  return <C {...props} myRef={ref}></C>;
});

export default class ForwordRef extends React.Component {
  ARef = React.createRef();
  BRef = React.createRef();
  CRef = React.createRef();

  componentDidMount() {
    console.log('ARef:', this.ARef); // 此处指向的是 h1 元素
    console.log('BRef:', this.BRef); // 此处指向的是 h2 元素
    console.log('CRef:', this.CRef); // 此处指向的是 h3 元素
  }

  render() {
    return (
      <div>
        <NewA ref={this.ARef} words="123"></NewA>

        <B ref1={this.BRef} words="456"></B>

        <NewC ref={this.CRef} words="789"></NewC>
      </div>
    );
  }
}
