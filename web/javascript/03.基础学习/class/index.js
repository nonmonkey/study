class Rectangle {
  // 公有属性
  version = '1.1.1';

  // 私有属性(只能在class内部调用，不能在实例中调用)
  #name = 'rect';

  // constructor
  constructor(height = 200, width = 200) {
    this.height = height;
    this.width = width;
  }

  // Getter
  get area() {
    return this.calcArea();
  }

  // Method
  calcArea() {
    return this.height * this.width;
  }

  // 静态方法。调用静态方法不需要实例化该类(调用：Rectangle.compare)
  static compare(a, b) {
    return a.area > b.area
  }
}

Rectangle.prototype.isSquare = function() {
  return this.height === this.width;
}

class Square extends Rectangle {
  constructor(width = 100) {
    super(width, width); // 相当于执行了 Rectangle.prototype.constructor.call(this, width, width)
  }

  speak() {
    console.log('this is a square.');
  }
}


/** 覆盖默认的构造函数 */
class MyArray extends Array {
  // Overwrite species to the parent Array constructor
  static get [Symbol.species]() { return Array; }
}
var a = new MyArray(1,2,3);
var mapped = a.map(x => x * x);

console.log(mapped instanceof MyArray); 
// false
console.log(mapped instanceof Array);   
// true

