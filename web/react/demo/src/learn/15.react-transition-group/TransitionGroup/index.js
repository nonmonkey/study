import { useState, useCallback } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import 'animate.css';

var n = 3;

export default function App() {
  const [tasks, setTasks] = useState([
    { id: uuidv4(), name: '任务1' },
    { id: uuidv4(), name: '任务2' },
    { id: uuidv4(), name: '任务3' },
    { id: uuidv4(), name: '任务4' },
    { id: uuidv4(), name: '任务5' },
    { id: uuidv4(), name: '任务6' },
  ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleRemove = useCallback((id) => setTasks(tasks.filter((it) => it.id !== id)), [tasks]);
  const handleAdd = useCallback(() => {
    var result = [...tasks];
    result.splice(Math.floor(Math.random() * result.length), 0, { id: uuidv4(), name: `任务${n++}` });
    console.log('result:', result);
    setTasks(result);
  }, [tasks]);

  return (
    <div style={{ width: '200px', margin: '0 auto' }}>
      <TransitionGroup appear component="ul">
        {tasks.map((it) => (
          <CSSTransition
            classNames={{
              appearActive: 'animate__fadeInTopLeft',
              enterActive: 'animate__fadeInTopLeft',
              exitActive: 'animate__fadeOutBottomRight',
            }}
            timeout={500}
            key={it.id}
          >
            <li className="animate__animated animate__faster">
              {it.name}
              <button
                onClick={() => {
                  handleRemove(it.id);
                }}
              >
                删除
              </button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>

      <button onClick={handleAdd}>添加</button>
    </div>
  );
}
