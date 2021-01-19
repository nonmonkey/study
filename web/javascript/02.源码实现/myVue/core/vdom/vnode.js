export default class VNode {
  constructor(
    tag, // 标签类型
    elm, // 对应的真实节点
    children, // 当前节点下的子节点
    text, // 当前文本中的文本节点
    data, // VNodeData 暂时保留，暂无意义
    parent, // 父节点
    nodeType, // 节点类型
  ) {
    this.tag = tag;
    this.elm = elm;
    this.children = children;
    this.text = text;
    this.data = data;
    this.parent = parent;
    this.nodeType = nodeType;
    this.env = {}; // 当前节点的环境变量
    this.instructions = null; // 指令
    this.template = []; // 当前节点涉及到的模版
  }
}
