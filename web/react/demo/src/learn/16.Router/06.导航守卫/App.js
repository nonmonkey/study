import React from 'react';
import { Route, Link } from 'react-router-dom';
import RouteGuard from './RouteGuard';

function Page1() {
  return <h1>page1</h1>;
}

function Page2() {
  return <h1>page2</h1>;
}

export default function App() {
  return (
    <RouteGuard
      onBeforeChange={(prev, cur, action, commit, unBlock) => {
        console.log('onBeforeChange:', `从${prev.pathname}跳转到${cur.pathname}，跳转方法：${action}`);
        commit(true);
      }}
      onChange={(prev, cur, action, unListen) => {
        console.log('onChange:', `从${prev.pathname}跳转到${cur.pathname}，跳转方法：${action}`);
      }}
    >
      <ul>
        <li>
          <Link to="page1">页面1</Link>
        </li>
        <li>
          <Link to="page2">页面2</Link>
        </li>
      </ul>

      <Route path="/page1" component={Page1}></Route>
      <Route path="/page2" component={Page2}></Route>
    </RouteGuard>
  );
}
