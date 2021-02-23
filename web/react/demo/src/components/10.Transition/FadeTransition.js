import { useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import './fade.css';
// import types from './../../utils/commonTypes';

FadeTransition.defaultProps = {
  timeout: 500,
};

const styleRemove = (node) => {
  node.style.transition = ``;
};
const styleAdd = (node, timeout) => {
  node.style.transition = `opacity ${timeout}ms`;
};

export default function FadeTransition(props) {
  const { timeout, onEnter, onEntered, onExit, onExited } = props;

  const fadeEnter = useCallback(
    (node) => {
      styleAdd(node, timeout);
      onEnter && onEnter(node);
    },
    [onEnter, timeout]
  );
  const fadeEntered = useCallback(
    (node) => {
      styleRemove(node);
      onEntered && onEntered(node);
    },
    [onEntered]
  );
  const fadeExit = useCallback(
    (node) => {
      styleAdd(node, timeout);
      onExit && onExit(node);
    },
    [onExit, timeout]
  );
  const fadeExited = useCallback(
    (node) => {
      styleRemove(node);
      onExited && onExited(node);
    },
    [onExited]
  );

  return (
    <CSSTransition
      {...props}
      classNames="fade"
      onEnter={fadeEnter}
      onEntered={fadeEntered}
      onExit={fadeExit}
      onExited={fadeExited}
    ></CSSTransition>
  );
}
