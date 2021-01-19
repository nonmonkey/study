[TOC]
***

### 一、页面级的优化
  1.css Sprites
  2.使用CDN(内容分发的网络)
  3.压缩合并代码
  4.使用DNS预解析

<link rel="dns-prefetch" href="//static.360buyimg.com">


### 二、代码级别的优化
  1.减少dom操作
    // 示例1
    var lis = document.querySelectorAll('li');
    var len = lis.length; // 可以减少dom操作
    for (...) {...}

    // 示例2
    var div = document.querySelector('div');
    var str
    for (...) { str += '...'; } // 通过对变量str进行操作，减少dom操作
    div.innerHTML = 'a';

  2.异步加载
    // 1)如果没有defer和async的情况，代码走到script，需要解析script完，再执行之后的代码
    // 2)defer: 会下载这个文件，并不执行，其后代码全部执行完毕之后，才会执行
    // 3)async: 会下载这个文件，当下载完成后，立即执行，同时中断其后代码的执行，执行完毕之后，其后代码才能继续执行

    <script defer src="//h5.360buyimg.com/ws_js/gatherInfo.js"><\/script>
    <script async src="//h5.360buyimg.com/ws_js/gatherInfo.js"><\/script>

  3.事件代理
    ul li 元素添加点击事件
    ul.onclick = function(e) {
      if (e.target.tagName.toLowerCase() === 'li') {
        console.log(e.target.innerHTML);
      }
    }


  4.使用requestAnimationFrame来代替setTimeout和setInterval

  5.图片懒加载