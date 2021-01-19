var divContainer = document.getElementById('container');
var imgWidth = 220; // 每张图片的固定宽度
var resizeTimer = null;
var info = cal(); // 得到列数和间隙的空间
var nextTops = new Array(info.columns); // 该数组的长度为列数，每一项表示该列的下一个图片的纵坐标

nextTops.fill(0);

createImgs();

window.onresize = function () {
  if (resizeTimer) {
    clearTimeout(resizeTimer);
  }
  resizeTimer = setTimeout(() => {
    setAllImgsPosition();
  }, 300);
};

// 1.加入图片元素
function createImgs() {
  for (var i = 0; i < 40; i++) {
    var src = './imgs/' + i + '.jpg'; // img路径
    var img = document.createElement('img');
    img.style.width = imgWidth + 'px'; // 定宽
    img.src = src; // 设置src路径
    img.onload = loadImg(img);
  }
}

// 2.设置所有图片的位置(onresize方法调用)
function setAllImgsPosition() {
  info = cal(); // 得到列数和间隙的空间
  nextTops = new Array(info.columns); // 该数组的长度为列数，每一项表示该列的下一个图片的纵坐标
  nextTops.fill(0);
  for (var i = 0; i < divContainer.children.length; i++) {
    var img = divContainer.children[i];
    setImgPosition(img);
  }
}

function setImgPosition(img) {
  // 计算img应有的高度
  var height = +((imgWidth / img.width) * img.height).toFixed(2);

  // 找到nextTops中的最小值作为当前图片的纵坐标
  var min = getMinItem(nextTops);
  img.style.top = min.val + 'px';
  var left = (min.index + 1) * info.space + min.index * imgWidth;
  img.style.left = left + 'px';
  // 重置nextTops数组
  nextTops[min.index] += height + info.space;
  // 设置容器高度
  setContainerHeight();
}

/**
 * 得到概该数组的最小值
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
  return {
    val: val,
    index: index,
  };
}

function getMaxItem(arr = []) {
  var index = 0;
  var val = arr[index];
  for (var i = 0; i < arr.length; i++) {
    if (val < arr[i]) {
      val = arr[i];
      index = i;
    }
  }
  return {
    val: val,
    index: index,
  };
}

/**
 * 计算一共多少列，以及每一列的宽度
 */
function cal() {
  var containerWidth = divContainer.clientWidth; // 容器宽度
  // 计算列的数量
  var columns = Math.floor(containerWidth / imgWidth);
  // 计算间隙
  var spaceNumer = columns + 1; // 间隙数量
  var leftSpace = containerWidth - columns * imgWidth; // 计算剩余的区域
  var space = leftSpace / spaceNumer; // 每个间隙的空间
  return {
    space: space,
    columns: columns,
  };
}

/**
 * img load方法
 * @param {*} img
 */
function loadImg(img) {
  return () => {
    setImgPosition(img);
    divContainer.append(img);
  };
}

// 3.设置容器的高度
function setContainerHeight() {
  var max = getMaxItem(nextTops).val; // 最大值
  divContainer.style.height = max + 'px';
}
