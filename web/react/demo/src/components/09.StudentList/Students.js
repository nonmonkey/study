import React from 'react';
import types from '../../utils/commonTypes';

/**
 * 学生列表
 */
export default function StudentList({ stus }) {
  const list = stus.map((it) => {
    return (
      <li key={it.id}>
        {it.name}, {it.sex === 1 ? '男' : '女'}
      </li>
    );
  });
  return <ul>{ list }</ul>;
}

StudentList.defaultProps = {
  stus: [],
};

StudentList.propTypes = {
  stus: types.array.isRequired,
};
