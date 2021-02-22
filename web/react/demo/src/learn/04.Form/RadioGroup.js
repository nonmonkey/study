import React from 'react';
import Radio from './Radio';
import types from '../../utils/commonTypes';

export default class RadioGroup extends React.Component {
  static defaultProps = {
    datas: [],
  };

  static propTypes = {
    // 属性
    value: types.string,
    defaultValue: types.string,
    name: types.string.isRequired,
    datas: types.groupDatas,
    disabled: types.bool,
    // 方法
    onChange: types.func,
  };

  state = {
    defaultValue: this.props.defaultValue,
  };

  handleChange = (e) => {
    this.props.onChange && this.props.onChange(e.target.value, e);

    if (!('value' in this.props)) {
      this.setState({
        defaultValue: e.target.value,
      });
    }
  };

  render() {
    var comps = this.props.datas.map((item) => (
      <Radio
        key={item.value}
        name={this.props.name}
        value={item.value}
        checked={'value' in this.props ? this.props.value === item.value : this.state.defaultValue === item.value}
        disabled={this.props.disabled || item.disabled}
        onChange={this.handleChange}
      >
        {item.label}
      </Radio>
    ));

    return <div className="radio-group">{comps}</div>;
  }
}
