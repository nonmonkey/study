import { useState } from 'react';
import { Transition } from 'react-transition-group';
import './Fade1.css';

const duration = 300;

export default function App() {
  const [inProp, setInProp] = useState(true);

  return (
    <div>
      <Transition
        in={inProp}
        timeout={duration}
        appear={true}
      >
        {(state) => {
          console.log(state);
          return <div className={`fade ${state}`}>I'm a fade Transition!</div>;
        }}
      </Transition>

      <button onClick={() => setInProp(!inProp)}>Click to Toggle</button>
    </div>
  );
}
