import { View, Text, Image, Pressable, StyleSheet, ActivityIndicator } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API } from "../../config";

const ProdCardB = (props) => {

  const navigation = useNavigation()

  const [image, setImage] = useState(null)

  const getImage = (id) => {
    axios
      .get(`${API}/account/orders/image/${id}`)
      .then(res => {
        setImage(res.data)
      })
  }

  useEffect(() => {
    getImage(props.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFocusEffect(
    useCallback(() => {
      getImage(props.id)
    }, [])
  )

  return (
    <Pressable style={{
      flex: 1,
      flexDirection: props.small ? "column" : "row",
      // backgroundColor: "#fff",
      margin: props.small ? 8 : 0,
    }}
      onPress={() => navigation.navigate("Product", {
        id: props.id
      })}
    >
      <View style={{
        flex: 1,
        flexDirection: props.small ? "column" : "row",
        elevation: 3,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 6,
      }}>
        <View>
          {
            image ?
              <Image style={{ width: 200, height: 200 }} source={{ uri: image }} />
              :
              <View style={{
                height: 200,
                width: 200,
                flex: 1,
                justifyContent: "center"
              }}>
                <ActivityIndicator size="large" />
              </View>
          }
        </View>
        <View style={{
          flex: 1,
          paddingTop: 10,
          paddingLeft: props.small ? null : 10,
          // backgroundColor:"#000"
        }}>
          <View style={{
            flex: 1,
          }}>
          {
            props.small ? 
            <Text ellipsizeMode='tail' numberOfLines={1} style={st.txt}>{props.brand} {props.name}</Text>
            : 
            <Text ellipsizeMode='tail' numberOfLines={3} style={st.txt}>{props.brand} {props.name}</Text>

          }
            {
              props.price && <Text style={st.txt}>₹ {props.price}</Text>
            }
          </View>
          {
            props.cart ?
              <View style={{
                // backgroundColor:"#fff000",
                flexDirection: "row"
              }}>
                <View style={{
                  flex: 1
                }}></View>
                <Pressable style={{
                  // flex:1,
                  // backgroundColor:"#faa000",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  // height:12,
                  padding: 10,
                }}
                  onPress={() => props.delete(props.id)}
                  android_ripple={{ color: "#808080" }}
                >
                  <Image style={{ width: 30, height: 30 }} source={require("../images/delete.png")} />
                </Pressable>
              </View>
              : null
          }

        </View>
      </View>

    </Pressable>
  )
}

export default ProdCardB;

const st = StyleSheet.create({
  txt: {
    fontSize: 16,
    color: "#000",
    maxWidth:222,
  }
})