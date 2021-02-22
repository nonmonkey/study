import React, { useState } from 'react';

class Test extends React.PureComponent {
  render() {
    console.log('Test render');
    return (
      <div>
        <h1>{this.props.text}</h1>
        <button onClick={this.props.onClick}>改变文本</button>
      </div>
    );
  }
}

function Parent() {
  console.log('Parent render');
  const [txt, setTxt] = useState(123);
  const [n, setN] = useState(0);

  return (
    // onClick 绑定的函数地址每次render都发生了变化，所以 Test 每次都会重新渲染
    <div>
      <Test
        text={txt}
        onClick={() => {
          setTxt(123);
        }}
      ></Test>

      <input
        type="number"
        value={n}
        onChange={(e) => {
          setN(parseInt(e.target.value));
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Parent></Parent>
    </div>
  );
}
