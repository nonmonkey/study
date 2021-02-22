import React from 'react';
import types from '../../utils/commonTypes';

export default class Checkbox extends React.Component {
  static propTypes = {
    // 属性
    checked: types.bool, // 是否选中（还可以用来表示是否为受控组件）
    defaultChecked: types.bool,
    value: types.string,
    disabled: types.bool,
    name: types.string,
    children: types.node,
    // 事件
    onChange: types.func,
  };

  handleChange = (e) => {
    var checked = e.target.checked;
    var value = e.target.value;
    this.props.onChange && this.props.onChange(checked, value, e);
  };

  render() {
    return (
      <label>
        <input
          type="checkbox"
          {...('checked' in this.props
            ? { checked: this.props.checked }
            : { defaultChecked: this.props.defaultChecked })}
          value={this.props.value}
          name={this.props.name}
          disabled={this.props.disabled}
          onChange={this.handleChange}
        />
        {this.props.children}
      </label>
    );
  }
}
