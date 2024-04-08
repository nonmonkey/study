Promise.myAll = function (proms) {
  let res;
  let rej;
  const p = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });

  const result = [];
  let count = 0; // 数量
  let fulFilledCount = 0;
  for (const prom of proms) {
    const i = count;
    count++;
    Promise.resolve(prom)
      .then(data => {
        result[i] = data;
        fulFilledCount++;
        if (fulFilledCount === count) {
          res(result)
        }
      })
      .catch(rej)
  }
  if (count === 0) {
    res(result);
  }

  return p;
}
