import axios from 'axios';
import _ from '@/utils';
import { isAxiosInstance } from './useHttp/_utils';
import { setInterceptors } from './config';

function createAxiosInstance (instance, config) {
  const newIns = (isAxiosInstance(instance) ? instance : axios).create(config);
  setInterceptors(newIns); // 拦截器不能被create继承，只能重新赋值
  return newIns;
}

function AxiosInstances () {
  this._map = Object.create(null);
  const prototypeKeys = Object.getOwnPropertyNames(AxiosInstances.prototype);
  this._blackKeyList = ['_map', '_blackKeyList'].concat(prototypeKeys);
}

AxiosInstances.prototype.set = function (key, config, ins) {
  if (this.isForbiddenKey(key)) throw new Error(`[AxiosInstances]: The key ${key} is in blacklist, cannot be used.`);
  if (!key || typeof key !== 'string' || !config || !_.isPlainObject(config)) return;
  if (this.has(key)) return this.get(key);

  const newIns = createAxiosInstance(ins, config);
  this._map[key] = newIns;
  return newIns;
};

AxiosInstances.prototype.has = function (key) {
  return key in this._map;
};

AxiosInstances.prototype.get = function (key) {
  return this._map[key];
};

AxiosInstances.prototype.getMap = function () {
  return this._map;
};

AxiosInstances.prototype.isForbiddenKey = function (key) {
  return this._blackKeyList.includes(key);
};

function createAxiosIns () {
  const aIns = new AxiosInstances();
  const aInsProxy = new Proxy(aIns, {
    get (target, prop, receiver) {
      if (!target.isForbiddenKey(prop) && target.has(prop)) {
        return target.get(prop);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
  return aInsProxy;
}

export default createAxiosIns;
