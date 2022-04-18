import _ from '@/utils';
import _useHttp from './_useHttp';
import { defReadonlyProps } from './_utils';
import {
  ref,
  shallowRef,
  computed
} from 'vue';

export default function _useHttpMulti (argsArr, type = 'race') {
  type = ['race', 'any', 'all'].includes(type) ? type : 'race';
  const results = argsArr.map(arg => _useHttp.apply(null, arg));
  const response = shallowRef(null);
  const data = shallowRef(null);
  const error = shallowRef(null);
  const isFinished = ref(false);
  const isLoading = ref(false);
  const isAborted = ref(false);
  const _isDone = () => isFinished.value || isAborted.value || !isLoading.value;
  let _instancePromise = null;

  const _cancelAll = (msg) => {
    results.forEach(rst => rst.abort(msg));
  };

  const abort = (message) => {
    if (_isDone()) return;
    _cancelAll(message);
    isLoading.value = false;
    isFinished.value = false;
    isAborted.value = true;
  };

  const loading = (value) => {
    isLoading.value = value;
    isFinished.value = !value;
    isAborted.value = false;
    if (value) {
      _instancePromise = null;
    }
  };

  const execute = (cfg = {}) => {
    abort();
    loading(true);

    const instanceArr = results.map(rst => rst.execute(cfg));
    if (instanceArr.length) {
      _instancePromise = Promise[type](instanceArr)
        .then((res) => {
          console.log(type, 'success', res);
          response.value = res;
          data.value = type === 'all' ? res : res.data;
          error.value = null;
          return Promise.resolve(res);
        })
        .catch((err) => {
          console.log(type, 'catch');
          response.value = null;
          data.value = null;
          error.value = err;
          return Promise.reject(err);
        })
        .finally(() => {
          console.log(type, 'finally');
          abort();
          loading(false);
        });
    } else {
      _instancePromise = Promise.resolve();
      loading(false);
    }

    return _instancePromise;
  };

  const result = {
    response,
    data,
    error,
    isFinished: computed(() => isFinished.value),
    isLoading: computed(() => isLoading.value),
    isAborted: computed(() => isAborted.value),

    abort,
    execute
  };
  defReadonlyProps(
    result,
    {
      type,
      then: () => function (onFulfilled = _.noop, onRejected = _.noop) {
        return (_instancePromise || execute()).then(onFulfilled, onRejected);
      },
      catch: () => function (onRejected = _.noop) {
        return (_instancePromise || execute()).catch(onRejected);
      }
    }
  );

  execute();

  return result;
}
