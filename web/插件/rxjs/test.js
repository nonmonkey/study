console.log('****this is start.****');
const {
  Observable,
  Subject, // 允许将值多播到许多 Observer。普通的 Observable 是单播的（每个订阅的 Observer 拥有 Observable 的独立执行），而 Subject 是多播的。
  ReplaySubject,

  /** 创建运算符 */
  of,
  from,
  interval,
  fromEvent,
  bindCallback,
  bindNodeCallback,
  timer,
  defer,
  EMPTY,
  throwError,

  /** 加入创作运营商 */
  merge, // 合并 observables

  concatMap,
  map, // 映射
  pluck, // 按路径取值
  scan, // 每次 scan 归并后，立即触发 subscribe.
  startWith,
  pairwise,
  forkJoin, // 等待可订阅对象完结然后合并他们最后触发的值, 只会触发一次，然后立即完结
  sampleTime,
  sample,

  multicast,

  filter, // 过滤
  throttleTime, // 节流
  debounceTime, // 防抖
  take, // 执行次数
  takeUntil, // 直到某个操作就停止
  distinct,
  distinctUntilChanged,
  combineLatest,

  delay, // 延迟

  reduce, // 每次 reduce 归并后，没有立即触发 subscribe，而是在最终结束归并后，才发出消息。
} = window.rxjs;

console.log('rxjs:', rxjs);

const weight = of(70, 72, 76);
const height = of(1.76, 1.77, 1.78);
const bmi = combineLatest([weight, height]).pipe(
  map(([w, h]) => { console.log(w, h); return w / (h * h) }),
);
bmi.subscribe(x => console.log('BMI is ' + x));

console.log('****this is end.****');
