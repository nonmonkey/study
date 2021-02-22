import React from 'react';

// export default function FuncDefault(props) {
//   return (
//     <div>
//       a: {props.a}, b: {props.b}, c: {props.c},
//     </div>
//   );
// }

// FuncDefault.defaultProps = {
//   a: 1,
//   b: 2,
//   c: 3,
// };

export default class FuncDefault extends React.Component {
  static defaultProps = {
    a: 1,
    b: 2,
    c: 3,
  };

  constructor(props) {
    super(props);
    console.log('props', props);
  }

  render() {
    return (
      <div>
        a: {this.props.a}, b: {this.props.b}, c: {this.props.c},
      </div>
    );
  }
}
