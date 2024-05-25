// import screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// initialize connection for Firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBO6T_kTu-WXUeVeSW44btnSwiSFnWWM6w",
    authDomain: "chat-app-4a25e.firebaseapp.com",
    projectId: "chat-app-4a25e",
    storageBucket: "chat-app-4a25e.appspot.com",
    messagingSenderId: "404253792694",
    appId: "1:404253792694:web:0e0c43b57ef38a8d778917"
  };

  // initialize Firebase
  const app = initializeApp(firebaseConfig);

  // initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen name="Chat">
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;