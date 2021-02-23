import React from 'react';
import FadeTransition from './FadeTransition.js';
import {
  // SwitchTransition,
  TransitionGroup,
} from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

var n = 4;
export default class App extends React.Component {
  state = {
    show: true,
    time: 1000,
    tasks: [
      { id: uuidv4(), name: '任务1' },
      { id: uuidv4(), name: '任务2' },
      { id: uuidv4(), name: '任务3' },
    ],
  };
  handleRemove = (id) => {
    var result = [...this.state.tasks];
    this.setState({
      tasks: result.filter((it) => it.id !== id),
    });
  }

  handleAdd = () => {
    var result = [...this.state.tasks];
    result.splice(Math.floor(Math.random() * result.length), 0, { id: uuidv4(), name: `任务${n++}` });
    this.setState({
      tasks: result,
    });
  }

  render() {
    return (
      <div sytle={{ width: '200px', margin: '0 auto' }}>
        {/* <FadeTransition appear timeout={this.state.time} in={this.state.show}>
          <h1>标题</h1>
        </FadeTransition> */}

        {/* <SwitchTransition>
          <FadeTransition appear timeout={this.state.time} key={this.state.show}>
            <h1>{this.state.show ? '显示' : '隐藏'}</h1>
          </FadeTransition>
        </SwitchTransition>
        <button
          onClick={() => {
            this.setState({
              show: !this.state.show,
            });
          }}
        >
          切换显示状态
        </button> */}

        <TransitionGroup component="ul" appear>
          {this.state.tasks.map((it) => (
            <FadeTransition timeout={3000} key={it.id}>
              <li className="animate__animated animate__faster">
                {it.name}
                <button
                  onClick={() => {
                    this.handleRemove(it.id);
                  }}
                >
                  删除
                </button>
              </li>
            </FadeTransition>
          ))}
        </TransitionGroup>
        <button onClick={this.handleAdd}>添加</button>
      </div>
    );
  }
}
