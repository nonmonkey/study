[TOC]

---

### 一、基础

```JS
of('foo', 'bar')
  .subscribe((v) => { console.log(v) })

from([1,2,3])
  .subscribe((v) => { console.log(v) })

fromEvent(document.querySelector('button'), 'click')
  .subscribe((v) => { console.log('this is click:', v) })

// fromPromise(new Promise((resolve, reject) => { resolve('p'); }))
//   .subscribe(()v => { console.log('this is Promise:', v) })

var fn = (val, cb) => { console.log('this is cb.'); cb(val); }
var test = bindCallback(fn)(100);
test
  .pipe(
    map((value) => value * 2),
  )
  .subscribe((value) => console.log('***:', value));

// var rename = bindNodeCallback(fs.rename);
//   rename('file.txt', 'else.txt').subscribe(() => console.log('Renamed!'));
```

### 二、创建observables

```JS
// 1.外部产生新事件
var myObservable = new Subject();
myObservable.subscribe(value => console.log(value));
myObservable.next('foo');

// 2.内部产生新事件
var myObservable = Observable.create(subscriber => {
  subscriber.next('foo');
  const id = setTimeout(() => subscriber.next('bar'), 1000);
  return function finalizer() {
    clearInterval(id)
  }
});
var subscriber = myObservable.subscribe(value => console.log(value));
```

```JS
// 合并Observable
var button1 = fromEvent(document.querySelector('#button1'), 'click');
var button2 = fromEvent(document.querySelector('#button2'), 'click');

const obs1 = button1
  .pipe(
    map(() => state => Object.assign({}, state, {count: state.count - 1})),
  )
const obs2 = button2
  .pipe(
    map(() => state => Object.assign({}, state, {count: state.count + 1})),
  )

const obs = merge(obs1, obs2)
  .pipe(
    scan((state, changeFn) => changeFn(state), {count: 0})
  )

const s = obs.subscribe(console.log);
```

### 三、控制流动
```JS
var input = fromEvent(document.querySelector('input'), 'input');
// 过滤掉小于3个字符长度的目标值
input
  .pipe(
    map(event => event.target.value),
    filter(value => value.length > 2),
  )
  .subscribe(value => console.log(value));
// 延迟事件
input
  .pipe(
    delay(2000),
    map((event) => event.target.value)
  )
  .subscribe((value) => console.log(value));
// 节流
input
  .pipe(
    throttleTime(2000),
    map((event) => event.target.value)
  )
  .subscribe((value) => console.log(value));
// 防抖
input
  .pipe(
    debounceTime(600),
    map((event) => event.target.value)
  )
  .subscribe((value) => console.log(value));
// 在3次事件后停止事件流
input
  .pipe(
    take(3),
    map((event) => event.target.value)
  )
  .subscribe((value) => console.log(value));
// 直到其他 observable 触发事件才停止事件流
var stopStream = fromEvent(document.querySelector('button'), 'click');
input
  .pipe(
    takeUntil(stopStream),
    map((event) => event.target.value),
  )
  .subscribe((value) => console.log(value));
```

### 四、产生值

```JS
var input = fromEvent(document.querySelector('input'), 'input');

input
  .pipe(
    map((value) => value * 2), // 传递一个新的值
    pluck('target', 'value'), // 通过提取属性传递一个新的值
    pairwise(), // 传递之前的两个值(只有一个值时不传递)
    distinct(), // 只会传递唯一的值(已有的值不传递)
    distinctUntilChanged(), // 不会传递重复的值(与上一个值相同时，不再传递)
  .subscribe((value) => console.log('***:', value));
```

### 五、状态存储

```JS
var button = fromEvent(document.querySelector('button'), 'click');

const obs = button
  .pipe(
    // 我们映射到一个函数，它会改变状态
    map(() => state => Object.assign({}, state, {count: state.count + 1})),
    scan((state, changeFn) => changeFn(state), {count: 0})
  )
const s = obs.subscribe(console.log);
```

```JS
// 现在我们还可以再添加几个 observables ，它们同样也可以更改同一个状态存储。
var button1 = fromEvent(document.querySelector('#button1'), 'click');
var button2 = fromEvent(document.querySelector('#button2'), 'click');

const obs1 = button1
  .pipe(
    map(() => state => Object.assign({}, state, {count: state.count - 1})),
  )
const obs2 = button2
  .pipe(
    map(() => state => Object.assign({}, state, {count: state.count + 1})),
  )

const obs = merge(obs1, obs2)
  .pipe(
    scan((state, changeFn) => changeFn(state), {count: 0})
  )

const s = obs.subscribe(console.log);
```
