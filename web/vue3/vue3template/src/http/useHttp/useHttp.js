import _useHttp from './_useHttp';
import { _mergeOutermostArgs } from './_mergeArgs';

export default function useHttp (config, instance, options) {
  return _useHttp.apply(null, _mergeOutermostArgs(config, instance, options));
}
