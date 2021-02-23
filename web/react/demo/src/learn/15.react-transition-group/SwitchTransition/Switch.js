import React, { useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import 'animate.css';

function Comp1() {
  return <h1>Comp1</h1>;
}

function Comp2() {
  return <h1>Comp2</h1>;
}

export default function App() {
  const [show1, setShow1] = useState(true);

  return (
    <div style={{ margin: '0 auto', width: '300px' }}>
      <SwitchTransition mode="out-in">
        <CSSTransition
          timeout={500}
          key={show1}
          appear
          classNames={{
            appearActive: 'animate__backInLeft',
            enterActive: 'animate__backInLeft',
            exitActive: 'animate__backOutRight',
          }}
        >
          <div className="animate__animated animate__faster">{show1 ? <Comp1></Comp1> : <Comp2></Comp2>}</div>
        </CSSTransition>
      </SwitchTransition>
      <button
        onClick={() => {
          setShow1(!show1);
        }}
      >
        切换
      </button>
    </div>
  );
}
