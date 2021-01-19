/**
js实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善下面代码中的Scheduler类。

class Scheduler {
  add(promiseCreator) {}
}
const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });
const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};
 */

class Scheduler {
  constructor(count) {
    this.count = count || 2;
    this.queue = [];
    this.run = [];
  }

  add(promiseCreator) {
    this.queue.push(promiseCreator);
    return this.schedule();
  }

  schedule() {
    if (this.run.length < this.count && this.queue.length) {
      const task = this.queue.shift();
      const promise = task().then(() => {
        console.log('promise then:', this.run.indexOf(promise));
        this.run.splice(this.run.indexOf(promise), 1);
      });
      this.run.push(promise);
      console.log('if:', this.run.length, this.queue.length);
      return promise;
    } else {
      console.log('else:', this.run.length, this.queue.length);
      return Promise.race(this.run).then(() => {
        console.log('*********');
        return this.schedule();
      });
    }
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    console.log('setTimeout time:', time);
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler
    .add(() => timeout(time))
    .then(() => {
      console.log('addTask order:', order);
    });
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
// addTask(100, '4');
addTask(400, '4');
