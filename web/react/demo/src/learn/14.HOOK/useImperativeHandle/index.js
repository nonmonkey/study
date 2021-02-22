import React, { useState, useRef, useCallback, useImperativeHandle } from 'react';

/**
// 类组件调用一个组件上的方法
class Test extends React.Component {
  method() {
    console.log('method');
  }

  render() {
    return <h1>Test Component</h1>;
  }
}

export default function App() {
  const ref = useRef();
  const handleClick = useCallback(() => {
    ref.current.method();
  }, []);
  return (
    <div>
      <Test ref={ref}></Test>
      <button onClick={handleClick}>Test的method方法</button>
    </div>
  );
}
 */

function Test(props, ref) {
  useImperativeHandle(
    ref,
    () => {
      // 如果不给依赖项，每次运行函数组件都会执行
      // 如果使用了依赖项，则第一次调用后，会进行缓存，只有依赖项发生变化时才会重新调用。
      // 相当于给 ref.current 赋值了 1
      console.log(123);
      return {
        method: () => {
          console.log('this is method');
        },
      };
    },
    []
  );
  return <div>this is test</div>;
}

var TestWrapper = React.forwardRef(Test);

export default function App() {
  const [, forceUpdate] = useState({});
  const testRef = useRef();
  const handleClick = useCallback(() => {
    console.log('testRef:', testRef);
    forceUpdate({});
  }, []);
  return (
    <div>
      <TestWrapper ref={testRef}></TestWrapper>

      <button onClick={handleClick}>点击并刷新</button>
    </div>
  );
}
