import React from 'react';
import ImgContainer from './ImgContainer';
import SwitchArrow from './SwichArrow';
import SwitchDot from './SwitchDot';
import types from '../../utils/commonTypes';
import './index.css';

export default class Carousel extends React.Component {
  static defaultProps = {
    width: 520,
    height: 280,
    imgSrcs: [],
    duration: 400,
    autoSwitch: true,
    autoDuration: 5000,
  };

  static propTypes = {
    width: types.number,
    height: types.number,
    imgSrcs: types.arrayOf(types.string).isRequired, // 图片路径数组
    duration: types.number, // 完成一次切换需要的时间
    autoSwitch: types.bool,
    autoDuration: types.number, // 自动切换的间隔时间
  };

  state = {
    curIndex: 0, // 当前显示的第几张图片
  };

  constructor(props) {
    super(props);
    this.imgContainer = React.createRef();

    this.props.autoSwitch && this.autoSwitch();
  }

  componentWillUnmount() {
    this.clearAutoTimer();
  }

  render() {
    return (
      <div
        className="carousel-container"
        style={{
          width: this.props.width,
          height: this.props.height,
        }}
        onMouseEnter={() => {
          this.clearAutoTimer();
        }}
        onMouseLeave={() => {
          this.autoSwitch();
        }}
      >
        <ImgContainer
          ref={this.imgContainer}
          imgSrcs={this.props.imgSrcs}
          imgWidth={this.props.width}
          imgHeight={this.props.height}
          duration={this.props.duration}
        ></ImgContainer>

        <SwitchArrow onChange={this.handleArrowChange}></SwitchArrow>
        <SwitchDot
          total={this.props.imgSrcs.length}
          curIndex={this.state.curIndex}
          onChange={this.handleDotChange}
        ></SwitchDot>
      </div>
    );
  }

  autoTimer = null; // 自动切换的计时器

  clearAutoTimer = () => {
    clearInterval(this.autoTimer);
  };

  autoSwitch = () => {
    this.clearAutoTimer();
    this.autoTimer = setInterval(() => {
      this.handleSwitch(this.state.curIndex + 1);
    }, this.props.autoDuration);
  };

  handleSwitch = (newIndex) => {
    var oldIndex = this.state.curIndex;
    if (oldIndex === newIndex) return;
    this.setState(
      {
        curIndex: newIndex < 0 ? newIndex + this.props.imgSrcs.length : newIndex % this.props.imgSrcs.length,
      },
      () => {
        this.imgContainer.current.switchTo(newIndex, oldIndex);
      }
    );
  };

  // num === -1: left; num === 1: right;
  handleArrowChange = (num) => {
    this.handleSwitch(this.state.curIndex + num);
  };

  handleDotChange = (index) => {
    this.handleSwitch(index);
  };
}
