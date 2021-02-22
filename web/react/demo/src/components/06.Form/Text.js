import React from 'react';
import Form from './index';

export default class Text extends React.Component {
  state = {
    data: {
      loginId: 'du',
      loginPwd: 'he',
    },
  };
  render() {
    return (
      <Form
        data={this.state.data}
        onSubmit={(datas) => {
          console.log('Form datas: ', datas);
        }}
      >
        表单：
        <div>
          loginId: <Form.Input name="loginId"></Form.Input>
        </div>
        <div>
          loginPwd: <Form.Input type="password" name="loginPwd"></Form.Input>
        </div>
        <div>
          <Form.Button>提交</Form.Button>
        </div>
      </Form>
    );
  }
}
