import { createAxiosIns } from '@/http';

const aIns = createAxiosIns();

/** baseURL */
const setBaseURLIns = (baseURLObj = {}) => {
  Object.entries(baseURLObj).forEach(([k, v]) => {
    aIns.set(k, { baseURL: v });
  });
};

export default aIns;
export { setBaseURLIns };
