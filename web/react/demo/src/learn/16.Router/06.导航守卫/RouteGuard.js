import React from 'react';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';

let prevLocation;
let location;
let action;
let unBlock;

class _GuardHelper extends React.Component {
  componentDidMount() {
    // 添加阻塞
    unBlock = this.props.history.block((newLocation, ac) => {
      prevLocation = this.props.location;
      location = newLocation;
      action = ac;
      return '';
    });

    // 添加一个监听器
    this.unListen = this.props.history.listen((location, action) => {
      if (this.props.onChange) {
        const prevLocation = this.props.location;
        this.props.onChange(prevLocation, location, action, this.unListen);
      }
    })
  }

  componentWillUnmount() {
    unBlock(); // 取消阻塞
    this.unListen(); // 取消监听器
  }

  render() {
    return null;
  }
}

const GuardHelper = withRouter(_GuardHelper);

class RouteGuard extends React.Component {
  handleConfirm = (msg, commit) => {
    if (this.props.onBeforeChange) {
      this.props.onBeforeChange(prevLocation, location, action, commit, unBlock);
    } else {
      commit(true);
    }
  }

  render() {
    return (
      <Router getUserConfirmation={this.handleConfirm}>
        <GuardHelper onChange={this.props.onChange}></GuardHelper>
        { this.props.children }
      </Router>
    );
  }
}

export default RouteGuard;
