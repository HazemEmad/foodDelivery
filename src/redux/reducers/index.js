import {combineReducers} from 'redux';
import auth from './auth';
import cart from './cart';
// Redux: Root Reducer
const rootReducer = combineReducers({auth: auth, cart: cart});

export default rootReducer;
