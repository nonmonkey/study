import React from 'react';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import 'animate.css';

export default function TransitionRoute(props) {
  const { component: Component, ...rest } = props;
  return (
    <Route {...rest}>
      {(props) => {
        return (
          <CSSTransition
            in={!!props.match}
            timeout={500}
            classNames={{
              enter: 'animate__animated animate__fast animate__fadeInRight',
              exit: 'animate__animated animate__fast animate__fadeOutLeft',
            }}
            mountOnEnter
            unmountOnExit
          >
            <Component></Component>
          </CSSTransition>
        );
      }}
    </Route>
  )
}
