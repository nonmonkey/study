[TOC]

---

## 基础知识

编程语言按照数据类型大体可以分为两类，一类是静态类型语言，另一类是动态类型语言。

### 一、静态类型语言

静态类型语言在编译时便已确定变量的类型。

静态类型语言的优点首先是在编译时就能发现类型不匹配的错误，编辑器可以帮助我们提前避免程序在运行期间有可能发生的一些错误。其次，如果在程序中明确地规定了数据类型，编译器还可以针对这些信息对程序进行一些优化工作，提高程序执行速度。

### 二、动态类型语言

动态类型语言的变量类型要到程序运行的时候，待变量被赋予某个值之后，才会具有某种类型。

动态类型语言的优点是编写的代码数量更少，看起来也更加简洁，程序员可以把精力更多地放在业务逻辑上面。虽然不区分类型在某些情况下会让程序变得难以理解，但整体而言，代码量越少，越专注于逻辑表达，对阅读程序是越有帮助的。

### 三、多态

同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果。换句话说，给不同的对象发送同一个消息的时候，这些对象会根据这个消息分别给出不同的 反馈。

举例说明一下:
主人家里养了两只动物，分别是一只鸭和一只鸡，当主人向它们发出“叫”的命令 时，鸭会“嘎嘎嘎”地叫，而鸡会“咯咯咯”地叫。这两只动物都会以自己的方式来发 出叫声。它们同样“都是动物，并且可以发出叫声”，但根据主人的指令，它们会各自 发出不同的叫声。

```JS
var makeSound = function (animal) {
  animal.sound();
};

var Duck = function () {};
Duck.prototype.sound = function () {
  console.log('嘎嘎嘎');
};
var Chicken = function () {};
Chicken.prototype.sound = function () {
  console.log('咯咯咯');
};
makeSound(new Duck()); // 嘎嘎嘎
makeSound(new Chicken()); // 咯咯咯
```

## 设计原则及编程技巧

### 一、单一职责原则(Single Responsibility Principle)

单一职责原则(SRP)的职责被定义为“引起变化的原因”。如果我们有两个动机去改写一 个方法，那么这个方法就具有两个职责。每个职责都是变化的一个轴线，如果一个方法承担了过 多的职责，那么在需求的变迁过程中，需要改写这个方法的可能性就越大。

此时，这个方法通常是一个不稳定的方法，修改代码总是一件危险的事情，特别是当两个职 责耦合在一起的时候，一个职责发生变化可能会影响到其他职责的实现，造成意想不到的破坏， 这种耦合性得到的是低内聚和脆弱的设计。

**因此，SRP 原则体现为:一个对象(方法)只做一件事情。**
SRP 原则在很多设计模式中都有着广泛的运用

SRP 原则的优点是降低了单个类或者对象的复杂度，按照职责把对象分解成更小的粒度， 这有助于代码的复用，也有利于进行单元测试。当一个职责需要变更的时候，不会影响到其他 的职责。

但 SRP 原则也有一些缺点，最明显的是会增加编写代码的复杂度。当我们按照职责把对象 分解成更小的粒度之后，实际上也增大了这些对象之间相互联系的难度。

##### 1.代理模式

增加虚拟代理的方式，把预加载图片的职责放到代理对象中，而本体仅仅负责往页面中添加 img 标签，这也是它最原始的职责

```JS
let myImage = (function () {
  let imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  return {
    setSrc: function (src) {
      imgNode.src = src;
    },
  };
})();
// proxyImage 负责预加载图片，并在预加载完成之后把请求交给本体 myImage:
let proxyImage = (function () {
  let img = new Image();
  img.onload = function () {
    myImage.setSrc(this.src);
  };
  return {
    setSrc: function (src) {
      myImage.setSrc('./03.代理模式/home.svg');
      img.src = src;
    },
  };
})();
proxyImage.setSrc('./03.代理模式/pikaqiu.jpeg');
```

##### 2.迭代器模式

先遍历一个集合，然后往页面中添加一些 div，这些 div 的 innerHTML 分别对应集合里的元素

```JS
let appendDiv = function(data) {
  for (let i = 0, l = data.length; i < l; i++) {
    let div = document.createElement('div');
    div.innerHTML = data[i];
    document.body.appendChild(div)
  }
}
appendDiv([1,2,3,4,5]);
// appendDiv 函数本来只是负责渲染数据，但是在这里它还承担了遍历聚合对象 data 的职责。
// 我们有必要把遍历 data 的职责提取出来，这正是迭代器模式的意义，迭代器模式提供了一 种方法来访问聚合对象，而不用暴露这个对象的内部表示。
let each = function (obj, callback) {
  let value;
  let i = 0;
  let l = obj.length;
  let isArray = Array.isArray(obj);

  if (isArray) {
    for (; i < l; i++) {
      callback.call(obj[i], i, obj[i]);
    }
  } else {
    for (i in obj) {
      value = callback.call(obj[i], i, obj[i]);
    }
  }
  return obj;
};

let appendDiv = function (data) {
  each(data, function (i, n) {
    let div = document.createElement('div');
    div.innerHTML = n;
    document.body.appendChild(div);
  });
};

appendDiv([1, 2, 3, 4, 5]);
appendDiv({ a: 1, b: 2, c: 3 });
```

##### 3.单例模式
```JS
// 最开始的代码是这样的:
var createLoginLayer = (function () {
  var div;
  return function () {
    if (!div) {
      div = document.createElement('div');
      div.innerHTML = '我是登录浮窗';
      div.style.display = 'none';
      document.body.appendChild(div);
    }
    return div;
  };
})();

//把管理单例的职责和创建登录浮窗的职责分别封装在两个方法里，这两个方法可以 独立变化而互不影响，当它们连接在一起的时候，就完成了创建唯一登录浮窗的功能，下面的代 码显然是更好的做法:
var getSingle = function (fn) {
  var result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  };
};
var createLoginLayer = function () {
  var div = document.createElement('div');
  div.innerHTML = '我是登陆浮窗';
  document.body.appendChild(div);
  return div;
};
var createSingleLoginLayer = getSingle(createLoginLayer);
var loginLayer1 = createSingleLoginLayer();
var loginLayer2 = createSingleLoginLayer();
console.log(loginLayer1 ===  loginLayer2);
```

##### 4.装饰者模式
```JS
// 使用装饰者模式的时候，我们通常让类或者对象一开始只具有一些基础的职责，更多的职责 在代码运行时被动态装饰到对象上面。装饰者模式可以为对象动态增加职责，从另一个角度来看， 这也是分离职责的一种方式。
Function.prototype.after = function (afterFn) {
  var _self = this;
  return function () {
    var ret = _self.apply(this, arguments);
    afterFn.apply(this, arguments);
    return ret;
  };
};

var showLogin = function () {
  console.log('打开登陆浮窗');
};

var log = function () {
  console.log('上报标签为：', this.getAttribute('tag'));
};

document.getElementById('button').onclick = showLogin.after(log);
```

### 二、最少知识原则(LKP)
最少知识原则(LKP)说的是一个软件实体应当尽可能少地与其他实体发生相互作用。这 里的软件实体是一个广义的概念，不仅包括对象，还包括系统、类、模块、函数、变量等。

最少知识原则要求我们在设计程序时，应当尽量减少对象之间的交互。如果两个对象之间不 必彼此直接通信，那么这两个对象就不要发生直接的相互联系。常见的做法是引入一个第三者对 象，来承担这些对象之间的通信作用。如果一些对象需要向另一些对象发起请求，可以通过第三 者对象来转发这些请求。

##### 1.中介者模式
在世界杯期间购买足球彩票，如果没有博彩公司作为中介，上千万的人一起计算赔率和输赢 绝对是不可能的事情。博彩公司作为中介，每个人都只和博彩公司发生关联，博彩公司会根据所 有人的投注情况计算好赔率，彩民们赢了钱就从博彩公司拿，输了钱就赔给博彩公司。

中介者模式很好地体现了最少知识原则。通过增加一个中介者对象，让所有的相关对象都通 过中介者对象来通信，而不是互相引用。所以，当一个对象发生改变时，只需要通知中介者对象 即可。

##### 2.封装在最少知识原则中的体现
封装在很大程度上表达的是数据的隐藏。一个模块或者对象可以将内部的数据或者实现细 节隐藏起来，只暴露必要的接口 API 供外界访问。对象之间难免产生联系，当一个对象必须引 用另外一个对象的时候，我们可以让对象只暴露必要的接口，让对象之间的联系限制在最小的 范围之内。

同时，封装也用来限制变量的作用域。在 JavaScript 中对变量作用域的规定是:
  变量在全局声明，或者在代码的任何位置隐式申明(不用 var)，则该变量在全局可见;
  变量在函数内显式申明(使用 var)，则在函数内可见。

把变量的可见性限制在一个尽可能小的范围内，这个变量对其他不相关模块的影响就越小，变量被改写和发生冲突的机会也越小。这也是广义的最少知识原则的一种体现。

```JS
// 假设我们要编写一个具有缓存效果的计算乘积的函数 function mult (){}，我们需要一个对 10 象 var cache = {}来保存已经计算过的结果。cache 对象显然只对 mult 有用，把 cache 对象放在mult 形成的闭包中，显然比把它放在全局作用域更加合适:
var mult = (function () {
  var cache = {};
  return function () {
    var args = Array.prototype.join.call(arguments, '');
    if (cache[args]) return cache[args];
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
      a = a * arguments[i];
    }
    return (cache[args] = a);
  };
})();
mult(1, 2, 3);
```

### 三、开放封闭原则(OpenClosed Principle)
软件实体(类、模块、函数)等应该是可以扩展的，但是不可修改。

开放封闭原则是一个看起来比较虚幻的原则，并没有实际的模板教导我们怎样亦步亦趋地 实现它。但我们还是能找到一些让程序尽量遵守开放封闭原则的规律，最明显的就是找出程序 中将要发生变化的地方，然后把变化封装起来。

通过封装变化的方式，可以把系统中稳定不变的部分和容易变化的部分隔离开来。在系统的 演变过程中，我们只需要替换那些容易变化的部分，如果这些部分是已经被封装好的，那么替换 起来也相对容易。而变化部分之外的就是稳定的部分。在系统的演变过程中，稳定的部分是不需 要改变的。

可以帮助我们编写遵守开放封闭原则的代码的方式：
  多态性
  放置挂钩(hook)
  使用回调函数

开放-封闭原则的相对性：
  实际上，让程序保持完全封闭是不容易做到的。就算技术上做得到，也需要花费太多的时间 和精力。而且让程序符合开放封闭原则的代价是引入更多的抽象层次，更多的抽象有可能会增 大代码的复杂度。
  更何况，有一些代码是无论如何也不能完全封闭的，总会存在一些无法对其封闭的变化。作 为程序员，我们可以做到的有下面两点：
  1.挑选出最容易发生变化的地方，然后构造抽象来封闭这些变化。
  2.在不可避免发生修改的时候，尽量修改那些相对容易修改的地方。拿一个开源库来说，修改它提供的配置文件，总比修改它的源代码来得简单。

##### 1.扩展window.onload函数
```JS
// 在 window.onload 函数中打印出页面中的所有节点数量。
window.onload = function() {
  // 原有代码
  console.log(document.getElementsByTagName('*').length)
}
/*
  如果目前的 window.onload 函数是一个拥有 500 行代码的巨型函数，里面密布着各种变量和 交叉的业务逻辑，而我们的需求又不仅仅是打印一个 log 这么简单。那么“改好一个 bug，引发 其他 bug”这样的事情就很可能会发生。我们永远不知道刚刚的改动会有什么副作用，很可能会 引发一系列的连锁反应。

  在不修改代码的情况下，就能满足新需求:
*/
Function.prototype.after = function (afterfn) {
  var _self = this;
  return function () {
    var ret = _self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return ret;
  };
};
window.onload = (window.onload || function () {}).after(function () {
  console.log(document.getElementsByTagName('*').length);
});
/*
  通过动态装饰函数的方式，我们完全不用理会从前 window.onload 函数的内部实现，无论它 的实现优雅或是丑陋。就算我们作为维护者，拿到的是一份混淆压缩过的代码也没有关系。只要 它从前是个稳定运行的函数，那么以后也不会因为我们的新增需求而产生错误。新增的代码和原 有的代码可以井水不犯河水。
*/
```
##### 2.设计模式中的开放-封闭原则
开放封闭原则是编写一个好程序的 目标，其他设计原则都是达到这个目标的过程。
* 1.发布-订阅模式
  发布订阅模式用来降低多个对象之间的依赖关系，它可以取代对象之间硬编码的通知机制， 一个对象不用再显式地调用另外一个对象的某个接口。当有新的订阅者出现时，发布者的代码不 需要进行任何修改;同样当发布者需要改变时，也不会影响到之前的订阅者。
* 2.模版方法模式
  模板方法模式是一种典型的通过封装变化来提高系统扩展性的设计模式。在一个运用了模板方法模式的程序中，子类的方法种类和执行顺序都是不变的，所以 我们把这部分逻辑抽出来放到父类的模板方法里面;而子类的方法具体怎么实现则是可变的，于 是把这部分变化的逻辑封装到子类中。通过增加新的子类，便能给系统增加新的功能，并不需要 改动抽象父类以及其他的子类，这也是符合开放封闭原则的。
* 3.策略模式
  策略模式和模板方法模式是一对竞争者。在大多数情况下，它们可以相互替换使用。模板方法模式基于继承的思想，而策略模式则偏重于组合和委托。
  策略模式将各种算法都封装成单独的策略类，这些策略类可以被交换使用。策略和使用策略 的客户代码可以分别独立进行修改而互不影响。我们增加一个新的策略类也非常方便，完全不用 4 修改之前的代码。
* 4.代理模式
  我们现在已有一个给图片设置 src 的函数 myImage，当我们想为它增加图片预加载功能时， 一种做法是改动 myImage 函数内部的代码，更好的做法是提供一个代理函数 proxyMyImage，代理 函数负责图片预加载，在图片预加载完成之后，再将请求转交给原来的 myImage 函数，myImage 在 这个过程中不需要任何改动。
  预加载图片的功能和给图片设置 src 的功能被隔离在两个函数里，它们可以单独改变而互不 影响。myImage 不知晓代理的存在，它可以继续专注于自己的职责——给图片设置 src。
* 5.职责链模式
  当我们增加一个新类型的订单函数时，不需要改动原有的订单函数代码，只需要在链条中增加一个新的节点。

### 四、里氏替换(Liskov Substitution Principle)

任何基类可以出现的地方，子类一定可以出现。通俗来讲就是：子类可以扩展父类的功能，但是不能改变父类原有的功能。 

### 五、依赖倒置原则(Dependency Inversion Principle)

最常用的原则，依赖接口，不依赖方法，底层的东西不用了解，我们只需知道表现就可以。降低耦合度。 

前端应用中可以理解成多者之间依赖状态，而不依赖彼此。 

js中没有接口的概念。

### 六、接口分离原则(Interface Segregation Principle)

把大接口拆分小接口，不能一个接口全部实现增删改查

## 接口和面向接口编程
1.我们经常说一个库或者模块对外提供了某某 API 接口。通过主动暴露的接口来通信，可以隐藏软件系统内部的工作细节。这也是我们最熟悉的第一种接口含义。
2.第二种接口是一些语言提供的关键字，比如 Java 的 interface。interface 关键字可以产生一 个完全抽象的类。这个完全抽象的类用来表示一种契约，专门负责建立类与类之间的联系。
3.第三种接口即是我们谈论的“面向接口编程”中的接口，接口的含义在这里体现得更为抽象。 用《设计模式》中的话说就是: 接口是对象能响应的请求的集合。
