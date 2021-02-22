import React from 'react';
import ctx from './formContext';

export default function FormButton(props) {
  return (
    <ctx.Consumer>
      {(context) => {
        return (
          <button
            onClick={() => {
              context.submit();
            }}
          >
            {props.children}
          </button>
        );
      }}
    </ctx.Consumer>
  );
}
