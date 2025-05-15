[TOC]

---

Grid 布局的属性分成两类。一类定义在容器上面，称为容器属性；另一类定义在项目上面，称为项目属性。这部分先介绍容器属性。

### 一、父元素的属性

display: grid;  // 容器元素都是块级元素
display: inline-grid; // 容器元素都是行内元素
grid: 是grid-template-rows、grid-template-columns、grid-template-areas、 grid-auto-rows、grid-auto-columns、grid-auto-flow这六个属性的合并简写形式。

grid-template-rows: 属性定义每一行的行宽
grid-template-columns: 属性定义每一列的列宽
grid-template-areas: 网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成，如果某些区域不需要利用，则使用"点"（.）表示。
grid-template: 是grid-template-columns、grid-template-rows和grid-template-areas 这三个属性的合并简写形式。

grid-row-gap: 属性设置行与行的间隔（行间距）
grid-column-gap: 属性设置列与列的间隔（列间距）
grid-gap: grid-column-gap和grid-row-gap的合并简写形式

grid-auto-flow: 划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是row，"先行后列"；也可以将它设成column，变成"先列后行"；row dense 表示"先行后列"，并且尽可能紧密填满，尽量不出现空格

justify-items: 属性设置单元格内容的水平位置（左中右）start | end | center | stretch(默认);
align-items: 属性设置单元格内容的垂直位置（上中下）start | end | center | stretch(默认)。
place-items: align-items属性和justify-items属性的合并简写形式。

justify-content: 属性是整个内容区域在容器里面的水平位置（左中右）start | end | center | stretch | space-around | space-between | space-evenly;
align-content: 属性是整个内容区域的垂直位置（上中下）start | end | center | stretch | space-around | space-between | space-evenly;。
place-content: 属性是align-content属性和justify-content属性的合并简写形式。

```CSS
.container {
  display: grid;
  grid-template-rows: 100px 100px 100px;
  grid-template-columns: 100px 100px 100px;
}

.container {
  display: grid;
  grid-template-rows: 33.33% 33.33% 33.33%;
  grid-template-columns: 33.33% 33.33% 33.33%;
}

/* 重复写值 同上 */
.container {
  display: grid;
  grid-template-rows: repeat(3, 33.33%);
  grid-template-columns: repeat(3, 33.33%);
}

/* 尽可能多的容纳单元格 */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
}

/* fr关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍。 */
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* minmax()函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。 */
.container {
  display: grid;
  grid-template-columns: 1fr 1fr minmax(300px, 1fr);
}

/* auto关键字表示由浏览器自己决定长度。 */
.container {
  display: grid;
  grid-template-columns: 100px auto 100px;
}
```

> 根据最新标准，上面三个属性名的grid-前缀已经删除，grid-column-gap和grid-row-gap写成column-gap和row-gap，grid-gap写成gap。

```CSS
.container {
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}

/* 等价于 */
.container {
  grid-gap: 20px 20px;
}

/* 划分出9个单元格，然后将其定名为a到i的九个区域，分别对应这九个单元格。 */
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: 'a b c'
                       'd e f'
                       'g h i';
}
```

### 二、子元素的属性

项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线。

grid-column-start: 属性：左边框所在的垂直网格线
grid-column-end: 属性：右边框所在的垂直网格线
grid-row-start: 属性：上边框所在的水平网格线
grid-row-end: 属性：下边框所在的水平网格线

grid-column: 属性是grid-column-start和grid-column-end的合并简写形式
grid-row: 属性是grid-row-start属性和grid-row-end的合并简写形式。

grid-area: 属性指定项目放在哪一个区域。
grid-area: 属性还可用作grid-row-start、grid-column-start、grid-row-end、grid-column-end的合并简写形式，直接指定项目的位置。

justify-self: 属性设置单元格内容的水平位置（左中右），跟justify-items属性的用法完全一致，但只作用于单个项目。
align-self: 属性设置单元格内容的垂直位置（上中下），跟align-items属性的用法完全一致，也是只作用于单个项目。
place-self: 属性是align-self属性和justify-self属性的合并简写形式。

```CSS
.item-1 {
  grid-column-start: 2;
  grid-column-end: 4;
}

.item-1 {
  grid-column-start: header-start;
  grid-column-end: header-end;
}

/* span关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。 */
.item-1 {
  grid-column-start: span 2;
}

.item-1 {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}
/* 等同于 */
.item-1 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}

.item-1 {
  background: #b03532;
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
/* 等同于 */
.item-1 {
  background: #b03532;
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
}

.item-1 {
  grid-area: e;
}

.item-1 {
  grid-area: 1 / 1 / 3 / 3;
}
```
