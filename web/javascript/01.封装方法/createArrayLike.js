class CreateArrayLike {
  constructor(arr = []) {
    for (let i in arr) {
      this[i] = arr[i];
    }
    this._length = arr.length;
  }

  *[Symbol.iterator]() {
    let curIndex = 0;
    while (curIndex != this.length) {
      yield this[curIndex];
      curIndex++;
    }
  }

  get length() {
    return this._length;
  }

  set length(value) {
    if (value >= 0 && Number.isInteger(+value) && value < Math.pow(2, 32)) {
      if (value < this.length) {
        for (let i = value; i < this.length; i++) {
          delete this[i];
        }
      }
      this._length = value;
    } else {
      throw new RangeError("Invalid array length");
    }
  }
}

[
  "concat",
  "copyWithin",
  "fill",
  "find",
  "findIndex",
  "lastIndexOf",
  "pop",
  "push",
  "reverse",
  "shift",
  "unshift",
  "slice",
  "sort",
  "splice",
  "includes",
  "indexOf",
  "join",
  "keys",
  "entries",
  "values",
  "forEach",
  "filter",
  "flat",
  "flatMap",
  "map",
  "every",
  "some",
  "reduce",
  "reduceRight",
  "toLocaleString",
  "toString",
].forEach((func) => (CreateArrayLike.prototype[func] = Array.prototype[func]));

// class CreateArrayLike {
//   constructor(arr = []) {
//     this.length = 0;
//     for (let i of arr) {
//       this.push(i);
//     }
//   }

//   *[Symbol.iterator]() {
//     let curIndex = 0;
//     while (curIndex != this.length) {
//       yield this[curIndex];
//       curIndex++;
//     }
//   }
// }

// [
//   "concat",
//   "copyWithin",
//   "fill",
//   "find",
//   "findIndex",
//   "lastIndexOf",
//   "pop",
//   "push",
//   "reverse",
//   "shift",
//   "unshift",
//   "slice",
//   "sort",
//   "splice",
//   "includes",
//   "indexOf",
//   "join",
//   "keys",
//   "entries",
//   "values",
//   "forEach",
//   "filter",
//   "flat",
//   "flatMap",
//   "map",
//   "every",
//   "some",
//   "reduce",
//   "reduceRight",
//   "toLocaleString",
//   "toString",
// ].forEach((func) => (CreateArrayLike.prototype[func] = Array.prototype[func]));

// export default function (arr = []) {
//   return new Proxy(new CreateArrayLike(arr), {
//     set(target, key, value, receiver) {
//       if (key === "length") {
//         if (value >= 0 && Number.isInteger(+value) && value < Math.pow(2, 32)) {
//           if (value < target.length) {
//             target.splice(value);
//           }
//         } else {
//           throw new RangeError("Invalid array length");
//         }
//       }
//       return Reflect.set(target, key, value, receiver);
//     },
//   });
// }
