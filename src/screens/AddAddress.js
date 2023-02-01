import { View, Text, StyleSheet, ScrollView, TextInput, Button, ToastAndroid } from "react-native";
import { useState } from "react";
import countries from "../components/countries";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../../config";
import { useNavigation } from "@react-navigation/native";

const AddAddress = () => {

  const navigation = useNavigation()

  const [post, setPost] = useState({
    fullName: "",
    country: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  })

  const handleChange = (value, name) => {
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
    // console.log(post)
  }

  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const handleClick = async() => {
		axios.defaults.headers.post['x-access-token'] = await AsyncStorage.getItem('token')
    axios
    .post(`${API}/account/address`, post)
    .then((res) => {
        if(res.data.auth){
          navigation.navigate("Account")
        } else{
          showToast(res.data.message)
        }
    })
  }

  return (
    <ScrollView >
      <View style={st.cont}>
        <SelectList
          setSelected={(val) => {
            handleChange(val, "country")
            // setSelected(val)
            // console.log(select)
          }}
          placeholder="Select Country"
          inputStyles={st.txt}
          dropdownTextStyles={st.dropTxt}
          boxStyles={st.boxInp}
          dropdownStyles={{
            borderRadius: 5,
          }}
          data={countries}
          save="value"
        />
        <Text style={[st.txt, { marginTop: 20 }]}>Full name</Text>
        <TextInput
          onChange={(event) => {
            handleChange(event.nativeEvent.text, "fullName")
          }}
          value={post.fullName}
          style={st.inp}
        />
        <Text style={st.txt}>Phone number</Text>
        <TextInput
          onChange={(event) => {
            handleChange(event.nativeEvent.text, "phoneNumber")
          }}
          value={post.phoneNumber}
          style={st.inp}
          keyboardType="number-pad"
        />
        <Text style={st.txt}>Address (can be multiple lines)</Text>
        <TextInput
          onChange={(event) => {
            handleChange(event.nativeEvent.text, "address")
          }}
          multiline={true}
          value={post.address}
          style={st.inp}
        />
        <Text style={st.txt}>City</Text>
        <TextInput
          onChange={(event) => {
            handleChange(event.nativeEvent.text, "city")
          }}
          value={post.city}
          style={st.inp}
        />
        <Text style={st.txt}>State</Text>
        <TextInput
          onChange={(event) => {
            handleChange(event.nativeEvent.text, "state")
          }}
          value={post.state}
          style={st.inp}
        />
        <Text style={st.txt}>Zip code</Text>
        <TextInput
          onChange={(event) => {
            handleChange(event.nativeEvent.text, "zip")
          }}
          value={post.zip}
          style={st.inp}
          keyboardType="number-pad"
        />
        <Button onPress={handleClick} title="Add address" />
      </View>
    </ScrollView>
  )
}

export default AddAddress;

const st = StyleSheet.create({
  txt: {
    color: "black",
    fontSize: 18,
    marginLeft: 4
  },
  inp: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#808080",
    padding: 10,
    color: "#000",
    fontSize: 18,
    marginBottom: 20,
  },
  boxInp: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#808080",
    padding: 10,
    color: "#000",
    fontSize: 18,
    marginTop: 10,
  },
  cont: {
    padding: 10,
    margin: 4,
    backgroundColor: "#fff",
    elevation: 4
  },
  dropTxt: {
    fontSize: 16,
    color: "#808080",
    margin: 0,
    padding: 0,
  }
})