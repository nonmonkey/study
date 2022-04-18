import axios from 'axios';
import _ from '@/utils';
import {
  runEvents,
  mergeConfig,
  defReadonlyProps
} from './_utils';
import {
  ref,
  shallowRef,
  computed
} from 'vue';

export default function _useHttp (config, instance, options) {
  const response = shallowRef(null);
  const data = shallowRef(null);
  const error = shallowRef(null);
  const isFinished = ref(false);
  const isLoading = ref(false);
  const isAborted = ref(false);
  const _isDone = () => isFinished.value || isAborted.value || !isLoading.value;
  let _instancePromise = null;
  let _cancel = null;

  // const _config = shallowRef(null);
  // const interceptorsRequestGetConfig = (config) => {
  //   _config.value = config;
  //   return config;
  // };
  // const ejectInterceptorsRequest = (fn) => {
  //   const interceptorId = instance.interceptors.request.handlers.findIndex(handler => handler.fulfilled === fn);
  //   if (interceptorId > -1) {
  //     //  instance.interceptors.request.eject(interceptorId);
  //     instance.interceptors.request.handlers.splice(interceptorId, 1);
  //   }
  // };

  const abort = (message) => {
    if (_isDone()) return;
    _cancel(message);
    isLoading.value = false;
    isFinished.value = false;
    isAborted.value = true;
    runEvents(options.onAbort, message);
  };

  const loading = (value) => {
    isLoading.value = value;
    isFinished.value = !value;
    isAborted.value = false;
    if (value) {
      _instancePromise = null;
      _cancel = null;
    }
  };

  const execute = (cfg = {}) => {
    abort();
    loading(true);

    runEvents(options.onBeforeRun);
    // instance.interceptors.request.use(interceptorsRequestGetConfig)
    const params = mergeConfig(config, cfg);
    _instancePromise = instance({
      ...params,
      cancelToken: new axios.CancelToken(function executor (c) {
        _cancel = c;
      })
    })
      .then((res) => {
        console.log('instance', 'success');
        res.data = options.formatter(res.data);
        response.value = res;
        data.value = res.data;
        error.value = null;
        runEvents(options.onSuccess, res);
        return Promise.resolve(res);
      })
      .catch((err) => {
        console.log('instance', 'catch');
        response.value = null;
        data.value = null;
        error.value = err;
        runEvents(options.onError, err);
        return Promise.reject(err);
      })
      .finally(() => {
        console.log('instance', 'finally');
        loading(false);
        runEvents(options.onFinally);
      });

    // ejectInterceptorsRequest(interceptorsRequestGetConfig);
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
      then: () => function (onFulfilled = _.noop, onRejected = _.noop) {
        return (_instancePromise || execute()).then(onFulfilled, onRejected);
      },
      catch: () => function (onRejected = _.noop) {
        return (_instancePromise || execute()).catch(onRejected);
      }
    }
  );

  if (options.immediate) execute();

  return result;
}
