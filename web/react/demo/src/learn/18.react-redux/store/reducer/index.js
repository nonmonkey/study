// 创建唯一的reducer
import { combineReducers } from 'redux';
import counter from './counter';

export default combineReducers({
  counter,
});
