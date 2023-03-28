function getElementTop(elem) {
  var elemTop = elem.offsetTop; //获得elem元素距相对定位的父元素的top
  elem = elem.offsetParent; //将elem换成起相对定位的父元素
  while (elem != null) {
    //只要还有相对定位的父元素
    //获得父元素 距他父元素的top值,累加到结果中
    elemTop += elem.offsetTop;
    //再次将elem换成他相对定位的父元素上;
    elem = elem.offsetParent;
  }
  return elemTop;
}
