/* */
/*
let index = 0;

const request = () => {
  return new Promise((resolve, reject) => {
    let time = Math.random() * 3000;
    let current = ++index;
    setTimeout(() => {
      resolve(current);
    }, time);
  });
};

async function handleClick() {
  const res = await request();
  console.log(`响应第 ${res} 个请求！`);
  document.querySelector('#ipt').value = `这是第 ${res} 个请求的处理结果！`;
}
*/

let index = 0;
let cancel;

const request = (index, cancelToken) => {
  return new Promise((resolve, reject) => {
    let time = Math.random() * 3000;
    let timer = setTimeout(() => {
      timer = null;
      resolve(index);
    }, time);

    if (cancelToken) {
      cancelToken.promise.then((reason) => {
        if (!timer) {
          return;
        }

        clearTimeout(timer);
        timer = null;
        reject(reason);
      })
    }
  });
};

/** Cancel */
class Cancel {
  constructor(message) {
    this.message = message;
  }
}

/** cancel token */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.')
    }
    this.resson = null;
    let token = this;

    this.promise = new Promise((resolve) => {
      executor(function cancel(message) {
        // 防止多次调用cancel
        if (token.reason) {
          return;
        }

        token.resson = new Cancel(message);
        resolve(token.resson);
      })
    })
  }
}

async function handleClick() {
  if (cancel) {
    cancel(`取消第 ${index} 个请求!`);
  }
  index++;

  const res = await request(index, new CancelToken((c) => {
    cancel = c;
  }));
  console.log('res:', res)
  document.querySelector('#ipt').value = `这是第 ${res} 个请求的处理结果！`;
}

/* 简单方法 */
/*
let index = 0;
let cancel;

const request = (index) => {
  return new Promise((resolve, reject) => {
    let time = Math.random() * 3000;
    let timer = setTimeout(() => {
      timer = null;
      cancel = null;
      resolve(index);
    }, time);

    cancel = (message) => {
      if (timer) {
        clearTimeout(timer);
        reject(message);
      }
      cancel = null;
    }
  });
};

async function handleClick() {
  if (cancel) {
    cancel(`取消第 ${index} 个请求!`);
  }
  index++;

  const res = await request(index);
  console.log('res:', res)
  document.querySelector('#ipt').value = `这是第 ${res} 个请求的处理结果！`;
}
*/
