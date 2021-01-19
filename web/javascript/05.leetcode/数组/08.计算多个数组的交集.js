/**
 *
 */
function intersection(...arrs) {
  if (arrs.length === 0) return [];
  var aSet = new Set(arrs[0]);
  if (arrs.length === 1) return Array.from(aSet);

  var bSet;
  for (var i = 1, len = arrs.length; i < len; i++) {
    bSet = new Set(arrs[i]);
    aSet.forEach((i) => {
      if (!bSet.has(i)) {
        aSet.delete(i);
      }
    })
    if (aSet.size === 0) break;
  }

  return Array.from(aSet);
}
