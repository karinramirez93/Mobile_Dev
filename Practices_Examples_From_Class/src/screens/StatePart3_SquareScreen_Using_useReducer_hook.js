import {useReducer} from 'react';
import {StyleSheet, View} from 'react-native';
//Import the custom component used to control the individual colors.
import ColorCounter_using_useReducer_hook from "../components/ColorCounter_using_useReducer_hook";

//Define a constant for the amount by which each color value changes per button press.
let COLOR_INCREASE = 20;

    /**
     * Functional component that demostrates controlling RGB color state using the useReducer hook.
     * The Screen displays three ColorCounter components and a colored square based on the state
     */


function SquareScreen_Using_useReducer () {


    /**
     * useReducer Hook SetUp:
     *
     * 1. 'state': the current state object (e.g., {change_red: 0, change_green:0, change_blue: 0}).
     * 2. 'dispatch': The function used to send an 'action' to the reducer, triggering a state update.
     * 3. 'reducer': The function that contains the state transition logic (defined below).
     * 4. Initial State: The starting value for the state object.
     */
    const [state, dispatch] = useReducer (reducer, {change_red: 0, change_green: 0, change_blue: 0});

    //Define the component's UI structure using JSX, stoed in the 'body' variable.

    let body = 
        <View style = {styles.container}>
        {/* ColorCounter for the RED channel*/}
            <ColorCounter displayColorTitle = "Red"
                //onIncrease: Dispatches an action to increase the red value.
                //The action object has a 'type' (what happened) and 'payload' (how much to change).
                onIncrease = {() => {dispatch ({type: "change_red", payload: COLOR_INCREASE});}}
                // on Decrease: Dispatches an action to decrease the red value (by sending a negative payload).
                onDecrease = {() => {dispatch ({type: "change_red", payload: COLOR_INCREASE * -1});}}
            />
        {/* ColorCounter for the GREEN channel*/}
            <ColorCounter displayColorTitle = "Green"
                onIncrease = {() => {dispatch ({type: "change_green", payload: COLOR_INCREASE});}}
                onDecrease = {() => {dispatch ({type: "change_green", payload: COLOR_INCREASE * -1});}}
            />
        {/* ColorCounter for the BLUE channel*/}
            <ColorCounter displayColotTitle = "Blue"
                onIncrease = {() => {dispatch ({type: "change_blue", payload: COLOR_INCREASE});}}
                onDecrease = {() => {dispatch ({type: "change_blue", payload: COLOR_INCREASE * -1});}}
            />

        {/* View to display the resulting RGB color*/}
            <View style = {{marginTop: 20,
                            height: 150,
                            width: 150,
                    //Dynamically set the backgroundColor using a template literal
                    //and the current cikir values from the 'state' object
                            backgroundColor: `rgb(${state.change_red}, ${change_green}, ${change_blue})`}}>
            </View>
        </View>

        //Teh component returns the constructed UI element.
        return (
            body
        )

} //end SquareScreen_Using_useReducer


/**
 * Reducer function: Centralized logic for updating satate based on actions.
 * It takes the current 'state' and the 'action' dispatched by the component.
 * It must return a new state object; it must NEVER modify the current state directly.
 * @param {object} state - The current state (e.g., {change_red: 0, change_green: 0, change_blue:0}).
 * @param {object} action - The action object {type: string, payload: number}.
 * @returns {object} the new state object.
 */
function reducer(state, action){
    //Switch statement executes logic based on the action's 'type'.
    switch(action.type){ // dispatch's type 
        case 'change_red':
            //Boundary check: prevent the color value from going outside the 0-255 range.
             if(state.change_red + action.payload < 0 || state.change_red + action.payload > 255){
                 //if out of bounds, returns the current state unchanged.
                 return state;
             }
             else{
                 //Returns a NEW state object. Use the spread operator '...' to copy all existing properties,
                 //and then explicity update only 'change_red' with the new value.
                 return {...state, change_red: (state.change_red + action.payload)}
             }
            //Boundary check for green channel.
        case 'change_green':
            if(state.change_green + action.payload < 0 || state.change_green + action.payload > 255){
                return state;
            }
            else{
                // Update 'change_green' in the new statae object.
                return{...state, change_green < 0 || state.change_green + action.payload > 255}{
                   
                }
            }
            //Boundary check for blue channel.
        case 'change_blue':
            if(state.change_blue + action.payload < 0 || state.change_blue + action.payload > 255){
                return state;
            }
            else{
                //Update 'change_blue' in the new state object.
                return(...state, change_blue < 0 || state.change_blue + action.payload > 255){
                    return state;
                }
            }
            //default case: if an unknown action is dispatched, return the current state unchanged.
        default: return state   
    }
}

//--------------------------------------------------------------------
//                  StyleSheet
//--------------------------------------------------------------------

const styles = StyleSheet.create({
    container: {
        flex: 1, // ensures the container take up the entire space available.
        backgroundColor: "#5aa6c14f",
        //centers child elements horizontally and vertically.
        alignItems: "center",
        justifyContent: "center",
    },
});

export default SquareScreen_Using_useReducer;
