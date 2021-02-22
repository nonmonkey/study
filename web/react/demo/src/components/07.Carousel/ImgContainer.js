import React from 'react';
import types from '../../utils/commonTypes';
import animationRAF from '../../utils/animationRAF';

export default class ImgContainer extends React.Component {
  static propTypes = {
    imgWidth: types.number,
    igmHeight: types.number,
    duration: types.number,
    imgSrcs: types.arrayOf(types.string).isRequired, // 图片路径数组
  };

  state = {
    _imgSrcs: [],
    marginLeft: 0,
  };

  componentDidMount() {
    this.setState({
      _imgSrcs: [...this.props.imgSrcs, this.props.imgSrcs[0]],
    });
  }

  constructor(props) {
    super(props);
    this.imgContainerRef = React.createRef();
  }

  // 计时器间隔时间
  tick = 16;
  raf = animationRAF();

  /**
   * 切换到第几张图片
   * 调用该函数，此组件会经过一段动画完成切换
   * @param {*} index
   */
  switchTo(newIndex, oldIndex) {
    console.log('newIndex, oldIndex:', newIndex, oldIndex);
    // 1.设置正确的index值
    if (oldIndex === 0) {
      if (newIndex < 0) {
        // 第一张向右移动
        newIndex = this.props.imgSrcs.length - 1;
        this.imgContainerRef.current.style.marginLeft = -1 * this.props.imgSrcs.length * this.props.imgWidth + 'px';
      } else if (newIndex > 0) {
        // 跳转第二张（强制其从最左侧第一张图片向右跳转）
        this.imgContainerRef.current.style.marginLeft = 0 + 'px';
      }
    }

    // 2.根据 newIndex 设置 marginLeft
    let targetLeft = -1 * newIndex * this.props.imgWidth;
    let curLeft = parseFloat(window.getComputedStyle(this.imgContainerRef.current).marginLeft);
    console.log(curLeft, targetLeft);

    // 3.计算运动的次数
    const times = Math.ceil(this.props.duration / this.tick);

    // 4.计算每次运动的距离
    const totalDis = targetLeft - curLeft; // 总距离
    const dis = totalDis / times; // 每次运动的距离
    console.log('dis:', dis);

    // 5.设置动画
    console.log(times, dis);
    if (this.raf) {
      console.log('this.raf:', this.raf);
      this.raf.initStep(
        () => {
          curLeft += dis;
          this.imgContainerRef.current.style.marginLeft = curLeft + 'px';
        },
        times,
        () => {
          this.imgContainerRef.current.style.marginLeft = targetLeft + 'px';
        }
      );
      this.raf.run();
    }
  }

  render() {
    var imgs = this.state._imgSrcs.map((src, i) => (
      <img
        className="img"
        style={{
          width: this.props.imgWidth,
          height: this.props.imgHeight,
        }}
        src={src}
        key={i}
        alt=""
      />
    ));
    return (
      <div
        ref={this.imgContainerRef}
        className="imgs"
        style={{
          width: this.props.imgWidth * this.state._imgSrcs.length,
          height: this.props.imgHeight,
        }}
      >
        {imgs}
      </div>
    );
  }
}
