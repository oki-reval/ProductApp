import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import AppNavigators from './src/navigation/AppNavigators';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigators />
    </Provider>
  );
}
