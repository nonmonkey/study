import _useHttpMulti from './_useHttpMulti';
import { _mergeMultiArgs } from './_mergeArgs';

export default function useHttpAll (argsArr, instance, options) {
  return _useHttpMulti(_mergeMultiArgs(argsArr, instance, options), 'all');
}
