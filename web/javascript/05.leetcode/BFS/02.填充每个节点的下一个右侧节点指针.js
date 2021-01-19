/*
给定一个完美二叉树，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。

初始状态下，所有 next 指针都被设置为 NULL。

示例：

输入：{"$id":"1","left":{"$id":"2","left":{"$id":"3","left":null,"next":null,"right":null,"val":4},"next":null,"right":{"$id":"4","left":null,"next":null,"right":null,"val":5},"val":2},"next":null,"right":{"$id":"5","left":{"$id":"6","left":null,"next":null,"right":null,"val":6},"next":null,"right":{"$id":"7","left":null,"next":null,"right":null,"val":7},"val":3},"val":1}

输出：{"$id":"1","left":{"$id":"2","left":{"$id":"3","left":null,"next":{"$id":"4","left":null,"next":{"$id":"5","left":null,"next":{"$id":"6","left":null,"next":null,"right":null,"val":7},"right":null,"val":6},"right":null,"val":5},"right":null,"val":4},"next":{"$id":"7","left":{"$ref":"5"},"next":null,"right":{"$ref":"6"},"val":3},"right":{"$ref":"4"},"val":2},"next":null,"right":{"$ref":"7"},"val":1}

解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。
 
提示：

你只能使用常量级额外空间。
使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。
*/

/* 方法一：层次遍历 start */
var connect = function (root) {
  if (root === null) return root;

  // 初始化队列同时将第一层节点加入队列中，即根节点
  const Q = [root];
  while (Q.length > 0) {
    const size = Q.length;
    for (let i = 0; i < size; i++) {
      // 从队首取出元素
      const node = Q.shift();

      // 连接
      if (i < size - 1) {
        node.next = Q[0];
      }

      // 拓展下一层节点
      if (node.left !== null) {
        Q.push(node.left);
      }
      if (node.right !== null) {
        Q.push(node.right);
      }
    }
  }
  return root;
};


// 复杂度分析

// 时间复杂度：O(N)。每个节点会被访问一次且只会被访问一次，即从队列中弹出，并建立 next 指针。

// 空间复杂度：O(N)。这是一棵完美二叉树，它的最后一个层级包含 N/2N/2 个节点。广度优先遍历的复杂度取决于一个层级上的最大元素数量。这种情况下空间复杂度为 O(N)O(N)。

/* 方法一：层次遍历 end */

/* 方法二：使用已建立的next指针 start */
var connect = function (root) {
  if (root === null) return root;

  // 从跟节点开始
  let leftmost = root;
  while (leftmost.left !== null) {
    // 遍历这一层节点组织成的链表，为下一层的节点更新next指针
    let head = leftmost;
    while (head !== null) {
      // CONNECTION 1
      head.left.next = head.right;
      // CONNECTION 2
      if (head.next !== null) {
        head.right.next = head.next.left;
      }
      head = head.next;
    }
    leftmost = leftmost.left;
  }
  return root;
};

// 复杂度分析

// 时间复杂度：O(N)，每个节点只访问一次。

// 空间复杂度：O(1)，不需要存储额外的节点。
/* 方法二：使用已建立的next指针 end */
