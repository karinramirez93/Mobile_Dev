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
                    <View style={styles.menuStyle}>
                        <Text style={styles.menuStyle}> King Rescue! </Text>
                    </View>
                                       

                    <View style={styles.container}>
                        <MenuButton 
                            label="Start Playing" 
                            onPress={() => navigation.navigate("Character Creator")} 
                        />
                        <MenuButton 
                            label="Score" 
                            onPress={() => console.log("Go to score screen")} 
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
            return styles.iosPressable;
        }
    }

    const MenuButton = ({label, onPress}) => (
        <Pressable
            android_ripple={{color: '#920c0cff'}}
            style={({pressed}) => pressed && styles.iosPressable}
            onPress={onPress}
        >
            <Text style={styles.pressableText}>{label}</Text>
        </Pressable>
    );//end MenuButton

    

    const styles = StyleSheet.create({
        container: {
            flex:1,
            flexDirection: "column",
            backgroundColor: '#656479ff',
            alignItems: "center",
            justifyContent: 'flex-start',
            paddingTop: 100,
        },
       
        //ANDROID pressable style
        ripple: {
            color: 'red',
        
        },
        menuStyle:{
           fontSize: 40,
            maxWidth: 300,
            padding: 12,
            margin: 2,
            borderBottomWidth: 4,
            borderColor: "#18ea54ff",
    
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
            justifyContent: 'center',
           // padding: 100,
            
            
            
        },
        //IOS style
        iosPressable:{
            opacity: 0.5
            
        },
}); //end StartScreen()

export default StartScreen;
