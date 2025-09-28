import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartScreen from './src/screens/StartScreen';
import CharacterPicker from './src/screens/CharacterPicker';
import CharacterCreator from './src/screens/CharacterCreator';
import CombatScreen from './src/screens/CombatScreen';


//create a stack object to declare <stack.Navigator> and <stack.screen>
let Stack = createNativeStackNavigator();

const  App = () => {
  return (
    
      <>
      <StatusBar style= "auto" />
      <NavigationContainer>
        <Stack.Navigator screenOptions = {{headerTitleAlign: 'center'}}>
          <Stack.Screen  name= "Main_Menu" component={StartScreen} options={{headerTitleAlign: 'center',}}/>
          <Stack.Screen name= "Character Creator" component={CharacterCreator} options={{headerTitleAlign: 'center',}}/>
          <Stack.Screen name= "Character Picker" component={CharacterPicker} options={{headerTitleAlign: 'center',}}/>
          <Stack.Screen name= "Combat" component={CombatScreen} options={{headerTitleAlign: 'center',}}/>
          

        </Stack.Navigator>

      </NavigationContainer>
      </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;