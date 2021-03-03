import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import loginInfo from './loginInfo';

export default function ProtectedRoute({ component: Component, render, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={(values) => {
        if (loginInfo.isLogin) {
          return <Component></Component>;
        } else {
          // return (
          //   <Redirect
          //     to={{
          //       pathname: '/login',
          //       search: '?returnurl=' + values.location.pathname,
          //     }}
          //   ></Redirect>
          // );
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: values.location.pathname,
              }}
            ></Redirect>
          );
        }
      }}
    ></Route>
  );
}
