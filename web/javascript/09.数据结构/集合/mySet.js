class MySet {
  constructor() {}

  #container = {};

  size() {
    return Object.keys(this.#container).length;
  }

  has(value) {
    return this.#container.hasOwnProperty(value);
  }

  add(value) {
    if (!this.has(value)) {
      this.#container[value] = value;
      return true;
    }
    return false;
  }

  remove(value) {
    if (this.has(value)) {
      delete this.#container[value];
      return true;
    }
    return false;
  }

  clear() {
    this.#container = {};
  }

  values() {
    let values = [];
    for (let key in this.#container) {
      if (Object.prototype.hasOwnProperty.call(this.#container, key)) {
        values.push(this.#container[key]);
      }
    }
    return values;
  }

  static union(...setArr) {
    let unionSet = new MySet();

    for (let i = 0; i < setArr.length; i++) {
      let s = setArr[i];
      if (!(s instanceof MySet)) continue;

      let values = setArr[i].values();
      console.log('values;', values);
      for (let j = 0; j < values.length; j++) {
        console.log(values[i], unionSet.add(values[j]));
      }
    }
    return unionSet;
  }

  static intersection(...setArr) {
    let arr = setArr.filter((s) => s instanceof MySet);
    let minSize = Number.MAX_SAFE_INTEGER;
    let index = -1;
    arr.forEach((s, i) => {
      let size = s.size();
      if (size < minSize) {
        minSize = size;
        index = i;
      }
    });
    let baseSet = arr[index].values();
    let intersectionSet = new MySet();

    for (let i = 0; i < minSize; i++) {
      let val = baseSet[i];
      let has = true;
      for (let j = 0; j < arr.length; j++) {
        if (!arr[j].has(val)) {
          has = false;
          break;
        }
      }
      if (has) intersectionSet.add(val);
    }

    return intersectionSet;
  }

  static difference(source, target) {
    let differenceSet = new MySet();

    let values = source.values();
    for (let i = 0; i < values.length; i++) {
      if (!target.has(values[i])) differenceSet.add(values[i]);
    }
    return differenceSet;
  }

  static subset(source, target) {
    if (source.size() < target.size()) {
      return false;
    } else {
      let values = target.values();
      for (let i = 0; i < values.length; i++) {
        if (!source.has(values[i])) {
          return false;
        }
      }
      return true;
    }
  }
}

/*
// set实现交集，并集，差集
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
*/
