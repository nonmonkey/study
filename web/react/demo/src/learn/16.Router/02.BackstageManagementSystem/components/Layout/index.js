import React from 'react';
import types from '../../../../../utils/commonTypes';
import './index.css';

export default class Layout extends React.Component {
  static propTypes = {
    header: types.element,
    aside: types.element,
    children: types.node,
  };

  render() {
    return (
      <section className="container">
        <header className="header">{this.props.header}</header>
        <aside className="aside">{this.props.aside}</aside>
        <main className="main">{this.props.children}</main>
      </section>
    );
  }
}
