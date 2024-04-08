function MyPromise(executor) {
  var self = this;
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
      })
    }
  }

  function reject(reason) {
    if (self.status === 'Pending') {
      self.status = 'Rejected';
      self.rejectReason = reason;
      self.rejectCallbackList.forEach((ele) => {
        ele();
      })
    }
  }

  try {
    executor(resolve, reject);
  } catch(e) {
    reject(e);
  }
}

function ResolutionReturnPromise(nextPromise, returnValue, resolve, reject) {
  if (returnValue instanceof MyPromise) {
    returnValue.then(function(val) {
      resolve(val);
    }, function(reason) {
      reject(reason);
    })
  } else {
    resolve(returnValue);
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  var self = this;

  if (!onFulfilled) {
    onFulfilled = function(val) {
      return val;
    }
  }

  if (!onRejected) {
    onRejected = function(reason) {
      throw new Error(reason);
    }
  }

  var nextPromise = new MyPromise(function(resolve, reject) {

    // 同步代码
    if (self.status === 'Fulfilled') {
      setTimeout(() => {
        try {
          var nextResolveValue = onFulfilled(self.resolveValue);
          ResolutionReturnPromise(nextPromise, nextResolveValue, resolve, reject);
          // var nextResolveValue = onFulfilled(self.resolveValue);
          // resolve(nextResolveValue);
        } catch(e) {
          reject(e);
        }
      }, 0);
    }
    if (self.status === 'Rejected') {
      setTimeout(() => {
        try {
          var nextRejectValue = onRejected(self.rejectReason);
          ResolutionReturnPromise(nextPromise, nextRejectValue, resolve, reject);
          // var nextRejectValue = onRejected(self.rejectReason);
          // reject(nextRejectValue);
        } catch(e) {
          reject(e);
        }
      }, 0);
    }

    // 异步代码
    if (self.status === 'Pending') {
      self.resolveCallbackList.push(function() {
        setTimeout(() => {
          try {
            var nextResolveValue = onFulfilled(self.resolveValue);
            ResolutionReturnPromise(nextPromise, nextResolveValue, resolve, reject);
            // var nextResolveValue = onFulfilled(self.resolveValue);
            // resolve(nextResolveValue);
          } catch(e) {
            reject(e);
          }
        }, 0);
      })

      self.rejectCallbackList.push(function() {
        setTimeout(() => {
          try {
            var nextRejectValue = onRejected(self.rejectReason);
            ResolutionReturnPromise(nextPromise, nextRejectValue, resolve, reject);
            // var nextRejectValue = onRejected(self.rejectReason);
            // reject(nextRejectValue);
          } catch(e) {
            reject(e);
          }
        }, 0);
      })
    }

  })

  return nextPromise;
}

MyPromise.race = function(promiseArr) {
  return new MyPromise(function(resolve, reject) {
    promiseArr.forEach(function(promise) {
      promise.then(resolve, reject);
    })
  })
}