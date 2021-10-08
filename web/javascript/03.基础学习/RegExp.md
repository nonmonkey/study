[TOC]

---

### 一、每三位数字加一个'.'

```JS
var str = "100000000000000";
var reg = /(?=(\B)(\d{3})+$)/g;
console.log(str.replace(reg, ".")); //100.000.000.000.000
console.log(str.replace(/\B(?=(\d{3})+$)/g, ".")); //100.000.000.000.000
```
