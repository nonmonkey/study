import React from 'react';
import withLog from './withLog.js';
import Comp from './Comp';

const NewComp = withLog(Comp);

export default class Test extends React.Component {
  myRef = React.createRef();

  componentDidMount() {
    console.log('myRef::', this.myRef);
  }

  render() {
    return (
      <div className="test">
        <NewComp ref={this.myRef}></NewComp>
      </div>
    );
  }
}
