import {Text, StyleSheet, View, Image} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {safeAreaView} from 'react-native-safe-area,context';

import ImageDetail from "../components/ImageDetail";

const ImageScreen = function(){
  return(
    <LinearGradient
      colors= {['#473dd2ff', '#3dc68bff', '#d544a5ff']}
      style= {styles.mainContainer}>

        <SaveAreaView>
          <View style={styles.container}>
            <ImageDetail title= "coffee" imageSource={require("../../assets/cofee.png")} price="$6.50"/>
            <ImageDetail title= "Donuts" imageSource={require("../../assets/donuts.png")} price= "4.50"/>
            <ImageDetail title= "Sandwitch" imageSource={require("../../assets/breakfast.png")} price= "22.50"/>
          </View>
        </SaveAreaView>
    </LinearGradient>
  );

}//end ImageScreen function;

const styles= StyleSheet.create({
  mainContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
  },
  text:{
    fontSize: 25,
    width: 150,
    borderWidth: 2,
  },
});



export default ImageScreen;
