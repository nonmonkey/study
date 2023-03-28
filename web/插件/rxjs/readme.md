[TOC]

---

### 〇、介绍

Rxjs官方是这样说的: Think of RxJS as Lodash for events. 把Rxjs想像成针对events的lodash，也就是说，Rxjs本质是个工具库，处理的是事件。这里的events，可以称之为流。

那么流是指什么呢？举个例子，代码中每1s输出一个数字，用户每一次对元素的点击，就像是在时间这个维度上，产生了一个数据集。这个数据集不像数组那样，它不是一开始都存在的，而是随着时间的流逝，一个一个数据被输出出来。这种异步行为产生的数据，就可以被称之为一个流，在Rxjs中，称之为observable（抛开英文，本质其实就是一个数据的集合，只是这些数据不一定是一开始就设定好的，而是随着时间而不断产生的）。而Rxjs，就是为了处理这种流而产生的工具，比如流与流的合并，流的截断，延迟，消抖等等操作。

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

1. subscribe不是订阅，而是启动这个流，可以看到，subscribe后，才会执行next方法 
2. 构建observable的时候，会有一个subscriber.next，这里就是控制这个流中数据的输出。

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
