import { View, Text, StyleSheet } from "react-native";

const AccountCard = (props) => {
  return (
    <View style={{
      flex:1,
      margin:10,
      borderRadius:10,
    }}>
      <View style={{
      backgroundColor: "#fff",
      elevation: 4,
      padding:10,
      borderRadius:10,
      }}>
        <View style={ac.text}>
          <Text style={ac.txt}><Text style={ac.text1}>Name: </Text> {props.name}</Text>
        </View>
        <View>
          <Text style={ac.txt}><Text style={ac.text1}>Phone: </Text> {props.phone}</Text>
        </View>
      </View>
    </View>
  )
}

export default AccountCard;

const ac = StyleSheet.create({
  txt: {
    color: "#000",
    fontSize: 20,
    padding:5,
  },
  text:{
    borderBottomColor: "#80808080",
    borderBottomWidth:1,
  },
  text1:{
    fontWeight:600,
  }
})