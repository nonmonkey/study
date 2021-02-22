import React from 'react';
import types from '../../utils/commonTypes';
import ctx from './formContext';

export default class FormInput extends React.Component {
  static defaultProps = {
    type: 'text',
  };

  static propTypes = {
    name: types.string.isRequired,
    type: types.string.isRequired,
  };

  static contextType = ctx;

  render() {
    return (
      <input
        value={this.context.formData[this.props.name]}
        onChange={(e) => {
          this.context.changeFormData(this.props.name, e.target.value);
        }}
        type={this.props.type}
      />
    );
  }
}
