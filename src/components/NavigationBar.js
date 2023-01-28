import React, { useState } from "react";
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';

import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    Modal,
    TouchableOpacity 
} from "react-native";

const Nav = ({navigation}) => {
    const navigationRef = useNavigationContainerRef();
    const [showModal,setShowModal] = useState(false)

    return (
        <View style={st.navbar}>
            <Modal
            animationType="fade"
                visible={showModal}
                transparent={true}
                style={st.modal}
                onRequestClose={() => {setShowModal(!showModal)}}
            >
                <View style={st.modalMain}>
                    <View style={st.main}>
                        <TouchableOpacity onPress={()=>navigationRef.navigate("Home")} style={st.link}>
                            <Text style={st.linktxt}>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={st.link}>
                            <Text style={st.linktxt}>Orders</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={st.link}>
                            <Text style={st.linktxt}>Cart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={st.link}>
                            <Text style={st.linktxt}>Your Products</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={st.link}>
                            <Text style={st.linktxt}>Account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={st.link}>
                            <Text style={st.linktxt}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={()=>{setShowModal(!showModal)}} style={st.close}>
                        <Image source={require('../images/close.png')} />
                    </TouchableOpacity>
                </View>

            </Modal>
            <View style={st.name}>
                <Text style={{ color: "#fff", fontSize: 16 }}>ShopOn</Text>
            </View>
            <View style={st.search}>
                <TextInput style={{ color: "#fff" }} placeholder="Search" placeholderTextColor="#fff" />
            </View>
            <TouchableOpacity onPress={()=>{setShowModal(!showModal)}} style={st.toggle}>
                <Image source={require('../images/nav-logo.png')} />
            </TouchableOpacity>
        </View>
    );
}

export default Nav;

const st = StyleSheet.create({
    navbar: {
        display: "flex",
        backgroundColor: "#2b2b2b",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"

    },
    name: {
        flex: 2,
        color: "#fff"
    },
    search: {
        flex: 6,
        height: 50,
        color: "#fff",
        borderWidth: 1,
        borderColor: "#808080",
        borderRadius: 8,
        margin: 5,
    },
    toggle: {
        flex: 2,
        padding: 0,
        display: "flex",
        alignItems: "center",
    },
    modal: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    modalMain: {
        backgroundColor: "#00000060",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    main: {
        width: 300,
        height: "auto",
        backgroundColor: "#202124",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: 10,
        padding: 10
    },
    link: {
        borderColor: "#808080",
        borderBottomWidth: 1,
        // flex:1,
        // height:100,
        width: "100%",
        // borderRadius:10,
        padding: 10,
        // margin:10,
    },
    linktxt: {
        color: "#ffffff",
        fontSize: 24,
    },
    close:{
        margin:10
    }
})