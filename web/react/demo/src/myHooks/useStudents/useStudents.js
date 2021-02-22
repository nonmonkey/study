import { useState, useEffect } from 'react';
import { getStudents } from '../services/student';

/**
 * 当组件首次加载完成后，获取所有学生数据
 */
export default function useStudents(page = 1, limit = 10) {
  const [resp, setResp] = useState({});
  useEffect(() => {
    getStudents(page, limit).then((data) => {
      setResp(data);
    });
  }, [page, limit]);
  return resp;
}
