[TOC]
***

### 一、简介
MutationObserver给开发者们提供了一种能在某个范围内的DOM树发生变化时作出适当反应的能力.该API设计用来替换掉在DOM3事件规范中引入的Mutation事件

在概念上它很接近事件。可以理解为，当DOM发生变动，会触发Mutation Observer事件。但是，他与事件有一个本质不同：事件是同步触发，也就是说，当dom发生变动，当DOM发生变动，立即会触发相应事件；Mutation Observer则是异步触发，DOM发生变动之后，并不会马上触发，而是要等到当前所有的DOM操作都结束之后才会触发。

这种设计是为了应付DOM变动频繁的特点。举例来说，如果在文档中连续插入1000个段落(p元素)，就会连续触发1000个插入事件，执行每个事件的回调函数，这很可能造成浏览器的卡顿；但Mutation Observer完全不同，只有1000个段落都插入结束之后才会触发，而且只触发一次。

Mutaiton Observer有以下特点：
* 它等待所有脚本任务完成后，才会运行，即采用异步方式。
* 它把DOM变动记录封装成一个数组进行处理，而不是一条条地个别处理DOM变动
* 它既可以观察发生在DOM的所有类型变动，也可以观察某一类变动。

```JS
// 判断是否支持
var MutationObserver = window.MutationObserver
  || window.WebKitMutationObserver
  || window.MozMutationObserver;
 
var observeMutationSupport = !!MutationObserver;
```

### 二、配置

**config**
* childList	观察目标节点的子节点(增, 删),则设置为true.
* attributes	观察目标节点的属性节点(增，删,改)设为true.
* characterData	如果目标节点为characterData节点(一种抽象接口,具体可以为文本节点,注释节点,以及处理指令节点)时,也要观察该节点的文本内容是否发生变化,则设置为true.
* subtree	观察目标节点所包含的整棵DOM树上的上述三种节点变化,则设置为true.
* attributeOldValue	在attributes属性已经设为true的前提下,如果需要将发生变化的属性节点之前的属性值记录下来(记录到下面MutationRecord对象的oldValue属性中),则设置为true.
* characterDataOldValue	在characterData属性已经设为true的前提下,如果需要将发生变化的characterData节点之前的文本内容记录下来(记录到下面MutationRecord对象的oldValue属性中),则设置为true.
* attributeFilter	一个属性名数组(不需要指定命名空间),只有该数组中包含的属性名发生变化时才会被观察到,其他名称的属性发生变化后会被忽略.

### 三、API
```JS
// 创建观察者对象
var observer = new MutationObserver(function(MutationRecord, target) { // 变动数组 观察器实例
  // 指定的DOM节点(目标节点)发生变化时被调用
  MutationRecord.forEach(function(mutation) {
    console.log(mutation);
  });
});
var ele = document.querySelector('article');
var config = {
  'childList': true,
  'attributes':true
};
// 当前观察者对象注册需要观察的目标节点
// config 指定要观察的DOM变化类型.
observer.observe(ele, config);

// takeRecords返回已检测到但尚未由观察者的回调函数处理的所有匹配DOM更改的列表，使变更队列保持为空。 此方法最常见的使用场景是在断开观察者之前立即获取所有未处理的更改记录，以便在停止观察者时可以处理任何未处理的更改。
var mutations = observer.takeRecords();
if (mutations) {
  callback(mutations);
}

// 你还可以停止观察
observer.disconnect();
```
