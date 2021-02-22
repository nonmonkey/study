import React from 'react';
import useAllStudents from './useAllStudents';

function Test() {
  const stus = useAllStudents();
  const list = stus.map((it) => {
    return (
      <li key={it.id}>
        {it.name}, {it.sex === 1 ? '男' : '女'}
      </li>
    );
  });
  return (
    <ul>{ list }</ul>
  )
}

export default function App() {
  return (
    <div>
      <Test></Test>
    </div>
  )
}
