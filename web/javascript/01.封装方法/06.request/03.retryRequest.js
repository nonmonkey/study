const _fetch = (url = '', count) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve('fetch true url ' + count + ':' + url);
      } else {
        reject(new Error('fetch false url ' + count + ':' + url));
      }
    }, Number.parseInt(Math.random() * 1000));
  });
};

/**
 * 如果错误重新调用
 * @param {*} url 
 * @param {*} maxCount 
 * @returns 
 */
function retryRequest(url, maxCount = 5) {
  return _fetch(url, maxCount)
    .catch((err) => {
      return maxCount <= 0 ? Promise.reject(err) : retryRequest(url, maxCount - 1);
    });
}

retryRequest('7777777').then(res=> {
  console.log('成功了:', res)
}).catch(err=> {
  console.log('失败了:', err)
})
