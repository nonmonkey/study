// https://api.muxiaoguo.cn/user/owned.html
import { useHttp } from '@/http';
import aIns from '../../instances';

export default {
  getHistoryToday () {
    const config = {
      method: 'GET',
      url: '/lishijr',
      params: { api_key: 'd50beeac82d5f9ab' }
    };
    const options = {
      formatter: (data) => {
        data.data = data.data.map((it) => {
          it.date = it.year + it.month + it.day;
          return it;
        });
        return data;
      }
    };

    return useHttp(config, aIns.muxiaoguo, options); ;
  }
};
