import React, { useState, useEffect } from 'react';

/**
 * 副作用域函数中，如果使用了函数上下文中的变量，则由于闭包的影响，会导致副作用函数中变量不会实时变化(正常逻辑)。
 */
export default function App() {
  const [n, setN] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      console.log(n);
    }, 3000);
  });
  return (
    <div>
      <h1>{n}</h1>
      <button
        onClick={() => {
          setN(n + 1);
        }}
      >
        +
      </button>
    </div>
  );
}
