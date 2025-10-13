import {StatusBar} from "expo-status-bat";
import {StyleSheet, View, Text, Pressable} from "react-native";

const SecondScreen = ({navigation}) => {

  let screenTwoJSK =
    /**
    * in styles.container, the background section modify only the color of the
    * second screen background and keeping the rest as configured on the styles
    */
    <View style = {[styles.mainContainer,{ backgroundColor: "#5dbaabff"}]}>
      <Text style = {styles.text}> I am the second screen! I have backstory or whatever</Text>
        <Pressable
          android_ripple= {styles.ripple}
          onPress={() => {navigation.pop()}} // switch to the previous screen by taking out of the stack
          style={iosStyleHandler}
          >
            <Text style={styles.pressableText}> go to next screen!</Text>
            
        </Pressable>
    </View>


    return(
      screenTwoJSK
    );

} // end of SecondScreen function()

//IOS function to work on IOS devices
  const iosStyleHandler = function (pressObject){
    if(pressObject.pressed){
      return styles.iosPressable
    }
  }

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1, // make the main container fill all available space within its parents
      flexDirection: 'column', //arranges children elements from top to bottom (default)
      backgroundColor: '#656479ff', //sets the background color of the container
      alignItems: 'center', // align children along the secondary axis ( horizontal, because flexDirrection is 'column')
      justifyContent: 'center', // align children along the main axis (vertically, because flexDirection is 'column')
      },
      //text style
    text:{
      fontSize: 30, //sets the size of the text
      maxWidth: 300, // limits the maximum width of the text element to 300 pixels.
      padding: 12, // add 12 pixels of internal space which is located between content and border
      margin: 12, // adds 12 pixels of external space (margin) the fourth layer
      borderBottomWidth: 4, // adds a 4-pixel thick line only to the bottom of the element
      borderColor: "#18ea54ff", //sets the color of the border (bottom line)
    },
    //ANDROID pressable style
    //ripple is specifically for the Android 'ripple' effect on Pressable component
    ripple:{
      color: 'red', // sets the color of the touch ripple effect on Android to red
    },
    //pressabletext is for the text content within a Pressable component
    pressableText:{
      fontSize: 32, //set the size for the text
      maxWidth: 300, // limits the maximum width of the text element to 300 pixels
      padding: 4, //add 4 pixels of the internal space which is between content and border
      textAlign: 'center', //centers  the text content horizontally within the text element itself
      borderRadius: 5, //rounds the corners of the element's background and border by 5 pixels
      color: 'blue', //sets the color of the text 
      backgroundColor: '#d1bee0ff', //sets the background color of the pressable area
      margin: 10, // adds 10 pixels of external space around the pressable element
    },
    //IOS style
    //iosPressable is for custom behavior/style on ios when a pressable is being pressed
    iosPressable:{
      opacity: 0.5, // reduces the visibility (transparency) of the element to 50% while it's being pressed on ios
    },
  });

export default  SecondScreen;
