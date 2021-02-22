import React from 'react';
import types from '../../utils/commonTypes';

export default class SwitchDot extends React.Component {
  static propTypes = {
    total: types.number.isRequired,
    curIndex: types.number.isRequired,
    onChange: types.func,
  };

  render() {
    const spans = new Array(this.props.total).fill().map((it, i) => (
      <span
        key={i}
        className={i === this.props.curIndex ? 'dot active' : 'dot'}
        onClick={() => {
          this.props.onChange && this.props.onChange(i);
        }}
      ></span>
    ));
    return <div className="dots">{spans}</div>;
  }
}
