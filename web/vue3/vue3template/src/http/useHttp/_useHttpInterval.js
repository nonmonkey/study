import {
  ref,
  shallowRef,
  computed
} from 'vue';
import _useHttp from './_useHttp';
import { _mergeIntervalOptions } from './_mergeArgs';
import { defReadonlyProps } from './_utils';

export default function _useHttpInterval (config, instance, options) {
  options = _mergeIntervalOptions(options);
  const record = options.record;
  const { execute, abort, ...otherResult } = _useHttp(config, instance, options);
  const isRunning = ref(false);
  const lastSuccessData = shallowRef(null);
  options.onSuccess.push((res) => { lastSuccessData.value = res.data; });
  let _cfg = null;
  let _timer = null;

  const stop = (msg) => {
    if (!_timer) return;

    clearInterval(_timer);
    _timer = null;
    isRunning.value = false;
    abort(msg);
  };

  const _shouldStop = () => record._isDone();

  const _executeInterval = () => {
    stop();
    _timer = setInterval(() => {
      if (_shouldStop()) return stop();
      execute(_cfg);
    }, options.interval);
    isRunning.value = true;
  };

  const executeInterval = (cfg = {}) => {
    _cfg = cfg;
    record.reset();
    _executeInterval();
    execute(_cfg);
  };

  const recordResult = {
    _isDone: record._isDone.bind(record),
    showRecord: record.showRecord.bind(record)
  };
  defReadonlyProps(
    recordResult,
    {
      max: () => record.max,
      total: () => record.total,
      successNum: () => record.successNum,
      errorNum: () => record.errorNum,
      abortNum: () => record.abortNum
    }
  );
  const result = {
    response: otherResult.response,
    data: otherResult.data,
    lastSuccessData,
    error: otherResult.error,
    isLoading: otherResult.isLoading,
    isRunning: computed(() => isRunning.value),
    record: recordResult,

    executeInterval,
    stop
  };

  if (options.immediate) _executeInterval();

  return result;
}
