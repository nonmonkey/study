import React from 'react';
// import MovablePanel from './MovablePanel';
// import ShowMousePoint from './ShowMousePoint';
import MouseListener from './MouseListener';

var renderPoint = (mouse) => (
  <>
    <div className="point">
      <h2>
        鼠标x: {mouse.x}
        鼠标y: {mouse.y}
      </h2>
    </div>
  </>
);

var renderDiv = (mouse) => (
  <>
    <div className="point">
      <div
        style={{
          position: 'absolute',
          top: mouse.y - 50,
          left: mouse.x - 50,
          width: 100,
          height: 100,
          backgroundColor: '#008c8c',
        }}
      ></div>
    </div>
  </>
);
export default function Test() {
  return (
    <>
      <MouseListener render={renderPoint}></MouseListener>
      <MouseListener render={renderDiv}></MouseListener>
    </>
  );
}
