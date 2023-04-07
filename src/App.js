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
import Product from './screens/Product';
import SearchBar from './components/Search';

// Icons
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Main = createBottomTabNavigator();

const MainNav1 = () => {
  const qwe = "";
  return (
    <Main.Navigator
      screenOptions={{
        header: () => null,
        tabBarActiveTintColor: '#000000',
      }}
    >
      <Main.Screen name="HomeNavigation" component={HomeNavigation}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <Entypo name="shop" color={focused ? '#2196f3' : color} size={focused ? size : size * 0.8} />
          ),
        }}
      />
      <Main.Screen name="CartNavigation" component={CartNavigation}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ focused, color, size }) => (
            <Entypo name="shopping-cart" color={focused ? '#2196f3' : color} size={focused ? size : size * 0.8} />
          ),
        }}
      />
      <Main.Screen name="AccountNavigation" component={AccountNavigation}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name="account" color={focused ? '#2196f3' : color} size={focused ? size : size * 0.8} />
          ),
        }} />
    </Main.Navigator>
  );
};

const App1 = () => {
  const MainNav = createStackNavigator()

  return (
    <NavigationContainer>
      <View style={{ backgroundColor: '#fff' }}>
        <SearchBar />
      </View>
      <MainNav.Navigator screenOptions={{
        header: () => null,
      }}>
        <MainNav.Screen name="Main" component={MainNav1} />
        <MainNav.Screen name="Product" component={Product} />
      </MainNav.Navigator>
    </NavigationContainer>
  );
}

export default App1;
