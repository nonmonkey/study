var divContainer = document.getElementById('container');
var imgWidth = 220; // 每张图片的固定宽度

// 1.加入图片元素
function createImgs() {
  for (var i = 0; i < 40; i++) {
    var src = './imgs/' + i + '.jpg'; // img路径
    var img = document.createElement('img');
    img.src = src; // 设置src路径
    img.style.width = imgWidth + 'px'; // 定宽
    divContainer.appendChild(img);
  }
}

createImgs();

// 2.设置每张图片的位置
function setPositions() {
  var info = cal(); // 得到列数和间隙的空间
  var nextTops = new Array(info.columns); // 该数组的长度为列数，每一项表示该列的下一个图片的纵坐标
  nextTops.fill(0);
  for (var i = 0; i < divContainer.children.length; i++) {
    var img = divContainer.children[i];
    // 找到nextTops中的最小值作为当前图片的纵坐标
    var min = getMinItem(nextTops);
    img.style.top = min.val + 'px';
    var left = (min.index + 1) * info.space + min.index * imgWidth;
    img.style.left = left + 'px';
    // 重置nextTops数组
    nextTops[min.index] += img.height + info.space;
  }
}

/**
 * 得到概该数组的最小值
 * @param {*} arr
 */
function getMinItem(arr = []) {
  var val;
  var index = -1;
  if (!Array.isArray(arr)) {
    return {
      val: val,
      index: index,
    };
  } else {
    if (0 in arr) {
      index = 0;
      val = arr[0];
    }
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
  // return Math.min.apply(null, arr);
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

setPositions();

// 3.设置容器的高度
