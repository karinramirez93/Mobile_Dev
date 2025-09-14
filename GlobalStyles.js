import { StyleSheet } from "react-native";



export const GlobalStyles = StyleSheet.create({

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
    center:{
        alignItems: 'center',
    },
}); //end StartScreen()
