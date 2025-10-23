import {View, text, StyleSheet, Button} from 'react-native';

    /**
     * ColorCounter function Component.
     * This is a reusable child component responsible for displaying a single color
     * (Red, Green,Blue) and providing controls (buttons) to modify its value.
     *
     * @param {object} props - The properties passed from the parent component.
     * @param {string} props.color - The name of the color this component controls (e.g., 'red').
     * @param {function} props.onIncrease - The function to call when the increase button is pressed 
     * @param {function} props.onDecrease - The function to call when the decrease button is pressed
     */

const ColorCounter_using_useReducer_hook = (props) => {

    // Define the component's UI structure using JSK, stored in the 'body' variable.
    let body =
        <View>
        {/* Display the name of the color being controlled*/}
            <Text style = {styles.text}> {props.color} </Text>

        {/* Button to increase the color value.*/}
            <Button
                //Dynamically set the button title using the color name for clarity,
                    title = {`Increase Color ${props.color}`}
                // Call the 'onIncrease' function passed down from the parent component.
                    onPress = {props.onIncrease}
            />

        {/* Button to decrease the color value*/}
            <Button
                // Dynamically set the button title.
                    title = {`Decrease Color ${props.color}`}
                // Call the 'onDecrease' function passed down from the parent component.
                    onPress = {props.onDecrease}/>
        </View>

        // the component return the contructed UI element.
        return(
            body
        );
}//end ColorCounter_using_useReducer_hook


//------------------------------------------------------------
//              StyleSheet
//------------------------------------------------------------

const styles = StyleSheet.create({
    // Style for the color name text.
    text:{
        fontSize: 30, // large font size for visibility.
    },
});

// export the compoent so it can be imported and used by a parent component.
export default ColorCounter_using_useReducer_hook;
