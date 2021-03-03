import React from 'react';
import Home from './Home';
import Login from './Login';
import Personal from './Personal';
import ProtectedRoute from './ProtectedRoute';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        <li>
          <Link to="/login">登录页</Link>
        </li>
        <li>
          <Link to="/personal">个人中心</Link>
        </li>
      </ul>

      <Switch>
        <Route path="/login" component={Login}></Route>
        <ProtectedRoute path="/personal" component={Personal}></ProtectedRoute>
        <Route path="/" component={Home}></Route>
      </Switch>
    </Router>
  );
}
