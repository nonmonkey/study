class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor() {}

  #length = 0;
  #head = null;

  isEmpty() {
    return this.#length === 0;
  }

  size() {
    return this.#length;
  }

  getHead() {
    return this.#head;
  }

  // 向链表尾部追加元素
  append(element) {
    let node = new Node(element);
    let current = null;

    if (this.#head === null) {
      this.#head = node;
    } else {
      current = this.#head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }

    this.#length++;
  }

  // 在任意位置插入元素
  insert(position, element) {
    if (position >= 0 && position <= this.#length) {
      let node = new Node(element);
      let current = this.#head;
      let previous = null;
      let index = 0;

      if (position === 0) {
        node.next = current;
        this.#head = node;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
      }

      this.#length++;
      return true;
    } else {
      return false;
    }
  }

  // 移除元素
  remove(element) {
    let index = this.indexOf(element);
    return this.removeAt(index);
  }

  // 从链表中指定位置移除元素
  removeAt(position) {
    if (position > -1 && position < this.#length) {
      let current = this.#head;
      let previous = null;
      let index = 0;

      if (position === 0) {
        this.#head = current.next;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
      }

      this.#length--;
      return current.element;
    } else {
      return null;
    }
  }

  // toString方法会把LinkedList对象转换成一个字符串
  toString() {
    let current = this.#head;
    let str = '';

    while (current) {
      str += current.element + (current.next ? ',' : '');
      current = current.next;
    }
    return str;
  }

  // indexOf方法接收一个元素的值，如果在列表中找到 它，就返回元素的位置，否则返回-1。
  indexOf(element) {
    let current = this.#head;
    let index = -1;
    while (current) {
      index++;
      if (element === current.element) {
        return index;
      }
      current = current.next;
    }
    return -1;
  }
}

// 双向链表
class DoublyNode {
  constructor(element) {
    this.element = element;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {}

  #length = 0;
  #head = null;
  #tail = null;

  isEmpty() {
    return this.#length === 0;
  }

  size() {
    return this.#length;
  }

  getHead() {
    return this.#head;
  }

  getTail() {
    return this.#tail;
  }

  // 向链表尾部追加元素
  append(element) {
    let node = new DoublyNode(element);

    if (this.size() === 0) {
      this.#head = node;
      this.#tail = node;
    } else {
      node.prev = this.#tail;
      this.#tail.next = node;
      this.#tail = node;
    }

    this.#length++;
    return this.size();
  }

  // 在任意位置插入新元素
  insert(position, element) {
    if (position >= 0 && position <= this.#length) {
      let node = new DoublyNode(element);

      // 在第一个位置添加
      if (position === 0) {
        if (this.#head) {
          node.next = this.#head;
          this.#head.prev = node; // 新增的
          this.#head = node;
        } else {
          // 新增的
          this.#head = node;
          this.#tail = node;
        }
      } else if (position === this.#length) {
        this.#tail.next = node;
        node.prev = this.#tail;
        this.#tail = node;
      } else {
        let current = this.#head;
        let previous = null;
        let index = 0;
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;

        current.prev = node;
        node.prev = previous;
      }

      this.#length++;
      return true;
    } else {
      return false;
    }
  }

  // 移除元素
  remove(element) {
    let index = this.indexOf(element);
    return this.removeAt(index);
  }

  // 移除任意位置的元素
  removeAt(position) {
    if (position > -1 && position < this.#length) {
      let current = this.#head;
      let previous = null;
      let index = 0;
      if (position === 0) {
        this.#head = current.next;
        if (this.#length === 1) {
          this.#tail = null;
        } else {
          this.#head.prev = null;
        }
      } else if (position === this.#length - 1) {
        current = this.#tail;
        this.#tail = current.prev;
        this.#tail.next = null;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
        current.next.prev = previous;
      }

      this.#length--;
      return current.element;
    } else {
      return null;
    }
  }

  // toString方法会把LinkedList对象转换成一个字符串
  toString() {
    let current = this.#head;
    let str = '';

    while (current) {
      str += current.element + (current.next ? ',' : '');
      current = current.next;
    }
    return str;
  }

  // indexOf方法接收一个元素的值，如果在列表中找到 它，就返回元素的位置，否则返回-1。
  indexOf(element) {
    let current = this.#head;
    let index = -1;
    while (current) {
      index++;
      if (element === current.element) {
        return index;
      }
      current = current.next;
    }
    return -1;
  }
}

/*
循环链表可以像链表一样只有单向引用，也可以像双向链表一样有双向引用。
循环链表和链 表之间唯一的区别在于，最后一个元素指向下一个元素的指针，(tail.next)不是引用null， 而是指向第一个元素(head)。

双向循环链表有指向head元素的tail.next，和指向tail元素的head.prev。
*/
