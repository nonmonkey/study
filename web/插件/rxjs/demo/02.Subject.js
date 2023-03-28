import { Subject } from "rxjs";

/**
可以看到，Subject的行为和发布订阅模式非常接近，subscribe去订阅，next触发。事件的订阅通过subscribe，事件的触发使用next，从而实现一个发布订阅的模式。
可以说，笔者本人是看到这个Subject，终于和已有的知识体系打通，之后才重新阅读官方文档，才算是弄懂了点皮毛。当然，subject还有别的用法，此处不再详细介绍
 */

// 创建subject
const subject = new Subject();

// 订阅一个observer
subject.subscribe(v => console.log("stream 1", v));
// 再订阅一个observer
subject.subscribe(v => console.log("stream 2", v));
// 延时1s再订阅一个observer
setTimeout(() => {
  subject.subscribe(v => console.log("stream 3", v));
}, 1000);
// 产生数据1
subject.next(1);
// 产生数据2
subject.next(2);
// 延时3s产生数据3
setTimeout(() => {
  subject.next(3);
}, 3000);
