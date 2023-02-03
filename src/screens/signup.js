import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Button, StyleSheet, TextInput, Alert, Dimensions, Pressable, ScrollView } from "react-native";
import axios from "axios";
import { API } from "../../config";
import LoadingAnim from "../components/loadingAnimModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
  const width = Dimensions.get('window').width
  const navigation = useNavigation()
  const [name, setName] = useState(null)
  const [number, setNumber] = useState(null)
  const [password, setPassword] = useState(null)
  const [anim, setAnim] = useState(null)
  const [authStat, setAuthStat] = useState(null)
  const [token, setToken] = useState(null)

  const checkLogin = async () => {
    setToken(await AsyncStorage.getItem('token'))
    if (token) {
      navigation.navigate("Account")
    } else {
      setAuthStat(route.params.msg)
    }
  }

  const Signup = async () => {
    if (number != null && number != "" && password != null && password != "" && name != null && name != "") {
      setAnim(true)
      axios
        .post(`${API}/login/signup`, { name, number, password })
        .then((res) => {
          if (res.data.status) {
            navigation.navigate("Login", {
              msg: "Login to continue",
            })
          } else {
            setAuthStat(res.data.error)
            setAnim(false)
          }
        })
    } else {
      Alert.alert("Enter all details")
    }
  }

  const st = StyleSheet.create({
    login: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ecf0f1",
      width: width,
    },
    txt: {
      color: "#000",
      fontSize: 18,
    },
    h1: {
      color: "#000",
      fontSize: 28,
      fontWeight: 600,
      margin: 10,
      textAlign: "center",
    },
    form: {
      flex: 1,
      flexDirection: "column",
      padding: 20,
      width: width,
      backgroundColor: "#fff",
      elevation: 8,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    inp: {
      borderBottomWidth: 1,
      borderColor: "#808080",
      // width: "100%",
      fontSize: 20,
      color: "#00000f",
      margin: 10,
    },
    btn: {
      marginTop: 20,
    },
    btn1: {
      marginTop: 20,
    },
    txt1: {
      color: "#000",
      fontSize: 18,
      color: "#215fff",
      textDecorationLine: "underline",
    }

  })

  return (
    <View style={{
      backgroundColor: '#ecf0f1',
      flex: 1,
    }}>
      <View style={st.login}><LoadingAnim visible={anim} transparent={true} />
        <Text style={st.h1}>Enter Details</Text>
        <View style={st.form}>
          {
            authStat && (
              <View>
                <Text style={{ color: "red", fontSize: 20 }}>{authStat}</Text>
              </View>
            )
          }
          <TextInput
            onChangeText={(value) => setName(value)}
            style={st.inp}
            placeholder="Enter Name"
            placeholderTextColor="#808080"
          />
          <TextInput
            keyboardType="numeric"
            onChangeText={(value) => setNumber(value)}
            style={st.inp}
            placeholder="Enter Number"
            placeholderTextColor="#808080"
          />
          <TextInput
            onChangeText={(value) => setPassword(value)}
            style={st.inp}
            placeholder="Enter Password"
            placeholderTextColor="#808080"
            secureTextEntry
          />
          <View style={st.btn}>
            <Button onPress={Signup} title="Register" />
          </View>
          <View style={{
            flexDirection: "row",
            textAlign: "center"
          }}>
            <View style={st.btn1}>
              <Text style={st.txt}>
                Existing user?
              </Text>
            </View>
            <Pressable style={st.btn1} onPress={() => { navigation.navigate('Login') }}>
              <Text style={st.txt1}> Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Signup;