import React, { useState } from 'react';

export default function Test(props) {
  var [n, setN] = useState(0);
  const [visible, setVisible] = useState(true);
  // const [, forceUpdate] = useState({})
  var o = { name: 123, age: 12 };
  const [obj, setObj] = useState(o);

  console.log(obj);
  return (
    <>
      <div style={{ display: visible ? 'block' : 'none' }}>
        <button
          onClick={() => {
            setN(n - 1);
          }}
        >
          -
        </button>
        <span>{n}</span>
        <button
          onClick={() => {
            setN(n + 1);
            // setN(n + 1); // 不会立即改变，事件运行完成之后一起改变
          }}
        >
          +
        </button>
      </div>
      <p>
        <button
          onClick={() => {
            setVisible(visible);
          }}
        >
          显示/隐藏
        </button>
        {/* <button onClick={() => { forceUpdate({}) }}>重新渲染</button> */}
        <span>{obj.name}</span>
        <span>{obj.age}</span>
        <button
          onClick={() => {
            setObj(o);
          }}
        >
          改变Obj
        </button>
      </p>
    </>
  );
}
