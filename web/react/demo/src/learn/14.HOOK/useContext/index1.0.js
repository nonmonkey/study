import React from 'react';

const ctx = React.createContext();

function Test() {
  return (
    <ctx.Consumer>
      { value => <h1>Test, 上下文的值：${value}</h1> }
    </ctx.Consumer>
  )
}

export default function App() {
  return (
    <div>
      <ctx.Provider value="123">
        <Test></Test>
      </ctx.Provider>
    </div>
  )
}
