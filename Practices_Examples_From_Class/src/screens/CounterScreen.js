import {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';


/**
 * Functional component that displays a counter and allows the user to increase or decrease its value.
 * It demonstrates the fundamental use of the useState hook for state management.
 */
const CounterScreen =() => {

    /**
     * Apply useState to be able to re-render the screen to display updated values.
     * useState returns an array with two elements:
     * 1. 'counter': the current state value (read-only)
     * 2. 'setCounter': A function used to update the state value and trigger a re-render.
     * The initial value of the state is set to 0
     */
    const [counter, setCounter] = useState(0);

    //using JSK assigned to the 'body' variable to keep the final return statement clean.

    let body =
        //use LinearGradient for an aesthetically pleasing background.
        <LinearGradient
            //Define the color stops for the gradient
            colors={['#c70b0bff', '#24aa91ff', '#5adc2fff']}
            style={styles.container}
        >
            {/* SafeAreaView ensures the content sits below device notches/status bars.*/}
            <SafeAreaView style={{flex: 1}}>

                {/* inner View container: set to transparent so the LinearGradient shows through.*/}
                <View style = {[styles.container, {backgroundColor: 'transparent' }]}>

                    {/* View wrapper for the 'Increase' button to apply layout styles. */}
                    <View style = {styles.buttonContainer}>
                        <Button
                            //The Button component is not directly styled via the 'style' prop;
                            // styling is limited to colors and is usually managed by the surrounding View.
                            title = "Increase"
                            // onPress handler uses the setCounter function.
                            // The function receives the new value (current counter + 1), which triggers a re-render.
                            onPress = {() => { setCounter(counter + 1); console.log('Increased to: ', counter + 1); }}/>
                    </View>

                    {/* View wrapper for the 'Decrease' button. */}
                    <View style ={styles.buttonContainer}>
                        <Button
                            title = "Decrease"
                            //onPress handler decreases the counter value by 1.
                            onPress ={() => {setCounter (counter - 1); console.log('Decreased to: ', counter -1); }}/>
                   </View>

                    {/* Text component to display the current counter value.*/}
                    {/* Curly braces {} are used to embed JavaScript variables (like 'counter') directly within JSX. */}
                    <Text style = {styles.text}> Counter Screen: {counter} </Text>
                </View>
            </SafeAreaView>
        </LinearGradient>


        return(
            body
        );

} //end CounterScreen


//--------------------------------------------------------------------
//              StyleSheet
//--------------------------------------------------------------------


const styles = StyleSheet.create({

    //Main container style (applies to the LinearGradient and the inner View).
    container: {
        flex: 1, // ensures the component fills available space
        backgroundColor: "#37bac9ff", // default background Color (Overridden by LinearGradient for the outer container).
        //Centers context horizontally and vertically.
        alignItems: "center",
        justifyContent: "center",
    },

    //Style for the text displaying the counter value.
    text: {
        fontSize: 30,
        padding: 12,
        borderWidth: 0, // border properties included but set to 0/ transparent, effectively hiding them.
        borderColor: "#000000ff",

    },

    //Style applied to the container view around the button.
    //This is necessary because the default React Native Button component is notoriously difficult to style directly.
    buttonContainer: {
        //Provides vertical separation between the two buttons.
        marginBottom: 12,
    },


});

//Export the component as the default export for use in the main application file (e.g., App.js).
export default CounterScreen;
