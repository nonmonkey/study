/**
  许多OO语言都支持两种继承方式：接口继承和实现继承
  由于函数没有签名，在ECMAScript中无法实现接口继承。ECMAScript只支持实现继承，而且其实现继承主要是依靠原型链来实现的。
 */

/**
  1.原型链继承。

  构造函数、原型、实例的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都都包含一个指向原型对象的内部指针。
 */
{
  let SuperType = function () {
    this.property = true;
  };

  SuperType.prototype.getSuperValue = function () {
    return this.property;
  };

  let SubType = function () {
    this.subproperty = false;
  };

  SubType.prototype = new SuperType();
  SubType.prototype.constructor = SubType;
  SubType.prototype.getSubValue = function () {
    return this.subproperty;
  };

  var instance = new SubType();
  console.log('instance:', instance);
  // 确定原型和实例的关系 instanceof
  console.log(instance instanceof Object);
  console.log(instance instanceof SuperType);
  console.log(instance instanceof SubType);
  // isPrototypeOf
  console.log(Object.prototype.isPrototypeOf(instance));
  console.log(SuperType.prototype.isPrototypeOf(instance));
  console.log(SubType.prototype.isPrototypeOf(instance));
}

/**
  原型链的问题：
  最主要的问题来自于包含引用类型值的原型。引用类型的原型属性会被所有实例共享。
  而这也正是为什么要在构造函数中，而不是原型中定义属性的原因。

  第二个问题是：在创建子类型的实例时，不能向超类型的构造函数中传递参数。实际上，应该是说是没有办法在影响所有对象实例的情况下，给超类型的构造函数传递参数。

  鉴于这两个原因，实践中很少会单独使用原型链。
 */
{
  let SuperType = function () {
    this.colors = ['red', 'blue', 'green'];
  };
  let SubType = function () {};

  SubType.prototype = new SuperType();
  SubType.prototype.constructor = SubType;

  let instance1 = new SubType();
  instance1.colors.push('21312312');

  let instance2 = new SubType();
  console.log('colors:', instance1.colors, instance2.colors);
}

/**
 * 2.借用构造函数(有时也叫做伪造对象或经典继承)
 *
 * 在子类型构造函数的内部调用超类型构造函数。
 */
{
  let SuperType = function () {
    this.colors = ['red', 'blue', 'green'];
  };
  SuperType.prototype.getColors = function() {
    return this.colors;
  }

  let SubType = function () {
    SuperType.call(this); // 可以传递参数
  };

  let instance1 = new SubType();
  instance1.colors.push('black');
  let instance2 = new SubType();
  console.log('colors::', instance1.colors, instance2.colors); 
  // 超类上的getColors方法并没有继承。
}

/**
 * 3.组合继承(有时也叫做伪经典继承)
 *  指的是将原型链和借用构造函数的技术组合到一起。
 *  其背后的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。
 *
 * 这种继承方式优点在于构造函数可以传参，不会与父类引用属性共享，可以复用父类的函数，
 * 但是也存在一个缺点就是在继承父类函数的时候调用了父类构造函数，导致子类的原型上多了不需要的父类属性，存在内存上的浪费。
 */
{
  let Parent = function (value) {
    this.val = value;
  };
  Parent.prototype.getValue = function () {
    console.log(this.val);
  };

  let Child = function (value) {
    Parent.call(this, value);
    this.name = 'Child';
  };
  Child.prototype = new Parent();
  Child.prototype.constructor = Child;

  const child = new Child(1);

  child.getValue(); // 1
  child instanceof Parent; // true
}

/**
 * 4.原型式继承
 *
 * 这种方法并没有使用严格意义上的构造函数。
 * 它的想法是借助构造原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。
 * 如下函数：
 */
{
  // 在object函数内部，先创建了一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回可这个临时类型的一个新实例。
  let object = function (o) {
    function F() {}
    F.prototype = o;
    F.prototype.constructor = F;
    return new F();
  };

  let person = {
    name: 'Nicholas',
    friends: ['shelby', 'Court', 'Van'],
  };
  let instance1 = object(person);
  instance1.name = 'greg';
  instance1.friends.push('rob');

  let instance2 = object(person);
  instance2.name = 'linda';
  instance2.friends.push('barbie');

  console.log(person.friends); // ["shelby", "Court", "Van", "rob", "barbie"]
  // person.friends不仅属于person所有，而且也会被创建的两个实例共享。
}
// es6通过新增Object.create()方法规范了原型式继承。这个方法接收两个参数：一个用作新对象原型的对象和（可选的）一个为新对象定义额外属性的对象。
// 在传入一个参数的情况下，Object.create()与object()方法的行为相同。
{
  let person = {
    name: 'Nicholas',
    friends: ['shelby', 'Court', 'Van'],
  };

  let instance1 = Object.create(person);
  instance1.name = 'Greg';
  instance1.friends.push('Rob');

  let instance2 = Object.create(person);
  instance2.name = 'Linda';
  instance2.friends.push('Barbie');

  console.log('原型式继承:', instance1, instance2, person);
}
// Object.create()方法的第二个参数与Object.defineProperties()方法的第二个参数格式相同：每个属性都是通过自己的描述符定义的。
// 以这种方式指定的任何属性都会覆盖原型对象上的同名属性。
{
  let person = {
    name: 'Nichoals',
    friends: ['shelbu', 'court', 'van'],
  };
  let instance = Object.create(person, {
    name: { value: 'greg' },
  });
  console.log(instance.name);
}

/**
 * 5.寄生式继承
 *
 * 寄生式继承的思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部以某种方法来增强对象，最后再像真的是它做了所有工作一样返回对象。
 *
 * 在主要考虑对象而不是自定义类型和构造函数的情况下，寄生式继承也是一种有用的模式。
 * 使用寄生式继承来对对象添加函数，会由于不能做到函数复用而降低效率，这一点与构造函数模式类似。
 */
{
  let createAnother = function (original) {
    let clone = Object.create(original); // 通过调用函数创建一个新对象
    clone.sayHi = function () {
      // 以某种方式来增强这个对象
      console.log('hi');
    };
    return clone;
  };

  let person = {
    name: 'Nicholas',
    friends: ['shelly', 'Court', 'Van'],
  };

  let anotherPerson = createAnother(person);
  anotherPerson.sayHi();
}
// {
//   let Parent = function (value) {
//     this.val = value;
//   };
//   Parent.prototype.getValue = function () {
//     console.log(this.val);
//   };

//   let Child = function (value) {
//     Parent.call(this, value);
//   };
//   Child.prototype = Object.create(Parent.prototype, {
//     constructor: {
//       value: Child,
//       enumerable: false,
//       writable: true,
//       configurable: true,
//     },
//   });

//   const child = new Child(1);

//   child.getValue(); // 1
//   child instanceof Parent; // true
// }

/**
 * 6.寄生组合式继承
 *
 * 寄生组合式继承, 即通过借用构造函数来继承属性, 在原型上添加共用的方法, 通过寄生式实现继承.
 */
{
  // 组合继承是js最常用的继承模式。
  // 组合继承最大的问题是无论数目情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。
  // 子类型最终会包含类型对象的全部实例属性，不得不在调用子类型构造函数时重写这些属性。

  // 组合继承的例子：
  let SuperType = function (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
  };
  SuperType.prototype.sayName = function () {
    console.log(this.name);
  };

  let SubType = function (name, age) {
    SuperType.call(this, name);
    this.age = age;
  };
  SubType.prototype = new SuperType();
  SubType.prototype.constructor = SubType;
  SubType.prototype.sayAge = function () {
    console.log(this.age);
  };
}

// 寄生组合式继承的基本模式：
// 这个例子的高效体现在它只调用了一次SuperType构造函数，并且避免了在SubType.prototype上创建不必要的，多余的属性，与此同时原型链还能保持不变
// 还能正常使用instanceof和isPrototypeof。开发人员普遍认为寄生组合式继承是引用类型最理想的继承方式。
{
  let inheritPrototype = function(subType, superType) {
    let prototype = Object.create(superType.prototype); // 创建对象
    prototype.constructor = subType; // 增强对象
    subType.prototype = prototype; // 指定对象
  }

  let SuperType = function(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green']
  }
  SuperType.prototype.sayName = function() {
    console.log(this.name);
  }

  let SubType = function(name, age) {
    SuperType.call(this, name);
    this.age = age;
  }

  inheritPrototype(SubType, SuperType);
  SubType.prototype.sayAge = function() {
    console.log(this.age);
  }
}

/**
 * 7.Class继承
 *
 * class 实现继承的核心在于使用 extends 表明继承自哪个父类，
 * 并且在子类构造函数中必须调用 super，因为这段代码可以看成 Parent.call(this, value)。
 */

class Parent {
  constructor(value) {
    this.val = value;
  }
  getValue() {
    console.log(this.val);
  }
}
class Child extends Parent {
  constructor(value) {
    super(value); // Child.prototype.constructor.call(this, name)
  }
}
let child = new Child(1);
child.getValue(); // 1
child instanceof Parent; // true
