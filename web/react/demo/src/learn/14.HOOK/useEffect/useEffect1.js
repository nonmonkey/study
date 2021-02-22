import React, { useState, useEffect } from 'react';

function stop() {
  clearInterval(window.timer);
  window.timer = null;
  console.log('stop');
}

/**
 * 传入 依赖数据
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
  }, [props.left, props.top]);

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
  var txtX = React.createRef();
  var txtY = React.createRef();

  return (
    <div>
      {visible ? (
        <>
          <div style={{ marginTop: 120 }}>
            x: <input ref={txtX} type="number" />
            y: <input ref={txtY} type="number" />
            <button
              onClick={() => {
                setPoint({
                  x: txtX.current.value,
                  y: txtY.current.value,
                });
              }}
            >
              确定
            </button>
          </div>

          <MovableBlock left={point.x} top={point.y}></MovableBlock>
        </>
      ) : null}

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
