import { StyleSheet, Text, View, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { GlobalStyles } from "./GlobalStyles";

export default ScoreScreen;

const ScoreScreen = ({Navigation}) => {

    let ScoreScreenJSK =
        <View style={GlobalStyles.container}>
            <View style={GlobalStyles.menuStyle}>
                <Text style={styles.text}> ScoreBoard</Text>
            </View>
            <View>
                <Text style={GlobalStyles.text}>Score #1</Text>
                <Text style={GlobalStyles.text}>Score #2</Text>
                <Text style={GlobalStyles.text}>Score #3</Text>
                <Text style={GlobalStyles.text}>Score #4</Text>
            </View>

        </View>


    return (
        ScoreScreenJSK
    )

}// end of ScoreScreen()



    // pressable function to display in the console
    const pressHandler = function () {
        console.log("Pressed via pressable!");
    }
    // IOS function to work on IOS devices
    const iosStyleHandler = function (pressObject) {
        if(pressObject.pressed){
            return styles.iosPressable;
        }
    }

    