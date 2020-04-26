import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import {StatusBar} from 'react-native';
import Navigator from './components/Navigator';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <Navigator />
    </Provider>
  );
};

export default App;
