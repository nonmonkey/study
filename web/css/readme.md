[TOC]
***

### 一、分析比较opacity: 0; visibility: hidden; display: none; 优劣和适用场景。

* 结构
display: none; 会让元素完全从渲染树中消失，渲染的时候不占据任何空间，不能点击。
visibility: hidden; 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击。
opacity: 0; 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击。

* 继承
display: none; 是非继承属性，子孙节点消失于。由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。
visibility: hidden; 是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible; 可以让子孙节点显示。
opacity: 0; 修改opacity无法让元素可见。

* 性能
display: none; 修改元素会造成文档回流，读屏器不会读取display: none; 元素内容，性能消耗较大。
visibility: hidden; 修改元素只会造成本元素的重绘，性能消耗较小，读屏器读取visibility: hidden; 元素内容。
opacity: 0; 修改元素会造成重绘，性能消耗较小。

### 二、css sprite是什么，有什么优缺点

1. 概念
将多个小图片拼接到一个图片中，通过background-position和元素尺寸调节需要显示的背景图案。

2. 优点
减少HTTP请求数，极大提高了页面加载速度
增加图片信息重复度，提高压缩比，减少图片大小
更换风格方便，只需要在一张或几张图片上修改颜色或样式即可实现。

3. 缺点
图片合并麻烦
维护麻烦，修改一个图片可能需要重新布局整个图片，样式。

### 三、link与@import区别

1. link是HTML方式，@import是CSS方式
2. link最大限度支持并行下载，@import过多嵌套导致串行下载，出现FOUC
3. link可以通过rel="alternate stylesheet"指定候选样式。
4. 浏览器对link支持早于@import，可以使用@import对老浏览器隐藏样式
5. @import必须在样式规则之前，可以在CSS文件中引用其他文件
6. 总体来说link优于@import。

### 四、display: block; 和 display: inline; 区别

#### 1.block元素特点
1. 处于常规流中时，如果width没有设置，会自动填充满父容器
2. 可以应用margin、padding
3. 在没有设置高度的情况下会扩展高度以包含常规流中的子元素。
4. 处于常规流中布局时，在前后元素位置之间（独占一个水平空间）
5. 忽略vertical-align

#### 2.inline元素特点
1. 水平方向上根据direction依次布局
2. 不会在元素前后进行换行
3. 受white-space控制
4. margin、padding在垂直方向上无效，水平方向上有效
5. width、height属性对非替换行内元素无效，宽度由元素内容决定。
6. 非替换行内元素的行高由line-height确定，替换行内元素的行高由height，margin，padding，border决定（替换行内元素：\<input\> 、\<textarea\>、 \<select\>、 \<object\>、\<iframe\> 和 \<video\> 等等）
7. 浮动或绝对定位时，会转换为block
8. vertical-align属性生效

### 五、png、gif、jpg的区别及如何选

#### 1.GIF
1. 8位像素，256色
2. 无损压缩
3. 支持简单动画
4. 支持boolean透明
5. 适合简单动画

#### 2.JPEG
1. 颜色限于256
2. 有损压缩
3. 可控制压缩质量
4. 不支持透明
5. 适合照片

#### 3.PNG
1. 有PNG8和truecolor PNG
2. PNG8类似GIF颜色上限为256，文件大小，支持alpha透明度，无动画
3. 适合图标、背景、按钮
