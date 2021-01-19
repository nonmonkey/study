function VNode(realDom, template) {
  this.realDom = realDom;
  this.template = template;
  this.children = []; // 默认值
}

export default function createVNode(realDom) {
  let root = new VNode(realDom, '');
  if (realDom.nodeType === 3) {
    // 判断真实节点是否是文本节点
    // 如果是文本节点，需要记录文本节点的值到虚拟节点
    root.template = realDom.nodeValue;
  } else {
    // 不是文本节点
    for (let i = 0, len = realDom.childNodes.length; i < len; i += 1) {
      let childRealNode = realDom.childNodes[i]; // 拿到真实节点的真实子节点
      let vNode = createVNode(childRealNode);
      root.children.push(vNode);
    }
  }
  return root;
}