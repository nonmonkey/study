/**
  在购买流程中，可以选择手机的颜色以及输入购买 数量，同时页面中有两个展示区域，
  分别向用户展示刚刚选择好的颜色和数量。还有一个按钮动 态显示下一步的操作，
  我们需要查询该颜色手机对应的库存，如果库存数量少于这次的购买数量， 按钮将被禁用并且显示库存不足，
  反之按钮可以点击并且显示放入购物车。
 */

let colorSelect = document.getElementById('colorSelect');
let numberInput = document.getElementById('numberInput');
let memorySelect = document.getElementById('memorySelect');
let colorInfo = document.getElementById('colorInfo');
let numberInfo = document.getElementById('numberInfo');
let memoryInfo = document.getElementById('memoryInfo');
let nextBtn = document.getElementById('nextBtn');

/* start */
{
  // 手机库存
  let goods = {
    red: 3,
    blue: 6,
  };

  colorSelect.onchange = function (e) {
    let color = this.value; // 颜色
    let number = parseInt(numberInput.value); // 数量
    let stock = goods[color]; // 该颜色手机对应的当前库存

    colorInfo.innerHTML = color;
    if (!color) {
      nextBtn.disabled = true;
      nextBtn.innerHTML = '请选择手机颜色';
      return;
    }

    if (!number || number < 0) {
      nextBtn.disabled = true;
      nextBtn.innerHTML = '请输入正确的购买数量';
      return;
    }

    // 当前选择数量超过库存量
    if (number > stock) {
      nextBtn.disabled = true;
      nextBtn.innerHTML = '库存不足';
      return;
    }

    nextBtn.disabled = false;
    nextBtn.innerHTML = '放入购物车';
  };

  numberInput.oninput = function () {
    let color = colorSelect.value; // 颜色
    let number = parseInt(this.value); // 数量
    let stock = goods[color]; // 该颜色手机对应的当前库存

    numberInfo.innerHTML = number;
    if (!color) {
      nextBtn.disabled = true;
      nextBtn.innerHTML = '请选择手机颜色';
      return;
    }

    if (!number || number < 0) {
      nextBtn.disabled = true;
      nextBtn.innerHTML = '请输入正确的购买数量';
      return;
    }

    // 当前选择数量超过库存量
    if (number > stock) {
      nextBtn.disabled = true;
      nextBtn.innerHTML = '库存不足';
      return;
    }

    nextBtn.disabled = false;
    nextBtn.innerHTML = '放入购物车';
  };
}
/* end */

/* 使用中介者模式 start */
{
  let goods = {
    // 手机库存
    'red|32G': 3, // 红色 32G，库存数量为 3
    'red|16G': 0,
    'blue|32G': 1,
    'blue|16G': 6,
  };

  let mediator = (function () {
    let colorSelect = document.getElementById('colorSelect');
    let colorInfo = document.getElementById('colorInfo');
    let memorySelect = document.getElementById('memorySelect');
    let memoryInfo = document.getElementById('memoryInfo');
    let numberInput = document.getElementById('numberInput');
    let numberInfo = document.getElementById('numberInfo');
    let nextBtn = document.getElementById('nextBtn');

    return {
      changed: function (obj) {
        let color = colorSelect.value; // 颜色
        let memory = memorySelect.value; // 内存
        let number = parseInt(numberInput.value); // 数量
        let stock = goods[color + '|' + memory]; // 颜色和内存对应的手机库存数量

        if (obj === colorSelect) {
          colorInfo.innerHTML = color;
        } else if (obj === memorySelect) {
          memoryInfo.innerHTML = memory;
        } else if (obj === numberInput) {
          numberInfo.innerHTML = number;
        }

        if (!color) {
          nextBtn.disabled = true;
          nextBtn.innerHTML = '请选择手机颜色';
          return;
        }

        if (!memory) {
          nextBtn.disabled = true;
          nextBtn.innerHTML = '请选择内存大小';
          return;
        }

        if (number > 0) {
          nextBtn.disabled = true;
          nextBtn.innerHTML = '请输入正确的购买数量';
          return;
        }

        nextBtn.disabled = false;
        nextBtn, (innerHTML = '放入购物车');
      },
    };
  })();

  // 时间函数
  colorSelect.onchange = function () {
    mediator.changed(this);
  };
  memorySelect.onchange = function () {
    mediator.changed(this);
  };
  numberInput.oninput = function () {
    mediator.changed(this);
  };
}
/* 使用中介者模式 end */
