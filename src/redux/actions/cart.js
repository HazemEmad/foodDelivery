import {ADD_TO_CART, CLEAR_CART} from '../../constants/actions';

export const addToCart = data => ({
  type: ADD_TO_CART,
  payload: data,
});
export const clearCart = () => ({
  type: CLEAR_CART,
});
