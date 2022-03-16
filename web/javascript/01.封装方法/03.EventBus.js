class EventEmitter {
  constructor() {
    //存储事件
    this.events = new Map();
  }

  addListener(type, fn) {
    if (!this.events.get(type)) {
      this.events.set(type, [fn]);
    } else {
      this.events.get(type).push(fn);
    }
  }

  emit(type) {
    let handlers = this.events.get(type);
    for (let i = 0, len = handlers.length; i < len; i++) {
      handlers[i].apply(this, Array.from(arguments).slice(1));
    }
  }

  remove(type, fn) {
    if (fn) {
      let handlers = this.events.get(type);
      if (handlers) {
        let index = handlers.findIndex((_fn) => _fn === fn);
        if (index > -1) {
          handlers.splice(index, 1);
          this.events.set(type, handlers);
          if (this.events.get(type).length === 0) {
            this.remove(type);
          }
        }
      }
    } else {
      this.events.delete(type);
    }
  }
}

//测试
let emitter = new EventEmitter();
emitter.addListener('ages', (age) => {
  console.log(age);
});
emitter.addListener('ages', (age) => {
  console.log('ages:', age + 10000);
});
emitter.addListener('name', (name) => {
  console.log('this is name;::', name);
});
emitter.emit('ages', 24);
