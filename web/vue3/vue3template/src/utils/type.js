export const toTypeString = value => Object.prototype.toString.call(value);

export const isFunction = val => typeof val === 'function';
export const isPlainObject = val => toTypeString(val) === '[object Object]';
