/**
输入："abbbaca"
输出："ca"
解释："abbbaca" => "aaca"=>"ca"
 */
/**
 * 删除字符串中出现次数 >= 2 次的相邻字符
 * @param {string}s
 */
function removeDuplicate(s) {
  var _ = [];
  var len = s.length;

  for (var i = 0; i < len; i++) {
    var last = _.pop();
    var _s = s[i];

    if (!last) {
      _.push(_s);
    } else if (last[0] === _s) {
      if (s[i + 1] && s[i + 1] === _s) {
        _.push(last + _s);
      }
    } else {
      _.push(last, _s);
    }
  }
  return _.join('');
}
