import React from 'react';
import BetterLink from './BetterLink';

export default function News (props) {
  return (
    <div>
      <nav>
        <BetterLink to={{ name: 'newsHome' }}>新闻首页</BetterLink>
        <BetterLink to={{ name: 'newsDetail' }}>新闻详情页</BetterLink>
        <BetterLink to={{ name: 'newsSearch' }}>新闻搜索页</BetterLink>
      </nav>
      <div>
        {/* 匹配新闻的子页面 */}
        { props.children }
      </div>
    </div>
  )
}
