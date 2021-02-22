import React, { useState, useRef, useCallback } from 'react';

window.arr = []; // 用于判断每次render 生成的 ref 引用地址是否一致

export default function Test() {
  console.log('Test render');
  const [n, setN] = useState(0);
  // const ref = React.createRef(); // 每次 render 都会创建一次 ref
  const ref = useRef();
  const handleClick = useCallback(() => {
    console.log('handleClick:', ref.current.value);
  }, [ref]);
  const onChange = useCallback((e) => {
    setN(parseInt(e.target.value));
  }, []);
  window.arr.push(ref);
  return (
    <div>
      <input ref={ref} type="text" />
      <button onClick={handleClick}>得到input数值</button>

      <input type="number" value={n} onChange={onChange} />
    </div>
  );
}
