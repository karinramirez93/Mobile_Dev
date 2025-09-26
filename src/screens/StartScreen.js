import { StatusBar } from "expo-status-bar";
import { useState } from "react"; // track pages state
import {StyleSheet, Text, View, Pressable, ImageBackground } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GlobalStyles } from "../components/GlobalStyles";

const bgImage = require("../../pictures/arena/startScreen.jpg");



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
     <ImageBackground
                source={bgImage}
                style={{flex: 1}}
                resizeMode="cover"
                >
            <View style={[GlobalStyles.container, {backgroundColor: "tansparent"}]}>
                    <View style={GlobalStyles.menuStyle}>
                        <Text style={[GlobalStyles.menuStyle, {color: "white"}]}> King Rescue! </Text>
                    </View>
                                       

                    <View style={[GlobalStyles.container, {backgroundColor: "transparent"}]}>
                       
                        <MenuButton 
                            label="Start Playing" 
                            // onPress={() => console.log("Start Playing")} 
                            onPress={() => navigation.navigate("Character Picker")}
                        />
                        <MenuButton 
                            label="Score" 
                            // onPress={() => console.log("ScoreBoard")} 
                            onPress={() => navigation.navigate("ScoreBoard")}
                        />


                        

                    </View>

                </View>
                </ImageBackground>
        
    



        return ( // can only return one thing or function at the time
        //startScreenJSX // calling that function and now the return looks cleaner
            startScreenJSX
        );
    

    } // end let startScreenJSX

    //reusable button used on the menu. it works for andriod and for Iphones.
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
