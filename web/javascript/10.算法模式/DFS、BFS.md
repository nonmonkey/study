[TOC]
***

### 一、DFS
```JS
/**
 * 递归实现DFS
 * 
 * @param treeData 
 */
const fn1 = (treeData) => {
  const result = []; // 存放结果的数组
  // 递归方法
  const dfs = (data) => {
    // 遍历数组
    data.forEach((element) => {
      // 将当前节点 id 存放进结果
      result.push(element.id);
      // 如果当前节点有子节点，则递归调用
      if (element.children && element.children.length > 0) {
        dfs(element.children);
      }
    });
  };
  // 开始搜索
  dfs(treeData);
  return result;
};
```
```JS
/**
 * 非递归实现 DFS
 * @param treeData 
 */
const df2 = (treeData) => {
  const result = []; // 存放结果的数组
  // 当前栈内为全部数组
  const stack = JSON.parse(JSON.stringify(treeData));
  // 循环条件，栈不为空
  while (stack.length !== 0) {
    // 最上层节点出栈
    const node = stack.shift();
    // 存放节点
    result.push(node.id);
    // 如果该节点有子节点，将子节点存入栈中，继续下一次循环（后进先出，故倒序取值并插入到栈）
    const len = node.children && node.children.length;
    for (let i = len - 1; i >= 0; i -= 1) {
      stack.unshift(node.children[i]);
    }
  }
  return result;
};
```

### 二、BFS
```JS
/**
 * 广度搜索
 * 
 * @param treeData 
 */
const fn3 = treeData => {
  const result = []; // 存放结果的数组
  // 当前队列为全部数据
  const queue = JSON.parse(JSON.stringify(treeData));
  // 循环条件，队列不为空
  while (queue.length > 0) {
    // 第一个节点出队列
    const node = queue.shift();
    // 存放结果数组
    result.push(node.id);
    // 当前节点有子节点则将子节点存入队列，继续下一次的循环
    const len = node.children && node.children.length;
    for (let i = 0; i < len; i += 1) {
      queue.push(node.children[i]);
    }
  }
  return result;
};
```
