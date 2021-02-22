import React from 'react';
import './Modal.css';

export default function Modal(props) {
  if (props.show) {
    return (
      <div className="modal">
        <p>加载中...</p>
      </div>
    )
  }
  return null;
}
