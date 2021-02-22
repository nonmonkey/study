import './windowFunc/requestAnimationFrame';

// 使用 requestAnimationFrame 定义动画(实现setInterval)
/**
 * @param {*} fn 要执行的方法
 * @param {*} times fn 要执行的次数
 * @param {*} cb 动画执行完毕之后要执行的方法
 */
export default function animationRAF(fn, times = 1, cb) {
  let ns = {}; // 实例命名空间
  // step命名空间
  let stepNs = {
    step: null, // 需要循环执行的方法
    timer: null, // 定时器
    cb: null, // 回调函数
  };
  let noop = () => {}

  // ns初始化
  function _initNs(total = 1) {
    Object.assign(ns, {
      total, // 总执行次数
      curTimes: 0, // 当前已经执行的次数
      done: false, // 是否已经执行完毕
      running: false, // 是否正在执行
    });
  }

  // 设置只读属性，在 ns 中读取
  function _definePrivateProps(_this) {
    ['total', 'curTimes', 'done', 'running'].forEach((prop) => {
      Object.defineProperty(_this, `_${prop}`, {
        get() {
          return ns[prop];
        },
      });
    })
  }

  // step 工厂函数
  function _stepFactory(stepFunc) {
    if (typeof stepFunc !== 'function') throw new Error('参数错误，请输入一个方法！');

    return () => {
      ns.running = true;
      if (ns.curTimes < ns.total) {
        stepFunc();
        ns.curTimes++;
        stepNs.timer = requestAnimationFrame(stepNs.step);
      } else {
        cancelAnimationFrame(stepNs.timer);
        stepNs.timer = null;
        stepNs.cb && stepNs.cb();
        ns.done = true;
        ns.running = false;
      }
    };
  }

  return new (class {
    constructor() {
      this.initStep(fn, times, cb);
      _definePrivateProps(this);
    }

    // 停止
    stop() {
      if (ns.running) {
        cancelAnimationFrame(stepNs.timer);
        ns.running = false;
      }
    }

    // 运行
    run() {
      if (!ns.running) {
        if (ns.done) {
          stepNs.cb && stepNs.cb();
        } else {
          stepNs.step();
        }
      }
    }

    // 重置
    reset() {
      this.stop();
      _initNs(ns.total);
    }

    initStep(fn, times = 1, cb) {
      this.setTotal(times);
      this.setStep(fn);
      this.setCallback(cb);
    }

    // 重新设置要执行的方法
    setStep(newFunc = noop) {
      if (typeof newFunc !== 'function') throw new Error('参数错误，请输入一个方法！');
      this.stop();
      stepNs.step = _stepFactory(newFunc);
    }

    // 重新设置执行次数
    setTotal(newTimes) {
      let t = window.parseInt(newTimes)
      if (t > 0) {
        this.stop();
        _initNs(t);
      } else {
        throw new Error('[times] 请输入大于0的整数！');
      }
    }

    // 重新设置要执行的方法
    setCallback(newCb) {
      if (!newCb) return;
      if (typeof newCb !== 'function') throw new Error('参数错误，请输入一个方法！');
      this.stop();
      stepNs.cb = newCb;
    }
  })();
}

// 测试
/*
var t = 0;
function test() {
  var total = 500;
  var func = function () {
    console.log('次数：', t++);
  };
  var cb = function () {
    console.log('执行完了');
  };

  return animationRAF(func, total, cb);
}

var raf = test();
*/
