
import React from 'react'
import StackNavigator from './src/Navigator/StackNavigator'
import { Provider } from 'react-redux';
import store from './src/Redux/store';
import { NavigationContainer } from '@react-navigation/native';
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import NetDisconnect from './src/components/NetConnection/NetDisconnect';

const App = () => {
  const net = useNetInfo();
  // console.log(net.isConnected);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App