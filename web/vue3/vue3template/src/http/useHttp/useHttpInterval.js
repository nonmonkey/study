import _useHttpInterval from './_useHttpInterval';
import { _mergeOutermostArgs } from './_mergeArgs';

export default function useHttpInterval (config, instance, options) {
  return _useHttpInterval.apply(null, _mergeOutermostArgs(config, instance, options));
}
