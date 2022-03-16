/**
实现一个 document.getElementById 功能
 */

/** 由于DOM是一棵树，而树的定义本身就是用的递归定义，所以用递归的方法处理树 */
function getElementById(node, id) {
  if (!node) return null;
  if (node.id === id) return node;
  for (var i = 0; i < node.childNodes.length; i++) {
    var found = getElementById(node.childNodes[i], id);
    if (found) return found;
  }
  return null;
}
getElementById(document, 'd-cal');

/** 使用递归的优点是代码简单易懂，缺点是效率比不上非递归的实现。Chrome浏览器的查DOM是使用非递归实现。 */
/** 实际上 getElementById 浏览器是用的一个哈希 map 存储的，根据 id 直接映射到 DOM 结点，而 getElementsByClassName 就是用的这样的非递归查找。 */
function getByElementId(root, id) {
  if (root.id === id) return root;
  if (root.children.length) {
    var node = root.children[0];
    while (node) {
      if (node.id === id) return node;
      node = nextElement(node, root);
    }
  }
  return null;
}
// 深度遍历
function nextElement(node, root) {
  // 先判断是否有子结点
  if (node.children.length) {
    return node.children[0];
  }
  // 再判断是否有相邻结点
  if (node.nextElementSibling) {
    return node.nextElementSibling;
  }
  // 否则，往上返回它的父结点的下一个相邻元素，相当于上面递归实现里面的for循环的i加1
  while (node.parentNode) {
    if (node.parentNode === root) return null;
    if (node.parentNode.nextElementSibling) {
      return node.parentNode.nextElementSibling;
    }
    node = node.parentNode;
  }
  return null;
}
