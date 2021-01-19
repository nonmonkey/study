import VNode from './../vdom/vnode.js';
import {
  prepareRender,
  getVNodeByTemplate,
  clearMap,
} from './render.js';
import vmodel from './grammer/vmodel.js';
import vfor from './grammer/vfor.js';
import { mergeAttr } from '../utils/objectUtil.js';


export default function mount(vm, el) {
  // 进行挂载
  vm._vnode = constructVNode(vm, el, null);
  // 进行预备渲染(建立渲染索引，通过模版找vnode，通过vnode找模版)
  prepareRender(vm, vm._vnode);
}

export function initMount(Due) {
  Due.prototype.$mount = function(el) {
    let vm = this;
    let rootDom = document.getElementById(el);
    mount(vm, rootDom);
  }
}

function constructVNode(vm, elm, parent) { // 深度优先搜索
  let vnode = analysisAttr(vm, elm, parent);
  if (!vnode) {
    let children = [];
    let text = getNodeText(elm);
    let data = null;
    let nodeType = elm.nodeType;
    let tag = elm.nodeName;
    vnode = new VNode(tag, elm, children, text, data, parent, nodeType);
    if (elm.nodeType == 1 && elm.getAttribute('env')) {
      vnode.env = mergeAttr(vnode.env, JSON.parse(elm.getAttribute('env')));
      vnode.elm.removeAttribute('env');
    } else {
      vnode.env = mergeAttr(vnode.env, parent ? parent.env : {});
    }
  }
  let childNodes = vnode.elm.childNodes;
  for (let i = 0; i < childNodes.length; i ++) {
    let node = constructVNode(vm, childNodes[i], vnode);
    if (node instanceof VNode) { // 返回单一节点
      vnode.children.push(node);
    } else { // 返回节点数组
      vnode.children = vnode.children.concat(childNodes);
    }
  }

  return vnode;
}

function getNodeText(elm) {
  if (elm.nodeType == 3) {
    return elm.nodeValue;
  } else {

  }
}

function analysisAttr(vm, elm, parent) {
  if (elm.nodeType === 1) {
    let attrNames = elm.getAttributeNames();
    if (attrNames.indexOf('v-model') > -1) {
      vmodel(vm, elm, elm.getAttribute('v-model'))
    }

    if (attrNames.indexOf('v-for') > -1) {
      return vfor(vm, elm, parent, elm.getAttribute('v-for'));
    }
  }
}

export function rebuild(vm, template) {
  let vritual = getVNodeByTemplate(template);
  for (let i = 0; i < vritualNode.length; i ++) {
    vritualNode[i].parent.elm.innerHTML = '';
    vritualNode[i].parent.elm.appendChild(vritualNode[i].elm);
    let result = constructVNode(vm, vritualNode[i].elm, vritualNode[i].parent);
    vritualNode[i].parent.children = [result];
    clearMap();
    prepareRender(vm, vm._vnode)
  }
}
