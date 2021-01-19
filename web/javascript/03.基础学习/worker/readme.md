[TOC]
***

### 一、简介
Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。

### 二、注意
1. 同源限制
分配给Worker线程运行的脚本文件，必须与主线程的脚本文件同源。
2. DOM限制
Worker线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的DOM对象，也无法使用document、window、parent这些对象。但是，Woker线程可以使用navigator对象和location对象。
3. 通信联系
Worker线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。
4. 脚本限制
Worker线程不能执行alert和confirm方法，但是可以使用XMLHttpRequest对象发送AJAX请求。
5. 文件限制
Worker线程无法读取本地文件，即不能打开本机的文件系统(file://)，他所加载的脚本，必须来自网络。

### 三、API
```JS
// 主线程
var worker = new Worker('worker.js', { name : 'myWorker' });

// Worker 线程
self.name // myWorker
// 运行代码会导致浏览器下载该文件，但只有Woker接受到消息，才会实际执行执行文件中的代码。

// 给worker传递消息，可以使用postMessage方法
worker.postMessage('Hello World');
worker.postMessage({method: 'echo', args: ['Work']}); 
// 传入值为复制的，不是直接传入的。

// worker是通过message和error事件与页面通信。来自worker的数据保存在event.data中。Worker返回的数据也是任何能够被序列化的值。
worker.onmessage = function(event) {
  var data = event.data;
}
worker.onerror = function(event) {
  // event.filename 发生错误的文件名
  // event.lineno 代码行号
  // event.message 错误信息
}
// 或者
worker.addEventListener('error', function (event) { });

Worker.onmessageerror = function(event) { } //指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。

// 停止工作
worker.terminate();

worker.addEventListener();
worker.dispatchEvent();
worker.removeEventListener();
```

```JS
// Worker 线程
self.name; // Worker 的名字。该属性只读，由构造函数指定。
self.onmessage;  // 指定message事件的监听函数。
self.onmessageerror; // 指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。
self.close(); // 关闭 Worker 线程。
self.postMessage(); // 向产生这个 Worker 线程发送消息。
self.importScripts(); // 加载 JS 脚本。
```

### 四、全局作用域
他执行的js代码完全在另一个作用域中，与当前网页中的代码不共享作用域。
在Web Woker中，同样有一个全局对象和其他对象以及方法。但是Web Worker中的代码不能访问dom，也无法通过任何方式影响页面的外观。

Web Worker中的全局对象是worker本身。也就是说，在这个特殊的全局作用域中，this和self引用的都是worker对象。为便于处理数据，Web Worker本身也是一个最小化的运行环境。

内部属性：
* 最小化的navigator对象，包括onLine,appName,appVersion,userAgent和platform属性。
* 只读的location对象
* setTimeout,setInterval,clearTimeout,clearInterval
* XMLHttpRequest构造函数

