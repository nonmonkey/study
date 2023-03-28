import _useHttpInterval from './_useHttpInterval';
import {
  _mergeOutermostArgs,
  _mergeIntervalOptions
} from './_mergeArgs';

export default function useHttpInterval (config, instance, options) {
  const args = _mergeOutermostArgs(config, instance, options);
  config = args[0];
  instance = args[1];
  options = _mergeIntervalOptions(args[2]);

  return _useHttpInterval.call(null, config, instance, options);
}
