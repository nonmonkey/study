import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';

export default function Test() {
  const [n, setN] = useState(0);
  const h1Ref = useRef();
  const handleClick = useCallback(() => {
    setN(n + 1);
  }, [n]);

  useLayoutEffect(() => {
    console.log('useLayoutEffect');
    h1Ref.current.innerText = Math.random();
  });

  return (
    <div>
      <h1 ref={h1Ref}>{n}</h1>

      <button onClick={handleClick}>+</button>
    </div>
  );
}
