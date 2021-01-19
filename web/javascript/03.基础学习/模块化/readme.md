[TOC]

---

模块化的主要目的是用来抽离公共代码，隔离作用域，避免变量冲突等。

### 一、IIFE

使用自执行函数来编写模块化，特点：在一个单独的函数作用域中执行代码，避免变量冲突。

```JS
(function () {
  return {
    data: []
  }
})()
```

### 二、AMD

异步模块定义 Asynchronous Module Definition。使用**requireJS**来编写模块化，

1、异步加载
2、管理模块之间的依赖性，便于代码的编写和维护。

特点：依赖必须提前声明好

具体来说，就是模块必须采用特定的 define()函数来定义。如果一个模块不依赖其他模块，那么可以直接定义在 define()函数之中。

```JS
// html
<script src="./require.js" data-main="./main.js"></script>

// main.js
require.config({
  paths: {
    add: './math.js',
  },
});

// math.js
define(function (){
  return {
    add: (x, y) => (x + y);
  };
});
// 或
define({
  add: (x, y) => (x + y);
});

// 加载
require(['math'], function (math){
  alert(math.add(1,1));
});

// 如果还依赖其他模块
define(['myLib'], function(myLib){
  function foo(){
    myLib.doSomething();
  }
  return {
    foo : foo
  };
});
```

### 三、CMD

Common Module Definition，通用模块定义。是一种模块定义规范，规范中明确了模块的基本书写格式和基本交互规则。**SeaJS**就是遵循的这个规范。

特点：支持动态引入依赖文件

* seajs.config({...});   //用来对 Sea.js 进行配置。
  &#160;&#160;&#160; base
  &#160;&#160;&#160; alias
  &#160;&#160;&#160; paths
  &#160;&#160;&#160; vars
  &#160;&#160;&#160; map
* seajs.use(['a','b'],function(a,b){...});   //用来在页面中加载一个或多个模块。
* define(function(require, exports, module){...});   //用来定义模块。Sea.js 推崇一个模块一个文件，遵循统一的写法：
* require(function(require){var a = require("xModule"); ... });   //require 用来获取指定模块的接口。
* require.async,  //用来在模块内部异步加载一个或多个模块。
* exports, //用来在模块内部对外提供接口。
* module.exports, 与 exports 类似，用来在模块内部对外提供接口

```JS
define(function(require, exports, module) {
  var indexCode = require('./index.js');
})
```

### 四、CommonJs

nodejs 中自带的模块化。

1、模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
2、模块加载会阻塞接下来代码的执行，需要等到模块加载完成才能继续执行——同步加载。

nodejs 中 exports, require, module, **filename, **dirname 属性和方法不是全局的，之所以能直接使用，是因为所有代码在一个函数中执行，require 等方法为该函数的参数，最后函数会 return module.exports(module.exports 和 exports 最开始两者指向同一个空对象。导出时永远导出的时 module.exports);
在全局中执行 console.log(arguments); 能够打印出一个类数组:

```
{ '0': exports, '1': require, '2': module, '3': __filename, '4': __dirname }
例：
```

相当于该模块所有代码运行在这样一个函数中：

```JS
function xyz (exports, require, module, __filename, __dirname) {}
```

- exports: 导出
- require: 导入
- module:
  - id 文件名（主文件 index.js 的 id 为 '.'）
  - exports
  - parent 父模块 对象（module），第一个引用该模块的模块
  - filename 当前文件名
  - loaded 当前是否加载完
  - children 子模块数组，引入了哪些模块，就是它的子模块（module）
  - paths 依赖的模块包（node_modules）会一直从当前路径向上查找
- \_\_filename 文件路径 + 文件名
- \_\_dirname 当前路径

```JS
// 倒入：
var fs = require('fs');
// 导出
module.exports = { a: 1, b: 2 }
```

**CommonJS模块的特点如下：**
* 所有代码运行在模块作用域，不会污染全局作用域
* 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次进行，必须清理缓存
* 模块加载的顺序，按照在代码中出现的顺序。

### 五、UMD

兼容AMD和commonJS规范的同时，还兼容全局引用的方式

```JS
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    //AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    //Node, CommonJS之类的
    module.exports = factory(require('jquery'));
  } else {
    //浏览器全局变量(root 即 window)
    root.returnExports = factory(root.jQuery);
  }
})(this, function ($) {
  //方法
  function myFunc() {}
  //暴露公共方法
  return myFunc;
});
```

### 六、ES Modules

1、按需加载（编译时加载）
2、import和export命令只能在模块的顶层，不能在代码块之中（如：if语句中）,import()语句可以在代码块中实现异步动态按需动态加载


#### export
用于规定模块的对外接口
1. 一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。
```JS
export const firstName = 'Michael';
export function multiply(x, y) {
  return x * y;
};
```
2. export命令规定的是对外的接口，必须与模块内部的变量建立--对应关系。
```JS
// 写法一
export const m = 1;
// 写法二
const m = 1;
export {m};
// 写法三
const n = 1;
export {n as m};
```

#### import
用于输入其他模块提供的功能

1. import命令输入的变量都是只读的
```JS
import {a} from './xxx.js'
a = {}; // Syntax Error : 'a' is read-only;
```
```JS
import {a} from './xxx.js'
a.foo = 'hello'; // 合法操作
```
2. import命令具有提升效果
```JS
foo();
import { foo } from 'my_module';
```
3. import是静态执行，所以不能使用表达式和变量
```JS
// 报错
import { 'f' + 'oo' } from 'my_module';
// 报错
let module = 'my_module';
import { foo } from module;
```
4. import语句是Singleton模式(如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次)
```JS
import { foo } from 'my_module';
import { bar } from 'my_module';
// 等同于
import { foo, bar } from 'my_module';
```

#### export default

1. export default 就是输出一个叫做default的变量或者方法，然后系统允许你为他取任意名字
```JS
// modules.js
function sayHello() {
  console.log('哈哈哈')
}
export { sayHello as default};
// 等同于
// export default sayHello;

// app.js
import { default as sayHello } from 'modules';
// 等同于
// import sayHello from 'modules';
```
2. 正是因为export default命令其实只是输出一个叫做default的变量，所以他后面不能跟变量声明语句。
```JS
// 正确
export const a = 1;
// 正确
const a = 1;
export default a;
// 错误
export default const a = 1;
// 正确
export default 42;
// 报错
export 42;
```

#### export 和 import 的复合写法

1. 在一个模块里导入同时导出模块
```JS
export { foo, bar } from 'my_module';
// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```
```JS
export { es6 as default } from './someModule';
// 等同于
import { es6 } from './someModule';
export default es6;
```


### 六、模块对比

####  1.RequireJS 和 Seajs

AMD在加载完成定义（define）好的模块就会立即执行，所有执行完成后，遇到require才会执行主逻辑。（提前加载）
CMD在加载完成定义（define）好的模块，仅仅是下载不执行，在遇到require才会执行对应的模块。（按需加载）
AMD用户体验好，因为没有延迟，CMD性能好，因为只有用户需要的时候才执行。

CMD为什么会出现，因为对node.js的书写者友好，因为符合写法习惯，就像为何vue会受人欢迎的一个道理。


* 定位有差异。RequireJS 想成为浏览器端的模块加载器，同时也想成为 Rhino / Node 等环境的模块加载器。Sea.js 则专注于 Web 浏览器端，同时通过 Node 扩展的方式可以很方便跑在 Node 环境中。
* 遵循的规范不同。RequireJS 遵循 AMD（异步模块定义）规范，Sea.js 遵循 CMD （通用模块定义）规范。规范的不同，导致了两者 API 不同。Sea.js 更贴近 CommonJS Modules/1.1 和 Node Modules 规范。
* 推广理念有差异。RequireJS 在尝试让第三方类库修改自身来支持 RequireJS，目前只有少数社区采纳。Sea.js 不强推，采用自主封装的方式来“海纳百川”，目前已有较成熟的封装策略。
* 对开发调试的支持有差异。Sea.js 非常关注代码的开发调试，有 nocache、debug 等用于调试的插件。RequireJS 无这方面的明显支持。
* 插件机制不同。RequireJS 采取的是在源码中预留接口的形式，插件类型比较单一。Sea.js 采取的是通用事件机制，插件类型更丰富。


#### 2.CommenJS 和 ES6

主要有以下两大区别
* CommonJs模块输出的是一个值的拷贝，ES6模块输出的是值的引用。
* CommonJs模块是运行时加载，ES6模块是编译时输出接口。

ES6模块的设计思想是尽量的静态化，使得编译时就能够确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD模块，都只能在运行时确定这些东西。比如，CommonJS模块就是对象，输入时必须查找对象属性。

```JS
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

上面的代码的实质是整体加载fs模块（即加载fs的所有的方法），生成一个对象（_fs），然后再从这个对象上面读取3个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没有办法在编译时做“静态优化”。

ES6模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。

```JS
// ES6模块
import { stat, exists, readFile } from 'fs';
```
上面代码的实质是从fs模块加载3个方法，其他方法不加载。这种加载称为“编译时加载”，即ES6可以在编译时就完成模块加载，效率要比CommonJS模块的加载方式高，当然，这也导致了没办法引用ES6模块本身，因为他不是对象。
