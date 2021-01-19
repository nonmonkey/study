/**
  单例模式的定义是:保证一个类仅有一个实例，并提供一个访问它的全局访问点。
 */

// 通用的惰性单例：
var getSingle = function(fn) {
  var result;
  return function(){
    return result || (result = fn.apply(this, arguments))
  }
}

/* 惰性单例 start */
// 惰性单例指的是在需要的时候才创建对象实例。惰性单例是单例模式的重点，这种技术在实际开发中非常有用，有用的程度可能超出了我们的想象
var SingleTon = function (name) {
  this.name = name;
};

SingleTon.prototype.getName = function () {
  console.log(this.name);
};

SingleTon.getInstance = (function () {
  var instance = null;

  return function (name) {
    if (!instance) {
      instance = new SingleTon(name);
    }
    return instance;
  };
})();

var a1 = SingleTon.getInstance('name1');
var b1 = SingleTon.getInstance('name2');

console.log(a1 === b1);
/* 惰性单例 end */

/* 透明的单例模式 start */
// 我们现在的目标是实现一个“透明”的单例类，用户从这个类中创建对象的时候，可以像使 用其他任何普通类一样
// 使用 CreateDiv1 单例类，它的作用是负责在页面中创建唯一的 div 节点
var CreateDiv1 = (function () {
  var instance = null;

  var CreateDiv1 = function (html) {
    if (instance) {
      return instance;
    }

    this.html = html;
    this.init();
    return (instance = this);
  };

  CreateDiv1.prototype.init = function () {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
  };

  return CreateDiv1;
})();

var a2 = new CreateDiv1('sven1');
var b2 = new CreateDiv1('sven2');

console.log(a2 === b2);

// CreateDiv 的构造函数实际上负责了两件事情。第一是创建对象和执行初始化init方法，第二是保证只有一个对象
// 假设我们某天需要利用这个类，在页面中创建千千万万的div，即要让这个类从单例类变成一个普通的可产生多个实例的类，那我们必须得改写CreateDiv构造函数，把控制创建唯一对象的那一段去掉，这种修改会给我们带来不必要的烦恼。
/* 透明的单例模式 end */

/* 用代理实现单例模式 start */
// 把负责管理单例的逻辑移到了代理类 proxySingletonCreateDiv 中
// CreateDiv 就变成了 一个普通的类，它跟 proxySingletonCreateDiv 组合起来可以达到单例模式的效果
var CreateDiv = function (html) {
  this.html = html;
  this.init();
};

CreateDiv.prototype.init = function () {
  var div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div);
};

var ProxySingletonCreateDiv = (function () {
  var instance = null;
  return function (html) {
    if (!instance) {
      instance = new CreateDiv(html);
    }
    return instance;
  };
})();

var a3 = new ProxySingletonCreateDiv('sven1');
var b3 = new ProxySingletonCreateDiv('sven2');

console.log(a3 === b3);
/* 用代理实现单例模式 end */
