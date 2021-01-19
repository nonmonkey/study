class QueueElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

class Queue {
  constructor() {}

  #container = [];

  size() {
    return this.#container.length;
  }

  // 优先队列(priority值低的元素优先出队)
  enqueue(element, priority) {
    let size = this.size();
    let queueElement;
    if (element instanceof QueueElement) {
      queueElement = element;
    } else {
      queueElement = new QueueElement(element, priority);
    }

    if (queueElement.priority !== undefined && queueElement.priority !== null) {
      for (let i = 0; i < size; i++) {
        if (queueElement.priority < this.#container[i].priority) {
          this.#container.splice(i, 0, queueElement);
          return this.size();
        }
      }
    }

    return this.#container.push(queueElement);
  }

  dequeue() {
    return this.#container.shift();
  }

  isEmpty() {
    return this.size() === 0;
  }

  print() {
    let size = this.size();
    for (let i = 0; i < size; i++) {
      console.log(`${this.#container[i].element} - ${this.#container[i].priority}`);
    }
  }
}

/*
// WeakMap来保存私有属性items，并用外层函数(闭包)来封装Queue类。
let Queue2 = (function () {
  const items = new WeakMap();
  class Queue2 {
    constructor() {
      items.set(this, []);
    }
    enqueue(element) {
      let q = items.get(this);
      q.push(element);
    }
    dequeue() {
      let q = items.get(this);
      let r = q.shift();
      return r;
    }
  }

  //其他方法 }
  return Queue2;
})();
*/
