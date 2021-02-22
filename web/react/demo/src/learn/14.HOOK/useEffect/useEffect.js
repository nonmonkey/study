import React, { useState, useEffect } from 'react';

function stop() {
  clearInterval(window.timer);
  window.timer = null;
  console.log('stop');
}

/**
 * 一个可移动的块，该组件每次渲染完成后，始终从0，0坐标在1秒内，移动到目标点坐标。
 */
var ref = React.createRef();
window.timer = null;
function MovableBlock(props) {
  console.log('render');
  useEffect(() => {
    // 渲染完成后
    const div = ref.current;
    let num = 0;
    const disX = props.left / 1000;
    const disY = props.top / 1000;

    console.log('effect');
    window.timer = setInterval(() => {
      num++;
      const newLeft = num * disX;
      const newTop = num * disY;

      div.style.left = newLeft + 'px';
      div.style.top = newTop + 'px';

      if (num === 1000) stop();
    }, 10);

    return stop;
  });

  return (
    <div
      ref={ref}
      style={{
        width: 100,
        height: 100,
        position: 'fixed',
        background: '#f40',
      }}
    ></div>
  );
}

export default function Test() {
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  return (
    <div>
      {visible ? (
        <>
          <div style={{ marginLeft: 200 }}>
            x:{' '}
            <input
              type="number"
              value={point.x}
              onChange={(e) => {
                setPoint({
                  x: parseInt(e.target.value) ? parseInt(e.target.value) : 0,
                  y: point.y,
                });
              }}
            />
            y:{' '}
            <input
              type="number"
              value={point.y}
              onChange={(e) => {
                setPoint({
                  x: point.x,
                  y: parseInt(e.target.value) ? parseInt(e.target.value) : 0,
                });
              }}
            />
          </div>

          <MovableBlock left={point.x} top={point.y}></MovableBlock>
        </>
      ) : null}

      <button
        style={{ marginLeft: 200 }}
        onClick={() => {
          setVisible(!visible);
        }}
      >
        显示/隐藏
      </button>
    </div>
  );
}
