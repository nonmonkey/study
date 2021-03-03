import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// 方法二：外部文件直接引入(略挫):
/*
const routeConfig = {
  user: {
    root: '/user',
    update: '/user/update',
    pay: '/user/pay',
  },
};
*/

/* 方法三：有独立的配置文件，调用合理(比较推荐) */
/**
import routeConfig from './routeConfig';
<Link to={routeConfig.user.update}>用户信息</Link>
<Link to={routeConfig.user.pay.root}>充值</Link>
 */

function User(props) {
  console.log('props:', props);
  return (
    <div>
      <h1>User组件固定的区域。</h1>
      <p>
        {/* 方法一：match属性 */}
        <Link to={`${props.match.url}/update`}>用户信息</Link>
        <Link to={`${props.match.url}/pay`}>充值</Link>
      </p>
      <div
        style={{
          margin: '0 auto',
          width: 500,
          height: 500,
          border: '2px solid',
          backgroundColor: 'lightblue',
        }}
      >
        <Route path="/user/update" component={UserUpdate}></Route>
        <Route path="/user/pay" component={UserPay}></Route>
      </div>
    </div>
  );
}

function UserUpdate() {
  return <h1>修改用户信息</h1>;
}

function UserPay() {
  return <h1>用户充值</h1>;
}

export default function App() {
  return (
    <Router>
      <Route path="/u" component={User}></Route>
    </Router>
  );
}
