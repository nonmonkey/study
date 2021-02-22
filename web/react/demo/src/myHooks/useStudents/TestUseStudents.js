import React, { useState } from 'react';
import useStudents from './useStudents';

function Test() {
  const [page, setPage] = useState(1);
  const resp = useStudents(page, 10);

  if (resp.findByPage) {
    const list = resp.findByPage.map((it) => {
      return (
        <li key={it.id}>
          {it.name}, {it.sex === 1 ? '男' : '女'}
        </li>
      );
    });
    return (
      <>
        <input type="number" value={page} onChange={(e) => {
          console.log('e.target.value:', e.target.value)
          setPage(parseInt(e.target.value));
        }} />
        <h3>总数：{resp.cont}</h3>
        <ul>{list}</ul>
      </>
    );
  } else {
    return null;
  }
}

export default function App() {
  return (
    <div>
      <Test></Test>
    </div>
  );
}
