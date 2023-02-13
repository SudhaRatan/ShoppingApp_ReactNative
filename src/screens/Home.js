import React from "react";
import { View, Text, Button, StyleSheet, ScrollView, RefreshControl, TextInput, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { API } from "../../config";
import axios from "axios";
import homeStyle from "./screenStyles/homeStyle";
import ProdCardB from "../components/productCardB";
import { ActivityIndicator } from "react-native";

import Fontisto from 'react-native-vector-icons/Fontisto'

import Entypo from 'react-native-vector-icons/Entypo'
import { MotiPressable } from "moti/interactions";

const Home = () => {

	const [feat, setFeat] = useState(null)
	const [elec, setElect] = useState(null)
	const [refreshing, setRefreshing] = useState(false)

	const getFeature = () => {
		setFeat(null)
		axios
			.get(`${API}/featProd`)
			.then(res => {
				setFeat(res.data.featProd[0])
				setRefreshing(false)
			})
	}

	const getElectronics = () => {
		setElect(null)
		axios
			.get(`${API}/electronicProds`)
			.then((res) => {
				setElect(res.data.prods)
				setRefreshing(false)
			})
	}

	useEffect(() => {
		getFeature()
		getElectronics()
	}, [])

	const onRefresh = () => {
		setRefreshing(true)
		getFeature()
		getElectronics()
	}

	return (
		<ScrollView
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>

					<View>
						<Text style={{
							fontSize: 28,
							textAlign: "center",
							color: "#202124",
							fontWeight: 600,
						}}>Home</Text>
						<View style={homeStyle.home}>
							<View style={homeStyle.feat}>
								<Text style={homeStyle.h1}>Featuring Product</Text>
								{
									feat ? (
											<ProdCardB
												id={feat._id}
												name={feat.name}
												currency={feat.currency}
												price={feat.price}
												brand={feat.brand}
											/>
									) : <ActivityIndicator size="large" color="#80cbc4" />
								}
							</View>
							<View style={homeStyle.feat}>
								<Text style={homeStyle.h1}>Recommendations</Text>
								{
									elec ? (
										<ScrollView horizontal={true}>
											{
												elec.map(prod => {
													return <ProdCardB
														key={prod._id}
														id={prod._id}
														name={prod.name}
														price={prod.price}
														brand={prod.brand}
														small="true"
													/>
												})
											}
										</ScrollView>
									) : <ActivityIndicator size="large" color="#80cbc4" />
								}
							</View>
						</View>
					</View>

		</ScrollView>

	);
}

export default Home;