import React, { useContext } from 'react';

const ctx = React.createContext();

function Test() {
  const value = useContext(ctx);
  return <h1>Test, 上下文的值：${value}</h1>;
}
 
export default function App() {
  return (
    <ctx.Provider value="123">
      <Test></Test>
    </ctx.Provider>
  );
}
