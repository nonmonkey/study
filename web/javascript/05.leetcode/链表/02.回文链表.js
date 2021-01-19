/**
请判断一个链表是否为回文链表。

示例 1:

输入: 1->2
输出: false
示例 2:

输入: 1->2->2->1
输出: true
进阶：
你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？



来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/palindrome-linked-list
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
 * 
 * @param {ListNode} head
 * @return {boolean}
 */
// 快慢指针 时间复杂度O(n)空间复杂度O(1)
var isPalindrome = function (head) {
  if (!head || !head.next) return false;
  var slow = head;
  var fast = head;
  var mid = null;
  while (fast && fast.next) {
    mid = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  mid.next = null; // 断成两个链表

  var head2 = null; // 反转链表
  while (slow) {
    var tmp = slow.next;
    slow.next = head2;
    head2 = slow;
    slow = tmp;
  }

  while (head && head2) { // 比较
    if (head.val !== head2.val) return false;
    head = head.next;
    head2 = head2.next;
  }
  return true;
};

/* 时间复杂度和空间复杂度均为O(n)
var isPalindrome = function (head) {
  var tmp = [];
  while (head) {
    tmp.push(head);
    head = head.next;
  }

  for (var i = 0, j = tmp.length - 1; i < j; i++, j--) {
    if (tmp[i].val !== tmp[j].val) return false;
  }
  return true;
};
*/
