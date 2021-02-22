import React from 'react';
import PropTypes from 'prop-types';

console.log('PropTypes:', PropTypes);

export default class ValidationComp extends React.Component {
  static defaultProps = {
    a: 1,
    b: true,
  };

  static propTypes = {
    a: PropTypes.number.isRequired, // number 类型 必填
    b: PropTypes.bool.isRequired, // boolean 类型 必填
    onClick: PropTypes.func, // function 类型
    c: PropTypes.any, // 任意类型
    d: PropTypes.elementType,
    obj: PropTypes.shape({
      name: PropTypes.string.isRequired,
      age: PropTypes.number,
    }).isRequired,
    n: function(props, propName, componentName) {
      console.log('自定义校验属性：', props, propName, componentName)
    }
  };

  obj = [
    PropTypes.number, // number 类型
    PropTypes.bool, // boolean 类型
    PropTypes.func, // function 类型
    PropTypes.node, // 任何可以被渲染的内容，字符串、数字、React元素
    PropTypes.element, // React元素
    PropTypes.elementType, // 必须是一个组件类型(即React元素函数)
    PropTypes.instanceOf('构造函数'), // 必须是指定构造函数的实例
    PropTypes.oneOf(['xxx', 'xxx']), // 枚举
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 属性类型必须是其中一个
    PropTypes.arrayOf(PropTypes.XXX), // 必须是某一类型的数组
    PropTypes.objectOf(PropTypes.XXX), // 对象属性值必须是某一类型的值
    PropTypes.shape('对象'), // 属性必须是对象，并且满足指定的对象要求
    /** 示例：
     * PropTypes.shape({
     *  name: PropTypes.string.isRequired,
     *  age: PropTypes.number,
     *  address: PropTypes.shape({
     *    province: PropTypes.string.isRequired,
     *  }).isRequired
     * })
     * 
     * PropTypes.arrayOf(PropTypes.shape({XXXX}))
     */
    PropTypes.exact, // 同PropTypes.shape 但是不能有额外的属性

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
  ];

  render() {
    return <div></div>;
  }
}
