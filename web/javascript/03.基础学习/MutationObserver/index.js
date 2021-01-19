var callback = function(mutations) {
  console.log('callback:', mutations);
}

var observer = new MutationObserver(function(MutationRecord, target) { // 变动数组 观察器实例
  // 指定的DOM节点(目标节点)发生变化时被调用
  MutationRecord.forEach(function(mutation) {
    console.log(mutation);
  });
});

var ele = document.querySelector('article');

var config = {
  childList: true,
  attributes: true,
  characterData: true,
  attributeOldValue: true,
  characterDataOldValue: true,
};
// 当前观察者对象注册需要观察的目标节点
// config 指定要观察的DOM变化类型.
observer.observe(ele, config);

var count = 0
var createDom = function() { var ele = document.createElement('div'); ele.innerText = 'this is num ' + count++; return ele; }

ele.appendChild(createDom());
ele.appendChild(createDom());
ele.appendChild(createDom());

var mutations = observer.takeRecords();
if (mutations) {
  callback(mutations);
}

console.log('observer:', observer);
