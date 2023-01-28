import { useLinkProps } from "@react-navigation/native";
import { View, StyleSheet, Modal, ActivityIndicator } from "react-native";

export default function LoadingAnim(props) {
    return (
        <Modal
            visible={props.visible}
            animationType="fade"
            style={st.modal}
            transparent={props.transparent}
        >
            <View
                style={st.modal}
            >
                <ActivityIndicator style={{
                    width:100,
                    height:100,
                    backgroundColor:"#00000080",
                }} size="large" animating={props.visible} />
            </View>
        </Modal>
    )
}

const st = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#00000060"
    }
})