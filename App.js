import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './StartScreen';
import SecondScreen from './SecondScreen';

let Stack = createNativeStackNavigator();

const  App = () => {
  return (
    <>
    <StatusBar style= "auto" />
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name= "Screen1" component={StartScreen} />
        <Stack.Screen name= "Screen2" component={SecondScreen} />
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