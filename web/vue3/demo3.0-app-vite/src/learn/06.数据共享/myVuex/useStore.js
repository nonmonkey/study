import storeKey from './storeKey';
import { inject } from 'vue';

export default function useStore() {
  return inject(storeKey);
}
