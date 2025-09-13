import { StatusBar } from 'expo-status-bar';
import{StyleSheet, Text, View, Pressable} from "react-native";

const ButtonPracticeScreen = () => {
    // function onPressHandler(){
    //     console.log("I was Pressed!");
    // }
    const iosStyleHandler = function(pressObject){
        if(pressObject.pressed){
            return styles.iosPressable;
        }
    }

    return (
        <View style={styles.container}>
        
        <Pressable 
            android_ripple={ styles.ripple}
            onPress={pressHandler}>
                style={iosStyleHandler}
                {/* style={({pressed}) => {
                    if(pressed){
                        return styles.iosPressable;
                    }
                }} */}
            <Text style={styles.pressableText}>Button practice Screen!</Text>
        </Pressable>
        <StatusBar style='auto' />
        </View>
    );

}
const pressHandler = function(){
    console.log("PRESSED via PRESSABLE!");
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
        padding: 4,
        textAlign: "center",
        borderRadius: 40,
        backgroundColor: "#9d94a4ff"
    },

});

export default ButtonPracticeScreen;
