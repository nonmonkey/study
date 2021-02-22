[TOC]
****

### 一、命令

```
// 在命令行模式下执行
node hello.js

// 严格模式
node --use_strict calc.js
```

### 二、为什么要学NodeJs

学习成本低
语言高性能
支持非阻塞IO
多线程，并且由线程池管理

### 三、JavaScript 和 NodeJs 区别？

NodeJs 是一个平台；js是一种语言

#### 1.用户端软件：
* 浏览器：HTML，CSS，JS
* 安卓：JAVA，Python，C++，C#
* IOS：Objective-C，C++
* WindowsPC：C，C++，VB

#### 2.服务端软件：
JAVA，C，C++，NodeJs，Python，PHP

#### 3.什么是计算机语言？什么是编程语言？

计算机语言：人与计算机之间通信的语言。
编程语言：定义计算机程序的形式语言。

#### 4.编译过程：
* 词法分析：识别关键字，标识符（var a = 1; //a即为标识符或变量），分界符（{}，()），运算符
* 语法分析：将代码装换为命令语句或者短语
* 语义分析：程序作用在操作系统上，生成计算机操作系统能够执行的程序

### 四、NodeJs在什么背景之下出现？

浏览器大战。

**世界上普遍使用并且可以展示图片的浏览器是什么？**

NCSA Mosaic

**NodeJs为什么选择了js和V8**

高性能，异步IO，事件驱动

**NodeJs是不是单线程？**

多线程

### 五、全栈工程师会哪些东西

1）前端语言（HTML，CSS，JS）
2）后端语言（NodeJS）
3）网络知识
4）持久化

### 六、后端的规范与思想

1. 分层
  1）Web层（controller层）：接收和发送http请求，封装
  2）业务逻辑层（服务层，XXXService）
  3）DAO（Data Access Object 数据访问层）：数据访问对象
  DataBase（DB）：存数据
  业务：对对象进行操作
  如果要存储：对象 转为 数据
  如果要读取：数据 转为 对象
  4）持久性：存在磁盘上
  文件，数据库

  示例：
  web层：LoginController（接收web请求，参数；判断是否非法；传给服务层）
  服务层：LoginService（获取这个用户的密码，进行比较）
  DAO：LoginDAO（从数据库获取数据，并转换为对象）
  Domain：User

2. 模块化
  1）ES6导入和导出，ES3/5缺少模块化概念
  2）js规范缺乏管理机制

### 七、五层网络模型

应用层：http
传输层：tcp
网络层：ip

数据链路层
物理层

