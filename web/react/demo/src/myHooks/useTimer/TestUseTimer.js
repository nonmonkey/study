import { useState } from 'react';
import useTimer from './useTimer';

function Test(props) {
  useTimer(() => {
    console.log('test组件的一些副作用操作');
  }, 1000);
  return <h3>Test组件</h3>;
}

export default function App() {
  const [visible, setVisible] = useState(true);
  return (
    <div>
      {visible ? <Test></Test> : null}
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        显示/隐藏
      </button>
      
    </div>
  );
}
