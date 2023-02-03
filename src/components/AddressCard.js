import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Button } from "react-native";

const AddressCard = (props) => {

  const navigation = useNavigation()

  const selAddress = (index) => {
    navigation.navigate("SelectPayment", {
      index,
      prods: props.prods,
      cart: props.cart
    })
  }

  return (
    <View style={{
      flex: 1,
      margin: 10,
      borderRadius: 10,
    }}>
      <View style={{
        backgroundColor: "#fff",
        elevation: 4,
        padding: 10,
        borderRadius: 10,
      }}>
        <View style={{ paddingBottom: 10, }}>
          <Button onPress={() => navigation.navigate("AddAddress")} title="Add address" />
        </View>

        {
          props.addresses && props.addresses.map((address, index) => {
            return (
              <View key={index} style={{
                flexDirection: "row",
                alignItems: "center",
                borderTopWidth: 1,
                borderTopColor: "#80808080",
              }}>
                <View style={{
                  flex: 1,
                }}>
                  <Text style={ac.txt}><Text style={ac.text1}>{address.fullName} </Text> {props.name}</Text>
                  <Text style={ac.txt}>{address.address}</Text>
                  <Text style={ac.txt}>{address.city}, {address.state}, {address.zip}</Text>
                  <Text style={ac.txt}>{address.country}</Text>
                  <Text style={ac.txt}>Phone number: {address.phoneNumber}</Text>
                </View>
                {
                  props.sel &&
                  <View>
                    <Button onPress={() => selAddress(index)} color="#202124" title="Select" />
                  </View>
                }

              </View>
            )
          })
        }

      </View>
    </View>
  )
}

export default AddressCard;

const ac = StyleSheet.create({
  txt: {
    color: "#000",
    fontSize: 18,
    padding: 5,
  },
  text: {
    borderBottomColor: "#80808080",
    borderBottomWidth: 1,
  },
  text1: {
    fontWeight: 600,
  }
})