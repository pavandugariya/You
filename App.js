
import React from 'react'
import StackNavigator from './src/Navigator/StackNavigator'
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App