import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';

import './store';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/" component={Admin}></Route>
        <Route></Route>
      </Switch>
    </Router>
  )
};
