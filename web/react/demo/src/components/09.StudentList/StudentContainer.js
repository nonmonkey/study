import React, { useState, useEffect } from 'react';
import StudentList from './Students';
import { getStudents } from '../../services/student';
import Pager from './../03.Pager/Pager';

/**
 * 用于提供数据，以及控制数据的变化
 */
export default function StudentContainer() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [panelNumber] = useState(5);

  // 当页码和页容量发生变化时重新获取数据
  useEffect(() => {
    getStudents(page, limit).then((data) => {
      setStudents(data.findByPage);
      setTotal(data.cont);
    });
  }, [page, limit]); // 空数组的作用，是让该副作用函数没有任何依赖项，从而仅在首次挂载时运行。

  return (
    <div>
      <StudentList stus={students}></StudentList>

      <Pager
        current={page}
        limit={limit}
        total={total}
        panelNumber={panelNumber}
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
      ></Pager>
    </div>
  );
}
