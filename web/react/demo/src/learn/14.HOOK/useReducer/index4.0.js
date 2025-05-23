import { useReducer } from 'react';

/**
 * 该函数，根据当前的数据，已经action，生成一个新的数据
 * @param {*} state
 * @param {*} action
 */
function nReducer(state, action) {
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
  // const [n, dispatch] = useReducer(nReducer, 0);
  const [n, dispatch] = useReducer(nReducer, 0, (arg) => {
    return arg + 10;
  });

  console.log('1111111', 'App');

  return (
    <div>
      <button
        onClick={() => {
          dispatch({ type: 'decrease', payload: 3 });
        }}
      >
        -
      </button>
      <span>{n}</span>
      <button
        onClick={() => {
          dispatch({ type: 'increase', payload: 5  });
        }}
      >
        +
      </button>
    </div>
  );
}

