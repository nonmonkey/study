/**
  策略模式的定义是:定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

  优点：
    1.策略模式利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句
    2.策略模式提供了对开放—封闭原则的完美支持，将算法封装在独立的 strategy 中，使得它们易于切换，易于理解，易于扩展。
    3.策略模式中的算法也可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作
    4.在策略模式中利用组合和委托来让 Context 拥有执行算法的能力，这也是继承的一种更轻便的替代方案。

  缺点：
    1.要使用策略模式，必须了解所有的 strategy，必须了解各个 strategy 之间的不同点， 这样才能选择一个合适的 strategy。
     此时 strategy 要向客户暴露它的所有实现，这是违反最少 知识原则的。
 */

var s = {
  S: function (salary) {
    return salary * 4;
  },
  A: function (salary) {
    return salary * 3;
  },
  B: function (salary) {
    return salary * 2;
  },
};

var calculateBonus = function (level, salary) {
  return s[level](salary);
};
console.log(calculateBonus('S', 20000));
console.log(calculateBonus('A', 10000));
// 输出:80000 // 输出:30000

/* 实例: 表单校验 start */
var formStrategies = {
  isNonEmpty: function (value, errorMsg) {
    if (value === '') return errorMsg;
  },
  minLength: function (value, length, errorMsg) {
    if (value.length < length) return errorMsg;
  },
  isMobile: function (value, errorMsg) {
    if (!/^1[3|5|8][0-9]{9}$/.test(value)) return errorMsg;
  },
};

var validataFunc = function () {
  var validator = new Validator(); // 创建一个validator对象
  // 添加校验规则
  validator.add(registerForm.userName, [
    { strategy: 'isNonEmpty', errorMsg: '用户名不能为空' },
    { strategy: 'minLength:6', errorMsg: '用户名长度不能小于 10 位' },
  ]);

  validator.add(registerForm.password, [{ strategy: 'minLength:6', errorMsg: '密码长度不能小于 6 位' }]);

  validator.add(registerForm.phoneNumber, [{ strategy: 'isMobile', errorMsg: '手机号码格式不正确' }]);

  var errorMsg = validator.start(); // 获得校验结果

  return errorMsg; // 返回校验结果
};

var registerForm = document.getElementById('registerForm');
registerForm.onsubmit = function () {
  var errorMsg = validataFunc(); // 如果errorMsg有确切的返回值，说明未通过校验
  if (errorMsg) {
    console.log('errorMsg:', errorMsg)
    return false;
  }
};

var Validator = function () {
  this.cache = [];
};

Validator.prototype.add = function (dom, rules) {
  var self = this;
  for (var i = 0; i < rules.length; i++) {
    (function (rule) {
      var strategyAry = rule.strategy.split(':');
      var errorMsg = rule.errorMsg;

      self.cache.push(function () {
        var strategy = strategyAry.shift();
        strategyAry.unshift(dom.value);
        strategyAry.push(errorMsg);
        return formStrategies[strategy].apply(dom, strategyAry);
      });
    })(rules[i]);
  }
};

Validator.prototype.start = function () {
  for (var i = 0; i < this.cache.length; i++) {
    var msg = this.cache[i]();
    if (msg) return msg;
  }
};
/* 表单校验 end */
