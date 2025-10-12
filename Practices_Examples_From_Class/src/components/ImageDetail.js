import {StyleSheet, Text, View, Image} from 'react-native';


const ImageDetail = function(props){
    
    let body =
        //parent View component that affect the whole screen
        <View style = {styles.mainContainer}>
            <View style = {styles.imageLayout}>
              <View style={styles.imageContainer}>
              {/* //a props is needed in order  to call the pictures from ImageScreen */}
                <Image source = {props.imageSource} style={styles.image}/>
              </View>
              
              <View style={styles.textContainer}>
              {/* //a props  title is needed as well */}
                <Text style={styles.priceText}>{props.price}</Text>
              </View>

              {/* View components to be apply only to Text */}
            </View>

            <View style={styles.mainContainer}>
              <Text style={styles.text}>  {props.title}  </Text>
            </View>
        </View>
    return(
      body
    );
    
}// end of ImageDetail method

const styles=StyleSheet.create({
  mainContainer:{
    flex: 1, // take as much space it need
    alignItems: 'center',
    flexDirection: 'row', // it tells who is the main axis
    width: 400,
  },
  imageContainer:{
    width: 150,
    height: 150,
    overflow: 'hidden'
  },
  imageLayout:{
    ialignItems: 'center',
    flexDirection: 'column'
  },
  textContainer:{
    justifyContent: 'center',
    marginleft: 15,
  },
  priceText:{
    fontSize: 20,
    color: 'white',
    marginTop: 5,
    fontWeight: 'bold',
  },
  text:{
    fontSize: 30,
  },
  image:{
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  
});

export default ImageDetail;

