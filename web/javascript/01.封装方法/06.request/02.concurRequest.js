const _fetch = (url = '') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('fetch url:' + url);
    }, Number.parseInt(Math.random() * 3000));
  });
};
/**
 * 并发请求
 * @param {*} urls 
 * @param {*} maxNum 
 * @returns 
 */
function concurRequest(urls = [], maxNum = 1) {
  return new Promise((resolve) => {
    const results = [];
    if (urls.length === 0) return resolve(results);

    let index = 0; // 下一个请求
    let count = 0; // 当前请求完成数量
    // 发送请求
    async function request() {
      if (index >= urls.length) return;

      const url = urls[index];
      const curIndex = index;
      index++;
      console.log('this is :', index);
      try {
        const res = await _fetch(url);
        results[curIndex] = res;
      } catch (err) {
        results[curIndex] = err;
      } finally {
        count++;
        if (count === urls.length) {
          resolve(results);
        }
        request();
      }
    }

    const times = Math.min(urls.length, maxNum);
    for (let i = 0; i < times; i++) {
      request();
    }
  });
}
