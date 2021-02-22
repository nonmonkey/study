import React from 'react';

export default class Input extends React.Component {
  state = {
    val: 123,
  };

  render() {
    return (
      <div>
        input:
        <input
          type="text"
          value={this.state.val}
          onChange={(e) => {
            this.setState({ val: e.target.value });
          }}
        />
        <button
          onClick={() => {
            console.log(this.state.val);
          }}
        >
          获取文本框的值
        </button>
      </div>
    );
  }
}
