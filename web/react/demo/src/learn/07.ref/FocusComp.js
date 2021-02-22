import React from 'react';

/*
class A extends React.Component {
  method() {
    console.log('调用了组件A的方法');
  }

  render() {
    return <h1>this is A</h1>;
  }
}
*/

export default class Comp extends React.Component {
  handleClick = () => {
    this.txt.focus();
  };

  componentDidMount() {
    console.log('componentDidmount:', this.txt);
    this.setState({}); // 重新渲染一下
  }

  getRef = (el) => {
    console.log('getRef:', '函数被调用了');
    this.txt = el;
  };

  render() {
    return (
      <div>
        <input ref={this.getRef} type="text" />
        <button onClick={this.handleClick}>聚焦</button>
      </div>
    );
  }
}

// React.createRef
/*
export default class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.txt = React.createRef();
  }

  handleClick = () => {
    this.txt.current.focus();
  };

  render() {
    return (
      <div>
        <input ref={this.txt} type="text" />
        <button onClick={this.handleClick}>聚焦</button>
      </div>
    );
  }
}
*/

// ref 字符串赋值(不再推荐使用)
/*
export default class Comp extends React.Component {
  handleClick = () => {
    this.refs.txt.focus();
    this.refs.A.method();
  };

  render() {
    return (
      <div>
        <input ref="txt" type="text" />
        <button onClick={this.handleClick}>聚焦</button>
        <A ref="A"></A>
      </div>
    );
  }
}
*/
