import React from 'react';
import './index.css';
import types from '../../utils/commonTypes';

ThreeLayout.defaultProps = {
  leftWidth: 200,
  rightWidth: 200,
  minWidth: 800,
  gap: 0, // 间隙
};

ThreeLayout.propTypes = {
  leftWidth: types.number,
  rightWidth: types.number,
  minWidth: types.number,
  gap: types.number,
  children: types.node,
  left: types.node,
  right: types.node,
};

export default function ThreeLayout(props) {
  return (
    <div className="three-layout" style={{ minWidth: props.minWidth }}>
      <div
        className="aside-left"
        style={{
          width: props.leftWidth,
          marginRight: props.gap,
        }}
      >
        {props.left}
      </div>
      <div className="main">{props.children}</div>
      <div
        className="aside-right"
        style={{
          width: props.rightWidth,
          marginLeft: props.gap,
        }}
      >
        {props.right}
      </div>
    </div>
  );
}
