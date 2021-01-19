/**
  模板方法模式是一种只需使用继承就可以实现的非常简单的模式。

  模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。
  通常在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序。
  子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。
 */

/* 1.coffee or tea  start */
// 泡咖啡
/*
  泡咖啡的步骤通常如下:
    把水煮沸
    用沸水冲泡咖啡
    把咖啡倒进杯子
    加糖和牛奶
 */
let Coffee = function () {};

Coffee.prototype.boilWater = function () {
  console.log('把水煮沸');
};

Coffee.prototype.brewCoffeeGriends = function () {
  console.log('用沸水冲泡咖啡');
};

Coffee.prototype.pourInCup = function () {
  console.log('把咖啡倒进杯子');
};

Coffee.prototype.addSugarAndMilk = function () {
  console.log('加牛奶');
};

Coffee.prototype.init = function () {
  this.boilWater();
  this.brewCoffeeGriends();
  this.pourInCup();
  this.addSugarAndMilk();
};

let coffee = new Coffee();
// coffee.init();

// 泡茶
let Tea = function () {};

Tea.prototype.boilWater = function () {
  console.log('把水煮沸');
};

Tea.prototype.steepTeaBag = function () {
  console.log('用沸水浸泡茶叶');
};

Tea.prototype.pourInCup = function () {
  console.log('把茶水倒进杯子');
};

Tea.prototype.addLemon = function () {
  console.log('加柠檬');
};

Tea.prototype.init = function () {
  this.boilWater();
  this.steepTeaBag();
  this.pourInCup();
  this.addLemon();
};

let tea = new Tea();
// tea.init();

// 分离出共同点
{
  let Beverage = function () {};

  Beverage.prototype.boilWater = function () {
    console.log('把水煮沸');
  };

  Beverage.prototype.brew = function () {}; // 空方法 由子类重写

  Beverage.prototype.pourInCup = function () {}; // 空方法 由子类重写

  Beverage.prototype.addCondiments = function () {}; // 空方法 由子类重写

  Beverage.prototype.init = function () {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
  };

  // 创建coffee子类和tea子类
  let Coffee = function () {};
  Coffee.prototype = new Beverage();
  Coffee.prototype.brew = function () {
    console.log('用沸水冲泡咖啡');
  };
  Coffee.prototype.pourInCup = function () {
    console.log('把咖啡倒进杯子');
  };
  Coffee.prototype.addCondiments = function () {
    console.log('加糖和牛奶');
  };
  let coffee = new Coffee();
  // coffee.init();

  let Tea = function () {};
  Tea.prototype = new Beverage();
  Tea.prototype.brew = function () {
    console.log('用沸水冲泡咖啡');
  };
  Tea.prototype.pourInCup = function () {
    console.log('把咖啡倒进杯子');
  };
  Tea.prototype.addCondiments = function () {
    console.log('加糖和牛奶');
  };
  let tea = new Tea();
  // tea.init();
}
/* 1.coffee or tea  end */

/* 勾子方法 start */
{
  let Beverage = function () {};

  Beverage.prototype.boilWater = function () {
    console.log('把水煮沸');
  };
  Beverage.prototype.brew = function () {
    throw new Error('子类必须重写brew方法');
  };
  Beverage.prototype.pourInCup = function () {
    throw new Error('子类必须重写pourInCup方法');
  };
  Beverage.prototype.addCondiments = function () {
    throw new Error('子类必须重写addCondiments方法');
  };
  Beverage.prototype.customerWantsCondiments = function () {
    return true; // 默认需要调料
  };
  Beverage.prototype.init = function () {
    this.boilWater();
    this.brew();
    this.pourInCup();
    if (this.customerWantsCondiments()) {
      // 如果挂钩返回true，则需要调料
      this.addCondiments();
    }
  };

  let CoffeeWithHook = function () {};
  CoffeeWithHook.prototype = new Beverage();
  CoffeeWithHook.prototype.brew = function () {
    console.log('用沸水冲泡咖啡');
  };
  CoffeeWithHook.prototype.pourInCup = function () {
    console.log('把咖啡倒进杯子');
  };
  CoffeeWithHook.prototype.addCondiments = function () {
    console.log('加糖和牛奶');
  };
  CoffeeWithHook.prototype.customerWantsCondiments = function () {
    return window.confirm('请问需要调料吗？');
  };

  let coffeeWithHook = new CoffeeWithHook();
  coffeeWithHook.init();
}
/* 勾子方法 end */
