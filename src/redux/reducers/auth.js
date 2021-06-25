import {LOGOUT_USER, AUTH_USER_DATA} from '../../constants/actions';

const INITIAL_STATE = {
  user: {},
};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case AUTH_USER_DATA:
      return {
        ...state,
        user: payload,
      };
    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
