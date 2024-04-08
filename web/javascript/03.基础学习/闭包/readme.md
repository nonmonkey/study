[TOC]

---

### 一、简介

闭包函数：声明在一个函数中的函数，叫做闭包函数。

闭包：当一个内部函数试图访问外部函数的作用域链（其词法域外）的变量值时，闭包就被创建了。闭包包含他们自己的作用域链，他们父级作用域链以及全局的作用域。

闭包就是能够读取其他函数内部变量的函数，由于在 js 语言中，只有函数内的子函数才能读取局部变量，因此可以把闭包简单理解成‘定义在一个函数内部的函数’。

闭包不仅可以获取函数内部的变量，也可以获取外部函数的参数资源。

### 二、特点

让外部访问函数内部变量成为可能；

局部变量会常驻在内存中；

可以避免使用全局变量，防止全局变量污染；

会造成内存泄漏（有一块内存空间被长期占用，而不被释放）

### 三、闭包的创建

闭包就是可以创建一个独立的环境，每个闭包里面的环境都是独立的，互不干扰。闭包会发生内存泄漏，每次外部函数执行的时候，外部函数的引用地址不同，都会重新创建一个新的地址。但凡是当前活动对象中有被内部子集引用的数据，那么这个时候，这个数据不删除，保留一根指针给内部活动对象。

### 四、应用场景

例 1:
```JS
function funA(){
  var a = 10;  // funA的活动对象之中;
  return function(){   //匿名函数的活动对象;
    alert(a);
  }
}
var b = funA();
b();  //10
```

例 2:
```JS
function outerFn(){
  var i = 0;
  function innerFn(){
      i++;
      console.log(i);
  }
  return innerFn;
}
var inner = outerFn();  //每次外部函数执行的时候,都会开辟一块内存空间,外部函数的地址不同，都会重新创建一个新的地址
inner();
inner();
inner();
var inner2 = outerFn();
inner2();
inner2();
inner2();   //1 2 3 1 2 3
```

例 3:
```JS
var i = 0;
function outerFn(){
  function innnerFn(){
       i++;
       console.log(i);
  }
  return innnerFn;
}
var inner1 = outerFn();
var inner2 = outerFn();
inner1();
inner2();
inner1();
inner2();     //1 2 3 4
```

例 4:
```JS
function fn(){
	var a = 3;
	return function(){
		return  ++a;
	}
}
alert(fn()());  //4
alert(fn()());  //4
```

例 5:
```JS
(function() {
  var m = 0;
  function getM() { return m; }
  function seta(val) { m = val; }
  window.g = getM;
  window.f = seta;
})();
f(100);
console.info(g());   //100  闭包找到的是同一地址中父级函数中对应变量最终的值
```

例 6:
```JS
var add = function(x) {
  var sum = 1;
  var tmp = function(x) {
      sum = sum + x;
      return tmp;
  }
  tmp.toString = function() {
      return sum;
  }
  return tmp;
}
alert(add(1)(2)(3));
```

例 7:
```JS
var lis = document.getElementsByTagName("li");
for(var i=0;i<lis.length;i++){
  (function(i){
      lis[i].onclick = function(){
           console.log(i);
      };
  })(i);       //事件处理函数中闭包的写法
}
```

例8:
```JS
function m1(){
     var x = 1;
     return function(){
          console.log(++x);
     }
}
 
m1()();   //2
m1()();   //2
m1()();   //2
 
var m2 = m1();
m2();   //2
m2();   //3
m2();   //4
```

例9:
```JS
function fn(){
  var arr = [];
  for(var i = 0;i < 5;i ++){
	arr[i] = (function(i){
		return function (){
			return i;
		};
	})(i);
  }
  return arr;
}
var list = fn();
for(var i = 0,len = list.length;i < len ; i ++){
  console.log(list[i]());
}  //0 1 2 3 4
```

### 五、闭包的漏洞

```JS
// 示例可以在不暴露obj的情况下，获取obj对象的属性值
var o = (function () {
  var obj = {
    a: 1,
    b: 2
  };

  return {
    get: function (key) {
      return obj[key]
    }
  }
})()

// 但是可以通过修改Object原型，读取到obj对象
Object.defineProperty(Object.prototype, 'abc', {
  get() {
    return this;
  }
})
console.log(o.get('abc'))
```

完善上述代码:
```JS
// 方法一
var o = (function () {
  var obj = {
    a: 1,
    b: 2
  };

  return {
    get: function (key) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return obj[key]
      }
      return null
    }
  }
})()

// 方法二
var o = (function () {
  var obj = {
    a: 1,
    b: 2
  };
  Object.setPrototypeOf(obj, null);

  return {
    get: function (key) {
      return obj[key]
    }
  }
})()
```
