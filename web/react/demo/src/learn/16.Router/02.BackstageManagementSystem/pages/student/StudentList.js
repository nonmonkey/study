import { useState, useEffect } from 'react';
import StudentSearch from '../../components/StudentSearch';
import StudentTable from '../../components/StudentTable';
import { searchStudents } from '../../services/student';
import Pager from '../../../../../components/03.Pager/Pager.js';

import qs from 'query-string';

/**
 * 该函数用于获取地址栏参数中提供的查询条件，返回一个对象
 * 如果某些条件在地址中缺失，该函数会使用默认值。
 */
function getQuery(search) {
  const queryDefault = {
    page: 1,
    limit: 10,
    key: '',
    sex: -1,
  };
  const query = Object.assign({}, queryDefault, qs.parse(search));
  query.limit = +query.limit;
  query.sex = +query.sex;
  query.page = +query.page;
  return query;
}

function useResp(query) {
  const [resp, setResp] = useState({
    cont: 0,
    datas: [],
  });
  useEffect(() => {
    searchStudents({
      limit: query.limit,
      key: query.key,
      sex: query.sex,
      page: query.page,
    }).then((res) => setResp(res));
  }, [query.limit, query.key, query.sex, query.page]);
  return resp;
}

function changeLocation(query, history) {
  // 根据条件对象，改变地址
  history.push('?' + qs.stringify(query));
}

export default function StudentList(props) {
  const query = getQuery(props.location.search);
  const resp = useResp(query);
  console.log('StudentList props:', props, resp);

  return (
    <div>
      <h1>学生列表页</h1>

      <StudentSearch
        defaultValue={{
          key: query.key,
          sex: query.sex,
          limit: query.limit,
          page: query.page,
        }}
        onSearch={(cod) => {
          const newQuery = {
            ...query,
            key: cod.key,
            sex: cod.sex,
            page: 1,
          };
          changeLocation(newQuery, props.history);
        }}
      ></StudentSearch>

      <StudentTable stus={resp.datas}></StudentTable>

      <Pager
        current={query.page}
        total={resp.cont}
        limit={query.limit}
        panelNumber={10}
        onPageChange={(newPage) => {
          const newQuery = {
            ...query,
            page: newPage,
          };
          changeLocation(newQuery, props.history);
        }}
      ></Pager>
    </div>
  );
}
