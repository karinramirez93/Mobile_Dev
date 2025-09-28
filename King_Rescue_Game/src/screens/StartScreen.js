import {Text, View, Pressable, ImageBackground } from "react-native";
import { GlobalStyles } from "../components/GlobalStyles";

//Main Menu with a background image and a "Start playing" button

 
const backGroundImage = require("../../pictures/arena/startScreen.jpg");



const StartScreen = ( {navigation}) => {
   
    let startScreenJSX = 
        <ImageBackground
            source={backGroundImage}
            style={{flex: 1}}
            resizeMode="cover"
        >
            <View style={[GlobalStyles.container, {backgroundColor: "transparent"}]}>
                <View style={GlobalStyles.menuStyle}>
                    <Text style={[GlobalStyles.menuStyle, {color: "white"}]}> King Rescue! </Text>
                </View>
                                     

                <View style={[GlobalStyles.container, {backgroundColor: "transparent", marginTop: 200}]}>
                       
                    <MenuButton 
                        label="Start Playing" 
                        onPress={() => navigation.navigate("Character Picker")}
                    />

                </View>

                </View>
        </ImageBackground>
     
        return ( 
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
