import { StatusBar } from "expo-status-bar";
import { useState } from "react"; // track pages state
import {Stylesheet, Text, View, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GlobalStyles } from "./GlobalStyles";


const StartScreen = ( {navigation}) => {
    
    /**
     * track the state of the screen in case we have multiple screens to work on
     * 
     * it is a destructuring function
     */
    // let [currentScreen, setCurrentScreen] = useState(0); 

   // we will make a function to contain all we have done so far
    //then we will need to call the function inside the StartScreen return

    let characterScreenJSX = 
            <View style={GlobalStyles.container}>
                    <View style={GlobalStyles.title}>
                        <Text style={[GlobalStyles.text, {fontSize: 20, color: '#ffffffff',}]}> customize your warrior! </Text>
                    </View>

                    <View style={GlobalStyles.container}>
                        <Pressable
                            android_ripple={GlobalStyles.ripple} // style information provided for android only
                        // onPress={pressHandler} // call pressHandler function to see if it works on console
                        onPress={() => {navigation.navigate("Main_Menu")}} // switch to the next or 1 screen
                            style={iosStyleHandler} // function to work on IOS
                            //shortWay
                            //Style={({pressed}) => pressed && GlobalStyles.iosPressable}
                        
                        >
                        <Text style={[GlobalStyles.pressableText, {marginTop: 400,}]}> Start Game</Text>

                        </Pressable>                
                    </View>

                </View>
        
    



        return ( // can only return one thing or function at the time
        //secondScreenJSX // calling that function and now the return looks cleaner
            characterScreenJSX
        );
    

} // end let startScreenJSX

    // pressable function to display in the console
    const pressHandler = function () {
        console.log("Pressed via pressable!");
    }
    // IOS function to work on IOS devices
    const iosStyleHandler = function (pressObject) {
        if(pressObject.pressed){
            return GlobalStyles.iosPressable;
        }
    }

    


export default StartScreen;