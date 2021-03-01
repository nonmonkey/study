import loginUser from './loginUser';
import { createStore, createLogger } from 'vuex';

export default createStore({
  modules: {
    loginUser,
  },
  // createLogger log工具
  plugins: [createLogger()],
});
