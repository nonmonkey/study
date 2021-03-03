var timer1 = null;
var timer2 = null;
/**
 * 滚动条横向和纵向动画复位
 */
export default function resetScroll() {
  var html = document.documentElement;
  clearInterval(timer1);
  clearInterval(timer2);

  timer1 = animate(html.scrollTop, 0, (val) => {
    html.scrollTop = val;
  });

  timer2 = animate(html.scrollLeft, 0, (val) => {
    html.scrollLeft = val;
  });
}

/**
 * 在一秒钟之内从指定值，变化到结束值
 * @param {*} start
 * @param {*} end
 */
function animate(start, end, callback) {
  var tick = 16; // 每隔16ms变化一次
  var total = 300;
  var times = Math.ceil(total / tick);
  var curTimes = 0;
  var dis = (end - start) / times; // 总距离/次数。每次运动的距离
  console.log(start, end, times, dis);

  let timer = setInterval(() => {
    curTimes++;
    start += dis;
    if (curTimes >= times) {
      start = end;
      clearInterval(timer);
    }
    callback(start);
  }, tick);
  return timer;
}
