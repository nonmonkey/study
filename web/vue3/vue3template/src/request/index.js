import createHttp from '@/http';
import requestFns from './modules';
import aIns, { setBaseURLIns } from './instances';
import { useConfig } from '@/store';

const http = createHttp(requestFns, aIns);
const httpOriginalInstall = http.install;
http.install = function (app) {
  httpOriginalInstall.call(app, app);
  const baseURLObj = '$pinia' in app.config.globalProperties
    ? useConfig().baseURL
    : (window.static_global_config.baseURL || Object.create(null));
  setBaseURLIns(baseURLObj);
};

export default http;
export { requestFns, aIns };
