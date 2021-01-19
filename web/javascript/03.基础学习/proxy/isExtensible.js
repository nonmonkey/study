/**
 * isExtensible方法拦截Object.isExtensible操作。
 */
var p = new Proxy({}, {
  isExtensible: function(target) {
    console.log("called");
    return Reflect.isExtensible(target);
  }
});

Object.isExtensible(p)
// "called"
// true
