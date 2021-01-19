/**
  组合模式适用于以下这两种情况:
    * 表示对象的部分整体层次结构。组合模式可以方便地构造一棵树来表示对象的部分整体结构。
      特别是我们在开发期间不确定这棵树到底存在多少层次的时候。在树的构造最终完成之后，
      只需要通过请求树的最顶层对象，便能对整棵树做统一的操作。在组合模式中增加和删除树的节点非常方便，并且符合开放封闭原则。

    * 客户希望统一对待树中的所有对象。组合模式使客户可以忽略组合对象和叶对象的区别， 
      客户在面对这棵树的时候，不用关心当前正在处理的对象是组合对象还是叶对象，
      也就不用写一堆 if、else 语句来分别处理它们。组合对象和叶对象会各自做自己正确的事情， 
      这是组合模式最重要的能力。
 */

/* 更强大的宏命令 start */
/**
 * 目前的万能遥控器，包含了关门、开电脑、登录 QQ 这 3 个命令。现在我们需要一个“超级万能遥控器”，可以控制家里所有的电器，这个遥控器拥有以下功能:
 *   打开空调
 *   打开电视和音响
 *   关门、开电脑、登陆QQ
 */
var MacroCommand = function () {
  return {
    commandsList: [],
    add: function (command) {
      this.commandsList.push(command);
    },
    execute: function () {
      for (var i = 0, command; (command = this.commandsList[i]); i++) {
        console.log(this.commandsList, command);
        command.execute();
      }
    },
  };
};

var openAcCommand = {
  execute: function () {
    console.log('打开空调');
  },
  add: function () {
    throw new Error('叶对象不能添加子节点');
  },
};

// 家里的电视和音响是连接在一起的，所以可以用一个宏命令来组合打开电视和打开音响的命令
var openTvCommand = {
  execute: function () {
    console.log('打开电视');
  },
};

var openSoundCommand = {
  execute: function () {
    console.log('打开音响');
  },
};

var macroCommand1 = MacroCommand();
macroCommand1.add(openTvCommand);
macroCommand1.add(openSoundCommand);

// 关门、打开电脑和打登录 QQ 的命令
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

var macroCommand2 = MacroCommand();
macroCommand2.add(closeDoorCommand);
macroCommand2.add(openPcCommand);
macroCommand2.add(openQQCommand);

// 所有命令组合成一个超级命令
var macroCommand = MacroCommand();
macroCommand.add(openAcCommand);
macroCommand.add(macroCommand1);
macroCommand.add(macroCommand2);

// 给遥控器绑定超级命令
var setCommand = (function (command) {
  document.getElementById('button').onclick = function () {
    command.execute();
  };
})(macroCommand);

/**
  从这个例子中可以看到，基本对象可以被组合成更复杂的组合对象，组合对象又可以被组合， 
  这样不断递归下去，这棵树的结构可以支持任意多的复杂度。在树最终被构造完成之后，
  让整颗 树最终运转起来的步骤非常简单，只需要调用最上层对象的 execute 方法。
  每当对最上层的对象 进行一次请求时，实际上是在对整个树进行深度优先的搜索，
  而创建组合对象的程序员并不关心 这些内在的细节，往这棵树里面添加一些新的节点对象是非常容易的事情。
 */
/* 更强大的宏命令 end */

/* 扫描模式的例子 扫描文件夹 start */
// 文件夹和文件之间的关系，非常适合用组合模式来描述。文件夹里既可以包含文件，
// 又可以 包含其他文件夹，最终可能组合成一棵树，组合模式在文件夹的应用中有以下两层好处

// Folder
var Folder = function (name) {
  this.name = name;
  this.parent = null;
  this.files = [];
};

Folder.prototype.add = function (file) {
  file.parent = this;
  this.files.push(file);
};

Folder.prototype.scan = function () {
  console.log('开始扫描文件夹：', this.name);
  for (var i = 0, len = this.files.length; i < len; i++) {
    this.files[i].scan();
  }
};

Folder.prototype.remove = function () {
  if (!this.parent) return; // 跟节点或者树外的游离节点

  for (var files = this.parent.files, l = files.length; l >= 0; l--) {
    if (this === files[l]) {
      files.splice(l, 1);
      return;
    }
  }
};

// file
var File = function (name) {
  this.name = name;
  this.parent = null;
};

File.prototype.add = function () {
  throw new Error('文件下面不能在添加文件');
};

File.prototype.scan = function () {
  console.log('开始扫描文件:', this.name);
};

File.prototype.remove = function() {
  if (!this.parent) return; // 跟节点或者树外的游离节点

  for (var files = this.parent.files, l = files.length; l >= 0; l--) {
    if (this === files[l]) {
      files.splice(l, 1);
      return;
    }
  }
}

var folder = new Folder('学习资料');
var folder1 = new Folder('javascript');
var folder2 = new Folder('jquery');

var file1 = new File('javaScript设计模式与开发实践');
var file2 = new File('精通jquery');
var file3 = new File('重构与设计模式');

folder1.add(file1);
folder2.add(file2);

folder.add(folder1);
folder.add(folder2);
folder.add(file3);

// 现在的需求是把移动硬盘里的文件和文件夹都复制到这棵树中，假设我们已经得到了这些文 件对象:
var folder3 = new Folder('node.js');
var file4 = new File('深入浅出Node.js');
folder3.add(file4);

var file5 = new File('javascript语言精髓与编程实践');

folder.add(folder3);
folder.add(file5);

folder2.remove();
folder.scan(); // 扫描
/* 扫描模式的例子 扫描文件夹 end */
