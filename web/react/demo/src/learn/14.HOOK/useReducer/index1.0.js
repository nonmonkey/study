import React, { useState } from 'react';

/**
 * 该函数，根据当前的数据，已经action，生成一个新的数据
 * @param {*} state
 * @param {*} action
 */
function reducer(state, action) {
  switch (action.type) {
    case 'increase':
      return state + 1;
    case 'decrease':
      if (state === 0) return 0;
      return state - 1;
    default:
      return state;
  }
}

export default function App() {
  const [n, setN] = useState(0);

  function dispatch(action) {
    const newN = reducer(n, action);
    setN(newN);
  }

  return (
    <div>
      <button
        onClick={() => {
          dispatch({ type: 'decrease' });
        }}
      >
        -
      </button>
      <span>{n}</span>
      <button
        onClick={() => {
          dispatch({ type: 'increase' });
        }}
      >
        +
      </button>
    </div>
  );
}
