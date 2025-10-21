import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Pressable} from 'react-native';

/**
 * Functional component demonstrating the Pressable component for a custom button.
 * It includes logic for platform-specific visual feedback (iOS opacity change).
 */
const PressableButtonPractice = () => {
	    /**
     * Function to handle dynamic styling specifically for iOS when the Pressable is active.
     * This function is passed to the 'style' prop of Pressable and receives the press state object.
     * @param {object} pressObject - Object provided by RN/Expo, containing the 'pressed' boolean state.
     * @returns {object | undefined} Returns the styling object for the pressed state or undefined otherwise.
     */
	const iosStyleHandler = function(pressObject){
		// Check if the component is currently being pressed (true when user touches it).
		if(pressObject.pressed){
			// If pressed, return the style that applies the iOS visual feedback (opacity reduction).
			return styles.iosPressable;
		}
	}

	// The component's JSX structure is returned.
	return(

		// Main container View for the screen.
		<View style={styles.mainContainer}>
			{/* The Pressable component is used for advanced touch handling. */}
			<Pressable
			// android_ripple prop: Defines the ripple effect specifically for the Android platform.
            // NOTE: There is a typo here ('andriod_ripple'). The correct prop name is 'android_ripple'.
				andriod_ripple = {styles.ripple}
				// style prop: Uses the function to apply dynamic, conditional styling (iOS feedback).
				style={iosStyleHandler}>

					{/* Text element nested inside Pressable, serving as the button's label. */}
				<Text style={styles.pressableText}>Button Practice Screen!</Text>
			</Pressable>
			    {/* StatusBar component from Expo to manage the system status bar appearance. 
                'auto' sets the bar style based on the component's background color. */}
			<StatusBar style= 'auto' />
		</View>
);


}//end PressableButtonPractice

//------------------------------------------------------------------------
//						StyleSheet
//------------------------------------------------------------------------

const style=StyleSheet.create({

	//main screen container style
	mainContainer:{
		flex: 1, // takes up the entire available screen space
		flexDirection: 'column', // explicity set to 'column' (default) for vertical stacking
		backgroundColor: '#a8a4ebff', 
		//centers the content horizontally and vertically within the container
		alignItems: 'center',
		justifyContent: 'center',
	},
	/**
     * Style object for the Android ripple effect (used by the android_ripple prop).
     * The 'color' property defines the color of the circular touch feedback animation.
     */
	ripple:{
	  color: 'red',
	},
    /**
     * Style object applied to the Pressable *only* when it is being pressed on iOS.
     * Reducing opacity provides visual feedback on touch.
     */
	iosPressable:{
	  opacity: 0.5
	},
    /**
     * Styles for the Text element *inside* the Pressable, defining the button's visual appearance.
     */
	pressableText:{
	  fontSize: 32,
	  maxWidth: 300,
	  padding: 4,
	  textAlign: 'center',
	  borderRadius: 40, // high border radius gives the button a pill shape
	  backgroundColor: "#9d94a4ff" //background color for the button
	},

});

//export the component for use in the application's entry file (e.g./ App.js).
export default PressableButtonPractice;



