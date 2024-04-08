function initLazyImgByIntersectionObserver(defaultSrc) {
  // 获取元素
  var imgs = document.querySelectorAll('[data-src]');
  // 设置默认图片
  function setDefault(img, defaultSrc) {
    if (!defaultSrc) return;
    img.src = defaultSrc;
  }
  // 加载图片
  function loadImg(img) {
    img.src = img.dataset.src;
  }

  // 监听
  var callback = function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImg(entry.target);
      }
    });
  };
  var options = {
    root: null, // 根 (root) 元素，为null时为浏览器的可视窗口
    threshold: 0.05, // 取值为0 - 1，0.1表示重叠10%
  };
  var ob = new IntersectionObserver(callback, options);

  imgs.forEach((img) => {
    setDefault(img, defaultSrc);
    ob.observe(img);
  });
}
