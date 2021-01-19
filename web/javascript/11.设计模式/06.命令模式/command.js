/**
  设计模式的主题总是把不变的事物和变化的事物分离开来，命令模式也不例外。

  命令模式中的命令（command） 指的是 一个执行某些待定事情的指令。

  用一种松耦合的方式来设计程序，使得请求发送者和请求接收者能够消除彼此之间的耦合关系。


  命令模式主要有四个部分：

  命令对象（command）：需要执行的命令都在此声明
  委托者（client）：创建命令对象，并把它传递给调用者
  调用者（invoker）：使用命令对象并调用它上面的方法
  接受者（receiver）：实际干活的角色，命令传递到这里被实际执行
 */

/**
  命令模式和策略模式的类图确实很相似，只是命令模式多了一个接收者（Receiver）角色。
  它们虽然同为行为类模式，但是两者的区别还是很明显的。
  策略模式的意图是封装算法，它认为“算法”已经是一个完整的、不可拆分的原子业务（
  注意这里是原子业务，而不是原子对象），即其意图是让这些算法独立，并且可以相互替换，
  让行为的变化独立于拥有行为的客户；

  而命令模式则是对动作的解耦，
  把一个动作的执行分为执行对象（接收者角色）、执行行为（命令角色），
  让两者相互独立而不相互影响。
 */

/**
  策略模式是通过不同的算法做同一件事情

  而命令模式则是通过不同的命令做不同的事情，常含有（关联）接收者。
 */

/* 菜单 start */
var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');

var setCommand = function (button, command) {
  button.onclick = function () {
    command.execute();
  };
};

var MenuBar = {
  refresh: function () {
    console.log('刷新菜单目录');
  },
};

var SubMenu = {
  add: function () {
    console.log('添加子菜单');
  },
  del: function () {
    console.log('删除子菜单');
  },
};

var RefreshMenuBarCommand = function (receiver) {
  this.receiver = receiver;
};

RefreshMenuBarCommand.prototype.execute = function () {
  this.receiver.refresh();
};

var AddSubMenuCommand = function (receiver) {
  this.receiver = receiver;
};

AddSubMenuCommand.prototype.execute = function () {
  this.receiver.add();
};

var DelSubMenuCommand = function (receiver) {
  this.receiver = receiver;
};

DelSubMenuCommand.prototype.execute = function () {
  console.log('子菜单');
};

// 最后把命令接收者传入到command对象中，并且把command对象安装到button上面
var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
var delSubMenuCommand = new DelSubMenuCommand(SubMenu);

setCommand(button1, refreshMenuBarCommand);
setCommand(button2, addSubMenuCommand);
setCommand(button3, delSubMenuCommand);
/* 菜单 end */

/* 撤消和重做:播放录像功能 start */
var Ryu = {
  attack: function () {
    console.log('攻击');
  },
  defense: function () {
    console.log('防御');
  },
  jump: function () {
    console.log('跳跃');
  },
  crouch: function () {
    console.log('蹲下');
  },
};

// 创建命令
var makeCommand = function (receiver, state) {
  return function () {
    receiver[state]();
  };
};

var commands = {
  'w': 'jump', // w 
  's': 'crouch', // s
  'a': 'defense', // a
  'd': 'attack', // d
};

var commandStack = []; // 保存命令

document.onkeypress = function (e) {
  console.log('e:', e)
  var key = e.key;
  var command = makeCommand(Ryu, commands[key]);

  if (command) {
    command(); // 执行命令
    commandStack.push(command); // 将刚执行过的命令保存进堆栈
  }
};

// 点击播放
document.getElementById('replay').onclick = function () {
  var command;
  while ((command = commandStack.shift())) {
    command();
  }
};
/* 撤消和重做:播放录像功能 end */

/* 宏命令:是一组命令的集合，通过执行宏命令的方式，可以一次执行一批命令 start */
// 宏命令是命令模式与组合模式的联用产物
// 其中，marcoCommand 被称为组合对象，closeDoorCommand、openPcCommand、openQQCommand 
// 都是叶对象。在 macroCommand 的 execute 方法里，并不执行真正的操作，而是遍历它所包含的叶对象， 
// 把真正的 execute 请求委托给这些叶对象。
// macroCommand 表现得像一个命令，但它实际上只是一组真正命令的“代理”。并非真正的代理， 
// 虽然结构上相似，但 macroCommand 只负责传递请求给叶对象，它的目的不在于控制对叶对象的访问。
var closeDoorCommand = {
  execute: function () {
    console.log('关门');
  },
};

var openPcCommand = {
  execute: function () {
    console.log('开电脑');
  },
};

var openQQCommand = {
  execute: function () {
    console.log('登陆QQ');
  },
};

var MacroCommand = function () {
  return {
    commandsList: [],

    add: function (command) {
      this.commandsList.push(command);
    },

    execute: function () {
      for (var i = 0, command; (command = this.commandsList[i]); i++) {
        command.execute();
      }
    },
  };
};

var macroCommand = MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);

macroCommand.execute();
/* 宏命令:是一组命令的集合，通过执行宏命令的方式，可以一次执行一批命令 end */
