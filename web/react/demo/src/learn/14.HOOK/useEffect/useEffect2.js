import React, { useState, useEffect } from 'react';

/**
 * 挂载阶段运行一次，销毁运行一次，其他时候不运行
 */
function Test(props) {
  console.log('render');
  useEffect(() => {
    console.log('副作用函数，仅挂载时运行一次');
    return () => {
      console.log('清理函数，仅挂卸载运行一次');
    };
  }, []); // 使用空数组作为依赖项，副作用函数仅在挂载的时候运行

  const [, forceUpdate] = useState({});

  return (
    <h1>
      Test 组件{' '}
      <button
        onClick={() => {
          forceUpdate({});
        }}
      >
        刷新组件
      </button>
    </h1>
  );
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
