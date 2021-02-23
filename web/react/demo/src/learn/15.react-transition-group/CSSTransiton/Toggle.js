import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Toggle.css';
import 'animate.css';

function MyTransition({ visible, children }) {
  return (
    <CSSTransition
      // classNames="toggle"
      appear
      mountOnEnter
      timeout={800}
      in={visible}
      classNames={{
        appearActive: 'animate__backInLeft',
        enterActive: 'animate__backInLeft',
        exitActive: 'animate__backOutRight',
        exitDone: 'my-exit-done',
      }}
    >
      {children}
    </CSSTransition>
  );
}

function Comp1() {
  return <h1 className="title1 animate__animated animate__fast">组件1</h1>;
}

function Comp2() {
  return <h1 className="title2 animate__animated animate__fast">组件2</h1>;
}

export default function App() {
  const [showComp1, setShowComp1] = useState(true);

  return (
    <div className="container">
      <div className="comp-container">
        <MyTransition visible={showComp1}>
          <Comp1></Comp1>
        </MyTransition>
        <MyTransition visible={!showComp1}>
          <Comp2></Comp2>
        </MyTransition>
      </div>

      <button
        onClick={() => {
          setShowComp1(!showComp1);
        }}
      >
        切换状态
      </button>
    </div>
  );
}
