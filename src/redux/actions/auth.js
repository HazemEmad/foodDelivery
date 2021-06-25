import {AUTH_USER_DATA, LOGOUT_USER} from '../../constants/actions';

export const authUserData = data => ({
  type: AUTH_USER_DATA,
  payload: data,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});
