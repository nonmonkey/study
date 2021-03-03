import React from 'react';

export default class StudentSearch extends React.Component {
  constructor(props) {
    super(props);
    const def = {
      key: '',
      sex: -1,
    };
    this.state = Object.assign({}, def, props.defaultValue);
  }

  handleRadioChange = (e) => {
    this.setState({
      sex: +e.target.value,
    });
  };

  handleSearch = () => {
    if (this.props.onSearch) {
      this.props.onSearch({ key: this.state.key, sex: this.state.sex });
    }
  }

  render() {
    return (
      <div>
        关键字：
        <input type="text" value={this.state.key} onChange={(e) => this.setState({ key: e.target.value })} />
        性别：
        <label>
          <input
            type="radio"
            checked={this.state.sex === -1}
            onChange={this.handleRadioChange}
            name="sex"
            value={-1}
            id=""
          />
          不限
        </label>
        <label>
          <input
            type="radio"
            checked={this.state.sex === 0}
            onChange={this.handleRadioChange}
            name="sex"
            value={0}
            id=""
          />
          男
        </label>
        <label>
          <input
            type="radio"
            checked={this.state.sex === 1}
            onChange={this.handleRadioChange}
            name="sex"
            value={1}
            id=""
          />
          女
        </label>
        <button onClick={this.handleSearch}>查询</button>
      </div>
    );
  }
}
