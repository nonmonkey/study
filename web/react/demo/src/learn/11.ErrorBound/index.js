import React from 'react';
import ErrorBound from '../../components/08.ErrorBound';

function Comp1(props) {
  return (
    <div
      style={{
        width: '90%',
        height: 500,
        border: '2px solid black',
      }}
    >
      <h1>Comp1</h1>
      <Comp2></Comp2>
    </div>
  );
}

function getDatas() {
  return;
}

function Comp2(props) {
  const datas = getDatas();
  const spans = datas.map((i) => <div>某一项</div>);
  return (
    <div
      style={{
        width: '90%',
        height: '70%',
        border: '2px solid black',
      }}
    >
      {spans}
      <h1>Comp2</h1>
    </div>
  );
}

function Comp3(props) {
  return (
    <div
      style={{
        width: '90%',
        height: 500,
        border: '2px solid black',
      }}
    >
      <h1>Comp3</h1>
    </div>
  );
}

export default function Test() {
  return (
    <>
      <ErrorBound>
        <Comp1></Comp1>
      </ErrorBound>
      <Comp3></Comp3>
    </>
  );
}
