import { useState, useEffect } from 'react';
import getAllStudents from '../services/student';

/**
 * 当组件首次加载完成后，获取所有学生数据
 */
export default function useAllStudents() {
  const [students, setstudents] = useState([]);
  useEffect(() => {
    getAllStudents().then((data) => {
      setstudents(data);
    });
  }, []);

  return students;
}
