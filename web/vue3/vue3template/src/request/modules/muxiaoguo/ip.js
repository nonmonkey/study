// https://api.muxiaoguo.cn/user/owned.html
import {
  useHttp,
  useHttpRace,
  useHttpAny,
  useHttpAll
} from '@/http';
import aIns from '../../instances';

export default {
  /**
   * 获取ip地址信息
   * @param {*} ip
   * @param {*} type m，w，y
   * @returns
   */
  getIPLocation (ip = '', type = 'm') {
    const config = {
      method: 'get',
      url: '/ip',
      params: {
        api_key: '2c7a2f463d49b219',
        ip,
        type
      }
    };

    return useHttp(config, aIns.muxiaoguo);
  },

  getIPLocationRace (IPs = [], type = 'm') {
    const configs = IPs.map((IP) => {
      return {
        method: 'get',
        url: '/ip',
        params: {
          api_key: '2c7a2f463d49b219',
          ip: IP,
          type
        }
      };
    });

    return useHttpRace(configs, aIns.muxiaoguo);
  },

  getIPLocationAny (IPs = [], type = 'm') {
    const configs = IPs.map((IP) => {
      return {
        method: 'get',
        url: '/ip',
        params: {
          api_key: '2c7a2f463d49b219',
          ip: IP,
          type
        }
      };
    });

    return useHttpAny(configs, aIns.muxiaoguo);
  },

  getIPLocationAll (IPs = [], type = 'm') {
    const configs = IPs.map((IP) => {
      return {
        method: 'get',
        url: '/ip',
        params: {
          api_key: '2c7a2f463d49b219',
          ip: IP,
          type
        }
      };
    });

    return useHttpAll(configs, aIns.muxiaoguo);
  }
};
