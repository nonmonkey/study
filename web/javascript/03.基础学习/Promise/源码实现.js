function MyPromise(executor) {
  let self = this;
  self.status = 'Pending';
  self.resolveValue = null;
  self.rejectReason = null;

  self.resolveCallbackList = [];
  self.rejectCallbackList = [];

  function resolve(value) {
    if (self.status === 'Pending') {
      self.status = 'Fulfilled';
      self.resolveValue = value;
      self.resolveCallbackList.forEach((ele) => {
        ele();
      });
    }
  }

  function reject(reason) {
    if (self.status === 'Pending') {
      self.status = 'Rejected';
      self.rejectReason = reason;
      self.rejectCallbackList.forEach((ele) => {
        ele();
      });
    }
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

function ResolutionReturnPromise(returnValue, resolve, reject) {
  if (returnValue instanceof MyPromise) {
    returnValue.then(
      function (val) {
        resolve(val);
      },
      function (reason) {
        reject(reason);
      }
    );
  } else {
    resolve(returnValue);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  let self = this;

  if (!onFulfilled) {
    onFulfilled = function (val) {
      return val;
    };
  }

  if (!onRejected) {
    onRejected = function (reason) {
      return new Error(reason);
    };
  }

  return new MyPromise(function (resolve, reject) {
    let resolveCallback = function () {
      setTimeout(() => {
        try {
          let nextResolveValue = onFulfilled(self.resolveValue);
          ResolutionReturnPromise(nextResolveValue, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    };

    let rejectCallback = function () {
      setTimeout(() => {
        try {
          let nextRejectValue = onRejected(self.rejectReason);
          ResolutionReturnPromise(nextRejectValue, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    };

    if (self.status === 'Fulfilled') {
      // 同步代码 Fulfilled
      resolveCallback();
    } else if (self.status === 'Rejected') {
      // 同步代码 Rejected
      rejectCallback();
    } else if (self.status === 'Pending') {
      // 异步代码 Pending
      self.resolveCallbackList.push(resolveCallback);
      self.rejectCallbackList.push(rejectCallback);
    }
  });
};

MyPromise.prototype.catch = function (onRejected) {
  let self = this;

  if (!onRejected) {
    onRejected = function (reason) {
      throw new Error(reason);
    };
  }

  return new MyPromise(function (resolve, reject) {
    let rejectCallback = function () {
      setTimeout(() => {
        try {
          let nextRejectValue = onRejected(self.rejectReason);
          ResolutionReturnPromise(nextRejectValue, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    };

    if (self.status === 'Rejected') {
      // 同步代码 Rejected
      rejectCallback();
    } else if (self.status === 'Pending') {
      // 异步代码 Pending
      self.rejectCallbackList.push(rejectCallback);
    }
  });
};

MyPromise.resolve = function (val) {
  if (val instanceof MyPromise) {
    return val;
  } else if (val instanceof Object && 'then' in val) {
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        val.then(resolve, reject);
      }, 0);
    });
  } else {
    return new MyPromise((resolve) => {
      resolve(val);
    });
  }
};

MyPromise.reject = function (val) {
  return new MyPromise((resolve, reject) => {
    reject(val);
  });
};

MyPromise.race = function (promiseArr) {
  return new MyPromise(function (resolve, reject) {
    promiseArr.forEach(function (promise) {
      promise.then(resolve, reject);
    });
  });
};

MyPromise.all = function (promiseArr) {
  let count = 0;
  let promiseNum = promiseArr.length;
  let result = new Array(promiseNum);
  return new MyPromise(function (resolve, reject) {
    for (let i = 0; i < promiseNum; i++) {
      var tmpPro = promiseArr[i];
      if (tmpPro instanceof MyPromise) {
        tmpPro.then(
          (res) => {
            count++;
            result[i] = res;
            if (count === promiseArr.length) {
              resolve(result);
            }
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        count++;
        result[i] = tmpPro;
        if (count === promiseArr.length) {
          resolve(result);
        }
      }
    }
  });
};

MyPromise.allSettled = function (promiseArr) {
  let count = 0;
  let promiseNum = promiseArr.length;
  let result = new Array(promiseNum);
  return new MyPromise(function (resolve) {
    for (let i = 0; i < promiseNum; i++) {
      var tmpPro = promiseArr[i];
      if (tmpPro instanceof MyPromise) {
        tmpPro.then(
          (res) => {
            count++;
            result[i] = { status: 'fulfilled', value: res };
            if (count === promiseArr.length) {
              resolve(result);
            }
          },
          (err) => {
            count++;
            result[i] = { status: 'rejected', value: err };
            if (count === promiseArr.length) {
              resolve(result);
            }
          }
        );
      } else {
        count++;
        result[i] = tmpPro;
        if (count === promiseArr.length) {
          resolve(result);
        }
      }
    }
  });
};

MyPromise.any = function (promiseArr) {
  let count = 0;
  let promiseNum = promiseArr.length;
  return new MyPromise(function (resolve, reject) {
    for (let i = 0; i < promiseNum; i++) {
      var tmpPro = promiseArr[i];
      if (tmpPro instanceof MyPromise) {
        tmpPro.then(
          (res) => {
            resolve(res)
          },
          () => {
            count++;
            if (count === promiseNum) {
              reject('AggregateError: All promises were rejected');
            }
          }
        );
      } else {
        resolve(tmpPro)
      }
    }
  });
};
