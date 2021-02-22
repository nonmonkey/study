import React from 'react';
// import types from '../../utils/commonTypes';
import TaskList from './TaskList';
import AddTask from './AddTask';

export default class TaskContainer extends React.Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
    const ts = [];
    for (var i = 0; i < 10; i++) {
      ts.push({
        name: '任务' + i,
        isFinish: Math.random() > 0.5,
      });
    }
    this.setState({
      tasks: ts,
    });
  }

  onAdd = (newTask) => {
    this.setState({
      tasks: [...this.state.tasks, newTask],
    });
  };

  render() {
    console.log('TaskContainer render');
    return (
      <div>
        <AddTask onAdd={this.onAdd}></AddTask>
        <TaskList tasks={this.state.tasks}></TaskList>
      </div>
    );
  }
}
