import React from 'react';
import withMouseListener from './withMouseListener';
import './index.css';

var Point = (props) => (
  <div className="point">
    <h2>
      鼠标x: {props.x}
      鼠标y: {props.y}
    </h2>
  </div>
);

var Div = (props) => (
  <div className="point">
    <div
      style={{
        position: 'absolute',
        top: props.y - 50,
        left: props.x - 50,
        width: 100,
        height: 100,
        backgroundColor: '#008c8c',
      }}
    ></div>
  </div>
);

const MousePoint = withMouseListener(Point);
const MouseDiv = withMouseListener(Div);

export default function Test() {
  return (
    <>
      <MousePoint></MousePoint>
      <MouseDiv></MouseDiv>
    </>
  );
}
