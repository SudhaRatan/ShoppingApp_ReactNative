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

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="shop" color={color} size={size} />
            ),
          }}
        />
        <Main.Screen name="CartNavigation" component={CartNavigation}
          options={{
            tabBarLabel: "Cart",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="shopping-cart" color={color} size={size} />
            ),
          }}
        />
        <Main.Screen name="AccountNavigation" component={AccountNavigation}
          options={{
            tabBarLabel: "Account",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }} />
      </Main.Navigator>
    </NavigationContainer>
  );
};

export default App1;
