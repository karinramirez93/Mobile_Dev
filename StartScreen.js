import { StatusBar } from "expo-status-bar";
import { useState } from "react"; // track pages state
import {StyleSheet, Text, View, Pressable } from "react-native";
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

    let startScreenJSX = 
            <View style={GlobalStyles.container}>
                    <View style={GlobalStyles.menuStyle}>
                        <Text style={GlobalStyles.menuStyle}> King Rescue! </Text>
                    </View>
                                       

                    <View style={GlobalStyles.container}>
                        <MenuButton 
                            label="Start Playing" 
                            onPress={() => navigation.navigate("Character Creator")} 
                        />
                        <MenuButton 
                            label="Score" 
                            // onPress={() => console.log("ScoreBoard")} 
                            onPress={() => navigation.navigate("ScoreBoard")}
                        />
                        <MenuButton 
                            label="Quit" 
                            onPress={() => console.log("Quit pressed")} 
                        />

                    </View>

                </View>
        
    



        return ( // can only return one thing or function at the time
        //startScreenJSX // calling that function and now the return looks cleaner
            startScreenJSX
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

    const MenuButton = ({label, onPress}) => (
        <Pressable
            android_ripple={{color: '#920c0cff'}}
            style={({pressed}) => pressed && GlobalStyles.iosPressable}
            onPress={onPress}
        >
            <Text style={GlobalStyles.pressableText}>{label}</Text>
        </Pressable>
    );//end MenuButton

    

export default StartScreen;
