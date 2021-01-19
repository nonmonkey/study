[TOC]
***

https://shubo.io/preload-prefetch-preconnect

### 一、Resource Hint

辅助浏览器用来做资源优化的指令

一些常见的指令：
* dns-prefetch
* preconnect
* prefetch
* preload
* prerender

能让开发者指定link tag的rel属性提示浏览器提前下载图片、js、css等资源，以达到优化性能的效果。
可以优化自愿的下载顺序并提升页面载入性能。

浏览器的资源下载顺序会依照优先度。以Chrome为例，对于各种资源的预设优先度如下：

* Highest: HTML, CSS, Fonts
* High: script (预设影像之前), 在 viewport 内的影像
* Medium: script
* Low: script (async), image, media
* Lowest: mismatched CSS, prefetch resources

### 二、 Preload

告诉浏览器：这份资源是必要的，请用最快的速度下载此资源。
```HTML
<link rel="preload" as="script" href="super-important.js">
<link rel="preload" as="style" href="critical.css">
```
as 是用来指定资源的类别的。这个属性需要指定，不然可能会重复下载同一份资源。
preload 对浏览器有强制作用而非建议，所以你必须很确定他是真正重要的资源。

虽然浏览器可以先扫描一遍html提早发现资源，但是有些隐藏在css、js内的资源就没办法了。这时候preload就非常有帮助了。例如：
* CSS 中的字體檔。
* script 中動態載入其他 script/CSS 等。

**使用场景1：字体**
注意如果是字体做preload，必须加上 crossorigin 这个attribute，表示anonymous mode CORS，否则字体会被重复下载两次。crossorigin也适用于其他支援CORS的资源。
```HTMl
<link rel="preload" as="font" crossorigin="anonymous" type="font/woff2" href="myfont.woff2">
```

**使用场景2：js触发**
```JS
function downloadScript(src) {
  var el = document.createElement("link");
  el.as = "script";
  el.rel = "preload";
  el.href = src;
  document.body.appendChild(el);
}

function runScript(src) {
  var el = document.createElement("script");
  el.src = src;
}
```

### 三、 Preconnect

告诉浏览器：这个网页将会在不久的将来下载某个domain的资源，请先帮我建立好连线。
```HTML
<link rel="preconnect" href="https://example.com">
```

**为什么需要提前建立连接呢？**
要理解这个功能的用途，我们必须知道，浏览器在实际传输资源前，有以下步骤需要做：
1. 向DNS请求解析域名
2. TCP Handshake
3. SSL Negotiation（HTTPS连线）
4. 连线建立完成，等待拿到资源的第一个byte

上面四个步骤，第一步都会需要一个RTT（Round Trip Time）的来回时间。
所以在实际传输资料之前，已经花了3个RTT时间
如果是在latency很高的情况下，（例如手机网络），会大大拖慢取得资源的速度。

```HTML
<link href='https://fonts.gstatic.com' rel='preconnect' crossorigin>
```
上述实例，利用 preconnect 提早建立好 fonts.gstatic.com 之间的连线，省去了一次完整的 (DNS Lookup + TCP Handshake + SSL Negotiation) ，共三个 RTT 的时间。

还可以通过js触发：
```JS
function preconnectTo(url) {
  var hint = document.createElement("link");
  hint.rel = "preconnect";
  hint.href = url;
  document.head.appendChild(hint);
}
```

**使用场景1：CDN**
如果你有很多资源要从某个CDN去拿，你可以提示 preconnect CDN的域名

**使用场景2：Streaming**
如果页面上有个串流媒体，但是你没有要马上播放，又希望按下播放的时候可以越快越好。那么可以考虑先用preconnect建立连线，节省一段连线时间。

### 四、dns-prefetch

跟 preconnect 类似，差别在于只提示浏览器预先处理DNS lookup而已。

### 五、 Prefetch

告诉浏览器：这个资源我等会会用到，有空的话帮我先下载

资源会等页面完全下载完之后，以Lowest优先度下载。

**使用场景1：分页的下一页**
如果你确定使用者有很高的机会率点下一页的话。
