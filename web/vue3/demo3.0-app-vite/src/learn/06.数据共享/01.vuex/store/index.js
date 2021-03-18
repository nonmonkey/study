import loginUser from './loginUser';
import { createLogger } from 'vuex';

const options = {
  modules: {
    loginUser,
    app: {
      actions: {
        test({ dispatch }) {
          dispatch('loginUser/whoAmI');
        },
      },
    },
  },
  // createLogger log工具
  plugins: [createLogger()],
};

export default options;
