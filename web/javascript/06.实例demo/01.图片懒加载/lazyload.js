// 实现通用的图片懒加载
// 动态的设置图片src

// 获取属性值：
// 方式1: getAttribute获取自定义属性
// img.getAttribute('data-src')

// 方式2：通过dataset对象获取自定义属性
// dataset是一个对象，该对象记录了该元素的所有的自定义属性
// img.dataset.src

/**
 * 初始化页面中所有需要懒加载的图片
 * @param {*} defaultSrc
 */
function initLazyImg(defaultSrc) {
  // 获取所有需要懒加载的图片
  var imgs = document.querySelectorAll('[data-src]');
  imgs = Array.from(imgs);
  console.log(imgs);
  // 设置默认图片
  setDefault();
  // 懒加载函数
  loading();
  // 注册滚动时间
  const debounceLoading = debounce(loading, 400);
  window.addEventListener('scroll', function () {
    debounceLoading();
  });

  /**
   * 设置默认图片
   */
  function setDefault() {
    if (!defaultSrc) return;
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].src = defaultSrc;
    }
  }

  /**
   * 懒加载必要图片
   * 该函数可以智能地分析出那些当前情况下，需要加载的图片
   */
  function loading() {
    for (let i = 0; i < imgs.length; i++) {
      let img = imgs[i];
      const isLazyload = loadImg(img);
      // 如果该图片已经进行了加载，则将该图片从数组中移除
      if (isLazyload) {
        imgs.splice(i, 1);
        i--;
      }
    }
    console.log('imgs:', imgs);
  }

  /**
   * 加载一张图片
   */
  function loadImg(img) {
    // 该元素是否能够加载(该元素有一部分在视口范围内)

    let rect = img.getBoundingClientRect();
    // document.documentElement.clientWidth; // 视口宽度
    // document.documentElement.clientHeight; // 视口高度
    if (
      rect.right > 0 &&
      rect.left < document.documentElement.clientWidth &&
      rect.bottom > 0 &&
      rect.top < document.documentElement.clientHeight
    ) {
      console.log(img.dataset.src);
      img.src = img.dataset.src;
      return true; // 进行了懒加载
    }
    return false; // 没有进行懒加载
  }
}

/**
 * 简单版
 */
{
  let img = document.querySelectorAll('img');
  //可视区大小
  let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  let lazyload = function () {
    //滚动卷走的高度
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    for (let i = 0; i < imgs.length; i++) {
      //在可视区冒出的高度
      let x = clientHeight + scrollTop - imgs[i].offsetTop;
      if (x > 0 && x < clientHeight + imgs[i].height) {
        img[i].src = img[i].getAttribute('data');
      }
    }
  };
}
