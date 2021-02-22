import React from 'react';
import types from '../../utils/commonTypes';
import withDataGroup from '../../HOC/withDataGroup';

export class Option extends React.Component {
  static propType = {
    label: types.string.isRequired,
    value: types.string.isRequired,
    disabled: types.bool,
  };

  render() {
    return <option value={this.props.value}>{this.props.label}</option>;
  }
}

const OptGroup = withDataGroup(Option);

export default class Select extends React.Component {
  static propTypes = {
    // 属性
    name: types.string.isRequired,
    value: types.string,
    // 方法
    onChange: types.func,
  };

  handleChange = (e) => {
    this.props.onChange && this.props.onChange(e.target.value, e);
  };

  render() {
    return (
      <select name={this.props.name} value={this.props.value} onChange={this.handleChange}>
        <OptGroup datas={this.props.datas}></OptGroup>
      </select>
    );
  }
}
