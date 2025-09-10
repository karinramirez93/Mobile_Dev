import { StatusBar } from "expo-status-bar";
import {StyleSheet, Text, View, Pressable } from "react-native";

const StartScreen = () => {

    const pressHandler = function () {
        console.log("Pressed via pressable!");
    }

    const iosStyleHandler = function (pressObject) {
        if(pressObject.pressed){
            return styles.iosPressable;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.GameName}> Last Standing WIN </Text>
            </View>
            <View style={styles.container}>
                <Pressable
                    android_ripple={styles.ripple}
                    onPress={pressHandler}
                    style={iosStyleHandler}
                >
                <Text style={styles.pressableText}> Start Playing</Text>
                <Text style={styles.pressableText}> Score</Text>
                <Text style={styles.pressableText}> Quit</Text>
                

                </Pressable>                
            </View>

        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: "column",
        backgroundColor: '#a8a4ebff',
        alignItems: "center",
        justifyContent: "center",
        
    },
    text: {
        fontSize: 32,
        maxWidth: 300,
        margin:12, //give a margin between text
        textAlign: 'center',
        borderWidth: 2,
        borderColor: "#000000ff",
    },
    ripple: {
        color: 'red',
        
        
    },
    iosPressable:{
        opacity: 0.5
    },
    pressableText:{
        fontSize: 32,
        maxWidth: 300,
        margin: 15,
        padding: 4,
        textAlign: "center",
        borderRadius: 40,
        backgroundColor: "#6303b1"
    },
      GameName: {
    //personalize the menu options
    borderWidth: 5, // border thickness
    borderColor: 'white', // border color
    borderRadius: 20, //border radius for rounded corners
    paddingVertical: 20, // vertical inner spacing
    paddingHorizontal: 12, //horizontal inner spacing
    marginVertical: 20, //vertical margin between items
    backgroundColor: '#e3b6b1', // background color for the items
    //width: 300,     // fixed width for the items
    alignItems: 'center',  //center the text inside the item
    textAlign: 'center',
    color: 'black', // text color
    fontSize: 30,
    margin: 40, // move the shapes away from the side of the page.
        
  },
});

export default StartScreen;
