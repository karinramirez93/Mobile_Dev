import { StatusBar } from "expo-status-bar";
import { useState } from "react"; // track pages state
import {StyleSheet, Text, View, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

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
            <View style={styles.container}>
                    <View style={styles.container}>
                        <Text style={styles.text}> King Rescue! </Text>
                    </View>

                    <View style={styles.container}>
                        <Pressable
                            android_ripple={styles.ripple} // style information provided for android only
                        // onPress={pressHandler} // call pressHandler function to see if it works on console
                        onPress={() => {navigation.navigate("Screen2")}} // switch to the next or 1 screen
                            style={iosStyleHandler} // function to work on IOS
                            //shortWay
                            //Style={({pressed}) => pressed && styles.iosPressable}
                        
                        >
                        <Text style={styles.pressableText}> Start Playing</Text>

                        </Pressable>                
                    </View>

                </View>
        
    



        return ( // can only return one thing or function at the time
        //secondScreenJSX // calling that function and now the return looks cleaner
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
            return styles.iosPressable;
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex:1,
            flexDirection: "column",
            backgroundColor: '#656479ff',
            alignItems: "center",
            justifyContent: "center",
            
        },
        text: {
            fontSize: 32,
            maxWidth: 300,
            padding: 12,
            margin: 12,
            borderBottomWidth: 4,
            borderColor: "#18ea54ff",
            
        },
        //ANDROID pressable style
        ripple: {
            color: 'red',
        
        },
    
        pressableText:{
            fontSize: 32, // pressable text fontSize
            maxWidth: 300, // length of the row
            padding: 4,
            textAlign: "center",
            borderRadius: 5,
            color: "blue", // pressable text color
            backgroundColor: "#d1bee0ff",
            margin: 10, // margin around del recuadro para el pressable
            
        },
        //IOS style
        iosPressable:{
            opacity: 0.5
            
        },
}); //end styleSheet()

export default StartScreen;
