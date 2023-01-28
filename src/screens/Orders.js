import { ScrollView, View, Text, Button, StyleSheet,ToastAndroid, ActivityIndicator, Dimensions } from "react-native";
import { API } from "../../config";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useState, useEffect,useCallback } from 'react';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderCard from "../components/orderCard";

const Orders = () => {

	const width = Dimensions.get('window').width
	const [auth, setAuth] = useState(null)
	const [orders, setOrders] = useState(null)

	const navigation = useNavigation()

	const showToast = (msg) => {
		ToastAndroid.show(msg, ToastAndroid.SHORT);
	};

	const getOrders = async () => {
		axios.defaults.headers.get['x-access-token'] = await AsyncStorage.getItem('token')
		axios
			.get(`${API}/account/orders`)
			.then(res => {
				// console.log(res.data)
				if (res.data.auth) {
					setAuth(res.data.auth)
					setOrders(res.data.orders.orders)
				} else {
					showToast('Something went wrong')
					navigation.navigate("Account")
				}
			})
	}

	// useEffect(() => {
	// 	getOrders()
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [])

	useFocusEffect(
		useCallback(()=>{
			getOrders()
		},[])
	)

	return (
		<ScrollView>
			<View style={st.orders}>
				<View style={{
					gap:20,
					padding:20,
					width:width,
				}}>
					{
						auth && orders ? orders.map(order=> {
							return (
									<OrderCard key={order._id}  order={order} style={{
									borderRadius:10,
								}} />
							)
						}) : <ActivityIndicator size="large"/>
					}
				</View>
			</View>
		</ScrollView>
	);
}

export default Orders;

const st = StyleSheet.create({
	orders: {
		flex: 1,
		// justifyContent: "center",
		alignItems: "center",
	},
	txt: {
		color: "#000",
		fontSize: 20,
	}
})