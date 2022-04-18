// https://api.muxiaoguo.cn/user/owned.html
import { useHttp } from '@/http';
import aIns from '../../instances';

export default {
  /**
   * @param {*} city
   * @param {*} type [1=当天,2=未来7天,3=未来8-15天,4.降雨预测]
   * @returns
   *   cityname String 城市名
   *   nameen String 城市名拼音
   *   temp String 温度
   *   WD String 风向
   *   WS String 风级
   *   wse String 风速
   *   SD String 相对湿度
   *   weather String 天气
   *   pm25 String PM2.5
   *   time String 天气数据最后更新时间
   *   limitnumber String 限行返回空，否则返回不限行
   *   forecast String 降雨预测返回信息
   */
  getWeather (city = '', type = 1) {
    const config = {
      method: 'GET',
      url: '/tianqi',
      params: {
        api_key: 'f9b4dab6b866b487',
        city,
        type
      }
    };

    const { data } = useHttp(config, aIns.muxiaoguo);
    return { data };
  }
};
