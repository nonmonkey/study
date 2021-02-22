[TOC]
****

### 一、URL字符串与url对象

使用 WHATWG 的 API 解析 URL 字符串：
```JS
const myURL = new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
```
使用传统的 API 解析 URL 字符串：
```JS
const url = require('url');
const myURL = url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
// url.parse 第二个参数为 true 时，将myURL.query字段设置为对象
```

### 二、WHATWG 的 URL 接口

**new URL(input[, base])**

* input <string> 要解析的绝对或相对的 URL。如果 input 是相对路径，则需要 base。 如果 input 是绝对路径，则忽略 base。
* base <string> | <URL> 如果 input 不是绝对路径，则为要解析的基本 URL。

```JS
console.log(new URL('http://user:pass@host.com:8080/path/to/file?query=string#hash'));

URL {
  href: 'http://user:pass@host.com:8080/path/to/file?query=string#hash',
  origin: 'http://host.com:8080',
  protocol: 'http:',
  username: 'user',
  password: 'pass',
  host: 'host.com:8080',
  hostname: 'host.com',
  port: '8080',
  pathname: '/path/to/file',
  search: '?query=string',
  searchParams: URLSearchParams { 'query' => 'string' },
  hash: '#hash'
}
```