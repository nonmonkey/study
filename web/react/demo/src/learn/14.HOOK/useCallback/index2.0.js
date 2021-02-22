import React, { useState, useCallback } from 'react';

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
  const [txt, setTxt] = useState(0);
  const [n, setN] = useState(0);
  const handleClick = useCallback(() => {
    setTxt(txt + 1);
  }, [txt]);

  console.log('Parent render');
  return (
    <div>
      <Test text={txt} onClick={handleClick}></Test>

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
