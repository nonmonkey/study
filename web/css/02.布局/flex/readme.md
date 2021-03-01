[TOC]
***

### 父元素属性

display: flex;

#### 1.flex-direction

// 方向
flex-direction: row | colum | row-reverse | column-reverse;
	* row	横向(默认)
	* colum	纵向
	* row-reverse	横向，反向
	* column-reverse	横向

#### 2.flex-wrap

指定 flex 元素单行显示还是多行显示 
flex-wrap: nowrap | wrap | wrap-reverse;
	* nowrap	不换行(默认)
	* wrap	自动换行
	* wrap-reverse	自动换行，从下往上排列

#### 3.flex-flow

flex-direction 和 flex-wrap 的简写。
flex-flow
	例: flex-flow: column-reverse wrap;

#### 4.justify-content

属性定义了项目在主轴(或者网格行轴)上的对齐方式

justify-content: flex-start | flex-end | center | space-between | space-around;
* flex-start	从行首开始排列(默认)
* flex-end	从行尾开始排列
* center 	伸缩元素向每行中点排列
* space-between	左右对齐(中间空白区域平均分配，左右无间隙)
* space-around	平均对齐(中间空白区域平均分配，左右各留出二分之一)
* space-evenly	平均对齐(所有空白区域平均分配)

#### 5.align-items

属性定义项目在交叉轴上如何对齐。

> Flexbox和CSS网格布局支持此属性。在Flexbox中，它控制十字轴上项目的对齐方式，在网格布局中，它控制块轴上项目的对齐方式。

* stretch	默认值，弹性元素被在侧轴方向被拉伸到与容器相同的高度或宽度(存在兼容性问题)
* flex-start 
* flex-end
* center
* baseline 项目的第一行文字的基线对齐

#### 6.justify-items

以默认方式沿适当轴线对齐到每个盒子

弹性盒子布局中，该属性被忽略（弹性盒子中对齐的更多信息）；
在块级布局中，会将其包含的项目在其行内轴上对齐；
绝对定位的元素中，会将其包含的项目在其行内轴上对齐，同时考虑 top、left、bottom、right 的值；
表格单元中，该属性被忽略（块级元素、绝对定位元素和表格布局中对齐的更多信息）；
栅格布局中，会将其栅格区域内的项目在其行内轴上对齐（栅格布局中对齐的更多信息）；

justify-items: flex-start | flex-end | center | stretch;
	* stretch	弹性元素被在侧轴方向被拉伸到与容器相同的高度或宽度(存在兼容性问题)

#### 7.align-content

属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用（即：带有 flex-wrap: nowrap）。

* stretch (默认)
* flex-start
* flex-end
* center
* space-between
* space-around
* space-evenly

### 子元素属性

设置了 display: flex; 的元素(父元素)，子元素交叉轴的高度自适应父元素的高度。

#### 1.flex

// flex 是 flex-grow、flex-shrink、flex-basis的集合 默认值是 0 1 auto
flex: 1 | none | auto | 自定义;
	* 1			1 1 0%
	* none	0 0 auto
	* auto	1 1 auto

#### 2.flex-grow

flex-grow 属性决定了父元素在空间分配方向上还有剩余空间时，如何分配这些剩余空间。其值为一个权重（也称扩张因子），默认为 0（纯数值，无单位），剩余空间将会按照这个权重来分配。

比如剩余空间为 x，三个元素的 flex-grow 分别为 a，b，c。设 sum 为 a + b + c。那么三个元素将得到剩余空间分别是 x * a / sum, x * b / sum, x * c / sum，是为权重也。

当所有元素的 flex-grow 之和小于 1 的时候（注意是 1，也就是说每个元素的 flex-grow 都是一个小数如 0.2 这样的），上面式子中的 sum 将会使用 1 来参与计算，而不论它们的和是多少。也就是说，当所有的元素的 flex-grow 之和小于 1 的时候，剩余空间不会全部分配给各个元素。

> 另外，flex-grow 还会受到 max-width 的影响。如果最终 grow 后的结果大于 max-width 指定的值，max-width 的值将会优先使用。同样会导致父元素有部分剩余空间没有分配。

#### 3.flex-shrink

flex-shrink 属性定义空间不够时各个元素如何收缩。其值默认为 1

**flex-shrink总和大于1**

父元素 500px。三个子元素分别设置为 150px，200px，300px。
三个子元素的 flex-shrink 的值分别为 1，2，3。
首先，计算子元素溢出多少：150 + 200 + 300 - 500 = -150px。
那这 -150px 将由三个元素的分别收缩一定的量来弥补。
具体的计算方式为：每个元素收缩的权重为其 flex-shrink 乘以其宽度。
所以总权重为 1 * 150 + 2 * 200 + 3 * 300 = 1450

三个元素分别收缩：

150 * (1(flex-shrink) * 150(width)) / 1450 = -15.5
150 * (2(flex-shrink) * 200(width)) / 1450 = -41.4
150 * (3(flex-shrink) * 300(width)) / 1450 = -93.1


**flex-shrink总和小于1**

同样，当所有元素的 flex-shrink 之和小于 1 时，计算方式也会有所不同：
此时，并不会收缩所有的空间，而只会收缩 flex-shrink 之和相对于 1 的比例的空间。
还是上面的例子，但是 flex-shrink 分别改为 0.1，0.2，0.3。
于是总权重为 145（正好缩小 10 倍，略去计算公式）。
三个元素收缩总和并不是 150px，而是只会收缩 150px 的 (0.1 + 0.2 + 0.3) / 1 即 60% 的空间：90px。

每个元素收缩的空间为：

90 * 0.1(flex-shrink) * 150(width) / 145 = 9.31
90 * 0.2(flex-shrink) * 200(width) / 145 = 24.83
90 * 0.3(flex-shrink) * 300(width) / 145 = 55.86
三个元素的最终宽度分别为：

150 - 9.31 = 140.69
200 - 24.83 = 175.17
300 - 55.86 = 244.14

> 当然，类似 flex-grow，flex-shrink 也会受到 min-width 的影响。

#### 4.flex-basis

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

当一个元素同时被设置了 flex-basis (除值为 auto 外) 和 width (或者在 flex-direction: column 情况下设置了height) , flex-basis 具有更高的优先级.

.item {
  flex-basis: <length> | auto; /* default auto，即项目本来的大小 */
}

#### 5.order

属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

#### 6.align-self

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

align-self: auto | stretch | center | flex-start | flex-end | baseline | initial | inherit;
