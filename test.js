var p = new Promise((res, rej) => {
  setTimeout(() => {
    rej(123);
  }, 1000);
});
p.then(
  (s) => {
    console.log(111, s);
    return 1111;
  },
  (e) => {
    console.log(222, e);
    return 222;
  }
).finally((res) => {
  console.log(99, res);
});
