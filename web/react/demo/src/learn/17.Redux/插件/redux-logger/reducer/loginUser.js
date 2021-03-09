import { SETLOGINUSERTYPE } from '../action/loginUserAction';

const initialState = null;

export default function loginUser(state = initialState, { type, payload }) {
  switch (type) {
    case SETLOGINUSERTYPE:
      return payload;
    default:
      return state;
  }
}
