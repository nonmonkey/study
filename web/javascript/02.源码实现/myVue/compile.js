// 姓名：{{ name }}, 年龄：{{ age }}，居住省份：{{ addr.province }}
// 返回：['{{ name }}', '{{ age }}', '{{ addr.province }}']
function getFragments(template) {
  var matchs = template.match(/{{[^}]+}}/g);
  return matchs || [];
}

/**
 * 根据片段的内容，从环境对象中取出相依的数据
 * @param {*} fragment
 * @param {*} envObj
 */
function getValue(fragment, envObj) {
  // exp：花括号内的表达式
  let exp = fragment.replace('{{', '').replace('}}', '').trim();
  let props = exp.split('.'); // 将表达式分割成一个属性数组
  let obj = envObj;
  for (let i = 0, len = props.length; i < len; i += 1) {
    obj = obj[props[i]];
  }
  return obj;
}

/**
 * 根据模版和环境对象，得到编译结果
 * @param {*} template 模版字符串
 * @param {*} envObj 环境对象
 */
export default function compile(template, envObj) {
  let frags = getFragments(template);
  let result = template;
  for (let i = 0, len = frags.length; i < len; i += 1) {
    let frag = frags[i];
    result = result.replace(frag, getValue(frag, envObj));
  }
  console.log('result:', result);
  return result;
}
