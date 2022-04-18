import axios from 'axios';
import _ from '@/utils';
import {
  isAxiosInstance,
  toEventsArr
} from './_utils';

function _mergeOutermostArgs (config, instance, options) {
  config = typeof config === 'string'
    ? { url: config }
    : _.isPlainObject(config)
      ? config
      : Object.create(null);

  options = _.isPlainObject(instance)
    ? instance
    : _.isPlainObject(options)
      ? options
      : Object.create(null);
  options.immediate = 'immediate' in options ? !!options.immediate : true;
  options.onBeforeRun = toEventsArr(options.onBeforeRun);
  options.onSuccess = toEventsArr(options.onSuccess);
  options.onError = toEventsArr(options.onError);
  options.onAbort = toEventsArr(options.onAbort);
  options.onFinally = toEventsArr(options.onFinally);
  options.formatter = _.isFunction(options.formatter) ? options.formatter : _.identity;

  instance = isAxiosInstance(instance) ? instance : axios;

  return [config, instance, options];
}

const IntervalRecord = function (max) {
  this.max = Math.abs(Number.parseInt(max)) || 20;
  this.total = 0;
  this.successNum = 0;
  this.errorNum = 0;
  this.abortNum = 0;
};
IntervalRecord.prototype._isDone = function () {
  return this.total >= this.max;
};
IntervalRecord.prototype.showRecord = function () {
  return `max: ${this.max};total: ${this.total};successNum: ${this.successNum};errorNum: ${this.errorNum};abortNum: ${this.abortNum}.`;
};
IntervalRecord.prototype.run = function () {
  if (this._isDone()) return this.total;
  return ++this.total;
};
IntervalRecord.prototype.success = function () {
  if (this._isDone()) return;
  return ++this.successNum;
};
IntervalRecord.prototype.error = function () {
  if (this._isDone()) return;
  return ++this.errorNum;
};
IntervalRecord.prototype.abort = function () {
  if (this._isDone()) return;
  return ++this.abortNum;
};
IntervalRecord.prototype.reset = function () {
  this.total = 0;
  this.successNum = 0;
  this.errorNum = 0;
  this.abortNum = 0;
};

function _mergeIntervalOptions (options) {
  options.interval = Number.parseInt(options.interval) || 10000;
  options.max = Number.parseInt(options.max) || 360;

  const record = new IntervalRecord(options.max);
  options.record = record;
  options.onBeforeRun.push(record.run.bind(record));
  options.onSuccess.push(record.success.bind(record));
  options.onError.push(record.error.bind(record));
  options.onAbort.push(record.abort.bind(record));

  return options;
}

function _mergeMultiArgs (argsArr, instance, options) {
  argsArr = Array.isArray(argsArr) ? argsArr : [argsArr];
  let _ins = null;
  let _opts = null;
  if (instance || options) {
    const _arg = _mergeOutermostArgs.call(null, null, instance, options);
    _ins = _arg[1];
    _opts = _arg[2];
  }
  const isPublicArgs = !!(_ins && _opts);

  const resultArgs = argsArr
    .map((it) => {
      let arg;
      if (isPublicArgs) {
        arg = _mergeOutermostArgs.call(null, it, _ins, _opts);
      } else {
        if (Array.isArray(it)) {
          arg = _mergeOutermostArgs.apply(null, it);
        } else if (_.isPlainObject(it)) {
          arg = _mergeOutermostArgs.call(null, it.config || it, it.instance, it.options);
        } else if (typeof it === 'string') {
          arg = _mergeOutermostArgs.call(null, it);
        }
      }

      if (arg) arg[2].immediate = false; // options.immediate
      return arg;
    })
    .filter(a => !!a);

  return resultArgs;
}


export {
  _mergeOutermostArgs,
  _mergeIntervalOptions,
  _mergeMultiArgs
};
