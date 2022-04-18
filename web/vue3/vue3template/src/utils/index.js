import * as isType from './type';
import * as lodash from './lodash';

const noop = () => {};
const identity = v => v;

const _ = {
  noop,
  identity,
  ...isType,
  ...lodash
};

window._ = _;
export default _;
