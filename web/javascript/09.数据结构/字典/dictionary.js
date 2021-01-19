/**
在字典中，存储的是[键，值] 对，其中键名是用来查询特定元素的。
字典和集合很相似，集合以[值，值]的形式存储元素，字 典则是以[键，值]的形式来存储元素。字典也称作映射。
 */
class Dictionary {
  constructor() {}

  #container = {};

  size() {
    return this.keys().length;
  }

  getItems() {
    return this.#container;
  }

  has(key) {
    return Object.prototype.hasOwnProperty.call(this.#container, key);
  }

  set(key, value) {
    this.#container[key] = value;
  }

  get(key) {
    return this.#container[key];
  }

  delete(key) {
    if (this.has(key)) {
      delete this.#container[key];
      return true;
    }
    return false;
  }

  keys() {
    return Object.keys(this.#container);
  }

  values() {
    let values = [];
    for (let k in this.#container) {
      if (this.#container.hasOwnProperty(k)) {
        values.push(this.#container[k]);
      }
    }
    return values;
  }

  clear() {
    let keys = this.keys();
    for (let i = 0; i < keys.length; i++) {
      this.delete(keys[i]);
    }
  }
}

/**
 * Map(es6)
 */
var map = new Map();
map.set('Gandalf', 'gandalf@email.com');
map.set('John', 'johnsnow@email.com');
map.set('Tyrion', 'tyrion@email.com');
console.log(map.has('Gandalf')); //输出true 
console.log(map.size); //输出3
console.log(map.keys()); //输出["Gandalf", "John", "Tyrion"]
console.log(map.values()); //输出["gandalf@email.com", "johnsnow@email.com", "tyrion@email.com"]
console.log(map.get('Tyrion')); //输出tyrion@email.com


/*
  除了Set和Map这两种新的数据结构，ES6还增加了它们的弱化版本，WeakSet和WeakMap。 
  基本上，Map和Set与其弱化版本之间仅有的区别是:
  WeakSet或WeakMap类没有entries、keys和values等方法;

  创建和使用这两个类主要是为了性能。WeakSet和WeakMap是弱化的(用对象作为键)，没有强引用的键。这使得JavaScript的垃圾回收器可以从中清除整个入口。
  另一个优点是，必须用键才可以取出值。这些类没有entries、keys和values等迭代器方 法，因此，除非你知道键，否则没有办法取出值。
  这印证了我们在第3章的做法，即使用WeakMap 类封装ES6类的私有属性
*/
