[TOC]
---

### 一、calc

此 calc()函数用一个表达式作为它的参数，用这个表达式的结果作为值。这个表达式可以是任何如下操作符的组合，采用标准操作符处理法则的简单表达式。

* \+ 加法。
* \- 减法。
* \* 乘法，乘数中至少有一个是 \<number\>。
* \/ 除法，除数（/ 右面的数）必须是 \<number\>。

```CSS
width: calc(100% - 80px);
font-size: calc(100vw/5 + 1rem - 100px)
```

### 二、max、min
max\min() 这个CSS函数让你可以从一个逗号分隔的表达式列表中选择最大\小（正方向）的值作为属性的值 .
max() 可以用于以下场合 \<length>, \<frequency>, \<angle>, \<time>, \<percentage>, \<number>, 或 \<integer> 。

```CSS
  width: max(10% + 20px, 300px);
```

### 三、clamp

clamp() 函数的作用是把一个值限制在一个上限和下限之间，当这个值超过最小值和最大值的范围时，在最小值和最大值之间选择一个值使用。
clamp() 可以用于以下场合 \<length>, \<frequency>, \<angle>, \<time>, \<percentage>, \<number>, 或 \<integer> 。

```CSS
.item {
  font-size: clamp(20px, 18px, 40px); 
  width: clamp(100px, 100%, 200px);
}
```

### 四、attr
用来获取元素的属性值，目前只能在content处使用

```HTML
<div data-name="abc" title="123"></div>
```
```CSS
div:after {
  content: attr(data-name)  attr(title);
}
```
