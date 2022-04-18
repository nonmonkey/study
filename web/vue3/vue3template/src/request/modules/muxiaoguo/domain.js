// https://api.muxiaoguo.cn/user/owned.html
import { useHttp } from '@/http';
import aIns from '../../instances';

export default {
  getDomainRegister (url = '') {
    const config = {
      method: 'GET',
      url: '/ymzhuce',
      params: {
        api_key: 'ff4bc5175a03b898',
        url
      }
    };

    const { data } = useHttp(config, aIns.muxiaoguo);
    return { data };
  }
};
