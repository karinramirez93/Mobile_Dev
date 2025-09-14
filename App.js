import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './StartScreen';
import CharacterCreator from './CharacterCreator';
import { GlobalStyles } from './GlobalStyles';

let Stack = createNativeStackNavigator();

const  App = () => {
  return (
    <>
    <StatusBar style= "auto" />
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen  name= "Main_Menu" component={StartScreen} options={{headerTitleAlign: 'center',}}/>
        <Stack.Screen name= "Character Creator" component={CharacterCreator} options={{headerTitleAlign: 'center',}}/>
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