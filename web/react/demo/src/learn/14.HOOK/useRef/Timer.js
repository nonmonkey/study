import React, { useState, useRef, useEffect } from 'react';

export default function Timer({ time = 10 }) {
  const [n, setN] = useState(time);
  const timerRef = useRef();
  useEffect(() => {
    if (n === 0) return;
    timerRef.current = setTimeout(() => {
      setN(n - 1);
    }, 1000);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [n]);

  return (
    <div>
      <h1>{n}</h1>
    </div>
  );
}



/*
// 组件不能多次使用，只有一个timer
let timer = null;

export default function Timer({ time = 10 }) {
  const [n, setN] = useState(time);

  useEffect(() => {
    if (n === 0) return;
    timer = setTimeout(() => {
      setN(n - 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [n]);

  return (
    <div>
      <h1>{n}</h1>
    </div>
  );
}
*/
