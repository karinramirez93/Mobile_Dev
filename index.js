import { registerRootComponent } from 'expo';

import App from './App';
// import NewScreen from './ComponentsScreen';
// import ListScreen from './ListScreen';
 import ButtonPracticeScreen from './ButtonPractice';
 import StartScreen from './StartScreen';
 import SecondScreen from './SecondScreen';

 
 

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
