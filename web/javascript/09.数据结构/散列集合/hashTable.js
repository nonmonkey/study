/**
散列集合由一个集合构成，但是插入、 移除或获取元素时，使用的是散列函数。
使用散列表来实现散列集合， 不同之处在于，不再添加键值对，而是只插入值而没有键。
例如，可以使用散列集合来存储所有 的英语单词(不包括它们的定义)。和集合相似，散列集合只存储唯一的不重复的值。

有时候，一些键会有相同的散列值。不同的值在散列表中对应相同位置的时候，我们称其为冲突
 */

class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.toString = function () {
      return '[' + this.key + ' - ' + this.value + ']';
    };
  }
}

class HashTable {
  constructor() {}

  #table = [];

  #loseloseHashCode = function (key) {
    var hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  };

  put(key, value) {
    var position = this.#loseloseHashCode(key);
    if (this.#table[position] == undefined) {
      this.#table[position] = new LinkedList();
    }
    this.#table[position].append(new ValuePair(key, value));
  }

  get(key) {
    var position = this.#loseloseHashCode(key);
    if (this.#table[position] !== undefined) {
      // 遍历链表来寻找键/值
      let current = this.#table[position].getHead();
      while(current.next) {
        if (current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      }
      // 检查元素在链表第一个或最后一个节点的情况
      if (current.element.key === key) {
        return current.element.value;
      }
    }
    return undefined;
  }

  remove(key) {
    let position = this.#loseloseHashCode(key);

    if (this.#table[position] !== undefined) {
      let current = this.#table[position].getHead();

      while(current.next) {
        if (current.element.key === key) {
          this.#table[position].remove(current.element);
          if (this.#table[position].isEmpty()) {
            this.#table[position] = undefined;
          }
          return true;
        }
        current = current.next;
      }

      // 检查是否为第一个或最后一个元素
      if (current.element.key === key) {
        this.#table[position].remove(current.element);
        if(this.#table[position].isEmpty()) {
          this.#table[position] = undefined;
        }
        return true;
      }
    }
    return false;
  }
}

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
