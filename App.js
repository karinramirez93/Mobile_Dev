import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { MenuFunctions } from './Game_Menu';


export default function App() {

   MenuFunctions();
  return (
    
    <View style={styles.container}>
      {/* MenuFuncion has all the information related with the menu settings.
          and it is a component */}
       <MenuFunctions/>
   
      

      <StatusBar style="auto" />
    </View>
  );
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3f99ff',
   // alignItems: 'center',
    justifyContent: 'center',
  },



});
