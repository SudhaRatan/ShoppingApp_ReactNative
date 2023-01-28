import React from 'react';
import {
	View,
	Pressable,
	Text,
	StyleSheet,
	Dimensions
} from 'react-native';

const MyButton = (props) => {
	const width = Dimensions.get('window').width

	const styles = StyleSheet.create({
		text: {
			margin: 10,
			color: props.txtColor? props.txtColor : '#000',
			fontSize: props.fontSize ? props.fontSize : 20,
			textAlign: 'center',
		},
		button: {
			width: props.width ? props.width : width-20,
			backgroundColor:props.color? props.color : '#29afff',
			borderRadius: 10,
			height: props.height? props.height : 50,
			alignItems: 'center',
			justifyContent: 'center',
		},
	})

	return (
		<View style={styles.button}>
		<Pressable
			hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
			style={({ pressed }) => [
				{ backgroundColor: pressed ? '#dddddd' : props.color },
				styles.button,
				{ ...props.style }
			]}
			onPress={props.onPress}
			android_ripple={{ color:'#bbb', borderless: true }}
		>
			<Text style={styles.text}>
				{props.title}
			</Text>
		</Pressable>
		</View>
	)
}



export default MyButton;