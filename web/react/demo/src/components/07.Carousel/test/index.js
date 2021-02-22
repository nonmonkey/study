import React from 'react';
import Carousel from '../index';
import src1 from './imgs/buou.jpg';
import src2 from './imgs/jumao.jpg';
import src3 from './imgs/lihua.jpg';
import src4 from './imgs/meiduan.jpg';
import src5 from './imgs/sanhua.jpg';
import src6 from './imgs/yingduan.jpg';

export default class Test extends React.Component {
  imgs = [
    src1,
    src2,
    src3,
    src4,
    src5,
    src6,
  ]

  render() {
    return (
      <div className="container">
        <Carousel imgSrcs={this.imgs}></Carousel>
      </div>
    )
  }
}
