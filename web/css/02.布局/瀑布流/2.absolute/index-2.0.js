(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global = global || self), (global.Dcube = factory()));
})(this, function () {
  /**
   * 获取最小项
   * @param {*} arr
   */
  function getMinItem(arr = []) {
    var index = 0;
    var val = arr[index];
    for (var i = 0; i < arr.length; i++) {
      if (val > arr[i]) {
        val = arr[i];
        index = i;
      }
    }
    return { val, index };
  }

  /**
   * 获取最大项
   * @param {*} arr
   */
  function getMaxItem(arr = []) {
    var index = 0;
    var val = arr[index];
    for (var i = 0; i < arr.length; i++) {
      if (val < arr[i]) {
        val = arr[i];
        index = i;
      }
    }
    return { val, index };
  }

  /**
   * 清空数组
   * @param {*} arr
   */
  function clearArray(arr) {
    arr.length = 0;
  }

  /**
   * el: 元素
   * options: 配置
   *    imgs // 图片列表
   *    imgWidth // 每张图片的固定宽度
   */
  class Waterfall {
    constructor(el, options = {}) {
      const self = this;
      self.init(el, options); // 初始化

      // window resize 事件
      self.resizeTimer = null; // timer
      self.browserResize = function browserResize() {
        if (self.resizeTimer) {
          clearTimeout(self.resizeTimer);
        }
        self.resizeTimer = setTimeout(() => {
          self.setAllImgsPosition();
        }, 300);
      };
      window.addEventListener('resize', this.browserResize);

      self.createImgs(); // 创建imgs
    }
  }

  // 初始化
  Waterfall.prototype.init = function (el, options) {
    const container = document.querySelector(el);
    if (!container) throw new Error(`Can't find the ${el}.`);
    if (typeof options !== 'object') throw new Error(`Options must be an object.`);

    this.el = el; // el
    this.container = container; // 元素(容器)
    this.options = JSON.parse(JSON.stringify(options));
    this.imgWidth = 220; // 图片宽度
    this.imgs = options.imgs;
    this.paramsValidator(options); // 校验属性
    this.info = this.cal(); // 列的数量、间隙宽度
    this.nextTops = new Array(this.info.columns).fill(this.info.space); // 每列的高度
  };

  // 校验参数
  Waterfall.prototype.paramsValidator = function (options = {}) {
    if ('imgWidth' in options && parseFloat(options.imgWidth) > 0) this.imgWidth = parseFloat(options.imgWidth);

    if ('imgs' in options.imgs && !Array.isArray(imgs)) this.imgs = [];
  };

  // 计算列的数量、间隙宽度
  Waterfall.prototype.cal = function () {
    const containerWidth = this.container.clientWidth; // 容器宽度
    // 计算列的数量
    const columns = Math.floor(containerWidth / this.imgWidth);
    // 计算间隙
    const spaceNumer = columns + 1; // 间隙数量
    const leftSpace = containerWidth - columns * this.imgWidth; // 计算剩余的区域
    const space = leftSpace / spaceNumer; // 每个间隙的空间

    return { space, columns };
  };

  // 创建所有img元素
  Waterfall.prototype.createImgs = function () {
    if (self.container.innerHTML.trim()) console.warn(`The contents of the container [${self.el}] will be deleted.`);

    this.container.innerHTML = '';
    this.container.style.height = 0 + 'px';
    this.nextTops = new Array(this.info.columns).fill(this.info.space);

    for (let i = 0; i < this.imgs.length; i++) {
      const img = document.createElement('img');
      img.style.width = this.imgWidth + 'px'; // 定宽
      img.src = this.imgs[i]; // 设置src路径
      img.onload = this.loadImg(img);
    }
  };

  // 添加一个img元素
  Waterfall.prototype.createImg = function (src) {
    if (src && typeof src === 'string') {
      this.imgs.push(src);
      const img = document.createElement('img');
      img.style.width = this.imgWidth + 'px'; // 定宽
      img.src = src; // 设置src路径
      img.onload = this.loadImg(img);
    }
  };

  // img元素onload事件
  Waterfall.prototype.loadImg = function (img) {
    return () => {
      this.setImgPosition(img);
      this.container.append(img);
    };
  };

  // 设置单个图片的位置
  Waterfall.prototype.setImgPosition = function (img) {
    // 计算img应有的高度
    var height = +((this.imgWidth / img.width) * img.height).toFixed(2);

    // 找到nextTops中的最小值作为当前图片的纵坐标
    var min = getMinItem(this.nextTops);
    img.style.top = min.val + 'px';
    var left = (min.index + 1) * this.info.space + min.index * this.imgWidth;
    img.style.left = left + 'px';
    // 重置nextTops数组
    this.nextTops[min.index] += height + this.info.space;
    this.setContainerHeight();
  };

  // 设置所有图片的位置
  Waterfall.prototype.setAllImgsPosition = function () {
    this.info = this.cal();
    this.nextTops = new Array(this.info.columns).fill(this.info.space);
    for (var i = 0; i < this.container.children.length; i++) {
      var img = this.container.children[i];
      this.setImgPosition(img);
    }
  };

  // 设置容器的高度
  Waterfall.prototype.setContainerHeight = function () {
    var max = getMaxItem(this.nextTops).val; // 最大值
    this.container.style.height = max + 'px';
  };

  // 清空容器
  Waterfall.prototype.clearContainer = function () {
    this.container.innerHTML = '';
    this.container.style.height = 0 + 'px';
    clearArray(this.imgs);
    clearArray(this.nextTops);
  };

  // // 重新加载
  // Waterfall.prototype.reload = function () {
  //   // 清除resize事件
  //   clearTimeout(this.resizeTimer);
  //   this.resizeTimer = null;
  //   // 清空容器
  //   this.clearContainer();

  //   this.init(this.el, this.options);
  //   this.createImgs();
  // };

  // 销毁实例
  Waterfall.prototype.destroy = function () {
    // 清除resize事件
    clearTimeout(this.resizeTimer);
    this.resizeTimer = null;
    window.removeEventListener('resize', this.browserResize);
    // 清空容器
    this.clearContainer();
    // 清除其它属性
    this.info = null;
    this.imgWidth = 0;
    this.browserResize = null;
    this.options = null;
    // 清除el
    this.el = '';
    this.container = null;
  };

  window.Waterfall = Waterfall;
});
