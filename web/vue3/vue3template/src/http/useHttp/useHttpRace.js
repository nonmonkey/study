import _useHttpMulti from './_useHttpMulti';
import { _mergeMultiArgs } from './_mergeArgs';

export default function useHttpRace (argsArr, instance, options) {
  return _useHttpMulti(_mergeMultiArgs(argsArr, instance, options), 'race');
}
