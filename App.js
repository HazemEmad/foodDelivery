import React from 'react';
import {Provider} from 'react-redux';

import MainNavigator from './src/navigation';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => (
  
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MainNavigator />
    </PersistGate>
  </Provider>
);

export default App;
