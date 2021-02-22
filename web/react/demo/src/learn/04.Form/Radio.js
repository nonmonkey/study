import React from 'react';
import types from '../../utils/commonTypes';

export default class Radio extends React.Component {
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
    this.props.onChange && this.props.onChange(e);
  };

  state = {
    defaultChecked: this.props.defaultChecked,
  };

  render() {
    return (
      <label>
        <input
          type="radio"
          name={this.props.name}
          value={this.props.value}
          checked={'checked' in this.props ? this.props.checked : this.state.defaultValue}
          disabled={this.props.disabled}
          onChange={this.handleChange}
        />
        {this.props.children}
      </label>
    );
  }
}
