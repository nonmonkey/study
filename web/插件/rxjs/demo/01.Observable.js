import {
  Observable
} from 'rxjs';

/**
1. stream$, 对应到Rxjs中，就是一个observable，单纯从英文翻译到中文的含义来看，基本很难理解。
但是它的本质其实就是一个随时间不断产生数据的一个集合，称之为流更容易理解。
而其对象存在一个subscribe方法，调用该方法后，才会启动这个流（也就是数据才会开始产生），这里需要注意的是多次启动的每一个流都是独立的，互不干扰。

2. observer，代码中是stream$.subscribe(observer)，对应到Rxjs中，也是称之为observer，从英文翻译到中文的含义来看，也很难理解。
从行为上来看，无非就是定义了如何处理上述流产生的数据，称之为流的处理方法，更容易理解

3. subscriber ，也就是const subscriber = stream$.subscribe(observer);，
这里对应到Rxjs，英文也是称之为subscriber，翻译过来是订阅者，也是比较难以理解，其实它的本质就是暂存了一个启动后的流，
每一个启动后的流都是相互独立的，而这个启动后的流，就存储在 subscriber 中，提供了 unsubscribe ，来停止这个流。


subscriber = observable.subscribe(observer)
observable: 随着时间产生的数据集合，可以理解为流，其subscribe方法可以启动该流
observer: 决定如何处理数据
subscriber: 存储已经启动过的流，其unsubscribe方法可以停止该流
 */

// 记录时间
const now = new Date().getTime();

// 创建流
const stream$ = new Observable(subscriber => {
  setTimeout(() => {
    subscriber.next([1, 2, 3]);
  }, 500);
  setTimeout(() => {
    subscriber.next({ a: 1000 });
  }, 1000);
  setTimeout(() => {
    subscriber.next("end");
  }, 3000);
  setTimeout(() => {
    subscriber.complete();
  }, 4000);
});

// 启动流
const subscriber1 = stream$.subscribe({
  next: v => console.log(new Date().getTime() - now, "ms stream1", v),
  complete: () => console.log(new Date().getTime() - now, "ms stream1", "done"),
  error: () => console.log("error")
});

// 启动流
const subscriber2 = stream$.subscribe({
  next: v => console.log(new Date().getTime() - now, "ms stream2", v)
});

// 停止流
setTimeout(() => {
  subscriber1.unsubscribe();
  subscriber2.unsubscribe();
}, 6000);
