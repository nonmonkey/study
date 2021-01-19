/**
给定两个用链表表示的整数，每个节点包含一个数位。

这些数位是反向存放的，也就是个位排在链表首部。

编写函数对这两个整数求和，并用链表形式返回结果。

示例：

输入：(7 -> 1 -> 6) + (5 -> 9 -> 2)，即617 + 295
输出：2 -> 1 -> 9，即912
进阶：思考一下，假设这些数位是正向存放的，又该如何解决呢?

示例：

输入：(6 -> 1 -> 7) + (2 -> 9 -> 5)，即617 + 295
输出：9 -> 1 -> 2，即912

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sum-lists-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}

var addTwoNumbers = function (l1, l2) {
  var tmp = new ListNode();
  var node = tmp;
  var digit = 0;
  var num;
  while (l1 || l2) {
    num = digit;

    if (l1) {
      num += l1.val;
      l1 = l1.next;
    }

    if (l2) {
      num += l2.val;
      l2 = l2.next;
    }

    var unit = num % 10;
    digit = parseInt(num / 10);
    
    node.next = new ListNode(unit);
    node = node.next;
  }

  if (digit) node.next = new ListNode(digit)

  return tmp.next;
};

function createList(arr = []) {
  var tmp = new ListNode();
  var node = tmp;
  arr.forEach((num) => {
    node.next = new ListNode(num);
    node = node.next;
  });
  return tmp.next;
}

console.log('addTwoNumbers:', addTwoNumbers(createList([2, 4, 3]), createList([5, 6, 4])));
