import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BetterLink from './BetterLink';
import RootRouter from './RootRouter';

export default function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><BetterLink to={{ name: 'home' }}>首页</BetterLink></li>
          <li><BetterLink to={{ name: 'news' }}>新闻</BetterLink></li>
        </ul>
      </nav>
      {/* 匹配顶级页面 */}
      <RootRouter></RootRouter>
    </Router>
  )
}
