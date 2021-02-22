[TOC]
***

### 一、简介

crypto模块的目的是为了提供通用的加密和哈希算法。用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢。Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。

引入
```JS
const crypto = require('crypto');
```

### 二、HASH
**crypto.createHash(algorithm[, options])**

* algorithm: string (md5 | sha1 | sha256 | sha512)
* options: Object stream.transform 的选项。
* 返回: Hash

#### 1.hash.update(data[, inputEncoding])

* data: string | Buffer | TypedArray | DataView
* inputEncoding: string data 字符串的字符编码。

使用给定的 data 更新哈希的内容，该数据的字符编码在 inputEncoding 中给出。 如果未提供 encoding，并且 data 是字符串，则强制执行 'utf8' 的编码。 如果 data 是一个 Buffer、 TypedArray 或 DataView，则 inputEncoding 会被忽略。

#### 2.hash.digest([encoding])

* encoding: string 返回值的字符编码。
* 返回: Buffer | string
计算传入要被哈希（使用 hash.update() 方法）的所有数据的摘要。 如果提供了 encoding，则返回字符串，否则返回 Buffer。

调用 hash.digest() 方法之后， Hash 对象不能被再次使用。 多次调用将会导致抛出错误。

#### 3.实例(md5)

MD5是一种常用的哈希算法，用于给任意数据一个“签名”。这个签名通常用一个十六进制的字符串表示：

```JS
const crypto = require('crypto');

const hash = crypto.createHash('md5');

// 可任意多次调用update():
hash.update('Hello, world!');
hash.update('Hello, nodejs!');

console.log(hash.digest('hex')); // 7e1977739c748beac0c0fd14fd26a544
```

### 三、Hmac

Hmac算法也是一种哈希算法，他可以利用MD5或SHA1等哈希算法，不同的是，Hmac还需要一个秘钥：
```JS
const crypto = require('crypto');

const hmac = crypto.createHmac('sha256', 'secret-key');

hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');

console.log(hmac.digest('hex'));
```
只要密钥发生了变化，那么同样的输入数据也会得到不同的签名，因此，可以把Hmac理解为用随机数“增强”的哈希算法。

### 四、AES

AES是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持，但是需要自己封装好函数，便于使用
```JS
const crypto = require('crypto');

function aesEncrypt(data, key) {
  const cipher = crypto.createCipher('aes192', key);
  var crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function aesDecrypt(encrypted, key) {
  const decipher = crypto.createDecipher('aes192', key);
  var decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

var data = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);
```
