import { View, Text, StyleSheet, ScrollView } from "react-native";
import ProdCardB from "./productCardB";

const OrderCard = (props) => {

  const d = new Date(props.order.orderDate)
  return (
    <View style={{
      padding: 10,
      backgroundColor: "#ecf0f1",
      elevation: 4,
      borderRadius: 10,
    }}>
      <Text style={st.txt}>
        Ordered on {[(d.getDate()), (d.getMonth() + 1), d.getFullYear()].join('/')} at {d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
      </Text>
      <ScrollView style={{
        // padding:10,
      }} horizontal={true}>
        {
          props.order.productIds && props.order.productIds.map(prod => {
            return (
              <ProdCardB
                key={prod._id}
                id={prod._id}
                name={prod.name}
                brand={prod.brand}
                small={true}
                prod={prod}
              />
            )

          })
        }
      </ScrollView>
    </View>
  )
}

export default OrderCard;

const st = StyleSheet.create({
  txt: {
    color: "#000",
    fontSize: 16,
  },
})