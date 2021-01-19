[TOC]
***

### 一、简介

id 选择器，class 选择器，属性选择器，标签选择器，伪元素选择器，伪类选择器等

!important > 行间样式 > id > class == 属性选择器 > 标签 > 通配符 
计算权重时，所有权重值相加即可。 
/!important优先级最高/示例： 
div{ 
background-color: green !important; 
}

css权重（256进制） 
!important infinity（正无穷）（计算机中 正无穷 +1 > 正无穷） 
行间样式 1000 
id 100 
class|属性|伪类 10 
标签|伪元素 1 
通配符 0

### 二、详解

伪元素顾名思义伪装成元素，但不是元素，这与生成内容相关。生成内容主要指由浏览器创建的内容，而不是由标志或内容来表示。生成内容主要由:before和:after伪元素来实现，当然伪元素还包括:first-line,:first-letter和::selection

#### 1.伪元素

```CSS
/* Typographic Pseudo-elements */
::first-line            /* 选取文字块首行字符 */
::first-letter          /* 选取文字块首行首个字符 */

/* Highlight Pseudo-elements */
::selection             /* 选取文档中高亮(反白)的部分*/
::inactive-selection    /* 选取非活动状态时文档中高亮(反白)的部分*/
::spelling-error        /* 选取被 UA 标记为拼写错误的文本 */
::grammar-error         /* 选取被 UA 标记为语法错误的文本 */

/* Tree-Abiding Pseudo-elements */
::before                /* 在选中元素中创建一个前置的子节点 */
::after                 /* 在选中元素中创建一个后置的子节点 */
::marker                /* 选取列表自动生成的项目标记符号 */
::placeholder           /* 选取字段的占位符文本(提示信息) */

/* WebVTT Format */
::cue                   /* 匹配所选元素中 WebVTT 提示 */

/* Fullscreen API */
::backdrop              /* 匹配全屏模式下的背景 */
```

##### 1) content属性详解

content:normal;(默认)
content:<string>|<uri>|attr(<identifier>)

1. 文本
[注意1]如果希望生成内容中有一个换行，则需要使用\A
[注意2]若是一个很长的串，需要它拆分成多行则需要用\对换行符转义
```CSS
div::before{
    content: "第一段\
              第二段";
}
div::after{
    content:"\A后缀";
}
```

2. url
```CSS
div::before{
  content: url("arrow.gif");
}
```

3. attr(<identifier>)
```CSS
div::before{
  content: attr(data-before);
}
```
```HTML
<div data-before="前缀">
  我是测试文字
</div>
```

4. open-quote|close-quote|no-open-quote|no-close-quote
```HTML
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="utf-8" />
    <title>CSS参考手册</title>
    <style>
      div {
        display: inline-block;
        quotes: '<' '>' '《' '》' '{' '}';
      }
      div:before {
        content: open-quote;
      }
      div:after {
        content: no-close-quote;
      }
    </style>
  </head>
  <body>
    <div>
      最外层
      <div>
        次外层
        <div>最里层</div>
      </div>
    </div>
  </body>
</html>
```

5. counter

* counter-reset: 主要功能是用来标识计数器的作用域的。它只能作用于选择器上，它的值包括两部分：第一部分为计数器的名字；第二部分为计数器的起始值（默认为0），counter-reset还可以同时声明多个计数器
* counter-increment: 表明计数器实际用到的范围 。他的值也包括两部分：第一个为计数器的名字，即counter-reset设置好的名字，第二个值标识递增的值（默认为1）

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    dl {
      counter-reset: title1 0;
    }
    dt {
      counter-reset: title2 0;
    }
    dt::before {
      counter-increment: title1 1;
      content: counter(title1)"、";
    }
    dd {
      counter-increment: title2;
    }
    dd::before {
      content: counter(title1)"-"counter(title2)"、";
    }
  </style>
</head>
<body>
  <dl>
    <dt>example</dt>
    <dd>example</dd>
    <dd>example</dd>
    <dd>example</dd>
    <dt>example2</dt>
    <dd>example2</dd>
    <dd>example2</dd>
    <dd>example2</dd>
    <dd>example2</dd>
  </dl>
</body>
</html>
```

#### 2.伪类选择器

Pseudo-Classes Selectors(伪类选择器)

　　E:not(s)　　E:root　　E:target

　　E:first-child　　E:last-child　　E:only-child　　E:nth-child(n)　　E:nth-last-child(n)   

这上面一行的选择器，都会考虑其他元素的的影响。

　　E:first-of-type　　E:last-of-type　　E:only-of-type　　E:nth-of-type(n)　　E:nth-of-last-type(n)   

这上面的选择器，不会考虑其他元素的的影响。

　　E:empty　　E:checked　　E:enabled　　E:disabled

　　E:read-only　　E:read-write

```CSS
选中元素的状态，要按照以下顺序写：
1）:link // 超链接未访问时的状态
2）:visited // 超链接访问过后的状态
3）:hover // 鼠标悬停状态
4）:active // 鼠标按下时的状态

:root//跟标签选择器
li:not([class*='item'])//否定选择器，除去此种类型
:empty//空标签选择器
.item:target//用来匹配被location.hash选中的元素（即锚点元素）
li:first-child//第一个子元素，并且是li元素（相对于所有父级）
li:last-child//最后一个
li:nth-child(1)//第一个，下标从1开始
li:nth-child(2n+1)//奇数
li:nth-child(odd)//奇数
li:nth-child(2n)//偶数
li:nth-child(even)//偶数
li:nth-last-child(2)//倒数第二个
li:first-of-type//同一类型的即可
li:last-of-type
li:nth-of-type(1)
li:nth-last-of-type(1)
li:only-child//唯一子元素选择器
li:only-of-type//唯一类型（该类型只有一个）
li:enabled//可用
li:disabled//不可用
input:checked//被选中
input:read-only//只读
input:read-write//可读可写
```
