import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function A() {
  return <h1>组件A</h1>;
}

function B() {
  return <h1>组件B</h1>;
}

function C() {
  return <h1>找不到页面</h1>;
}

export default function App() {
  return (
    <Router>
      {/* <Switch> */}
      <Route path="/a" component={A}></Route>
      <Route path="/a/b" component={B}></Route>
      <Route component={C}></Route>
      {/* </Switch> */}
    </Router>
  );
}
