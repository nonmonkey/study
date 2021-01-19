import compile from './compile.js';

/**
 * 渲染一个虚拟节点（将文本的虚拟节点进行编译）
 */
export default function render(vnode, envObj) {
  if (vnode.realDom.nodeType === 3) {
    // 是否为文本节点
    // 将vnode.template编译，将编译结果设置到realDom.nodeValue中
    vnode.realDom.nodeValue = compile(vnode.template, envObj);
  } else {
    // 如果不是文本节点
    for (let i = 0; i < vnode.children.length; i += 1) {
      var childNode = vnode.children[i];
      render(childNode, envObj);
    }
  }
}
