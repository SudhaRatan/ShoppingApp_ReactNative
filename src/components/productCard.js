import { View, Text, Image, Pressable, StyleSheet, ActivityIndicator } from "react-native"
import { useNavigation } from "@react-navigation/native";

const ProdCard = (props) => {

  const navigation = useNavigation()

  return (
    <Pressable style={{
      flex: 1,
      flexDirection: props.small ? "column" : "row",
      backgroundColor: "#fff",
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
            props.src ? <Image style={{ width: 200, height: 200 }} source={{ uri: props.src }} />
              : <View style={{
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
            <Text style={st.txt}>{props.brand} {props.name}</Text>
            <Text style={st.txt}>Rs {props.price}</Text>
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
                  padding:10,
                }}
                onPress={()=>props.delete(props.id)}
                android_ripple={{color:"#808080"}}
                >
                  <Image style={{ width: 30, height: 30 }} source={require("../images/delete.png")} />
                  {/* <Text style={{
              color:"#000",
              fontSize:16,
            }}>Remove from cart</Text> */}
                </Pressable>
              </View>
              : null
          }

        </View>
      </View>

    </Pressable>
  )
}

export default ProdCard;

const st = StyleSheet.create({
  txt: {
    fontSize: 16,
    color: "#000"
  }
})