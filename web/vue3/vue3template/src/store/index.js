import { createPinia } from 'pinia';
import useConfig from './config';

const store = createPinia();
const storeOriginalInstall = store.install;
store.install = function install (app) {
  storeOriginalInstall.call(app, app);
  useConfig().setConfig();
};

window.store = store;
window.useConfig = useConfig;

export default store;
export { useConfig };
