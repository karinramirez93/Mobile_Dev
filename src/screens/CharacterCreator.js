import { StatusBar } from "expo-status-bar";
import { useState, useReducer} from "react"; // track pages state

import {StyleSheet, Text, View, Pressable, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GlobalStyles } from "../components/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";



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
            
   
            <View style={styles.backgroundContainer}>
                       <View style={styles.backgroundContainer}>
                            <Text style={styles.text}> Pick your warrior! </Text>
                        </View>
                        <SafeAreaView>
                            <View>
                                <CharacterImageDetail title="Wizard" imageSource={require("../../pictures/Heroes/wizard.png")}/>
                                <CharacterImageDetail title="Knight" imageSource={require("../../pictures/Heroes/knight.png")}/>
                            </View>
                        </SafeAreaView>

                

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
const styles=StyleSheet.create({
    backgroundContainer:{
        //flex: 1,
        alignItems: 'center',
       //justifyContent: 'center',
        borderColor: 'red',
        borderWidth: 5,
        
    },
    text:{
        fontSize:30,
        
    }

})// end styles

    


export default StartScreen;