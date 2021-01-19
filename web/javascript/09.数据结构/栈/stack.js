// class 私有属性当前测试只有谷歌和欧鹏可以使用
class Stack {
  constructor() {}

  #container = [];

  size() {
    return this.#container.length;
  }

  push(ele) {
    return this.#container.push(ele);
  }

  pop() {
    return this.#container.pop();
  }

  peek() {
    return this.#container[this.size() - 1];
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.#container.length = 0;
  }

  print() {
    return this.#container.toString();
  }
}

/*
// 使用WeakMap也可以模拟私有属性
let Stack = (function () {
  const items = new WeakMap();
  class Stack {
    constructor() {
      items.set(this, []);
    }

    push(element) {
      let s = items.get(this);
      s.push(element);
    }
  }
  return Stack;
})();
*/


// 实例：
/**
 * 进制转换
 * @param {*} decNumber 
 * @param {*} base 
 */
function divideByBase(decNumber, base = 2) {
  var remStack = new Stack(),
    rem,
    binaryString = '';

  while (decNumber > 0) {
    rem = Math.floor(decNumber % base);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / base);
  }
  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }
  return binaryString;
}

console.log(divideByBase(5));
