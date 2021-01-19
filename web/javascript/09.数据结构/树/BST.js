/**
二叉搜索树(BST)是二叉树的一种，但是它只允许你在左侧节点存储(比父节点)小的值， 
在右侧节点存储(比父节点)大(或者等于)的值。
 */

class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {}

  #root = null;

  // 获取跟节点
  getRoot() {
    return this.#root;
  }

  // 插入节点
  insert(key) {
    let newNode = new Node(key);

    if (this.#root === null) {
      this.#root = newNode;
    } else {
      this.insertNode(this.#root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        return node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else if (newNode.key > node.key) {
      if (node.right === null) {
        return node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    } else {
      return false;
    }
  }

  min() {
    return this.minNodeKey(this.#root);
  }

  minNodeKey(node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node.key;
    }
    return null;
  }

  minNode(node) {
    while (node && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  max() {
    return this.maxNode(this.#root);
  }

  maxNode(node) {
    if (node) {
      while (node && node.right !== null) {
        node = node.right;
      }
      return node.key;
    }
    return null;
  }

  search(key) {
    return this.searchNode(this.#root, key);
  }

  searchNode(node, key) {
    if (node === null) {
      return false;
    }
    if (key < node.key) {
      return this.searchNode(node.left, key);
    } else if (key > node.key) {
      return this.searchNode(node.right, key);
    } else {
      return true;
    }
  }

  remove(key) {
    this.#root = this.removeNode(this.#root, key);
    return this.#root;
  }

  removeNode(node, key) {
    if (node === null) {
      return null;
    }
    if (key < node.key) {
      node.left = this.removeNode(node.left, key);
    } else if (key > node.key) {
      node.right = this.removeNode(node.right, key);
    } else {
      if (node.left === null && node.right === null) {
        node = null;
      } else if (node.left === null) {
        node = node.right;
      } else if (node.right === null) {
        node = node.left;
      } else {
        let aux = this.minNode(node.right);
        node.key = aux.key;
        node.right = this.removeNode(node.right, aux.key);
      }
    }
    return node;
  }

  // 判断是否是一个有效的二叉搜索树
  static walk(root) {
    if (!root.left && !root.right) {
      return true;
    } else if ((root.left && root.left.key >= root.key) || (root.right && root.right.key <= root.val)) {
      return false;
    } else {
      return BinarySearchTree.walk(root.left) && BinarySearchTree.walk(root.right);
    }
  }

  // 判断是否为镜像对称树
  static isSymmetry(root) {
    if (!root) return false;
    let walk = function(left, right) {
      if (!left && !right) return true;
      if ((left && !right) || (!left && right) || left.key !== right.key) {
        return false;
      }
      return walk(left.left, right.right) && walk(left.right, right.left);
    }
    return walk(root.left, root.right);
  }

  /** 中序遍历 */
  // 中序遍历是一种以上行顺序访问BST所有节点的遍历方式，也就是以从最小到最大的顺序访问所有节点。
  // 中序遍历的一种应用就是对树进行排序操作
  static inOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      BinarySearchTree.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      BinarySearchTree.inOrderTraverseNode(node.right, callback);
    }
  };

  /** 先序遍历 */
  // 先序遍历是以优先于后代节点的顺序访问每个节点的。先序遍历的一种应用是打印一个结构化的文档。
  static preOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      callback(node.key);
      BinarySearchTree.preOrderTraverseNode(node.left, callback);
      BinarySearchTree.preOrderTraverseNode(node.right, callback);
    }
  };

  /** 后序遍历 */
  // 后序遍历则是先访问节点的后代节点，再访问节点本身。后序遍历的一种应用是计算一个目录和它的子目录中所有文件所占空间的大小。
  static postOrderTraverse = function (node, callback) {
    if (node !== null) {
      BinarySearchTree.postOrderTraverse(node.left, callback);
      BinarySearchTree.postOrderTraverse(node.right, callback);
      callback(node.key);
    }
  };
}
