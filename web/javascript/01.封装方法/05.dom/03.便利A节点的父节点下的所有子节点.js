var b = document.getElementById('a').parentElement.children;
console.log('b::', b)

if (b != null && typeof b != 'undefined' && b != '') {
  b.map(item => {
    console.log(item);
  })
}
