import _useHttpRetry from './_useHttpRetry';
import {
  _mergeOutermostArgs,
  _mergeIntervalOptions,
  _mergeRetryOptions
} from './_mergeArgs';

export default function useHttpRetry (config, instance, options) {
  const args = _mergeOutermostArgs(config, instance, options);
  config = args[0];
  instance = args[1];
  options = _mergeIntervalOptions(_mergeRetryOptions(args[2]));

  return _useHttpRetry.call(null, config, instance, options);
}
