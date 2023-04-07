import { useCallback, useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProdCard from "../components/productCard";
import LoadingAnim from "../components/loadingAnimModal";
import ProdCardB from "../components/productCardB";
import { MotiView } from 'moti'
import MyButton from "../components/Button";

const Cart = () => {

	const navigation = useNavigation()

	const [cart, setCart] = useState(null)
	const [prods, setProds] = useState(null)
	const [load, setLoad] = useState(null)
	const [refreshing, setRefreshing] = useState(false)
	const [total, setTotal] = useState(0)

	useEffect(() => {
		getCart()
	}, [])

	useFocusEffect(
		useCallback(() => {
			getCart()
		}, [])
	)

	const onRefresh = () => {
		setRefreshing(true)
		getCart()
	}

	const calculateTotal = (products) => {
		// setTotal(0)
		let sum = 0
		for (let i = 0; i < products.length; i++) {
			sum = sum + products[i].price
		} setTotal(sum)
	}
	// console.log(cart)
	const getCart = async () => {
		setCart(null)
		axios.defaults.headers.get['x-access-token'] = await AsyncStorage.getItem('token')
		axios
			.get(`${API}/cart`)
			.then(async (res) => {
				try {
					if (res.data.auth) {
						if (res.data.prods.productIds.length !== 0) {
							setTotal(0)
							setCart(res.data.message)
							setProds(res.data.prods.productIds)
							calculateTotal(res.data.prods.productIds)
							setRefreshing(false)
						}
						else {
							setProds(null)
							setCart("empty")
						}
					}
					else {
						await AsyncStorage.removeItem('token')
						navigation.navigate("AccountNavigation")
					}
				} catch (error) {
					setProds(false)
					setCart("Empty cart")
					console.log(error)
				}
			})
			.catch(err => {
				setProds(false)
				setCart("Empty Cart")
			})
	}

	const handleDelete = async (id) => {
		setLoad(true)
		axios.defaults.headers.delete['x-access-token'] = await AsyncStorage.getItem('token')
		axios
			.delete(`${API}/cart/removeProduct/${id}`)
			.then(res => {
				if (res.data.auth) {
					setLoad(false)
					getCart()
				} else {
				}
			})
	}

	const buyNow = () => {
		// console.log(prods)
		navigation.navigate("SelectAddress", {
			prods,
			cart: true,
		})
	}

	return (
		<>
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<View style={st.cart}>
					{
						cart ? (
							<View>
								<View style={{
									alignItems: "center",
								}}>
									{
										prods ? null : <Text style={st.h1}>Empty cart</Text>
									}
								</View>
								<View>
									{
										prods ? prods.map((prod, index) => {

											return (
												<MotiView
													from={{
														scale: 0.2,
														// opacity:0
													}}

													animate={{
														scale: 1,
														// opacity:1,
													}}
													exit={{
														scale:0,
													}}

													transition={{
														type: 'spring',
														delay: 80 * index,
													}}

													style={{
														margin: 8,
													}} key={prod._id}>
													<ProdCardB
														id={prod._id}
														name={prod.name}
														currency={prod.currency}
														price={prod.price}
														cart={true}
														delete={handleDelete}
														prod={prod}
													/>
												</MotiView>
											)
										}) : null
									}
								</View>
							</View>

						) : <ActivityIndicator size="large" />
					}
				</View>
			</ScrollView>
			{
				prods ?
					<View style={{
						// marginLeft: 15,
						// marginRight: 15,
						// margin: 5,
						paddingHorizontal: 20,
						paddingVertical: 10,
						flexDirection: 'row',
						backgroundColor:'#fffeff',
						borderTopWidth:1,
						borderColor:'#eeeeee',
						elevation:40,
					}}>
						<View style={{
								flex: 1,
							}}>
							<Text style={{
								color:'#181f27',
								fontSize:22,
							}}>
								₹ {total}
							</Text>
						</View>
						<MyButton style={{
							flex: 1
						}} onPress={buyNow} width={200} color="#7ff010" height={35} fontSize={18} padding={0} title="Checkout" />
					</View> : null
			}

		</>
	);
}

export default Cart;

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
	h1: {
		flex: 1,
		color: "#000",
		fontSize: 28,
		fontWeight: 600,
		marginBottom: 5,
	}
})