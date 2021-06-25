import {ADD_TO_CART, CLEAR_CART} from '../../constants/actions';

const INITIAL_STATE = {
  cart: [],
};

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: payload,
      };
    case CLEAR_CART:
      return {
        cart: [],
      };
    default:
      return state;
  }
};
