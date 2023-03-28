import axios from 'axios';
import {
  setDefaults,
  setInterceptors
} from './config';
import {
  useHttp,
  useHttpInterval,
  useHttpAll,
  useHttpAny,
  useHttpRace,
  useHttpRetry
} from './useHttp';
import createAxiosIns from './createAxiosIns';

function HttpCtor (requestFns, aIns) {
  this.requestFns = requestFns;
  this.aIns = aIns;

  setDefaults(axios);
  setInterceptors(axios);
}
HttpCtor.prototype.install = function install (app) {
  app.config.globalProperties.$http = useHttp;
};

HttpCtor.prototype.axios = axios;
HttpCtor.prototype.http = useHttp;
HttpCtor.prototype.useHttp = useHttp;
HttpCtor.prototype.useHttpInterval = useHttpInterval;
HttpCtor.prototype.useHttpAll = useHttpAll;
HttpCtor.prototype.useHttpAny = useHttpAny;
HttpCtor.prototype.useHttpRace = useHttpRace;
HttpCtor.prototype.useHttpRetry = useHttpRetry;

function createHttp (requestFns, aIns) {
  return new HttpCtor(requestFns, aIns);
}

export default createHttp;
export {
  axios,
  createAxiosIns,

  useHttp,
  useHttpInterval,
  useHttpAll,
  useHttpAny,
  useHttpRace,
  useHttpRetry
};
