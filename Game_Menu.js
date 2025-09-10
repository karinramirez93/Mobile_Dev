import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

/**
 * this is the game menu and it will have the following features in order to work as wished
 * 
 *----------- main menu -------
 * start game  
 * quit
 * 
 * functions
 * ** character set up
 * ** level of health
 * ** level of strength
 * ** level of magic
 *
 */

export function MenuFunctions(){
     
    return (
    
    <View> 
       <Text style={styles.title}>Welcome to A Bloody Math Flight!</Text>
       <Text style={styles.menuItem}> Menu</Text>
       <Text style={styles.menuItem}>Start Game</Text>
       <Text style={styles.menuItem}>Score</Text>
       <Text style={styles.menuItem}>Quit</Text>
   
      

    
    </View>
  );
//console.log("Game_Menu!");

}

const styles = StyleSheet.create({

  menuItem: {
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
  text:{
    flex: .12,
    fontSize: 30,
    textAlign: "center",
    borderWidth: 2,
    color: "#9c0c35ff",


  },
  title:{
     fontSize: 40,
     fontWeight: 'bold',
     color: '#000000ff',

      //personalize the Title options
    borderWidth: 2, // border thickness
    borderColor: 'white', // border color
    borderRadius: 20, //border radius for rounded corners
    paddingVertical: 10, // vertical inner spacing
    paddingHorizontal: 10, //horizontal inner spacing
    marginVertical: 20, //vertical margin between items
    backgroundColor: '#e3b6b1', // background color for the items
    //width: 300,     // fixed width for the items
    alignItems: 'center',  //center the text inside the item
    textAlign: 'center',
    margin: 10,
  
    

  },


});
