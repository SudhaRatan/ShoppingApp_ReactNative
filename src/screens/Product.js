import { View, Text, ActivityIndicator, Dimensions, Image, StyleSheet, Button, ToastAndroid } from "react-native";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API } from "../../config";
import Carousel from "react-native-reanimated-carousel";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const Product = ({ route }) => {
  const width = Dimensions.get('window').width;
  const [prod, setProd] = useState(null)
  const [imgArray, setImgArray] = useState(null)
  const [auth, setAuth] = useState(null)
  const [load,setLoad] = useState(false)

  const navigation = useNavigation()

  useEffect(() => {
    getDetails(route.params.id)
  }, [route.params.id])

  useFocusEffect(
    useCallback(()=>{
      getDetails(route.params.id)
    },[route.params.id])
  )

  const getDetails = (id) => {
    axios
      .get(`${API}/sell/product/${id}`)
      .then(res => {
        try {
          if (res.data.auth) {
            setAuth(res.data.message)
            setImgArray(res.data.imgArray.imageData)
            setProd(res.data.prod)
          }
        } catch (error) {
          setAuth("error")
          console.log(error)
        }
      })
  }

	const buyNow = () => {
		navigation.navigate("SelectAddress",{prods: [prod]})
	}


  const addToCart = async() => {
    setLoad(true)
    axios.defaults.headers.put['x-access-token'] = await AsyncStorage.getItem('token')
    axios
			.put(`${API}/cart`, { id: prod._id })
			.then((res => {
				if(res.data.auth){
					setLoad(false)
					showToast("Added to cart !")
				} else {
					showToast("Something went wrong... try again later")
					setLoad(false)
				}
				
			}))
  }

  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: "#ecf0f1"
    }} >
      {
        auth && imgArray && prod && route.params.id===prod._id ?
          <View style={{
            flex: 1,
          }}>
            <ScrollView style={{ flex: 1, }}>
              <Carousel
                loop
                width={width}
                height={width}
                autoPlay={false}
                data={imgArray}
                mode="parallax"
                scrollAnimationDuration={500}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                  <View
                    style={{
                      flex: 1,
                      // borderWidth: 1,
                      justifyContent: 'center',
                      borderRadius: 10,
                      backgroundColor: "#fff",
                      elevation: 4
                    }}
                  >
                    <Image
                      style={{
                        width: width,
                        height: width,
                        borderRadius: 10,
                      }} source={{ uri: imgArray[index] }} />
                  </View>
                )}
              />
              <View style={{
                flex: 1,
                margin: 14,
                backgroundColor: "#fff",
                elevation: 3,
                padding: 10,
                borderRadius: 10
              }}>
                <Text style={[st.txt, { fontSize: 24, }]}>
                  {prod.brand} {prod.name}
                </Text>
                <Text style={[st.txt]}>
                  Not rated   ({prod.category})
                </Text>
                <Text style={[st.txt]}>
                  Rs {prod.price}
                </Text>
                <ScrollView style={{
                  maxHeight: 200,
                  // backgroundColor:"#ffffe0"
                }}>
                  <Text style={[st.txt, { padding: 24, fontSize: 16, }]}>
                    {prod.description}
                  </Text>
                </ScrollView>
              </View>
            </ScrollView>
            <View style={{
              // flex:1,
              flexDirection: "row",
              gap: 20,
              justifyContent: "center",
              padding: 10,
            }}>
              <Button onPress={addToCart} title="Add to cart" color="orange" />
              {
                load ? <ActivityIndicator size="large" /> : null
              }
              <Button onPress={buyNow} title="    Buy now    " color="#29afff" />
            </View>
          </View>
          :
          <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}>
            <ActivityIndicator size="large" />
          </View>
      }

    </View>
  )
}

export default Product;

const st = StyleSheet.create({
  txt: {
    color: "#000",
    fontSize: 18,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#80808080"
  },
  txt1: {
    color: "#000",
    fontSize: 18,
    padding: 8,
  }
})