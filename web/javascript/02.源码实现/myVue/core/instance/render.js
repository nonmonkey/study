import { getValue } from './../utils/objectUtil.js';

// 通过模版，找到哪些节点用到了这个模版
// to -> 2, for -> 4
let template2Vnode = new Map();
// 通过节点，找到这个节点下有哪些模版
let vnode2Template = new Map();

export function prepareRender(vm, vnode) {
  if (vnode == null) {
    return;
  }
  if (vnode.nodeType == 3) { // 文本节点
    analysisTemplateString(vnode);
  } else if (vnode.nodeType == 0) {
    setTemplate2Vnode(vnode.data, vnode);
    setVnode2Template(vnode, vnode.data);
  } else if (vnode.nodeType == 1) { // 标签节点
    analysisAttr(vm, vnode);
    for (let i = 0; i < vnode.children.length; i ++) {
      prepareRender(vm, vnode.children[i]);
    }
  }
}

export function getTemplate2VnodeMap() {
  return template2Vnode;
}

export function getVnode2TemplateMap() {
  return vnode2Template;
}

export function renderMixin(Due) {
  Due.prototype._render = function() {
    console.log('this, this._vnode:', this, this._vnode)
    renderNode(this, this._vnode);
  }
}

export function renderData(vm, data) {
  let vnodes = template2Vnode.get(data);
  if (vnodes != null) {
    for (let i = 0; i < vnodes.length; i ++) {
      renderNode(vm, vnodes[i]);
    }
  }
}

export function renderNode(vm, vnode) {
  if (vnode.nodeType === 3) { // 文本节点
    let templates = vnode2Template.get(vnode);
    if (templates) {
      let result = vnode.text;
      for (let i = 0; i < templates.length; i ++) {
        let templateValue = getTemplateValue([vm._data, vnode.env], templates[i]);
        templateValue = templateValue == undefined ? '' : templateValue;
        if (templateValue) {
          result = result.replace(new RegExp('{{' + '\\s*' + templates[i] + '\\s*' + '}}', 'g'), templateValue);
        }
      }
      vnode.elm.nodeValue = result;
    }
  } else if (vnode.nodeType == 1 && vnode.tag == 'INPUT') {
    let templates = vnode2Template.get(vnode);
    console.log('templates:', templates);
    if (templates) {
      for (let i = 0; i < templates.length; i ++) {
        let templateValue = getTemplateValue([vm._data, vnode.env], templates[i]);
        if (templateValue) {
          vnode.elm.value = templateValue;
        }
      }
    }
  } else {
    for (let i = 0; i < vnode.children.length; i++) {
      renderNode(vm, vnode.children[i]);
    }
  }
}

function analysisTemplateString(vnode) {
  let templateStrList = vnode.text.match(/{{\s*[a-zA-Z0-9\_\.]+\s*}}/g);
  for (let i = 0; templateStrList && i < templateStrList.length; i ++) {
    setTemplate2Vnode(templateStrList[i], vnode);
    setVnode2Template(vnode, templateStrList[i]);
  }
}

function setTemplate2Vnode(template, vnode) {
  let templateName = getTemplateName(template);
  let vnodeSet = template2Vnode.get(templateName);
  if (vnodeSet) {
    vnodeSet.push(vnode);
  } else {
    template2Vnode.set(templateName, [vnode]);
  }
}

function setVnode2Template(vnode, template) {
  let templateName = getTemplateName(template);
  let templateSet = vnode2Template.get(vnode);
  if (templateSet) {
    templateSet.push(templateName);
  } else {
    vnode2Template.set(vnode, [templateName]);
  }
}

function getTemplateName(template) {
  // 判断是否有花括号，如果有，则解掉，如果没有直接返回
  if (template.substring(0, 2) == '{{'
    && template.substring(template.length - 2, template.length) == '}}') {
      return template.replace(/^{{\s*/, '').replace(/\s*}}$/, '');
  } else {
    return template;
  }
}

function getTemplateValue(objs, templateName) {
  for (let i = 0; i < objs.length; i ++) {
    let temp = getValue(objs[i], templateName);
    if (temp != null) {
      return temp;
    }
  }
  return null;
}

function analysisAttr(vm, vnode) {
  if (vnode.nodeType != 1) {
    return;
  }
  let attrNames = vnode.elm.getAttributeNames();
  if (attrNames.indexOf('v-model') > -1) {
    setTemplate2Vnode(vnode.elm.getAttribute('v-model'), vnode);
    setVnode2Template(vnode, vnode.elm.getAttribute('v-model'));
  }
}

export function getVNodeByTemplate(template) {
  return template2Vnode.get(template);
}

export function clearMap() {
  template2Vnode.clear();
  vnode2Template.clear();
}
