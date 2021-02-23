import React from 'react';
import FormInput from './FormInput';
import FormButton from './FormButton';
import ctx from './formContext';
import types from '../../utils/commonTypes';

class Form extends React.Component {
  static defaultProps = {
    data: {},
  };

  static propTypes = {
    data: types.object.isRequired,
    onSubmit: types.func,
  };

  state = {
    formData: this.props.data,
    // 修改 formData 中的值
    changeFormData: (name, val) => {
      this.setState({
        formData: {
          ...this.state.formData,
          [name]: val,
        }
      })
    },
    submit: () => {
      this.props.onSubmit && this.props.onSubmit(this.state.formData);
    },
  };

  render() {
    return (
      <form>
        <ctx.Provider value={this.state}>{this.props.children}</ctx.Provider>
      </form>
    );
  }
}

Form.Input = FormInput;
Form.Button = FormButton;

export default Form;
