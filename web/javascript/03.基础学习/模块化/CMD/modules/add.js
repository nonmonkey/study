define(function(require, exports, module) {

  var add = function(a, b) {
    return a + b;
  }

  var str = require('./str');

  // exports.add = add;

  module.exports = add;
});
