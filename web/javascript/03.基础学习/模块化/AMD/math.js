define(function () {
  var add = function () {
    var arg = Array.from(arguments);
    return arg.reduce((pre, cur) => pre + cur, 0);
  };

  var minus = function (a, b) {
    return a - b;
  };

  var multiply = function () {
    var arg = Array.from(arguments);
    return arg.reduce((pre, cur) => pre * cur, 1);
  };

  var divide = function (dividend, divisor) {
    return dividend / divisor;
  };

  return {
    add,
    minus,
    multiply,
    divide,
  };
});
