import React from 'react';

document.querySelector('#root').addEventListener('click', function (e) {
  console.log('真实的dom事件 root。', 'react中执行');
  // e.stopPropagation(); // 阻止事件冒泡
});

export default function Test() {
  return (
    <div
      onClick={() => {
        console.log('容器');
      }}
    >
      <button
        onClick={(e) => {
          console.log('react: 按钮函数点击。', e);
          // e.stopPropagation();
        }}
      >
        按钮
      </button>
    </div>
  );
}
