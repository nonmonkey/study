import PropTypes from 'prop-types';

/*
  // 自定义属性检查，如果有错误，返回错误对象即可
  function(props, propName, componentName) {
    // props 所有属性
    // propName 当前要校验的属性名
    // componentName 元素名
    var val = props[propName];

    if (val === null || val === undefined) return new Error(
      `invalid prop ${propName} in ${componentName}, ${propName} is required.`
    )
    if (typeof val !== 'number') return new Error(
      `invalid prop ${propName} in ${componentName}, ${propName} is not a number.`
    )
    if (val < 0 || val > 100) return new Error(
      `invalid prop ${propName} in ${componentName}, ${propName} must between 0 and 100.`
    )
  }
*/

const result = {
  // prop-types 方法
  any: PropTypes.any, // 任意类型
  number: PropTypes.number, // number
  string: PropTypes.string, // string
  bool: PropTypes.bool, // boolean
  symbol: PropTypes.symbol, // symbol
  func: PropTypes.func, // function
  node: PropTypes.node, // 任何可以被渲染的内容，字符串、数字、React元素
  element: PropTypes.element, // React元素
  elementType: PropTypes.elementType, // 必须是一个组件类型(即React元素函数)
  instanceOf: PropTypes.instanceOf, // 必须是指定构造函数的实例
  oneOf: PropTypes.oneOf, // 枚举
  oneOfType: PropTypes.oneOfType, // 必须是其中一个属性类型
  array: PropTypes.array, // 数组
  arrayOf: PropTypes.arrayOf, // 必须是某一类型的数组
  object: PropTypes.object, // 对象
  objectOf: PropTypes.objectOf, // 对象属性值必须是某一类型的值
  shape: PropTypes.shape, // 属性必须是对象，并且满足指定的对象要求
  exact: PropTypes.exact, // 同PropTypes.shape 但是不能有额外的属性

  // 自定义方法
  groupDatas: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ),
  selectedDatas: PropTypes.arrayOf(PropTypes.string),
  singleData: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })
};

export default result;
