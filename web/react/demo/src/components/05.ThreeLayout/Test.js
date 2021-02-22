import React from 'react';
import ThreeLayout from './index';

export default function Test() {
  return (
    <ThreeLayout
      gap={50}
      left={<div style={{ border: '1px solid red' }}>this is left</div>}
      right={<div style={{ border: '1px solid blue' }}>this is right</div>}
    >
      <div
        style={{
          border: '2px solid black',
        }}
      >
        <h1>主区域</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, nobis!</p>
      </div>
    </ThreeLayout>
  );
}
