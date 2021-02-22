import React from 'react';
import types from '../../utils/commonTypes';
import './modal.css';

Modal.defaultProps = {
  bg: 'rgba(0,0,0,.5)',
};

Modal.propsTypes = {
  children: types.node,
  bg: types.string,
  onClose: types.func,
}

export default function Modal(props) {
  return (
    <div
      onClick={(e) => {
        console.log('e:', e)
        if (e.target.className === 'modal') {
          props.onClick();
        }
      }}
      className="modal"
      style={{ backgroundColor: props.bg }}
    >
      <div className="modal-center">{props.children}</div>
    </div>
  );
}
