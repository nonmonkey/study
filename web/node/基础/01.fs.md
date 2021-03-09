[TOC]
***

### 一、简介

fs 文件系统

模块可用于与文件系统进行交互

调用此模块
```JS
const fs = require('fs');
```

**什么时候使用同步方法和异步方法？**

由于Node环境中执行的js代码是服务器端的代码，所以，绝大部分需要在服务器运行期反复执行业务逻辑的代码，必须使用异步代码，否则，同步代码在执行时期服务器将停止响应，因为js只有一个执行线程。

服务器启动时如果需要读取配置文件，或者结束时需要写入到状态文件时，可以使用同步代码，因为这些代码只在启动和结束时执行一次，不影响服务器正常运行时的异步执行。

### 二、读取文件

#### 1.fs.readFile

```JS
var fs = require('fs');
// 异步读文件
fs.readFile('./sample.txt', 'utf-8', function (err, data) {
  if (err) {
    console.log('readFile err:', err);
  } else {
    console.log('readFile data:', data);
  }
});

// 异步读取图片
fs.readFile('./qq.png', function (err, data) {
  if (err) {
    console.log('readFile err:', err);
  } else {
    console.log('readFile data qq.png:', data.length + ' bytes', data);
    // 把一个Buffer对象转换成String：'Buffer -> String:', data.toString()
    // 把一个String转换成Buffer：'String -> Buffer', Buffer.from(data, 'utf-8')
  }
});
```

#### 2.fs.readFileSync

```JS
var fs = require('fs');
var data = fs.readFileSync('./sample.txt', 'utf-8');
console.log('readFileSync:', data);
```

### 三、写入文件

#### 1.fs.writeFile

* file string | Buffer | URL | integer 文件名或文件描述符。
* data string | Buffer | TypedArray | DataView
* options Object | string
  * encoding string | null 默认值: 'utf8'。
  * mode integer 默认值: 0o666。(第一个数：文件所有者的权限；第二个参数：同组用户的权限；第三个参数：非同组用户的权限；rwx（421 可读可写可执行）)
  * flag string 参见文件系统 flag 的支持。 默认值: 'w'。
* callback Function
  * err Error

```JS
var fs = require('fs');
var data = 'Hello, Node.js';
fs.writeFile('output.txt', data, function (err) {
  if (err) {
    console.log('writeFile err:', err);
  } else {
    console.log('writeFile ok.');
  }
});
```

#### 2.fs.writeFileSync

```JS
var fs = require('fs');
var data = 'Hello, Node.js';
fs.writeFileSync('output.txt', data);
```

### 四、获取文件信息

#### 1.fs.stat

```JS
var fs = require('fs');
fs.stat('sample.txt', function (err, stats) {
  if (err) {
    console.log(err);
  } else {
    // 是否是文件:
    console.log('isFile: ' + stats.isFile());
    // 是否是目录:
    console.log('isDirectory: ' + stats.isDirectory());
    if (stats.isFile()) {
      // 文件大小:
      console.log('size: ' + stats.size);
      // 创建时间, Date对象:
      console.log('birth time: ' + stats.birthtime);
      // 修改时间, Date对象:
      console.log('modified time: ' + stats.mtime);
    }
  }
});
```

运行结果：
```
isFile: true
isDirectory: false
size: 14
birth time: Tue Jan 26 2021 17:38:47 GMT+0800 (China Standard Time)
modified time: Tue Jan 26 2021 17:42:26 GMT+0800 (China Standard Time)
```

#### 2.fs.statSync

```JS
var stats = fs.statSync('sample.txt');
console.log('stats:', stats);
```

运行结果：
```
stats: Stats {
  dev: 16777220,
  mode: 33188,
  nlink: 1,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 60022477,
  size: 14,
  blocks: 8,
  atimeMs: 1611654146983.3477,
  mtimeMs: 1611654146577,
  ctimeMs: 1611654146577.9875,
  birthtimeMs: 1611653927283.975,
  atime: 2021-01-26T09:42:26.983Z,
  mtime: 2021-01-26T09:42:26.577Z,
  ctime: 2021-01-26T09:42:26.578Z,
  birthtime: 2021-01-26T09:38:47.284Z
}
```
