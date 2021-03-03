import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routeConfig from './routeConfig';

/**
 * 根据一个路由配置数组，遍历该数组，得到一组Route组件
 * @param {*} routes
 */
function getRoutes(routes, basePath) {
  if (!Array.isArray(routes)) return null;
  const result = routes.map((it, i) => {
    const { children, path, name, component: Component, ...rest } = it;
    const newPath = `${basePath}${path}`.replace(/\/\//g, '/');
    return (
      <Route
        key={i}
        path={newPath}
        {...rest}
        render={(values) => {
          return <Component {...values}>{getRoutes(children, newPath)}</Component>;
        }}
      ></Route>
    );
  });
  return <Switch>{result}</Switch>;
}

/**
 * 使用Route组件，根据不同的路径，渲染顶级页面
 */
export default function RootRouter() {
  return (
    <>
      {/* 返回一组Route */}
      {getRoutes(routeConfig, '/')}
    </>
  );
}
