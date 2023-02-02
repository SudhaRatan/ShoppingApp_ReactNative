import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, Pressable, TextInput } from "react-native";
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          margin: 10,
          borderRadius: 40,
          elevation: 8
        }}>
        <Pressable
          android_ripple={{ color: "#808080", borderless: true }}
          style={{
            paddingLeft: 10,
            paddingRight: 5,
          }}
          onPress={searchProds}
        >
          <Fontisto name='search' size={30} color='#000' />
        </Pressable>
        <TextInput
          style={{
            flex: 1,
            color: "#202124",
            fontSize: 16,
          }}
          placeholder="Search Products"
          placeholderTextColor='#808080'
          value={search}
          onChangeText={(value) => setSearch(value)}
          onSubmitEditing={searchProds}
        />
        {
          search &&
          <Pressable style={{
            padding: 10,
          }}
            android_ripple={{ color: "#202124", borderless: true }}
            onPress={() => { setSearch(null); navigation.navigate('Home') }}
          >
            <Entypo name='circle-with-cross' size={30} color='#808080' />
          </Pressable>
        }

      </View>
      <HomeStack.Navigator
        screenOptions={{
          header: () => null
        }}
      >
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="Product" component={Product} />
        <HomeStack.Screen name="Search" component={Search} />
      </HomeStack.Navigator>
    </>
  )

}

export default HomeNavigation;