import React from 'react';
import types from '../../utils/commonTypes';

// 箭头
export default class SwitchArrow extends React.Component {
  static propTypes = {
    onChange: types.func,
  };

  render() {
    return (
      <div className="arrow">
        <span
          className="left"
          onClick={() => {
            this.props.onChange && this.props.onChange(-1);
          }}
        >
          &lt;
        </span>
        <span
          className="right"
          onClick={() => {
            this.props.onChange && this.props.onChange(1);
          }}
        >
          &gt;
        </span>
      </div>
    );
  }
}
