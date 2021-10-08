[TOC]

---

### 一、Nullish coalescing Operator(空值处理)

判断null和undefined时取后一值。

```JS
let user = {
  u1: 0,
  u2: false,
  u3: null,
  u4: undefined
  u5: '',
}
let u2 = user.u2 ?? '用户2'  // false
let u3 = user.u3 ?? '用户3'  // 用户3
let u4 = user.u4 ?? '用户4'  // 用户4
let u5 = user.u5 ?? '用户5'  // ''
```

### 二、Optional chaining（可选链）

```JS
let user = {}
let u1 = user.childer.name // TypeError: Cannot read property 'name' of undefined
let u1 = user.childer?.name // undefined
```

### 三、正则表达式命名捕获组

```JS
const reg = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
const match = reg.exec('2021-02-23');
```

### 四、globalThis

浏览器：window
worker：self
node：global

### 五、逻辑运算符和赋值表达式

```JS
a ||= b
//等价于
a = a || (a = b)

a &&= b
//等价于
a = a && (a = b)

a ??= b
//等价于
a = a ?? (a = b)
```

### 六、数字分隔符

```JS
const money = 1_000_000_000;
//等价于
const money = 1000000000;
1_000_000_000 === 1000000000; // true
```
