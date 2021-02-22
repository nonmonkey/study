import React from 'react';
import ReactDOM from 'react-dom';

function ChildA(props) {
  // ChildA 会被渲染到 #modal 中。
  return ReactDOM.createPortal(
    <div className="child-a">
      ChildA
      <ChildB></ChildB>
    </div>,
    document.getElementById('modal')
  );
}

function ChildB(props) {
  return <div className="child-b">ChildB</div>;
}

export default function Test() {
  return (
    <>
      <div className="test">
        this is test
        <ChildA></ChildA>
      </div>
    </>
  );
}
