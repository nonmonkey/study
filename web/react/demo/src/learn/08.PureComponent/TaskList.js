import React from 'react';
import types from '../../utils/commonTypes';
import Task from './Task';

export default class TaskList extends React.Component {
  static propTypes = {
    tasks: types.arrayOf(
      types.shape({
        name: types.string.isRequired,
        isFinish: types.bool.isRequired,
      })
    ).isRequired,
  };

  render() {
    console.log('TaskList render');
    const ts = this.props.tasks.map((it, i) => <Task key={i} {...it}></Task>);
    return <ul>{ts}</ul>;
  }
}
