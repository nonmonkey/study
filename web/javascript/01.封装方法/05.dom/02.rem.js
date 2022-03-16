// rem是css3新增的一个相对长度单位,相对于HTML根元素,本质就是等比缩放,rem修改根元素,成比列的调整所有字体大小
function setRem() {
  let doc = document.documentElement;
  let width = doc.getBoundingClientRect().width;
  let rem = width / 75;
  doc.style.fontsize = rem + 'px';
}
setRem();
window.addEventListener('resize', setRem);
