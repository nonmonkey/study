// https://api.muxiaoguo.cn/user/owned.html
import { useHttp } from '@/http';
import aIns from '../../instances';

export default {
  getQQInfo (qq = '') {
    const config = {
      method: 'get',
      url: '/QqInfo',
      params: {
        api_key: '3ad9e6fe4b4ed658',
        qq
      }
    };

    const { data } = useHttp(config, aIns.muxiaoguo);
    return { data };
  }
};
