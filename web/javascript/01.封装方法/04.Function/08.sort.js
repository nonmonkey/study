var arrTemp = [1, 6, 8, 3, 0, 3, 6, 2];

function swap(arr, x, y) {
  if (x != y) {
    [arr[x], arr[y]] = [arr[y], arr[x]];
  }
}

/**
 * 冒泡排序（Bubble Sort）
 * 时间复杂度：最好：O(n) 最坏：O(n^2)
 * 空间复杂度：O(1)
 * 10000(220.466ms)    100000(26143.298ms)
 * 它重复地走访过要排序的元素列，依次比较两个相邻的元素，
 * 如果他们的顺序（如从大到小、首字母从A到Z）错误就把他们交换过来。
 * 走访元素的工作是重复地进行直到没有相邻元素需要交换，
 * 也就是说该元素已经排序完成。
 */
function bubbleSort(arr) {
  if (!Array.isArray(arr)) return [];
  for (let t = arr.length - 1; t > 0; t -= 1) {
    for (let j = 0; j < t; j += 1) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}

function bubbleSort1(arr) {
  var length = arr.length;
  for (var i = 0; i < length; i++) {
    for (var j = 0; j < length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}

/**
 * 选择排序（Selection sort）
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 *
 * 它的工作原理是每一次从待排序的数据元素中选出最小（或最大）的一个元素，
 * 存放在序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，
 * 然后放到已排序序列的末尾。 以此类推，直到全部待排序的数据元素排完。
 */
function selectSortByMin(arr) {
  if (!Array.isArray(arr)) return [];
  const len = arr.length;
  for (let t = 0; t < len - 1; t += 1) {
    var minValueIndex = t;
    for (let i = t + 1; i < len; i += 1) {
      if (arr[i] < arr[minValueIndex]) {
        minValueIndex = i;
      }
    }
    swap(arr, minValueIndex, t);
  }
  return arr;
}

function selectSortByMax(arr) {
  if (!Array.isArray(arr)) return [];
  const len = arr.length;
  for (let t = 0; t < len - 1; t += 1) {
    var maxValueIndex = 0;
    for (let i = 0; i < len - t; i += 1) {
      if (arr[i] > arr[maxValueIndex]) {
        maxValueIndex = i;
      }
    }
    swap(arr, maxValueIndex, len - t - 1);
  }
  return arr;
}

/**
 * 插入排序（Insertion sort）
 * 时间复杂度：最好：O(n) 最坏：O(n^2)
 * 空间复杂度：O(1)
 *
 * 每步将一个待排序的记录，按其关键码值的大小插入前面已经排序的文件中适当位置上，直到全部插入完为止
 */
function insertionSort(arr) {
  if (!Array.isArray(arr)) return [];
  let preIndex, current;
  for (let t = 1, len = arr.length; t < len; t += 1) {
    preIndex = t - 1;
    current = arr[t];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex -= 1;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}

/**
 * 快速排序（Quicksort）
 * 时间复杂度：O(n^2)
 * 空间复杂度：最好：O(logn) 最坏：O(n)
 *
 * 通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，
 * 然后再按此方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，以此达到整个数据变成有序序列。
 */
function quickSort(arr) {
  function partition(arr, left, right) {
    let storeIndex = left;
    let pivot = arr[right]; // 直接选最右边的元素为基准元素
    for (let i = left; i < right; i += 1) {
      if (arr[i] < pivot) {
        swap(arr, storeIndex, i);
        storeIndex += 1; // 交换位置后，storeIndex 自增 1，代表下一个可能要交换的位置
      }
    }
    swap(arr, storeIndex, right); // 将基准元素放置到最后的正确位置上
    return storeIndex;
  }

  function sort(arr, left, right) {
    if (left > right) return;
    let storeIndex = partition(arr, left, right);
    sort(arr, left, storeIndex - 1);
    sort(arr, storeIndex + 1, right);
  }

  sort(arr, 0, arr.length - 1);
  return arr;
}

// 10000(18.507ms) 100000(82.786ms)
function quickSort1(arr) {
  function partition(arr, left, right) {
    let storeIndex = left;
    let pivot = arr[right]; // 直接选最右边的元素为基准元素
    for (let i = left; i < right; i += 1) {
      if (arr[i] < pivot) {
        swap(arr, storeIndex, i);
        storeIndex += 1; // 交换位置后，storeIndex 自增 1，代表下一个可能要交换的位置
      }
    }
    swap(arr, storeIndex, right); // 将基准元素放置到最后的正确位置上
    return storeIndex;
  }

  function sort(arr, left, right) {
    if (left > right) return;
    let storeIndex = partition(arr, left, right);
    sort(arr, left, storeIndex - 1);
    sort(arr, storeIndex + 1, right);
  }

  sort(arr, 0, arr.length - 1);
  return arr;
}

// 10000(18.229ms) 100000(434.050ms)
function quickSort2(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var left = [],
    right = [],
    baseDot = Math.round(arr.length / 2),
    base = arr.splice(baseDot, 1)[0];

  for (var i = 0; i < arr.length; i += 1) {
    if (arr[i] < base) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort2(left).concat([base], quickSort2(right));
}

// 三路快排
// 10000(11.457ms) 100000(56.974ms)
function quickSort3(arr) {
  if (arr.length < 2) return arr;

  let left = [],
    center = [],
    right = [],
    pivot = arr[0];

  for (let i = 0, len = arr.length; i < len; i += 1) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else if (arr[i] === pivot) {
      center.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort3(left), ...center, ...quickSort3(right)];
}

/**
 * 归并排序（MERGE-SORT）
 * 时间复杂度：O(nlogn)
 * 空间复杂度：最好：O(nlogn) 最坏：O(nlogn)
 *
 * 是建立在归并操作上的一种有效的排序算法,该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。
 * 将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为二路归并。
 * 其思想是将原始数组切分成较小的数组，直到每个小数组只有一 个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。
 */

function mergeSort(arr) {
  //采用自上而下的递归方法
  if (!Array.isArray(arr)) return [];
  let len = arr.length;
  if (len < 2) {
    return arr;
  }
  let middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  return result.concat(left).concat(right);
}

/**
 * 希尔排序（Shell Sort)
 *
 * 希尔排序是插入排序的一种更高效率的实现。它与插入排序的不同之处在于，它会优先比较距离较远的元素。
 * 按一定的间隔对数列进行分组，然后在每一个分组中做插入排序；
 * 随后逐次缩小间隔，在每一个分组中做插入排序...直到间隔等于1，做一次插入排序后结束。
 */

function shellSort(arr) {
  if (!Array.isArray(arr)) return [];
  let len = arr.length,
    temp,
    gap = 1;
  while (gap < len / 3) {
    // 动态定义间隔序列
    gap = gap * 3 + 1;
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < len; i += 1) {
      let j = i - gap;
      temp = arr[i];
      for (j; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp;
    }
  }
  return arr;
}

console.log('bubbleSort:', bubbleSort([...arrTemp]));
console.log('bubbleSort1:', bubbleSort1([...arrTemp]));

console.log('selectSortByMin:', selectSortByMin([...arrTemp]));
console.log('selectSortByMax:', selectSortByMax([...arrTemp]));
console.log('insertionSort:', insertionSort([...arrTemp]));
console.log('quickSort:', quickSort([...arrTemp]));
console.log('mergeSort:', mergeSort([...arrTemp]));
console.log('shellSort:', shellSort([...arrTemp]));
