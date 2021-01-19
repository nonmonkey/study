/** Adelson-Velskii-Landi 树(AVL 树) */
/*
AVL树是一种自平衡树。添加或移除节点时，AVL树会尝试自平衡。
任意一个节点(不论深度)的左子树和右子树高度最多相差1。添加或移除节点时，AVL树会尽可能尝试转换为完全树。

在AVL树中插入或移除节点和BST完全相同。然而，AVL树的不同之处在于我们需要检验它 的平衡因子，如果有需要，则将其逻辑应用于树的自平衡。

下面的代码是向AVL树插入新节点的例子:
*/
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

let insertNode = function (node, element) {
  if (node === null) {
    node = new Node(element);
  } else if (element < node.key) {
    node.left = insertNode(node.left, element);

    if (node.left !== null) {
      // 确认是否平衡
      if (heightNode(node.left) - heightNode(node.right) > 1) {
        if (element < node.left.key) {
          node = rotationLL(node);
        } else {
          node = rotationLR(node);
        }
      }
    }
  } else if (element > node.key) {
    node.right = insertNode(node.right, element);

    if (node.right !== null) {
      // 确认是否平衡
      if (heightNode(node.right) - heightNode(node.left) > 1) {
        if (element > node.right.key) {
          node = rotationRR(node);
        } else {
          node = rotationRL(node);
        }
      }
    }
  }
  return node;
};

/**
在AVL树中，需要对每个节点计算右子树高度(hr)和左子树高度(hl)的差值，该值 (hr-hl)应为0、1或1。
如果结果不是这三个值之一，则需要平衡该AVL树。这就是平衡因子的概念。
 */
let heightNode = function (node) {
  if (node === null) {
    return -1;
  } else {
    return Math.max(heightNode(node.left), heightNode(node.right)) + 1;
  }
};

/** AVL旋转 */
/**
可以执行单旋转或双旋转两种平衡操作，分别对应四种场景。
  右右(RR): 向左的单旋转
  左左(LL): 向右的单旋转
  左右(LR): 向右的双旋转
  右左(RL): 向左的双旋转
 */

/* RR
      50                         70
    /    \R                     /  \
  30      70                  50    80
         /  \R      =>       /  \     \
       60    80             30   60    90
              \
               90
*/
let rotationRR = function (node) {
  let tmp = node.right;
  node.right = tmp.left;
  tmp.left = node;
  return tmp;
};

/* LL
          50                         30
        L/  \                       /   \
       30    70                   10     50
     L/  \             =>        /      /  \
    10    40                    5      40   70
   /              
  5            
*/
let rotationLL = function (node) {
  let tmp = node.left;
  node.left = tmp.right;
  tmp.right = node;
  return tmp;
};

/* LR
          50                      40
        L/  \                    /  \
        30   70                30    50
       /  \R        =>        /  \     \
      10  40                 10   35   70
         /
        35
*/
let rotationLR = function (node) {
  node.left = rotationRR(node.left);
  return rotationLL(node);
};

/* RL
      70                       72
     /  \R                    /  \ 
    50  80                  70    80
      L/  \       =>        /    /  \
      72   90              50   75   90
        \
         75
*/
let rotationRL = function (node) {
  node.right = rotationLL(node.right);
  return rotationRR(node);
};
