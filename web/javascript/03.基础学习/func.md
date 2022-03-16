[TOC]

---

### 一、String

#### 1.padStart
#### 2.padEnd

```JS
'hello'.padStart(10); // "     hello"
'hello'.padEnd(10); // "hello     "
```

#### 3.trimStart
#### 4.trimEnd

去除字符串首尾空白字符

#### 5.replaceAll

```JS
const str = 'hello world';
str.replaceAll('l', ''); // "heo word"
```

### 二、Array

#### 1.flat

```JS
[1, 2, [3, 4]].flat(); // [1, 2, 3, 4]

// 你也可以定义一个深度级别，指定一个嵌套的数组结构应该被扁平化的深度
const arr = [0, 1, 2, [[[3, 4]]]];
console.log(arr.flat(2)); // returns [0, 1, 2, [3,4]]
```

#### 2.flatMap

```JS
[1, 2, 3, 4].flatMap(a => [a**2]); // [1, 4, 9, 16]
```

### 三、Object

#### 1.Object.fromEntries

```JS
// 通过 Object.fromEntries， 可以将 Map 转化为 Object:
const map = new Map([ ['foo', 'bar'], ['baz', 42] ]);
console.log(Object.fromEntries(map)); // { foo: "bar", baz: 42 }
```
