import React from 'react';
import Checkbox from './Checkbox';
import types from '../../utils/commonTypes';

export default class DataGroupWrapper extends React.Component {
  static defaultProps = {
    datas: [],
    selectedDatas: [],
  };

  static propTypes = {
    // 属性
    name: types.string.isRequired,
    datas: types.groupDatas,
    selectedDatas: types.selectedDatas,
    disabled: types.bool,
    // 方法
    onChange: types.func,
  };

  handleChange = (checked, value, e) => {
    var target;
    if (checked) {
      target = [...this.props.selectedDatas, value];
    } else {
      target = this.props.selectedDatas.filter((it) => it !== value);
    }
    this.props.onChange && this.props.onChange(target, e);
  };

  render() {
    var comps = this.props.datas.map((item) => (
      <Checkbox
        key={item.value}
        name={this.props.name}
        value={item.value}
        checked={this.props.selectedDatas.includes(item.value)}
        disabled={this.props.disabled || item.disabled}
        onChange={this.handleChange}
      >
        {item.label}
      </Checkbox>
    ));
    return <div className="checkbox-group">{comps}</div>;
  }
}
