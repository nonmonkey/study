[TOC]
***

### 一、什么是JSX

- Facebook起草的js扩展语法
- 本质是一个js对象，会被babel编译，最终会被转换为React.createElement
- 每个JSX表达式，有且只有一个根节点（可以传入一个空节点作为根节点，这是一个语法糖，相当于<React.Fragment>，例如：）
- 每一个jsx元素必须闭合(xml规范)

```JS
var dom = (
  <>
    <h1>this is h1 <span>span</span></h1>
    <div>this is div</div>
  </>
)
/*
var dom = (
  <React.Fragment>
    <h1>this is h1 <span>span</span></h1>
    <div>this is div</div>
  </React.Fragment>
)
*/
ReactDOM.render(
  dom,
  document.getElementById('root')
);
```

### 二、在jsx中嵌入表达式

- 使用注释要用js注释
- 将表达式作为内容的一部分
  - null,undefined,false,true不会显示
  - 普通对象不能作为子元素
  - 可以放置React元素对象
  - 数组，遍历数组，并把每一项嵌入页面
- 将表达式作为元素的属性
- 属性名要用小驼峰
- 防止注入攻击
  - 自动编码(相当于文本通过innerText嵌入页面)
  - dangerouslySetInnerHTML

```js
// 变量
const a = 1234, b = 2345;
var dom = (
  <div>
    {a} + {b} = { a + b }
  </div>
)
// 相当于
const a = 1234, b = 2345;
var dom = React.createElement('div', null, `${a} + ${b} = ${a + b}`);
```

```js
// 内联样式（第一个{}表示属性，第二个{}表示对象）
var dom = (
  <img
    src={src}
    style={{
      width: '200px',
      height: '200px',
      border: '1px solid black'
    }}
    alt=""/>
)
```

```js
// dangerouslySetInnerHTML 需要使用字符串形式的html内容
var content = '<div>gfjewbfw <span>fhew分为而分为</span></div>';
var dom = <div dangerouslySetInnerHTML={{
  __html: content
}}></div>;
```

### 三、元素的不可变性

- 虽然jsx元素是一个对象，但是该对象中的所有属性不可变性（使用Object.freeze冻结了）
- 如果确实需要更改元素的属性，需要重新创建jsx元素。
