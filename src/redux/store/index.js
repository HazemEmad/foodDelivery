import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducer from '../reducers/index';

// TODO: Add company account reducer in whitelist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'cart'],
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);
export {store, persistor};
