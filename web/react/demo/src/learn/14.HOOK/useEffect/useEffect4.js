import React, { useState, useEffect } from 'react';

/**
 *
 * 10秒倒计时
 */
// 以下是错误做法
// export default function App() {
//   const [n, setN] = useState(10);
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const newN = n - 1; // 此处的 n 一直是一开始的 10
//       setN(newN);
//       console.log('newN:', newN);
//       if (newN === 0) {
//         clearInterval(timer);
//       }
//       return () => {
//         clearInterval(timer);
//       };
//     }, 1000);
//   }, []);

//   return (
//     <div>
//       <h1>{n}</h1>
//     </div>
//   );
// }

// 正确做法：
export default function App() {
  const [n, setN] = useState(10);
  useEffect(() => {
    // 某一次渲染完成后，需要根据当前n的值，1秒后重新渲染。
    if (n === 0) return;
    setTimeout(() => {
      setN(n - 1);
    }, 1000);
  }, [n]);

  return (
    <div>
      <h1>{n}</h1>
    </div>
  );
}
