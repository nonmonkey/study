/**
  享元(flyweight)模式是一种用于性能优化的模式，“fly”在这里是苍蝇的意思，意为蝇量 5 级。享元模式的核心是运用共享技术来有效支持大量细粒度的对象。

  如果系统中因为创建了大量类似的对象而导致内存占用过高，享元模式就非常有用了。在 JavaScript 中，浏览器特别是移动端的浏览器分配的内存并不算多，如何节省内存就成了一件非 常有意义的事情。
 */

/* 初识亨元模式 start */
/**
  假设有个内衣工厂，目前的产品有 50 种男式内衣和 50 种女士内衣，为了推销产品，
  工厂决定生产一些塑料模特来穿上他们的内衣拍成广告照片。 正常情况下需要 50 个男模特和 50 个女模特，
  然后让他们每人分别穿上一件内衣来拍照。不使用享元模式的情况下，在程序里也许会这 样写:
 */
{
  let Model = function (sex, underwear) {
    this.sex = sex;
    this.underwear = underwear;
  };

  Model.prototype.takePhoto = function () {
    console.log('sex:', this.sex, '; underwear:', this.underwear);
  };

  for (let i = 1; i <= 50; i++) {
    let maleModel = new Model('male', 'underwear' + i);
    // maleModel.takePhoto();
  }
  for (let j = 1; j <= 50; j++) {
    let femaleModel = new Model('female', 'underwear' + j);
    // femaleModel.takePhoto();
  }
}

/**
  下面我们来考虑一下如何优化这个场景。虽然有 100 种内衣，
  但很显然并不需要 50 个男模特和 50 个女模特。其实男模特和女模特各自有一个就足够了，他们可以分别穿上不同的内衣来拍照。
  现在来改写一下代码，既然只需要区别男女模特，那我们先把 underwear 参数从构造函数中移除，构造函数只接收 sex 参数:
 */
{
  let Model = function (sex) {
    this.sex = sex;
  };

  Model.prototype.takePhoto = function () {
    console.log('sex:', this.sex, '; underwear:', this.underwear);
  };

  let maleModel = new Model('male');
  let femaleModel = new Model('female');

  for (let i = 1; i <= 50; i++) {
    maleModel.underwear = 'underwear' + i;
    // maleModel.takePhoto();
  }

  for (let j = 1; j <= 50; j++) {
    femaleModel.underwear = 'underwear' + j;
    // femaleModel.takePhoto();
  }
}
/* 初识亨元模式 end */

/* 实例：2000文件上传 start */
{
  let id = 0;

  let Upload = function (uploadType, fileName, fileSize) {
    this.uploadType = uploadType;
    this.fileName = fileName;
    this.fileSize = fileSize;
    this.dom = null;
  };

  Upload.prototype.init = function (id) {
    let self = this;
    self.id = id;
    self.dom = document.createElement('div');
    self.dom.innerHTML = `
      <span>文件名称:${self.fileName}, 文件大小: ${self.fileSize}</span>
      <button class="delFile">删除</button>
    `;
    self.dom.querySelector('.delFile').onclick = function () {
      self.delFile();
    };
    document.body.appendChild(self.dom);
  };

  Upload.prototype.delFile = function () {
    if (this.fileSize < 3000) {
      return this.dom.parentNode.removeChild(this.dom);
    }
    if (window.confirm('确定要删除该文件吗？' + this.fileName)) {
      return this.dom.parentNode.removeChild(this.dom);
    }
  };

  let startUplaod = function (uploadType, files) {
    for (let i = 0, l = files.length; i < l; i++) {
      let uploadObj = new Upload(uploadType, files[i].fileName, files[i].fileSize);
      uploadObj.init(id++);
    }
  };

  startUplaod('plugin', [
    { fileName: '1.txt', fileSize: 1000 },
    { fileName: '2.html', fileSize: 3000 },
    { fileName: '3.txt', fileSize: 5000 },
  ]);

  startUplaod('flash', [
    { fileName: '4.txt', fileSize: 1000 },
    { fileName: '5.html', fileSize: 3000 },
    { fileName: '6.txt', fileSize: 5000 },
  ]);
}

// 享元模式重构文件上传
{
  /* 剥离外部状态 */
  // 明确了 uploadType 作为内部状态之后，我们再把其他的外部状态从构造函数中抽离出来，Upload 构造函数中只保留 uploadType 参数
  let Upload = function (uploadType) {
    this.uploadType = uploadType;
  };

  Upload.prototype.delFile = function (id) {
    uploadManager.setExternalState(id, this);

    if (this.fileSize < 3000) {
      return this.dom.parentNode.removeChild(this.dom);
    }

    if (window.confirm('确定要删除该文件吗？' + this.fileName)) {
      return this.dom.parentNode.removeChild(this.dom);
    }
  };
  /* 工厂进行实例化 */
  let uploadFactory = (function () {
    let createdFlyWeightObjs = {};

    return {
      create: function (uploadType) {
        if (createdFlyWeightObjs[uploadType]) {
          return createdFlyWeightObjs[uploadType];
        }
        return (createdFlyWeightObjs[uploadType] = new Upload(uploadType));
      },
    };
  })();
  /* 管理器封装外部状态 */
  // 现在我们来完善前面提到的 uploadManager 对象，它负责向 UploadFactory 提交创建对象的请求，
  // 并用一个 uploadDatabase 对象保存所有 upload 对象的外部状态，以便在程序运行过程中给 upload 共享对象设置外部状态
  let uploadManager = (function () {
    let uploadDatabase = {};

    return {
      add: function (id, uploadType, fileName, fileSize) {
        let flyWeightObj = uploadFactory.create(uploadType);
        let dom = document.createElement('div');
        dom.innerHTML = `
          <span>文件名称：${fileName}，文件大小：${fileSize}</span>
          <button class="delFile">删除</button>
        `;
        dom.querySelector('.delFile').onclick = function () {
          flyWeightObj.delFile(id);
        };
        document.body.appendChild(dom);
        uploadDatabase[id] = {
          fileName: fileName,
          fileSize: fileSize,
          dom: dom,
        };
        return flyWeightObj;
      },
      setExternalState: function (id, flyWeightObj) {
        let uploadData = uploadDatabase[id];
        for (let i in uploadData) {
          flyWeightObj[i] = uploadData[i];
        }
      },
    };
  })();

  let id = 0;
  let startUpload = function (uploadType, files) {
    for (let i = 0, l = files.length; i < l; i++) {
      uploadManager.add(++id, uploadType, files[i].fileName, files[i].fileSize);
    }
  };

  startUpload('plugin', [
    { fileName: '1.txt', fileSize: 1000 },
    { fileName: '2.html', fileSize: 3000 },
    { fileName: '3.txt', fileSize: 5000 },
  ]);

  startUpload('flash', [
    { fileName: '4.txt', fileSize: 1000 },
    { fileName: '5.html', fileSize: 3000 },
    { fileName: '6.txt', fileSize: 5000 },
  ]);

  /**
    享元模式重构之前的代码里一共创建了 6 个 upload 对象，而通过享元模式重构之后，对象的数量减少为 2，
    更幸运的是， 就算现在同时上传 2000 个文件，需要创建的 upload 对象数量依然是 2。
   */
}
/* 实例：2000文件上传 end */

/* 对象池 start */
/**
  对象池维护一个装载空闲对象的池子，如果需要对象的时候，不是直接 new，而是转从对象池里获取。
  如果对象池里没有空闲对象，则创建一个新的对象，当获取出的对象完成它的职责之后， 再进入池子等待被下次获取。
 */
{
  let objectPoolFactory = function (createObjFn) {
    let objectPool = [];

    return {
      create: function () {
        let obj = objectPool.length === 0 ? createObjFn.apply(this, arguments) : objectPool.shift();
        return obj;
      },
      recover: function (obj) {
        objectPool.push(obj);
      },
    };
  };

  // 利用objectPoolFactory来创建一个装载一些iframe的对象池
  let iframeFactory = objectPoolFactory(function () {
    let iframe = document.createElement('iframe');
    iframe.onload = function () {
      iframe.onload = null; // 防止iframe重复加载的bug
      iframeFactory.recover(iframe); // iframe加载完成之后回收节点
    };

    document.body.appendChild(iframe);
    return iframe;
  });

  let iframe1 = iframeFactory.create();
  iframe1.src = 'http://baidu.com';

  setTimeout(() => {
    let iframe2 = iframeFactory.create();
    iframe2.src = 'http://QQ.com';
  }, 2500);

  setTimeout(() => {
    let iframe3 = iframeFactory.create();
    iframe3.src = 'http://163.com';

    let iframe4 = iframeFactory.create();
    iframe4.src = 'http://www.sina.com';
  }, 6000);

  // 对象池是另外一种性能优化方案，它跟享元模式有一些相似之处，但没有分离内部状态和外 部状态这个过程。本章用享元模式完成了一个文件上传的程序，其实也可以用对象池+事件委托 来代替实现。
}
/* 对象池 end */
