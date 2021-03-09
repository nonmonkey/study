[TOC]
***

### 一、简介

模块可以正确处理操作系统相关的文件路径

引入path：
```JS
var path = require('path');
```

### 二、API

#### 1.path.resolve([...paths])

path.resolve() 方法会将路径或路径片段的序列解析为绝对路径

```JS
// 解析当前目录:
var workDir = path.resolve(); // /Users/duhe/Desktop/study/web/node/test
```

#### 2.path.join([...paths])

```JS
var filePath = path.join(workDir, 'pub', 'index.html'); // /Users/duhe/Desktop/study/web/node/test/pub/index.html
```