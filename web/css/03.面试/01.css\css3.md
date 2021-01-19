[TOC]

---

### 一、css 函数

#### 1.calc

动态计算长度值。
calc()函数支持+, -, \*, /, mod 运算

```CSS
width: calc(100% - 50px);
```

#### 2.attr

CSS 函数 attr()是用来获取被选中元素的属性值，并且在样式文件中使用。它也可以用在伪类元素里，在伪类元素里使用，它得到的是伪元素的原始元素的值。

attr()函数可以和任何 CSS 属性一起使用，但是除了 content 属性外，其余都还是试验性的（简单说就是不稳定，浏览器不一定支持）。

```HTML
<div class="wrap">
  <a href="#" class="btn" data-tip="点击作答">一个按钮</a>
</div>
```

```CSS
.btn {
  display: inline-block;
  padding: 5px 20px;
  border-radius: 4px;
  background-color: #6495ed;
  color: #fff;
  font-size: 14px;
  text-decoration: none;
  text-align: center;
  position: relative;
}
.btn::before {
  content: attr(data-tip);
  width: 80px;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #000;
  color: #ccc;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
  opacity: 0;
  transition: all .3s;
}
.btn::after {
  content: '';
  border: 8px solid transparent;
  border-top: 8px solid #000;
  position: absolute;
  top: -3px;
  left: 50%;
  transform: translate(-50%);
  opacity: 0;
  transition: all .3s;
}
.btn:hover::before {
  top: -40px;
  opacity: 1;
}
.btn:hover::after {
  top: -13px;
  opacity: 1;
}
```

#### 3.min

min() 函数支持一个或多个表达式，每个表达式之间使用逗号分隔，以最小的表达式的值作为返回值，可以使用 min() 为元素设置最大值。

```CSS
.element {
  width: min(50%, 500px)
}
```

#### 4.max

max() 函数以最大值为返回值，语法跟 min() 函数类似。可以使用 max() 函数为元素设置最小值。

```CSS
.element {
  width: max(50%, 500px)
}
```

### 二、@support

CSS 中的@support 主要是用于检测浏览器是否支持 CSS 的某个属性，其实就是条件判断，如果支持某个属性，你可以写一套样式，如果不支持某个属性，你也可以提供另外一套样式作为替补。但是这里有一点需要注意的是：@support 对于浏览器的版本也是有要求的，不是说所有的浏览器以及其所有的版本都是支持@support 的。

```CSS
/* 如果浏览器支持display:flex属性的话，那么div的样式就是display:flex */
@supports (display: flex) { div { display: flex; }}

/* 如果浏览器不支持display:flex属性的话，那么div的样式就是display:right */
@supports not (display: flex) { div { float: right; }}

/* 如果浏览器支持display:flex和box-shadow的属性，就执行里面自己的样式 */
@supports (display: flex) and ( box-shadow: 2px 2px 2px black ) {
/*自己的样式*/
}

/* 如果浏览器支持其中一个就可以执行里面自己的样式 */
@supports (display: -webkit-flex) or (display: -moz-flex) or(display: flex) {
/*自己的样式 */
}

/* “or”和“and”混用，在@supports中“or”和“and”混用时，必须使用括号（）来区分其优先级 */
@supports ((transition-property: color) or (animation-name: foo)) and (transform: rotate(10deg)) {
/*自己的样式 */
}
@supports (transition-property: color) or ((animation-name: foo) and (transform: rotate(10deg))) {
/*自己的样式 */
}

/* “or”、“and” 和 “not” 混用 */
@supports (display: grid) and (not (transition-property: color) or (animation-name: foo)){
/*自己的样式 */
}
```

### 三、media

媒体查询

使用 @media 查询，你可以针对不同的媒体类型定义不同的样式。

@media 可以针对不同的屏幕尺寸设置不同的样式，特别是如果你需要设置设计响应式的页面，@media 是非常有用的。

当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。

**1.准备工作**

```HTML
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

<!-- 让IE的文档模式永远都是最新的 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<!-- screen 他的意思是在告知设备在打印页面时使用衬线字体，在屏幕上显示时用无衬线字体。但是目前我发现很多网站都会直接省略screen,因为你的网站可能不需要考虑用户去打印时 -->
```

**2.CSS 的写法**

```CSS
/* 当页面小于960px的时候执行它下面的CSS */
@media screen and (max-width: 960px) {
  body {
    background: #000;
  }
}

/* 当页面大于960px的时候执行它下面的CSS */
@media screen and (min-width: 960px) {
  body {
    background: #000;
  }
}

/* 混合使用 */
@media screen and (min-width: 600px) and (max-width: 960px) {
  body {
    background: #000;
  }
}
```

**3.参数汇总**
width:浏览器可视宽度。

height:浏览器可视高度。

device-width:设备屏幕的宽度。

device-height:设备屏幕的高度。

orientation:检测设备目前处于横向还是纵向状态。

aspect-ratio:检测浏览器可视宽度和高度的比例。(例如：aspect-ratio:16/9)

device-aspect-ratio:检测设备的宽度和高度的比例。

color:检测颜色的位数。（例如：min-color:32 就会检测设备是否拥有 32 位颜色）

color-index:检查设备颜色索引表中的颜色，他的值不能是负数。

monochrome:检测单色楨缓冲区域中的每个像素的位数。（这个太高级，估计咱很少会用的到）

resolution:检测屏幕或打印机的分辨率。(例如：min-resolution:300dpi 或 min-resolution:118dpcm)。

grid：检测输出的设备是网格的还是位图设备。

### 四、rem、em、vh、px

#### 1.rem

rem 是全部的长度都相对于根元素<html>元素。通常做法是给 html 元素设置一个字体大小，然后其他元素的长度单位就为 rem。

#### 2.em

子元素字体大小的 em 是相对于父元素字体大小
元素的 width/height/padding/margin 用 em 的话是相对于该元素的 font-size

#### 3.vw、vh

全称是 Viewport Width 和 Viewport Height，视窗的宽度和高度，相当于 屏幕宽度和高度的 1%，不过，处理宽度的时候%单位更合适，处理高度的 话 vh 单位更好。

#### 4.px

px 像素（Pixel）。相对长度单位。像素 px 是相对于显示器屏幕分辨率而言的。

一般电脑的分辨率有{1920\*1024}等不同的分辨率

1920\*1024 前者是屏幕宽度总共有 1920 个像素,后者则是高度为 1024 个像素

### 五、清除浮动

- 定义 clear 类，使用伪元素:after,并把 clear 类附给浮动元素的父级元素
  .clear:after{display: block;clear: both;content:”.”;visibility: hidden;height:0;}

- 使用 overflow:hidden， 定义 clear 类，并把 clear 类附给浮动元素的父级元素
  .clear{display:block;overflow:hidden;}

- 在浮动元素后面（同级元素）添加一个空的 div，并且定义一个 clear 类，附给该 div
  .clear{clear:both;}

- 创建父级 BFC

### 六、BFC

BFC （块级格式化上下文），是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

#### 1.触发条件

- 根元素(html)
- position: absolute / fixed
- display: inline-block / table / flex
- float: left / right
- overflow !== visible

#### 2.规则

- 属于同一个 BFC 的两个相邻 Box 垂直排列
- 属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
- BFC 的区域不会与 float 的元素区域重叠
- 计算 BFC 的高度时，浮动子元素也参与计算
- margin 不会传递给父级(未设置 border)

#### 3.主要用途

- 清除浮动
- 防止 margin 重叠
