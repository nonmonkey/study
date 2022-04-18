[TOC]
***

### 一、简介

Web Sockets 的目标是在一个单独的持久连接上提供全双工、双向通信。

在js中创建了Web Sockets之后，会有一个HTTP请求发送到浏览器已发起连接。在取得服务器响应后，建立的连接会使用HTTP升级从HTTP协议交换为web socket协议。也就是说，使用标准HTTP服务器无法实现Web Sockets，只有支持这种协议的专门服务器才能正常工作。

由于Web Sockets使用了自定义的协议，所以URL模式也略有不同。未加密的连接不是http://，而是ws://；加密的连接也不是https://，而是wss://。在使用Web Socket URL时，必须带着这个模式，因为将来还有可能支持其他模式。

使用自定义协议而非http协议的好处是，能够在客户端和服务器之间发送非常少的数据，而不必担心HTTP那样字节级的开销。由于传递的数据包很小，因此Web Sockets非常适合移动端应用。毕竟对于移动端应用而言，带宽和网络延迟都是关键问题。使用自定义协议的缺点在于，制定协议的时间比制定js api的时间还要长。Web Sockets曾几度搁浅。就因为不断有人发现这个新协议存在一致性和安全性的问题。

### 二、对比

##### 一、ajax轮询
让浏览器隔个几秒就发送一次请求，询问服务器是否有新信息。

##### 二、long poll
long poll 其实原理跟 ajax轮询 差不多，都是采用轮询的方式，不过采取的是阻塞模型（一直打电话，没收到就不挂电话），也就是说，客户端发起连接后，如果没消息，就一直不返回Response给客户端。直到有消息才返回，返回完之后，客户端再次建立连接，周而复始。

##### 三、问题

https://www.zhihu.com/question/20215561/answer/40316953

不管怎么样，上面这两种都是非常消耗资源的

ajax轮询 需要服务器有很快的处理速度和资源。

long poll 需要有很高的并发，也就是说同时接待客户的能力。

> HTTP还是一个无状态协议，通俗的说就是，服务器因为每天要接待太多客户了，是个健忘鬼，你一挂电话，他就把你的东西全忘光了，把你的东西全丢掉了。你第二次还得再告诉服务器一遍。

> 所以在这种情况下出现了，Websocket出现了。他解决了HTTP的这几个难题。
1. 被动性，当服务器完成协议升级后（HTTP->Websocket），服务端就可以主动推送信息给客户端啦。只需要经过一次HTTP请求，就可以做到源源不断的信息传送了。这样的协议解决了上面同步有延迟，而且还非常消耗资源的这种情况。

### 三、Web Sockets API

```JS
// 创建Web Socket
/**
 * 注意，必须给WebSocket 构造函数传递绝对URL。同源策略对于Web Socket不适用，因此可以通过他打开到任何站点的连接。至于是否会与某个域中的页面通信，则完全取决于服务器（通过握手信息就可以知道请求来自何方）。
 */
var socket = new WebSocket('ws://www.example.com/server.php');

// 实例化了WebSocket对象后，浏览器就会马上尝试创建连接。与XHR类似，WebSocket也有一个表示当前状态的readyState属性。
WebSocket.OPENING (0) // 正在创建连接
WebSocket.OPEN (1) // 已创建连接
WebSocket.CLOSING (2) // 正在关闭连接
WebSocket.CLOSE (3) // 已经关闭连接

// 关闭连接(调用了close后，readyState的值立即变为2，而在关闭连接之后就会变为3)
socket.close();

// 发送数据(只能发送纯文本数据)
socket.send('Hello World');

// 接收数据
socket.onmessage = function(event) {
  var data = event.data; // 字符串
}

// 成功建立连接时触发
socket.onopen = function() {}
// 发生错误时触发，连接不能继续
socket.onerror = function() {}
// 连接关闭时触发
socket.onclose = function(event) {
  event.wasClean; // Boolean 表示连接是否已经明确关闭
  event.code; // 服务器返回的数值状态码
  event.reason; // 字符串，服务器发回的消息
}
```

### 三、WebSocket的特点

很多网站为了实现数据推送，所用的技术都是ajax轮询。轮询是在特定的时间间隔，由浏览器主动发起请求，将服务器的数据拉回来。轮询需要不断的向服务器发送请求，会占用很多带宽和服务器资源。WebSocket建立TCP连接后，服务器可以主动给客户端传递数据，能够更好的节省服务器资源和带宽，实现更实时的数据通信。

* 服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。
* 建立在TCP协议之上，服务器端的实现比较容易
* 可以发送文本，也可以发送二进制数据
* 没有同源限制，客户端可以与任意服务器通信
* 协议标识符是ws（如果加密，则为wss），服务器网址就是URL。例如ws://localhost:8080/msg

