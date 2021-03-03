import React from 'react';
import * as Pages from './pages';
import { BrowserRouter as Router } from 'react-router-dom';
import TransitionRoute from './TransitionRoute';
import './pages.css';

export default function App() {
  return (
    <div className="main">
      <Router>
        <Pages.NavBar></Pages.NavBar>

        {/* 不能使用Switch组件，Route组件匹配了第一个将不再匹配 */}
        <TransitionRoute path="/" exact component={Pages.Home}></TransitionRoute>
        <TransitionRoute path="/news" exact component={Pages.News}></TransitionRoute>
        <TransitionRoute path="/personal" exact component={Pages.Personal}></TransitionRoute>
      </Router>
    </div>
  );
}
