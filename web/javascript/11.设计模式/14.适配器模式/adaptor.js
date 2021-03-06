/**
  适配器模式的作用是解决两个软件实体间的接口不兼容的问题。使用适配器模式之后，原本 由于接口不兼容而不能工作的两个软件实体可以一起工作。

  适配器的别名是包装器(wrapper)，这是一个相对简单的模式。在程序开发中有许多这样的 场景:
  当我们试图调用模块或者对象的某个接口时，却发现这个接口的格式并不符合目前的需求。 
  这时候有两种解决办法，第一种是修改原来的接口实现，但如果原来的模块很复杂，
  或者我们拿到的模块是一段别人编写的经过压缩的代码，修改原接口就显得不太现实了。
  第二种办法是创建 一个适配器，将原接口转换为客户希望的另一个接口，客户只需要和适配器打交道。
 */

/* 展现地图 start */
{
  let googleMap = {
    show: function () {
      console.log('开始渲染谷歌地图');
    },
  };

  let baiduMap = {
    display: function () {
      console.log('开始渲染百度地图');
    },
  };

  let renderMap = function (map) {
    if (map.show instanceof Function) {
      map.show();
    }
  };

  let baiduMapAdapter = {
    show: function () {
      return baiduMap.display();
    },
  };

  let test = function () {
    renderMap(googleMap);
    renderMap(baiduMapAdapter);
  };
  test();
}
/* 展现地图 end */
