import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { GlobalStyles } from "./GlobalStyles"; 



const ScoreScreen = ({Navigation}) => {

    let ScoreScreenJSK =
        <View style={[GlobalStyles.container, {backgroundColor: '#7e3869ff'}]}>
            <View style={GlobalStyles.menuStyle}>
                <Text style={[GlobalStyles.text, {color: '#ffffffff'}]}> ScoreBoard</Text>
            </View >
                {/* // backgroundColor: ' rgba(0,0,0,0,)' is a transparent color to remove the color */}
            <View style={[GlobalStyles.container, {backgroundColor: ' rgba(0, 0, 0, 0)',margin:20,}]}> 
                <FlatList data={score} renderItem={renderScore}/>
            </View>
        </View>


    return (
        ScoreScreenJSK
    );

}// end of ScoreScreen()

    //an array to store the score
    let score = ["Score 1", "Score 2", "Score 3", "Score 4", "Score 5"];
    // const updateScore() 

        
    //this function is to render and apply some styles to the FlatList component
    function renderScore({item}){
        return <Text style={[GlobalStyles.text]}>{item}</Text>
    }



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

    
export default ScoreScreen;