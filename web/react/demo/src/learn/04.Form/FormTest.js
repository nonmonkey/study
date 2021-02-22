import React from 'react';
import Checkbox from './Checkbox';
import CheckboxGroup from './CheckboxGroup';
import Radio from './Radio';
import RadioGroup from './RadioGroup';
import Select from './Select';

export default class FormTest extends React.Component {
  state = {
    diabled: true,
    chooseLoves: ['football', 'music'],
    city: 'shanghai',
    selectedValue: 'shenzhen',
  };

  loves = [
    { value: 'football', label: '足球' },
    { value: 'baseketball', label: '篮球' },
    { value: 'movie', label: '电影' },
    { value: 'music', label: '音乐', disabled: true },
    { value: 'other', label: '其他' },
  ];

  citys = [
    { value: 'beijing', label: '北京' },
    { value: 'shanghai', label: '上海' },
    { value: 'shenzhen', label: '深圳' },
  ];

  checkboxChange = (disabled, value, e) => {
    this.setState({
      disabled,
    });
  };

  checkboxGroupChange = (values, e) => {
    this.setState({
      chooseLoves: values,
    });
  };

  radioChange = (e) => {
    console.log('radioChange:', e.target.checked, e.target.value, e.target.name);
  };

  radioGroupChange = (value, e) => {
    this.setState({
      city: value,
    });
  };

  selectChange = (value, e) => {
    console.log(value, e);
    this.setState({
      selectedValue: value,
    });
  };

  render() {
    var input = <input type="checkbox" name="" defaultValue={true} id="" />;
    return (
      <div>
        <div style={{ borderBottom: '1px solid black' }}>
          <h4>多选框</h4>
          <Checkbox checked={this.state.checked} onChange={this.checkboxChange}>
            hello
          </Checkbox>
          <h4>多选框组</h4>
          <CheckboxGroup
            name="checkboxTest"
            datas={this.loves}
            selectedDatas={this.state.chooseLoves}
            onChange={this.checkboxGroupChange}
          ></CheckboxGroup>
        </div>

        <div style={{ borderBottom: '1px solid black' }}>
          <h4>单选框</h4>
          <Radio name="duhe" onChange={this.radioChange} defaultValue value="Radio1">
            Radio1
          </Radio>
          <Radio name="duhe" onChange={this.radioChange} value="Radio2">
            Radio2
          </Radio>
          <Radio name="duhe" onChange={this.radioChange} value="Radio3">
            Radio3
          </Radio>
          <h4>单选框组</h4>
          <RadioGroup
            name="checkboxTest"
            datas={this.citys}
            defaultValue="beijing"
            value={this.state.city}
            onChange={this.radioGroupChange}
          ></RadioGroup>
        </div>

        <div style={{ borderBottom: '1px solid black' }}>
          <h4>下拉菜单</h4>
          <Select
            name="selectTest"
            value={this.state.selectedValue}
            datas={this.citys}
            onChange={this.selectChange}
          ></Select>
        </div>

        <div>
          <button
            onClick={() => {
              console.log(this.state);
            }}
          >
            打印数据
          </button>
        </div>
      </div>
    );
  }
}
