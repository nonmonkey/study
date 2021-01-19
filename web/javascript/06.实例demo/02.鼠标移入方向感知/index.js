var lis = document.querySelectorAll('#container li');
var ps = document.querySelectorAll('#container p');
var pos = [
  { left: 0, top: '-100%' },
  { left: '100%', top: 0 },
  { left: 0, top: '100%' },
  { left: '-100%', top: 0 },
];

/**
 * 用来获取鼠标进入的方向
 * @param {*} e 事件对象
 * @param {*} box li标签
 */
function getDir(e, box) {
  // 返回元素的尺寸位置信息集合
  var rect = box.getBoundingClientRect();
  var l = rect.left;
  var t = rect.top;
  var w = rect.width;
  var h = rect.height;
  // 将长方形转化为正方形
  var x = (e.clientX - l - w / 2) * (w > h ? h / w : 1);
  var y = (e.clientY - t - h / 2) * (h > w ? w / h : 1);

  var deg = (Math.atan2(y, x) / Math.PI) * 180;

  /**
   * 正方形采用如下公式：(Math.round((deg + 180) / 90) + 3) % 4
   *            top         right       bottom    left
   * 角度        -135～-45   -45～45     45～135    135～180 && -180～-135
   * 加180度     45～135     135～225    225～315   315～360 && 0～45
   * 除以90取整   1           2          3          4 && 0
   * 加3         4           5          6          7 && 3
   * 除以4取余    0(上)       1(右)       2(下)      3(左)
   */

  return (Math.round((deg + 180) / 90) + 3) % 4;
}

for (let i = 0; i < lis.length; i++) {
  lis[i].onmouseenter = function (e) {
    var dir = getDir(e, this);
    ps[i].style.left = pos[dir].left;
    ps[i].style.top = pos[dir].top;
    ps[i].style.transition = '.3s';

    setTimeout(() => {
      ps[i].style.left = 0;
      ps[i].style.top = 0;
    }, 1000 / 60);
  };
  lis[i].onmouseleave = function (e) {
    var dir = getDir(e, this);

    setTimeout(() => {
      ps[i].style.left = pos[dir].left;
      ps[i].style.top = pos[dir].top;
    }, 100);
  };
}

// 5 大厂面试之性能优化
