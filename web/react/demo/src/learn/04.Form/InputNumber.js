import React from 'react';

export default class InputNumber extends React.Component {
  state = {
    val: '',
  };

  render() {
    return (
      <input
        type="text"
        value={this.state.val}
        onChange={(e) => {
          var val = e.target.value;
          val = +val.replace(/\D/g, '');
          if (val === this.state.val) return;

          this.setState({ val });
          this.props.onChange && this.props.onChange(val);
        }}
      />
    );
  }

  componentDidMount() {
    this.setState({ val: this.props.value });
  }
}
