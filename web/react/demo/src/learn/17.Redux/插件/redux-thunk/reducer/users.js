import * as usersAction from '../action/usersAction';
import { v4 as uuid } from 'uuid';

const initialState = {
  isLoading: false, // 是否正在加载
  datas: [
    // 用户数据
    { id: uuid(), name: '用户1', age: 16 },
    { id: uuid(), name: '用户2', age: 17 },
    { id: uuid(), name: '用户3', age: 18 },
    { id: uuid(), name: '用户4', age: 19 },
  ],
};

export default function users(state = initialState, { type, payload }) {
  switch (type) {
    case usersAction.ADDUSER:
      return {
        ...state,
        datas: [...state.datas, payload],
      };
    case usersAction.DELETEUSER:
      return {
        ...state,
        datas: state.filter((it) => it.id !== payload),
      };
    case usersAction.UPDATEUSER:
      return {
        ...state,
        datas: state.map((it) => (it.id === payload.id ? { ...it, ...payload } : it)),
      };
    case usersAction.SETUSERS:
      return {
        ...state,
        datas: payload,
      };
    case usersAction.SETLOADING:
      return {
        ...state,
        isLoading: payload,
      };
    default:
      return state;
  }
}
