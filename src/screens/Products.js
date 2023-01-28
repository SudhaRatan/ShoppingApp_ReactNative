import React, { useCallback,useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY } from "../../config";

const Products =  ({ navigation }) => {

	const [auth, setAuth] = useState(null)
	const [images, setImages] = useState([])
	const [prods, setProds] = useState([])
const setHeaders = async() => {
	axios.defaults.headers.get['x-access-token'] = await AsyncStorage.getItem('token')
	axios.defaults.headers.post['x-access-token'] = await AsyncStorage.getItem('token')
}
	useFocusEffect(
		useCallback(()=>{
			setHeaders()
			checkLogin()
		}, [])
	)
// console.log(API_KEY)
	const checkLogin = async() => {
		axios
			.get(`${API_KEY}/sell/products`)
			.then(async (res) => {
				try {
					// console.log(res.data)
					if (res.data.auth) {
						setAuth(res.data.message)
						setProds(res.data.prods)
						setImages(res.data.images)
					}
					else {
						await AsyncStorage.removeItem('token')
						navigation.navigate("Login")
					}
				} catch (error) {
					setAuth("error")
					console.log(error)
				}
			}).catch (function (e){
				console.log(e)
			})
	}

	return (
		<View style={st.products}>
			<Text style={st.txt}>Products Screen</Text>
		</View>
	);
}

export default Products;

const st = StyleSheet.create({
	products: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	txt: {
		color: "#000",
		fontSize: 20,
	}
})