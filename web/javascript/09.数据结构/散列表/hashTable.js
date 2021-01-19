/*
HashTable类，也叫HashMap类，它是Dictionary类的一种散列表
实现方式。
散列算法的作用是尽可能快地在数据结构中找到一个值。如果要在数据结构中获得一个值(使用get方法)，需要遍历整个数据结构来找到它。
如果使用散列函数，就知道值的具体位置，因此能够快速检索到该值。散列函数的作用是给定一个键值，然后 返回值在表中的地址。
*/

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
    return (this.#table[this.#loseloseHashCode(key)] = value);
  }

  get(key) {
    return this.#table[this.#loseloseHashCode(key)];
  }

  remove(key) {
    this.#table[this.#loseloseHashCode(key)] = undefined;
  }
}

// hash值可能会有冲突。
// 解决冲突：当想向表中某个位置加入一个新元素的时候，如果索引 为index的位置已经被占据了，就尝试index+1的位置。
// 如果index+1的位置也被占据了，就尝试 index+2的位置，以此类推。

class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return '[' + this.key + ' - ' + this.value + ']';
  }
}

class HashTable1 {
  constructor() {}

  #table = [];
  #maxIndex = 36;

  #changeMaxIndex = function (i, flag = true) {
    // flag: 1)true 新增项. 2)false 删除项
    if (flag) {
      if (i > this.#maxIndex) this.#maxIndex = i;
    } else {
      if (i === this.#maxIndex && this.#maxIndex > 36) {
        while (--this.#maxIndex && this.#maxIndex > 36) {
          if (this.#table[this.#maxIndex] !== undefined) {
            this.#table.length = this.#maxIndex + 1;
            return;
          }
          this.#table.length = 36;
        }
      }
    }
  };

  #loseloseHashCode = function (key) {
    var hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  };

  // 还是存在问题：有重复的key值
  put(key, value) {
    var position = this.#loseloseHashCode(key);
    if (this.#table[position] === undefined) {
      this.#changeMaxIndex(position, true);
      return (this.#table[position] = new ValuePair(key, value));
    } else {
      let index = ++position;
      while (this.#table[index] !== undefined) {
        index++;
      }
      this.#changeMaxIndex(index, true);
      return (this.#table[index] = new ValuePair(key, value));
    }
  }

  get(key) {
    let position = this.#loseloseHashCode(key);

    if (this.#table[position] !== undefined && this.#table[position].key === key) {
      return this.#table[position].value;
    } else {
      let index = ++position;
      while ((this.#table[index] === undefined || this.#table[index].key !== key) && index <= this.#maxIndex) {
        index++;
      }
      if (this.#table[index].key === key) {
        return this.#table[index].value;
      }
    }
    return undefined;
  }

  remove(key) {
    let position = this.#loseloseHashCode(key);

    if (this.#table[position] !== undefined && this.#table[position].key === key) {
      this.#table[position] = undefined;
      this.#changeMaxIndex(position, false);
      return true;
    } else {
      let index = ++position;
      while ((this.#table[index] === undefined || this.#table[index].key !== key) && index <= this.#maxIndex) {
        index++;
      }
      if (this.#table[index].key === key) {
        this.#table[index] = undefined;
        this.#changeMaxIndex(index, false);
        return true;
      }
    }
    return false;
  }
}

/*
创建更好的散列函数
  我们实现的“lose lose”散列函数并不是一个表现良好的散列函数，因为它会产生太多的冲 突。
  如果我们使用这个函数的话，会产生各种各样的冲突。一个表现良好的散列函数是由几个方 面构成的:插入和检索元素的时间(即性能)，
  当然也包括较低的冲突可能性。我们可以在网上 找到一些不同的实现方法，或者也可以实现自己的散列函数。
  另一个可以实现的比“lose lose”更好的散列函数是djb2:
  var djb2HashCode = function (key) {
    var hash = 5381; //{1}
    for (var i = 0; i < key.length; i++) { //{2}
      hash = hash * 33 + key.charCodeAt(i); //{3}
    }
    return hash % 1013; //{4}
  };
  它包括初始化一个hash变量并赋值为一个质数(行{1}——大多数实现都使用5381)，然后 6 迭代参数key(行{2})，
  将hash与33相乘(用来当作一个魔力数)，并和当前迭代到的字符的ASCII 码值相加(行{3})。
 最后，我们将使用相加的和与另一个随机质数(比我们认为的散列表的大小要大——在本例 中，我们认为散列表的大小为1000)相除的余数。
*/
