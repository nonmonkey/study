[TOC]

---

课前补充：
1.转义符号：\
回车一般代表的是\r\n

2.系统规定js里面字符串是不能多行显示的
解决办法：
1）每行后面加一个转义字符 \
3.贪婪匹配原则：能匹配多就不匹配少
4.非贪婪匹配：在任何一个量词后面加一个问号
例1：
var reg2 = /a+?/g;
console.log(str.match(reg2)); //(4) ["a", "a", "a", "a"]
### 一、正则表达式
正则表达式的作用：匹配特殊的字符或有特殊搭配原则的字符
#### 1.正则表达式定义
1）方式一：正则表达式字面量
```JS
 var reg = /pattern/attributes;
```
2）方式二：构造函数
```JS
var reg = new RegExp(/pattern/, "attributes");
var reg = new RegExp("abc", "igm");
var reg1 = new RegExp("abc");
var reg2 = new RegExp(reg);
```

#### 2.参数介绍

1. pattern：
```
^：匹配开头
$：匹配结尾
```

2. attributes:(string)
```
i：表示忽视大小写（ignoreCase）
g：表示查找全部匹配，（global）
m：实现多行匹配：（multiline）
```

#### 3.表达式
var reg = /[0-9A-Za-z]/;
var reg = /[^a][^b]/;//^写在表达式里面表示非
var reg = /(abc|bcd)/;//字符串abc或者bcd

#### 4.元字符
\r === 回车符
\n === 换行符
\w === [0-9A-z_];
\W === [^\w];
\d === [0-9];
\D === [^\d];
\s === [\s\t\n\r\v\f ]查找空白字符（1.空格符2.制表符\t3.回车符\r4.换行符\n5.垂直制表符\v6.换页符\f）
\S === [^\s]
\b === 单词边界
\B === 非单词边界
. === [^\r\n]查找单个字符，除了回车和换行符
[\s\S]或者[\d\D]等 匹配所有字符

#### 5.量词
n+ === n的区间 {1, Infinity}
n* === {0, Infinity}
n? === {0, 1}
n{x} === x个
n{x, y} === {x, y}个
n{2, } === {2, Infinity}

#### 6.正则语法
```JS
str.match(reg);//返回匹配的数组，如果没有则返回null
reg.test(str);//返回true或者false
str.search(reg);//匹配到的位置 成功返回0匹配不到返回-1
str.replace(reg, "b");//替换
reg.exec(str);//通过反复调用 exec() 方法来遍历字符串中的所有匹配文本
```
例：
```JS
var reg = /a(b)(c)/g;
var str = "abcdabcabcabc";
console.log(str.match(reg));//["abc", "abc", "abc", "abc"]
console.log(reg.test(str)); //true
console.log(str.search(reg));//0(匹配到的位置) //匹配不到返回-1
console.log(str.replace("a"rep, "b"));
console.log(str.replace(reg, "b"));
console.log(str.replace(reg, function($, $1, $2) {
    return $2 + $2 + $1 + $1;//$表示全局 $1表示传入的第一个参数
}))
```
#### 7.？的几种用法

1. 非贪婪匹配
```
*? 重复任意次，但尽可能少重复
+? 重复1次或更多次，但尽可能少重复
?? 重复0次或1次，但尽可能少重复
{n,m}? 重复n到m次，但尽可能少重复
{n,}? 重复n次以上，但尽可能少重复
```

2. 不捕捉模式

如何关闭圆括号的捕获能力？而只是用它来做分组，方法是在左括号的后边加上?:，这里第一个圆括弧只是用来分组，而不会占用捕获变量，所以$1的内容只能是steak或者burger，而永远不可能是bronto。

```JS
var pattern=/(ab)\w+(ba)/;
console.log("abcba_".replace(pattern,"$1"));
/*结果"ab_";匹配到的字符被第一个分组(ab)
*替换
*/
var pattern2=/(?:ab)\w+(ba)/;
console.log("abcba_".replace(pattern2,"$1"));
/*
*结果"ba_";第一次分组内加入了?:,产生的是一个
*没有编号的分组，所以$1匹配的字符是第二个分组，
*也就是第一个编号分组(ba)相匹配的文本内容
*/
```

3. 前瞻、后顾

* 前瞻：获取指定字符串之前：(?=指定字符串)
```JS
let str1='javascript,typescript';
// 字符串str1中,script前面是否有java,符合规则返回ture
console.log( /java(?=script)/.test(str1)); //true

let str2='java script,typescript';
// 字符串str1中,script 前面是否有java
console.log( /java(?=script)/.test(str2)); //false
// 因为script 前面是否是空格java

let str3='javaxxscript,typescript';
// 字符串str1中,script 前面是否有java
console.log( /java(?=script)/.test(str3)); //false
// 因为script 前面是否是javaxx,不是java
```

* 后顾：获取指定字符串之后：(?<=指定字符串)
```JS
let str1='a1b2'
console.log(/(?<=a1)b2/.test(str1)) //true

// 匹配a1后面的是否有b2
let str1='a1b211'
console.log(/(?<=a1)b2/.test(str1)) //true

// 匹配a1后面的是否有b2
let str1='a1a1b2b2'
console.log(/(?<=a1)b2/.test(str1)) //true
```


#### 7.示例

例1、正向预查和非正向预查
```JS
var str = "abaaa";
var reg = /a(?=b)/g;
console.log(str.match(reg));//["a"] //正向预查 a后面跟的是b，b只参与修饰
var reg1 = /a(?!b)/g;
console.log(str.match(reg1)); //(3) ["a", "a", "a"]//非正向预查
```

例2、拆分
```JS
var str = "jkafghassss2khksds2dsssskhf2khskfghweak";
var reg = /(\w)\1/;
var reg1 = /(\d)\1/;
console.log(str.split(reg));//(3) ["jkafghas2khksds2d", "s", "khf2khskfghweak"] //写上子表达式，会把子表达式返回
console.log(str.split(reg1));//(4) ["jkafghas", "khksds", "dsskhf", "khskfghweak"]
```

例3、$、子表达式及反向引用
```JS
var str = "aa";
var reg = /a/;
var reg1 = /a/g;
console.log(str.replace("a", "b"));//ba
console.log(str.replace(reg, "b"));//ba
console.log(str.replace(reg1, "b"));//bb
var str1 = "aabb";
var reg2 = /(\w)\1(\w)\2/g;
console.log(str1.replace(reg2, "$2$2$1$1"));//bbaa
console.log(str1.replace(reg2, function($, $1, $2) {
    return $2 + $2 + $1 + $1; //bbaa //$表示全局 $1表示传入的第一个参数
}))
console.log(str1.toUpperCase());//AABB
console.log(str1.toUpperCase().toLowerCase());
```

例4、exec();//通过反复调用 exec() 方法来遍历字符串中的所有匹配文本
```JS
var reg = /ab/g;
var str = "abab"; //str.match(reg); //["abc", ""]
console.log(reg.lastIndex);//当前下标0(没有g，lastIndex一直是0)
console.log(reg.exec(str));//["ab", index: 0, input: "ababababababab", groups: undefined]
console.log(reg.lastIndex);//2
console.log(reg.exec(str));//["ab", index: 2, input: "ababababababab", groups: undefined]
console.log(reg.lastIndex);//4
console.log(reg.exec(str));//null
console.log(reg.lastIndex);//0
console.log(reg.exec(str));//["ab", index: 0, input: "abab", groups: undefined]
```

例5、去重
```JS
var str = "aaaaaaaaaaaaaaabbbbbbbbbbbbbbccccccccc";
var reg = /(\w)\1*/g;
console.log(str.replace(reg, "$1"));//abc
```

例6、从后往前，每3位数字加一个"."
```JS
var str = "100000000000000";
var reg = /(?=\B(\d{3})+$)/g;
console.log(str.replace(reg, ".")); // 100.000.000.000.000

// 拓展：从前往后加'.'
var str = "1000000000000000";
var reg = /(?<=^(\d{3})+\B)/g;
console.log(str.replace(reg, ".")); // 100.000.000.000.000.0
```