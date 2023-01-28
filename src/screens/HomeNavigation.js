import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";

import Home from "./Home";
import Product from "./Product";

const HomeStack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <HomeStack.Navigator
      
    >
      <HomeStack.Screen name="Home" component={Home} screenOptions={{
        header: () => null
      }} />
      <HomeStack.Screen name="Product" component={Product} />
    </HomeStack.Navigator>
  )

}

export default HomeNavigation;