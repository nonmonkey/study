[TOC]
***

### 一、安装Typescript

```
npm install -g typescript
```

### 二、测试

greeter.ts
```TS
function greeter(person) {
  return "Hello, " + person;
}
let user = "Jane User";
document.body.innerHTML = greeter(user);
```

**编译代码：**
```
tsc greeter.ts
```
