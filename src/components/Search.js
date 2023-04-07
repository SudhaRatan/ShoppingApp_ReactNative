import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, TextInput } from "react-native";
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import { useState } from "react";

const SearchBar = () => {

  const navigation = useNavigation()
  const [search, setSearch] = useState(null)

  const searchProds = () => {
    navigation.navigate('Search', { search })
  }

  return(
    <View
    style={{
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      margin: 10,
      borderRadius: 40,
      elevation: 8,
    }}>
    <Pressable
      android_ripple={{ color: "#808080", borderless: true }}
      style={{
        paddingLeft: 10,
        paddingRight: 5,
      }}
      onPress={searchProds}
    >
      <Fontisto name='search' size={24} color='#000' />
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
        onPress={() => { setSearch(null); navigation.goBack() }}
      >
        <Entypo name='circle-with-cross' size={30} color='#808080' />
      </Pressable>
    }
  </View>
  );
}

export default SearchBar;