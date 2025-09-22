import {Text, StyleSheet, View, Image, Pressable} from "react-native";
import { GlobalStyles } from "./GlobalStyles";

const CharacterImageDetail = function({title, imageSource, onPress}){

    let ImageDetails = 
        <View style={styles.container}> 
            <View style={styles.imageLayout}>
                <View style={styles.imageContainer}>
                    <Image source={imageSource} style={styles.image}/>
                </View>

                <Pressable
                    android_ripple={GlobalStyles.ripple}
                    onPress={onPress}
                    style={({pressed}) => pressed && GlobalStyles.iosPressable}
                    >
                    <View style={styles.Container}>
                        <Text style={styles.text}>{title} </Text>
                    </View>
                </Pressable>
            </View>            
        </View>
    return(
        ImageDetails

    );

}// end CharacterImageDetail()

const styles=StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 400,
        
    },
    imageContainer:{
        width: 250,
        height: 250,
        overflow: 'hidden',
        //borderWidth: 5,
       // borderColor: 'red'
       
    },
    imageLayout:{
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 4,
        borderColor: 'purple',
    },
    textContainer:{
        justifyContent: 'center',
        marginLeft: 15,
    },
    text:{
        fontSize: 30,
    },
    image:{
        width: 200,
        height: 200,
        resizeMode: 'contain',
    }

});// end StyleSheet



export default CharacterImageDetail;