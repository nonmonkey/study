'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));
var rxjs = require('rxjs');

var HttpMethod;

(function (HttpMethod) {
  HttpMethod["GET"] = "GET";
  HttpMethod["POST"] = "POST";
  HttpMethod["PUT"] = "PUT";
  HttpMethod["PATCH"] = "PATCH";
  HttpMethod["DELETE"] = "DELETE";
})(HttpMethod || (HttpMethod = {}));

var Rxios = /*#__PURE__*/function () {
  function Rxios(options) {
    if (options === void 0) {
      options = {};
    }

    this._httpClient = axios.create(options);
  }

  var _proto = Rxios.prototype;

  _proto._doReq = function _doReq(args) {
    var method = args.method,
        url = args.url,
        queryParams = args.queryParams,
        payload = args.payload;
    var request;

    switch (method) {
      case HttpMethod.GET:
        request = this._httpClient.get(url, {
          params: queryParams
        });
        break;

      case HttpMethod.POST:
        request = this._httpClient.post(url, payload);
        break;

      case HttpMethod.PUT:
        request = this._httpClient.put(url, payload);
        break;

      case HttpMethod.PATCH:
        request = this._httpClient.patch(url, payload);
        break;

      case HttpMethod.DELETE:
        request = this._httpClient["delete"](url);
        break;
      // default:
      //   throw new Error('Method not supported');
    }

    return new rxjs.Observable(function (subscriber) {
      request.then(function (response) {
        subscriber.next(response.data);
      })["catch"](function (err) {
        subscriber.error(err);
      })["finally"](function () {
        subscriber.complete();
      });
    });
  };

  _proto.get = function get(url, queryParams) {
    return this._doReq({
      method: HttpMethod.GET,
      url: url,
      queryParams: queryParams
    });
  };

  _proto.post = function post(url, payload) {
    return this._doReq({
      method: HttpMethod.POST,
      url: url,
      payload: payload
    });
  };

  _proto.put = function put(url, payload) {
    return this._doReq({
      method: HttpMethod.PUT,
      url: url,
      payload: payload
    });
  };

  _proto.patch = function patch(url, payload) {
    return this._doReq({
      method: HttpMethod.PATCH,
      url: url,
      payload: payload
    });
  };

  _proto["delete"] = function _delete(url) {
    return this._doReq({
      method: HttpMethod.DELETE,
      url: url
    });
  };

  return Rxios;
}();
var rxios = /*#__PURE__*/new Rxios();

exports.Rxios = Rxios;
exports.rxios = rxios;
//# sourceMappingURL=rxios.cjs.development.js.map
