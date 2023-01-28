import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Orders from "./Orders";
import Account from "./Account";
import Products from "./Products";
import Login from "./Login";
import AddAddress from "./AddAddress";

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
					<View style={{
						margin: 5,
					}}>
						<Button onPress={logout} title="Logout" color="#202124" />
					</View>
				)
			}} name="Account" component={Account} />
			<AccountStack.Screen options={{
				title: "Your Orders",
			}} name="Orders" component={Orders} />
			<AccountStack.Screen name="Products" component={Products} />
			<AccountStack.Screen name="Login" component={Login} />
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