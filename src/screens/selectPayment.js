import { View, Text, StyleSheet, Pressable, Button, ToastAndroid } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { API } from "../../config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SelectPayment = ({route}) => {

  const navigation = useNavigation()

  const [card, setCard] = useState(false)
  const [cod, setCod] = useState(false)
  const [upi, setUpi] = useState(false)
  const [method, setMethod] = useState(null)

  const click = (value) => {
    setMethod(value)
    if (value === "card") {
      setCard(true)
      setUpi(false)
      setCod(false)
    }
    else if (value === "cod") {
      setCard(false)
      setUpi(false)
      setCod(true)
    } else if (value === "upi") {
      setCard(false)
      setUpi(true)
      setCod(false)
    }
  }

  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const placeOrder = async () => {
    axios.defaults.headers.post['x-access-token'] = await AsyncStorage.getItem('token')
    if (method) {
      axios
        .post(`${API}/account/buy`, { info: route.params, method })
        .then(res => {
          // console.log(res)
          if (res.data.auth) {
            showToast("Order placed successfully")
            navigation.navigate('Cart')
            navigation.navigate('Home')
          } else {
            showToast(res.data.message)
          }
        })
    } else {
      showToast("Please select an option")
    }
  }

  return (
    <ScrollView style={{
    }}>
      <View style={{
        alignItems: "center",
        padding: 10,
        flex: 1,
        flexDirection: "column",
        margin: 20,
        backgroundColor: "#fff",
        elevation: 2,
        borderRadius: 10,
      }}>
        <Pressable onPress={() => click("card")} android_ripple={{ color: "#ddd" }} style={card ? st.pay1 : st.pay}>
          <Text style={st.txt}>Debit/Credit card</Text>
        </Pressable>
        <Pressable onPress={() => click("cod")} android_ripple={{ color: "#ddd" }} style={cod ? st.pay1 : st.pay}>
          <Text style={st.txt}>Cash on delivery</Text>
        </Pressable>
        <Pressable onPress={() => click("upi")} android_ripple={{ color: "#ddd" }} style={upi ? st.pay1 : st.pay}>
          <Text style={st.txt}>UPI</Text>
        </Pressable>
      </View>
      <View style={{
        marginLeft: 20,
        marginRight: 20,
      }}>
        <Button onPress={placeOrder} color="#3c3c3c" title="Place order" />
      </View>
    </ScrollView>
  )
}

export default SelectPayment;

const st = StyleSheet.create({
  txt: {
    color: "#000",
    fontSize: 20,
    padding: 10,
    margin: 10,
  },
  pay: {
    backgroundColor: "#bbbbbb",
    flex: 1,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    elevation: 4,
  },
  pay1: {
    backgroundColor: "#fff",
    flex: 1,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    elevation: 4,
  }
})