/**
给定一个链表，如果它是有环链表，实现一个算法返回环路的开头节点。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。


来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/linked-list-cycle-lcci
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
 * 解题思路：https://leetcode-cn.com/problems/linked-list-cycle-lcci/solution/huan-lu-jian-ce-by-leetcode-solution-s2la/
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
  if (!head) return null;

  var fast = head;
  var slow = head;
  while(fast !== null) {
    slow = slow.next;
    if (fast.next !== null) {
      fast = fast.next.next;
    } else {
      return null;
    }

    if (fast === slow) {
      var tmp = head;
      while(tmp !== slow) {
        tmp = tmp.next;
        slow = slow.next;
      }
      return tmp;
    }
  }
  return fast
};

var detectCycle = function(head) {
  while(head) {
    if (head.flag) return head;
    head.flag = true;
    head = head.next;
  }
  return null;
};

