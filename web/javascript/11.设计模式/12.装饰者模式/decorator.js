/**
  装饰者模式可以动态地给某个对象添加一些额外的职责，而不会影响从这个类中派生的其他对象。
  这种给对象动态地增加职责的方式称为装
  饰者(decorator)模式。装饰者模式能够在不改
  变对象自身的基础上，在程序运行期间给对象
  动态地添加职责。跟继承相比，装饰者是一种
  更轻便灵活的做法，这是一种“即用即付”的
  方式，比如天冷了就多穿一件外套，需要飞行
  时就在头上插一支竹蜻蜓，遇到一堆食尸鬼时
  就点开 AOE(范围攻击)技能。


  装饰者模式和代理模式的结构看起来非常相像，
    * 相同点：
      这两种模式都描述了怎样为对象提供一定程度上的间接引用，它们的实现部分都保留了对另外一个对象的引用，并且向那个对象发送请求。
    
    * 不同点：
      代理模式和装饰者模式最重要的区别在于它们的意图和设计目的。
      代理模式的目的是，当直接访问本体不方便或者不符合需要时，为这个本体提供一个替代者。本体定义了关键功能，而代理提供或拒绝对它的访问，或者在访问本体之前做一些额外的事情。
      装饰者模式的作用就是为对 象动态加入行为
      (换句话说，代理模式强调一种关系(Proxy 与它的实体之间的关系)，这种关系 可以静态的表达，也就是说，这种关系在一开始就可以被确定。而装饰者模式用于一开始不能确 定对象的全部功能时。代理模式通常只有一层代理本体的引用，而装饰者模式经常会形成一条 长长的装饰链。)
 */

/* 模拟传统面向对象语言的装饰者模式 start */
{
  // 原始的飞机类
  let Plane = function () {};
  Plane.prototype.fire = function () {
    console.log('发射普通子弹');
  };

  // 添加两个装饰类，分别是导弹和原子弹
  let MissileDecorator = function (plane) {
    this.plane = plane;
  };
  MissileDecorator.prototype.fire = function () {
    this.plane.fire();
    console.log('发射导弹');
  };

  let AtomDecorator = function (plane) {
    this.plane = plane;
  };
  AtomDecorator.prototype.fire = function () {
    this.plane.fire();
    console.log('发射原子弹');
  };

  let test = function () {
    let plane = new Plane();
    plane = new MissileDecorator(plane);
    plane = new AtomDecorator(plane);
    plane.fire();
  };
  // test();
}
/* 模拟传统面向对象语言的装饰者模式 end */

/* javascript装饰者 start */
{
  let plane = {
    fire: function () {
      console.log('发射普通子弹');
    },
  };
  let missileDecorator = function () {
    console.log('发射导弹');
  };
  let atomDecorator = function () {
    console.log('发射原子弹');
  };
  let fire1 = plane.fire;
  plane.fire = function () {
    fire1();
    missileDecorator();
  };
  let fire2 = plane.fire;
  plane.fire = function () {
    fire2();
    atomDecorator();
  };

  let test = function () {
    plane.fire();
  };
  // test();
  // 分别输出: 发射普通子弹、发射导弹、发射原子弹
}
/* javascript装饰者 end */

/* 用AOP装饰函数 start */
{
  Function.prototype.before = function (beforeFn) {
    let _self = this;
    return function () {
      beforeFn.apply(this, arguments);
      return _self.apply(this, arguments);
    };
  };

  Function.prototype.after = function (afterFn) {
    let _self = this;
    return function () {
      let ret = _self.apply(this, arguments);
      afterFn.apply(this, arguments);
      return ret;
    };
  };

  let test = function () {
    window.onload = function () {
      console.log(1);
    };
    window.onload = (window.onload || function () {})
      .after(function () {
        console.log(2);
      })
      .after(function () {
        console.log(3);
      })
      .after(function () {
        console.log(4);
      });
  };
  // test();

  // 值得提到的是，上面的 AOP 实现是在 Function.prototype 上添加 before 和 after 方法，
  // 但许多人不喜欢这种污染原型的方式，那么我们可以做一些变通，把原函数和新函数都作为参数传入 before 或者 after 方法:
  let before = function (fn, beforeFn) {
    return function () {
      beforeFn.apply(this, arguments);
      return fn.apply(this, arguments);
    };
  };

  let a = before(
    function () {
      console.log(3);
    },
    function () {
      console.log(2);
    }
  );
  a = before(a, function () {
    console.log(1);
  });

  let test1 = function () {
    a();
  };
  // test1();
}
/* 用AOP装饰函数 end */

/* AOP实例：分离业务代码和数据统计代码 start */
// 有一个按钮，点击会弹出登陆浮层，与此同时要进行数据上报，来统计有多少用户点击了这个按钮
{
  var showLogin = function () {
    console.log('打开登录浮层');
    log(this.getAttribute('tag'));
  };
  var log = function (tag) {
    console.log('上报标签为: ' + tag);
    // (new Image).src = 'http:// xxx.com/report?tag=' + tag;
  };
  document.getElementById('button').onclick = showLogin;
  // 在 showLogin 函数里，既要负责打开登录浮层，又要负责数据上报，这是两个层面 的功能，在此处却被耦合在一个函数里
}
// 使用AOP分离之后：
{
  Function.prototype.after = function(afterFn) {
    let _self = this;
    return function() {
      let ret = _self.apply(this, arguments)
      afterFn.apply(this, arguments)
      return ret;
    }
  }

  let showLogin = function() {
    console.log('打开登陆浮层')
  }

  let log = function() {
    console.log('上报标签为：', this.getAttribute('tag'));
  }

  showLogin = showLogin.after(log);
  document.getElementById('button').onclick = showLogin;
}
/* AOP实例：分离业务代码和数据统计代码 end */

/* ajax 添加token start */
{
  let ajax = function(type, url, param) {
    console.log(param); // 发送ajax请求的代码
  }
  // 把token参数通过Function.protorype.before装饰到ajax函数的参数param对象中
  let getToken = function() {
    return 'Token'
  }

  ajax = ajax.before(function(type, url, param) {
    param.Token = getToken();
  })

  let test = function() {
    ajax('get', 'http://xxx.com/userinfo', { name: 'sven' });
  }
  test(); // {name: "sven", Token: "Token"}
}
/* ajax 添加token end */
