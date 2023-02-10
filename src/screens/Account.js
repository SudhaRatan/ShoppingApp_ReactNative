import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Button, StyleSheet, ScrollView, Dimensions, ActivityIndicator, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { API } from "../../config";
import AccountCard from "../components/AccountCard";
import AddressCard from "../components/AddressCard";
import MyButton from "../components/Button";

const Account = () => {

	const height = Dimensions.get('window').height;
	const navigation = useNavigation()
	const [auth, setAuth] = useState(null)
	const [userData, setUserData] = useState(null)
	const [refreshing, setRefreshing] = useState(false)

	useEffect(() => {
		getUserData()
	}, [])

	useFocusEffect(
		useCallback(() => {
			getUserData()
		}, [])
	)

	const getUserData = async () => {
		axios.defaults.headers.get['x-access-token'] = await AsyncStorage.getItem('token')
		axios
			.get(`${API}/account`)
			.then(res => {
				if (res.data.auth) {
					setUserData(res.data.result)
					setAuth(true)
					setRefreshing(false)
					// console.log(res.data)
				} else {
					setAuth(false)
					navigation.navigate("Login", {
						msg: "Login to continue "
					})
				}
			})
	}

	const logout = async () => {
		await AsyncStorage.removeItem('token')
		fetchToken()
	}

	const onRefresh = () => {
		// setRefreshing(true)
		getUserData()
	}

	return (
		<ScrollView style={{
			height: height,
			backgroundColor: "#ecf0f1",
		}}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			{
				auth ?
					<View style={{
					}}>
						<View style={st.h1_cont}>
							<Text style={st.h1}>Details</Text>
						</View>
						<AccountCard name={userData.name} phone={userData.phone} />
						<View style={{
							flex: 1,
							backgroundColor: "#ffffff00",
							alignItems: "center",
							elevation: 10,
							margin: 10,
						}}>
							<MyButton
								fontSize={24}
								height={60}
								color="#fff"
								title="Your Orders"
								onPress={() => navigation.navigate('Orders')}
							/>
						</View>
						<View style={st.h1_cont}>
							<Text style={st.h1}>Your addresses</Text>
						</View>
						<AddressCard ids={userData} addresses={userData.addresses} />
					</View>
					: <View>
						<ActivityIndicator size="large" />
					</View>
			}
		</ScrollView>
	);
}

export default Account;

const st = StyleSheet.create({
	cart: {
		flex: 1,
		// justifyContent: "center",
		// alignItems: "center",
	},
	txt: {
		color: "#000",
		fontSize: 20,
	},
	btn: {
		margin: 10,
	},
	h1: {
		color: "black",
		fontSize: 24,
		fontWeight: 600,
	},
	h1_cont: {
		flex: 1,
		alignItems: "center",
		color: "black"
	},
})