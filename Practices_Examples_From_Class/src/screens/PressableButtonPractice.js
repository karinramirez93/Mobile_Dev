import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Pressable} from 'react-native';

const PresasbleButtonPractice = () => {
	const iosStyleHandler = function(pressObject){
		if(pressObject.pressed){
			return styles.iosPressable;
		}

	return(

		<View style={styles.mainContainer}>
			<Pressable
				andriod_ripple = {styles.ripple}
				style={iosStyleHandler}>

				<text style={styles.pressableText}>Button Practice Screen!</Text>
			</Pressable>
			<StatusBar style= 'auto' />
		</View>
);


}//end PressableButtonPractice

const styles=StyleSheet.create({

	mainContainer:{
	},
	text: {
	  fontSize: 32,
	  maxWidth: 300,
	  margin: 12,
	  textAlign: 'center',
	  borderWidth: 2,
	  borderColor: '#000000ff',
	},
	ripple:{
	  color: 'red',
	},
	iosPressable:{
	  opacity: 0.5
	},
	pressableText:{
	  fontSize: 32,
	  maxWidth: 300,
	  padding: 4,
	  textAlign: 'center',
	  borderRadius: 40,
	  backgroundColor: "#9d94a4ff"
	},

});

export default PressableButtonPractice;

