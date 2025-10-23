import {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from "react-native";

//Functional component that demostrates reading and responding to user text input
const TextScreen = () => {
    /**
     * UseState hook setUp:
     * 'name' holds the current text value from the TextInput.
     * 'setName' is the function used to update the 'name' state, triggering a re-render.
     * The initial state is an empty string ("").
     */

    const [name, setName] = useState("");


    //define the components UI structure using JSX, stored in the 'body' variable.
    let body =
        <View style = {styles.mainContainer}>
        {/* textInput component for user input*/}
            <TextInput style = {styles.input}
                // prevents the device from automatically capitalizing the first letter.
                autoCapitalize = "none"
                //Prevents the device from suggesting spelling corrections.
                autoCorrect = {false}
                //Ties the input's current value directly to the 'name' state variable.
                value = {name}
                //Text displayed in the input field when it is empty.
                placeholder = "please enter name!"
                //Specifies the type of keyboard to display (e.g., 'numeric', 'email-address'). 'standard' os standard text.
                keyboardType = "default"
                //The most important handler: called every time the text in the input changes.
                //'nextText' is the new string value of the input.
                onChangeText = { (nextText) => {
                    //Updates the 'name' state, causing the component to re-render with the new text.
                    setName (nextText);
                }}
            />
            {/* Text component that displays the current value of the 'name' state.*/}
            <Text style = {styles.text}> (nextText) </Text>
            
            {/* Conditional renderin based on the length of the input: */}
            {/* If the name length is less than 5, display the "too short" warning; otherwise, display "good". */}
            {name.length < 5 ? <Text> Name too short! </Text> : <Text> Name is good </Text>}

        </View>

        // the component returns the constructed UI element
        return(
            body
        );


}//end TextScreen

//----------------------------------------------------------------------
//              StyleSheet
//----------------------------------------------------------------------

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, // ensures the container takes up the entire screen space.
        backgroundColor: '#d6a22bff', 
        //centers child elements horizontally and vertically.
        alignItems: 'center',
        justifyContent: 'center',
    },
    //Style for the text displaying the current input value.
    text: {
        fontSize: 32,
        padding: 12,
        //border properties included but set to 0, making invisible.
        borderWidth: 0,
        borderColor: '#000000ff',
    },
    //Style for the TextInput field itself
    input:{
        width: '100%', // input stretches to full width if its container.
        margin: 12,
      //visible black border.
        borderColor: 'black',
        borderWidth: 1,
        //large font size for easy input viewing.
        fontSize: 36,
        //added padding for better visual spacing inside the border.
        padding: 10,

    },

});


// Export the component as the default export for use in the application.
export default TextScreen;
