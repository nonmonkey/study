import _ from '@/utils';

export const isAxiosInstance = instance => (typeof instance === 'function' && 'request' in instance);

export const mergeConfig = (...args) => _.mergeWith(...args, (obj, src) => { if (Array.isArray(src)) return src; });

const def = Object.defineProperty;
export const defReadonlyProp = (obj, key, value) => def(obj, key, typeof value === 'function' ? { get: value } : { value });
export const defReadonlyProps = (obj, values) => {
  Object.entries(values).forEach(([key, value]) => {
    defReadonlyProp(obj, key, value);
  });
  return obj;
};

export const toEventsArr = fn => _.isFunction(fn) ? [fn] : Array.isArray(fn) ? fn.filter(_.isFunction) : [];
export const runEvents = (events, ...args) => (events || []).forEach(e => e(...args));
