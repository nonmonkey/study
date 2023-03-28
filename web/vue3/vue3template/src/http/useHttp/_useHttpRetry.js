import _ from '@/utils';
import { defReadonlyProps } from './_utils';
import {
  ref,
  computed
} from 'vue';
import _useHttpInterval from './_useHttpInterval';
import { retryFinishFnSymbol } from './_mergeArgs';

function _useHttpRetry (config, instance, options) {
  const isFinished = ref(false);
  let _instancePromise = null;

  const {
    executeInterval,
    stop,
    ...intervalResult
  } = _useHttpInterval(config, instance, options);

  const execute = (cfg) => {
    isFinished.value = false;
    executeInterval(cfg);

    _instancePromise = new Promise((resolve) => {
      options[retryFinishFnSymbol] = (res) => {
        stop();
        isFinished.value = true;
        resolve(res);
      };
    });

    return _instancePromise;
  };

  const result = {
    response: intervalResult.response,
    data: intervalResult.data,
    error: intervalResult.error,
    isLoading: intervalResult.isLoading,
    isRunning: intervalResult.isRunning,
    isFinished: computed(() => isFinished.value),

    stop,
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

  if (options.retryImmediate) execute();

  return result;
}

export default _useHttpRetry;
