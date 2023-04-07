import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from 'react-native-vector-icons/Entypo'
import { API } from "../../config";

import Orders from "./Orders";
import Account from "./Account";
import Products from "./Products";
import Login from "./Login";
import AddAddress from "./AddAddress";
import Signup from "./signup";
import axios from "axios";

const AccountStack = createStackNavigator();

const AccountNavigation = () => {

	const navigation = useNavigation()

	const logout = async () => {
		await AsyncStorage.removeItem('token')
		navigation.navigate("Home")
	}

	return (
		<AccountStack.Navigator	>
			<AccountStack.Screen options={{
				title: "Your account",
				headerRight: () => (
					<Pressable style={{
						padding: 10,
						flexDirection: "row",
						alignItems: "center",
					}}
						android_ripple={{ color: '#808080' }}
						onPress={logout}
					>
						<Entypo name="login" size={20} color="#000" />
						<Text style={{
							color: "#000",
							margin: 5,
							fontSize: 18,
						}}>Logout</Text>
					</Pressable>
				)
			}} name="Account" component={Account} />
			<AccountStack.Screen options={{
				title: "Your Orders",
				headerRight: () => (
					<View style={{
						backgroundColor: '#666fff',
						margin: 10,
						borderRadius: 10,
						justifyContent: 'center',
						width: 120,
						height: 40,
						alignItems: 'center',
					}}>
						<Pressable style={{
							backgroundColor: '#666fff',
							justifyContent: 'center',
							width: 120,
							height: 40,
							alignItems: 'center',
						}}
							android_ripple={{ color: '#660ff6', borderless: true }}
							onPress={async () => {
								axios.defaults.headers.delete['x-access-token'] = await AsyncStorage.getItem('token')
								axios
									.delete(`${API}/account/orders`)
									.then(res => {
										console.log(res.data)
										if (res.data.auth) {
											navigation.navigate('Account')
										}
									})
							}}
						>
							<Text style={{
								color: '#000',
								fontSize: 18
							}}>Clear orders</Text>
						</Pressable>
					</View>
				)
			}} name="Orders" component={Orders} />
			<AccountStack.Screen name="Products" component={Products} />
			<AccountStack.Screen name="Login" component={Login} />
			<AccountStack.Screen name="Signup" component={Signup} />
			<AccountStack.Screen options={{
				title: "Add an address"
			}} name="AddAddress" component={AddAddress} />
		</AccountStack.Navigator>
	);
}

export default AccountNavigation;

const st = StyleSheet.create({
	account: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	txt: {
		color: "#000",
		fontSize: 20,
	}
})