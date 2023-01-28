import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AddressCard from "../components/AddressCard";
import { API } from "../../config";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

const SelectAddress = ({ route }) => {

  const [auth, setAuth] = useState(null)
  const [userData, setUserData] = useState({})
  const [prods, setProds] = useState(null)
  const [cart, setCart] = useState(false)

  const getUserData = () => {
    axios
      .get(`${API}/account`)
      .then(res => {
        if (res.data.auth && route.params) {
          setUserData(res.data.result)
          // console.log(res.data.result)
          setAuth(true)
          setProds(route.params.prods)
          if (typeof route.params.cart !== 'undefined') {
            // console.log(cart)
            setCart(true)
          }
        } else {
          navigate("Login", {
            msg: "Login to continue"
          })
        }
      })
  }

  useFocusEffect(
    useCallback(() => {
      getUserData()
    }, [])
  )

  return (
    <ScrollView style={{}}>
      {
        userData.addresses ?
          cart ? <AddressCard cart={true} prods={prods} sel={auth} ids={userData} addresses={userData.addresses} />
            : <AddressCard cart={false} prods={prods} sel={auth} ids={userData} addresses={userData.addresses} />
          : <ActivityIndicator size="large" />
      }
    </ScrollView>
  )
}

export default SelectAddress;

const st = StyleSheet.create({
  txt: {
    color: "#000",
    fontSize: 18,
  }
})