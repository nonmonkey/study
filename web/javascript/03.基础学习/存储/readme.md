[TOC]
***

cookie、sessionStorage、localStorage，都是保存在浏览器端，都是同源的。

### 一、Cookie

#### 1.简介
Cookie数据始终在同源的HTTP请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。而sessionStorage 和 localStorage不会自动把数据发送给服务器，仅在本地保存。cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下，存储的大小很小只有4K左右。
（key：可以在浏览器和服务器端来回传递，存储容量小，只有大约4k）

cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭，即使窗口或浏览器关闭。

在所有同源窗口中都是共享的。
```JS
const docCookies = {
  getItem(sKey) {
    const reg = new RegExp(`(?:(?:^|.*;)\\s*${encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&')}\\s*\\=\\s*([^;]*).*$)|^.*$`);
    return decodeURIComponent(document.cookie.replace(reg, '$1')) || null;
  },
  setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    let sExpires = '';
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity
            ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
            : `; max-age=${vEnd}`;
          break;
        case String:
          sExpires = `; expires=${vEnd}`;
          break;
        case Date:
          sExpires = `; expires=${vEnd.toUTCString()}`;
          break;
        default:
          break;
      }
    }
    document.cookie = `${encodeURIComponent(sKey)}=${encodeURIComponent(sValue)}${sExpires}
      ${sDomain ? `; domain=${sDomain}` : ''}
      ${sPath ? `; path=${sPath}` : ''}
      ${bSecure ? '; secure' : ''}`;

    return true;
  },
  // 删除cookie无非是在cookie后面加expires使cookie过期，如果没成功，那就是domain和path，这两个值没设置对
  removeItem(sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) {
      return false;
    }
    document.cookie = `${encodeURIComponent(sKey)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT
      ${sDomain ? `; domain=${sDomain}` : ''}${sPath ? `; path=${sPath}` : ''}`;
    return true;
  },
  hasItem(sKey) {
    return (new RegExp(`(?:^|;\\s*)${encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&')}\\s*\\=`))
      .test(document.cookie);
  },
  keys() {
    const aKeys = document.cookie
      .replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, '')
      .split(/\s*(?:=[^;]*)?;\s*/);
    for (let nIdx = 0; nIdx < aKeys.length; nIdx += 1) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  },
};
```

#### 2.cookie的实例应用
* 保存用户登录状态。例如将用户id存储在一个cookie内，这样当用户下次访问该页面时就不需要重新登录了，现在很多论坛和社区都提供这样的功能。cookie还可以设置过期时间，当超过时间期限后，cookie就会自动消失。因此系统往往可以提示用户保持登录状态的时间：常见选项有一个月，三个月，一年等。
* 跟踪用户的行为。例如一个天气预报网站，能够根据用户选择的地区显示当地的天气情况。如果每次都需要选择所在地是繁琐的，当利用了cookie后就会显得人性化了，系统能够记住上一次访问的地区，当下次再打开该页面时，他会自动显示上次用户所在地的天气情况。因为一切都是在后台完成，所以这样的页面就像为某个用户所定制的一样，使用起来非常方便。
* 定制页面。如果网站提供了换肤或更换布局的功能，那么可以使用cookie来记录用户的选项，例如：背景色、分辨率等。当用户下次访问时，仍然可以保存上一次访问的界面风格。

#### 3.cookie如何防范XSS攻击

XSS(跨站脚本攻击)是指攻击者在返回的HTML中嵌入javascript脚本，为了减轻这些攻击，需要在HTTP头部配上：set-cookie：
* httponly：这个属性可以防止XSS，他会禁止javascript脚本来访问cookie（如果某一个Cookie 选项被设置成 HttpOnly = true 的话，那此Cookie 只能通过服务器端修改，Js 是操作不了的，对于 document.cookie 来说是透明的）
* secure：这个属性告诉浏览器仅在请求为https的时候发送cookie

### 二、sessionStorage

仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持。
（key：本身就是一个会话过程，关闭浏览器后消失，session为一个会话，当页面不同即使是同一页面打开两次，也被视为同一次会话）
```JS
window.sessionStorage
// 保存数据语法：
sessionStorage.setItem("key", "value");
// 读取数据语法：
var lastname = sessionStorage.getItem("key");
// 删除指定键的数据语法：
sessionStorage.removeItem("key");
// 删除所有数据：
sessionStorage.clear();
```

### 三、localStorage
localStorage在所有同源窗口中都是共享的，始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据。
（key：同源窗口都会共享，并且不会失效，不管窗口或者浏览器关闭与否都会始终生效）
```JS
window.localStorage
// 保存数据语法：
localStorage.setItem("key", "value");
// 读取数据语法：
var lastname = localStorage.getItem("key");
// 删除数据语法：
localStorage.removeItem("key");
// 删除所有数据：
localStorage.clear();
```
