import { StyleSheet } from "react-native"

const homeStyle = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: "#ecf0f1"
  },
  txt: {
    color: "#000",
    fontSize: 20,
  },
  h1: {
    fontSize: 26,
    color: "#000",
    textAlign: "center",
  },
  feat: {
    flex: 1,
    // justifyContent:"center",
    alignItems: "center",
    backgroundColor:"#FFFFFF",
    padding: 20,
    margin: 10,
    elevation:1,
  },
})

export default homeStyle