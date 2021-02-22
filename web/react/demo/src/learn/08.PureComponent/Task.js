import React from 'react';
import types from '../../utils/commonTypes';
import './task.css';

// 1. PureComponent
/**
export default class Task extends React.PureComponent {
  static propTypes = {
    name: types.string.isRequired,
    isFinish: types.bool.isRequired,
  };

  render() {
    console.log('Task render');
    return <li className={this.props.isFinish ? 'isFinish' : ''}>{this.props.name}</li>;
  }
}
*/


// 2. 函数组件使用 memo 方法
function FuncTask(props) {
  console.log('FuncTask:render');
  return <li className={props.isFinish ? 'isFinish' : ''}>{props.name}</li>;
}
FuncTask.propTypes = {
  name: types.string.isRequired,
  isFinish: types.bool.isRequired,
}
export default React.memo(FuncTask);

/** 
// 3. 自己进行性能优化
import React from 'react';
import types from '../../utils/commonTypes';
import objectEqual from '../../utils/objectEqual';
import './task.css';

export default class Task extends React.Component {
  static propTypes = {
    name: types.string.isRequired,
    isFinish: types.bool.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (objectEqual(this.props, nextProps) && objectEqual(this.state, nextState)) return false;
    return true;
  }

  render() {
    console.log('Task render');
    return <li className={this.props.isFinish ? 'isFinish' : ''}>{this.props.name}</li>;
  }
}
*/
