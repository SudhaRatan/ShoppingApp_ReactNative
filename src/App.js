import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
//Screens import
import Home from './screens/Home';
import AccountNavigation from './screens/AccountNavigation';
import Cart from './screens/Cart';
import CartNavigation from './screens/CartNavigation';
import HomeNavigation from './screens/HomeNavigation';
// import Login from './screens/Login';
// import Nav from './components/NavigationBar';

// const Stack = createStackNavigator();
const Main = createBottomTabNavigator();

const App1 = () => {

  const qwe = "";

  return (
    <NavigationContainer>
      <Main.Navigator
        screenOptions={{
          header: () => null,
          tabBarActiveTintColor: '#000000',
        }}
      >
        <Main.Screen name="HomeNavigation" component={HomeNavigation}
          options={{
            tabBarLabel: "Home"
          }}
        />
        <Main.Screen name="CartNavigation" component={CartNavigation} 
          options={{
            tabBarLabel:"Cart"
          }}
        />
        <Main.Screen name="AccountNavigation" component={AccountNavigation} options={{
          tabBarLabel: "Account"
        }} />
      </Main.Navigator>
    </NavigationContainer>
  );
};

export default App1;
