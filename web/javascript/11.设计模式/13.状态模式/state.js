/**
  状态模式是一种非同寻常的优秀模式，它也许是解决某些需求场景的最好方法。虽然状态模 式并不是一种简单到一目了然的模式(它往往还会带来代码量的增加)，但你一旦明白了状态模 式的精髓，以后一定会感谢它带给你的无与伦比的好处。
  状态模式的关键是区分事物内部的状态，事物内部状态的改变往往会带来事物的行为改变。

  优点:
    * 状态模式定义了状态与行为之间的关系，并将它们封装在一个类里。通过增加新的状态 类，很容易增加新的状态和转换。
    * 避免 Context 无限膨胀，状态切换的逻辑被分布在状态类中，也去掉了 Context 中原本过 5 多的条件分支。
    * 用对象代替字符串来记录当前状态，使得状态的切换更加一目了然。
    * Context 中的请求动作和状态类中封装的行为可以非常容易地独立变化而互不影响。

  缺点:
    状态模式的缺点是会在系统中定义许多状态类，编写 20 个状态类是一项枯燥乏味的工作， 
    而且系统中会因此而增加不少对象。另外，由于逻辑分散在状态类中，虽然避开了不受欢迎的条件分支语句，
    但也造成了逻辑分散的问题，我们无法在一个地方就看出整个状态机的逻辑。
 */

/* 电灯程序 start */
{
  let Light = function () {
    this.state = 'off'; // 电灯的初始状态
    this.button = null; // 电灯开关按钮
  };

  Light.prototype.init = function () {
    let button = document.createElement('button');
    let self = this;

    button.innerHTML = '开关';
    this.button = document.body.appendChild(button);
    this.button.onclick = function () {
      self.buttonWasPressed();
    };
  };

  // 开关按下
  Light.prototype.buttonWasPressed = function () {
    if (this.state === 'off') {
      console.log('开灯');
      this.state = 'on';
    } else if (this.state === 'on') {
      console.log('关灯');
      this.state = 'off';
    }
  };

  let test = function () {
    let light = new Light();
    light.init();
  };
  // test();
  /**
    令人遗憾的是，这个世界上的电灯并非只有一种。许多酒店里有另外一种电灯，这种电灯也 只有一个开关，但它的表现是:第一次按下打开弱光，第二次按下打开强光，第三次才是关闭电 灯

    Light.prototype.buttonWasPressed = function(){ if ( this.state === 'off' ){
      console.log( '弱光' );
      this.state = 'weakLight';
    } else if ( this.state === 'weakLight' ) {
      console.log( '强光' );
      this.state = 'strongLight';
    } else if ( this.state === 'strongLight' ) {
      console.log( '关灯' );
      this.state = 'off'; }
    };

    * 很明显 buttonWasPressed 方法是违反开放封闭原则的，每次新增或者修改 light 的状态， 都需要改动 buttonWasPressed 方法中的代码，这使得 buttonWasPressed 成为了一个非常不 稳定的方法
    * 所有跟状态有关的行为，都被封装在 buttonWasPressed 方法里，如果以后这个电灯又增加 了强强光、超强光和终极强光，那我们将无法预计这个方法将膨胀到什么地步。在实际开发中，要处理的事情可能比这多得多，也就是说，buttonWasPressed 方法要比现在庞大得多。
    * 状态的切换非常不明显，我们也没有办法一目了然地明 白电灯一共有多少种状态，除非耐心地读完 buttonWasPressed 方法里的所有代码。当状 态的种类多起来的时候，某一次切换的过程就好像被埋藏在一个巨大方法的某个阴暗角 落里。
    * 状态之间的切换关系，不过是往 buttonWasPressed 方法里堆砌 if、else 语句，增加或者修 改一个状态可能需要改变若干个操作，这使 buttonWasPressed 更加难以阅读和维护。
   */
}
/* 电灯程序 end */

/* 状态模式改进电灯程序 start */
{
  let Light = function () {
    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);
    this.button = null;
  };

  Light.prototype.init = function () {
    let button = document.createElement('button');
    let self = this;

    this.button = document.body.appendChild(button);
    this.button.innerHTML = '开关';
    this.curState = this.offLightState; // 设置当前状态
    this.button.onclick = function () {
      self.curState.buttonWasPressed();
    };
    console.log(this);
  };

  Light.prototype.setState = function (newState) {
    this.curState = newState;
  };

  // 状态
  let State = function () {};
  State.prototype.buttonWasPressed = function () {
    throw new Error('父类的buttonWasPressed方法必须被重写');
  };

  // OffLightState
  let OffLightState = function (light) {
    this.light = light;
  };

  OffLightState.prototype = new State();
  OffLightState.prototype.buttonWasPressed = function () {
    console.log('弱光');
    this.light.setState(this.light.weakLightState); // 切换到weakLightState;
  };

  // WeakLightState
  let WeakLightState = function (light) {
    this.light = light;
  };

  WeakLightState.prototype = new State();
  WeakLightState.prototype.buttonWasPressed = function () {
    console.log('强光');
    this.light.setState(this.light.strongLightState); // 切换状态到strongLightState
  };

  // StrongLightState
  let StrongLightState = function (light) {
    this.light = light;
  };

  StrongLightState.prototype = new State();
  StrongLightState.prototype.buttonWasPressed = function () {
    console.log('关灯');
    this.light.setState(this.light.offLightState); // 切换状态到offLightState
  };

  let test = function () {
    let light = new Light();
    light.init();
  };
  // test();
}
/* 状态模式改进电灯程序 end */

/* 文件上传 start */
{
  window.external.upload = function (state) {
    console.log(state); // 可能为sign,uploading,done,error
  };

  let plugin = (function () {
    let plugin = document.createElement('embed');
    plugin.style.display = 'none';
    plugin.type = 'application/txftn-webkit';

    plugin.sign = function () {
      console.log('开始文件扫描');
    };
    plugin.pause = function () {
      console.log('暂停文件上传');
    };
    plugin.uploading = function () {
      console.log('开始文件上传');
    };
    plugin.del = function () {
      console.log('删除文件上传');
    };
    plugin.done = function () {
      console.log('文件上传完成');
    };

    document.body.appendChild(plugin);
    return plugin;
  })();

  let Upload = function (fileName) {
    this.plugin = plugin;
    this.fileName = fileName;
    this.button1 = null;
    this.button2 = null;
    this.state = 'sign'; // 设置初始状态为waiting
  };

  Upload.prototype.init = function () {
    this.dom = document.createElement('div');
    this.dom.innerHTML = `
      <span>文件名称:${this.fileName}</span>
      <button data-action="button1">扫描中</button>
      <button data-action="button2">删除</button>
    `;
    document.body.appendChild(this.dom);
    this.button1 = this.dom.querySelector('[data-action="button1"]'); // 第一个按钮
    this.button2 = this.dom.querySelector('[data-action="button2"]'); // 第二个按钮
    this.bindEvent();
  };

  Upload.prototype.bindEvent = function () {
    let self = this;
    this.button1.onclick = function () {
      if (self.state === 'sign') {
        // 扫描状态下，任何操作无效
        console.log('扫描中，点击无效');
      } else if (self.state === 'uploading') {
        // 上传中，点击切换到暂停
        self.changeState('pause');
      } else if (self.state === 'pause') {
        // 暂停中，点击切换到上传中
        self.changeState('uploading');
      } else if (self.state === 'done') {
        console.log('文件已完成上传，点击无效');
      } else if (self.state === 'error') {
        console.log('文件上传失败，点击无效');
      }
    };

    this.button2.onclick = function () {
      console.log('button2::', self.state);
      if (self.state === 'done' || self.state === 'error' || self.state === 'pause') {
        // 上传完成、上传失败和暂停状态下可以删除
        self.changeState('del');
      } else if (self.state === 'sign') {
        console.log('文件正在扫描中，不能删除');
      } else if (self.state === 'uploading') {
        console.log('文件正在上传中，不能删除');
      }
    };
  };

  Upload.prototype.changeState = function (state) {
    this.state = state;
    switch (state) {
      case 'sign':
        this.plugin.sign();
        this.button1.innerHTML = '扫描中，任何操作无效';
        break;
      case 'uploading':
        this.plugin.uploading();
        this.button1.innerHTML = '正在上传，点击暂停';
        break;
      case 'pause':
        this.plugin.pause();
        this.button1.innerHTML = '已暂停，点击继续上传';
        break;
      case 'done':
        this.plugin.done();
        this.button1.innerHTML = '上传完成';
        break;
      case 'error':
        this.button1.innerHTML = '上传失败';
        break;
      case 'del':
        this.plugin.del();
        this.dom.parentNode.removeChild(this.dom);
        console.log('删除完成');
        break;
    }
  };

  let test = function () {
    let uploadObj = new Upload('JavaScript 设计模式与开发实践');
    uploadObj.init();
    window.external.upload = function (state) {
      // 插件调用 JavaScript 的方法
      uploadObj.changeState(state);
    };
    window.external.upload('sign'); // 文件开始扫描
    setTimeout(function () {
      window.external.upload('uploading'); // 1 秒后开始上传
    }, 1000);
    setTimeout(function () {
      window.external.upload('done'); // 5 秒后上传完成
    }, 5000);
  };
  // test();
}
/* 文件上传 end */

/* 状态模式重构文件上传程序 start */
{
  window.external.upload = function (state) {
    console.log(state); // 可能为sign,uploading,done,error
  };

  let plugin = (function () {
    let plugin = document.createElement('embed');
    plugin.style.display = 'none';
    plugin.type = 'application/txftn-webkit';

    plugin.sign = function () {
      console.log('开始文件扫描');
    };
    plugin.pause = function () {
      console.log('暂停文件上传');
    };
    plugin.uploading = function () {
      console.log('开始文件上传');
    };
    plugin.del = function () {
      console.log('删除文件上传');
    };
    plugin.done = function () {
      console.log('文件上传完成');
    };

    document.body.appendChild(plugin);
    return plugin;
  })();

  let Upload = function (fileName) {
    this.plugin = plugin;
    this.fileName = fileName;
    this.button1 = null;
    this.button2 = null;
    this.signState = new SignState(this); // 设置初始状态为waiting
    this.uploadingState = new UploadingState(this);
    this.pauseState = new PauseState(this);
    this.doneState = new DoneState(this);
    this.errorState = new ErrorState(this);
    this.curState = this.signState; // 设置当前状态
  };

  Upload.prototype.init = function () {
    let that = this;
    this.dom = document.createElement('div');
    this.dom.innerHTML =
      '<span>文件名称:' +
      this.fileName +
      '</span> <button data-action="button1">扫描中</button> <button data-action="button2">删除</button>';
    document.body.appendChild(this.dom);
    this.button1 = this.dom.querySelector('[data-action="button1"]');
    this.button2 = this.dom.querySelector('[data-action="button2"]');
    this.bindEvent();
  };

  // 负责具体的按钮事件实现，在点击了按钮之后，Context 并不做任何具体的操作， 而是把请求委托给当前的状态类来执行:
  Upload.prototype.bindEvent = function () {
    let self = this;
    this.button1.onclick = function () {
      self.curState.clickHandler1();
    };
    this.button2.onclick = function () {
      self.curState.clickHandler2();
    };
  };

  Upload.prototype.sign = function () {
    this.plugin.sign();
    this.curState = this.signState;
  };
  Upload.prototype.uploading = function () {
    this.button1.innerHTML = '正在上传，点击暂停';
    this.plugin.uploading();
    this.curState = this.uploadingState;
  };
  Upload.prototype.pause = function () {
    this.button1.innerHTML = '已暂停，点击继续上传';
    this.plugin.pause();
    this.curState = this.pauseState;
  };
  Upload.prototype.done = function () {
    this.button1.innerHTML = '上传完成';
    this.plugin.done();
    this.curState = this.doneState;
  };
  Upload.prototype.error = function () {
    this.button1.innerHTML = '上传失败';
    this.curState = this.errorState;
  };
  Upload.prototype.del = function () {
    this.plugin.del();
    this.dom.parentNode.removeChild(this.dom);
  };

  // 编写各个状态类的实现。值得注意的是，我们使用了 StateFactory，从而避免因为 JavaScript 中没有抽象类所带来的问题。
  let StateFactory = (function () {
    let State = function () {};
    State.prototype.clickHandler1 = function () {
      throw new Error('子类必须重写父类的clickHandler1方法');
    };
    State.prototype.clickHandler2 = function () {
      throw new Error('子类必须重写父类的clickHandler2方法');
    };

    return function (param) {
      let F = function (uploadObj) {
        this.uploadObj = uploadObj;
      };
      F.prototype = new State();
      for (let i in param) {
        F.prototype[i] = param[i];
      }
      return F;
    };
  })();

  let SignState = StateFactory({
    clickHandler1: function () {
      console.log('扫描中，点击无效...');
    },
    clickHandler2: function () {
      console.log('文件正在上传中，不能删除');
    },
  });

  let UploadingState = StateFactory({
    clickHandler1: function () {
      this.uploadObj.pause();
    },
    clickHandler2: function () {
      console.log('文件正在上传中，不能删除');
    },
  });

  let PauseState = StateFactory({
    clickHandler1: function () {
      this.uploadObj.uploading();
    },
    clickHandler2: function () {
      this.uploadObj.del();
    },
  });

  let DoneState = StateFactory({
    clickHandler1: function () {
      console.log('文件已完成上传, 点击无效');
    },
    clickHandler2: function () {
      this.uploadObj.del();
    },
  });

  let ErrorState = StateFactory({
    clickHandler1: function () {
      console.log('文件上传失败, 点击无效');
    },
    clickHandler2: function () {
      this.uploadObj.del();
    },
  });

  let test = function () {
    let uploadObj = new Upload('JavaScript 设计模式与开发实践');
    uploadObj.init();
    window.external.upload = function (state) {
      uploadObj[state]();
    };
    window.external.upload('sign');

    setTimeout(function () {
      window.external.upload('uploading');
    }, 1000);
    setTimeout(function () {
      window.external.upload('done');
    }, 3000);
  };
  // test();
}
/* 状态模式重构文件上传程序 end */

/* JavaScript 版本的状态机: 改写电灯的例子 start */
{
  let Light = function() {
    this.curState = FSM.off;
    this.button = null;
  }

  Light.prototype.init = function() {
    let button = document.createElement('button');
    let self = this;

    button.innerHTML = '已关灯';
    this.button = document.body.appendChild(button);
    this.button.onclick = function() {
      self.curState.buttonWasPressed.call(self);
    }
  }

  let FSM = {
    off: {
      buttonWasPressed: function() {
        console.log('关灯');
        this.button.innerHTML = '下一次按我是开灯';
        this.curState = FSM.on;
      }
    },
    on: {
      buttonWasPressed: function() {
        console.log('开灯');
        this.button.innerHTML = '下一次按我是关灯'
        this.curState = FSM.off
      }
    }
  }

  let test = function() {
    let light = new Light();
    light.init();
  }
  // test();
}

{
  let delegate = function(client, delegation) {
    return {
      buttonWasPressed: function() {
        return delegation.buttonWasPressed.apply(client, arguments);
      }
    }
  }

  let FSM = {
    off: {
      buttonWasPressed: function() {
        console.log('关灯')
        this.button.innerHTML = '下一次按我是开灯'
        this.curState = this.onState;
      }
    },
    on: {
      buttonWasPressed: function() {
        console.log('开灯')
        this.button.innerHTML = '下一次按我是关灯'
        this.curState = this.offState;
      }
    }
  }

  let Light = function() {
    this.offState = delegate(this, FSM.off);
    this.onState = delegate(this, FSM.on);
    this.curState = this.offState;
    this.button = null;
  }
  Light.prototype.init = function() {
    let button = document.createElement('button')
    let self = this;

    button.innerHTML = '已关灯'
    this.button = document.body.appendChild('button');
    this.button.onclick = function() {
      self.curState.buttonWasPressed();
    }
  }

  let test = function() {
    let light = new Light();
    light.init();
  }
}
/* JavaScript 版本的状态机: 改写电灯的例子 end */
