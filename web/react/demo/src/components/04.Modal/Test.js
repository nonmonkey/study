import React from 'react';
import Modal from './index';

export default class Test extends React.Component {
  state = {
    showModal: false,
  };
  showModal = () => {
    this.setState({
      showModal: true,
    });
  };
  hideModal = () => {
    this.setState({
      showModal: false,
    });
  };
  render() {
    return (
      <div>
        {this.state.showModal ? (
          <Modal onClick={this.hideModal}>
            <h1>this is h1</h1>
            <button onClick={this.hideModal}>关闭蒙层</button>
          </Modal>
        ) : null}
        <button onClick={this.showModal}>显示蒙层</button>
      </div>
    );
  }
}
