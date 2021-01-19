/**
在上次打劫完一条街道之后和一圈房屋后，小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为“根”。 除了“根”之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。

计算在不触动警报的情况下，小偷一晚能够盗取的最高金额。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/house-robber-iii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
  打不打劫根节点，会影响打劫一棵树的收益：

  打劫根节点，则不能打劫左右子节点，但是能打劫左右子节点的四个子树。
  不打劫根节点，则能打劫左子节点和右子节点，收益是打劫左右子树的收益之和。
 */
var rob = function (root) {
  var treeMap = new Map();
  var helper = function (node) {
    if (!node) return 0;
    if (treeMap.has(node)) return treeMap.get(node);

    var includeRoot = node.val;

    if (node.left) {
      includeRoot += rob(node.left.left) + rob(node.left.right);
    }
    if (node.right) {
      includeRoot += rob(node.right.left) + rob(node.right.right);
    }

    var excludeRoot = rob(node.left) + rob(node.right);
    var result = Math.max(includeRoot, excludeRoot);
    treeMap.set(root, result);
    return result;
  };
  return helper(root);
};
