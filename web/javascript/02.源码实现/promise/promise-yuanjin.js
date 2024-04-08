const STATE_PENDING = 'pending';
const STATE_FULFILLED = 'fulfilled';
const STATE_REJECTED = 'rejected';

const isPromiseLike = function (value) {
  if (value != null && (typeof value === 'object' || typeof value === 'function')) {
    return typeof value.then === 'function';
  }
  return false;
};

class MyPromise {
  #state = STATE_PENDING;
  #result = undefined;
  #handlers = [];

  #changeState(state, result) {
    if (this.#state !== STATE_PENDING) return;

    this.#state = state;
    this.#result = result;

    this.#run();
  }

  #runMicroTask(func) {
    if (typeof process === 'object' && typeof process.nextTick === 'function') {
      process.nextTick(func);
    } else if (typeof MutationObserver === 'function') {
      const ob = new MutationObserver(func);
      const textNode = document.createTextNode('1');
      ob.observe(textNode, {
        characterData: true,
      });
      textNode.data = '2';
    } else {
      setTimeout(func, 0);
    }
  }

  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback === 'function') {
        try {
          const data = callback(this.#result);
          if (isPromiseLike(data)) {
            data.then(resolve, reject);
          } else {
            resolve(data);
          }
        } catch (error) {
          reject(error);
        }
      } else {
        const settled = this.#state === STATE_FULFILLED ? resolve : reject;
        settled(this.#result);
      }
    });
  }

  #run() {
    if (this.#state === STATE_PENDING) return;

    while (this.#handlers.length) {
      const { onFulfilled, onRejected, resolve, reject } = this.#handlers.shift();

      if (this.#state === STATE_FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject);
      } else {
        this.#runOne(onRejected, resolve, reject);
      }
    }
  }

  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(STATE_FULFILLED, data);
    };
    const reject = (reason) => {
      this.#changeState(STATE_REJECTED, reason);
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });
      this.#run();
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(onFinally) {
    return this.then(
      (data) => {
        onFinally();
        return data;
      },
      (err) => {
        onFinally();
        throw err;
      }
    );
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value;

    var _resolve = null;
    var _reject = null;
    var p = new MyPromise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    if (isPromiseLike(value)) {
      value.then(_resolve, _reject);
    } else {
      _resolve(value);
    }

    return p;
  }

  static reject(value) {
   return new MyPromise((resolve, reject) => {
      reject(value);
    });
  }
}

MyPromise.reject(123).catch(err => {
  console.log('errrrrr', err);
});
