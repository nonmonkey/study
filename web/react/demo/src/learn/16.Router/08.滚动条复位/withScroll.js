import React from 'react';
import resetScroll from './resetScroll';

export default function withScrollTop(Comp) {
  return class ScrollWrapper extends React.Component {
    componentDidMount() {
      // window.scrollTo(0, 0);
      resetScroll();
    }

    render() {
      return <Comp {...this.props}></Comp>
    }
  }
}
