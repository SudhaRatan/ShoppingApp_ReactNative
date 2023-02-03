import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Button, StyleSheet, TextInput, Alert, Dimensions, Pressable, ScrollView } from "react-native";
import axios from "axios";
import { API } from "../../config";
import LoadingAnim from "../components/loadingAnimModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";


const Login = ({ route }) => {

	const width = Dimensions.get('window').width
	const height = Dimensions.get('window').height
	const navigation = useNavigation()
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

	const login = async () => {

		if (number != null && number != "" && password != null && password != "") {
			setAnim(true)
			axios
				.post(`${API}/login`, { number, password })
				.then(async (result) => {
					if (result.data.auth) {
						setAnim(true)
						await AsyncStorage.setItem('token', result.data.token)
						navigation.goBack()
					} else {
						setAnim(false)
						setAuthStat(result.data)
					}
				})

		} else {
			Alert.alert("Enter login details")
		}
	}

	useEffect(() => {
		checkLogin()
	}, [token])

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
				<Text style={st.h1}>Welcome back</Text>
				<View style={st.form}>
					{
						authStat && (
							<View>
								<Text style={{ color: "red", fontSize: 20 }}>{authStat}</Text>
							</View>
						)
					}
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
						<Button onPress={login} title="Login" />
					</View>
					<View style={{
						flexDirection: "row",
						textAlign: "center"
					}}>
						<View style={st.btn1}>
							<Text style={st.txt}>
								New user?
							</Text>
						</View>
						<Pressable style={st.btn1} onPress={()=>{navigation.navigate('Signup')}}>
							<Text style={st.txt1}> Signup</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</View>
	);
}

export default Login;

