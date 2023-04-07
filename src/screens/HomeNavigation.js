import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, Pressable, TextInput } from "react-native";
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../components/Search";

import Home from "./Home";
import Product from "./Product";
import Search from "./search";

const HomeStack = createStackNavigator();

const HomeNavigation = () => {

  const navigation = useNavigation()
  const [search, setSearch] = useState(null)

  const searchProds = () => {
    navigation.navigate('Search', { search })
  }

  return (
    <>
      <HomeStack.Navigator
        screenOptions={{
          header: () => null
        }}
      >
        <HomeStack.Screen name="Home" component={Home} />
        {/* <HomeStack.Screen name="Product" component={Product} /> */}
        <HomeStack.Screen name="Search" component={Search} />
      </HomeStack.Navigator>
    </>
  )

}

export default HomeNavigation;